"use strict";

var Promise = require('es6-promise').Promise
require('whatwg-fetch') //--> not a typo, don't store as a var

// es6 polyfills, powered by babel
require("babel/register")

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
GithubClient.prototype.getData = function(username){
    var token = "1654ffd6cec30f98ef118dd04c758bf3b9dde323"

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
var travisClient = new GithubClient('t3patterson')


paulSaadClient.getData();

