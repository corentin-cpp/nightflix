export default function Footer() {
    return (
        <footer class="bg-gray-800 text-gray-300 py-10 mt-16">
            <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div>
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="text-2xl font-bold text-purple-400">Night</span>
                        <span class="text-2xl font-bold text-white">Flix</span>
                    </div>
                    <p class="text-gray-400">
                        NightFlix vous permet de découvrir et explorer des films du monde entier.
                        Accédez à des informations complètes, notes, recommandations et plus encore.
                    </p>
                </div>
                <div>
                    <h3 class="text-white font-semibold mb-2">Navigation</h3>
                    <ul class="space-y-1">
                        <li><a href={`/`} class="hover:text-purple-400 transition">Accueil</a></li>
                        <li><a href={`/popular`} class="hover:text-purple-400 transition">Populaires</a></li>
                        <li><a href={`/news`} class="hover:text-purple-400 transition">Nouveautés</a></li>
                        <li><a href={`/contacts`} class="hover:text-purple-400 transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-white font-semibold mb-2">Crédits</h3>
                    <p>
                        Données fournies par <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:underline">TMDB API</a>.
                    </p>
                    <p class="mt-2">© {new Date().getFullYear()} NightFlix. Tous droits réservés.</p>
                    <p class="mt-2">Développer par HOFFMANN Corentin</p>
                </div>

            </div>
        </footer>

    )
}