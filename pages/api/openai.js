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
                  { role: "system", content: "You need to create questions and their corresponding answers based on the learning resources provided by the user. Please ensure each question and answer is wrapped in double quotes, separated by a comma. The entire pair should be enclosed in single quotes, formatted as: '['<question>', '<answer>']'. Ensure answers are kept simple and straightforward."},
                  { role: "user", content: info+"You need to create questions and their corresponding answers based on the learning resources provided by the user. Please ensure each question and answer is wrapped in double quotes, separated by a comma. The entire pair should be enclosed in single quotes, formatted as: '['<question>', '<answer>']'. Ensure answers are kept simple and straightforward." }
                ],
      model: "gpt-4",
    });
    console.log("chatgpt: ", chatCompletion.choices[0].message.content)
    const matches = chatCompletion.choices[0].message.content.match(/\[.*?\]/g);
    let questionsAndAnswers = [];
    console.log("match: ", matches);
    if (matches) {
      matches.forEach(item => {
        const parsedArray = JSON.parse(item.replace(/`/g, '"').replace(/\\'/g, "'"));
        //replace either ` to ""， \\ to '
          console.log("parsedArray: ", parsedArray);
          questionsAndAnswers.push({
              id: Math.random().toString(),
              question: parsedArray[0],
              answer: parsedArray[1]
          });
          console.log("array: ", questionsAndAnswers);
      });
    }

    res.status(200).json({ result: questionsAndAnswers });
  } catch(error) {
    alert('something wrong with chatgpt, please try again');
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