import app from "./app.js";

import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();
connectDB();


//INITATING PORT LISTEN
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on the port ", PORT);
});
