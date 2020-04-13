document.getElementById("btnLogin").addEventListener("click",(e)=>{

    var nom = document.getElementById("name").value,prix = document.getElementById("prix").value,
    desc = document.getElementById("desc").value,file = document.getElementById("files").value;

if(nom == "" || prix == "" || desc == "" || file == ""){
    e.preventDefault();
    alert("vous devez remplir tous les champs possible");
  
}
});