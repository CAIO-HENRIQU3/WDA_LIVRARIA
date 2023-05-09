const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCidade = document.querySelector('#m-cidade')
const sEndereco = document.querySelector('#m-endereco')
const sEmail = document.querySelector('#m-email')
const btnSalvar = document.querySelector('#btn-salvar')
const btnFechar = document.querySelector('#btn-fechar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('usuarios')) ?? []
const setItensBD = () => localStorage.setItem('usuarios', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, usuarios) => {
      insertItem(item, usuarios)
    })
  
  }

  loadItens()

  function insertItem(item, usuarios) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.cidade}</td>
      <td>${item.endereco}</td>
      <td>${item.email}</td>
      <td class="acao">
        <button onclick="editItem(${usuarios})"><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${usuarios})"><i class="fa-solid fa-trash" style="color: #000000;"></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }

  function editItem(usuarios) {

    openModal(true, usuarios)
  }
  
  function deleteItem(usuarios) {
    itens.splice(usuarios, 1)
    setItensBD()
    loadItens()
  }

function openModal(edit = false, usuarios = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[usuarios].nome
    sCidade.value = itens[usuarios].cidade
    sEndereco.value = itens[usuarios].endereco
    sEmail.value = itens[usuarios].email
    id = usuarios
  } else {
    sNome.value = ''
    sCidade.value = ''
    sEndereco.value = ''
    sEmail.value = ''
  }
  
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCidade.value == '' || sEndereco.value == '' || sEmail == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].cidade = sCidade.value
    itens[id].endereco = sEndereco.value
    itens[id].email = sEmail.value
  } else {
    itens.push({'nome': sNome.value, 'cidade': sCidade.value, 'endereco': sEndereco.value, 'email': sEmail.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
  alert("Ação Realizada Com Sucesso")
}