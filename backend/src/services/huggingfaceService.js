import axios from "axios";

export const generateQuizFromText = async (
    text,
    questionCount,
    difficulty
) => {

    const prompt = `
You are an expert teacher and MCQ generator.

Generate EXACTLY ${questionCount} multiple-choice questions from the study material.

Difficulty: ${difficulty}

Study Material:
${text.substring(0, 12000)}

VERY IMPORTANT:

Return ONLY a valid JSON array.

Each question MUST contain these fields:

[
  {
    "question":"What is AI?",
    "option_a":"Artificial Intelligence",
    "option_b":"Automatic Internet",
    "option_c":"Artificial Interface",
    "option_d":"None of the above",
    "correct_answer":"A",
    "explanation":"Artificial Intelligence refers to machines performing tasks that normally require human intelligence."
  }
]

Rules:

1. explanation must be 2-3 simple sentences.
2. explanation should explain WHY the answer is correct.
3. Do NOT use markdown.
4. Do NOT wrap JSON inside code blocks.
5. Return ONLY JSON.
`;

    const response = await axios.post(

        "https://router.huggingface.co/v1/chat/completions",

        {

            model: "meta-llama/Llama-3.1-8B-Instruct",

            messages: [

                {

                    role: "user",

                    content: prompt,

                },

            ],

            temperature: 0.4,

            max_tokens: 3500,

        },

        {

            headers: {

                Authorization: `Bearer ${process.env.HF_API_KEY}`,

                "Content-Type": "application/json",

            },

        }

    );

    return response.data.choices[0].message.content;

};