def calculate(calc_type, params):
    """
    Perform calculation based on calc_type and params.
    Supported types: 'add', 'subtract', 'multiply', 'divide'
    params should contain 'a' and 'b' for binary operations.
    """
    try:
        if calc_type == 'add':
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