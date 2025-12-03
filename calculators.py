import sympy as sp

def calculate(calc_type, params):
    if calc_type == 'molar_mass':
        return calculate_molar_mass(params.get('formula', ''))
    elif calc_type == 'kinematics':
        return calculate_kinematics(params)
    elif calc_type == 'math_expansion':
        return expand_expression(params.get('expression', ''))
    else:
        return "Unknown calculation type"

def calculate_molar_mass(formula):
    # Simple molar mass calculator (placeholder)
    # In a real app, you'd need a database of atomic masses
    atomic_masses = {
        'H': 1.008, 'C': 12.011, 'O': 15.999, 'N': 14.007,
        'Na': 22.990, 'Cl': 35.453, 'Fe': 55.845
    }
    mass = 0
    i = 0
    while i < len(formula):
        element = formula[i]
        i += 1
        num = 0
        while i < len(formula) and formula[i].isdigit():
            num = num * 10 + int(formula[i])
            i += 1
        if num == 0:
            num = 1
        mass += atomic_masses.get(element, 0) * num
    return f"Molar mass of {formula}: {mass:.3f} g/mol"

def calculate_kinematics(params):
    # Basic kinematics: v = u + at, s = ut + 0.5at^2, etc.
    u = params.get('initial_velocity', 0)
    a = params.get('acceleration', 0)
    t = params.get('time', 0)
    v = u + a * t
    s = u * t + 0.5 * a * t**2
    return f"Final velocity: {v} m/s, Displacement: {s} m"

def expand_expression(expression):
    try:
        expr = sp.sympify(expression)
        expanded = sp.expand(expr)
        return str(expanded)
    except:
        return "Invalid expression"