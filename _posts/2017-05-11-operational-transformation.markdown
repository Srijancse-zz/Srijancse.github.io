---
layout: post
title:  "Operational Transformation, the real time collaborative editing algorithm [Operations and Transformations]"
date:   2017-05-11 09:43:39 -0600
tags: technical javascript js code algorithm 
---

This is the second post about **Operational Transformation**, the real time collaborative editing algorithm. The first post was [How Real-Time Collaborative Editors work? [Operational Transformation]](http://www.srijanagarwal.me/writing/collaborative-editing/). 

In this post, I would be digging deep into operations, transforms function and also how clients wait for **acknowledgement** from server before sending more operations. 

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

