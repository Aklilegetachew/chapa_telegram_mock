const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes/route");

const app = express();
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5000",
  
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    console.error(`Error parsing JSON data: ${error.message}`);
    return res.status(400).json({ error: "Invalid JSON data" });
  }
  next();
});

app.use(router);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
