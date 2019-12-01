const axios = require("axios");
const fs = require("fs");
const cheerio = require('cheerio')
const pdf = require('html-pdf')
const inquirer = require('inquirer');
const readline = require('readline');


// Create the devPro constructor
const devPro = function() {};


// accessing api
devPro.prototype.disp = function(color, name) {
  const URL = "https://api.github.com/users/"+name;
  const URL2= "https://api.github.com/users/irtzmalik/starred"// issues in getiing stars

axios.get(URL).then(function(response) {
  // axios.get(URL2).then(function(response1) {
  //   const devData1 = [
  //     "stars: " + response1.data.stargazers_count,
  //     "-".repeat(60)
  //   ].join("\n\n");
  //   fs.appendFile("log2.txt", devData, err => {
  //     if (err) throw err;
  
  //     console.log(devData1);
  //   });
  // });
  const devData = [
    "Login: " + response.data.login,
    "Name " + response.data.name,
    "Repos: " + response.data.public_repos,
    "Followers: " + response.data.followers,
    "Following: " + response.data.following,
    "Location: " + response.data.location,
    "Git Id: "+ response.data.html_url,
    "Bio: " +response.data.bio,
    "-".repeat(60)
  ].join("\n\n");

  fs.appendFile("log.txt", devData, err => {
    if (err) throw err;

    console.log(devData);
  });
  fs.readFile('abc.html',
    // callback function that is called when reading file is done
    function(err, data) { 
        if (err) throw err;

      //use cheerio here
      const $ = cheerio.load(data)

        // data is a buffer containing file content
        console.log(data.toString('utf8'));
        var public_Repo = response.data.public_repos;
        var followers= response.data.followers;
        var following = response.data.following;
        var location = response.data.location;
        var location_link= 'https://www.google.com/maps/place/'+response.data.location;
        var git_id= response.data.html_url;
        var image_url=response.data.avatar_url;
        var name= "My name is " +response.data.name;
        var bio1= response.data.bio;

        

      //setting properties
      $('#Location').css("background-color", `${color}`)
      $('#Location').text(`${location}`)
      $('#pb_repo').text(`${public_Repo}`)
      $('#fl_1').text(`${followers}`)
      $('#fl_2').text(`${following}`)
      $('.top-inner-section').css("background-color", `${color}`)
      $('.box').css("background-color", `${color}`)
      $('#the_name').text(`${name}`)
      $('#bio').text(`${bio1}`)
      $('#Location').attr('href',location_link)
      $('#circular_img').attr('src',image_url)
      $('#git_id').attr('href',git_id)

      


      //Store raw html in result  variable
      var result = $.html()

      //write new html to file
      fs.writeFile('abc.html', result, 'utf8', function (err) {
          if (err) return console.log(err);
        });


        var html = fs.readFileSync('abc.html', 'utf8');
var options = { format: 'Letter' };
 
pdf.create(result, options).toFile('abc.pdf', function(err, res) {// making pdf
  if (err) return console.log(err);
  console.log(res); // { filename:  }
});
});
  
});


};


// Find a devPro show
/*
devPro.prototype.findShow = function(show) {
  const URL = "http://api.devPromaze.com/singlesearch/shows?q=" + show;

  axios.get(URL).then(function(response) {
    const showData = [
      "Show: " + response.data.person.name,
      "Genre(s): " + response.data.genres.join(", "),
      "Rating: " + response.data.rating.average,
      "Network: " + response.data.network.name,
      "Summary: " + response.data.summary,
      "-".repeat(60)
    ].join("\n\n");

    fs.appendFile("log.txt", showData, err => {
      if (err) throw err;

      console.log(showData);
    });
  });
};*/

module.exports = devPro;
