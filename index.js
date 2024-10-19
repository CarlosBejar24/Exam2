
const express = require('express');
const https = require("https");
const app = express();

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var info = "";
var character = "";




// Aquí conectamos los apis
 app.get('/infoGOT/:id', (req,res)=> {
    const characterId = req.params.id;
    const url = `https://ThronesApi.com/api/v2/Characters/${characterId}`;

    https.get(url, (response) => {
        console.log("RESPONSE:");
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        }).on("end", () => {
            try {
                const jsonObj = JSON.parse(resContent);
                console.log(jsonObj);
                character = jsonObj;
                res.render('home', { character: character });
            } catch (error) {
                console.error("Error parsing JSON:", error);
                res.redirect("/");
            }
        }).on("error", (e) => {
            console.error(`Got an error: ${e.message}`);
            res.redirect("/"); // Redirect on error

        });
    });
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