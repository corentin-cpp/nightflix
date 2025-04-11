export default function Header({ title, backgroundImage }) {
  return (
    <div
      style={{
        height: '300px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'red',
        position: 'relative',
        zIndex: 0,
      }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 10,
        }}></div>

      <h1
        style={{
          position: 'relative',
          zIndex: 20,
          color: 'white',
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          paddingTop: '100px',
        }}>
        {title}
      </h1>
    </div>
  );
}
