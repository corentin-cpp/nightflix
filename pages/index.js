const { useEffect, useState } = require("react");
import { Bestseller } from "@/components/Bestseller";
import  Header  from "@/components/Header";
import { Movies } from "@/components/Movies";

export default function Home() {
  return (
    <main class="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <Header title="Bienvenue" backgroundImage="https://img.wallscloud.net/uploads/thumb/3122419738/month-1-62854-1024x576-MM-80.webp" />
        <Bestseller />
        <Movies />
    </main>
  )
}