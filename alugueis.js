const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sLivroAlugado = document.querySelector('#m-livro-alug')
const sUsuario = document.querySelector('#m-usuario')
const sDataAluguel = document.querySelector('#m-data-aluguel')
const sPrevData = document.querySelector('#m-prev-data')
const btnSalvar = document.querySelector('#btn-salvar')
const btnFechar = document.querySelector('#btn-fechar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('alugueis')) ?? []
const setItensBD = () => localStorage.setItem('alugueis', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, alugueis) => {
      insertItem(item, alugueis)
    })
  
  }

  loadItens()

  function insertItem(item, alugueis) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.livroalugado}</td>
      <td>${item.usuario}</td>
      <td>${new Date(item.dataaluguel).toLocaleDateString('pt-BR')}</td>
      <td>${new Date(item.prevdata).toLocaleDateString('pt-BR')}</td>
      <td class="acao">
        <button onclick="editItem(${alugueis})"><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${alugueis})"><i class="fa-solid fa-trash" style="color: #000000;"></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }

  function editItem(alugueis) {

    openModal(true, alugueis)
  }
  
  function deleteItem(alugueis) {
    itens.splice(alugueis, 1)
    setItensBD()
    loadItens()
  }

function openModal(edit = false, alugueis = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sLivroAlugado.value = itens[alugueis].livroalugado
    sUsuario.value = itens[alugueis].usuario
    sDataAluguel.value = itens[alugueis].dataaluguel
    sPrevData.value = itens[alugueis].prevdata
    id = alugueis
  } else {
    sLivroAlugado.value = ''
    sUsuario.value = ''
    sDataAluguel.value = ''
    sPrevData.value = ''
  }
  
}

btnSalvar.onclick = e => {

  if (sLivroAlugado.value == '' || sUsuario.value == '' || sDataAluguel.value == '' || sPrevData.value == '') {
    return
  }

  const dataAluguel = new Date(sDataAluguel.value)
  const prevData = new Date(sPrevData.value)
  const diffTime = prevData.getTime() - dataAluguel.getTime()
  const diffDays = diffTime / (1000 * 3600 * 24)
  if (diffDays > 31) {
    alert("Não é possível realizar o aluguel pois a data de previsão de entrega é maior do que 30 dias.")
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].livroalugado = sLivroAlugado.value
    itens[id].usuario = sUsuario.value
    itens[id].dataaluguel = sDataAluguel.value
    itens[id].prevdata = sPrevData.value
  } else {
    itens.push({'livroalugado': sLivroAlugado.value, 'usuario': sUsuario.value, 'dataaluguel': sDataAluguel.value, 'prevdata': sPrevData.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
  alert("Ação Realizada Com Sucesso!")
}