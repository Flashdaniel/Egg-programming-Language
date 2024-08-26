import parse from "./parse.js";
import evaluate from "./evaluate.js";
import topScope from "./topScope.js";

export default function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}
