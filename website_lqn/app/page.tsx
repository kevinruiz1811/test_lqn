"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Person {
  name: string;
  url: string;
  height: string;
  mass: string;
}

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchPeople = async (query = "") => {
    setLoading(true);
    const url = query
      ? `https://swapi.dev/api/people/?search=${query}`
      : `https://swapi.dev/api/people/`;
    const response = await fetch(url);
    const data = await response.json();
    setPeople(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleOpen = (url: string) => {
    const id = url.match(/\/people\/(\d+)\//)?.[1];
    if (id) {
      router.push(`/characters/${id}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPeople(search);
  };

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
        backgroundColor: "black",
        minHeight: "100vh",
        color: "white",
        padding: "40px 20px",
      }}
    >
      <Image
        src="/images/logoLeft.jpeg"
        alt="Decoración izquierda"
        style={{ position: "absolute", top: 20, left: 20 }}
        width={400}
        height={200}
      />

      <Image
        src="/images/logoRight.jpeg"
        alt="Decoración derecha"
        style={{ position: "absolute", top: 20, right: 20 }}
        width={300}
        height={150}
      />

      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 className="text-4xl font-bold mb-2 text-balance">
          Personajes de Star Wars
        </h1>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full star-wars-glow"></div>

        <form
          onSubmit={handleSearch}
          style={{ display: "flex", justifyContent: "center", gap: 10 }}
        >
          <TextField
            label="Buscar personaje"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <Button type="submit" variant="contained" color="primary">
            Buscar
          </Button>
        </form>
      </div>

      <List sx={{ bgcolor: "#1a1a1a", borderRadius: 2 }}>
        {people.map((person: Person, index) => (
          <div key={person.url}>
            <ListItem
              secondaryAction={
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpen(person.url)}
                >
                  Ver detalle
                </Button>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  {person.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={person.name}
                primaryTypographyProps={{
                  style: { color: "white", fontWeight: "bold" },
                }}
                secondaryTypographyProps={{ style: { color: "#ccc" } }}
                secondary={`Altura: ${person.height} cm | Peso: ${person.mass} kg`}
              />
            </ListItem>
            {index < people.length - 1 && (
              <Divider component="li" sx={{ bgcolor: "#333" }} />
            )}
          </div>
        ))}
      </List>
    </div>
  );
}
