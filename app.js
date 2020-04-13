const path = require('path');
const express = require("express");
const hbs = require('hbs');
const app = express();
const partialsPath = path.join(__dirname, './partials');
var ID_client;
var session = require('express-session');
var sess;
var bodyParser = require('body-parser'),
resultas = false;
path_jsonfile = 'DATA/client.json',
LoadData = require('./Module/Readandwrite');
var produit = LoadData.LoadJson("DATA/Produit.json");
// var data = LoadData.LoadJson('public/Traitement/JSON/service.json');
// var wd = LoadData.LoadJson('public/Traitement/JSON/service.json');
urlencodedParser = bodyParser.urlencoded({ extended: false });
// *Define paths for express config
const viewPath = path.join(__dirname, './views');
// *setup handlebars engine and views location
app.set('view engine', 'hbs');
// Pointing express to my custom directory
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
// registerPartials take the path to the direcotory where my partials leaves
app.use("/public/css",express.static("./public/css"))
app.use("/public/js",express.static("./public/js"))
app.use("/public/img",express.static("./public/img"))
app.use("/DATA",express.static("./DATA"));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
//Lancement des pages.
app.get("/Home", (req, res) => {
    resultas = false;
  res.render('index.hbs',{resultas});
});
app.get("/admin", (req, res) => {
    // resultas = false;
  sess = req.session;
  if(!sess.Matricule){
    res.render('Login.hbs');
    
  }else{
    res.render("admin.hbs");
  }
});
app.get("/Produit", (req, res) => {
        res.render('Produit/Produit.hbs');
});
app.get("/Suppression", (req, res) => {
    produit = LoadData.LoadJson("DATA/Produit.json");
        res.render('Produit/Suppression.hbs',{produit});
});
app.get("/Modifier", (req, res) => {
    produit = LoadData.LoadJson("DATA/Produit.json");
        res.render('Produit/Modifier.hbs',{produit});
});
app.get("/Deconnecter",(req,res)=>{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('Login.hbs');
    });
});
app.get("/Login", (req, res) => {
  res.render('Login.hbs');
});
app.get("/reservation", (req, res)=> {
    sess = req.session;
    
    if(!sess.ID_client){
        res.render('index.hbs');
      
    }else{
        produit = LoadData.LoadJson("DATA/Produit.json");
         produit =  produit.filter(function(hero) {
        return hero.etats != true;
    });
      res.render("reservation2.hbs",{produit});
    }
});
// Port
var port = process.env.PORT || 8000;
app.listen(port,() => console.log(`Listening on port ${port}...`));
/*server local*/
// /*Use Post data*/
//authentification
app.post("/Inscription",urlencodedParser,function(req,res){  
  resultas = SaveData(req.body.nom,req.body.email,req.body.password);
  console.log(resultas);
 if(!resultas){
    res.render('index.hbs',{resultas});
 }else{
     var error = "Vous etes deja Inscrit";
     res.render('index.hbs',{error,resultas});
 }  
});
app.post("/Login",urlencodedParser,function(req,res){ 
   let client = LoadData.LoadJson(path_jsonfile);
   var test = true;
   for(var i = 0;i<client.length;i++){
    if(req.body.email == client[i].Email && req.body.mtp == client[i].Motpasse){
         test = true;
         sess = req.session;
         sess.ID_client = client[i].ID;
         ID_client = client[i].ID;
        break;
    }else{
        test = false; 
    }
}
if(!test){
    resultas = true;
    console.log("message");
    var error = "Mot passe ou Email incorect";
    res.render('index.hbs',{error,resultas});
}else{
    produit = LoadData.LoadJson("DATA/Produit.json");
    res.render('reservation2.hbs',{produit});
}
});
app.post("/Confirmation",urlencodedParser,function(req,res){
   console.log(req.body.nomv);
   var etats = true;
    Save_Reservation(RecuperateID_produit(req.body.nomv),RecuperateID_client(req.body.email),req.body.nbrpersonne);
    produit = LoadData.LoadJson("DATA/Produit.json");
    for(var i=0;i<produit.length;i++){
        if(produit[i].nom == req.body.nomv ){
            produit[i].etats = true;
            break;
        }
    }
    LoadData.SaveJson("DATA/Produit.json",JSON.stringify(produit));
     produit =  produit.filter(function(hero) {
        return hero.etats != true;
    });
    res.render('reservation2.hbs',{produit});
});

