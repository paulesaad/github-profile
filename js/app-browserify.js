"use strict";

var Promise = require('es6-promise').Promise
// just Node?
// var fetch = require('node-fetch')
// Browserify?
require('whatwg-fetch') //--> not a typo, don't store as a var

// es6 polyfills, powered by babel
require("babel/register")

var urls = [ 'https://api.github.com/users/paulesaad','https://api.github.com/users/paulesaad/repos' ]

var promises = urls.map((url) => fetch(url).then((r) => r.json()))


//Creates array with JSON of profile information in 0th index and repo info in 1st index
var sort = Promise.all(promises).then((data_array) => {
    var profile_info = data_array[0]
    var repo_info = data_array[1]
})

//Creates profComps with array of objects including profile info & repoNames with an array of repo names.
var sorted = sort.then((data_array) => {
	var neededComps = [name, login, blog, location, email, html_url]
	var profComps = neededComps.map((v) => `${v} : ${profile_info.v}`)
	var repoNames = repo_info.map((v) => v.name)
	console.log(profComps)
	console.log(repoNames)
})

var prof_listify = (arr) => {
	arr.forEach((v) =>
	document.querySelector('.infolist').innerHTML = `<li>${Object.keys(v) : ${v[Object.keys(v)]}}</li>`
	)
}

var repos_listify = (arr) => {
	array.forEach((v) =>
	document.querySelector('.repolist').innerHTML = `<li>${v}</li>`
	)
}

sorted.then(() => {
	document.querySelector('.profile').innerHTML = `<img src=${profile_info.avatar_url}>`
	prof_listify(profComps)
	repos_listify(repoNames)
}