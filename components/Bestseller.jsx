import { useState, useEffect } from "react"
import Movie from "./Movie";
import RecomandationsItems from "./RecomandationsItems";

export function Bestseller() {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
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
    }, []);

    return (
        <div>
            <section>
                <h2 class="text-2xl font-bold mb-4">Meilleur des films</h2>
                <div class="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-red-800 pb-2">
                    {movies.map((movie, index) => (
                        <RecomandationsItems movie={movie}/>
                    ))}
                </div>
            </section>
        </div>
    )
}