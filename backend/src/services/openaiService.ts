import OpenAI from 'openai'
import {Movie} from './plexService'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function getMovieRecommendations(userPreferences: string, availableMovies: Movie[]): Promise<string[]> {
    try {
        const prompt = `
            The user's preferences are as follows: ${userPreferences}.
            The available movies are: ${availableMovies.join(', ')}.
            Provide a JSON formatted list of recommended movies based on the preferences.
        `

        const completion = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 200,
            stop: ['\n'],
            temperature: 0.7,
        })

        const responseText = completion.choices[0].text.trim()
        const recommendations = JSON.parse(responseText)
        return recommendations
    } catch (error) {
        console.error('Error fetching recommendation from OpenAI:', error)
        throw new Error('Failed to generate movie recommendations from OpenAI')
    }
}