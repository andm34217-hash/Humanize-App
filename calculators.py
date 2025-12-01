import re
from sympy import symbols, expand

def chemistry_calc(data):
    calc_type = data.get('type')
    if calc_type == 'molar_mass':
        formula = data.get('formula', '')
        mass = calculate_molar_mass(formula)
        return {"molar_mass": mass}
    return {"error": "Unknown chemistry calculation type"}

def calculate_molar_mass(formula):
    # Simple molar mass calculator
    elements = {
        'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.811, 'C': 12.011, 'N': 14.007, 'O': 15.999,
        'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.086, 'P': 30.974,
        'S': 32.065, 'Cl': 35.453, 'K': 39.098, 'Ca': 40.078, 'Fe': 55.845, 'Cu': 63.546, 'Zn': 65.409,
        'Ag': 107.868, 'I': 126.904, 'Au': 196.967
    }
    parsed = parse_formula(formula)
    mass = 0
    for elem, count in parsed:
        mass += elements.get(elem, 0) * count
    return round(mass, 3)

def parse_formula(formula):
    matches = re.findall(r'([A-Z][a-z]?)(\d*)', formula)
    result = []
    for elem, num in matches:
        count = int(num) if num else 1
        result.append((elem, count))
    return result

def physics_calc(data):
    calc_type = data.get('type')
    if calc_type == 'kinematic':
        v0 = float(data.get('v0', 0))
        a = float(data.get('a', 0))
        t = float(data.get('t', 0))
        x = v0 * t + 0.5 * a * t**2
        return {"distance": round(x, 2)}
    return {"error": "Unknown physics calculation type"}

def term_calc(data):
    expression = data.get('expression', '')
    try:
        x = symbols('x')
        expanded = expand(expression)
        return {"expanded": str(expanded)}
    except Exception as e:
        return {"error": str(e)}