"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, CircularProgress } from "@mui/material";
import Image from "next/image";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}

export default function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [character, setCharacter] = useState<Character | null>(null);
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

  if (loading)
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={80} thickness={4} />
      </Box>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src="/images/logoLeft.jpeg"
        alt="Decoración izquierda"
        style={{ position: "absolute", top: 20, left: 20 }}
        width={400}
        height={200}
      />

      <h1 style={{ fontSize: "2.5rem", marginBottom: 20, textAlign: "center" }}>
        {character?.name}
      </h1>

      <Image
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt="Perfil del personaje"
        style={{
          borderRadius: "12px",
          marginBottom: 30,
          boxShadow: "0 0 20px rgba(255,255,255,0.4)",
        }}
        width={250}
        height={350}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
        }}
      />

      <div
        style={{
          backgroundColor: "#111",
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          maxWidth: 600,
          boxShadow: "0 0 15px rgba(255,255,255,0.1)",
          marginBottom: 30,
        }}
      >
        <p>
          <strong>Altura:</strong> {character?.height} cm
        </p>
        <p>
          <strong>Peso:</strong> {character?.mass} kg
        </p>
        <p>
          <strong>Cabello:</strong> {character?.hair_color}
        </p>
        <p>
          <strong>Piel:</strong> {character?.skin_color}
        </p>
        <p>
          <strong>Ojos:</strong> {character?.eye_color}
        </p>
        <p>
          <strong>Año de nacimiento:</strong> {character?.birth_year}
        </p>
        <p>
          <strong>Género:</strong> {character?.gender}
        </p>
        <p>
          <strong>Planeta natal:</strong> {homeworld}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "20px",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <div
          style={{ background: "#111", borderRadius: "12px", padding: "15px" }}
        >
          <h3>Películas</h3>
          <ul>
            {films.map((film, index) => (
              <li key={index}>{film}</li>
            ))}
          </ul>
        </div>

        <div
          style={{ background: "#111", borderRadius: "12px", padding: "15px" }}
        >
          <h3>Especies</h3>
          <ul>
            {species.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
        </div>

        <div
          style={{ background: "#111", borderRadius: "12px", padding: "15px" }}
        >
          <h3>Vehículos</h3>
          <ul>
            {vehicles.map((v, index) => (
              <li key={index}>{v}</li>
            ))}
          </ul>
        </div>

        <div
          style={{ background: "#111", borderRadius: "12px", padding: "15px" }}
        >
          <h3>Naves estelares</h3>
          <ul>
            {starships.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        style={{ position: "absolute", top: 20, right: 20, width: 300 }}
        onClick={() => router.push("/")}
      >
        Volver
      </Button>
    </div>
  );
}
