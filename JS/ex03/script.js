// Usando as sintaxes disponíveis no ES6, crie uma classe 
// IntegerSet para representar conjuntos de números inteiros. 
// Cada objeto da classe IntegerSet pode armazenar inteiros 
// no intervalo de 0 até um valor máximo específico para cada 
// objeto. 
// • O conjunto deve ser representado por um array de 
// booleanos. O elemento do array na posição i é verdadeiro 
// se e somente se o inteiro i pertencer ao conjunto. 
// • O construtor inicializa o objeto como um conjunto vazio 
// (isto é, um conjunto cuja representação de array contém 
// todos os valores falso). 
// • Desenvolva métodos para as seguintes operações: inserção 
// e exclusão se elementos do conjunto; união, interseção e 
// diferença de conjuntos; e conversão do conjunto para 
// string. 
// • Faça uma aplicação para testar a classe.

class IntegerSet {
    constructor (valorMax){
        this.valorMax = valorMax;
        this.array = new Array(valorMax + 1).fill(false);
    }

    inserir(elem){
        if (elem >= 0 && elem <= this.valorMax){
            this.array[elem] = true;
        }
        else {
            console.error('elemento fora do intervalo');
        }
    }

    excluir(elem) {
        if (elem >= 0 && elem <= this.valorMax){
            this.array[elem] = false;
        }
        else{
            console.error('elemento fora do intervalo');
        }
    }

    uniao(outroConjunto){
        const res = new IntegerSet(this.valorMax);
        for (let i = 0; i <= this.valorMax; i++){
        res.array[i] = this.array[i] || outroConjunto.array[i];
        }
        return res;
    }


    intersecao(outroConjunto) {
        const res = new IntegerSet(this.valorMax);
        for (let i = 0; i <= this.valorMax; i++) {
          res.array[i] = this.array[i] && outroConjunto.array[i];
        }
        return res;
    }

    diferenca(outroConjunto) {
        const res = new IntegerSet(this.valorMax);

        for (let i = 0; i <=this.valorMax; i++){
            res.array[i] = this.array[i] && !outroConjunto.array[i];
        }
        return res;
    }

    toString() {
        const elems = [];
        for (let i = 0; i < this.valorMax; i++){
            if (this.array[i]){
                elems.push(i);
            }
        }
        return `${elems.join(", ") }`;
    }
}

const conjuntoA = new IntegerSet(10); //valormaximo = 10 (teste)
const conjuntoB = new IntegerSet(10);

conjuntoA.inserir(1);
conjuntoA.inserir(3);
conjuntoA.inserir(5);

conjuntoB.inserir(3);
conjuntoB.inserir(4);
conjuntoB.inserir(5);

console.log("Conjunto A:", conjuntoA.toString()); 
console.log("Conjunto B:", conjuntoB.toString()); 

const uniao = conjuntoA.uniao(conjuntoB);
console.log("União de A e B:", uniao.toString());

const intersecao = conjuntoA.intersecao(conjuntoB);
console.log("Interseção de A e B:", intersecao.toString()); 

const diferenca = conjuntoA.diferenca(conjuntoB);
console.log("Diferença de A e B:", diferenca.toString());