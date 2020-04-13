
  var slideIndex = 1;
  var btnseconnecter = document.getElementById("btncss");
  var btninscription = document.getElementById("btninscription");
  var url = "http://localhost:8000/DATA/client.json";
  var input = document.getElementsByClassName("entrer");
  var msg = ["email","password"];
  var test = true;
  var champs = ["firstname","email","password"];
  var i = 0;
  var input2 = document.getElementsByClassName("enter2");
  var error = document.getElementsByClassName("erreur");
  var error2 = document.getElementsByClassName("erreur2");
  var myjson;
  var data = {};
  var x = document.getElementsByClassName("mySlides");
  var titre = document.getElementById("titre");
  var prix = document.getElementById("prix");
  var money = document.getElementById("money");
  var desc = document.getElementById("desc");
  var image = document.getElementById("image");
//   var voiture = [
//     {
//         nom : "DACIA",
//         prix : "200",
//         money: "DH*",
//         desc : "Kilométrage illimité + Service Inclus",
//         path : "http://localhost:8000/public/img/Galerie/img3.png"
//     },
//     {
//         nom : "REANUALT",
//         prix : "100",
//         money : "DH*",
//         desc : "Kilométrage illimité + Service Inclus",
//         path : "http://localhost:8000/public/img/Galerie/img1.png"
//     },
//     {
//         nom : "HYUNDAI",
//         prix : "168",
//         money : "DH*",
//         desc : "Kilométrage illimité + Service Inclus",
//         path : "http://localhost:8000/public/img/Galerie/img2.png"
//     }
// ];
var voiture;
var request = new XMLHttpRequest();
var url = "http://localhost:8000/DATA/Produit.json";
window.onload = function(){
  this.LoadDataService();
}
function LoadDataService(){
  request.open("GET", url);
  request.onload = function(){
      if (request.status == 200){
        voiture = JSON.parse(request.responseText);
         voiture =  voiture.filter(function(hero) {
          return hero.ID != null;
      });
         remplir();

      }
  };
  request.send(null);
}
function filter(){
  voiture =  voiture.filter(function(hero) {
    return hero.etats != true;
});
}
  /*slider*/
  function remplir(){  
    filter();  
  titre.innerText = voiture[0].nom;
  prix.innerText = voiture[0].prix;
  money.innerText = voiture[0].money;
  desc.innerText = voiture[0].desc;
  image.src = voiture[0].path;
  }
// Afficher2(slideIndex);
function Incrementer(n) {
  slideIndex = slideIndex + n;
    Afficher2(slideIndex);
  }

  function Afficher2(n){
console.log(voiture);
  if (n > voiture.length) {slideIndex = 1}
  else if (n < 1) {slideIndex = voiture.length}
  titre.innerText = voiture[slideIndex -1].nom;
  prix.innerText = voiture[slideIndex - 1].prix;
  money.innerText = voiture[slideIndex - 1].money;
  desc.innerText = voiture[slideIndex - 1].desc;
  image.src = voiture[slideIndex - 1].path;
  }
  for(var i = 0;i<=1;i++){
    document.getElementsByClassName("button-2")[i].addEventListener('click',()=>{
      document.querySelector('body').style.overflowY = "hidden";
          document.querySelector('.bg-modal-2').style.display = "flex"; 
            });
    document.getElementsByClassName("button")[i].addEventListener('click',()=>{
      document.querySelector('body').style.overflowY = "hidden";
      document.querySelector('.bg-modal').style.display = "flex";
        });
        
            document.getElementsByClassName('close')[i].addEventListener("click",()=>{
              document.querySelector('.bg-modal').style.display = "none";
              document.querySelector('.bg-modal-2').style.display = "none";
              document.querySelector('body').style.overflowY = "visible";
              document.location.reload();
            });
            
  }
   /*validation */
  function validEmail(email){
                   
    var exp =  new RegExp(/^[A-Za-z-0-9-_.]+@[A-Za-z]{4,7}.[A-Za-z]{2,3}$/);
    var valid = exp.test(email);
      
      if(valid){
        
          return true;
          
        }
     else{
     
        return false;
     }
      
    }
 
    function validname(nom){
      var letters =/^[A-Za-z]+$/;
      

      if(letters.test(nom)==true){
             return true;
         }
     else{
          return false;  
         }
      } 
  
  btnseconnecter.addEventListener("click",(e)=>{
for(var i =0 ;i<input.length;i++){
if(input[i].value == ""){
//  error[i].innerHTML = "enter your " + msg[i];
//  error[i].style.color = "red";
e.preventDefault();
input[i].style.borderColor = "red";
input[i].placeholder = "erreur";
 console.log(data.email);
}else{
error[i].innerHTML = "";
if(!validEmail(input[i].value) && i == 0){

  input[i].style.borderColor = "red";
  input[i].placeholder = "erreur";
  e.preventDefault();
}
}
}
});
var Client;
// window.onload = function(){
//   this.LoadDataService();
// }
// //function
// function LoadDataService(){
//     request.open("GET",url);
//     request.onload = function(){
//         if (request.status == 200){
//             Client = JSON.parse(request.responseText);
// console.log(Client);
//         }
//     };
//     request.send(null);
// }

/*read data in json file*/
// var resultas
// function ajax_get_json(){

//   var hr = new XMLHttpRequest();
//   hr.open("GET","../DATA/client.json",true);
//   hr.setRequestHeader("Content-type","application/json",true);
//   hr.onreadystatechange = function(){
//     if(hr.readyState == 4 && hr.status == 200){
//       var data = json.parse(hr.responseText);
      
      
//     }
//   }

// }
btninscription.addEventListener("click",(e)=>{
  for( i =0 ;i<input2.length;i++){
    if(input2[i].value == ""){
      input2[i].style.borderColor = "red";
      input2[i].placeholder = "erreur";
     console.log();
     test = false;
     e.preventDefault();
    }else{
    error2[i].innerHTML = "";
    if( i == 1 && !validEmail(input2[i].value)){
    
      input2[i].style.borderColor = "red";
      input2[i].placeholder = "erreur";
      test = false;
      e.preventDefault();
    }else{
      if( i == 0 && !validname(input2[i].value) ){
        input2[i].style.borderColor = "red";
      input2[i].placeholder = "erreur";
        test = false;
        e.preventDefault();
      }else{
        if(  i == 3  && input2[i-1].value != input2[i].value ){

          input2[i].style.borderColor = "red";
          input2[i].placeholder = "erreur";
          test= false;
          e.preventDefault();
        }else{
          test = true;
          data[input2[i].getAttribute("name")] = input2[i].value;
        }  
      } 
    }
    }  
    }
    if(test){
// localStorage.setItem("data1",JSON.stringify(data));
// // myjson = JSON.stringify(data);
     document.location.reload();

    }
});
/*validation*/
document.getElementById("env").addEventListener("click",()=>{
  var nom = document.getElementById("name").value,
  email = document.getElementById("email").value,textarea = document.getElementById("text").value;
   
  if(nom == "" || email == "" || textarea == ""){
      alert("vous devez remplir tous les champs");
  }else{
      if(!validname(nom)){
          alert("le nom n'est pas valide");
      }else{
          if(!validEmail(email)){
              alert("l'email n'est pas valide");
          }else{
          
              alert("la forme bien valide");
              document.location.reload();
              
          }
      }
  }
  
});




  