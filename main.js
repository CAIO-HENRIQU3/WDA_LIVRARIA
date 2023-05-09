/*MENU NAVBAR*/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

})

/*MENU USUARIO*/

let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}

/*LOGIN*/

function logar(){

    var email = document.getElementById("email");
    var senha = document.getElementById("senha");

    if(email.value == "admin@wda.com" && senha.value == "admin"){
        localStorage.setItem("acesso",true);
        alert("Bem Vindo Administrador!")
        window.location.href = "home.html";
    }else{
        alert("Usuario ou Senha Invalidos!");
    }
}
/*AUTENTICAR LOGIN*/

var logado = false;

if(localStorage.getItem("acesso") == "true"){
    logado = true;
}

if(logado != true){
    alert("Voce Nao Esta Autenticado")
    window.location.href = "index.html";
}

/*TOTAL LIVROS*/

let livros = JSON.parse(localStorage.getItem("livros"));
let total = 0;

for (let i = 0; i < livros.length; i++){
    total += parseInt(livros[i].quantidade);
}

let resultado = document.getElementById("totallivros");
resultado.textContent = total;

/*MEDIA DE LIVROS POR USUARIO*/

let alugueis = JSON.parse(localStorage.getItem("alugueis"));
let LivrosPorUsuario = {};
let Nusuarios = 0;
for (let i = 0; i < alugueis.length; i++){
    usuario = alugueis[i].usuario;
    if(!LivrosPorUsuario[usuario]){
        LivrosPorUsuario[usuario] = parseInt(alugueis[i].quantidade);
        Nusuarios++;
    }
    else{
        LivrosPorUsuario[usuario] += parseInt(alugueis[i].quantidade);
    }
}
let MediaLivrosPorUsuario = total / Nusuarios;

let livromedia = document.getElementById("livromedia");

livromedia.textContent = MediaLivrosPorUsuario.toFixed(1);

/*Livros Emprestados*/

let livroemprestado = document.getElementById("livroemprestado");

livroemprestado.textContent = Nusuarios;

/*LIVRO MAIS ALUGADO*/

let alugueisPorLivro = {};
let LivroMaisAlugado = '';
let numeroDeAlugueis = 0;

for (let i = 0; i < alugueis.length; i++) {
  let livro = alugueis[i].livroalugado;
  alugueisPorLivro[livro] = (alugueisPorLivro[livro] || 0) + 1;

  if (alugueisPorLivro[livro] > numeroDeAlugueis) {
    LivroMaisAlugado = livro;
    numeroDeAlugueis = alugueisPorLivro[livro];
  }
}

let resultadoLivroMaisAlugado = document.getElementById('livromaisalugado');
resultadoLivroMaisAlugado.textContent =  LivroMaisAlugado + ', com ' + numeroDeAlugueis + ' alugueis.';
/*SELECT LIVROS*/
