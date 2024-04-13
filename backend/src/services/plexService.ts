import axios from 'axios'

export async function fetchMoviesFromPlex(): Promise<string[]> {
    try {
        const response = await axios.get(`
            ${process.env.PLEX_BASE_URL}/library/${process.env.PLEX_MOVIE_LIBRARY_ID}/all
        `, {
            headers: {'Authorization': `Bearer ${process.env.PLEX_TOKEN}`},
        })

        return response.data.map((movie: any) => movie.title)
    } catch (error) {
        console.error('Failed to fetch movies from Plex:', error)
        throw error
    }
}
