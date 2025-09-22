for (let index = 0; index <= 100; index++) {
  let output = index;

  if (index % 2 === 0) {
    output += " buzz";
  }

  if (index % 5 === 0) {
    output += " bazz";
  }

  console.log(output);
}
