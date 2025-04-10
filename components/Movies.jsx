const { useEffect, useState } = require("react");
import Movie from "@/components/Movie";

export function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjZiNjdmMDkxYmNlMDE3N2UyYzg2Y2ZjYTM3ZDAyMyIsIm5iZiI6MTc0NDIxMDkwOS43NTEwMDAyLCJzdWIiOiI2N2Y2OGJkZDZjMzU4M2M5NzU5OWM4NGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.odkbHUNKT2sAxz5HEv7RPFcnevy2ztX42TJGBoXKuZk'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => { setMovies(json.results) })
            .catch(err => console.error(err));
    });

    return (
        <section>
            <h2 class="text-2xl font-bold mb-4">Tous les films</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <Movie key={movie.id} movies={movie} />
                ))}∑
            </div>
        </section>
    )
}