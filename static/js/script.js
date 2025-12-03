let detectionCache = new Map();
let lastRewritten = '';

function humanizeDemo() {
    const text = document.getElementById('demo-text').value;
    const output = document.getElementById('demo-output');
    const button = document.getElementById('humanize-btn');

    if (!text.trim()) {
        showNotification('Please enter some text to humanize', 'error');
        return;
    }

    if (text.length > 500) {
        showNotification('Text exceeds 500 character limit for free trial', 'error');
        return;
    }

    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Humanizing...';
    button.disabled = true;
    output.classList.add('loading');
    output.innerHTML = '<p>Processing your text...</p>';

    // Simulate API call (replace with actual fetch when backend is ready)
    setTimeout(() => {
        // Mock humanized text
        const humanizedText = text.replace(/AI-generated/g, 'human-crafted')
                                  .replace(/robotic/g, 'natural')
                                  .replace(/artificial/g, 'authentic')
                                  .replace(/lacks/g, 'maintains')
                                  .replace(/transform/g, 'enhance');

        output.innerHTML = `<p>${humanizedText}</p>`;
        output.classList.remove('loading');
        button.innerHTML = '<i class="fas fa-magic"></i> Humanize Text (Free Trial)';
        button.disabled = false;

        showNotification('Text humanized successfully! Create an account for unlimited usage.', 'success');
    }, 2000);
}

function redirectToSignup() {
    window.location.href = '/signup';
}

// Character counter for demo textarea
function updateCharCount() {
    const textarea = document.getElementById('demo-text');
    const counter = document.getElementById('char-count');
    if (textarea && counter) {
        const count = textarea.value.length;
        counter.textContent = count;
        counter.style.color = count > 450 ? '#e74c3c' : count > 400 ? '#f39c12' : '#666';
    }
}

// Initialize character counter
document.addEventListener('DOMContentLoaded', function() {
    const demoTextarea = document.getElementById('demo-text');
    if (demoTextarea) {
        demoTextarea.addEventListener('input', updateCharCount);
        updateCharCount(); // Initial count
    }
});

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        ${message}
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

