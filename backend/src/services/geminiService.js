import axios from "axios";

export const generateQuizFromText = async (
    text,
    questionCount,
    difficulty
) => {

    const prompt = `
You are an expert MCQ generator.

Generate EXACTLY ${questionCount} multiple choice questions from the study material below.

Difficulty: ${difficulty}

Study Material:
${text.substring(0, 12000)}

Return ONLY a JSON array.

Example:

[
{
"question":"What is AI?",
"option_a":"Artificial Intelligence",
"option_b":"Automatic Internet",
"option_c":"Artificial Interface",
"option_d":"None",
"correct_answer":"A"
}
]

Do not return markdown.
Do not explain anything.
Return only valid JSON.
`;

    const response = await axios.post(

        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",

        {
            inputs: prompt,
            parameters: {
                max_new_tokens: 1200,
                temperature: 0.4
            }
        },

        {
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`
            }
        }

    );

    const output = response.data[0].generated_text;

    const jsonStart = output.indexOf("[");
    const jsonEnd = output.lastIndexOf("]");

    return output.substring(jsonStart, jsonEnd + 1);
};