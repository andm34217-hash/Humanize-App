def calculate(calc_type, params):
    """
    Perform calculation based on calc_type and params.
    Supported types: 'molar_mass', 'kinematics', 'math_expansion', 'add', 'subtract', 'multiply', 'divide'
    """
    try:
        if calc_type == 'molar_mass':
            return calculate_molar_mass(params.get('formula', ''))
        elif calc_type == 'kinematics':
            return calculate_kinematics(params)
        elif calc_type == 'math_expansion':
            return expand_math_expression(params.get('expression', ''))
        elif calc_type == 'add':
            return params.get('a', 0) + params.get('b', 0)
        elif calc_type == 'subtract':
            return params.get('a', 0) - params.get('b', 0)
        elif calc_type == 'multiply':
            return params.get('a', 0) * params.get('b', 0)
        elif calc_type == 'divide':
            b = params.get('b', 1)
            if b == 0:
                return "Division by zero"
            return params.get('a', 0) / b
        else:
            return "Unknown calculation type"
    except Exception as e:
        return f"Error: {str(e)}"


def calculate_molar_mass(formula):
    """
    Calculate molar mass from chemical formula.
    Basic implementation for common elements.
    """
    # Atomic masses (g/mol) for common elements
    atomic_masses = {
        'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.811, 'C': 12.011,
        'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305,
        'Al': 26.982, 'Si': 28.086, 'P': 30.974, 'S': 32.065, 'Cl': 35.453, 'K': 39.098,
        'Ca': 40.078, 'Fe': 55.845, 'Cu': 63.546, 'Zn': 65.409, 'Br': 79.904, 'I': 126.904
    }

    if not formula:
        return "Introduceți o formulă chimică validă"

    try:
        total_mass = 0
        i = 0
        while i < len(formula):
            # Get element symbol (1-2 characters)
            element = formula[i]
            i += 1
            if i < len(formula) and formula[i].islower():
                element += formula[i]
                i += 1

            # Get number (optional)
            num_str = ''
            while i < len(formula) and formula[i].isdigit():
                num_str += formula[i]
                i += 1

            number = int(num_str) if num_str else 1

            if element in atomic_masses:
                total_mass += atomic_masses[element] * number
            else:
                return f"Element necunoscut: {element}"

        return f"Masă molară: {total_mass:.3f} g/mol"
    except Exception as e:
        return f"Eroare în calcul: {str(e)}"


def calculate_kinematics(params):
    """
    Calculate kinematics problems.
    v = u + at (final velocity)
    s = ut + (1/2)at² (displacement)
    v² = u² + 2as (velocity squared)
    """
    try:
        u = params.get('initial_velocity', 0)  # initial velocity
        a = params.get('acceleration', 0)      # acceleration
        t = params.get('time', 0)              # time

        if t > 0 and a != 0:
            # Calculate final velocity: v = u + at
            v = u + a * t
            # Calculate displacement: s = ut + (1/2)at²
            s = u * t + 0.5 * a * t * t
            return f"Viteză finală: {v:.2f} m/s\nDeplasare: {s:.2f} m"
        elif a != 0:
            # If no time given, ask for more parameters
            return "Introduceți timpul pentru calcul complet"
        else:
            return "Introduceți accelerația și timpul"
    except Exception as e:
        return f"Eroare în calcul: {str(e)}"


def expand_math_expression(expression):
    """
    Expand mathematical expressions using sympy.
    """
    try:
        from sympy import expand, sympify, symbols
        x = symbols('x')
        expr = sympify(expression)
        expanded = expand(expr)
        return f"Expansiune: {expanded}"
    except ImportError:
        return "SymPy nu este instalat pentru expansiuni matematice"
    except Exception as e:
        return f"Eroare în expansiune: {str(e)}"