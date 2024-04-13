import axios from 'axios'
import {parseStringPromise} from 'xml2js'

type MovieResponse = {
    $: {
        title: string
        year: string
        rating: string
        art: string
    }
}

export async function fetchMoviesFromPlex(year = 2015, rating = 8.5): Promise<string[]> {
    try {
        const url = `${process.env.PLEX_BASE_URL}/library/sections/1/unwatched?X-Plex-Token=${process.env.PLEX_TOKEN}&year>=${year}&rating>=${rating}`
        const response = await axios.get(url, {
            headers: {'Accept': 'application/xml'},
        })

        const result = await parseStringPromise(response.data)
        const movies = result.MediaContainer.Video.map((video: MovieResponse) => ({
            title: video.$.title,
            year: video.$.year,
            rating: video.$.rating,
            art: `${process.env.PLEX_BASE_URL}${video.$.art}`,
        }))
        return movies
    } catch (error) {
        console.error('Failed to fetch movies from Plex:', error)
        throw error
    }
}
