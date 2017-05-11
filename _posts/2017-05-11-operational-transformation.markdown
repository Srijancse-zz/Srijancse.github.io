---
layout: post
title:  "Operational Transformation [Operations and Transformations]"
date:   2017-05-11 09:43:39 -0600
tags: technical javascript js code algorithm 
---

This is the second post about Operational Transformation, the real time collaborative editing algorithm. The first post was [How Real-Time Collaborative Editors work? [Operational Transformation]](http://www.srijanagarwal.me/writing/collaborative-editing/). In this post, I would be digging deep into operations and transforms function and also how clients wait for **acknowledgement** from server before sending more operations. 

Just to recap, what the theory of Operational Transformation in [High Latency, Low-Bandwidth Windowing in the Jupiter Collaboration System](http://lively-kernel.org/repository/webwerkstatt/projects/Collaboration/paper/Jupiter.pdf) says is that a client can send operations in a sequence to the server and vice versa. This means that the client and server can traverse through the state space through different paths of operational transformation to the same convergent state depending on when they receive the other operations.

<div class="image-wrap">
<div class="image-block">
    <img src="/images/ot-paths.png" alt="otpath">
</div>
</div>
