'use client';
import { useEffect, useState } from "react";
import api from "../../lib/api";
import socket from "../../lib/socket";
import Link from "next/link";
import { Movies } from "@/interface/movies.interface";
import { auth } from "@/auth";

export default function HomePage() {
    // const session = await auth();
    // console.warn('🚀 ~ HomePage ~ session:', session);
    const [movies, setMovies] = useState<Movies[]>([]);

    const fetchMovies = async () => {
        const res = await api.get("/api/movies/get-all-movies");
        setMovies(res.data?.data);
    };

    useEffect(() => {
        fetchMovies();
        socket.on('movie-added', fetchMovies);
        socket.on('rating-updated', fetchMovies);
        return () => {
            socket.off('movie-added', fetchMovies);
            socket.off('rating-updated', fetchMovies);
        };
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            {movies.map((movie) => (
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                    <div>
                        {movie.title} – ⭐ {Number(movie.avg_rating).toFixed(1)}
                    </div>
                </Link>
            ))}
        </div>
    );
}
