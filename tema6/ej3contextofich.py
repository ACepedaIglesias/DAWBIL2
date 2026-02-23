#El standart en python es usar with
#su gran ventaja es que no es necesario el close
with open("files/salida.txt","w",encoding="utf-8") as f:
    f.write("Linea 1: configuracion inicial\n")
    f.write("Linea 2: proceso finalizado\n")

print("Archivo generado")

with open("files/salida.txt","a",encoding="utf-8") as f:
    f.write("Linea 3: añadida desde append\n")

dias = ["lunes\n","Martes\n","Miercoles\n","Jueves\n","Viernes\n","Sabado\n", "Domingo\n"]
with open("files/diasSemana.txt","w",encoding="utf-8") as f:
    f.writelines(dias)
print("Archivo generado")