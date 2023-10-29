import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  if (process.env.OPENAI_API_KEY===undefined) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const info = req.body.info || '';
  if (info.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid message",
      }
    });
    return;
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
                  { role: "system", content: "you need to create a question and the corresponding answer according to the lerning resources users provided. you need return question and answer in form of [<question>, <answer>] which inside a ``` code block."},
                  { role: "user", content: info }
                ],
      model: "gpt-4",
  });
    res.status(200).json({ result: chatCompletion.choices[0].message.content });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}