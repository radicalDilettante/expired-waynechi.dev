---
title: "NeoQuery, the simplified jQuery"
date: "Sep 3, 2021"
tag: "JS Library"
excerpt: "I made a DOM manipulation library, and I was highly motivated from jQuery...
"
cover_image: "/images/posts/neoquery.png"
---

jQuery, which used to be a market-dominant library, is getting less attention in 2021. It is not an attractive option for new projects anymore, but legacy. Most browsers support web standards, and JavaScript improved a lot with ES6 update. We got fancy api like querySelectorAll() instead of getElementById(), and it is as convenient as jQuery methods.

In addition, jQuery is too heavy. In modern JS ecosystem, modularized library is recommend to use. jQuery, however, does have too many features. It helps Dom manipulation, CSS styling, event handling, animation, and ajax. They could be covered with modern JavaScript, or sometimes other modularized library like Axios.

But I believe jQuery syntax still works well. Especially its way to manipulate DOM with chaining method is still attractive. So I made a library, which is highly motivated from jQuery, and has similar methods and syntax, to manipulate DOM. It is [NeoQuery.](https://github.com/waynethebb/neoquery)

---

## Fluent Interface

A fluent interface is normally implemented by using method chaining to implement method cascading. jQuery is one of the most representative examples of use.

```javascript
//jQuery example
$("#textNode").css("color", "red").appendTo("#someDiv");
```

It is implemented by having each method return the object to which it is attached, often referred to as "this". Stated more abstractly, a fluent interface relays the instruction context of a subsequent call in method chaining, where generally the context is

- Defined through the return value of a called method
- Self-referential, where the new context is equivalent to the last context
- Terminated through the return of a void context

```javascript
Class Person{
    constructor(){
        this.name;
        this.age;
    }

    setName(name) {
        this.name = name
        return this
    }

    setAge(age) {
        this.age = age
        return this
    }

    sayHi() {
        console.log(`Hi. I am ${this.name}, ${age} years old.`)
        return this
    }
}

new Person().setName("Wayne").setAge("30").sayHi();
//"Hi. I am Wayne, 30 years old."
```

I tried to implement chaining method with similar syntax as jQuery. I didn't export class, but export $() function which create instance of the fluent interface class, and return method of the class.

```javascript
export default function $(query) {
  return neoQuery.selectQuery(query);
}

class NeoQuery {
  constructor() {
    this.element;
  }

  selectQuery(query) {
    const newElement = document.querySelectorAll(query);
    this.element = newElement;
    return this;
  }

  addClass() {
    ...
    this.element = ...
    return this;
  }

  appendTo(query) {
    ...
    this.element = ...
    return this;
  }
  ...
}

$("#textNode").addClass("myClass").appendTo("#someDiv");
```

---

## $()

The function, $(), is to create new instance, and start chaining methods. It has three features.

```javascript
$(callback);
// Binds a function to be executed when the DOM has finished loading.
// It doesn't chain methods.
// ex) $(()=>{console.log("ready")})

$(selector);
// Selects DOM elements with a CSS selector
// ex) $( "div.foo" ).---

$(html);
//Creates DOM elements from the provided string of raw HTML.
// ex) $("<div>test</div>").---
```

---

## Methods

I made all methods (except $()), have only one feature. It is to avoid unnecessary logic to categorize arguments for running different feature in one methods, and has more intuitive interface.

```javascript
// jQuery
attr(attributeName); // Get the value of attributes
attr(attributeName, value); // Set attributes

// neoQuery
attr(attributeName); // Get the value of an attributes
addAttr(attributeName, value); // Set attributes
```

---

## Other features

I didn't create ajax and animation features, and minimize styling and event handling features. I intended to make this library as light as possible.

### Styling

- addCss(propertyName, value)
- removeCss(propertyName)
- show()
- hide()

I believe in-line styling need to be rejected, so I did not implement other styling methods. Unlike jQuery, those method can get only one property name as an argument.("css()" the jQuery method can get object for css properties)

"show()" and "hide()" methods was only exception. I think those methods are more like DOM control, and it does not conflict against other style properties.

### Event

- on(event, callback)
- one(event, callback)
- off(event, callback)

I did not make other features to create event listener, but methods we can use with the browser event types.

---

## References

- ["jQuery: The write less, do more, JavaScript library"](http://jquery.com/)
- [Martin Fowler, "FluentInterface"](https://www.martinfowler.com/bliki/FluentInterface.html)
