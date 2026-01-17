import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./src/config/db.js";

connectDB();

//INITATING PORT LISTEN
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on the port ", PORT);
});
