import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import recommendationRoutes from './routes/recommendationRoutes'
import axios from 'axios'

const app: Express = express()
app.use(express.json(), cors())

app.use('/api', recommendationRoutes)

const PORT: number | string = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World from TypeScript')
})

app.get('/api/image/:imagePath', async (req: Request, res: Response) => {
    const {imagePath} = req.params
    const decodedPath = decodeURIComponent(imagePath)
    const url = `${decodedPath}?X-Plex-Token=${process.env.PLEX_TOKEN}`

    try {
        const response = await axios.get(url, {responseType: 'arraybuffer'})
        res.set('Content-Type', 'image/jpeg')
        res.send(response.data)
    } catch (error) {
        console.error('Failed to fetch image:', error)
        res.sendStatus(404)
    }
})