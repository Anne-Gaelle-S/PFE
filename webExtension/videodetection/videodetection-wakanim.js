/************* Wakanim *************/
// For now, only when the site is in french. (We have to change the "É" in ÉPISODE to "E".)

// DEBUG : Clear local Storage. To decomment and see where we do it in prod (where we update Mimashita with the news
//  eps stocked in localStorage). 
// localStorage.clear();

// Get the metas of the document
sectionEp = document.getElementsByClassName("episode");
containerEp = sectionEp[0];
metas = containerEp.getElementsByTagName("meta");

// Get the specific meta where the title of the episode is. On Wakanim, it is the First one so 0 (start at 0). 
// epTitle is like : W'z Saison 1 ÉPISODE 6
epTitle = metas[0].content;

// alert("epTitle : " + epTitle);

// Get the name of the episode. 
epName = epTitle.substring(0, epTitle.indexOf("ÉPISODE")-1);

// alert("epName : ||" + epName + "||");

// Get the number of the episode. 
epNumber = epTitle.substring(epTitle.indexOf("ÉPISODE")+8);

// alert("epNumber : ||" + epNumber + "||");

// Make a json object with the Anime name and the episode number. 
jsonObj = {
  nameAnime: epName,
  nEp: epNumber
};

jsonEp = JSON.stringify(jsonObj);

// alert("Jsonok : " + jsonEp);

// Stock the jsonEp in the localStorage of the phone
localStorage.setItem('anime' + (localStorage.length + 1).toString(), jsonEp);

// Display the number of "things" there is in the localStorage
// alert("Nombre d'animes : " + localStorage.length);


/******************** TO RETREIVE THE ANIME IN LOCALSTORAGE  ********************/
// We have to do this in the application Mimashita when we want to update it. 

// var i;
// for (i = 1; i <= localStorage.length + 1; i++) {
//   alert(localStorage.getItem("anime" + i));
// }












////////////

// // a1 = document.getElementsByClassName("episode");
// // a2 = a1.getElementsByName("container");
// // alert("containerEp : " + containerEp);
// a = containerEp.getElementsByClassName("episode_grid");
// alert("a : " + a);
// b = a[0].getElementsByClassName("episode_main");
// alert("b : " + b);
// c = b[0].getElementsByClassName("episode_video");
// alert("c : " + c);
// d = c[0].getElementsByClassName("episode_streaming");
// alert("d : " + d);
// flexVideo = d[0].getElementsByClassName("flex-video");
// // alert("e : " + e);
// // alert(e[0].content);


// // f = e[0].getElementById("jwplayer-container");
// // alert("f : " + f);

// // alert(containerEp);

// video = document.getElementById("jwplayer-container");
// alert(video.played);

// // alert(video);


// video = document.getElementsByTagName("video");
// alert(video);