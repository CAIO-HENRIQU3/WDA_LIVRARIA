const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCidade = document.querySelector('#m-cidade')
const btnSalvar = document.querySelector('#btn-salvar')
const btnFechar = document.querySelector('#btn-fechar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('editoras')) ?? []
const setItensBD = () => localStorage.setItem('editoras', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, editoras) => {
      insertItem(item, editoras)
    })
  
  }

  loadItens()

  function insertItem(item, editoras) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.cidade}</td>
      <td class="acao">
        <button onclick="editItem(${editoras})"><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${editoras})"><i class="fa-solid fa-trash" style="color: #000000;"></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }

  function editItem(editoras) {

    openModal(true, editoras)
  }
  
  function deleteItem(editoras) {
    itens.splice(editoras, 1)
    setItensBD()
    loadItens()
  }

function openModal(edit = false, editoras = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[editoras].nome
    sCidade.value = itens[editoras].cidade
    id = editoras
  } else {
    sNome.value = ''
    sCidade.value = ''
  }
  
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCidade.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].cidade = sCidade.value
  } else {
    itens.push({'nome': sNome.value, 'cidade': sCidade.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
  alert("Ação Realizada Com Sucesso!")
}