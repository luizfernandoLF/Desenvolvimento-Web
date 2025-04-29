const form = document.getElementById("circleForm");
const areaSpan = document.getElementById("area");
const circunferenciaSpan = document.getElementById("circunferencia");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const raio = parseFloat(document.getElementById("raio").value);

    if (raio <= 0 || isNaN(raio)) {
        alert("Insira um valor válido");
        return;
    }

    const area = Math.PI * raio * raio;
    const circunferencia = 2 * Math.PI * raio;

    areaSpan.textContent = area.toFixed(2);
    circunferenciaSpan.textContent = circunferencia.toFixed(2);
});