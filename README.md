[![Stories in Ready](https://badge.waffle.io/TheJonsey-Servers/NodeMC-CORE.png?label=ready&title=Ready)](https://waffle.io/TheJonsey-Servers/NodeMC-CORE)
# NodeMC-CORE - The_Jonsey Fork

[![Build Status](http://nodemc.space:8080/job/NodeMC/badge/icon)](http://nodemc.space:8080/job/NodeMC/) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000)](https://gitter.im/gmemstr/nodemc)

**Make sure you own the directory jarfiles save to, or 
else you will encounter a `EPIPE` error!**

## About

[Official Documentation](https://docs.nodemc.space)

[Official Website (deprecated to a certain extent)](https://nodemc.space)

[My Patreon](https://www.patreon.com/gmemstr?ty=h)

NodeMC CORE is the core application for NodeMC. It is an API wrapper
for Minecraft servers that developers can use to build dashboards 
and apps around using whatever frameworks and languages they choose. 

It is written in Node.js for utmost speed and reliability, as well
as the wealth of npm packages that are used to expand the functionality
well beyond traditional dashboards abilities.



## Requirements

- [Node.js](https://nodejs.org/en/) >= 5.7.0

- [npm](https://www.npmjs.com/) >= 3.6.0

- [Java JRE](https://www.java.com/en/) >= 1.7.0

- [glibc](https://www.gnu.org/software/libc/) >= 2.23

### (Optional) Building Requirements

- [nexe](https://jaredallard.me/nexe/) >= 1.1.0
    - Linux / Mac / BSD / Windows
    - Python 2.6 or 2.7 (use --python if not in PATH)
    - Windows: Visual Studio 2010+
    
## Running

Running NodeMC is easy. 

```
git clone https://github.com/NodeMC/NodeMC-CORE.git

cd NodeMC-CORE

npm install

node Main.js
```

Then navigate to http://localhost:3000 and go through the setup processs

## The_Jonsey Edits

CSS will be updated and dashboard will have layout modified to make NodeMC run smoother on mobile.

The Log Textarea will be updated to use socket.io instead of refreshing to increase performance on weaker devices.