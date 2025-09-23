"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [homeworld, setHomeworld] = useState<string>("");
  const [films, setFilms] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const res = await fetch(`https://swapi.dev/api/people/${id}/`);
      const data = await res.json();
      setCharacter(data);

      if (data.homeworld) {
        const resHome = await fetch(data.homeworld);
        const homeData = await resHome.json();
        setHomeworld(homeData.name);
      }

      if (data.films?.length) {
        const filmsData = await Promise.all(
          data.films.map(async (url: string) => {
            const resFilm = await fetch(url);
            const filmData = await resFilm.json();
            return filmData.title;
          }),
        );
        setFilms(filmsData);
      }

      if (data.species?.length) {
        const speciesData = await Promise.all(
          data.species.map(async (url: string) => {
            const resSpecies = await fetch(url);
            const sData = await resSpecies.json();
            return sData.name;
          }),
        );
        setSpecies(speciesData);
      }

      if (data.vehicles?.length) {
        const vehiclesData = await Promise.all(
          data.vehicles.map(async (url: string) => {
            const resVehicle = await fetch(url);
            const vData = await resVehicle.json();
            return vData.name;
          }),
        );
        setVehicles(vehiclesData);
      }

      if (data.starships?.length) {
        const starshipsData = await Promise.all(
          data.starships.map(async (url: string) => {
            const resShip = await fetch(url);
            const sData = await resShip.json();
            return sData.name;
          }),
        );
        setStarships(starshipsData);
      }

      setLoading(false);
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{character.name}</h1>

      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt={character.name}
        style={{ width: 250, borderRadius: 10, marginBottom: 20 }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
        }}
      />

      <p>Altura: {character.height}</p>
      <p>Peso: {character.mass}</p>
      <p>Color de cabello: {character.hair_color}</p>
      <p>Color de piel: {character.skin_color}</p>
      <p>Color de ojos: {character.eye_color}</p>
      <p>Año de nacimiento: {character.birth_year}</p>
      <p>Género: {character.gender}</p>

      <h3>Planeta natal</h3>
      <p>{homeworld}</p>

      <h3>Películas</h3>
      <ul>
        {films.map((film, index) => (
          <li key={index}>{film}</li>
        ))}
      </ul>

      <h3>Especies</h3>
      <ul>
        {species.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </ul>

      <h3>Vehículos</h3>
      <ul>
        {vehicles.map((v, index) => (
          <li key={index}>{v}</li>
        ))}
      </ul>

      <h3>Naves estelares</h3>
      <ul>
        {starships.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </ul>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        onClick={() => router.push("/")}
      >
        Volver
      </Button>
    </div>
  );
}
