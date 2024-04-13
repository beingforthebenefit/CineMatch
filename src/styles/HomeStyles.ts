import {Card} from '@nextui-org/react'
import styled from 'styled-components'

export const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`

export const StyledCard = styled(Card)`
  width: 300px;
  margin: 10px;
`

export const MovieImage = styled.img`
  width: 100%;
  height: 340px;
  object-fit: cover;
`

export const MovieInfo = styled.div`
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
`