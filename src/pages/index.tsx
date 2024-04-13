import {useEffect, useState} from 'react'
import axios from 'axios'
import {MovieImage, MovieInfo, MoviesContainer, StyledCard} from '../styles/HomeStyles'
import {Movie} from '../types'

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.post('http://localhost:3000/api/fetch-movies')
                setMovies(response.data.movies)
            } catch (error) {
                console.error('Failed to fetch movies:', error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <MoviesContainer>
            {movies.map((movie, index) => (
                <StyledCard key={index} hoverable clickable>
                    <MovieImage src={`http://localhost:3000/api/image/${encodeURIComponent(movie.art)}`} alt={movie.title} />
                    <MovieInfo>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <p>Rating: {movie.rating}</p>
                    </MovieInfo>
                </StyledCard>
            ))}
        </MoviesContainer>
    )
}