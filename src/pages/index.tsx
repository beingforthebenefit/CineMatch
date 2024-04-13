import {useEffect, useState} from 'react'
import axios from 'axios'
import {MoviesContainer, StyledCard, MovieImage, MovieInfo} from '../styles/HomeStyles'
import {Movie} from '../types'
import {Button, Modal, Box, Typography, Grid} from '@mui/material'
import {modalStyle} from 'src/styles/ModalStyles'

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const [isOpen, setIsOpen] = useState(false)

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

    const showMovieModal = (movie: Movie) => {
        setSelectedMovie(movie)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <MoviesContainer>
                {movies.map((movie, index) => (
                    <StyledCard
                        key={index}
                        onClick={() => showMovieModal(movie)}
                        style={{backgroundImage: `url(http://localhost:3000/api/image/${encodeURIComponent(movie.art)})`}}
                    >
                        <MovieInfo>
                            <h3>{movie.title}</h3>
                            <p>{movie.year}</p>
                            <p>Rating: {movie.rating}</p>
                        </MovieInfo>
                    </StyledCard>
                ))}
            </MoviesContainer>
            {selectedMovie && (
                <Modal
                    open={isOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h5" component="h2">
                                    {selectedMovie.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Year: {selectedMovie.year}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Rating: {selectedMovie.rating}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Audience Rating: {selectedMovie.audienceRating}
                                </Typography>
                                <Typography variant="body1" sx={{mt: 2}}>
                                    <strong>Summary:</strong> {selectedMovie.summary}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <MovieImage src={`http://localhost:3000/api/image/${encodeURIComponent(selectedMovie.art)}`} alt={selectedMovie.title} style={{width: '100%', height: 'auto'}} />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            color="primary"
                            sx={{mt: 2}}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            )}
        </>
    )
}
