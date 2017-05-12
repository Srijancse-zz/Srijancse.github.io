---
layout: post
title:  "Operational Transformation, the real time collaborative editing algorithm [Operations and Transformations]"
date:   2017-05-11 09:43:39 -0600
tags: technical javascript js code algorithm 
---

This is the second post about **Operational Transformation**, the real time collaborative editing algorithm. The first post was [How Real-Time Collaborative Editors work? [Operational Transformation]](http://www.srijanagarwal.me/writing/collaborative-editing/). 

In this post, I would be digging deep into how clients wait for **acknowledgement** from server before sending more operations and compound operational transformation. 

### Transformation function
To recap, for handling concurrent operations, we use the **tranform** function that takes two operations that have been applied to the same document state (but on different clients) and computes a new operation that can be applied after the second operation and that preserves the first operation’s intended change. 

Basically, there exists two kinds of transformation functions :

* **Inclusion Transformation** : denoted as IT(a, b), which transforms Operation `a` against another operation `b` in such a way that the impact of `b` is effectively included.


* **Exclusion Transformation** : denoted as ET(a, b), which transforms operation `a` against another operation `b` in such a way that the impact of `b` is effectively excluded.

Transformation functions are named differently in different OT systems, and some compound transformation functions may combine both IT and ET functionalities in one function. One of the papers, [Analysis of Operational Transformation Algorithms](http://www.springer.com/cda/content/document/cda_downloaddocument/9788132226369-c2.pdf?SGWID=0-0-45-1564306-p177709634) is really good, and analyses all the different OT systems.

#### Character wise Transformation Function

A character wise transformation function's algorithm (for consistency maintenance) is simple.  As an example, for a pair of character-wise operations `Ins[p, c]` (to insert a character c at the position p) and `Del[p]` (to delete a character at position p), four IT functions, denoted as `Tii`, `Tid`, `Tdi`, `Tdd`, can be defined as follows:

```
Tii(Ins[p1,c1], Ins[p2, c2]) {
      if p1 < p2  or (p1 = p2 and u1 > u2)    // breaking insert-tie using user identifiers (u1, u2)
            return Ins[p1, c1];                           // e.g. Tii(Ins[3, “a”], Ins[4, “b”]) = Ins[3, “a”]
      else return Ins[p1+1, c1]; }                //        Tii(Ins[3, “a”], Ins[1, “b”]) = Ins[4, “a”]
 
Tid(Ins[p1,c1], Del[p2]) {          
      if p1 <= p2 return Ins[p1, c1];       //e.g. Tid(Ins[3, “a”], Del[4]) = Ins[3, “a”]
     else return Ins[p1-1, c1]; }          //       Tid(Ins[3, “a”], Del[1] ) = Ins[2, “a”]
 
Tdi(Del[p1], Ins[p2, c2]) {
      if p1 < p2 return Del[p1];                    //e.g.  Tdi(Del[3], Ins[4, “b”]) = Del[3]
      else return Del[p1+1]; }                     //        Tdi(Del[3], Ins[1, “b”]) = Del[4]
 
Tdd(Del[p1], Del[p2]) {
      if p1 < p2 return Del[p1];                    //e.g.   Tdd(Del[3], Del[4]) = Del[3]
      else if p1 > p2 return Del[p1-1];             //         Tdd(Del[3], Del[1]) = Del[2]
      else return I; } // breaking delete-tie using I (identity op)  Tdd(Del[3]. Del[3]) = I 
```      
String-wise transformation function's algorithm is significantly more challenging than character-wise operations' because:

* a string delete covers a deleting range, which may include the characters in the string as well as the interval positions between characters.

* concurrent string delete operations may arbitrarily overlap with each other and even with concurrent insert operations.

* a string inserted by a previous insert operation may be changed by following (causally after) insert and delete operations.

### Client - Server Acknowledgement approach

Just to recap, what the theory of Operational Transformation in [High Latency, Low-Bandwidth Windowing in the Jupiter Collaboration System](http://lively-kernel.org/repository/webwerkstatt/projects/Collaboration/paper/Jupiter.pdf) says is that a client can send operations in a sequence to the server and vice versa. This means that the client and server can traverse through the state space through different paths of operational transformation to the same convergent state depending on when they receive the other operations.

<div class="image-wrap">
<div class="image-block">
    <img src="/images/ot-paths.png" alt="otpath">
</div>
</div>

When multiple clients are connected to the server, every client and server pair have their own state space. One shortcoming of this is that the server would need to carry a state space for every connected client, which can be very memory-intensive. In addition, this complicates the server algorithm by requiring it to convert clients' operations between state spaces.

Having a simple and efficient server is important in making waves reliable and scalable. With this goal, Google's Operational Transformation algorithm modifies the basic theory of OT by requiring the client to wait for **acknowledgement** from the server before sending more operations. When a server acknowledges a client's operation, it means the server has transformed the client's operation, applied it to the server's copy of the wavelet and broadcast the transformed operation to all other connected clients. While the client is waiting for the acknowledgement, it caches operations produced locally and sends them in bulk later.

With the addition of acknowledgements, a client can infer the server's OT path. By having this, the client can send operations to the server that are always on the server's OT path.

This has the important benefit that the server only needs to have **a single state space**, which is the history of operations it has applied. When it receives a client's operation, it only needs to transform the operation against the operation history, apply the transformed operation, and then broadcast it. This source of truth also forces the client to wait for the server to **acknowledge** the operation that the client has just sent which would mean that the client always stays on the server's OT path. This would help in keeping a single history of operations without actually having to keep a mirror of the state for each client that is connected. That would eventually mean the number of clients that are connected to the server would have only one single copy of the document on the server. One trade off of this change is that a client will see chunks of operations from another client in intervals of approximately one round trip time to the other client. 

<div class="image-wrap">
<div class="image-block">
    <img src="/images/ot.png" alt="ot">
</div>
</div>

### Compound Operational Transformation
A great tutorial on Compound Operational Transformation is [Understanding and Applying Operational Transformation by Daniel Spiewak](http://www.codecommit.com/blog/java/understanding-and-applying-operational-transformation). One must read this to understand how Compound Operational Transformation works.

### References

I've read the following papers and articles to learn about Operational Transformation.

* [High Latency, Low-Bandwidth Windowing in the Jupiter Collaboration System](http://lively-kernel.org/repository/webwerkstatt/projects/Collaboration/paper/Jupiter.pdf) *Authored by David A. Nichols, Pavel Curtis, Michael Dixon, and John Lamping.*


* [Operational Transformation in Real-Time Group Editors: Issues, Algorithms, and Achievements](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.53.933&rep=rep1&type=pdf) *Authored by Chengzheng Sun and Clarence (Skip) Ellis.*


* [Google's whitepaper on Operational Transformation](http://www.waveprotocol.org/whitepapers/operational-transform)


* [Concurrency Control in Groupware Systems](https://www.lri.fr/~mbl/ENS/CSCW/2012/papers/Ellis-SIGMOD89.pdf) *Authored by C.A. Ellis, S.J. Gibbs* 


* [Evaluating CRDTs for Real-time Document Editing](https://hal.archives-ouvertes.fr/file/index/docid/629503/filename/doce63-ahmednacer.pdf) *Authored by Mehdi Ahmed-Nacer, Claudia-Lavinia Ignat, G´erald Oster, Hyun-Gul Roh, Pascal Urso*


* [Merging OT and CRDT Algorithms](https://hal.inria.fr/hal-00957167/document) *Authored by Mehdi Ahmed-Nacer, Pascal Urso, Valter Balegas, Nuno Pregui¸ca*


* [Wikipedia on Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation) *One of the most informative articles, I have found on wikipedia, suprisingly.*





