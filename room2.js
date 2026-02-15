const dataFile = document.getElementById('data-file');
const dropZone = document.getElementById('drop-zone');
const phase1 = document.getElementById('phase-1');
const phase2 = document.getElementById('phase-2');
const phase3 = document.getElementById('phase-3');
const resizeClue = document.getElementById('resize-clue');
const accessForm = document.getElementById('access-form');
const codeInput = document.getElementById('code-input');
const formMessage = document.getElementById('form-message');

let phase1Complete = false;
dataFile.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'kernel-security');
    e.target.style.opacity = '0.5';
});

dataFile.addEventListener('dragend', (e) => {
    e.target.style.opacity = '1';
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    dropZone.classList.add('active');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('active');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    
    if (data === 'kernel-security') {
        dropZone.innerHTML = "CARGA COMPLETA";
        dropZone.style.borderColor = "cyan";
        phase1.classList.add('hidden');
        phase2.classList.remove('hidden');
        phase1Complete = true; // Habilitar la siguiente fase
        checkWindowSize(); // Comprobar si ya estaba pequeña
    }
});

