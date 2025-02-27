document.addEventListener('DOMContentLoaded', function () {
  const gravarButton = document.getElementById('gravar');
  const tabelaAnimais = document.getElementById('tabelaAnimais');
  const tabelaBody = tabelaAnimais.querySelector('tbody');
  const headers = tabelaAnimais.querySelectorAll('th');
 
  // Função para salvar dados no localStorage
  function salvarDados() {
  const dados = [];
  tabelaBody.querySelectorAll('tr').forEach(row => {
  const nome = row.children[0].textContent;
  const idade = row.children[1].textContent;
  const raca = row.children[2].textContent;
  dados.push({ nome, idade, raca });
  });
  localStorage.setItem('animais', JSON.stringify(dados));
  }
 
  // Função para carregar dados do localStorage
  function carregarDados() {
  const dados = JSON.parse(localStorage.getItem('animais')) || [];
  dados.forEach(dado => {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${dado.nome}</td>
  <td>${dado.idade}</td>
  <td>${dado.raca}</td>
  `;
  tabelaBody.appendChild(row);
  });
  }
 
  // Carregar dados ao iniciar a página
  carregarDados();
 
  gravarButton.addEventListener('click', function () {
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const raca = document.getElementById('raca').value;
 
  if (nome && idade && raca) {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${nome}</td>
  <td>${idade}</td>
  <td>${raca}</td>
  `;
  tabelaBody.appendChild(row);
  document.getElementById('cadastroForm').reset();
  salvarDados();
  }
  });
 
  headers.forEach(header => {
  header.addEventListener('click', function () {
  const index = Array.prototype.indexOf.call(headers, header);
  const rows = Array.from(tabelaBody.querySelectorAll('tr'));
  const sortedRows = rows.sort((a, b) => {
  const aText = a.children[index].textContent;
  const bText = b.children[index].textContent;
  return aText.localeCompare(bText, undefined, { numeric: true });
  });
  tabelaBody.innerHTML = '';
  sortedRows.forEach(row => tabelaBody.appendChild(row));
  salvarDados();
  });
  });
 });