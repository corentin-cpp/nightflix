import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

export default function Account() {
    const { user } = useAuth();
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("username, avatar_url")
                .eq("id", user.id)
                .single();

            if (data) {
                setUsername(data.username || "");
                setAvatarUrl(data.avatar_url || "");
            }

            if (error) console.error("Erreur de profil :", error.message);
        };

        fetchProfile();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { error } = await supabase
            .from("profiles")
            .update({
                username,
                avatar_url: avatarUrl,
            })
            .eq("id", user.id);

        if (error) {
            setError("Erreur lors de la mise à jour : " + error.message);
        } else {
            setSuccess("Profil mis à jour avec succès !");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6">
            <div className="max-w-xl mx-auto bg-zinc-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">🛠 Modifier mon profil</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Pseudo</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-zinc-700 text-white outline-none"
                            placeholder="Ton pseudo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Avatar (URL)</label>
                        <input
                            type="text"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-zinc-700 text-white outline-none"
                            placeholder="https://image.com/mon-avatar.png"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src={
                                avatarUrl ||
                                "https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + username
                            }
                            alt="Aperçu avatar"
                            className="w-24 h-24 rounded-full object-cover bg-zinc-600 mt-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
                    >
                        Mettre à jour
                    </button>

                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}
