import unittest
from tema6.logica import formatear_nombre
class TestFormateao(unittest.TestCase):
    def test_nombre_completo(self):
        resultado = formatear_nombre("juan","pérez")
        self.assertEqual(resultado, "Juan Pérez")

    def test_datos_vacios(self):
        resultado =formatear_nombre("", "Perez")
        self.assertEqual(resultado, "Faltan datos")
if __name__ == "__main__":
    unittest.main()