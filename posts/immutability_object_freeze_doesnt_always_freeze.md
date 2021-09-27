---
title: "Immutability (1) - Object.freeze() doesn't always freeze"
date: "Sep 23, 2021"
tag: ["JavaScript"]
excerpt: "How I build static blog site with Next.js, and general configuration to deploy to Github Pages in this post..."
---

Immutability in JavaScript is getting more attention, while functional programming paradigm is on the rise. One of the important features of functional programming is that it has no side-effect.

A side effect is any application state change that is observable outside the called function other than its return value. It cause more problems by concurrency in an application. JavaScript is single thread language though, execution environment, browser and node.js, process various task at the same time. To avoid side effects, we need to keep the state outside the function immutable.

We can declare and assign immutable primitive variable with 'const' keyword, and keep properties of an object with 'Object.freeze()' method. The freeze method, however, does not always make objects immutable.

In this post, I would like to explain why 'Object.freeze()' method is not complete way to make an object immutable, and to illustrate this, I need to deal with data type of JavaScript first.

---

## Data type of JavaScript

JavaScript has 2 kinds of data types. One is primitive, and other is reference. Reference type is object which including array and function, and primitive type values are below.

- string
- number
- bigint
- boolean
- undefined
- symbol
- null

---

## Primitive type

I declared a variable p1 and assigned number 1 to p1, number 1 is not assigned to p1 directly. At first, allocate number 1 to memory, and the memory address of number 1 is assigned to p1. Let's suppose the address of 1 is '1000'.(All of memory address in this post is hypothetical to help understand memory allocation of JavaScript)

I declared new variable p2, and assigned number 1 to p2, the same memory address, '1000', is assigned to p2. Number 1 is primitive type data, and immutable.

And I reassigned number 2 to p1. At this time, number 1 in the memory address '1000' won't be changed, but number 2 is allocated to memory address '1001' and it is assigned to p1. (I would not deal with garbage collection to free memory in this post)

| 1000 | 1001 |
| ---- | ---- |
| 1    | 2    |

```javascript
let p1; // declare variable
p = 1; // assign 1 (1000)
p = 2; // reassign 2 (1001)
```

---

## References

- [medium.com/javascript-scene](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
