import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_API_KEY,
});


export const runtime = 'edge';

export async function POST(req, res) {
  try {
    const { messages } = await req.json();

    // Request completion from OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages,
    });

    // Stream the response
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
