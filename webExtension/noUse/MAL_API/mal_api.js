// const jikanjs = require('jikanjs'); // Uses per default the API version 3

// // // jikanjs.loadAnime(20005, 'episodes').then((response) => {
// // //     response.episodes.forEach(element => {
// // //         console.log(`${element.episode_id}: ${element.title} - ${element.title_romanji} - ${element.title_japanese}`);
// // //     })
// // // }).catch((err) => {
// // //     console.error(err); // in case a error happens
// // // });


// // // for (i = 0; i<500; i++) {

// // // }

// jikanjs.loadAnime(37779).then((response) => {
//     console.log(response.title);
//     console.log(response.title_english);
// }).catch((err) => {
//     console.error(err); // in case a error happens
// });



// // const Mal = require("node-myanimelist");

// // Mal.search("anime", "gears").then(j => {});


//AniList : https://anilist.gitbook.io/anilist-apiv2-docs/overview/graphql/getting-started


const fetch = require('node-fetch');

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int, $search: String) { # Define which variables will be used in the query (id)
  Media (id: $id, search: $search) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;


// Define our query variables and values that will be used in the query request
var variables = {
    search: "Yakusoku No Neverland",
    page: 1,
    perPage: 3
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data.data);
}

function handleError(error) {
    console.log('Error, check console');
    console.error(error);
}