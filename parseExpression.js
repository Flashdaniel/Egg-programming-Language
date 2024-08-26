import skipSpace from "./skipSpace.js";
import parseApply from "./parseApply.js";

function parseExpression(program) {
  program = skipSpace(program);

  let expr;
  let match;

  if ((match = /^"([^"]*)"/.exec(program))) {
    expr = { type: "value", value: match[1] };
  } else if ((match = /^\d+\b/.exec(program))) {
    expr = { type: "value", value: Number(match[0]) };
  } else if ((match = /^[^\s(),#"]+/.exec(program))) {
    expr = { type: "word", name: match[0] };
  } else {
    throw new SyntaxError(`Unexpected syntax: ${program}`);
  }

  return parseApply(expr, program.slice(match[0].length));
}

export default parseExpression;
