# Sintomatología

Orientador de síntomas minimalista, en colores pastel, pensado para Chile.
Creado por **Agustín Vivanco**.

Marcas tus síntomas (cada uno trae un color según su gravedad y tú indicas qué tan intenso lo sientes), agregas edad, sexo, posible embarazo y hace cuánto empezó, y la web te muestra posibles causas con:

- qué es,
- cómo se trata habitualmente,
- a qué especialista acudir,
- si está cubierta por GES,
- señales para buscar atención urgente,
- y las fuentes médicas de cada ficha.

**Web:** https://avclqyz.github.io/sintomatolog-a/

## Qué cubre

- **290 síntomas** en 13 zonas (general, cabeza, ojos, oídos-nariz-boca-garganta, pecho, corazón, abdomen, urinario y genital, regla-mamas-embarazo, piel, músculos y huesos, ánimo y sueño, y contexto o exposiciones), con sinónimos y modismos chilenos como "guata", "desgarro", "fuego", "pidulles", "peste cristal", "puna" o "copete".
- **183 enfermedades**: desde resfrío, crisis de pánico o lumbago hasta infarto, ACV, meningitis, embolia pulmonar o embarazo ectópico; infecciones vigiladas por la OMS (dengue, malaria, sarampión, mpox, VIH, Chagas, rabia); señales de alerta de los cánceres más frecuentes; y cuadros propios de Chile como hantavirus, marea roja, araña de rincón, monóxido de carbono, mal de altura (puna) e intoxicación por plaguicidas.
- **294 referencias** enlazadas.

## Fuentes

El contenido se redactó a partir de fuentes médicas reconocidas (no Wikipedia):

- [Organización Mundial de la Salud (OMS)](https://www.who.int/es/news-room/fact-sheets), la agencia de salud de la ONU, y la [Organización Panamericana de la Salud (OPS)](https://www.paho.org/es)
- [MedlinePlus en español](https://medlineplus.gov/spanish/), de la Biblioteca Nacional de Medicina de EE. UU. (NIH)
- [Mayo Clinic](https://www.mayoclinic.org/es)
- [Ministerio de Salud de Chile (MINSAL)](https://www.minsal.cl/), incluido el listado [AUGE/GES](https://auge.minsal.cl/problemasdesalud/index)
- [Superintendencia de Salud](https://www.supersalud.gob.cl/), [Instituto de Salud Pública (ISP)](https://www.ispch.gob.cl/) y [SENDA](https://www.senda.gob.cl/)
- Clínicas chilenas: [Clínica Las Condes](https://www.clinicalascondes.cl/), [Clínica Alemana](https://www.clinicaalemana.cl/), [UC Christus](https://www.ucchristus.cl/) y [RedSalud](https://www.redsalud.cl/)

Cada enfermedad enlaza sus referencias específicas dentro de la web.

## Cómo funciona

- `js/data.js` es la base de conocimiento: síntomas con su gravedad (leve, atención, alarma o contexto) y enfermedades con sus síntomas ponderados (3 = clave, 2 = frecuente, 1 = posible, negativo = lo hace menos probable), su urgencia y su edad, sexo y duración típicas.
- `js/app.js` calcula la coincidencia: cuánto del cuadro típico tienes × cuánto de lo que sientes explica, ajustado por intensidad, edad, sexo, embarazo, duración, antecedentes necesarios (p. ej. hantavirus requiere contacto con roedores y marea roja, haber comido mariscos) y frecuencia de la enfermedad.
- Los síntomas de alarma muestran un aviso para llamar al SAMU 131 o ir a urgencia. Los pensamientos de hacerse daño muestran la línea *4141.
- Todo corre en el navegador: no hay servidor ni se envían datos.

## Aviso médico

Es una herramienta educativa de orientación. **No entrega diagnósticos ni reemplaza la evaluación de un profesional de salud.** Ante una emergencia en Chile, llama al **SAMU 131**.

## Derechos de autor

© 2026 Agustín Vivanco. Todos los derechos reservados.

El diseño, el código, la base de síntomas y enfermedades y los textos de este proyecto están protegidos por la Ley N° 17.336 sobre Propiedad Intelectual de Chile. No se permite copiarlos, modificarlos ni redistribuirlos sin autorización escrita del autor. Ver [LICENSE](LICENSE) y el aviso legal completo al final de la web (derechos de autor, contenido de terceros, aviso médico y privacidad).
