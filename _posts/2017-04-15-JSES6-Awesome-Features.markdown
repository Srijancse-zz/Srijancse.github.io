---
layout: post
title:  "Awesome features you must be using in JavaScript ES6!"
date:   2017-04-15 01:43:39 -0600
tags: technical javascript js code
---

<div class="image-wrap">
<div class="image-block">
    <img src="/images/js.png" alt="js">
</div>
</div>

As the JavaScript community continued to expand rapidly in last few years, a lot of good things have happened to JavaScript as a language. One of those good things was its penetration into the server-side development world via Node.js (yaay).

**Disclaimer**: the list if highly biased and subjective. It is in no way was intended to diminish usefulness of other ES6 features, which didn’t make it to the list simply because I had to limit the number to 3.


<h3> 1. Default Parameters in ES6 </h3>
Before the arrival of ES2015, when one wanted to specify a default parameter in a function, he/she had to do it in the body of the function like so:

```
function greetHuman(name) {
    name = name || 'human';
    return 'Hello ' + name + ', we come in peace';
}
    greetHuman();
    greetHuman('Srijan');
```

They were okay until the value was 0, because 0 is falsy in JavaScript and it would default to the hard-coded value instead of becoming the value itself. Of course, who needs 0 as a value (:P), so we just ignored this flaw and used the logic OR anyway. No more!

With ES6, one can now do this in a function head and as such, we no longer have to perform checks for undefined parameters in the function's body.

Here's what the code in ES6 would look like if you're combining arrow functions, template literal, and default:

```
const greetHuman = (name = 'human') => `Hello ${human}, we come in peace`;
greetHuman('Srijan'); 'Hello Srijan, we come in peace'
greetHuman(); 'Hello human, we come in peace'

```
<h3> 2. Arrow Functions in ES6 </h3>
If you are a JavaScript developer, you would already know the good old way of declaring functions.

This is probably one feature I waited the most. Now we have them in ES6. The arrows are amazing because they would make your this behave properly, i.e., `this` will have the same value as in the context of the function—it won’t mutate. The mutation typically happens each time you create a closure.

Using arrows functions in ES6 allows us to stop using `that = this or self = this or _this = this or .bind(this)`.

Good ol' ES5 code :
```
var _this = this
$('.btn').click(function(event){
  _this.send()
})
```

This is the ES6 code without *_this = this:*

```
$('.btn').click((event) =>{
  this.send()
})
```

As you can see, the code looks shorter and cleaner — we can even omit the curly braces ``{}`` (one-liners only). There is support for implicit return as well, so we can conveniently omit the `return` keyword.

<h3> 3. Template Literals in ES6 </h3>

Template literals or interpolation in other languages is a way to output variables in the string. This remains one of the most important feature as it really makes string concatenation easier and much more bearable.

So in ES5 we had to break the string like this:

```
var name = 'Your name is ' + first + ' ' + last + '.'
var url = 'http://localhost/api/' + id
```

Luckily, in ES6 we can use a new syntax ``${NAME}`` inside of the back-ticked string:

```
var name = `Your name is ${first} ${last}.`
var url = `http://localhost/api/${id}`
```

You can learn more about ES6 features [here](http://exploringjs.com/es6/). A [cheatsheet](https://github.com/azat-co/cheatsheets/tree/master/es6) too.
