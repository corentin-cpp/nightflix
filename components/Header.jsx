export default function Header({ title, backgroundImage }) {
  return (
    <div
      className="relative w-full h-64 md:h-80 lg:h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Texte centré */}
      <h1 className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4">
        {title}
      </h1>
    </div>
  );
}