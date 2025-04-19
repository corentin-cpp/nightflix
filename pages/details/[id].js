import Header from '@/components/Header'
import Movie from '@/components/Movie'
import Players from '@/components/Players'
import RecomandationsItems from '@/components/RecomandationsItems'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SaveButton from '@/components/SaveButton'
import Image from 'next/image'

export default function ProduitDetail() {
  const [details, setDetails] = useState({})
  const [recommandations, setRecommandations] = useState([])
  const [preview, setPreview] = useState({})
  const router = useRouter()
  const { id } = router.query

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjZiNjdmMDkxYmNlMDE3N2UyYzg2Y2ZjYTM3ZDAyMyIsIm5iZiI6MTc0NDIxMDkwOS43NTEwMDAyLCJzdWIiOiI2N2Y2OGJkZDZjMzU4M2M5NzU5OWM4NGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.odkbHUNKT2sAxz5HEv7RPFcnevy2ztX42TJGBoXKuZk'
    }
  }

  useEffect(() => {
    if (!id) return

    // Détails du film
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(json => setDetails(json))
      .catch(err => console.error(err))

    // Bande annonce
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(json => setPreview(json.results))
      .catch(err => console.error(err));

    // Recommandations
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(json => setRecommandations(json.results))
      .catch(err => console.error(err))
  }, [id, options])

  return (
    <div>
      <Header title="Détails du film"
        backgroundImage={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} />
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row gap-8">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt={details.title}
              className="w-full md:w-64 rounded-xl shadow-lg object-cover"
            />
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-bold text-purple-400">{details.title}</h1>
              <p className="text-gray-400 italic">{details.tagline}</p>

              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>{details.release_date}</span>
                <span>{details.runtime} minutes</span>
                {details.spoken_languages?.map((lang, index) => (
                  <span key={index}>
                    {lang.name}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {details.genres?.map((genre, index) => (
                  <span key={index} className="bg-purple-700 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <span className="text-yellow-400 text-xl">⭐ {details.vote_average}
                </span>
                <span className="text-gray-400 text-sm">({details.vote_count})</span>
              </div>
              <SaveButton movie={details} />
              <p className="text-gray-300 mt-4 leading-relaxed">
                {details.overview}
              </p>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">🎬 Production</h3>
                <div className="flex flex-wrap items-center gap-6">
                  {details.production_companies?.map((deta, index) => (
                    deta.logo_path && (
                      <div key={index} className="flex flex-col items-center">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${deta.logo_path}`}
                          alt={deta.name}
                          className="w-16 h-16 rounded-full shadow-lg object-contain bg-white p-1"
                        />
                        <span className="text-gray-300 text-center text-sm">{deta.name}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
          {preview.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Clips du films</h2>
              <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 pb-2">
                {preview.map((clip) => (
                  <Players key={clip.id} movies_id={clip.key} />
                ))}
              </div>
            </div>
          )}

          {recommandations.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Recommandations</h2>
              <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 pb-2">
                {recommandations.map((movie) => (
                  <RecomandationsItems key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
