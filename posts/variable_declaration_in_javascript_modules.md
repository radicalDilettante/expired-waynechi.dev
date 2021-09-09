---
title: "Variable declaration in JavaScript Modules"
date: "Sep 2, 2021"
tag: ["JavaScript"]
excerpt: 'In module JavaScript, however, "this" refers to "undefined" in the top level context...
'
---

This study started with only a single line of code I did not understand.

```javascript
// type = "module"
console.log(this); // undefined
```

---

## Where the hell is "window"?

In the global execution context (outside of any function), "this" refers to the global object. If its runtime environment is a browser, it is "window". In module JavaScript, however, "this" refers to "undefined" in the top level context.

Modules are imported into the scope of single scripts. They cannot be called from global scope.

Modules have a lexical top-level scope. This means that for example, running var foo = 42; within a module does not create a global variable named foo, accessible through window.foo in a browser, although that would be the case in a classic script.

Similarly, the this within modules does not refer to the global this, and instead is undefined.

---

## Variables Declaration

All variables in JavaScript is properties of objects, and a global variable is assigned to a property of global object.

```javascript
var a = "hi";
console.log(a); // hi
console.log(window.a); // hi
console.log(this.a); // hi
```

What object is variables, declared in top-level scope of modules, assigned to?

When variables is declared, it is assigned to a property of LexicalEnvironment component in execution context. The variables in top-level scope of modules are also assigned to LexicalEnvironment like any other execution contexts, but not global object like global variable. Only global variable is assigned to the global object, and then LexicalEnvironment refer the global object.

---

## "var" and "let"

For both modules and commonjs, variables declared suing the "let", and constants are not assigned to a global property, but only LexicalEnvironment.

```javascript
let a = "hi";
console.log(a); // hi
console.log(window.a); // undefined
console.log(this.a); // undefined
```

---

## References

- [this - JavaScript | MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/this)
- [JavaScript modules - JavaScript | MDN](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules)
- [JavaScript modules · V8](https://v8.dev/features/modules#mjs)
