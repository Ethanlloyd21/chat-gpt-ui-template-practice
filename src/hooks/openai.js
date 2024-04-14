import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function sendMesgToOpenAi(message) {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
    // stream: false,
    temperature: 0.7,
  });
  // /** Place holder: when stream is set to true, the response will give an array */
  // // for await (const chunk of stream) {
  // //   return chunk.choices[0]?.delta?.content || "";
  // // }.
  return stream.choices[0].message.content;
}
