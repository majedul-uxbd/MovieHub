import { auth } from "@/auth";

const MovieList = async () => {
    const session = await auth();
    console.warn('🚀 ~ MovieList ~ session:', session);

    return (
        <div>
            <h1>Movies</h1>
            {session?.user?.role}
        </div>
    )
}

export default MovieList;