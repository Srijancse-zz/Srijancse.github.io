---
layout: post
title:  "Analysing different Operational Transformation algorithms for collaborative editing"
date:   2017-06-07 21:43:39 -0600
tags: technical javascript js code algorithm kde
---
**Introduction**
This is the third post in my series of **Operational Transformation (OT)**, the real time collaborative editing algorithm. The first and second posts were [How Real-Time Collaborative Editors work? [Operational Transformation]](https://medium.com/@srijancse/how-real-time-collaborative-editing-work-operational-transformation-ac4902d75682) and [Operational Transformation, the real time collaborative editing algorithm respectively](https://medium.com/@srijancse/operational-transformation-the-real-time-collaborative-editing-algorithm-bf8756683f66).

As mentioned in earlier posts, Operational transformation was originally born due the need of consistency maintenance in collaborative text editors. In the span of over two decades OTs have gained new capabilities (such as undo operations and group undo) and have been applied to different applications ranging from HTML/XML editing, office tools and even 3D digital media design tools.

There are many established approaches that exists to operational transformation. In this post, I will walk through the different OT algorithms that are well defined and implemented.

### Definitions/Terms used :
In the second post, I explained about the two kinds of Transformation functions, i.e, Inclusion Transformation and Exclusion Transformation. These functions have two properties/preconditions which ensures OT correctness. TP1 and TP2 are the transformation/convergence properties.

**TP1** : For two concurrent operations O1 and O2, the transform function (T) satisfies TP1 iff O1 o T(O2, O1) ≡ O2 o T(O1, O2) where o denotes the sequence of operations containing Oi followed by Oj and ≡ denotes the equivalence of the two operations. 

**Precondition of TP1** : TP1 is required only if the Operational Transformation system allows any two operations to be executed in different orders.

<div class="image-wrap">
<div class="image-block">
    <img src="/images/OTtp1.jpg" alt="TP1">
</div>
</div>

**TP2** : For three concurrent operations O1, O2 and O3, the transform function (T) satisfies TP2 iff T(O3, O1 o T(O2, O1)) ≡ T(O3, O2 o T(O1, O2)). 

<div class="image-wrap">
<div class="image-block">
    <img src="/images/OTtp2.jpg" alt="TP2">
</div>
</div>

**Precondition of TP2** : TP2 is required only if the OT system allows two operations O1 and O2 be IT-transformed in two different document states (or contexts).

** 1. dOPT — distributed OPerational Transformation**

The dOPT Algorithm was one of the first approaches to OT. In dOPT Algorithm, each machine has an identifier i, which could be an IP or MAC. Each machine has to maintain a state vector s with n components where n is the number of machines. The i component store the number of changes recorded by the ith machine. The requests are of the form: < i, s, o, p >

* i — the original site’s identifier

* s — the state vector of the machine which is sending

* o — the operation which needs to be performed

* p — the priority which is associated with o [**this is where the algorithm got wrong**]

A transformation matrix, denoted as T, is what solves *conflicting operations*. T is a *m x m* matrix, where *m* is the number of supported operations in the group-ware system. Each entry in the matrix is a function which transforms operations into other operations and to ensure convergence dOPT requires the Transformation Property 1.

For handling requests, the actions are based on comparisons between *s_i* [sending state] and *s_x* [receiving state]. If they are same i.e *s_i = s_x*, *o* is executed immediately, if *s_i > s_x*, *o* is queued and executed later and if *s_i < s_x*, *o* is transformed and then executed.

** Strengths of the algorithm ** :

* Immediate feedback for local operations.

* Does not require locking of resources.

* Relatively easy to implement due to its simple data structures.

* Satisfies the *precedence property*, which is defined as, a consistency property which ensures that the execution order is the same as the operations natural cause-effect order. In other words if an operation O1 causally precedes another operation O2, then at every site O1 will be executed before O2.

* Enforces the *Transformation property 1*.

**Problems:**

The priority, *p*, suggested doesn’t work great for two clients. It fails whenever an operation is concurrent with two or more dependent operations. This algorithm is distributed and does not have a **central server**.

