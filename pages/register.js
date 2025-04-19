import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        const {error, data} = await supabase.auth.signUp({
            email: email,
            password: confirmPassword
        })

        if(error) {
            setError("Erreur lors de l'inscription : " + error.message);
            return;
        }

        if(data) {
            console.log("Inscription réussie :", data);
            window.location.href = "/profile";
            return;
        }
        console.log("Tentative d'inscription avec :", email);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
            style={{
                backgroundImage: `url(https://wallpapers.com/images/hd/cinema-popcorn-and-tickets-hczsz3bz2s58i1ls.jpg)`
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-white">
                    🎬 Créer un compte
                </h1>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div>
                    <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none"
                        placeholder="ton@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none"
                        placeholder="••••••••"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
                >
                    Créer mon compte
                </button>
            </form>
        </div>
    );
}
