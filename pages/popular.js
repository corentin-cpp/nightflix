import Header from "@/components/Header";
import Movie from "@/components/Movie";
import { useEffect, useState } from "react"

export default function Popular() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjZiNjdmMDkxYmNlMDE3N2UyYzg2Y2ZjYTM3ZDAyMyIsIm5iZiI6MTc0NDIxMDkwOS43NTEwMDAyLCJzdWIiOiI2N2Y2OGJkZDZjMzU4M2M5NzU5OWM4NGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.odkbHUNKT2sAxz5HEv7RPFcnevy2ztX42TJGBoXKuZk'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => setMovies(json.results))
            .catch(err => console.error(err));
    }, [movies]);

    return (
        <div>
            <Header title="Films Populaire" backgroundImage="https://img.wallscloud.net/uploads/thumb/2630134492/meteorite-1-63211-1024x576-MM-80.webp" />
            <section class="max-w-7xl mx-auto px-4 py-8 space-y-10">
                <h2 class="text-2xl font-bold mb-4">Films Populaire</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <Movie key={movie.id} movies={movie} />
                    ))}
                </div>
            </section>
        </div>
    )
}