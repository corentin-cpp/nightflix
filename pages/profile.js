import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import Account from "@/components/Account";

export default function Profile() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [movies, setMovies] = useState([]);
    const [editProdile, setEditProfile] = useState(false);


    useEffect(() => {
        if (!user) return;

        supabase.from("profiles").select("*").eq("id", user.id).then(({ data }) => {
            if (data) {
                setProfile(data[0]);
            }
        });
        supabase.from("saved_movies").select("*").eq("user_id", user.id).then(({ data }) => {
            if (data) {
                setMovies(data);
            }
        });
    }, [user]);

    if (!user) return <p className="text-center mt-10">Chargement...</p>;

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-6 mb-10">
                    <img
                        src={
                            profile?.avatar_url ||
                            "https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + profile?.username
                        }
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover bg-zinc-700"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">
                            {profile?.username || "Utilisateur"}
                        </h2>
                        <p className="text-sm text-zinc-400">{user.email}</p>
                    </div>
                    <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                        onClick={() => setEditProfile(!editProdile)}
                    >
                        {editProdile ? "Annuler" : "Modifier le compte"}
                    </button>
                </div>

                {editProdile && (
                    <div className="mb-8">
                        <Account />
                    </div>
                )}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">🎬 Films enregistrés</h3>
                    {movies.length === 0 ? (
                        <p className="text-zinc-400">Aucun film enregistré pour le moment.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {movies.map((movie) => (
                                <div key={movie.movie_id} className="bg-zinc-800 p-2 rounded-xl shadow cursor-pointer" onClick={() => {
                                    window.location.href = `/details/${movie.movie_id}`;
                                }}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_url}`}
                                        alt={movie.title}
                                        className="rounded-md w-full h-56 object-cover"
                                    />
                                    <p className="mt-2 text-center">{movie.title}</p>
                                    <div className="flex justify-center">
                                        <button
                                            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-8 rounded-xl transition"
                                            onClick={() => {
                                                supabase
                                                    .from("saved_movies")
                                                    .delete()
                                                    .eq("user_id", user.id)
                                                    .eq("movie_id", movie.movie_id)
                                                    .then(() => {
                                                        setMovies(movies.filter((m) => m.movie_id !== movie.movie_id));
                                                    });
                                            }}>
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={logout}
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}
