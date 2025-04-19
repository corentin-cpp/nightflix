import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

export default function SaveButton({ movie }) {
    const { user } = useAuth();

    const handleSave = async () => {
        if (!user) {
            alert("Tu dois être connecté pour ajouter un film à tes favoris !");
            return;
        }
        const { error } = await supabase.from("saved_movies").insert([
            {
                user_id: user.id,
                movie_id: movie.id,
                title: movie.title,
                poster_url: movie.poster_path,
            },
        ]);
        if (error) {
            console.error("Erreur lors de l'enregistrement :", error);
            alert("Erreur lors de l'enregistrement du film.");
        } else {
            alert("Film ajouté à tes favoris !");
        }

        console.log("À enregistrer :", {
            user_id: user.id,
            movie_id: movie.id,
            title: movie.title,
            poster_url: movie.poster_path,
        });
    };

    return (
        <button
            onClick={handleSave}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded transition"
        >
            📌
        </button>
    );
}
