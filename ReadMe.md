# Egg Programming Language

This is a programming language that can be used for anything like other programming languages(eg. python, javascript, ...).

## Table of contents

- [Overview](#overview)
  - [Example code](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Example code

parsing expression

```js
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
```

Create syntax tree

```js
function parseApply(expr, program) {
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
```

Evaluation of Syntax tree

```js
function evaluate(expr, scope) {
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
```

Egg programming language

```js
egg(`
    # concat to firstName and lastName

    do(define(firstName, "Warren"), 
        define(lastName, " Buffet"),
        define(fullName, 
            fun(firstName, lastName, 
                +(firstName, lastName)
            )
        ),
        print(fullName(firstName, lastName))
    )
`);

// "Warren Buffet"
```

## My process

### Built with

- JavaScript

### Useful resources

This guide is super useful

- [Eloquent javascript](https://eloquentjavascript.net)

## Author

- Linkedin - [@Nweze Daniel](https://www.linkedin.com/in/daniel-nweze-017909214/)
