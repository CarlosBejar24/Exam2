const express = require('express');
const https = require("https");
const app = express();

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var character = "";
var iceCharacter = "";

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => resolve(JSON.parse(data)));
            resp.on("error", (err) => reject(err));
        });
    });
}

app.get('/infoGOT/:id', async (req, res) => {
    const characterId = req.params.id;
    const thronesUrl = `https://ThronesApi.com/api/v2/Characters/${characterId}`;

    try {
        // Obtener el personaje desde la Thrones API
        const thronesResponse = await fetchUrl(thronesUrl);
        console.log("Thrones API Response:", thronesResponse); // Imprimir la respuesta completa
        character = thronesResponse;

        // Verificar si faltan datos importantes, como aliases
        if (!character.title || !character.family || !character.born || !character.aliases || character.aliases.length === 0) {
            let found = false;
            let counter = 1;

            // Intentar obtener datos adicionales desde la API de Ice & Fire
            while (counter < 43 && !found) {
                let iceAndFireUrl = `https://anapioficeandfire.com/api/characters?page=${counter}&pageSize=50`;
                let iceAndFireResponse = await fetchUrl(iceAndFireUrl);

                for (let i = 0; i < iceAndFireResponse.length; i++) {
                    let iceName = iceAndFireResponse[i].name;

                    if (iceName.toString() === character.fullName.toString()) {
                        iceCharacter = iceAndFireResponse[i];
                        found = true;

                        // Imprimir aliases de Ice & Fire en la consola
                        console.log("Ice & Fire Aliases:", iceCharacter.aliases);

                        // Completar los datos faltantes
                        character.title = character.title || iceCharacter.titles.join(', ');
                        character.family = character.family || iceCharacter.allegiances.join(', ');
                        character.born = character.born || iceCharacter.born || "Unknown";
                        character.died = character.died || iceCharacter.died || "N/A";
                        character.aliases = iceCharacter.aliases; // Obtener aliases desde Ice & Fire
                        break;
                    }
                }
                counter++;
            }
        }

        // Renderizar la vista con los datos del personaje
        res.render('home.ejs', { character: character, iceCharacter: iceCharacter });

    } catch (error) {
        console.error("Error parsing JSON from Thrones API:", error);
        if (!res.headersSent) {
            res.redirect("/");
        }
    }
});

app.get('/test', (req, res) => {
    res.send('¡El servidor está funcionando correctamente!');
});

var lol = 1;

app.get('/', (req, res) => {
  if(lol==1){
      res.redirect('/infoGOT/0'); 
      lol=2
  }
  res.render('home', {character:character});
});
app.listen(4000, () => {
    console.log("Listening on port 4000");
});
