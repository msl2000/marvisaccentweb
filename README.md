# Marvis AccentGroup Tech Test (FRONTEND VUEJS)


The application has a frontend and backend instance running and is built with the following frameworks

  - NuxtJS (VueJS Framework)
  - See HTML in the right
  - Magic

# About the task!

Create a web application containing 2 pages. A dashboard page displaying sales in a chart with days total with a date range element where the values default to sales last month.

My approach to this task is to separate the frontend layer into it's own instance for better project management and providing a Single Page Application (SPA) solution for the project. We will be leveraging a RESTful approach by requesting and consuming all out data layer from the backend repositories.

### Tech

The frontend application uses a number of open source projects to work properly:

* [NustJS] - Nuxt is a progressive framework based on Vue.js to create modern web applications. It provides a good internal structure for your Vue applications and has additional tools to make Server-side rendering or statis deployments an ease. It also allows for Single Page Application builds to make applications snappier, and much more friendly to interact with!
* [ChartJS] - Open source chart builder with a lot of readily available, and high customizable chart designs
* [Webpoack] - webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser,.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [ElementUI] - a Vue 2.0 based component library 
* [Axios] - Promise based HTTP client for the browser and node.js
* [Dillinger] - Readme Editor

### Installation

For installation on a local invironment running an Linux/Windows or Mac machine, please refer to the following build setup

## Build Setup

```bash
# install dependencies
$ npm install


# install sass-loader if required
$ npm install sass-loader sass webpack --save-dev


# adjust fontawesome configuration for Pro access
$ npm install --save @fortawesome/fontawesome-free
$ npm config set "@fortawesome:registry" https://npm.fontawesome.com/ && \
$ npm config set "//npm.fontawesome.com/:_authToken" ${TOKEN HERE}

$ npm install --save @fortawesome/fontawesome-pro

#Run the project on your local

$ npm run dev

```

For production environments, in this case Heroku, please use the following build set up

## Build Setup

```bash
# On your project, Prepare heroku, under the assumption that your project has a remote url set against heroku, and the project has been mapped against a Heroku application
$ heroku config:set HOST=0.0.0.0
$ heroku config:set NODE_ENV=production

# Heroku uses a Procfile (name the file Procfile with no file extension) that specifies the commands that are executed by the apps dynos. To start the Procfile will be very simple, and needs to contain the following line:

$ web: nuxt start

#This will instruct run the nuxt start command and tell heroku to direct external HTTP traffic to it.

#Finally, we can push the app on Heroku with:

$git push heroku master

#To deploy a non-master branch to Heroku use:

$git push heroku develop:master

#where develop is the name of your branch.
```