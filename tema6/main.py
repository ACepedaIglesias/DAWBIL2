import json
import uuid
from typing import List, Dict, Any

#TODO INCLUYE AQUÍ TU NOMBRE Y APELLIDOS
FICHERO_JSON = 'personas_base.json'

def create_person(person_data: Dict[str, Any]) -> None:
    """
    Añade una nueva persona al fichero JSON, asignándole un UUID único.
    
    Instrucciones:
    1. Lee el contenido actual del fichero JSON.
    2. Asigna un ID único a 'person_data' usando uuid.uuid4().
    3. Añade el nuevo diccionario de persona a la lista.
    4. Escribe la lista actualizada de nuevo en el fichero.
    """
    # TODO: Implementar la lógica para crear una persona
    pass

def read_persons() -> List[Dict[str, Any]]:
    with open('personas_base.json', 'r') as file:
        data = json.load(file)
    # TODO: Implementar la lógica para leer todas las personas
    return []

def update_person(person_id: str, updated_data: Dict[str, Any]) -> bool:
    """
    Actualiza los datos de una persona por su id (UUID).
    El test actualizará la profesión de la primera persona de la lista.

    Instrucciones:
    1. Lee el contenido del fichero.
    2. Busca la persona con el 'person_id' dado.
    3. Si la encuentras, actualiza sus datos con 'updated_data'.
    4. Guarda los cambios en el fichero.
    5. Devuelve True si la actualización fue exitosa, False en caso contrario.
    """
    # TODO: Implementar la lógica para actualizar una persona
    return False

def delete_person(person_id: str) -> bool:
    """
    Elimina una persona por su id (UUID).
    El test eliminará a la tercera persona de la lista.

    Instrucciones:
    1. Lee el contenido del fichero.
    2. Crea una nueva lista sin la persona que tenga el 'person_id' dado.
    3. Guarda la nueva lista en el fichero.
    4. Devuelve True si la eliminación fue exitosa, False en caso contrario.
    """
    # TODO: Implementar la lógica para eliminar una persona
    return False

def menu_principal():
    """
    Muestra el menú principal y gestiona las opciones del usuario.
    """
    while True:
        print("\n--- GESTIÓN DE PERSONAS ---")
        print("1. Añadir nueva persona")
        print("2. Mostrar todas las personas")
        print("3. Actualizar persona")
        print("4. Eliminar persona")
        print("5. Salir")

        opcion = input("\nElige una opción (1-5): ")

        if opcion == "1":
            print("\n--- Añadir Nueva Persona ---")
            try:
                nombre = input("Nombre: ")
                edad = int(input("Edad: "))
                profesion = input("Profesión: ")
                ciudad = input("Ciudad: ")
                new_person_data = {
                    "nombre": nombre, "edad": edad, 
                    "profesion": profesion, "ciudad": ciudad
                }
                create_person(new_person_data)
                print("Persona añadida con éxito.")
            except ValueError:
                print("Error: La Edad debe ser un número entero.")
            except Exception as e:
                print(f"Ha ocurrido un error: {e}")

        elif opcion == "2":
            personas = read_persons()
            print("\n--- LISTA DE PERSONAS ---")
            if personas:
                for p in personas:
                    print(f"- ID: {p['id']}, Nombre: {p['nombre']}, Edad: {p['edad']}, Profesión: {p['profesion']}, Ciudad: {p['ciudad']}")
            else:
                print("No hay personas para mostrar o el fichero está vacío.")

        elif opcion == "3":
            print("\n--- Actualizar Persona ---")
            try:
                person_id = input("ID (UUID) de la persona a actualizar: ")
                # Para simplificar, solo se actualizará la profesión en este menú de ejemplo
                new_profession = input("Nueva profesión: ")
                if update_person(person_id, {"profesion": new_profession}):
                    print("Persona actualizada con éxito.")
                else:
                    print(f"Error: No se encontró a la persona con ID {person_id}.")
            except Exception as e:
                print(f"Ha ocurrido un error: {e}")

        elif opcion == "4":
            print("\n--- Eliminar Persona ---")
            try:
                person_id = input("ID (UUID) de la persona a eliminar: ")
                if delete_person(person_id):
                    print("Persona eliminada con éxito.")
                else:
                    print(f"Error: No se encontró a la persona con ID {person_id}.")
            except Exception as e:
                print(f"Ha ocurrido un error: {e}")

        elif opcion == "5":
            print("Saliendo del programa...")
            break
        else:
            print("Opción no válida. Inténtalo de nuevo.")

if __name__ == "__main__":
    menu_principal()