---
layout: post
title:  "Analysing different Operational Transformation algorithms for collaborative editing"
date:   2017-06-07 21:43:39 -0600
tags: technical javascript js code algorithm kde
---
## Introduction
This is the third post in my series of **Operational Transformation (OT)**, the real time collaborative editing algorithm. The first and second posts were [How Real-Time Collaborative Editors work? [Operational Transformation]](https://medium.com/@srijancse/how-real-time-collaborative-editing-work-operational-transformation-ac4902d75682) and [Operational Transformation, the real time collaborative editing algorithm respectively](https://medium.com/@srijancse/operational-transformation-the-real-time-collaborative-editing-algorithm-bf8756683f66).

As mentioned in earlier posts, Operational transformation was originally born due the need of consistency maintenance in collaborative text editors. In the span of over two decades OTs have gained new capabilities (such as undo operations and group undo) and have been applied to different applications ranging from HTML/XML editing, office tools and even 3D digital media design tools.

There are many established approaches that exists to operational transformation. In this post, I will walk through the different OT algorithms that are well defined and implemented.

### Definitions/Terms used :
In the second post, I explained about the two kinds of Transformation functions, i.e, Inclusion Transformation and Exclusion Transformation. These functions have two properties/preconditions which ensures OT correctness. TP1 and TP2 are the transformation/convergence properties.

**TP1** : For two concurrent operations O1 and O2, the transform function (T) satisfies TP1 iff O1 o T(O2, O1) ≡ O2 o T(O1, O2) where o denotes the sequence of operations containing Oi followed by Oj and ≡ denotes the equivalence of the two operations. 

**Precondition of TP1** : TP1 is required only if the Operational Transformation system allows any two operations to be executed in different orders.

**TP2** : For three concurrent operations O1, O2 and O3, the transform function (T) satisfies TP2 iff T(O3, O1 o T(O2, O1)) ≡ T(O3, O2 o T(O1, O2)). 

**Precondition of TP2** : TP2 is required only if the OT system allows two operations O1 and O2 be IT-transformed in two different document states (or contexts).
