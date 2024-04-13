import {Router, Request, Response} from 'express'
import {generateChatResponse} from '../services/openaiService'

const router = Router()

router.post('/chat-response', async (req: Request, res: Response) => {
    const {userInput} = req.body
    try {
        const responseText = await generateChatResponse(userInput)
        res.json({message: responseText})
    } catch (error) {
        res.status(500).json({error: 'Failed to generate response from OpenAI'})
    }
})

export default router