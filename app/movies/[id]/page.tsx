'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import socket from "../../../lib/socket";
import { Movies } from "@/interface/movies.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MovieDetail({ params }: any) {
    const { data: session } = useSession();
    console.warn('🚀 ~ MovieDetail ~ data:', session);
    const router = useRouter();
    const [movie, setMovie] = useState<Movies>();
    const [rating, setRating] = useState(0);

    const fetchMovie = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/movies/get-movie`,
            {
                method: 'POST',
                headers: {
                    // Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: params.id,
                }),
            }
        );

        const responseData = await response.json();
        setMovie(responseData.data);
    };

    const rateMovie = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/movies/rate-movie`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: params.id,
                    rating: rating,
                }),
            }
        );
        socket.emit('rating-updated', { movieId: params.id });
    };

    useEffect(() => {
        if (!session) {
            router.push("/login");
            return;
        }
        fetchMovie();
        socket.on('rating-updated', fetchMovie);
        return () => socket.off('rating-updated', fetchMovie);
    }, [session]);

    // if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <h2>{movie?.title}</h2>
            <p>Average Rating: ⭐ {Number(movie?.avg_rating).toFixed(1)}</p>

            <Input type="number" min="1" max="5" value={rating} onChange={e => setRating(Number(e.target.value))} />
            <Button onClick={rateMovie}>Rate</Button>

            <h3>Comments</h3>

        </div>
    );
}
