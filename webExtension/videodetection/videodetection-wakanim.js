/************* Wakanim *************/
// For now, only when the site is in french. (We have to change the "É" in ÉPISODE to "E".)

// DEBUG : Clear local Storage. To decomment and see where we do it in prod (where we update Mimashita with the news
//  eps stocked in localStorage). 
localStorage.clear();

// Get the metas of the document
sectionEp = document.getElementsByClassName("episode");
containerEp = sectionEp[0];
metas = containerEp.getElementsByTagName("meta");

// Get the specific meta where the title of the episode is. On Wakanim, it is the First one so 0 (start at 0). 
// epTitle is like : W'z Saison 1 ÉPISODE 6
epTitle = metas[0].content;



// Get the name of the episode. 
epName = epTitle.substring(0, epTitle.indexOf("ÉPISODE") - 1);



// Get the number of the episode. 
epNumber = epTitle.substring(epTitle.indexOf("ÉPISODE") + 8);



// Make a json object with the Anime name and the episode number. 
jsonObj = {
  nameAnime: epName,
  nEp: epNumber
};

jsonEp = JSON.stringify(jsonObj);



// Stock the jsonEp in the localStorage of the phone
// localStorage.setItem('anime' + (localStorage.length + 1).toString(), jsonEp);

// Display the number of "things" there is in the localStorage

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


Notification.requestPermission( function(status) {
  console.log(status); // les notifications ne seront affichées que si "autorisées"
  var n = new Notification("Détection d'un anime", {
    body: ("Ouvre l'application Mimashita pour ajouter " + epName + " - Épisode " + epNumber + " à ta liste !")
  }); // this also shows the notification
});

/******************** TO RETREIVE THE ANIME IN LOCALSTORAGE  ********************/
// We have to do this in the application Mimashita when we want to update it. 

// var i;
// for (i = 1; i <= localStorage.length + 1; i++) {
//   alert(localStorage.getItem("anime" + i));
// }