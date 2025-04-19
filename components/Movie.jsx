import Link from "next/link";
import { useEffect, useState } from "react";

export default function Movie({ movies }) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        setMovie(movies);
    }, [movies]);

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
            <Link href={`/details/${movie.id}`}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                />
            </Link>

            <div className="p-4 space-y-2">
                <Link href={`/details/${movie.id}`}>
                    <h3 className="text-white font-semibold text-lg hover:underline">
                        {movie.title}
                    </h3>
                </Link>
                <p className="text-gray-400 text-sm line-clamp-3">
                    {movie.overview}
                </p>
            </div>
        </div>
    );
}
