# Inserta un fragmento (bloque D.addPack de una tanda) antes del cierre "})();" de un archivo de datos.
# Uso: python3 dev/insertar.py fragmento.js js/data-comunes.js
import sys
frag, target = sys.argv[1], sys.argv[2]
s = open(target, encoding='utf-8').read()
f = open(frag, encoding='utf-8').read()
i = s.rstrip().rfind('})();')
assert i > 0, 'no se encontró el cierre del archivo'
open(target, 'w', encoding='utf-8').write(s[:i] + f.rstrip() + '\n' + s[i:])
print('insertado en', target)
