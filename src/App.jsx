import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { cyan } from "@mui/material/colors";

export default function App() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.results.map((pokemon) => {
                    const id = pokemon.url.split("/").filter(Boolean).pop();
                    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                    return { name: pokemon.name, image };
                });
                setPokemons(formatted);
            });
    }, []);

    return (
        <Grid container spacing={2} padding={2} sx={{ backgroundColor: cyan[50], minHeight: '100vh' }}>
            {pokemons.map((p) => (
                <Grid item xs={6} sm={4} md={3} key={p.name}>
                    <Card sx={{ backgroundColor: cyan[100] }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={p.image}
                            alt={p.name}
                            sx={{ objectFit: "contain" }}
                        />
                        <CardContent>
                            <Typography variant="h6" textAlign="center" textTransform="capitalize">
                                {p.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}