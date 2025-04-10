import Link from "next/link";

const { useEffect, useState } = require("react");


export default function Movie({ key, movies }) {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        setMovie(movies);
        console.log(movie);
    })

    return (
        <Link href={`/details/${movie.id}`}>
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h1>Coucou</h1>
            <h3 className="text-white font-semibold text-lg mb-1">{movie.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>
      </Link>
    )
}