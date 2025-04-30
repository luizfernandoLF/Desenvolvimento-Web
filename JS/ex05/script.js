document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const chart = document.getElementById('chart');

    drawButton.addEventListener('click', drawChart);

    function drawChart() {
        const heights = [
            parseInt(document.getElementById('height1').value),
            parseInt(document.getElementById('height2').value),
            parseInt(document.getElementById('height3').value),
            parseInt(document.getElementById('height4').value),
            parseInt(document.getElementById('height5').value)
        ];

        const widthInput = parseInt(document.getElementById('width').value);

        chart.innerHTML = '';

        const maxHeight = Math.max(...heights);
        const scale = 300 / maxHeight;

        heights.forEach(height => {
            const bar = document.createElement('div');
            bar.style.height = `${height * scale}px`;
            bar.style.width = `${widthInput}px`;
            bar.style.backgroundColor = 'red';
            bar.style.marginRight = '5px';
            chart.appendChild(bar);
        });
    }
});