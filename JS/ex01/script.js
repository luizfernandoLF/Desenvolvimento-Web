function gerarTabuada(n) {
    const div = document.createElement("div");
    div.className = "caixa";
  
    const titulo = document.createElement("h2");
    titulo.textContent = `Produtos de ${n}`;
    div.appendChild(titulo);
  
    const lista = document.createElement("ul");
  
    for (let i = 1; i <= 10; i++) {
      const item = document.createElement("li");
      item.textContent = `${n} x ${i} = ${n * i}`;
      lista.appendChild(item);
    }
  
    div.appendChild(lista);
    document.body.appendChild(div);
  }
  
  for (let i = 1; i <= 10; i++) {
    gerarTabuada(i);
  }
