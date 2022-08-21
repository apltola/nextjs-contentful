function HeadingHero({ text }) {
  return (
    <h1
      className={`py-12 font-title font-bold text-3xl md:text-7xl text-center uppercase leading-tight tracking-tight`}
    >
      {text}
    </h1>
  );
}

export default HeadingHero;
