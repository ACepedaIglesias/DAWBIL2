def formatear_nombre(nombre, apellido):
    if not nombre or not apellido:
        return "Faltan datos"
    return f"{nombre.capitalize()} {apellido.capitalize()}"