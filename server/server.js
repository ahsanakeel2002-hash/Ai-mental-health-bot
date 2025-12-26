import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

// ✅ Load environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors()); // React → Node requests allow

app.post("/chat", async (req, res) => {
  console.log("Message from frontend:", req.body.message);

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",
        messages: [
          { role: "system", content: "You are a helpful mental health chatbot.And your name Eziyo, manan nalam mental health thavira vera entha help enna doubut kettalum ne answer pannanum - Sorry Bro Iam not Made for This...I Trained For Improve your Mantal Health only " },
          { role: "user", content: req.body.message },
        ],
      },
      {
        headers: {
          // 🟩 API key read from .env
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
