const { useEffect, useState } = require("react");
import { Bestseller } from "@/components/Bestseller";
import  Header  from "@/components/Header";
import { Movies } from "@/components/Movies";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjZiNjdmMDkxYmNlMDE3N2UyYzg2Y2ZjYTM3ZDAyMyIsIm5iZiI6MTc0NDIxMDkwOS43NTEwMDAyLCJzdWIiOiI2N2Y2OGJkZDZjMzU4M2M5NzU5OWM4NGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.odkbHUNKT2sAxz5HEv7RPFcnevy2ztX42TJGBoXKuZk'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => { setMovies(json.results) })
      .catch(err => console.error(err));
  });

  return (
    <main class="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <Header title="Films Populaire" backgroundImage="https://image.tmdb.org/t/p/w500/8Yj0v2g5q3k4x1z6c7f7e4d5f5f.jpg" />
        <Bestseller />
        <Movies />
    </main>
  )
}