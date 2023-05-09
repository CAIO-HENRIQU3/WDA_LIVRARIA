/*SELECT LIVROS*/

const selectLivros = document.querySelector('#m-livro-alug');

function livroSelectOptions() {
  const livros = JSON.parse(localStorage.getItem('livros')) ?? [];
  livros.forEach(livro => {
    const option = document.createElement('option');
    option.value = livro.nome;
    option.textContent = livro.nome;
    selectLivros.appendChild(option);
  });
}

livroSelectOptions();

/*SELECT USUARIOS*/

const selectUsuarios = document.querySelector('#m-usuario');

function usuarioSelectOptions() {
  const usuario = JSON.parse(localStorage.getItem('usuarios')) ?? [];
  usuario.forEach(usuario => {
    const option = document.createElement('option');
    option.value = usuario.nome;
    option.textContent = usuario.nome;
    selectUsuarios.appendChild(option);
  });
}

usuarioSelectOptions();
