---
layout: post
title:  "Operational Transformation and Conflict-free Replicated Data Types!"
date:   2017-04-27 90:43:39 -0600
tags: technical javascript js code
---


Recently, I've been diving deep on how **real-time collaborative** editing works. I have been reading various papers on both the methods of implementing collaborative editing : **Operational Transformation**, which goes back to 1989, when it was first implemented by the [GROVE (GRoup Outtie Viewing Editor)](https://www.lri.fr/~mbl/ENS/CSCW/2012/papers/Ellis-SIGMOD89.pdf) system (this algorithm is quite old, and Google uses this algorithm for collaborative editing for Google Docs, Google Slides, etc; Wave) and **Conflict-Free Replicated Data Types**, which is a much newer approach to real-time editing. 

### Real challenge of collaborative editing

If you know how real-time collaborative editing works, then you may know that handling concurrent editing in multi user environment gracefully is very challenging. However, a few simple concepts can simplify this problem. The main challenge, as mentioned, with collaborative editing is the concurrency control [**concurrent edits**] to the document are not commutative. This needs to be causally ordered before applying either by undoing history, or by transforming the operations [**operational transformation**] before applying them to make them seem commutative.

### Bringing Latency into action

Introducing latency between the client and server is where the problems arise. Latency in a collaborative editor introduces the possibility of version conflicts. Here, where, I said Operational Transformation will come into action. 

Let's take an example :

**Starting Client's state :**

` abcd `

**Starting Server's state :**

` abcd `

*Client* enters `x` in between `c` and `d` , the operation would look something like this :

`{ insert(x,3) //where 3 is the position where x is going to be added (0=a, 1=b, 2=c ..) } `

And at the same time, *Server* deletes `b` , the operation would be :

`{ delete(b,1) }`

What actually should happen is that the client and server should both end with ```acxd``` but in reality, *client* ends with ```acxd``` but the *server* ends with ```acdx```. Ofcourse, ```acxd != acdx``` and the document which is shared now is in wrong state.

Here is where the **Operational Transformation** comes to the rescue. 


### Client - Server [OT] Approach to Collaborative Editing

Choosing a Client-Server architecture will allow scouting a large number of clients without actually complicating the environment. Also, there will be a single system which holds the source of truth i.e. the server, so even if the clients crash/go offline for a long time, we can go back to the server and fetch the document easily. 

This source of truth also forces the client to wait for the server to **acknowledge** the operation that the client has just sent which would mean that the client always stays on the server's OT path. This would help in keeping a single history of operations without actually having to keep a mirror of the state for each client that is connected. That would eventually mean the number of clients that are connected to the server would have only one single copy of the document on the server. 

