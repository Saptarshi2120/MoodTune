require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", (req, res) => {
  const { responses } = req.body;
  console.log("User Responses:", responses);
  res.json({ message: "Recommendations will be generated!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
