
const express = require('express');
const https = require("https");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

//var info = "";
var character = "";

// TODO ESTO ES PARA VER QUE SI FUNCIONARA 

//app.get('/info', (req, res) => {
   // const url = "https://v2.jokeapi.dev/joke/Any";
    //https.get(url, (response) => {
        //console.log("RESPONSE : ");
        //let resContent = "";
  
        //response.on("data", (data) => {
            //resContent += data;
        //}).on("end", () => {
            //try {
                //const jsonObj = JSON.parse(resContent);
                //console.log(jsonObj);
                //info = jsonObj;
               // res.redirect("/");
            //} catch (error) {
                //console.error("Error parsing JSON:", error);
               // res.redirect("/"); // Handle JSON parsing error gracefully
            //}
        //}).on("error", (e) => {
            //console.error(`Got an error: ${e.message}`);
            //res.redirect("/"); // Redirect on error
        //});
    //});
  //});

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
                res.redirect("/");
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
  
  app.get('/', (req, res) => {
    res.render('home', { joke: info, character:character});
  });
  
  
  app.listen(4000, () => {
      console.log("Listening on port 4000");
  });