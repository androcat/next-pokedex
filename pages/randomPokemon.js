function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

export default function RandomPokemon({ name, picture }) {
  console.log("name", name);
  console.log("pic? sprites", picture.sprites.front_default);

  //   let pokeName = results[randIndex]?.name;
  let pokePictureSrc = picture.sprites.front_default;

  return (
    <>
      <h2>Random Pokemon Picked for You:</h2>
      <h2>{name}</h2>
      <img src={pokePictureSrc} />
    </>
  );
}

export const getStaticProps = async () => {
  const pokemonRawData = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );
  const pokemonData = await pokemonRawData.json();

  const randIndex = getRandomIndex(pokemonData.results.length);

  const pokePic = await fetch(`${pokemonData.results[randIndex].url}`);
  const pokePicData = await pokePic.json();

  const pokeName = pokemonData.results[randIndex].name;

  console.log("Hellooooooo");
  //   if (!pokemonRawData.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error("Failed to fetch data");
  //   } else {
  //     console.log("Pokemon Raw Data", pokemonRawData.json());
  //   }

  console.log(pokemonData.results);

  return {
    props: { name: pokeName, picture: pokePicData },
  };
};
