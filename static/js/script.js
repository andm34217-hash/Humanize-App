function detectAI() {
    const text = document.getElementById('detect-text').value;
    fetch('/detect', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('detect-result').innerText = JSON.stringify(data);
    });
}

function summarize() {
    const text = document.getElementById('summary-text').value;
    fetch('/summary', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('summary-result').innerText = data.summary;
    });
}

function rewrite() {
    const text = document.getElementById('rewrite-text').value;
    fetch('/rewrite', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('rewrite-result').innerText = data.rewritten;
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
        document.getElementById('chem-result').innerText = 'Masă molară: ' + data.molar_mass;
    });
}

function calcPhysics() {
    const v0 = document.getElementById('v0').value;
    const a = document.getElementById('a').value;
    const t = document.getElementById('t').value;
    fetch('/physics', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'kinematic', v0: v0, a: a, t: t})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('phys-result').innerText = 'Distanță: ' + data.distance;
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
        document.getElementById('term-result').innerText = 'Expandat: ' + data.expanded;
    });
}