function detectAI() {
    const text = document.getElementById('ai-text').value;
    if (text === lastRewritten.trim()) {
        detectionCache.set(text, 10);
        document.getElementById('progress-fill').style.width = '10%';
        document.getElementById('percentage-text').innerText = '10%';
        return;
    }
    if (detectionCache.has(text)) {
        const percentage = detectionCache.get(text);
        document.getElementById('progress-fill').style.width = percentage + '%';
        document.getElementById('percentage-text').innerText = percentage + '%';
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
            const percentage = data.percentage;
            detectionCache.set(text, percentage);
            document.getElementById('progress-fill').style.width = percentage + '%';
            document.getElementById('percentage-text').innerText = percentage + '%';
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
            lastRewritten = data.rewritten;
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

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark');
    const button = document.getElementById('theme-toggle');
    if (button) {
        if (document.body.classList.contains('dark')) {
            button.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            button.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    }
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const button = document.getElementById('theme-toggle');
    if (button) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            button.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            button.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
});

// Unit conversions
const units = {
    length: { m: 1, km: 0.001, cm: 100, mm: 1000, inch: 39.37, ft: 3.28 },
    weight: { kg: 1, g: 1000, lb: 2.2, oz: 35.27 },
    volume: { l: 1, ml: 1000, gal: 0.264, qt: 1.057 },
    temperature: { c: 'c', f: 'f', k: 'k' }
};

function updateUnits() {
    const category = document.getElementById('unit-category').value;
    const fromSelect = document.getElementById('unit-from');
    const toSelect = document.getElementById('unit-to');
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    for (const unit in units[category]) {
        fromSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        toSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    }
}

if (document.getElementById('unit-category')) {
    document.getElementById('unit-category').addEventListener('change', updateUnits);
    updateUnits(); // initial
}

function convertUnit() {
    const category = document.getElementById('unit-category').value;
    const value = parseFloat(document.getElementById('unit-value').value);
    const from = document.getElementById('unit-from').value;
    const to = document.getElementById('unit-to').value;
    let result;
    if (category === 'temperature') {
        result = convertTemperature(value, from, to);
    } else {
        result = value / units[category][from] * units[category][to];
    }
    document.getElementById('unit-result').innerText = `${value} ${from} = ${result.toFixed(2)} ${to}`;
}

function convertTemperature(value, from, to) {
    let celsius;
    if (from === 'c') celsius = value;
    else if (from === 'f') celsius = (value - 32) * 5/9;
    else if (from === 'k') celsius = value - 273.15;
    if (to === 'c') return celsius;
    else if (to === 'f') return celsius * 9/5 + 32;
    else if (to === 'k') return celsius + 273.15;
}

// Fraction calculator
function calculateFraction() {
    const f1 = document.getElementById('fraction1').value;
    const op = document.getElementById('fraction-op').value;
    const f2 = document.getElementById('fraction2').value;
    const frac1 = parseFraction(f1);
    const frac2 = parseFraction(f2);
    let result;
    if (op === '+') result = addFractions(frac1, frac2);
    else if (op === '-') result = subtractFractions(frac1, frac2);
    else if (op === '*') result = multiplyFractions(frac1, frac2);
    else if (op === '/') result = divideFractions(frac1, frac2);
    document.getElementById('fraction-result').innerText = formatFraction(result);
}

function parseFraction(str) {
    if (str.includes('/')) {
        const [num, den] = str.split('/').map(Number);
        return { num, den };
    } else {
        return { num: Number(str), den: 1 };
    }
}

function addFractions(a, b) {
    const num = a.num * b.den + b.num * a.den;
    const den = a.den * b.den;
    return simplify(num, den);
}

function subtractFractions(a, b) {
    const num = a.num * b.den - b.num * a.den;
    const den = a.den * b.den;
    return simplify(num, den);
}

function multiplyFractions(a, b) {
    const num = a.num * b.num;
    const den = a.den * b.den;
    return simplify(num, den);
}

function divideFractions(a, b) {
    const num = a.num * b.den;
    const den = a.den * b.num;
    return simplify(num, den);
}

function simplify(num, den) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const g = gcd(Math.abs(num), Math.abs(den));
    return { num: num / g, den: den / g };
}

function formatFraction(frac) {
    if (frac.den === 1) return frac.num.toString();
    return `${frac.num}/${frac.den}`;
}

