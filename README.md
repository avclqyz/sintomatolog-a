# Sintomatología

Orientador de síntomas minimalista, en colores pastel, pensado para Chile.

Marcas tus síntomas (cada uno trae un color según su gravedad y tú indicas qué tan intenso lo sientes), agregas edad, sexo, posible embarazo y hace cuánto empezó, y la web te muestra posibles causas con:

- qué es,
- cómo se trata habitualmente,
- a qué especialista acudir,
- señales para buscar atención urgente,
- y las fuentes médicas de cada ficha.

**Web:** https://avclqyz.github.io/sintomatolog-a/

## Fuentes

El contenido se redactó a partir de fuentes médicas reconocidas (no Wikipedia):

- [MedlinePlus en español](https://medlineplus.gov/spanish/), de la Biblioteca Nacional de Medicina de EE. UU. (NIH)
- [Mayo Clinic](https://www.mayoclinic.org/es)
- [Ministerio de Salud de Chile (MINSAL)](https://www.minsal.cl/), incluido el listado [AUGE/GES](https://auge.minsal.cl/problemasdesalud/index)

Cada enfermedad enlaza sus referencias específicas dentro de la web.

## Cómo funciona

- `js/data.js` es la base de conocimiento: 146 síntomas (con sinónimos y modismos chilenos como "guata" o "desgarro") y 62 enfermedades, cada una con sus síntomas ponderados (3 = clave, 2 = frecuente, 1 = posible, negativo = lo hace menos probable), su urgencia, edad, sexo y duración típicas.
- `js/app.js` calcula la coincidencia: cuánto del cuadro típico tienes × cuánto de lo que sientes explica, ajustado por intensidad, edad, sexo, embarazo, duración, antecedentes necesarios (p. ej. hantavirus requiere contacto con roedores) y frecuencia de la enfermedad.
- Los síntomas de alarma muestran un aviso para llamar al SAMU 131. Los pensamientos de hacerse daño muestran la línea *4141.
- Todo corre en el navegador: no hay servidor ni se envían datos.

Para correrla localmente basta abrir `index.html` o servir la carpeta:

```sh
python3 -m http.server 8000
```

## Aviso

Es una herramienta educativa de orientación. **No entrega diagnósticos ni reemplaza la evaluación de un profesional de salud.** Ante una emergencia en Chile, llama al **SAMU 131**.
