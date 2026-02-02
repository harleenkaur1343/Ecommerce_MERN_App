import { useState, useEffect } from "react";
import api from "@/axios/axios";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  //view all products

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/product/products", {
        params: { page, limit: 10 },
      });
      //console.log("View all products", data);
      setProducts(data.products);
      setPages(data.pages);
    } catch (err) {
      console.error("Admin fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    //confirm for the deletion
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/product/${id}`);
      fetchProducts();
    } catch (err) {
      //console.log("Delete product error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Admin Products</h2>
        <Link
          to="/admin/product/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add product
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">₹{product.price}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <Link
                      to={`/admin/product/${product._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x}
              onClick={() => setPage(x + 1)}
              className={`px-3 py-1 rounded border ${
                page === x + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
