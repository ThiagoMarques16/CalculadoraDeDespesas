const form = document.querySelector('#form-despesa');
const despesasSalvas = JSON.parse(localStorage.getItem('despesas')) || [];
let valorTotal = 0;

despesasSalvas.forEach(dado => {
  const desp = despesa(dado.descricao, dado.valor, dado.categoria, dado.id);
  desp.cadastrarDespesa();
  valorTotal += dado.valor;
});
atualizarDespesa(0);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const descricao = document.querySelector('#descricao').value;
  const valor = parseFloat(document.querySelector('#valor').value);
  const categoria = document.querySelector('#categoria').value;
  const id = Math.floor(Math.random() * 1000000000) + 1;

  const novaDespesa = despesa(descricao, valor, categoria, id);
  novaDespesa.cadastrarDespesa();

  despesasSalvas.push({ descricao, valor, categoria, id });
  localStorage.setItem('despesas', JSON.stringify(despesasSalvas));

});

function despesa(descricao, valor, categoria, id) {
  return {
    descricao,
    valor,
    categoria,
    id,

    cadastrarDespesa() {
      const table = document.querySelector('#lista-despesas');
      const tr = document.createElement('tr');

      const tdDescricao = document.createElement('td');
      tdDescricao.innerText = this.descricao;
      tr.appendChild(tdDescricao);

      const tdValor = document.createElement('td');
      tdValor.innerText = `R$ ${this.valor}`;
      tr.appendChild(tdValor);

      const tdCategoria = document.createElement('td');
      tdCategoria.innerText = this.categoria;
      tr.appendChild(tdCategoria);

      const tdAcao = document.createElement('td');
      const excluir = document.createElement('button');
      excluir.classList.add('remove-btn');
      excluir.innerText = 'Excluir';

      excluir.addEventListener('click', () => {
        tr.remove();
        atualizarDespesa(-this.valor);

        const index = despesasSalvas.findIndex(d => d.id === this.id);
        if (index !== -1) {
          despesasSalvas.splice(index, 1);
          localStorage.setItem('despesas', JSON.stringify(despesasSalvas));
        }
      });

      tdAcao.appendChild(excluir);
      tr.appendChild(tdAcao);
      table.appendChild(tr);

      atualizarDespesa(this.valor);
    }
  };
}

function atualizarDespesa(valor) {
  const total = document.querySelector('.valorTotal');
  valorTotal += valor;
  total.innerHTML = valorTotal.toFixed(2);
}

