export default function Heading({ text, size }) {
  return (
    <h1
      className={`font-title font-bold text-3xl md:text-${size} text-center uppercase leading-tight tracking-tight`}
    >
      {text}
    </h1>
  );
}
