def calculate(calc_type, params):
    if calc_type == 'add':
        return params.get('a', 0) + params.get('b', 0)
    elif calc_type == 'subtract':
        return params.get('a', 0) - params.get('b', 0)
    elif calc_type == 'multiply':
        return params.get('a', 0) * params.get('b', 0)
    elif calc_type == 'divide':
        b = params.get('b', 1)
        return params.get('a', 0) / b if b != 0 else 0
    else:
        return 0