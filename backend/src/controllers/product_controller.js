import { request } from "express";
import Products from "../models/product_model.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  try {
    const product = await Products.create({
      name,
      description,
      price,
      stock,
      category,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    //adding filter by search, category
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" }; //find the documents where the nme field contins the work iphone
    }

    if (category) {
      //direct keyword for exct mtch
      query.category = category;
    }

    if (minPrice || maxPrice) {
      //creting price object
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const products = await Products.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    //countDocuments
    const total = await Products.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });

    // const allProducts = await Products.find().sort({ createdAt: -1 });
    // res.status(200).json({ count: allProducts.length, allProducts });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    //product id
    const { id } = req.params;
    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updateProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "Product update successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.error("Update products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async () => {
  try {
    const id = req.params;
    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Update products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadProductImages = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
      });
    }

    const product = await Products.findById(id);

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    //add the product image

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        //uploading to cloudinary n then getting the public id n the url

        cloudinary.v2.uploader
          .upload_upstream({ folder: "products" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(file.buffer);
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);
    //chekcing if all the images are uploaded on cloudinary
    //needs double () outside {} in map role
    //inserting only reuired fields in the db
    const images = uploadedImages.map((img) => ({
      public_id: img.public_id,
      url: img.secure_url,
    }));

    product.images.push(...images);
    await product.save();

    res.status(200).json({ message: "Images uploaded successfully" });
  } catch (error) {
    console.error("Update products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
