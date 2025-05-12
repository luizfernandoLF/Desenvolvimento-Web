"use strict";
function calcularArea(raio) {
    return Math.PI * Math.pow(raio, 2);
}
function calcularCircunferencia(raio) {
    return 2 * Math.PI * raio;
}
const botaoCalcular = document.getElementById("calcular");
const inputRaio = document.getElementById("raio");
const inputArea = document.getElementById("area");
const inputCircunferencia = document.getElementById("circunferencia");
botaoCalcular === null || botaoCalcular === void 0 ? void 0 : botaoCalcular.addEventListener("click", () => {
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
