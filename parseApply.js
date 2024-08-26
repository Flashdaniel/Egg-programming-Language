import parseExpression from "./parseExpression.js";
import skipSpace from "./skipSpace.js";

export default function parseApply(expr, program) {
  program = skipSpace(program);

  if (program[0] != "(") return { expr: expr, rest: program };

  program = skipSpace(program.slice(1));

  expr = { type: "apply", operator: expr, args: [] };

  while (program[0] != ")") {
    const arg = parseExpression(program);

    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);

    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] !== ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  return parseApply(expr, program.slice(1));
}
