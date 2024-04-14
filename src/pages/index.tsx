import {useEffect, useState} from 'react'
import axios from 'axios'
import {MoviesContainer, StyledCard, MovieImage, MovieInfo} from '../styles/HomeStyles'
import {Movie} from '../types'
import {Button, Modal, Box, Typography, Grid, Container, AppBar, Toolbar, TextField} from '@mui/material'
import {modalStyle} from 'src/styles/ModalStyles'

export default function Home() {
    const [allMovies, setAllMovies] = useState<Movie[]>([])
    const [movies, setMovies] = useState<Movie[]>([])
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [filterYear, setFilterYear] = useState('')
    const [filterRating, setFilterRating] = useState('')
    const [filterAudienceRating, setFilterAudienceRating] = useState('')

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.post('http://localhost:3000/api/fetch-movies')
                setAllMovies(response.data.movies)
                setMovies(response.data.movies)
            } catch (error) {
                console.error('Failed to fetch movies:', error)
            }
        }

        fetchMovies()
    }, [filterYear, filterRating, filterAudienceRating])

    useEffect(() => {
        const filteredMovies = allMovies.filter(movie => {
            return (!filterYear || movie.year >= parseInt(filterYear)) &&
                (!filterRating || movie.rating >= parseInt(filterRating)) &&
                (!filterAudienceRating || movie.audienceRating >= parseInt(filterAudienceRating))
        })
        setMovies(filteredMovies)
    }, [filterYear, filterRating, filterAudienceRating, allMovies])

    const showMovieModal = (movie: Movie) => {
        setSelectedMovie(movie)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Movie Explorer
                    </Typography>
                    <TextField
                        label="Minimum Year"
                        variant="outlined"
                        type="number"
                        value={filterYear}
                        onChange={e => setFilterYear(e.target.value)}
                        size="small"
                        sx={{marginRight: 2}}
                    />
                    <TextField
                        label="Minimum Rating"
                        variant="outlined"
                        type="number"
                        value={filterRating}
                        onChange={e => setFilterRating(e.target.value)}
                        size="small"
                        sx={{marginRight: 2}}
                    />
                    <TextField
                        label="Minimum Audience Rating"
                        variant="outlined"
                        type="number"
                        value={filterAudienceRating}
                        onChange={e => setFilterAudienceRating(e.target.value)}
                        size="small"
                        sx={{marginRight: 2}}
                    />
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <MoviesContainer>
                    {movies.map((movie, index) => (
                        <StyledCard
                            key={index}
                            onClick={() => showMovieModal(movie)}
                        >
                            <MovieImage src={`http://localhost:3000/api/image/${encodeURIComponent(movie.art)}`} alt={movie.title} loading="lazy" />
                            <MovieInfo>
                                <h3>{movie.title}</h3>
                                <p>{movie.year}</p>
                                <p>Rating: {movie.rating}</p>
                            </MovieInfo>
                        </StyledCard>
                    ))}
                </MoviesContainer>
            </Container>
            {selectedMovie && (
                <Modal
                    open={isOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography variant="h5" component="h2" sx={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                                    {selectedMovie.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                                    Year: {selectedMovie.year}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                                    Rating: {selectedMovie.rating}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                                    Audience Rating: {selectedMovie.audienceRating}
                                </Typography>
                                <Typography variant="body1" sx={{mt: 2, textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                                    <strong>Summary:</strong> {selectedMovie.summary}
                                </Typography>
                            </Grid>
                            <MovieImage
                                src={`http://localhost:3000/api/image/${encodeURIComponent(selectedMovie.art)}`}
                                alt={selectedMovie.title}
                                style={{width: '100%', height: 'auto', filter: 'brightness(50%)'}}
                            />
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
