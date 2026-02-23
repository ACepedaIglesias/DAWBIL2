#lectura de ficheros
#opcion 1
f = open("files/temps.dat")
#read carga todo el archivo en ram a la vez
contenido = f.read()
print(contenido)
f.close() #inprescindible cerrarlo despues de open
print("\n**Opcion 2 con lista")
f = open("files/temps.dat")
lines = f.readlines()
for linea in lines:
    print(linea.strip())
f.close()

print("\n**Opcion 3 con lista")
f = open("files/temps.dat")
for line in f:
    print(line.strip())
f.close()
