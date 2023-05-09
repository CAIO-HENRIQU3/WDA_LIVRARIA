const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sAutor = document.querySelector('#m-autor')
const sEditora = document.querySelector('#m-editora')
const sLancamento = document.querySelector('#m-lancamento')
const sQuantidade = document.querySelector('#m-quantidade')
const btnSalvar = document.querySelector('#btn-salvar')
const btnFechar = document.querySelector('#btn-fechar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('livros')) ?? []
const setItensBD = () => localStorage.setItem('livros', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, livros) => {
      insertItem(item, livros)
    })
  
  }

  loadItens()

  function insertItem(item, livros) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.autor}</td>
      <td>${item.editora}</td>
      <td>${item.lancamento}</td>
      <td>${item.quantidade}</td>
      <td class="acao">
        <button onclick="editItem(${livros})"><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${livros})"><i class="fa-solid fa-trash" style="color: #000000;"></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }

  function editItem(livros) {

    openModal(true, livros)
  }
  
  function deleteItem(livros) {
    itens.splice(livros, 1)
    setItensBD()
    loadItens()
  }

function openModal(edit = false, livros = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[livros].nome
    sAutor.value = itens[livros].autor
    sEditora.value = itens[livros].editora
    sLancamento.value = itens[livros].lancamento
    sQuantidade.value = itens[livros].quantidade
    id = livros
  } else {
    sNome.value = ''
    sAutor.value = ''
    sEditora.value = ''
    sLancamento.value = ''
    sQuantidade.value = ''
  }
  
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sAutor.value == '' || sEditora.value == '' || sLancamento.value == '' || sQuantidade.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].autor = sAutor.value
    itens[id].editora = sEditora.value
    itens[id].lancamento = sLancamento.value
    itens[id].quantidade = sQuantidade.value
  } else {
    itens.push({'nome': sNome.value, 'autor': sAutor.value, 'editora': sEditora.value, 'lancamento': sLancamento.value, 'quantidade': sQuantidade.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
  alert("Ação Realizada Com Sucesso!")
}