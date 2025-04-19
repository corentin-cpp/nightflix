import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function signIn(e) {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            console.error("Error signing in:", error.message);
            setError("Erreur de connexion : " + error.message);
            return;
        }

        console.log("User data:", data);
        if (data.user) {
            window.location.href = "/profile"; 
        }
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
            style={{
                backgroundImage: `url(https://wallpapers.com/images/hd/movie-background-8js7bjaap8r5e4ly.jpg)`
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

            <form
                onSubmit={signIn}
                className="relative z-10 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-white">
                    🎬 Nightflix Login
                </h1>

                <div>
                    <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
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
                        onChange={(e) => setPassword(e.target.value.trim())}
                        className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none"
                        placeholder="••••••••"
                    />
                </div>
                <Link href="/register" className="text-sm text-purple-400 hover:underline block text-center">
                    Vous n’avez pas de compte ?
                </Link>
                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
                >
                    Se connecter
                </button>
                <p>{error}</p>
            </form>
        </div>
    );
}
