"use client";
import { useQuery } from "@apollo/client/react";
import { GET_PERSON } from "../graphql/queries";
import { Drawer, Typography, Chip, Box, CircularProgress } from "@mui/material";

interface Props {
  id: string;
  onClose: () => void;
}

export default function CharacterModal({ id, onClose }: Props) {
  const { data, loading, error } = useQuery(GET_PERSON, { variables: { id } });

  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <Box p={2} width={350}>
        {loading && <CircularProgress />}
        {error && <Typography>Error al cargar el personaje</Typography>}
        {data && (
          <>
            <Typography variant="h5">{data.person.name}</Typography>
            <Typography>Height: {data.person.height}</Typography>
            <Typography>Mass: {data.person.mass}</Typography>
            <Typography>Gender: {data.person.gender}</Typography>
            <Typography>Homeworld: {data.person.homeworld.name}</Typography>

            <Typography variant="h6" mt={2}>
              Films:
            </Typography>
            {data.person.filmConnection.films.map((film: any) => (
              <Box key={film.title} mb={1}>
                <Typography>
                  {film.title} - Director: {film.director}
                </Typography>
                <Box mt={0.5}>
                  {film.planetConnection.planets.map((planet: any) => (
                    <Chip
                      key={planet.name}
                      label={planet.name}
                      sx={{ mr: 0.5, mt: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Drawer>
  );
}
