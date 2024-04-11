const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/chatbot", async (req, res) => {
  const message = req.body.message;
  try {
    let data = {};
    if (message === "image") {
      data = {
        type: "image",
        url: "http://localhost:3000/images/image.png",
        path: "images/image.png",
        name: "image.png",
        isUser: false,
      };
    } else if (message === "choice") {
      data = {
        type: "choice",
        text: "What would you like to order?",
        options: [
          { key: "Pizza", value: "Pizza" },
          { key: "Fries", value: "Fries" },
          { key: "Sandwich", value: "Sandwich" },
        ],
        isUser: false,
      };
    } else {
      data = {
        type: "text",
        text: "This is a dummy response from the chatbot.",
        isUser: false,
      };
    }
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: "" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
