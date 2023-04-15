import openai from "@/lib/openAiAPI";
import type { NextApiRequest, NextApiResponse } from 'next'

const getMovieRecommendationPrompt = (oldSuggestion: string|string[]|undefined): string => {
    let prompt = `Recommend a movie title that someone can watch on the weekend and it has a high rating.`;

    if (oldSuggestion) {
        prompt += `\nDo not recommend the following movie: ${oldSuggestion}`;
    }

    prompt += `\nOnly give back the title of the movie in your response.`;

    return prompt;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req?.method?.toLowerCase() !== 'get') {
        res.status(405).send({ message: 'Method not allowed' });
    }

    try {
        const { oldSuggestion } = req.query;

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: 'You are a movie recommendation bot. That only gives back the title of the movie and no other information.'
                },
                {
                    role: "user",
                    content: getMovieRecommendationPrompt(oldSuggestion)
                }
            ],
            temperature: 1,
        });

        const movieRecommendation = response?.data?.choices[0]?.message?.content;

        return res.status(200).json({ success: true, movieRecommendation });
    } catch (exception) {
        console.log(exception)
        return res.status(503).json({ success: false });
    }
}
