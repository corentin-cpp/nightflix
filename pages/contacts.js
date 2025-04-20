import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';
import { useAuth } from '@/context/AuthProvider';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';


export default function Contacts() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const { data, error } = await supabase.from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setUserData(data);
          console.log("User data:", data);
        }
      }
    }
  
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <h1 className="text-4xl font-bold mb-4 text-white">Contact</h1>
      <p className="text-lg mb-8 text-gray-300 text-center">
        Adressez-nous un message afin d&apos;assurer un meilleur suivi.
      </p>

      {/* Formulaire */}
      <form className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md mb-10">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Nom
          </label>
          <input
            type="text"
            value={userData?.username}
            id="name"
            placeholder="Votre nom"
            className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            value={user?.email}
            type="email"
            id="email"
            placeholder="Votre email"
            className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Votre message"
            className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded w-full"
        >
          Envoyer
        </button>
      </form>

      {/* Réseaux sociaux */}
      <div className="flex space-x-6 text-white text-2xl">
        <a href="https://github.com/corentin-cpp" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/corentin-hoffmann/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/corentin.hfn" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}
