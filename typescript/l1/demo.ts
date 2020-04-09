interface Point {
  x: number;
  y: number;
}

interface Test {
  x: number;
  str: string;
}

function tsDome(data: Point) {
  console.log("typescript");
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}

tsDome({ x: 1, y: 123 });

const tests: Test = {
  x: 10,
  str: "asdf",
};
