---
layout: post
title:  "My Experiences with NodeJS"
date:   2017-01-04 9:00:39 -0600
tags: code 
---

For the past few months, I have been working with Node.js aka The Node (:D).

**Node : Easy to learn, Impossible to master**

If you want to summarize in a line, I would say this (^). If you’ve some experience with JavaScript, then Node is very easy to learn. Google for a few tutorials, play around with *Express.js*, and you’re good to go. But as soon as you start playing, you remember, what about database? And, then *NPM* comes to the rescue. Few SQL packages could be found, but I always go with Mongo. Easy to work it and open sourced.

Packages that consist of trivial code no more than 10 lines of code are downloaded in the thousands every day from NPM. Seriously!? You need a dependency for array type checking? And these packages are used by some huge tools such as React.
You’ll never master something that moves at break-neck speed, not to mention the potential of dependency instability.

**Want to catch errors? Good luck, boss!**

Me, Coming from other languages such as Python or PHP I’d expect throwing and catching errors, or even returning an error from a function would be a straightforward way of handling errors. It’s not the case with Node.

Instead, one gets to pass errors around in the callbacks (or promises) — that’s right! No throwing of exceptions. Not to mention if you forget to return your callback on an error, it continues to run and triggers another set of errors after you returned the initial one.

Even if you do manage to come up with a solid standard for your own errors, you can’t confirm (without reading the source) that the many of the NPM packages you have installed follow the same pattern.

**Final thoughts on Node**

Go for it. (:D) It’s amazing. It’s fast. It makes Real-Time easy. Well Documented API. And at last, It’s fun.
