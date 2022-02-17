---
title: What's useful about Typescript?
description: How changing your mental model can help understand Typescript
date: 2022-01-29
tags:
  - Typescript
layout: layouts/post.njk
permalink: "/posts/whatsUsefulAboutTypescript-1/"
---

## Before reading...

This post assumes a basic understanding of functions and objects. Although, my goal for these posts is to make it fairly easy to understand for folks at any level.

## What's useful about Typescript?

Something important to understand right out of the gate is that Typescript is not an entirely different language than Javascript. If you take an error free .js file and change the extension to .ts the result of running the file will be equivalent. However, a .ts file is not a valid .js file. This is because Typescript is a superset of Javascript; which is a fancy way of saying it has all the language features of Javascript plus extra "stuff" specific to Typescript. All those "extra language features" Typescript provides would cause a Javascript program to have syntax errors. This will make a bit more sense shortly once we discuss what Typescript is actually doing with our code.

One of these "extra" things that Typescript brings to the table is type annotations. A type annotation is essentially a contract between a function or variable and its intended value. Let's explore what this means a bit...

Check out this Javascript function below that has a parameter named skateboard. The only thing this function does is take the argument passed to it and attempts to console log a "wheels" property.

```js/
function printSkateboardPart(skateboard) {
  console.log(skateboard.wheels);
}
```

Now lets call this function!

```js/
printSkateboardPart("skateboard");
//undefined
```

Well this is awkward 😳... We called the function and passed a string value but the function body tried to access a property named "wheels" on the string. The string primitive in javascript doesn't have a property named "wheels", so it assigns "undefined" to the statement and logs it. Not exactly what we wanted! Yet, Javascript is super chill and doesn't tell us this will happen until we go ahead and call the function.

While this example is not complex, it will provide a good use case for showcasing the power of Typescript type annotations! First lets create something called an interface to describe our skateboard type. At a high level an interface is a way to create a named structure that represents an object.

In this case, lets create a basic "Skateboard" interface and name some properties of a skateboard.

```ts/
interface Skateboard {
  deck: string;
  wheels: string;
  trucks: string;
};
```

Awesome! Now that we have this interface described, we can re-write our Javascript function above using Typescript. Let's utilize the Skateboard interface by assigning a type to the parameter in our function from earlier. The way a type is assigned to a value in Typescript is by using a colon. Here's how it would look:

```ts/0/0
function printSkateboardPart(skateboard: Skateboard) {
  console.log(skateboard.wheels);
}
```

🥳 Congrats, we just wrote our first Typescript function! *_We could also add a return type to this function, although most TS style guides leave that up to the code author. For now, we will ignore this for simplicity._

With the added type annotation, Typescript can now perform type checking and warn us when someone tries to call the function with an argument that does not fit into the "Skateboard" domain. Type checking is one of the most valuable features of Typescript. Here is how it would help protect us from bugs while we code:

```ts/
printSkateboardPart("skateboard");
//TS2345: Argument of type 'string' is not assignable to parameter of type 'Skateboard'.
```

**Typescript is like having a built-in proofreader, so we make fewer mistakes.** It notifies us right away if we are doing something that could cause run-time errors. Let's correct this bug and showcase all the code up to this point.

```ts/
interface Skateboard {
    deck: string;
    wheels: string;
    trucks: string;
}

function printSkateboardPart(skateboard: Skateboard) {
    console.log(skateboard.wheels);
}

printSkateboardPart({
    deck: 'Baker',
    wheels: 'Spitfire',
    trucks: 'Independent'
});

//Spitfire
```

By passing an object argument with the same properties defined in our Interface, we have resolved the Type error from before. Now we can see the output of this function call properly prints the string value assigned to the "wheels" property.

Before moving on, I think it's important to understand how this is actually working at a high level. One often confusing point is that we aren't ever actually running Typescript code. If you copied the above code snippet into an editor, you would find that there's no way to "run" or execute this file. That's because Typescript has to be compiled first into Javascript. In order to be able to run the above code we have to perform the following actions at the command line

```txt/
> npm i typescript              //downloads typescript
> npx tsc skateboard.ts         //compiles typescript and generates a skateboard.js file
```

*_In order to use npm and npx you must download [Node.js](https://nodejs.org)_

After running the compile step, you should see a new file in your project called "skateboard.js" which should look like this:

```js/
function printSkateboardPart(skateboard) {
    console.log(skateboard.wheels);
}
printSkateboardPart({
    deck: 'Baker',
    wheels: 'Spitfire',
    trucks: 'Independent'
});
```

No more type annotations! Just a plain old vanilla Javascript file that can be executed in any Javascript runtime (Web Browsers, Node.js, Deno, etc.) **Typescript provides value by catching bugs in our code before they are executed.** While this example is small, you can imagine projects with thousands of lines of code across hundred of files. Adopting Typescript in a project is just another tool we can use to help diminish future headaches our code may cause.

## Conclusion

This is by no means an in-depth overview of all that Typescript has to offer. I just decided to pick some of the most important aspects of the language to me, and try and give a somewhat deeper look into how it all works together.
