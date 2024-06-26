import axios from 'axios'
import {parseStringPromise} from 'xml2js'

type MovieResponse = {
    $: {
        title: string
        year: string
        rating: string
        audienceRating: string
        thumb: string
        summary: string
    }
}

export type Movie = {
    title: string
    year: number
    rating: number
    audienceRating: number
    art: string
    summary: string
}

export async function fetchMoviesFromPlex(): Promise<Movie[]> {
    try {
        const url = `${process.env.PLEX_BASE_URL}/library/sections/1/unwatched?X-Plex-Token=${process.env.PLEX_TOKEN}`
        const response = await axios.get(url, {
            headers: {'Accept': 'application/xml'},
        })

        const result = await parseStringPromise(response.data)
        const movies = result.MediaContainer.Video.map((video: MovieResponse) => ({
            title: video.$.title,
            year: video.$.year,
            rating: video.$.rating,
            audienceRating: video.$.audienceRating,
            art: `${process.env.PLEX_BASE_URL}${video.$.thumb}`,
            summary: video.$.summary,
        }))
        return movies
    } catch (error) {
        console.error('Failed to fetch movies from Plex:', error)
        throw error
    }
}
