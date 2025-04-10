import Link from "next/link";

export default function RecomandationsItems({ movie }) {
  return (
    <Link href={`/details/${movie.id}`}>
      <div className="bg-gray-800 w-60 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-52 object-cover rounded-t-xl" />
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
          <p className="text-gray-400 text-xs">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
}