function RecuperateID_client(champs){
  var  path_jsonfile = 'DATA/client.json';
    var    client = LoadData.LoadJson(path_jsonfile);
    var ID_client;
    for(var i=0;i<client.length;i++){
        if(client[i].Email == champs){
             ID_client = client[i].ID;
             console.log(ID_client);
             break;
        }
    }
    return ID_client;

}
function RecuperateID_produit(champs){
    var  path_jsonfile = 'DATA/Produit.json';
    var  produit = LoadData.LoadJson(path_jsonfile);
    var ID_produit;
    for(var i=0;i<produit.length;i++){
        if(produit[i].nom == champs){
            ID_produit = produit[i].ID;
             break;
        }
    }
    console.log(champs + " " + ID_produit);
    return ID_produit;

}
function SaveData(nom,email,password){
    var id,test = true;
    client = LoadData.LoadJson(path_jsonfile);
    // console.log(client);
    for(var i = 0;i<client.length;i++){
        if(client[i].Email == email){
            console.log(email + " " + client[i].Email);
            test = false;
            break;
        }
    }
    
    if(test == true){
        if(client[client.length - 1].ID != null){
            id  = client[client.length - 1].ID + 1;
          }else{
              id = 1;
          }
          var data = 
              { 
                  ID: id,
                  nom: nom, 
                  Email : email,
                  Motpasse: password,
              };
              client.push(data);
          LoadData.SaveJson(path_jsonfile,JSON.stringify(client));
          return false;
          
    }else{
        return true;
    }
    
}
function Save_Reservation(ID_produit,ID_client,nbrpersonne){
    var  path_jsonfile = 'DATA/reservation.json';
  var   Reservation = LoadData.LoadJson(path_jsonfile);
       
    
        if(Reservation[Reservation.length - 1].ID != null){
            id  = Reservation[Reservation.length - 1].ID + 1;
          }else{
              id = 1;
          }
          var data = 
              { 
                ID_produit: ID_produit,
                ID_client: ID_client, 
                nbrPersonne : nbrpersonne,
                  
              };
              Reservation.push(data);
          LoadData.SaveJson(path_jsonfile,JSON.stringify(Reservation));
          
          
    }
//ADMIN
app.post("/Authentification",urlencodedParser,function(req,res){
  var data =   LoadData.LoadJson("DATA/Admin.json");
     if(req.body.Mtrcl == data.Matricule && req.body.pwd == data.Password){
         sess = req.session;
         sess.Matricule = req.body.Mtrcl;
        res.render("admin.hbs");
     }else{
        res.render("Login.hbs"); 
     }

 });
 /*Ajoute Produit*/
 app.post("/AjouteProduit",urlencodedParser,function(req,res){
    var data =   LoadData.LoadJson("DATA/Produit.json");
    var pathImage = "http://localhost:8000/public/img/Galerie/";
    var Produit = {
    ID : data[data.length - 1].ID + 1,
    nom : req.body.name,
    prix : req.body.prix,
    money: "DH*",
    desc : req.body.desc,
    path : pathImage.concat(req.body.image),
    etats : false
    };
    data.push(Produit);
    LoadData.SaveJson("DATA/Produit.json",JSON.stringify(data));
    res.render('Produit/Produit.hbs');
   });
   /*delete produit*/
   app.post("/deleteproduit",urlencodedParser,function(req,res){
    var data =   LoadData.LoadJson("DATA/Produit.json");
    console.log(req.body.name);
    var datafilter =  data.filter(function(hero) {
        return hero.nom != req.body.name;
    });
    console.log(datafilter);
    LoadData.SaveJson("DATA/Produit.json",JSON.stringify(datafilter));
     produit = LoadData.LoadJson("DATA/Produit.json");
    res.render('Produit/Suppression.hbs',{produit});
   });

   /*Modifier produit */
   app.post("/Modifier",urlencodedParser,function(req,res){
    var data =   LoadData.LoadJson("DATA/Produit.json");
    var pathImage = "http://localhost:8000/public/img/Galerie/";
    
    for(var i = 0 ;i<data.length;i++){
        if(req.body.name == data[i].nom){
            data[i].nom = req.body.nom;
            data[i].prix = req.body.prix;
            data[i].desc = req.body.desc;
            data[i].path = pathImage.concat(req.body.image);
            data[i].etats = req.body.etats;
            break;
        }
    }
    LoadData.SaveJson("DATA/Produit.json",JSON.stringify(data));
    produit = LoadData.LoadJson("DATA/Produit.json");
    res.render('Produit/Modifier.hbs',{produit});
   });


