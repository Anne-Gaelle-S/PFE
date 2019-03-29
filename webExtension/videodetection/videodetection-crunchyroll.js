// import console = require("console");

/************* Crunchyroll *************/
// For now, only when the site is in french. (We have to change the "É" in Épisode to "E".)

// DEBUG : Clear local Storage. To decomment and see where we do it in prod (where we update Mimashita with the news
//  eps stocked in localStorage). 
// localStorage.clear();

// Get the metas of the document
metas = document.getElementsByTagName('meta');

// Get the specific meta where the title of the episode is. On Crunchyroll, it is the 9th qo 8 (start at 0). 
// epTitle is like : "Watch Run With The Wind Episode 1 - The 10th Man"
epTitle = metas[8].content;

// Get the name of the episode. 
epName = epTitle.substring(6, epTitle.indexOf("Épisode"));

// alert("epName : ||" + epName + "||");

// Get the number of the episode. 
epNumber = epTitle.substring(epTitle.indexOf("Épisode") + 8, epTitle.indexOf(" - "));

// alert("epNumber : ||" + epNumber + "||");



// Make a json object with the Anime name and the episode number. 
jsonObj = {
  nameAnime: epName,
  nEp: epNumber
};


jsonEp = JSON.stringify(jsonObj);


fetch('http://mimashita.im-in.love/animes/userTest', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: jsonEp,
}).catch((error) => {
  // alert(error);
});


/******************** TO RETREIVE THE ANIME IN LOCALSTORAGE  ********************/
// We have to do this in the application Mimashita when we want to update it. 

// var i;
// for (i = 1; i <= localStorage.length + 1; i++) {
//   alert(localStorage.getItem("anime" + i));
// }