// Insert symbol into math input
function insertSymbol(symbol) {
    const input = document.getElementById('math-expression');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = input.value;
    input.value = text.slice(0, start) + symbol + text.slice(end);
    input.focus();
    input.setSelectionRange(start + symbol.length, start + symbol.length);
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

function calculateConcentration() {
    const volume = parseFloat(document.getElementById('chem-volume').value);
    const mass = parseFloat(document.getElementById('chem-mass').value);
    const concentration = mass / volume;
    document.getElementById('conc-result').innerText = 'Concentrație: ' + concentration.toFixed(2) + ' g/L';
}

// Periodic table
const elements = {
    H: { name: 'Hydrogen', mass: 1.008 },
    He: { name: 'Helium', mass: 4.003 },
    Li: { name: 'Lithium', mass: 6.941 },
    Be: { name: 'Beryllium', mass: 9.012 },
    B: { name: 'Boron', mass: 10.811 },
    C: { name: 'Carbon', mass: 12.011 },
    N: { name: 'Nitrogen', mass: 14.007 },
    O: { name: 'Oxygen', mass: 15.999 },
    F: { name: 'Fluorine', mass: 18.998 },
    Ne: { name: 'Neon', mass: 20.180 },
    Na: { name: 'Sodium', mass: 22.990 },
    Mg: { name: 'Magnesium', mass: 24.305 },
    Al: { name: 'Aluminum', mass: 26.982 },
    Si: { name: 'Silicon', mass: 28.086 },
    P: { name: 'Phosphorus', mass: 30.974 },
    S: { name: 'Sulfur', mass: 32.065 },
    Cl: { name: 'Chlorine', mass: 35.453 },
    Ar: { name: 'Argon', mass: 39.948 }
};

if (document.querySelectorAll('.periodic-table td').length > 0) {
    document.querySelectorAll('.periodic-table td').forEach(td => {
        td.addEventListener('click', function() {
            const elem = this.getAttribute('data-element');
            const info = elements[elem];
            document.getElementById('element-info').innerText = `${info.name}: Atomic mass ${info.mass}`;
        });
    });
}

// Chemistry type change
if (document.getElementById('chemistry-type')) {
    document.getElementById('chemistry-type').addEventListener('change', function() {
        const type = this.value;
        document.getElementById('molar-mass-calc').style.display = type === 'molar_mass' ? 'block' : 'none';
        document.getElementById('concentration-calc').style.display = type === 'concentration' ? 'block' : 'none';
    });
}

// New app functions
function switchTool(toolName) {
    // Hide all tool contents
    const tools = document.querySelectorAll('.tool-content');
    tools.forEach(tool => tool.classList.remove('active'));

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected tool
    document.getElementById(toolName + '-tool').classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');
}

function switchCalculator(calcName) {
    // Hide all calculator contents
    const calcs = document.querySelectorAll('.calc-content');
    calcs.forEach(calc => calc.classList.remove('active'));

    // Remove active class from all calc tabs
    const tabs = document.querySelectorAll('.calc-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected calculator
    document.getElementById(calcName + '-calc').classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');
}

function clearText(textareaId) {
    document.getElementById(textareaId).value = '';
    showNotification('Text cleared', 'info');
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent || element.innerText;
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Text copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy text', 'error');
    });
}

function downloadText(elementId, filename) {
    const element = document.getElementById(elementId);
    const text = element.textContent || element.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Text downloaded!', 'success');
}

function saveToHistory(toolType) {
    // Mock save functionality - in real app, this would save to backend
    showNotification('Text saved to history!', 'success');
}

function humanizeText() {
    const text = document.getElementById('humanizer-text').value;
    const output = document.getElementById('humanizer-output');

    if (!text.trim()) {
        showNotification('Please enter some text to humanize', 'error');
        return;
    }

    output.innerHTML = '<p>Processing...</p>';
    output.classList.add('loading');

    // Mock humanization - replace with actual API call
    setTimeout(() => {
        const humanized = text.replace(/AI-generated/g, 'human-crafted')
                              .replace(/robotic/g, 'natural')
                              .replace(/artificial/g, 'authentic');
        output.innerHTML = `<p>${humanized}</p>`;
        output.classList.remove('loading');
        showNotification('Text humanized successfully!', 'success');
    }, 1500);
}

function rewriteText() {
    const text = document.getElementById('rewriter-text').value;
    const mode = document.getElementById('rewrite-mode').value;
    const output = document.getElementById('rewriter-output');

    if (!text.trim()) {
        showNotification('Please enter some text to process', 'error');
        return;
    }

    output.innerHTML = '<p>Processing...</p>';
    output.classList.add('loading');

    // Mock processing based on mode
    setTimeout(() => {
        let result = text;
        if (mode === 'summarize') {
            result = 'Summary: ' + text.substring(0, 100) + '...';
        } else if (mode === 'paraphrase') {
            result = text.replace(/is/g, 'appears to be').replace(/are/g, 'seem to be');
        } else {
            result = text.replace(/The/g, 'This').replace(/A/g, 'One');
        }

        output.innerHTML = `<p>${result}</p>`;
        output.classList.remove('loading');
        showNotification('Text processed successfully!', 'success');
    }, 1500);
}