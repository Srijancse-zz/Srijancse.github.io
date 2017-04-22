---
layout: post
title:  "Deploy a Node.js app in minutes using Heroku!"
date:   2017-04-22 90:43:39 -0600
tags: technical javascript js code
---
As more and more Node.js projects are being coded, deploying a nodejs app just got easier. I would guide you through on how one can deploy a node.js app in minutes using Heroku.

**What is Heroku?**

*Heroku* is a cloud platform that lets companies/individuals build, deliver, monitor, and scale applications. It is often regarded as the fastest way to go from an idea to URL bypassing all those infrastructure headaches (i.e, one doesn’t has to worry about infrastructure; just focus on the application).

**What Heroku offers?**

Heroku offers *Platform as a Service [PaaS]* type of cloud computing, the delivery of computing services : servers, storage, databases, networking, software, and more over the Internet (“the cloud”).

Operating at the layer above raw computing hardware, whether physical or virtual, Platform as a Service [PaaS] provides a method for programming languages to interact with services like databases, web servers, and file storage, without having to deal with lower level requirements like how much space a database needs, whether the data must be protected by making a copy between 3 servers, or distributing the workload across servers that can be spread throughout the world. Typically, applications must be written for a specific PaaS offering to take full advantage of the service, and most platforms only support a limited set of programming languages.

**Advantages/Benefits**

There is no doubt that Heroku takes away all the pain of installing softwares, configuring servers, maintaining, and monitoring the software — it takes care of most of the configurations. Other services could easily be added as add-ons.

**Heroku** is:

1. Easy deployment
2. Uses version control system commands (git)
3. Security
4. Plenty of Add-on resources (applications, databases etc.)
5. Processes scaling : independent scaling for each component of your app without affecting functionality and performance
6. Isolation : each process (i.e dyno) is completely isolated from each other thorough Documentation

**How to deploy a Node.js app :**

Here are some prerequisites you need to have before deploying :

1. A Node.js app. [ofcourse xD]
2. A free Heroku account.
3. The Heroku CLI.

Let’s get down to it!
1.  Login to your Heroku via the command line heroku login. This will prompt for your credential.
Add Procfile to your application echo `‘web: ./node_modules/.bin/forever -m 5 server.js’ >Procfile`
A Procfile is not necessary to deploy apps written in most languages supported by Heroku. The platform automatically detects the language, and creates a default web process type to boot the application server. 
In the case of Node.js, it will start a default web process via the start script in your `package.json`. Creating an explicit Procfile is recommended for greater control and flexibility for your app.As the case maybe, `web: ./node_modules/.bin/forever -m 5 server.js`, I am using Node.js' forever module to start my server named server.js

2. Create Heroku remote repository `heroku create appName`

3. Add the new changes made to the app `git add .`
3. Commit the snapshot `git commit -m “Added a Procfile.”`
4. Push to your app to the newly created heroku remote repository `git push heroku master` 
Bonus: `run heroku logs` to see logs. 
Note: If your app runs on a database, you will need to add the database as an add-on.

Feel free to ping me on [Twitter](www.twitter.com/srijancse).
