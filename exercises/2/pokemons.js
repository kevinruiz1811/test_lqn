const pokemons = [
  "audino",
  "bagon",
  "baltoy",
  "banette",
  "bidoof",
  "braviary",
  "bronzor",
  "carracosta",
  "charmeleon",
  "cresselia",
  "croagunk",
  "darmanitan",
  "deino",
  "emboar",
  "emolga",
  "exeggcute",
  "gabite",
  "girafarig",
  "gulpin",
  "haxorus",
  "heatmor",
  "heatran",
  "ivysaur",
  "jellicent",
  "jumpluff",
  "kangaskhan",
  "kricketune",
  "landorus",
  "ledyba",
  "loudred",
  "lumineon",
  "lunatone",
  "machamp",
  "magnezone",
  "mamoswine",
  "nosepass",
  "petilil",
  "pidgeotto",
  "pikachu",
  "pinsir",
  "poliwrath",
  "poochyena",
  "porygon2",
  "porygonz",
  "registeel",
  "relicanth",
  "remoraid",
  "rufflet",
  "sableye",
  "scolipede",
  "scrafty",
  "seaking",
  "sealeo",
  "silcoon",
  "simisear",
  "snivy",
  "snorlax",
  "spoink",
  "starly",
  "tirtouga",
  "trapinch",
  "treecko",
  "tyrogue",
  "vigoroth",
  "vulpix",
  "wailord",
  "wartortle",
  "whismur",
  "wingull",
  "yamask",
];

function findLongestSequence(list) {
  let longest = [];

  function backtrack(path, remaining) {
    if (path.length > longest.length) {
      longest = [...path];
    }

    for (let i = 0; i < remaining.length; i++) {
      const current = remaining[i];

      if (
        path.length === 0 ||
        current[0].toLowerCase() ===
          path[path.length - 1].slice(-1).toLowerCase()
      ) {
        const nextRemaining = remaining
          .slice(0, i)
          .concat(remaining.slice(i + 1));

        backtrack([...path, current], nextRemaining);
      }
    }
  }

  backtrack([], list);
  return longest;
}

const longestSequence = findLongestSequence(pokemons);
console.log("Se ha encontrado la longitud de secuencia más larga: ", longestSequence.length);
console.log(longestSequence.join(" → "));
