import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import { FaSave } from "react-icons/fa";

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
            className="mt-2 border text-white px-4 py-1 rounded transition border-purple-500 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
            <FaSave className="inline m-4"/>
            Ajouter aux favoris
        </button>
    );
}
