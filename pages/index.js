const { useEffect, useState } = require("react");
import { Bestseller } from "@/components/Bestseller";
import  Header  from "@/components/Header";
import { Movies } from "@/components/Movies";

export default function Home() {
  return (
    <main class="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <Header title="Films Populaire" backgroundImage="https://image.tmdb.org/t/p/w500/8Yj0v2g5q3k4x1z6c7f7e4d5f5f.jpg" />
        <Bestseller />
        <Movies />
    </main>
  )
}