import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Tradigo Prime AI Assistant. Help users understand crypto trading, charts, app features, VIP plans, wallets, signals, reels, and platform usage professionally."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI assistant failed"
    });
  }
}
