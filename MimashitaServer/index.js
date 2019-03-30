const express = require('express')
const app = express()
const port = 3000
const fs = require("fs")

app.use(express.json())

app.get('/', function(req, res) {
	res.send('It works ! ');
});

// Récupère les données du fichier d'animes à mettre jour
// C'est l'application qui va appeler cette fonction quand elle est lancée
app.get('/animes/:user', function(req, res) {
	fs.readFile((data/`${req.params.user}-animes-extension.json`), (err, data) => {
    		if (err) {
			res.status(404).json({error: `File data/${req.params.user}-animes-extension.json not found`})
		} else {
			res.json(JSON.parse(data));
		}
 	});
});

// Ecrit dans le fichier user-animes-extensions.json ce qu'on a récupérer avec l'extension web
// L'etension web envoie une requête POST
app.post('/animes/:user', function(req, res) {	
	fs.readFile((`data/${req.params.user}-animes-extension.json`), (err, data) => {
    		var animesToUpdateJson = {}
		if (!err) {
			animesToUpdate = JSON.parse(data)
			// console.log(JSON.parse(animesToUpdateJson))
 		} else {
			animesToUpdate = {animesToUpdate:[]}
		}
		animesToUpdate.animesToUpdate.push(req.body)
		var animesToUpdateJson = JSON.stringify(animesToUpdate)
		fs.writeFile((`data/${req.params.user}-animes-extension.json`), animesToUpdateJson,"utf8", (err) => {
			if (err) throw err;
			res.status(204).end();
		});

	}); 

});


// Vide le fichier json
app.post('/reset/:user',function(req,res) {
	var animesToUpdate = JSON.stringify({animesToUpdate:[]})
	fs.writeFile((`data/${req.params.user}-animes-extension.json`), animesToUpdate, (err) => {
		if (err) throw err;
		res.status(204).end();
	});
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

