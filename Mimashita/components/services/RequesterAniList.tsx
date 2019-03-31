function handleResponse(response) {
  return response.json().then(function(json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleError(error) {
  alert(
    "Network error. Please check your connection then reload the application."
  );
  console.err(error);
}

export const makeAPIRequest = (aQuery, someVariables, handleDataFct) => {
  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co";
  var options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: aQuery,
      variables: someVariables
    })
  };

  // Make the HTTP Api request
  fetch(url, options)
    .then(handleResponse)
    .then(data => handleDataFct(data))
    .catch(handleError);
}

export const flatData = (data) => {
  let arrayOfTrendingAnime = data.data.Page.media;
  arrayOfTrendingAnime.map(anAnime => {
    anAnime.key = anAnime.title.romaji;
    return anAnime;
  });
  return arrayOfTrendingAnime;
}

/*
var myQuery = `
    query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
        media (sort: [TRENDING_DESC], type: ANIME) {
        title {
            romaji 
            english
            native
        }
        }
    }
    }
`;

var myVariables = {
    page: 1,
    perPage: 30
};

*/
