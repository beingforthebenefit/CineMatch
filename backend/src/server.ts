import express, {Express, Request, Response} from 'express'
import 'dotenv/config'

const app: Express = express()
app.use(express.json())

const PORT: number | string = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World from TypeScript')
})
