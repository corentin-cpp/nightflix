import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { SearchMovie } from "./SearchMovie";
import { Menu, X } from "lucide-react"; // Tu peux aussi utiliser Heroicons ou tout autre lib d'icônes

export function Navbar() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [resultSearch, setResultSearch] = useState([]);

    const handleSearch = (searchValue) => {
        setSearch(searchValue);

        if (searchValue.trim() === "") {
            setResultSearch([]);
            return;
        }

        const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=fr-FR&page=1`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjZiNjdmMDkxYmNlMDE3N2UyYzg2Y2ZjYTM3ZDAyMyIsIm5iZiI6MTc0NDIxMDkwOS43NTEwMDAyLCJzdWIiOiI2N2Y2OGJkZDZjMzU4M2M5NzU5OWM4NGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.odkbHUNKT2sAxz5HEv7RPFcnevy2ztX42TJGBoXKuZk",
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => setResultSearch(json.results))
            .catch((err) => console.error(err));
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-purple-400">Night</span>
                    <span className="text-2xl font-bold text-white">Flix</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="hover:text-purple-400">Accueil</Link>
                    <Link href="/popular" className="hover:text-purple-400">Populaires</Link>
                    <Link href="/news" className="hover:text-purple-400">Nouveautés</Link>
                    <Link href="/contacts" className="hover:text-purple-400">Contact</Link>
                    {user ? (
                        <Link href="/profile" className="hover:text-purple-400">Mon compte</Link>
                    ) : (
                        <Link href="/login" className="hover:text-purple-400">Se connecter</Link>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
                    <Link href="/" className="block hover:text-purple-400">Accueil</Link>
                    <Link href="/popular" className="block hover:text-purple-400">Populaires</Link>
                    <Link href="/news" className="block hover:text-purple-400">Nouveautés</Link>
                    <Link href="/contacts" className="block hover:text-purple-400">Contact</Link>
                    {user ? (
                        <Link href="/profile" className="block hover:text-purple-400">Mon compte</Link>
                    ) : (
                        <Link href="/login" className="block hover:text-purple-400">Se connecter</Link>
                    )}
                </div>
            )}

            {/* Search Bar */}
            <div className="px-4 py-2">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Rechercher un film..."
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Résultats */}
            {search !== "" && resultSearch.length > 0 && (
                <div className="bg-gray-900 px-4 pb-4">
                    <h2 className="text-white text-lg font-semibold mb-2">Résultats</h2>
                    <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                        {resultSearch.map((movie) => (
                            <SearchMovie key={movie.id} search={movie} />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
