# Marca ítems de dev/lista-500.md como agregados u omitidos.
# Uso: python3 dev/marcar.py <tanda> C001=id_condicion R001=id ...   (o  C010=-motivo para omitir)
import sys, re
tanda = sys.argv[1]
p = 'dev/lista-500.md'
s = open(p, encoding='utf-8').read()
for arg in sys.argv[2:]:
    code, val = arg.split('=', 1)
    m = re.search(r'^- \[ \] ' + re.escape(code) + r' (.+)$', s, flags=re.M)
    if not m:
        print('no encontrado o ya marcado:', code); continue
    name = m.group(1).replace('  _(reserva)_', '')
    if val.startswith('-'):
        new = f'- [-] {code} {name} — omitida: {val[1:]}'
    else:
        new = f'- [x] {code} {name} — tanda {tanda} · `{val}`'
    s = s[:m.start()] + new + s[m.end():]
open(p, 'w', encoding='utf-8').write(s)
print('agregadas:', s.count('- [x]'), '· omitidas:', s.count('- [-]'), '· pendientes:', s.count('- [ ]'))
