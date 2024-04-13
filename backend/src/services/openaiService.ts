import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function generateChatResponse(userInput: string) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{role: 'user', content: userInput}],
            model: 'gpt-3.5-turbo',
        })
        return chatCompletion.choices[0].message.content
    } catch (error) {
        console.error('Error calling OpenAI:', error)
        throw error
    }
}