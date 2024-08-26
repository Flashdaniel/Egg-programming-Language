import skipSpace from "./skipSpace.js";
import parseExpression from "./parseExpression.js";

export default function parse(program) {
  const { expr, rest } = parseExpression(program);

  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }

  return expr;
}
