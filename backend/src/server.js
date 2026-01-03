const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");

// Connect to the database
dbConnect();

const app = express();
const PORT = process.env.PORT || 3000;

// Routes Import
const { authRoutes } = require("./routes/authRoutes");
const { categoryRoutes } = require("./routes/foodCategoryRoutes");
const { menuItemRoutes } = require("./routes/MenuItemRoutes");
const { tableRoutes } = require("./routes/TableRoutes");
const { publicRoutes } = require("./routes/publicRoutes");
const { settingsRoutes } = require("./routes/settingsRoutes");
// app.use(
//   cors({
//     origin: "tasty-tokens.vercel.app",
//     credentials: true,
//   })
// );

app.use(cors());

// App Routes
app.use(express.json());
app.use("/api/public", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuItemRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/settings", settingsRoutes);

// Server Port
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
