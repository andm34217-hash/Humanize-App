let detectedText = '';
let aiPercentage = 0;

function detectAI() {
    const text = document.getElementById('ai-text').value;
    if (text === detectedText && aiPercentage >= 0) {
        // Already detected this text
        return;
    }
    fetch('/detect', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        if (data.percentage !== undefined) {
            aiPercentage = data.percentage;
            detectedText = text;
            document.getElementById('progress-fill').style.width = aiPercentage + '%';
            document.getElementById('percentage-text').innerText = aiPercentage + '%';
            document.getElementById('ai-error').innerText = '';
        } else {
            document.getElementById('ai-error').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('ai-error').innerText = 'Eroare de rețea: ' + error.message;
    });
}

function summarize() {
    const text = document.getElementById('ai-text').value;
    fetch('/summary', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        if (data.summary) {
            document.getElementById('summary-result').innerText = data.summary;
            document.getElementById('ai-error').innerText = '';
        } else {
            document.getElementById('ai-error').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('ai-error').innerText = 'Eroare de rețea: ' + error.message;
    });
}

function rewrite() {
    const text = document.getElementById('ai-text').value;
    fetch('/rewrite', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        if (data.rewritten) {
            document.getElementById('rewrite-result').innerText = data.rewritten;
            document.getElementById('ai-error').innerText = '';
        } else {
            document.getElementById('ai-error').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('ai-error').innerText = 'Eroare de rețea: ' + error.message;
    });
}

function calcChemistry() {
    const formula = document.getElementById('formula').value;
    fetch('/chemistry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'molar_mass', formula: formula})
    })
    .then(response => response.json())
    .then(data => {
        if (data.molar_mass) {
            document.getElementById('chem-result').innerText = 'Masă molară: ' + data.molar_mass + ' g/mol';
        } else {
            document.getElementById('chem-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('chem-result').innerText = 'Eroare de rețea: ' + error.message;
    });
}

function calcPhysics() {
    const v0 = parseFloat(document.getElementById('v0').value) || 0;
    const a = parseFloat(document.getElementById('a').value) || 0;
    const t = parseFloat(document.getElementById('t').value) || 0;
    const x = parseFloat(document.getElementById('x').value) || 0;
    fetch('/physics', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'kinematic', v0: v0, a: a, t: t, x: x})
    })
    .then(response => response.json())
    .then(data => {
        if (data.distance !== undefined) {
            document.getElementById('phys-result').innerText = 'Distanță calculată: ' + data.distance + ' m';
        } else {
            document.getElementById('phys-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('phys-result').innerText = 'Eroare de rețea: ' + error.message;
    });
}

function calcTerm() {
    const expression = document.getElementById('expression').value;
    fetch('/term', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({expression: expression})
    })
    .then(response => response.json())
    .then(data => {
        if (data.expanded) {
            document.getElementById('term-result').innerText = 'Rezultat: ' + data.expanded;
        } else {
            document.getElementById('term-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('term-result').innerText = 'Eroare de rețea: ' + error.message;
    });
}

// Tab switching
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName + '-tab').classList.add('active');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

// Math calculator
function calculateMath() {
    const expression = document.getElementById('math-expression').value;
    fetch('/term', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({expression: expression})
    })
    .then(response => response.json())
    .then(data => {
        if (data.expanded) {
            document.getElementById('math-result').innerText = 'Rezultat: ' + data.expanded;
        } else {
            document.getElementById('math-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('math-result').innerText = 'Eroare de rețea: ' + error.message;
    });
}

// Physics calculator (using existing)
function calculatePhysics() {
    const v0 = parseFloat(document.getElementById('phys-v0').value) || 0;
    const a = parseFloat(document.getElementById('phys-a').value) || 0;
    const t = parseFloat(document.getElementById('phys-t').value) || 0;
    const x = parseFloat(document.getElementById('phys-x').value) || 0;
    fetch('/physics', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'kinematic', v0: v0, a: a, t: t, x: x})
    })
    .then(response => response.json())
    .then(data => {
        if (data.distance !== undefined) {
            document.getElementById('phys-result').innerText = 'Distanță calculată: ' + data.distance + ' m';
        } else {
            document.getElementById('phys-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('phys-result').innerText = 'Eroare de rețea: ' + error.message;
    });
}

// Chemistry calculator (using existing)
function calculateChemistry() {
    const formula = document.getElementById('chem-formula').value;
    fetch('/chemistry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'molar_mass', formula: formula})
    })
    .then(response => response.json())
    .then(data => {
        if (data.molar_mass) {
            document.getElementById('chem-result').innerText = 'Masă molară: ' + data.molar_mass + ' g/mol';
        } else {
            document.getElementById('chem-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('chem-result').innerText = 'Eroare de rețea: ' + error.message;
    });
}