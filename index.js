import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/reply", async (req, res) => {
  try {
    const response = await fetch("https://api.anthropic.com/v1/models", {
      method: "GET",
      headers: {
        "x-api-key": process.env.CLAUDE_KEY,
        "anthropic-version": "2023-06-01"
      }
    });

    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "failed to fetch models",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
