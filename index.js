import egg from "./egg.js";

egg(
  `# sum numbers from 1 to 10

  do(define(count, 1),
    define(total, 0),
    while(<(count, 11),
        do(define(total, +(total, count)),
            define(count, +(count, 1)))
    ),
    print(total)
  )
  `
);
// 55

egg(`
    do(define(plusOne, fun(a, +(a, 1))),
       print(plusOne(10)))
`);
// 11

egg(`
    do(define(pow, fun(base, exp,
         if(==(exp, 0),
            1,
            *(base, pow(base, -(exp, 1)))))),
       print(pow(2, 10)))
`);
// 1024

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

egg(`
    # sum function that returns the sum of the numbers in an array

    do(define(sum, fun(array,
         do(define(i, 0),
            define(sum, 0),
            while(<(i, length(array)),
              do(define(sum, +(sum, element(array, i))),
                 define(i, +(i, 1)))),
            sum))),
       print(sum(array(1, 2, 3, 4))))
`);
// 10

egg(`
    # Example of closure in Egg

    do(define(f, fun(a, fun(b, +(a, b)))),
       print(f(4)(5)))
`);
// 9

egg(`
    do(define(x, 4),
       define(setx, fun(val, set(x, val))),
       setx(50),
       print(x))
`);
