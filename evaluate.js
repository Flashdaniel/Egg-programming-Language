import specialForms from "./specialForms.js";

export default function evaluate(expr, scope) {
  if (expr.type == "value") {
    return expr.value;
  }

  if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    }
  }

  if (expr.type == "apply") {
    const { operator, args } = expr;

    if (operator.type == "word" && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      const op = evaluate(operator, scope);

      if (typeof op == "function") {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying on a non-function");
      }
    }
  }
}
