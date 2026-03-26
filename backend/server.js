const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToDB = require("./config/db.js");
const problemRoutes = require("./routes/problemRoutes.js");
const PORT = process.env.PORT || 3000;

const app = express();
connectToDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/problems", problemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
