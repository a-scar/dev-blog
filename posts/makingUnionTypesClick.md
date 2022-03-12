---
title: 'Making Union types click'
description: Making Union types click in Typescript
date: 2022-03-12
tags:
- Typescript
layout: layouts/post.njk
permalink: "/posts/makingUnionTypesClick-2/"
---

Typescript can get a bit tricky as we start diving into some of the more advanced Types such as Unions, Intersections, and Mapped Types. This is when creating a solid foundation for how we think about Types can save a lot of frustration. A great way to think about how Types work, is to consider what the "domain" of a Type consists of. In other words, all the possible values that could be assigned to a given variable. Let's start with dissecting one of Typescripts primitive Types and expand from there.

If you assign the Type "boolean" to a property, Typescript checks the value against anything in the domain of a boolean type. Ok, so what is the domain in this example? Imagine we wrote 'true' on a piece of paper and put it in a hat, then we wrote 'false' on a piece of a paper and put it in the same hat. **The paper in the hat represents the domain of the boolean type.** The same mental model can be used for a value assigned to something else like a "number" type. Instead of only 2 pieces of paper in the hat, the domain would contain every possible value of a number. *There are [limitations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) to what a number can represent in Typescript, but we won't be getting into that within the scope of this post. Also depending on what settings you are using for strict NullChecks, you would have to consider if undefined and null also fall into the domain of that Type.

The reason it helps to think about types in this way is because it clears up questions that will be encountered as more advanced types are utilized. A common misconception is what a Union Type actually represents according to Typescript. Let's use this mental model to try and finally make Union types "click".

### Let's understand Union Types

Typescript gives us the ability to use something called 'operators'. Operators are built into the Typescript language and allow us to combine existing Types to create entirely new Types. There are many kinds of operators in Typescript, and the union operator is one of the more popular ones to understand. The union operator is implemented via the vertical pipe symbol on our keyboards.

```ts
type MyFirstUnion = string | number;
```

Applying the union operator to two or more existing types will create what's called a Union type. The code example above creates a new Union type called 'MyFirstUnion'. Now, recall from earlier that a type simply defines all the possible values that can be assigned to a given variable. With that in mind, lets break down exactly what is in the "domain" of 'MyFirstUnion'.

```txt
Domain of MyFirstUnion (assuming strict null checking is ON):
- any string value
- any number value
```

This is fairly easy to reason about and means that we can apply that type to a property, and it will enforce that the value is going to be either a string or a number.

```ts
const id1: MyFirstUnion = '2' //All good!
const id2: MyFirstUnion = 2   //All good!
const id3: MyFirstUnion = {}  //Type '{}' is not assignable to type 'MyFirstUnion'
```

Here we can see that Typescript will throw and error since an empty object is not contained in the domain of 'MyFirstUnion'.

Something that is important to understand about union types is you can only use javascript operations on those values that are valid for EVERY member of the union. Typescript sees that we've assigned a variable as 'MyFirstUnion', but it doesn't know at any given moment if the value is indeed a string or a number. All it understands is that the value assigned must be within the domain of that type. So, for example if we wanted to perform an operation that is only valid on a string value, we would get an error!

```ts
function getLength(id: MyFirstUnion) {
  return id.length;

  // Property 'length' does not exist on type 'MyFirstUnion'.
  // Property 'length' does not exist on type 'number'.
}
```

This might be surprising at first, but once we really grasp what a union type does, it makes total sense! In the above getLength function, what would happen if we passed a number value? During run time of our function, it would return 'undefined' which is probably not what we would want!

This rule is also true for any dot operations on an object. Dot operators are used to access properties of an object and are generally used like:

```ts
const house = {
  rooms: 3
}
console.log(house.rooms) // 3
```

If we try to access a property of a union type, it will only allow us to perform that operation if it's valid for ALL members of the union. Take this new union type composed of two existing types.

```ts
interface Home {
  rooms: number
}

interface Extras {
  backyard?: boolean
}

type HomeDetails = Home | Extras

function logRooms(home: HomeDetails) {
  console.log(home.rooms)

  // Property 'rooms' does not exist on type 'HomeDetails'.
  // Property 'rooms' does not exist on type 'Extras'
}
```

With this in mind, it might not seem overly useful to apply union types when Typescript doesn't even provide useful auto-completions or type safety. However, fear not! There are some nifty ways we can "narrow" these union types so that Typescript is aware of exactly which of the union'd types we want to use.


### Narrowing Unions

still writing...

