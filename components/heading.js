export default function Heading({ text, size }) {
  return (
    <h1
      className={`font-title font-bold text-${size} text-center uppercase leading-tight tracking-tight`}
    >
      {text}
    </h1>
  );
}
