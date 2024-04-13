import styled from 'styled-components'

export const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`

export const StyledCard = styled.div`
  width: 300px;
  height: 340px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    opacity: 1;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
`

export const MovieInfo = styled.div`
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  width: 100%;
`

export const MovieImage = styled.img`
  width: 100%;
  height: 340px;
  object-fit: cover;
`