"use strict";

var Promise = require('es6-promise').Promise
require('whatwg-fetch')

require("babel/register")

var Backbone = require("backbone")

function qs(selector) {
       return document.querySelector(selector)
}


//-------------------------------------------------------------------
//DEFINITION CODE

//(object) Constructor function
function GithubClient(loginname){
    this.username = loginname
}

//prototype methods/functions need names!  `GHClient.prototype.doSomething =` NOT `ghClient.prototype =`
GithubClient.prototype.createProfile = function(){
    var token = "160b4dd92e3af45f0d30e84ea4747e5196c9b6ba"

    var urls = [
    	`https://api.github.com/users/${this.username}?access_token=${token}`, 
    	`https://api.github.com/users/${this.username}/repos?access_token=${token}`
    ]

    var requests = urls.map((url) => fetch(url).then((r) => r.json()))
   
    Promise.all(requests).then((data) => {
        var profile = data[0],
            repos = data[1]

        var profile_string = ['name', 'login', 'blog', 'location', 'email', 'html_url'].map((key) => `<li>${profile[key]}</li>`).join('')
        var repo_string = repos.map((repo) => `<li><a href="${repo.html_url}">${repo.name}</a></li>`).join('')

        qs('.profile img').src = profile.avatar_url
        qs('.profile ul').innerHTML = profile_string
        qs('.repos ul').innerHTML = repo_string
    })
}


//----------------------------------
//EXECUTION CODE
var paulSaadClient = new GithubClient('paulesaad')


paulSaadClient.createProfile();

//----------------------------------
//ROUTER
var GithubRouter = Backbone.Router.extend({
    routes: {
        ':username': 'drawProfile'
    },
    drawProfile: function(user){
        new GithubClient(user).createProfile()
    },
    initialize: function(){
        Backbone.history.start()
    }
})
var router = new GithubRouter()

var node = document.querySelector('form')

node.addEventListener('submit', (e) => {
    e.preventDefault()
	window.location.hash = node.querySelector('input').value
})

