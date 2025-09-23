"use client";

import { useEffect, useState } from "react";
import { Button, List, ListItem, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const [people, setPeople] = useState<any[]>([]);
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

  if (loading) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Personajes de Star Wars</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <TextField
          label="Buscar personaje"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          style={{ marginRight: 10 }}
        />
        <Button type="submit" variant="contained">
          Buscar
        </Button>
      </form>

      <List>
        {people.map((person: any) => (
          <ListItem
            key={person.url}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {person.name}
            <Button variant="contained" onClick={() => handleOpen(person.url)}>
              Ver detalle
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
