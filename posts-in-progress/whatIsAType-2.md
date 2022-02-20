---
title: 'How to think in "Types"'
description: Thinking in "Types"
date: 2022-02-06
tags:
- Typescript
layout: layouts/post.njk
permalink: "/posts/whatIsAType-2/"
---

## Before reading...

This post assumes a basic understanding of Typescript. If you want a super brief overview of the language, check out my earlier [post](/posts/whatsUsefulAboutTypescript-1/).


## How to think in "Types"

Typescript can get a bit tricky as we start diving into some of the more advanced types such as Unions, Intersections, Mapped types, and a bunch more! This is when creating a solid foundation for how we think about types can save a lot of frustration. Let's start with dissecting one of Typescripts primitive types and expand from there. If you assign the type "boolean" to a property, Typescript will type check the value against anything in the domain of a boolean type. Imagine we wrote 'true' on a piece of paper and put it in a hat, then we wrote 'false' on a piece of a paper and put it in the same hat. The paper in the hat represents the domain of the boolean type. The same mental model can be used for a value assigned to a something else like a "number" type. Instead of only 2 pieces of paper in the hat, the domain would contain every possible value of a number. *There are [limitations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) to what a number can represent in Typescript, but we won't be getting into that within the scope of this post. Also depending on what settings you are using for strict NullChecks, you
