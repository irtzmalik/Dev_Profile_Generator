const axios = require("axios");
const fs = require("fs");
const cheerio = require('cheerio')



// Create the devPro constructor
const devPro = function() {};



// accessing api
devPro.prototype.disp = function() {
  const URL = "https://api.github.com/users/irtzmalik";
  const URL2= "https://api.github.com/users/irtzmalik/starred"

axios.get(URL).then(function(response) {
  const devData = [
    "Name: " + response.data.login,
    "Repos: " + response.data.public_repos,
    "Followers: " + response.data.followers,
    "Following: " + response.data.following,
    "Location: " + response.data.location,
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
        console.log(data.toString('utf8'))
        var public_Repo = response.data.public_repos;
        var followers= response.data.followers;
        var following = response.data.following;
        var location = response.data.location;

        
        var result =data.toString('utf8').replace(/<p id="pb_repo">(.*)<\/p>/g, '<p id="pb_repo">' + public_Repo + '</p>'); 
        console.log("the result is "+ result);
        result = result.replace(/<p id="pb_repo">(.*)<\/p>/g, '<p id="pb_repo">' + public_Repo + '</p>'); 
       
       fs.writeFile('abc.html', result, 'utf8', function (err) {
        if (err) return console.log(err);
     }); 
        var result2;// data.toString('utf8').replace(/<p id="fl_1">(.*)<\/p>/g, '<p id="fl_1">' + followers + '</p>'); 
        result2 = data.toString('utf8').replace(/<p id="fl_1">(.*)<\/p>/g, '<p id="fl_1">' + followers + '</p>'); 
        console.log(public_Repo);


       // let big_result = ToString(result+result2);

          fs.writeFile('abc.html', result2, 'utf8', function (err) {
           if (err) return console.log(err);
        }); 

        console.log(followers)

      //   var result3;
      //   result3 = data.toString('utf8').replace(/<p id="fl_2">(.*)<\/p>/g, '<p id="fl_2">' + followers + '</p>'); 
      //   fs.writeFile('abc.html', result3, 'utf8', function (err) {
      //     if (err) return console.log(err);
      //  }); 

      /* var result4;
       result4 = data.toString('utf8').replace(/<a href="#" id="Location">(.*)<\/a>/g, '<a href="#" id="Location">' + location + '</a>'); 
       fs.writeFile('abc.html', result4, 'utf8', function (err) {
         if (err) return console.log(err);
      }); */

      // var result5;
      // result5 = data.toString('utf8').replace(".box{background-color:", `.box{background-color:${bg_color}`); 
      // fs.writeFile('abc.html', result5, 'utf8', function (err) {
        //   if (err) return console.log(err);
        // });



      var bg_color = "green"; 

      //Add background-color to element with id=Location
      $('#Location').css("background-color", `${bg_color}`)
      $('#Location').text(`${location}`)

      //Store raw html in result 5 variable
      var result = $.html()

      //write new html to file
      fs.writeFile('abc.html', result, 'utf8', function (err) {
          if (err) return console.log(err);
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
