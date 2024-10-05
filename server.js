require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { routes } = require("./routes");
const { connectDatabase } = require("./config/dbConnect");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    const connection = await connectDatabase();

    connection.on("error", (error) => {
      console.log("Connection Error: ", error);
    });

    connection.once("open", () => {
      console.log("Database connected");
    });

    app.get("/", (req, res) => {
      res.send("Backend is running!");
    });

    app.use("/uploads", express.static("./src/uploads"));
    routes(app);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
