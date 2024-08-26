import evaluate from "./evaluate.js";

const specialForms = Object.create(null);

specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError("Wrong number of args in if");
  }

  if (evaluate(args[0], scope) !== false) return evaluate(args[1], scope);

  return evaluate(args[2], scope);
};

specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("Wrong number of args in while");
  }

  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  return false;
};

specialForms.do = (args, scope) => {
  let value = false;

  for (const arg of args) {
    value = evaluate(arg, scope);
  }

  return value;
};

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }

  const value = evaluate(args[1], scope);

  scope[args[0].name] = value;

  return value;
};

specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("Function needs a body");
  }

  const body = args[args.length - 1];
  const param = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type != "word") {
      throw new SyntaxError("Parameter name must be words");
    }

    return expr.name;
  });

  return (...args) => {
    if (args.length != param.length) {
      throw new TypeError("Wrong number of arguments");
    }

    const localScope = Object.create(scope);
    for (let i = 0; i < args.length; i++) {
      localScope[param[i]] = args[i];
    }

    return evaluate(body, localScope);
  };
};

specialForms.set = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("wrong number of arguments in set");
  }

  const body = args[args.length - 1];
  const param = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type != "word") {
      throw new SyntaxError("parameter names must be words");
    }

    return expr.name;
  });

  if (param[0] in scope) {
    const value = evaluate(body, scope);
    let inObject = Object.getPrototypeOf(scope);

    while (inObject != null) {
      if (Object.hasOwn(inObject, param[0])) {
        inObject[param[0]] = value;
        return value;
      }

      inObject = Object.getPrototypeOf(inObject);
    }
  } else {
    throw new ReferenceError(`No such word as ${param[0]}`);
  }
};

export default specialForms;
