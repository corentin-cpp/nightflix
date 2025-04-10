import { useState } from "react";
import { SearchMovie } from "./SearchMovie";

export function Navbar() {
    const [search, setSearch] = useState("");
    const [resultSearch, setResultSearch] = useState([]);


    function serachMovie(search) {
        const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=fr-FR&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjZiNjdmMDkxYmNlMDE3N2UyYzg2Y2ZjYTM3ZDAyMyIsIm5iZiI6MTc0NDIxMDkwOS43NTEwMDAyLCJzdWIiOiI2N2Y2OGJkZDZjMzU4M2M5NzU5OWM4NGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.odkbHUNKT2sAxz5HEv7RPFcnevy2ztX42TJGBoXKuZk'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => setResultSearch(json.results))
            .catch(err => console.error(err));
    }
    
    return (
        <nav class="bg-gray-900 text-white px-4 py-3 shadow-md">
            <div class="max-w-7xl mx-auto flex items-center justify-between">

                <div class="flex items-center space-x-2">
                    <a href={`/`} class="flex items-center">
                    <span class="text-2xl font-bold text-purple-400">Night</span>
                    <span class="text-2xl font-bold text-white">Flix</span>
                    </a>
                </div>
                <div class="flex-1 mx-6 hidden md:block">
                    <input
                        type="text"
                        onChange={(e) => {
                            setSearch(e.target.value)
                            serachMovie(search)
                        }}
                        placeholder="Rechercher un film..."
                        class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div class="flex items-center space-x-4 text-sm font-medium">
                    <a href={`/`} class="hover:text-purple-400 transition">Accueil</a>
                    <a href={`/popular`} class="hover:text-purple-400 transition">Populaires</a>
                    <a href={`/popular`} class="hover:text-purple-400 transition">Nouveautés</a>
                </div>
            </div>

            <div class="md:hidden mt-3">
                <input
                    type="text"
                    onChange={(e) => {
                        setSearch(e.target.value)
                        serachMovie(search)
                    }}
                    placeholder="Rechercher un film..."
                    class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            {search !== "" && (
                <div class="bg-gray-900 p-4">
                    <h2 class="text-white text-lg font-semibold mb-2">Résultats</h2>
                    <div class="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                        {resultSearch.map((movie) => (
                            <SearchMovie key={movie.id} search={movie} />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}