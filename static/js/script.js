function detectAI() {
    const text = document.getElementById('ai-text').value;
    fetch('/detect', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        if (data.percentage !== undefined) {
            const percentage = data.percentage;
            document.getElementById('progress-fill').style.width = percentage + '%';
            document.getElementById('percentage-text').innerText = percentage + '%';
            document.getElementById('ai-result').innerText = '';
        } else {
            document.getElementById('ai-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('ai-result').innerText = 'Eroare de rețea: ' + error.message;
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
            document.getElementById('ai-result').innerText = 'Rezumat: ' + data.summary;
        } else {
            document.getElementById('ai-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('ai-result').innerText = 'Eroare de rețea: ' + error.message;
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
            document.getElementById('ai-result').innerText = 'Rescris: ' + data.rewritten;
        } else {
            document.getElementById('ai-result').innerText = 'Eroare: ' + (data.error || 'Necunoscut');
        }
    })
    .catch(error => {
        document.getElementById('ai-result').innerText = 'Eroare de rețea: ' + error.message;
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