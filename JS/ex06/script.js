
const dots = [];

document.addEventListener('mousemove', function (evento) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = evento.clientX + 'px';
    dot.style.top = evento.clientY + 'px';

    document.body.appendChild(dot);

    dots.push(dot);

    if (dots.length > 8) {
        const oldDot = dots.shift();
        oldDot.remove();
    }

    setTimeout(() => {
        if (dots.includes(dot)) {
            dot.remove();
            dots.splice(dots.indexOf(dot), 1); 
        }
    }, 1000);
});