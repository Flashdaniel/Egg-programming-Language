const topScope = Object.create(null);

topScope.false = false;
topScope.true = true;

for (const op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = (value) => {
  console.log(value);
};

topScope.array = (...value) => {
  console.log(value);
  return [...value];
};

topScope.length = (array) => {
  return array.length;
};

topScope.element = (array, i) => {
  return array[i];
};

export default topScope;
