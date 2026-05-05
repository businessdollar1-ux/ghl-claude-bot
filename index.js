import express from "express";

import fetch from "node-fetch";

const app = express();

app.use(express.json());

app.post("/reply", async (req, res) => {

  const userMessage = req.body.message;

  const response = await fetch("https://api.anthropic.com/v1/messages", {

    method: "POST",

    headers: {

      "x-api-key": process.env.CLAUDE_KEY,

      "anthropic-version": "2023-06-01",

      "content-type": "application/json"

    },

    body: JSON.stringify({

      model: "claude-3-5-sonnet-20241022",

      max_tokens: 200,

      temperature: 0.7,

      system: PASTE YOUR FULL PROMPT HERE,

      messages: [

        {

          role: "user",

          content: userMessage

        }

      ]

    })

  });

  const data = await response.json();

  const reply = data.content[0].text;

  res.json({ reply });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Server running on port " + PORT);

});
