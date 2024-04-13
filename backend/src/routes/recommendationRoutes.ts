import {Router, Request, Response} from 'express'
import {getMovieRecommendations} from '../services/openaiService'
import {fetchMoviesFromPlex} from '../services/plexService'

const router = Router()

router.post('/recommend-movies', async (req: Request, res: Response) => {
    const {userPreferences} = req.body
    try {
        const availableMovies = await fetchMoviesFromPlex()
        const responseText = await getMovieRecommendations(userPreferences, availableMovies)
        res.json({message: responseText})
    } catch (error) {
        console.error('Error fetching recommendation from OpenAI:', error)
        res.status(500).json({error: 'Failed to generate response from OpenAI'})
    }
})

export default router