
const slides=document.querySelector(".slider").children;
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
let index=0;

var slideIndex = 1;

 var btninscription = document.getElementById("btninscription");
 var input = document.getElementsByClassName("entrer");


var msg = ["email","password"];
var champs = ["firstname","email","password"];
var object = [{
    firstname:"",
    email:"",
    password:"",
  }];
  var input2 = document.getElementsByClassName("enter2");
  var error = document.getElementsByClassName("erreur");
  var error2 = document.getElementsByClassName("erreur2");
 


prev.addEventListener("click",function(){
    prevSlide()
})

next.addEventListener("click",function(){
    nextSlide()
})

function prevSlide(){
    if(index==0){
        index=slides.length-1;
    }
    else{
        index--;
    }
    changeSlide();
}

function nextSlide(){
     if(index==slides.length-1){
      index=0;
         
     }
    else{
        index++;
    } 
   
    changeSlide();
    
}

function changeSlide(){
    for(let i=0; i<slides.length; i++){
        slides[i].classList.remove("active");
    }
    slides[index].classList.add("active");
       
}

function autoPlay(){
    nextSlide();
}

let timer= setInterval(autoPlay,4000);

 showDivs(slideIndex);
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "flex";  
}
function plusDivs(n) {
    showDivs(slideIndex += n);
  }

    document.getElementsByClassName("button-2")[0].addEventListener("click", ()=>{
      document.querySelector('body').style.overflowY = "hidden";
          document.querySelector('.bg-modal-2').style.display = "flex";
               });
    
        document.getElementsByClassName('close')[0].addEventListener("click",()=>{
          
              document.querySelector('.bg-modal-2').style.display = "none";
              document.querySelector('body').style.overflowY = "visible";
              // error[0].innerHTML="";
              location.reload();
            });

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
         
    btninscription.addEventListener("click",()=>{
      
     
  for(var i =0 ;i<input2.length;i++){
    document.querySelector(".modal-content2").style.height = "475px";
    if(input2[i].value == ""){
      
     error2[i].innerHTML = "enter your " + champs[i];
     error2[i].style.color = "red";
     
    }else{
    error2[i].innerHTML = "";
    if(!validEmail(input2[i].value) && i == 1){
      
      error2[i].innerHTML = "l'email et incorect";
      error2[i].style.color = "red";
      
    }else{
      if(!validname(input2[i].value) && i == 0){
       
        error2[i].innerHTML = "le name et incorect";
        error2[i].style.color = "red";
      }else{
        if(i == 3 && input2[i-1].value != input2[i].value){
          
          error2[i].innerHTML = "vous devez le bien confirmer le password";
          error2[i].style.color = "red";
          
        }
      } 
    }
    }
    }
});
