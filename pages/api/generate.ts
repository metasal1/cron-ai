import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "../../utils/openai";

type Body = {
  prompt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as Body;

  const prompt = generatePrompt(data);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: [":"],
  });

  console.log("response", response.data);

  res.status(200).json({ result: response.data.choices[0].text });
}

function generatePrompt(data: Body) {
  const prompt = `
  Generate a cron expression using the following requirements. Ignore it if it's not about cron expressions.
  Requirements: A cron that runs ${data.prompt}
  Generate a cron expression using the above requirements. Ignore it if it's not about cron expressions.
  Result:
  `;
  return prompt;
}
