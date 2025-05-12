function calcularArea(raio: number): number {
    return Math.PI * Math.pow(raio, 2);
}

function calcularCircunferencia(raio: number): number {
    return 2 * Math.PI * raio;
}

const botaoCalcular = document.getElementById("calcular");
const inputRaio = document.getElementById("raio") as HTMLInputElement;
const inputArea = document.getElementById("area") as HTMLInputElement;
const inputCircunferencia = document.getElementById("circunferencia") as HTMLInputElement;

botaoCalcular?.addEventListener("click", () => {
    const raio = parseFloat(inputRaio.value);

    if (isNaN(raio) || raio <= 0) {
        inputArea.value = "Raio inválido";
        inputCircunferencia.value = "Raio inválido";
        return;
    }

    const area = calcularArea(raio);
    const circunferencia = calcularCircunferencia(raio);

    inputArea.value = area.toFixed(2);
    inputCircunferencia.value = circunferencia.toFixed(2);
});