# JavaScript Q&A

## 1) What is the difference between var, let, and const?

- *var*  
  Declares a variable with *function scope*. It can be re-declared and updated. Hoisted to the top of its scope.

- *let*  
  Declares a variable with *block scope. It can be updated but **cannot* be re-declared in the same scope.

- *const*  
  Declares a variable with *block scope. It must be initialized at the time of declaration and **cannot* be reassigned.

---

## 2) What is the difference between map(), forEach(), and filter()?

- *forEach()*  
  Runs a function for each element in an array. It doesn’t return a new array, just performs side effects.

- *map()*  
  Transforms each element in an array and returns a *new array* with the results.

- *filter()*  
  Returns a *new array* containing only the elements that match a given condition.

---

## 3) What are arrow functions in ES6?

Arrow functions are a shorter way to write functions.  
They don’t have their own this context and instead use the this from their surrounding scope.

Example:
```js
// Regular function
function add(a, b) {
  return a + b;
}
```

// Arrow function
const add = (a, b) => a + b;

## 4) How does destructuring assignment work in ES6?

Destructuring lets you extract values from arrays or objects and assign them to variables in a clean way.

Example:
```js
// Array destructuring
const numbers = [1, 2, 3];
const [a, b] = numbers; 
console.log(a, b); // 1 2

// Object destructuring
const person = { name: "Sharif", age: 22 };
const { name, age } = person;
console.log(name, age);
```


## 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals use backticks (`) instead of quotes. They allow:

String interpolation with ${}

Multi-line strings

Easier readability compared to concatenation

Example:
```js
// String concatenation
let name = "Sharif";
let greet1 = "Hello, " + name + "!";

// Template literal
let greet2 = `Hello, ${name}!`;
