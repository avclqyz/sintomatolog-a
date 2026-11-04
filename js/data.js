/*
 * Sintomatología · base de conocimiento
 * © 2026 Agustín Vivanco. Todos los derechos reservados.
 * --------------------------------------
 * Contenido redactado a partir de fuentes médicas confiables:
 *   - MedlinePlus en español (Biblioteca Nacional de Medicina de EE. UU., NIH)
 *   - Mayo Clinic (versión en español cuando existe)
 *   - Ministerio de Salud de Chile (MINSAL), AUGE/GES, ISP, SENDA y Superintendencia de Salud
 *   - OMS (Organización Mundial de la Salud, agencia de salud de la ONU) y OPS
 *   - Clínicas chilenas: Clínica Las Condes, Clínica Alemana, UC Christus y RedSalud
 * Cada enfermedad indica sus fuentes en el campo `src`.
 *
 * Pesos de síntomas por enfermedad (campo `s`):
 *    3 = síntoma clave / característico
 *    2 = síntoma frecuente
 *    1 = síntoma posible / acompañante
 *   <0 = síntoma que hace MENOS probable la enfermedad
 *
 * Gravedad base de cada síntoma (campo `sev`):
 *    1 = leve (verde) · 2 = atención (amarillo) · 3 = alarma (rosado) · 0 = contexto (lila)
 *
 * Urgencia de cada enfermedad (campo `urg`):
 *    1 autocuidado · 2 consulta médica · 3 consulta pronto · 4 urgencia hoy · 5 emergencia (131)
 *
 * Duración típica (campo `dur`): h = horas · d = días · s = semanas · m = más de un mes
 * `req` / `reqF`: si no marcaste ninguno de esos antecedentes, la coincidencia se multiplica por reqF
 *   (p. ej. hantavirus sin contacto con roedores es muy poco probable).
 */
(function () {
  'use strict';

  const ZONES = [
    { id: 'general', n: 'General' },
    { id: 'cabeza', n: 'Cabeza y nervios' },
    { id: 'ojos', n: 'Ojos' },
    { id: 'oong', n: 'Oídos, nariz, boca y garganta' },
    { id: 'respiracion', n: 'Pecho y respiración' },
    { id: 'corazon', n: 'Corazón y circulación' },
    { id: 'digestivo', n: 'Abdomen y digestión' },
    { id: 'urogenital', n: 'Urinario y genital' },
    { id: 'mujer', n: 'Regla, mamas y embarazo' },
    { id: 'piel', n: 'Piel' },
    { id: 'musculo', n: 'Músculos, huesos y articulaciones' },
    { id: 'mente', n: 'Ánimo, emociones y sueño' },
    { id: 'contexto', n: 'Contexto y exposiciones' }
  ];

  // [id, nombre, zona, gravedad, sinónimos, sexo opcional]
  const RAW_SYMPTOMS = [
    // ── General
    ['fiebre', 'Fiebre (38 °C o más)', 'general', 2, ['temperatura', 'afiebrado', 'fiebre alta', 'febril']],
    ['febricula', 'Fiebre baja (37,5 a 38 °C)', 'general', 1, ['febrícula', 'décimas', 'temperatura baja', 'destemplado']],
    ['escalofrios', 'Escalofríos', 'general', 1, ['chuchos de frío', 'tiritones', 'tiritar', 'tiritón']],
    ['fatiga', 'Cansancio o fatiga', 'general', 1, ['agotamiento', 'sin energía', 'decaimiento', 'cansado', 'agotado']],
    ['dolor_muscular', 'Dolor muscular o de cuerpo', 'general', 1, ['mialgia', 'cuerpo cortado', 'me duele todo', 'dolor de cuerpo', 'dolor de huesos']],
    ['sudoracion', 'Sudoración intensa o sudor frío', 'general', 2, ['transpiración', 'sudor frío', 'sudar mucho', 'sudor']],
    ['debilidad_general', 'Debilidad marcada', 'general', 1, ['sin fuerzas', 'flojera', 'debilidad']],
    ['perdida_peso', 'Baja de peso sin explicación', 'general', 2, ['adelgazar', 'perder peso', 'enflaquecer', 'bajar de peso']],
    ['aumento_peso', 'Aumento de peso sin explicación', 'general', 1, ['subir de peso', 'engordar']],
    ['sed', 'Mucha sed o boca seca', 'general', 1, ['boca seca', 'polidipsia', 'sediento']],
    ['hambre', 'Hambre intensa y repentina', 'general', 1, ['apetito', 'hambriento']],
    ['intolerancia_frio', 'Sentir mucho frío (más que los demás)', 'general', 1, ['friolento', 'frío', 'intolerancia al frío']],
    ['intolerancia_calor', 'Sentir mucho calor (más que los demás)', 'general', 1, ['acalorado', 'bochornos', 'intolerancia al calor']],
    ['palidez', 'Palidez', 'general', 1, ['pálido', 'pálida', 'piel blanca']],
    ['ganglios', 'Ganglios inflamados (cuello, axilas)', 'general', 1, ['bolitas en el cuello', 'nódulos', 'adenopatías', 'ganglio']],
    ['inapetencia', 'Falta de apetito', 'general', 1, ['sin hambre', 'inapetencia', 'no quiero comer']],
    ['desmayo', 'Desmayo o pérdida de conocimiento', 'general', 3, ['síncope', 'me desmayé', 'perdí el conocimiento', 'desvanecimiento', 'lipotimia']],
    ['convulsion', 'Convulsión', 'general', 3, ['crisis convulsiva', 'epilepsia', 'sacudidas', 'ataque epiléptico']],
    ['somnolencia', 'Somnolencia marcada o cuesta despertar', 'general', 2, ['letargo', 'mucho sueño', 'adormilado', 'aletargado']],

    // ── Cabeza y nervios
    ['dolor_cabeza', 'Dolor de cabeza', 'cabeza', 1, ['cefalea', 'jaqueca', 'me duele la cabeza']],
    ['dolor_cabeza_subito', 'Dolor de cabeza súbito, el peor de tu vida', 'cabeza', 3, ['cefalea en trueno', 'dolor de cabeza explosivo', 'dolor de cabeza muy fuerte']],
    ['dolor_cabeza_pulsatil', 'Dolor de cabeza pulsátil, en un lado', 'cabeza', 1, ['migraña', 'me late la cabeza', 'palpitante', 'hemicránea']],
    ['dolor_cabeza_banda', 'Dolor de cabeza como banda apretada', 'cabeza', 1, ['presión en la cabeza', 'cefalea tensional', 'como un casco']],
    ['aura', 'Luces, zigzag o manchas en la vista antes del dolor', 'cabeza', 2, ['aura', 'destellos', 'manchas en la vista', 'luces']],
    ['fotofobia', 'Molestia con la luz o los ruidos', 'cabeza', 1, ['fotofobia', 'sensibilidad a la luz', 'me molesta la luz', 'me molesta el ruido']],
    ['mareo', 'Mareo o sensación de desmayo', 'cabeza', 1, ['aturdimiento', 'mareado', 'inestable', 'cabeza liviana']],
    ['vertigo', 'Vértigo (sientes que todo gira)', 'cabeza', 2, ['todo da vueltas', 'todo gira', 'vueltas']],
    ['vertigo_posicion', 'Vértigo al girar la cabeza o acostarte', 'cabeza', 1, ['vértigo al acostarme', 'vértigo posicional', 'al darme vuelta en la cama']],
    ['perdida_equilibrio', 'Pérdida de equilibrio o coordinación', 'cabeza', 3, ['descoordinación', 'no puedo caminar derecho', 'tambaleo', 'inestabilidad']],
    ['debilidad_lado', 'Debilidad o adormecimiento de un lado del cuerpo', 'cabeza', 3, ['hemiparesia', 'no puedo mover el brazo', 'brazo dormido', 'pierna dormida', 'parálisis']],
    ['cara_caida', 'Cara caída o boca torcida', 'cabeza', 3, ['boca chueca', 'parálisis facial', 'cara chueca']],
    ['habla', 'Dificultad repentina para hablar o entender', 'cabeza', 3, ['habla arrastrada', 'no me salen las palabras', 'se traba la lengua', 'balbuceo']],
    ['vision_subita', 'Pérdida súbita de visión o visión doble', 'ojos', 3, ['visión doble', 'ceguera', 'dejé de ver', 'diplopía']],
    ['rigidez_cuello', 'Rigidez de cuello (cuesta tocar el pecho con el mentón)', 'cabeza', 3, ['cuello duro', 'cuello rígido', 'nuca rígida', 'cuello tieso']],
    ['confusion', 'Confusión o desorientación', 'cabeza', 3, ['desorientado', 'no sabe dónde está', 'confundido', 'delirio']],
    ['hormigueo', 'Hormigueo en manos o alrededor de la boca', 'cabeza', 1, ['parestesias', 'cosquilleo', 'manos dormidas']],
    ['temblor', 'Temblor en las manos', 'cabeza', 1, ['temblores', 'manos temblorosas', 'tiritan las manos']],
    ['memoria', 'Dificultad para concentrarte o recordar', 'cabeza', 1, ['olvidos', 'niebla mental', 'concentración']],

    // ── Ojos, oídos, nariz y garganta
    ['congestion', 'Nariz tapada', 'oong', 1, ['congestión nasal', 'nariz congestionada', 'no puedo respirar por la nariz']],
    ['secrecion_nasal', 'Secreción nasal (mocos)', 'oong', 1, ['mocos', 'moquera', 'nariz que gotea', 'rinorrea']],
    ['estornudos', 'Estornudos', 'oong', 1, ['estornudar']],
    ['picazon_ojos_nariz', 'Picazón en nariz u ojos, ojos llorosos', 'oong', 1, ['comezón', 'ojos llorosos', 'picor', 'alergia']],
    ['dolor_garganta', 'Dolor de garganta', 'oong', 1, ['carraspera', 'me duele al tragar', 'odinofagia', 'garganta irritada']],
    ['placas', 'Placas blancas o pus en las amígdalas', 'oong', 2, ['amígdalas con pus', 'amigdalitis', 'puntos blancos en la garganta']],
    ['ronquera', 'Voz ronca o disfonía', 'oong', 1, ['disfonía', 'afonía', 'sin voz', 'ronco']],
    ['dolor_cara', 'Dolor o presión en frente o pómulos', 'oong', 1, ['senos paranasales', 'presión en la cara', 'dolor de cara']],
    ['perdida_olfato', 'Pérdida del olfato o del gusto', 'oong', 1, ['anosmia', 'no siento olores', 'no siento sabores']],
    ['dolor_oido', 'Dolor de oído', 'oong', 1, ['otalgia', 'me duele el oído']],
    ['secrecion_oido', 'Secreción por el oído', 'oong', 2, ['supura el oído', 'pus en el oído', 'otorrea']],
    ['audicion', 'Oído tapado o baja audición', 'oong', 1, ['no escucho bien', 'sordera', 'oído tapado']],
    ['ojo_rojo', 'Ojo rojo', 'ojos', 1, ['ojos rojos', 'ojo irritado']],
    ['laganas', 'Lagañas o secreción en el ojo', 'ojos', 1, ['legañas', 'pus en el ojo', 'ojo pegado']],
    ['vision_borrosa', 'Visión borrosa', 'ojos', 2, ['veo borroso', 'visión nublada']],
    ['sangrado_nariz', 'Sangrado de nariz', 'oong', 1, ['epistaxis', 'sangre de narices']],

    // ── Pecho y respiración
    ['tos_seca', 'Tos seca', 'respiracion', 1, ['tos', 'tos irritativa']],
    ['tos_flema', 'Tos con flema (desgarro)', 'respiracion', 1, ['desgarro', 'flemas', 'expectoración', 'tos productiva', 'tos con mocos']],
    ['tos_sangre', 'Tos con sangre', 'respiracion', 3, ['hemoptisis', 'escupir sangre', 'desgarro con sangre']],
    ['falta_aire', 'Falta de aire o ahogo', 'respiracion', 2, ['disnea', 'me ahogo', 'cuesta respirar', 'dificultad para respirar']],
    ['ahogo_severo', 'Dificultad grave para respirar (no puedes decir frases)', 'respiracion', 3, ['asfixia', 'no puedo respirar', 'ahogo severo']],
    ['sibilancias', 'Silbido o pito al respirar', 'respiracion', 2, ['sibilancias', 'pito', 'silbido en el pecho', 'pecho apretado']],
    ['respiracion_rapida', 'Respiración rápida o agitada', 'respiracion', 2, ['hiperventilación', 'taquipnea', 'respiro rápido', 'agitado']],
    ['dolor_pecho_respirar', 'Dolor en el pecho al respirar hondo o toser', 'respiracion', 2, ['puntada al respirar', 'dolor pleurítico', 'puntada en el costado']],
    ['labios_azules', 'Labios o uñas azuladas', 'respiracion', 3, ['cianosis', 'labios morados', 'uñas moradas']],
    ['ardor_pecho', 'Ardor detrás del esternón (acidez)', 'respiracion', 1, ['acidez', 'agruras', 'pirosis', 'quemazón', 'ardor de estómago']],

    // ── Corazón y circulación
    ['dolor_pecho_opresivo', 'Dolor u opresión en el pecho (como un peso)', 'corazon', 3, ['dolor de pecho', 'dolor torácico', 'apretón en el pecho', 'presión en el pecho', 'puntada en el pecho', 'infarto']],
    ['dolor_irradiado', 'Dolor que se extiende al brazo, mandíbula, cuello o espalda', 'corazon', 3, ['dolor en el brazo izquierdo', 'dolor de mandíbula', 'dolor irradiado']],
    ['dolor_pecho_esfuerzo', 'Dolor de pecho al hacer esfuerzo, que cede en reposo', 'corazon', 2, ['angina', 'dolor al caminar', 'dolor al subir escaleras']],
    ['dolor_pecho_inclinado', 'Dolor de pecho que alivia al sentarte inclinado adelante', 'corazon', 2, ['pericarditis', 'mejora inclinado', 'empeora acostado']],
    ['palpitaciones', 'Palpitaciones o latidos rápidos/irregulares', 'corazon', 2, ['taquicardia', 'corazón acelerado', 'se me arranca el corazón', 'arritmia', 'latidos fuertes']],
    ['hinchazon_piernas', 'Hinchazón de ambas piernas o tobillos', 'corazon', 2, ['edema', 'pies hinchados', 'tobillos hinchados', 'retención de líquido']],
    ['pantorrilla', 'Una pantorrilla hinchada, dolorosa o caliente', 'corazon', 3, ['trombosis', 'pierna hinchada', 'dolor en la pantorrilla', 'flebitis']],
    ['ortopnea', 'Falta de aire al acostarte', 'corazon', 2, ['ortopnea', 'duermo sentado', 'necesito varias almohadas']],
    ['presion_alta', 'Presión arterial muy alta medida (180/120 o más)', 'corazon', 3, ['hipertensión', 'presión alta', 'crisis hipertensiva']],

    // ── Abdomen y digestión
    ['nauseas', 'Náuseas', 'digestivo', 1, ['asco', 'ganas de vomitar', 'estómago revuelto']],
    ['vomitos', 'Vómitos', 'digestivo', 1, ['vomitar', 'devolver', 'arcadas']],
    ['vomito_sangre', 'Vómito con sangre o como borra de café', 'digestivo', 3, ['hematemesis', 'sangre en el vómito']],
    ['diarrea', 'Diarrea', 'digestivo', 1, ['soltura', 'deposiciones líquidas', 'estómago suelto', 'evacuaciones líquidas']],
    ['diarrea_sangre', 'Diarrea con sangre o mucosidad', 'digestivo', 3, ['disentería', 'sangre en las deposiciones', 'sangre en las heces']],
    ['deposiciones_negras', 'Deposiciones negras como alquitrán', 'digestivo', 3, ['melena', 'heces negras', 'caca negra']],
    ['estrenimiento', 'Estreñimiento', 'digestivo', 1, ['constipación', 'no puedo ir al baño', 'estítico']],
    ['dolor_abdominal', 'Dolor de estómago o abdominal', 'digestivo', 1, ['dolor de guata', 'dolor de barriga', 'retorcijones', 'cólicos', 'dolor de estómago', 'guatita']],
    ['dolor_epigastrio', 'Dolor o ardor en la boca del estómago', 'digestivo', 1, ['epigastrio', 'gastritis', 'dolor en la boca del estómago']],
    ['dolor_fid', 'Dolor abajo a la derecha del abdomen', 'digestivo', 2, ['fosa ilíaca derecha', 'apéndice', 'dolor lado derecho abajo']],
    ['dolor_ombligo_migra', 'Dolor que empezó en el ombligo y bajó a la derecha', 'digestivo', 3, ['apendicitis', 'dolor migratorio']],
    ['dolor_hipocondrio', 'Dolor arriba a la derecha, bajo las costillas', 'digestivo', 2, ['vesícula', 'cólico biliar', 'hígado', 'dolor tras comida grasa']],
    ['dolor_cinturon', 'Dolor alto del abdomen que se va hacia la espalda', 'digestivo', 3, ['dolor en cinturón', 'páncreas', 'pancreatitis']],
    ['dolor_abdominal_intenso', 'Dolor abdominal súbito e intenso o abdomen duro', 'digestivo', 3, ['abdomen agudo', 'guata dura', 'abdomen en tabla']],
    ['hinchazon_abdominal', 'Hinchazón abdominal o gases', 'digestivo', 1, ['distensión', 'guata hinchada', 'gases', 'meteorismo', 'flatulencia']],
    ['regurgitacion', 'Regurgitación o sabor ácido en la boca', 'digestivo', 1, ['reflujo', 'sabor agrio', 'devolver la comida']],
    ['llenura', 'Sensación de llenura rápida o pesadez', 'digestivo', 1, ['saciedad precoz', 'pesadez', 'indigestión', 'dispepsia']],
    ['alivio_defecar', 'Dolor de guata que mejora al ir al baño', 'digestivo', 1, ['colon irritable', 'alivio al evacuar']],
    ['ictericia', 'Piel u ojos amarillos', 'digestivo', 2, ['ictericia', 'ojos amarillos', 'piel amarilla']],

    // ── Urinario y genital
    ['ardor_orinar', 'Ardor o dolor al orinar', 'urogenital', 1, ['me arde al hacer pipí', 'disuria', 'ardor al orinar', 'quema al orinar']],
    ['orinar_frecuente', 'Ganas frecuentes o urgentes de orinar', 'urogenital', 1, ['polaquiuria', 'orino a cada rato', 'urgencia urinaria', 'orinar mucho']],
    ['orina_turbia', 'Orina turbia o con mal olor', 'urogenital', 1, ['orina con olor', 'orina turbia']],
    ['sangre_orina', 'Sangre en la orina', 'urogenital', 2, ['hematuria', 'orina roja', 'orina con sangre']],
    ['orina_escasa', 'Orinar muy poco (orina escasa y concentrada)', 'urogenital', 2, ['oliguria', 'orina oscura', 'casi no orino']],
    ['dolor_costado', 'Dolor en un costado de la espalda (zona del riñón)', 'urogenital', 2, ['dolor de riñón', 'dolor lumbar lateral']],
    ['colico_renal', 'Dolor muy intenso en oleadas, del costado hacia la ingle', 'urogenital', 2, ['cólico renal', 'piedra en el riñón', 'cálculo']],
    ['dolor_pelvico', 'Dolor en la parte baja del abdomen o pelvis', 'urogenital', 1, ['dolor de ovarios', 'bajo vientre', 'dolor pélvico', 'hipogastrio']],
    ['atraso_menstrual', 'Atraso menstrual', 'mujer', 1, ['no me llega la regla', 'falta de regla', 'atraso', 'amenorrea'], 'F'],
    ['sangrado_vaginal', 'Sangrado vaginal fuera de la regla', 'mujer', 2, ['metrorragia', 'manchado', 'sangrado anormal'], 'F'],
    ['flujo_vaginal', 'Flujo vaginal anormal', 'mujer', 1, ['flujo', 'descarga vaginal', 'leucorrea'], 'F'],
    ['picazon_genital', 'Picazón o ardor genital', 'urogenital', 1, ['comezón genital', 'prurito vulvar', 'picazón vaginal']],
    ['dolor_menstrual', 'Dolor menstrual intenso', 'mujer', 1, ['cólicos menstruales', 'dismenorrea', 'dolor de regla'], 'F'],
    ['dolor_relaciones', 'Dolor en las relaciones sexuales', 'urogenital', 1, ['dispareunia', 'dolor al tener sexo']],
    ['sensibilidad_mamas', 'Pechos sensibles o hinchados', 'mujer', 1, ['mamas sensibles', 'dolor de pechos', 'senos sensibles'], 'F'],
    ['dolor_testicular', 'Dolor testicular súbito e intenso', 'urogenital', 3, ['dolor de testículo', 'torsión', 'escroto'], 'M'],

    // ── Piel
    ['ronchas', 'Ronchas que pican (habones)', 'piel', 1, ['urticaria', 'alergia en la piel', 'habones']],
    ['erupcion', 'Erupción o manchas en la piel', 'piel', 1, ['sarpullido', 'rash', 'granitos', 'exantema', 'manchas rojas']],
    ['ampollas_franja', 'Ampollas dolorosas en franja, en un solo lado', 'piel', 2, ['culebrilla', 'herpes', 'vesículas']],
    ['piel_roja_caliente', 'Zona de piel roja, caliente e hinchada que se extiende', 'piel', 2, ['celulitis', 'infección de piel', 'piel inflamada']],
    ['hinchazon_labios', 'Hinchazón de labios, lengua o garganta', 'piel', 3, ['angioedema', 'labios hinchados', 'garganta cerrada', 'lengua hinchada']],
    ['petequias', 'Manchas rojo-moradas que no se borran al presionar', 'piel', 3, ['petequias', 'púrpura', 'manchitas moradas']],
    ['piel_seca', 'Piel seca', 'piel', 1, ['piel áspera', 'resequedad']],
    ['picazon_piel', 'Picazón en la piel', 'piel', 1, ['prurito', 'comezón', 'picor']],
    ['caida_pelo', 'Caída del pelo', 'piel', 1, ['alopecia', 'se me cae el pelo']],
    ['piel_caliente_seca', 'Piel muy caliente tras exposición al calor', 'piel', 3, ['insolación', 'golpe de calor', 'piel ardiendo']],

    // ── Músculos y articulaciones
    ['dolor_lumbar', 'Dolor de espalda baja (lumbago)', 'musculo', 1, ['lumbago', 'dolor de cintura', 'dolor de espalda', 'lumbalgia']],
    ['ciatica', 'Dolor que baja por la pierna', 'musculo', 1, ['ciática', 'dolor de pierna', 'nervio ciático']],
    ['esfinteres', 'Pérdida de control de orina o deposiciones, o adormecimiento genital', 'musculo', 3, ['incontinencia', 'cauda equina']],
    ['articulacion_hinchada', 'Articulación hinchada, roja y muy dolorosa', 'musculo', 2, ['dedo gordo hinchado', 'artritis', 'rodilla hinchada', 'gota']],
    ['dolor_cuello', 'Tensión o dolor de cuello y hombros', 'musculo', 1, ['contractura', 'tortícolis', 'dolor de nuca']],
    ['calambres', 'Calambres musculares', 'musculo', 1, ['calambre', 'espasmos']],

    // ── Ánimo y emociones
    ['ansiedad', 'Nerviosismo o preocupación excesiva', 'mente', 1, ['angustia', 'ansiedad', 'estrés', 'inquietud', 'nervios']],
    ['miedo_intenso', 'Miedo intenso súbito o sensación de muerte inminente', 'mente', 2, ['pánico', 'ataque de pánico', 'crisis de angustia', 'terror', 'me voy a morir']],
    ['miedo_control', 'Miedo a perder el control o a volverte loco/a', 'mente', 1, ['perder el control', 'volverse loco']],
    ['irrealidad', 'Sensación de irrealidad o de estar fuera del cuerpo', 'mente', 1, ['despersonalización', 'desrealización', 'fuera de mí']],
    ['irritabilidad', 'Irritabilidad', 'mente', 1, ['mal genio', 'enojo', 'irritable']],
    ['tristeza', 'Tristeza persistente o sensación de vacío', 'mente', 2, ['depresión', 'bajón', 'pena', 'ganas de llorar', 'decaído']],
    ['anhedonia', 'Pérdida de interés o placer en las cosas', 'mente', 2, ['anhedonia', 'nada me motiva', 'sin ganas']],
    ['culpa', 'Sentimientos de culpa o inutilidad', 'mente', 2, ['inutilidad', 'desesperanza', 'no valgo']],
    ['insomnio', 'Dificultad para dormir', 'mente', 1, ['no puedo dormir', 'desvelo', 'despertar temprano', 'insomnio']],
    ['ideas_suicidas', 'Pensamientos de muerte o de hacerte daño', 'mente', 3, ['suicidio', 'quiero morir', 'hacerme daño', 'autolesión', 'no quiero vivir']],

    // ── Contexto y exposiciones
    ['ctx_contagio', 'Contacto reciente con alguien enfermo (resfrío, gripe, varicela…)', 'contexto', 0, ['contagio', 'familiar enfermo', 'compañero enfermo']],
    ['ctx_comida', 'Comida sospechosa en las últimas horas', 'contexto', 0, ['mariscos', 'comida en mal estado', 'intoxicación']],
    ['ctx_brasero', 'Brasero, estufa, calefón o motor encendido en lugar cerrado', 'contexto', 0, ['monóxido', 'gas', 'calefactor', 'parafina', 'leña', 'estufa']],
    ['ctx_convivientes', 'Otras personas o mascotas de la casa con síntomas parecidos', 'contexto', 0, ['familia enferma', 'todos en la casa']],
    ['ctx_roedores', 'Contacto con ratones o limpieza de lugar cerrado en zona rural', 'contexto', 0, ['ratones', 'hanta', 'bodega', 'cabaña', 'campo', 'camping']],
    ['ctx_inmovil', 'Viaje largo, cirugía reciente o reposo prolongado', 'contexto', 0, ['avión', 'postrado', 'cirugía', 'inmovilización', 'anticonceptivos']],
    ['ctx_calor', 'Exposición prolongada al sol o calor intenso', 'contexto', 0, ['sol', 'ola de calor', 'ejercicio con calor']],
    ['ctx_alergeno', 'Exposición a algo que te da alergia (alimento, remedio, picadura)', 'contexto', 0, ['picadura de abeja', 'maní', 'penicilina', 'alergia']],
    ['ctx_golpe', 'Golpe reciente en la cabeza', 'contexto', 0, ['traumatismo', 'caída', 'TEC', 'golpe']],
    ['ctx_diabetes', 'Tengo diabetes o uso insulina', 'contexto', 0, ['insulina', 'diabético', 'diabética', 'glicemia']],
    ['ctx_estres', 'Período de mucho estrés', 'contexto', 0, ['estrés', 'presión', 'agobio']],
    ['ctx_antiinflam', 'Uso frecuente de antiinflamatorios (ibuprofeno, aspirina)', 'contexto', 0, ['ibuprofeno', 'aspirina', 'ketoprofeno', 'diclofenaco', 'naproxeno']],
    // ── Ampliación (noviembre 2026) ─────────────────────────────
    // General
    ['sudor_nocturno', 'Sudoración nocturna que empapa la ropa', 'general', 2, ['sudores nocturnos', 'transpiro de noche', 'sudor de noche']],
    ['hinchazon_cara_manos', 'Hinchazón de cara o manos', 'general', 2, ['cara hinchada', 'manos hinchadas', 'edema facial']],
    // Cabeza y nervios
    ['mareo_al_pararse', 'Mareo al ponerte de pie', 'cabeza', 1, ['me mareo al pararme', 'se me nubla la vista al pararme', 'baja de presión']],
    ['prodromo_desmayo', 'Calor, náuseas y visión borrosa justo antes de desmayarte', 'cabeza', 1, ['casi me desmayo', 'me voy a desmayar', 'sensación de desvanecimiento']],
    ['dolor_cabeza_despertar', 'Dolor de cabeza al despertar', 'cabeza', 1, ['cefalea matinal', 'despierto con dolor de cabeza']],
    ['dolor_ojo_racimo', 'Dolor muy intenso alrededor de un ojo, con lagrimeo del mismo lado', 'cabeza', 2, ['cefalea en racimos', 'dolor detrás del ojo', 'dolor en la sien']],
    ['paralisis_facial', 'Un lado de la cara paralizado, incluida la frente (no cierras el ojo)', 'cabeza', 2, ['parálisis de Bell', 'no puedo cerrar el ojo', 'no puedo arrugar la frente']],
    ['hormigueo_mano', 'Hormigueo o adormecimiento en los dedos de la mano, peor de noche', 'cabeza', 1, ['túnel carpiano', 'mano dormida', 'dedos dormidos']],
    // Ojos
    ['dolor_ojo', 'Dolor intenso en un ojo', 'ojos', 3, ['me duele el ojo', 'dolor ocular']],
    ['halos', 'Ver halos o arcoíris alrededor de las luces', 'ojos', 2, ['halos', 'arcoíris en las luces']],
    ['moscas_destellos', 'Manchas flotantes nuevas o destellos de luz', 'ojos', 2, ['moscas volantes', 'puntos negros flotantes', 'destellos', 'flashes']],
    ['cortina_vision', 'Sombra o cortina que tapa parte de la visión', 'ojos', 3, ['cortina', 'sombra en la vista', 'telón en la vista']],
    ['bulto_parpado', 'Bulto rojo y doloroso en el borde del párpado', 'ojos', 1, ['orzuelo', 'chalazión', 'grano en el párpado']],
    ['lagrimeo', 'Lagrimeo', 'ojos', 1, ['ojos llorosos', 'me lloran los ojos']],
    // Oídos, nariz, boca y garganta
    ['dolor_tocar_oreja', 'Dolor al tocar o tirar la oreja', 'oong', 1, ['me duele la oreja', 'oreja sensible']],
    ['picazon_oido', 'Picazón dentro del oído', 'oong', 1, ['me pica el oído']],
    ['zumbido', 'Zumbido o pitido en el oído', 'oong', 1, ['tinnitus', 'acúfenos', 'pito en el oído']],
    ['sordera_subita', 'Pérdida súbita de audición en un oído', 'oong', 3, ['sordera súbita', 'dejé de escuchar', 'perdí la audición']],
    ['dolor_muela', 'Dolor de muela o diente', 'oong', 1, ['dolor de diente', 'muela', 'caries', 'dolor dental']],
    ['hinchazon_encia', 'Encía o cara hinchada junto a un diente', 'oong', 2, ['flemón', 'encía inflamada', 'absceso dental', 'cara hinchada por una muela']],
    ['llagas_boca', 'Llagas dolorosas dentro de la boca', 'oong', 1, ['aftas', 'úlceras en la boca', 'heridas en la boca']],
    ['ampollas_labio', 'Ampollitas en el borde del labio («fuego»)', 'oong', 1, ['fuego', 'fuego en el labio', 'herpes labial', 'vesículas en el labio']],
    // Pecho y respiración
    ['tos_perruna', 'Tos ronca, como ladrido de perro', 'respiracion', 2, ['tos de perro', 'tos de foca', 'tos perruna', 'crup']],
    ['estridor', 'Ruido agudo al tomar aire (estridor)', 'respiracion', 3, ['silbido al inspirar', 'estridor', 'ruido al respirar']],
    ['tos_accesos', 'Accesos de tos seguidos que terminan en «gallito» o vómito', 'respiracion', 2, ['tos convulsiva', 'coqueluche', 'tos ferina', 'gallito']],
    ['tos_prolongada', 'Tos que dura más de 2 a 3 semanas', 'respiracion', 2, ['tos crónica', 'tos que no se quita', 'tos persistente']],
    ['dolor_pecho_subito_lado', 'Dolor punzante súbito en un lado del pecho, con falta de aire', 'respiracion', 3, ['neumotórax', 'pulmón colapsado', 'puntada súbita en el pecho']],
    // Corazón y circulación
    ['piernas_pesadas', 'Piernas pesadas o cansadas al final del día', 'corazon', 1, ['pesadez de piernas', 'piernas cansadas']],
    ['varices', 'Venas hinchadas y retorcidas en las piernas', 'corazon', 1, ['várices', 'venas varicosas', 'arañitas vasculares']],
    // Abdomen y digestión
    ['sangre_roja_defecar', 'Sangre roja fresca en el papel o la taza al ir al baño', 'digestivo', 2, ['sangrado al defecar', 'sangre en el papel', 'sangre roja en las deposiciones']],
    ['dolor_anal', 'Dolor en el ano al ir al baño', 'digestivo', 1, ['dolor al defecar', 'ano adolorido']],
    ['bulto_anal', 'Bulto o hinchazón en el ano', 'digestivo', 1, ['almorranas', 'hemorroides']],
    ['picazon_anal', 'Picazón en el ano, sobre todo de noche', 'digestivo', 1, ['pidulles', 'oxiuros', 'comezón anal']],
    ['dolor_fii', 'Dolor abajo a la izquierda del abdomen', 'digestivo', 2, ['fosa ilíaca izquierda', 'dolor lado izquierdo abajo', 'divertículos']],
    ['bulto_ingle', 'Bulto en la ingle que aumenta al toser o hacer fuerza', 'digestivo', 1, ['hernia', 'bulto en la ingle']],
    ['acolia', 'Deposiciones muy claras (color masilla)', 'digestivo', 2, ['heces blancas', 'deposiciones pálidas', 'acolia']],
    // Urinario y genital
    ['coluria', 'Orina color té o bebida cola', 'urogenital', 2, ['orina café', 'orina oscura como bebida cola', 'coluria']],
    ['chorro_debil', 'Chorro débil, goteo o sensación de no vaciar la vejiga', 'urogenital', 1, ['próstata', 'goteo', 'me cuesta orinar', 'chorro débil'], 'M'],
    ['nicturia', 'Levantarte varias veces en la noche a orinar', 'urogenital', 1, ['nicturia', 'orinar de noche']],
    ['secrecion_uretral', 'Secreción por la punta del pene', 'urogenital', 2, ['pus en el pene', 'gota matinal', 'secreción uretral'], 'M'],
    ['ulcera_genital', 'Llaga o herida en los genitales que no duele', 'urogenital', 2, ['chancro', 'úlcera genital', 'herida genital']],
    ['ampollas_genitales', 'Ampollas o llagas dolorosas en los genitales', 'urogenital', 2, ['herpes genital', 'vesículas genitales']],
    ['dolor_testicular_gradual', 'Dolor e hinchazón de un testículo que fue aumentando', 'urogenital', 2, ['testículo inflamado', 'epididimitis'], 'M'],
    // Menstruación, mamas y embarazo
    ['flujo_mal_olor', 'Flujo vaginal con mal olor (a pescado)', 'mujer', 1, ['olor vaginal', 'flujo con olor'], 'F'],
    ['bochornos', 'Bochornos (oleadas de calor) o sudores nocturnos', 'mujer', 1, ['sofocos', 'calores', 'oleadas de calor'], 'F'],
    ['reglas_irregulares', 'Reglas irregulares o cada vez más espaciadas', 'mujer', 1, ['menstruación irregular', 'regla irregular'], 'F'],
    ['mama_roja', 'Pecho rojo, caliente y doloroso', 'mujer', 2, ['mastitis', 'mama inflamada', 'pecho inflamado'], 'F'],
    ['ctx_premenstrual', 'Los síntomas aparecen en los días antes de la regla', 'mujer', 0, ['antes de la regla', 'premenstrual'], 'F'],
    ['ctx_lactancia', 'Estás amamantando', 'mujer', 0, ['lactancia', 'dar pecho', 'amamantar'], 'F'],
    ['ctx_embarazo20', 'Embarazo de más de 20 semanas o parto hace menos de 6 semanas', 'mujer', 0, ['embarazada', 'posparto', 'puerperio'], 'F'],
    // Piel
    ['placas_escamas', 'Placas rojas con escamas blanquecinas (codos, rodillas, cuero cabelludo)', 'piel', 1, ['psoriasis', 'escamas', 'descamación']],
    ['eccema', 'Piel roja, seca y áspera que pica, en pliegues', 'piel', 1, ['eccema', 'eczema', 'dermatitis', 'piel irritada']],
    ['picazon_nocturna', 'Picazón intensa que empeora en la noche', 'piel', 1, ['me pica todo de noche', 'sarna', 'escabiosis']],
    ['surcos_dedos', 'Granitos o líneas finas entre los dedos o en las muñecas', 'piel', 1, ['surcos', 'granitos entre los dedos']],
    ['ampollas_cuerpo', 'Ampollitas que pican por todo el cuerpo, en distintas etapas', 'piel', 2, ['varicela', 'peste cristal']],
    ['pie_atleta', 'Picazón y piel agrietada entre los dedos de los pies', 'piel', 1, ['pie de atleta', 'hongos en los pies', 'tiña']],
    ['bulto_pus', 'Bulto rojo, caliente y doloroso con pus', 'piel', 1, ['forúnculo', 'absceso', 'grano infectado', 'espinilla infectada']],
    ['lesion_violacea', 'Lesión dolorosa que se pone violácea u oscura tras una picadura', 'piel', 3, ['araña de rincón', 'loxosceles', 'mancha morada', 'placa livedoide']],
    ['piel_roja_sol', 'Piel roja, caliente y dolorosa después del sol', 'piel', 1, ['quemadura de sol', 'quemado por el sol', 'insolación leve']],
    // Músculos y articulaciones
    ['hinchazon_moreton', 'Hinchazón y moretón tras una torcedura o golpe', 'musculo', 1, ['moretón', 'esguince', 'torcedura', 'tobillo hinchado']],
    ['no_apoyar', 'No puedes apoyar o mover la extremidad', 'musculo', 2, ['no puedo pisar', 'no puedo mover el brazo', 'no puedo caminar']],
    ['deformidad', 'Extremidad deformada o hueso visible', 'musculo', 3, ['fractura expuesta', 'hueso torcido', 'deformidad']],
    ['dolor_hombro', 'Dolor de hombro al levantar el brazo', 'musculo', 1, ['hombro', 'manguito rotador', 'tendinitis']],
    ['rigidez_matinal', 'Rigidez de articulaciones en la mañana por más de 30 minutos', 'musculo', 1, ['rigidez matinal', 'articulaciones tiesas']],
    ['articulaciones_manos', 'Dolor e hinchazón en articulaciones de ambas manos o muñecas', 'musculo', 2, ['dedos hinchados', 'nudillos inflamados']],
    ['dolor_rodilla_cadera', 'Dolor de rodillas o caderas que empeora al caminar', 'musculo', 1, ['artrosis', 'desgaste', 'dolor de rodilla', 'dolor de cadera']],
    ['dolor_generalizado', 'Dolor en muchas partes del cuerpo durante meses', 'musculo', 1, ['fibromialgia', 'me duele todo siempre']],
    ['dolor_talon', 'Dolor en el talón al dar los primeros pasos', 'musculo', 1, ['talón', 'fascitis plantar', 'espolón']],
    // Ánimo, emociones y sueño
    ['euforia', 'Ánimo eufórico o muy irritable, distinto a lo habitual', 'mente', 2, ['manía', 'acelerado', 'eufórico']],
    ['menos_sueno', 'Duermes muy poco y no te sientes cansado/a', 'mente', 2, ['no necesito dormir', 'duermo muy poco']],
    ['impulsividad', 'Gastos, decisiones o conductas impulsivas o riesgosas', 'mente', 2, ['impulsivo', 'gastar mucho', 'conductas de riesgo']],
    ['pensamiento_acelerado', 'Pensamientos acelerados o hablar muy rápido', 'mente', 1, ['mente acelerada', 'hablo rápido', 'verborrea']],
    ['recuerdos_intrusivos', 'Recuerdos, pesadillas o flashbacks de un evento traumático', 'mente', 2, ['flashbacks', 'pesadillas', 'trauma']],
    ['hipervigilancia', 'Siempre en alerta o te sobresaltas con facilidad', 'mente', 1, ['sobresalto', 'alerta constante', 'hipervigilancia']],
    ['agotamiento_trabajo', 'Agotamiento, cinismo o desgano con el trabajo o los estudios', 'mente', 1, ['burnout', 'quemado', 'desgaste laboral']],
    ['ronquidos', 'Ronquidos fuertes', 'mente', 1, ['roncar', 'ronco fuerte']],
    ['pausas_respiratorias', 'Pausas en la respiración mientras duermes (te lo han dicho)', 'mente', 2, ['apnea', 'dejo de respirar durmiendo']],
    ['somnolencia_diurna', 'Sueño excesivo durante el día', 'mente', 1, ['me quedo dormido de día', 'cabeceo', 'somnolencia diurna']],
    // Contexto y exposiciones
    ['ctx_fumador', 'Fumas o fumaste por muchos años', 'contexto', 0, ['cigarro', 'tabaco', 'fumador', 'fumadora']],
    ['ctx_alcohol', 'Consumo frecuente o abundante de alcohol', 'contexto', 0, ['alcohol', 'copete', 'tomar mucho']],
    ['ctx_lacteos', 'Los síntomas aparecen después de comer lácteos', 'contexto', 0, ['leche', 'queso', 'lactosa']],
    ['ctx_mariscos', 'Comiste mariscos (choritos, almejas, machas, cholgas) hace pocas horas', 'contexto', 0, ['marea roja', 'choritos', 'almejas', 'machas', 'cholgas']],
    ['ctx_sexo', 'Relaciones sexuales sin condón o con una pareja nueva', 'contexto', 0, ['ITS', 'sin preservativo', 'sexo sin protección']],
    ['ctx_trauma', 'Viviste o presenciaste un evento traumático', 'contexto', 0, ['accidente', 'asalto', 'abuso', 'violencia']],
    ['ctx_arana', 'Te picó o crees que te picó una araña de rincón', 'contexto', 0, ['araña', 'picadura de araña', 'loxosceles']],
    ['ctx_torcedura', 'Torcedura, caída o golpe reciente en un brazo o pierna', 'contexto', 0, ['caída', 'me torcí el tobillo', 'golpe en la pierna']],
    ['ctx_irritante', 'Contacto reciente con un producto, metal, crema o planta nuevos', 'contexto', 0, ['detergente', 'níquel', 'cosmético', 'alergia de contacto']],
    ['ctx_agua', 'Te bañaste en piscina, mar o lago hace poco', 'contexto', 0, ['piscina', 'natación', 'bañarse']],
    ['ctx_vasovagal', 'Ocurrió al ver sangre, con dolor intenso o tras mucho rato de pie', 'contexto', 0, ['ver sangre', 'vacuna', 'mucho rato parado']],
    ['ctx_manos', 'Trabajo con movimientos repetitivos de manos (teclado, herramientas)', 'contexto', 0, ['teclado', 'herramientas', 'movimientos repetitivos']],
    // ── Segunda ampliación (noviembre 2026): OMS, OPS, MINSAL y clínicas chilenas ──
    // General
    ['escalofrios_ciclicos', 'Fiebre con escalofríos intensos que va y viene cada 1 a 3 días', 'general', 2, ['fiebre intermitente', 'malaria', 'paludismo']],
    ['sangrado_encias', 'Sangrado de encías o moretones sin haberte golpeado', 'general', 3, ['encías sangran', 'moretones espontáneos', 'petequias', 'hemorragia']],
    ['temblor_frio', 'Temblor intenso por frío, con piel fría y pálida', 'general', 2, ['tiritar de frío', 'congelado', 'hipotermia']],
    ['salivacion', 'Salivación, lagrimeo y sudoración excesivos', 'general', 2, ['babeo', 'mucha saliva', 'plaguicidas']],
    // Cabeza y nervios
    ['dolor_retroocular', 'Dolor detrás de los ojos', 'cabeza', 1, ['dolor retroocular', 'me duelen los ojos por dentro', 'dengue']],
    ['temblor_reposo', 'Temblor en reposo (por ejemplo, de una mano) y movimientos lentos', 'cabeza', 1, ['parkinson', 'temblor al estar quieto', 'lentitud']],
    ['olvidos_progresivos', 'Olvidos cada vez más frecuentes o desorientación en lugares conocidos', 'cabeza', 2, ['alzheimer', 'demencia', 'pérdida de memoria', 'se pierde']],
    ['debilidad_ascendente', 'Debilidad u hormigueo que sube desde los pies en horas o días', 'cabeza', 3, ['guillain barré', 'parálisis que sube', 'piernas débiles']],
    ['dolor_facial_electrico', 'Dolor facial breve e intensísimo, como descarga eléctrica', 'cabeza', 1, ['neuralgia del trigémino', 'corrientazo en la cara', 'dolor de cara eléctrico']],
    // Ojos
    ['vision_dolor_un_ojo', 'Visión borrosa de un ojo, con dolor al moverlo', 'ojos', 2, ['neuritis óptica', 'dolor al mover el ojo']],
    ['arena_ojos', 'Sensación de arena, ardor o sequedad en los ojos', 'ojos', 1, ['ojo seco', 'ojos secos', 'arenilla en los ojos']],
    ['vision_nublada_progresiva', 'Visión nublada que empeora lentamente y encandilamiento con las luces', 'ojos', 1, ['cataratas', 'veo nublado', 'encandilamiento']],
    ['vision_cerca', 'Dificultad para ver de cerca o leer letra pequeña', 'ojos', 1, ['presbicia', 'vista cansada', 'no veo de cerca']],
    // Corazón y circulación
    ['presion_alta_cronica', 'Presión alta en controles (140/90 o más)', 'corazon', 2, ['hipertensión', 'hipertenso', 'presión elevada']],
    ['palpitaciones_subitas', 'Latidos muy rápidos que empiezan y terminan de golpe', 'corazon', 2, ['taquicardia súbita', 'taquicardia paroxística', 'corazón muy rápido de repente']],
    ['dolor_desgarrador', 'Dolor súbito y desgarrador en el pecho o la espalda', 'corazon', 3, ['disección aórtica', 'dolor como un desgarro', 'dolor de espalda súbito']],
    ['claudicacion', 'Dolor en las pantorrillas al caminar que se alivia al detenerte', 'corazon', 1, ['claudicación', 'calambre al caminar', 'mala circulación']],
    // Abdomen y digestión
    ['disfagia', 'Dificultad o dolor para tragar los alimentos', 'digestivo', 2, ['disfagia', 'se me atora la comida', 'me cuesta tragar']],
    ['cambio_habito', 'Cambio persistente del hábito intestinal (por semanas)', 'digestivo', 2, ['cambio en las deposiciones', 'diarrea y estreñimiento alternados']],
    ['no_elimina_gases', 'No puedes eliminar gases ni hacer deposiciones, con la guata muy hinchada', 'digestivo', 3, ['obstrucción intestinal', 'íleo', 'guata hinchada y no evacúo']],
    // Urinario y genital
    ['bulto_testiculo', 'Bulto o endurecimiento indoloro en un testículo', 'urogenital', 2, ['bolita en el testículo', 'testículo duro', 'masa testicular'], 'M'],
    ['orina_espumosa', 'Orina con mucha espuma', 'urogenital', 1, ['espuma en la orina', 'proteinuria']],
    ['perdida_orina', 'Pérdidas de orina al toser, reír o por urgencia', 'urogenital', 1, ['incontinencia', 'se me escapa la orina', 'pérdida de orina']],
    ['no_puede_orinar', 'No puedes orinar aunque tengas muchas ganas', 'urogenital', 3, ['retención urinaria', 'no puedo hacer pipí', 'vejiga llena']],
    ['dolor_perineal', 'Dolor entre el escroto y el ano (periné)', 'urogenital', 2, ['dolor perineal', 'próstata inflamada'], 'M'],
    // Regla, mamas y embarazo
    ['bulto_mama', 'Bulto en la mama o la axila, o cambios en la piel o el pezón', 'mujer', 2, ['bolita en la mama', 'nódulo mamario', 'pezón retraído', 'cáncer de mama'], 'F'],
    ['sangrado_postcoital', 'Sangrado vaginal después de las relaciones sexuales', 'mujer', 2, ['sangrado después del sexo', 'sinusorragia'], 'F'],
    ['reglas_abundantes', 'Reglas muy abundantes o prolongadas', 'mujer', 2, ['regla abundante', 'menorragia', 'coágulos en la regla'], 'F'],
    ['vello_excesivo', 'Exceso de vello en cara, pecho o abdomen', 'mujer', 1, ['hirsutismo', 'vello en la cara', 'bigote'], 'F'],
    ['vomitos_embarazo', 'Vómitos intensos y persistentes durante el embarazo', 'mujer', 2, ['hiperémesis', 'no retengo nada embarazada'], 'F'],
    // Piel
    ['erupcion_cara_desciende', 'Manchas rojas que empiezan en la cara y bajan al cuerpo', 'piel', 2, ['sarampión', 'exantema', 'manchas en la cara']],
    ['lesiones_mpox', 'Lesiones que pasan de mancha a ampolla con pus y costra (genitales, cara, manos)', 'piel', 2, ['mpox', 'viruela del mono', 'viruela símica', 'pústulas']],
    ['lesiones_manos_pies', 'Ampollitas o manchas en palmas de las manos y plantas de los pies', 'piel', 1, ['mano pie boca', 'manchas en las palmas']],
    ['costras_miel', 'Costras color miel alrededor de la nariz o la boca', 'piel', 1, ['impétigo', 'costras amarillas', 'heridas con costra']],
    ['piel_quemada', 'Piel quemada: roja, con ampollas o blanquecina', 'piel', 2, ['quemadura', 'me quemé', 'ampolla por quemadura']],
    ['lunar_cambia', 'Lunar nuevo o que cambia de tamaño, forma o color', 'piel', 2, ['lunar', 'melanoma', 'mancha que crece', 'peca rara']],
    ['acne', 'Acné o piel grasa', 'piel', 1, ['espinillas', 'granos', 'puntos negros']],
    ['rash_mariposa', 'Manchas rojas en mejillas y nariz (en forma de mariposa) que empeoran con el sol', 'piel', 1, ['lupus', 'eritema malar', 'alas de mariposa']],
    // Músculos, huesos y articulaciones
    ['dolor_articular', 'Dolor en varias articulaciones', 'musculo', 1, ['artralgia', 'me duelen las articulaciones', 'dolor de coyunturas']],
    ['piernas_inquietas', 'Necesidad de mover las piernas al acostarte, con molestias que alivian al moverlas', 'musculo', 1, ['piernas inquietas', 'no puedo dejar quietas las piernas']],
    ['debilidad_pierna', 'Hormigueo, adormecimiento o debilidad en una pierna o pie', 'musculo', 2, ['pierna dormida', 'pie dormido', 'hernia de disco']],
    ['dolor_codo', 'Dolor en la parte externa del codo al agarrar o girar', 'musculo', 1, ['codo de tenista', 'epicondilitis', 'dolor de codo']],
    // Ánimo, emociones y sueño
    ['obsesiones', 'Pensamientos repetitivos indeseados y rituales que no puedes evitar (lavar, revisar, ordenar)', 'mente', 1, ['TOC', 'obsesión', 'compulsión', 'manías']],
    ['inatencion', 'Desde la niñez te cuesta concentrarte, organizarte y te distraes fácilmente', 'mente', 1, ['TDAH', 'déficit atencional', 'distraído']],
    ['conducta_alimentaria', 'Miedo intenso a engordar, dietas extremas, atracones o vómitos provocados', 'mente', 2, ['anorexia', 'bulimia', 'atracones', 'trastorno alimentario']],
    ['control_consumo', 'No logras controlar tu consumo de alcohol u otras drogas', 'mente', 2, ['adicción', 'alcoholismo', 'drogas', 'dependencia']],
    // Contexto y exposiciones
    ['ctx_viaje_tropical', 'Viaje reciente al extranjero, sobre todo a zonas tropicales o Rapa Nui', 'contexto', 0, ['viaje', 'Brasil', 'Caribe', 'África', 'Isla de Pascua', 'mosquitos']],
    ['ctx_mordedura', 'Mordedura o rasguño de un animal (perro, gato, murciélago)', 'contexto', 0, ['mordedura de perro', 'murciélago', 'rabia', 'arañazo de gato']],
    ['ctx_vinchuca', 'Viviste en zonas rurales con vinchucas o tu madre tuvo Chagas', 'contexto', 0, ['vinchuca', 'chagas', 'campo del norte']],
    ['ctx_altura', 'Subiste hace poco a más de 2.500 metros de altura (altiplano, faenas mineras)', 'contexto', 0, ['puna', 'altiplano', 'altura', 'minería', 'soroche']],
    ['ctx_frio', 'Exposición prolongada al frío, al agua fría o con ropa mojada', 'contexto', 0, ['frío', 'nieve', 'agua helada', 'temporal']],
    ['ctx_plaguicidas', 'Contacto reciente con plaguicidas (fumigación, trabajo agrícola)', 'contexto', 0, ['plaguicidas', 'pesticidas', 'fumigación', 'insecticida']],
    ['ctx_alcohol_agudo', 'Tomaste mucho alcohol en las últimas horas', 'contexto', 0, ['borrachera', 'curado', 'curadera', 'mucho copete']],
    ['ctx_quemadura', 'Quemadura con agua o aceite caliente, fuego, electricidad o químicos', 'contexto', 0, ['quemadura', 'agua hirviendo', 'aceite caliente']]
  ];

  // Síntomas de alarma que justifican llamar al 131 (el resto de los rosados: ir a urgencia de inmediato)
  const CALL_131 = new Set(['desmayo', 'convulsion', 'debilidad_lado', 'cara_caida', 'habla', 'vision_subita', 'rigidez_cuello',
    'confusion', 'perdida_equilibrio', 'dolor_cabeza_subito', 'ahogo_severo', 'labios_azules', 'dolor_pecho_opresivo',
    'dolor_irradiado', 'presion_alta', 'vomito_sangre', 'hinchazon_labios', 'petequias', 'piel_caliente_seca', 'ideas_suicidas', 'tos_sangre',
    'estridor', 'dolor_pecho_subito_lado', 'dolor_desgarrador', 'debilidad_ascendente']);

  const SYMPTOMS = RAW_SYMPTOMS.map(([id, n, z, sev, syn, sx]) => ({
    id, n, z, sev, syn: syn || [], sx: sx || null,
    em: sev === 3 ? (CALL_131.has(id) ? 5 : 4) : 0
  }));

  // ── Fuentes verificadas
  const MP = 'MedlinePlus (NIH)';
  const MAYO = 'Mayo Clinic';
  const MINSAL = 'MINSAL Chile';
  const SUP = 'Superintendencia de Salud';
  const ISP = 'ISP Chile';
  const OMS = 'OMS (ONU)';
  const OPS = 'OPS/OMS';
  const SENDA = 'SENDA';
  const CLC = 'Clínica Las Condes';
  const CA = 'Clínica Alemana';
  const UCC = 'UC Christus';
  const REDSALUD = 'RedSalud';
  const SOURCES = {
    mp_resfrio: [MP, 'Resfriado común', 'https://medlineplus.gov/spanish/ency/article/000678.htm'],
    mp_resfrio_t: [MP, 'Resfrío', 'https://medlineplus.gov/spanish/commoncold.html'],
    mp_gripe: [MP, 'Gripe', 'https://medlineplus.gov/spanish/ency/article/000080.htm'],
    mp_gripe_t: [MP, 'Gripe (tema de salud)', 'https://medlineplus.gov/spanish/flu.html'],
    mp_faringitis: [MP, 'Faringitis y dolor de garganta', 'https://medlineplus.gov/spanish/ency/article/000655.htm'],
    mp_strep: [MP, 'Amigdalitis estreptocócica', 'https://medlineplus.gov/spanish/ency/article/000639.htm'],
    mayo_covid: [MAYO, 'COVID-19: síntomas y causas', 'https://www.mayoclinic.org/es/diseases-conditions/coronavirus/symptoms-causes/syc-20479963'],
    mayo_covid_dif: [MAYO, 'COVID-19, resfriado, alergias y gripe: diferencias', 'https://www.mayoclinic.org/es/diseases-conditions/coronavirus/in-depth/covid-19-cold-flu-and-allergies-differences/art-20503981'],
    mayo_sinusitis: [MAYO, 'Sinusitis aguda', 'https://www.mayoclinic.org/es/diseases-conditions/acute-sinusitis/symptoms-causes/syc-20351671'],
    mayo_otitis: [MAYO, 'Infección del oído medio', 'https://www.mayoclinic.org/es/diseases-conditions/ear-infections/symptoms-causes/syc-20351616'],
    mayo_rinitis: [MAYO, 'Rinitis alérgica (fiebre del heno)', 'https://www.mayoclinic.org/es/diseases-conditions/hay-fever/symptoms-causes/syc-20373039'],
    mp_conjuntivitis: [MP, 'Conjuntivitis u ojo rosado', 'https://medlineplus.gov/spanish/ency/article/001010.htm'],
    mp_conj_alergica: [MP, 'Conjuntivitis alérgica', 'https://medlineplus.gov/spanish/ency/article/001031.htm'],
    mp_bronquitis: [MP, 'Bronquitis aguda', 'https://medlineplus.gov/spanish/ency/article/001087.htm'],
    mp_neumonia: [MP, 'Neumonía en adultos adquirida en la comunidad', 'https://medlineplus.gov/spanish/ency/article/000145.htm'],
    mp_neumonia_t: [MP, 'Neumonía (tema de salud)', 'https://medlineplus.gov/spanish/pneumonia.html'],
    mp_disnea: [MP, 'Dificultad respiratoria', 'https://medlineplus.gov/spanish/ency/article/003075.htm'],
    mp_asma: [MP, 'Asma (tema de salud)', 'https://medlineplus.gov/spanish/asthma.html'],
    mp_embolia: [MP, 'Embolia pulmonar', 'https://medlineplus.gov/spanish/pulmonaryembolism.html'],
    mp_dolor_toracico: [MP, 'Dolor torácico', 'https://medlineplus.gov/spanish/ency/article/003079.htm'],
    mp_infarto: [MP, 'Ataque cardíaco', 'https://medlineplus.gov/spanish/ency/article/000195.htm'],
    mp_signos_cardio: [MP, 'Signos de advertencia de enfermedad cardíaca', 'https://medlineplus.gov/spanish/ency/patientinstructions/000775.htm'],
    mp_angina: [MP, 'Angina estable', 'https://medlineplus.gov/spanish/ency/article/000198.htm'],
    mp_angina_inestable: [MP, 'Angina inestable', 'https://medlineplus.gov/spanish/ency/article/000201.htm'],
    mayo_pericarditis: [MAYO, 'Pericarditis (en inglés)', 'https://www.mayoclinic.org/diseases-conditions/pericarditis/symptoms-causes/syc-20352510'],
    mp_fa: [MP, 'Fibrilación y aleteo auricular', 'https://medlineplus.gov/spanish/ency/article/000184.htm'],
    mayo_ic: [MAYO, 'Insuficiencia cardíaca: diagnóstico y tratamiento', 'https://www.mayoclinic.org/es/diseases-conditions/heart-failure/diagnosis-treatment/drc-20373148'],
    mp_ic: [MP, 'Insuficiencia cardíaca (tema de salud)', 'https://medlineplus.gov/spanish/heartfailure.html'],
    mp_hta: [MP, 'Presión arterial alta en adultos', 'https://medlineplus.gov/spanish/ency/article/000468.htm'],
    mp_hta_maligna: [MP, 'Hipertensión maligna', 'https://medlineplus.gov/spanish/ency/article/000491.htm'],
    mp_acv: [MP, 'Accidente cerebrovascular', 'https://medlineplus.gov/spanish/ency/article/000726.htm'],
    mp_migrana: [MP, 'Migraña', 'https://medlineplus.gov/spanish/ency/article/000709.htm'],
    mp_cefalea_peligro: [MP, 'Signos de peligro con los dolores de cabeza', 'https://medlineplus.gov/spanish/ency/patientinstructions/000424.htm'],
    mp_cefalea: [MP, 'Dolor de cabeza (tema de salud)', 'https://medlineplus.gov/spanish/headache.html'],
    mp_meningitis: [MP, 'Meningitis', 'https://medlineplus.gov/spanish/meningitis.html'],
    mp_vppb: [MP, 'Vértigo postural benigno', 'https://medlineplus.gov/spanish/ency/article/001420.htm'],
    mp_vertigo: [MP, 'Trastornos asociados con el vértigo', 'https://medlineplus.gov/spanish/ency/article/001432.htm'],
    mp_conmocion: [MP, 'Conmoción cerebral', 'https://medlineplus.gov/spanish/concussion.html'],
    mp_panico: [MP, 'Trastorno de pánico', 'https://medlineplus.gov/spanish/ency/article/000924.htm'],
    mp_panico_t: [MP, 'Trastorno de pánico (tema de salud)', 'https://medlineplus.gov/spanish/panicdisorder.html'],
    mp_ansiedad: [MP, 'Ansiedad', 'https://medlineplus.gov/spanish/anxiety.html'],
    mp_estres: [MP, 'El estrés y su salud', 'https://medlineplus.gov/spanish/ency/article/003211.htm'],
    mp_depresion: [MP, 'Depresión', 'https://medlineplus.gov/spanish/ency/article/003213.htm'],
    mp_insomnio: [MP, 'Insomnio', 'https://medlineplus.gov/spanish/ency/article/000805.htm'],
    mp_gastroenteritis: [MP, 'Gastroenteritis viral', 'https://medlineplus.gov/spanish/ency/article/000252.htm'],
    mp_alimentos: [MP, 'Enfermedades transmitidas por los alimentos', 'https://medlineplus.gov/spanish/foodborneillness.html'],
    mp_erge: [MP, 'Enfermedad por reflujo gastroesofágico', 'https://medlineplus.gov/spanish/ency/article/000265.htm'],
    mp_ulcera: [MP, 'Úlcera péptica', 'https://medlineplus.gov/spanish/ency/article/000206.htm'],
    mp_hpylori: [MP, 'Infecciones por Helicobacter pylori', 'https://medlineplus.gov/spanish/helicobacterpyloriinfections.html'],
    mp_apendicitis: [MP, 'Apendicitis', 'https://medlineplus.gov/spanish/ency/article/000256.htm'],
    mp_dolor_abd: [MP, 'Dolor abdominal', 'https://medlineplus.gov/spanish/ency/article/003120.htm'],
    mp_colecistitis: [MP, 'Colecistitis aguda', 'https://medlineplus.gov/spanish/ency/article/000264.htm'],
    mp_calculos_biliares: [MP, 'Cálculos biliares', 'https://medlineplus.gov/spanish/gallstones.html'],
    mayo_pancreatitis: [MAYO, 'Pancreatitis', 'https://www.mayoclinic.org/es/diseases-conditions/pancreatitis/symptoms-causes/syc-20360227'],
    mayo_sii: [MAYO, 'Síndrome del intestino irritable', 'https://www.mayoclinic.org/es/diseases-conditions/irritable-bowel-syndrome/symptoms-causes/syc-20360016'],
    mayo_sii_tx: [MAYO, 'Intestino irritable: diagnóstico y tratamiento', 'https://www.mayoclinic.org/es/diseases-conditions/irritable-bowel-syndrome/diagnosis-treatment/drc-20360064'],
    mp_itu: [MP, 'Infección urinaria en adultos', 'https://medlineplus.gov/spanish/ency/article/000521.htm'],
    mp_calculos_renales: [MP, 'Cálculos renales', 'https://medlineplus.gov/spanish/ency/article/000458.htm'],
    mp_ectopico: [MP, 'Embarazo ectópico', 'https://medlineplus.gov/spanish/ectopicpregnancy.html'],
    mp_embarazo: [MP, 'Embarazo', 'https://medlineplus.gov/spanish/pregnancy.html'],
    mp_candidiasis: [MP, 'Candidosis vaginal', 'https://medlineplus.gov/spanish/ency/article/001511.htm'],
    mp_flujo: [MP, 'Picazón y flujo vaginal', 'https://medlineplus.gov/spanish/ency/article/003158.htm'],
    mayo_endometriosis: [MAYO, 'Endometriosis', 'https://www.mayoclinic.org/es/diseases-conditions/endometriosis/symptoms-causes/syc-20354656'],
    mp_dismenorrea: [MP, 'Dolor menstrual', 'https://medlineplus.gov/spanish/periodpain.html'],
    mp_torsion: [MP, 'Torsión testicular', 'https://medlineplus.gov/spanish/ency/article/000517.htm'],
    mp_urticaria: [MP, 'Urticaria', 'https://medlineplus.gov/spanish/ency/article/000845.htm'],
    mp_anafilaxia: [MP, 'Anafilaxia', 'https://medlineplus.gov/spanish/ency/article/000844.htm'],
    mp_alergia: [MP, 'Reacciones alérgicas', 'https://medlineplus.gov/spanish/ency/article/000005.htm'],
    mayo_celulitis: [MAYO, 'Celulitis (en inglés)', 'https://www.mayoclinic.org/diseases-conditions/cellulitis/symptoms-causes/syc-20370762'],
    mp_erupcion: [MP, 'Erupción cutánea', 'https://medlineplus.gov/spanish/ency/article/003220.htm'],
    mayo_zoster: [MAYO, 'Zóster: síntomas y causas', 'https://www.mayoclinic.org/es/diseases-conditions/shingles/symptoms-causes/syc-20353054'],
    mayo_zoster_tx: [MAYO, 'Zóster: diagnóstico y tratamiento', 'https://www.mayoclinic.org/es/diseases-conditions/shingles/diagnosis-treatment/drc-20353060'],
    mp_dm2: [MP, 'Diabetes tipo 2', 'https://medlineplus.gov/spanish/ency/article/000313.htm'],
    mp_hipoglucemia: [MP, 'Bajo nivel de azúcar en la sangre', 'https://medlineplus.gov/spanish/ency/article/000386.htm'],
    mp_hipoglucemia_c: [MP, 'Nivel bajo de azúcar: cuidados personales', 'https://medlineplus.gov/spanish/ency/patientinstructions/000085.htm'],
    mayo_hipotiroidismo: [MAYO, 'Hipotiroidismo', 'https://www.mayoclinic.org/es/diseases-conditions/hypothyroidism/symptoms-causes/syc-20350284'],
    mp_hipertiroidismo: [MP, 'Hipertiroidismo', 'https://medlineplus.gov/spanish/ency/article/000356.htm'],
    mp_graves: [MP, 'Enfermedad de Graves', 'https://medlineplus.gov/spanish/ency/article/000358.htm'],
    mayo_anemia: [MAYO, 'Anemia por deficiencia de hierro', 'https://www.mayoclinic.org/es/diseases-conditions/iron-deficiency-anemia/symptoms-causes/syc-20355034'],
    mp_deshidratacion: [MP, 'Deshidratación', 'https://medlineplus.gov/spanish/dehydration.html'],
    mp_calor: [MP, 'Emergencias por el calor', 'https://medlineplus.gov/spanish/ency/article/000056.htm'],
    mp_intox: [MP, 'Primeros auxilios en intoxicaciones', 'https://medlineplus.gov/spanish/ency/article/007579.htm'],
    mp_co: [MP, 'Intoxicación por monóxido de carbono', 'https://medlineplus.gov/spanish/carbonmonoxidepoisoning.html'],
    minsal_co: [MINSAL, 'Prevención de intoxicaciones por monóxido de carbono', 'https://www.minsal.cl/autoridades-de-magallanes-entregan-mensajes-preventivos-para-evitar-intoxicaciones-por-monoxido-de-carbono/'],
    minsal_hanta: [MINSAL, 'Hantavirus: programa y recomendaciones', 'https://diprece.minsal.cl/programas-de-salud/programas-enfermedades-transmisibles/dengue-chikungunya-otras/hanta/'],
    minsal_hanta_guia: [MINSAL, 'Guía clínica de hantavirus (PDF)', 'https://diprece.minsal.cl/wrdprss_minsal/wp-content/uploads/2015/02/Gu%C3%ADa-HANTA-completa.pdf'],
    mp_sepsis: [MP, 'Sepsis', 'https://medlineplus.gov/spanish/sepsis.html'],
    mp_lumbago: [MP, 'Dolor de espalda', 'https://medlineplus.gov/spanish/backpain.html'],
    mayo_gota: [MAYO, 'Gota (en inglés)', 'https://www.mayoclinic.org/diseases-conditions/gout/symptoms-causes/syc-20372897'],
    mayo_mono: [MAYO, 'Mononucleosis', 'https://www.mayoclinic.org/es/diseases-conditions/mononucleosis/symptoms-causes/syc-20350328'],
    minsal_samu: [MINSAL, 'SAMU 131: uso responsable', 'https://www.minsal.cl/samu-instala-base-en-alto-hospicio-y-llama-a-utilizar-responsablemente-el-131/'],
    minsal_4141: [MINSAL, 'Fono *4141 de prevención del suicidio', 'https://www.minsal.cl/ministerio-de-salud-anuncio-fono-4141-de-prevencion-del-suicidio/'],
    minsal_ges: [MINSAL, 'Problemas de salud AUGE/GES', 'https://auge.minsal.cl/problemasdesalud/index'],
    // ── Ampliación (noviembre 2026)
    mp_laringitis: [MP, 'Laringitis', 'https://medlineplus.gov/spanish/ency/article/001385.htm'],
    mp_crup: [MP, 'Crup', 'https://medlineplus.gov/spanish/ency/article/000959.htm'],
    mp_bronquiolitis: [MP, 'Bronquiolitis', 'https://medlineplus.gov/spanish/ency/article/000975.htm'],
    minsal_bronquiolitis: [MINSAL, 'Orientación técnica para el manejo de la bronquiolitis (PDF)', 'https://diprece.minsal.cl/wp-content/uploads/2024/11/Orientacion-Tecnica-Bronquiolitis_v1_IRA_menores_5.pdf'],
    mp_tosferina: [MP, 'Tos ferina', 'https://medlineplus.gov/spanish/ency/article/001561.htm'],
    mp_epoc: [MP, 'Enfermedad pulmonar obstructiva crónica (EPOC)', 'https://medlineplus.gov/spanish/ency/article/000091.htm'],
    mayo_tbc: [MAYO, 'Tuberculosis', 'https://www.mayoclinic.org/es/diseases-conditions/tuberculosis/symptoms-causes/syc-20351250'],
    minsal_tbc_epi: [MINSAL, 'Tuberculosis (Departamento de Epidemiología)', 'http://epi.minsal.cl/tuberculosis-agente-etiologico/'],
    minsal_tbc: [MINSAL, 'Tuberculosis: examen gratuito en centros de salud', 'https://www.minsal.cl/con-llamado-a-la-prevencion-conmemoraron-el-dia-mundial-de-la-tuberculosis/'],
    mp_neumotorax: [MP, 'Colapso pulmonar (neumotórax)', 'https://medlineplus.gov/spanish/ency/article/000087.htm'],
    mp_otitis_externa: [MP, 'Oído de nadador', 'https://medlineplus.gov/spanish/ency/article/000622.htm'],
    mp_dolor_oido: [MP, 'Dolor de oído', 'https://medlineplus.gov/spanish/ency/article/003046.htm'],
    mayo_cerumen: [MAYO, 'Oclusión por cerumen', 'https://www.mayoclinic.org/es/diseases-conditions/earwax-blockage/symptoms-causes/syc-20353004'],
    mayo_audicion: [MAYO, 'Pérdida de la audición', 'https://www.mayoclinic.org/es/diseases-conditions/hearing-loss/symptoms-causes/syc-20373072'],
    mp_laberintitis: [MP, 'Laberintitis', 'https://medlineplus.gov/spanish/ency/article/001054.htm'],
    mp_absceso_dental: [MP, 'Absceso dental', 'https://medlineplus.gov/spanish/ency/article/001060.htm'],
    mp_dolor_facial: [MP, 'Dolor facial', 'https://medlineplus.gov/spanish/ency/article/003027.htm'],
    mp_herpes_oral: [MP, 'Herpes oral', 'https://medlineplus.gov/spanish/ency/article/000606.htm'],
    mp_herpes_labial_t: [MP, 'Herpes labial (tema de salud)', 'https://medlineplus.gov/spanish/coldsores.html'],
    mp_aftas: [MP, 'Aftas', 'https://medlineplus.gov/spanish/ency/article/000998.htm'],
    mp_ulceras_bucales: [MP, 'Úlceras bucales', 'https://medlineplus.gov/spanish/ency/article/003059.htm'],
    mp_parpado: [MP, 'Protuberancia en el párpado', 'https://medlineplus.gov/spanish/ency/article/001009.htm'],
    mp_orzuelo_img: [MP, 'Orzuelo (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/1117.htm'],
    mp_glaucoma: [MP, 'Glaucoma', 'https://medlineplus.gov/spanish/ency/article/001620.htm'],
    mp_vision: [MP, 'Problemas de la visión', 'https://medlineplus.gov/spanish/ency/article/003029.htm'],
    mp_retina: [MP, 'Desprendimiento de retina', 'https://medlineplus.gov/spanish/ency/article/001027.htm'],
    mp_tvp: [MP, 'Trombosis venosa profunda', 'https://medlineplus.gov/spanish/ency/article/000156.htm'],
    mayo_vasovagal: [MAYO, 'Síncope vasovagal', 'https://www.mayoclinic.org/es/diseases-conditions/vasovagal-syncope/symptoms-causes/syc-20350527'],
    mayo_ortostatica: [MAYO, 'Hipotensión ortostática', 'https://www.mayoclinic.org/es/diseases-conditions/orthostatic-hypotension/symptoms-causes/syc-20352548'],
    mp_varices: [MP, 'Venas varicosas', 'https://medlineplus.gov/spanish/ency/article/001109.htm'],
    mp_insuf_venosa: [MP, 'Insuficiencia venosa', 'https://medlineplus.gov/spanish/ency/article/000203.htm'],
    mp_bell: [MP, 'Parálisis de Bell', 'https://medlineplus.gov/spanish/ency/article/000773.htm'],
    mp_paralisis_facial: [MP, 'Parálisis facial', 'https://medlineplus.gov/spanish/ency/article/003028.htm'],
    mp_convulsiones: [MP, 'Convulsiones', 'https://medlineplus.gov/spanish/ency/article/003200.htm'],
    mp_epilepsia: [MP, 'Epilepsia', 'https://medlineplus.gov/spanish/ency/article/000694.htm'],
    mp_hsa: [MP, 'Hemorragia subaracnoidea', 'https://medlineplus.gov/spanish/ency/article/000701.htm'],
    mp_aneurisma: [MP, 'Aneurisma en el cerebro', 'https://medlineplus.gov/spanish/ency/article/001414.htm'],
    mayo_cefaleas: [MAYO, 'Dolores de cabeza: tipos y tratamiento', 'https://www.mayoclinic.org/es/diseases-conditions/chronic-daily-headaches/in-depth/headaches/art-20047375'],
    mp_racimo_img: [MP, 'Cefalea en racimo (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/19241.htm'],
    mp_tunel_carpiano: [MP, 'Síndrome del túnel carpiano', 'https://medlineplus.gov/spanish/ency/article/000433.htm'],
    mp_bipolar_t: [MP, 'Trastorno bipolar (tema de salud)', 'https://medlineplus.gov/spanish/bipolardisorder.html'],
    sup_bipolar: [SUP, 'GES: trastorno bipolar en personas de 15 años y más', 'https://www.supersalud.gob.cl/difusion/665/w3-article-18891.html'],
    mayo_tept: [MAYO, 'Trastorno de estrés postraumático', 'https://www.mayoclinic.org/es/diseases-conditions/post-traumatic-stress-disorder/symptoms-causes/syc-20355967'],
    mayo_burnout: [MAYO, 'Agotamiento laboral: cómo detectarlo y tomar medidas', 'https://www.mayoclinic.org/es/healthy-lifestyle/adult-health/in-depth/burnout/art-20046642'],
    mp_apnea: [MP, 'Apnea obstructiva del sueño en adultos', 'https://medlineplus.gov/spanish/ency/article/000811.htm'],
    mp_estrenimiento: [MP, 'Cuidados personales para el estreñimiento', 'https://medlineplus.gov/spanish/ency/patientinstructions/000120.htm'],
    mp_hemorroides: [MP, 'Hemorroides', 'https://medlineplus.gov/spanish/ency/article/000292.htm'],
    mp_sangrado_rectal: [MP, 'Sangrado rectal', 'https://medlineplus.gov/spanish/ency/article/007741.htm'],
    mp_lactosa: [MP, 'Intolerancia a la lactosa', 'https://medlineplus.gov/spanish/ency/article/000276.htm'],
    mayo_lactosa: [MAYO, 'Intolerancia a la lactosa (en inglés)', 'https://www.mayoclinic.org/diseases-conditions/lactose-intolerance/symptoms-causes/syc-20374232'],
    mp_celiaca: [MP, 'Celiaquía', 'https://medlineplus.gov/spanish/ency/article/000233.htm'],
    mayo_celiaca: [MAYO, 'Enfermedad celíaca', 'https://www.mayoclinic.org/es/diseases-conditions/celiac-disease/symptoms-causes/syc-20352220'],
    mp_hepatitis_a_t: [MP, 'Hepatitis A (tema de salud)', 'https://medlineplus.gov/spanish/hepatitisa.html'],
    mp_hepatitis_t: [MP, 'Hepatitis (tema de salud)', 'https://medlineplus.gov/spanish/hepatitis.html'],
    mp_diverticulosis: [MP, 'Diverticulosis y diverticulitis', 'https://medlineplus.gov/spanish/ency/article/007668.htm'],
    mp_crohn: [MP, 'Enfermedad de Crohn', 'https://medlineplus.gov/spanish/ency/article/000249.htm'],
    mp_colitis_ulcerosa: [MP, 'Colitis ulcerativa', 'https://medlineplus.gov/spanish/ency/article/000250.htm'],
    mp_hernia: [MP, 'Hernia', 'https://medlineplus.gov/spanish/ency/article/000960.htm'],
    mp_oxiuros: [MP, 'Oxiuros', 'https://medlineplus.gov/spanish/ency/article/001152.htm'],
    minsal_marea_roja: [MINSAL, 'Alerta sanitaria por marea roja: síntomas', 'https://www.minsal.cl/ministerio-de-salud-decreta-alerta-sanitaria-preventiva-por-marea-roja-en-regiones-de-aysen-y-los-lagos/'],
    minsal_marea_roja_ot: [MINSAL, 'Orientación técnica: intoxicaciones por marea roja (PDF)', 'https://diprece.minsal.cl/wp-content/uploads/2023/10/ORIENTACION-TECNICA-PARA-EL-MANEJO-CLINICO-MAREA-ROJA.pdf'],
    isp_marea_roja: [ISP, 'Prevención de intoxicaciones por marea roja', 'https://www.ispch.gob.cl/noticia/isp-refuerza-llamado-a-prevenir-intoxicaciones-por-marea-roja/'],
    mp_prostata: [MP, 'Agrandamiento de la próstata', 'https://medlineplus.gov/spanish/ency/article/000381.htm'],
    mp_uretritis: [MP, 'Uretritis', 'https://medlineplus.gov/spanish/ency/article/000439.htm'],
    mp_clamidia: [MP, 'Infecciones por clamidia en los hombres', 'https://medlineplus.gov/spanish/ency/article/000659.htm'],
    mp_its_t: [MP, 'Infecciones de transmisión sexual (tema de salud)', 'https://medlineplus.gov/spanish/sexuallytransmittedinfections.html'],
    mp_ulceras_gen_h: [MP, 'Úlceras genitales en los hombres', 'https://medlineplus.gov/spanish/ency/article/003221.htm'],
    mp_ulceras_gen_m: [MP, 'Úlceras genitales en las mujeres', 'https://medlineplus.gov/spanish/ency/article/003222.htm'],
    mp_sifilis: [MP, 'Sífilis primaria', 'https://medlineplus.gov/spanish/ency/article/000861.htm'],
    mp_vulvovaginitis: [MP, 'Vulvovaginitis', 'https://medlineplus.gov/spanish/ency/article/000897.htm'],
    mp_spm: [MP, 'Síndrome premenstrual', 'https://medlineplus.gov/spanish/ency/article/001505.htm'],
    mp_menopausia: [MP, 'Menopausia', 'https://medlineplus.gov/spanish/ency/article/000894.htm'],
    mp_menopausia_casa: [MP, 'Manejo de la menopausia en casa', 'https://medlineplus.gov/spanish/ency/patientinstructions/000392.htm'],
    mp_quistes_ovaricos: [MP, 'Quistes ováricos', 'https://medlineplus.gov/spanish/ency/article/001504.htm'],
    mp_epi: [MP, 'Enfermedad inflamatoria pélvica (EIP)', 'https://medlineplus.gov/spanish/ency/article/000888.htm'],
    mp_eclampsia: [MP, 'Eclampsia', 'https://medlineplus.gov/spanish/ency/article/000899.htm'],
    mp_hta_embarazo: [MP, 'Presión arterial alta en el embarazo (tema de salud)', 'https://medlineplus.gov/spanish/highbloodpressureinpregnancy.html'],
    mp_preeclampsia_img: [MP, 'Preeclampsia (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/17270.htm'],
    mp_mastitis_img: [MP, 'Mastitis (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/19964.htm'],
    mp_dolor_mamas: [MP, 'Dolor de mamas', 'https://medlineplus.gov/spanish/ency/article/003152.htm'],
    mp_epididimitis: [MP, 'Epididimitis', 'https://medlineplus.gov/spanish/ency/article/001279.htm'],
    mp_dolor_testiculo: [MP, 'Dolor en el testículo', 'https://medlineplus.gov/spanish/ency/article/003160.htm'],
    mp_dermatitis_atopica: [MP, 'Dermatitis atópica', 'https://medlineplus.gov/spanish/ency/article/000853.htm'],
    mp_dermatitis_contacto: [MP, 'Dermatitis de contacto', 'https://medlineplus.gov/spanish/ency/article/000869.htm'],
    mp_psoriasis: [MP, 'Psoriasis', 'https://medlineplus.gov/spanish/ency/article/000434.htm'],
    mp_escamas: [MP, 'Escamas', 'https://medlineplus.gov/spanish/ency/article/003226.htm'],
    mp_sarna: [MP, 'Sarna', 'https://medlineplus.gov/spanish/ency/article/000830.htm'],
    mp_varicela: [MP, 'Varicela', 'https://medlineplus.gov/spanish/ency/article/001592.htm'],
    mp_vesiculas: [MP, 'Vesículas', 'https://medlineplus.gov/spanish/ency/article/003939.htm'],
    mp_pie_atleta: [MP, 'Pie de atleta', 'https://medlineplus.gov/spanish/ency/article/000875.htm'],
    mp_tina: [MP, 'Tiña', 'https://medlineplus.gov/spanish/ency/article/001439.htm'],
    mp_forunculo: [MP, 'Forúnculos', 'https://medlineplus.gov/spanish/ency/article/001474.htm'],
    mp_absceso: [MP, 'Absceso', 'https://medlineplus.gov/spanish/ency/article/001353.htm'],
    minsal_arana_guia: [MINSAL, 'Guía de manejo de la mordedura de araña de rincón (PDF)', 'https://diprece.minsal.cl/wrdprss_minsal/wp-content/uploads/2016/11/ARA%C3%91A-DE-RINCON.pdf'],
    minsal_arana: [MINSAL, 'Araña de rincón (Salud Responde)', 'https://saludresponde.minsal.cl/arana-de-rincon/'],
    mp_quemadura_solar: [MP, 'Quemadura solar', 'https://medlineplus.gov/spanish/ency/article/003227.htm'],
    mp_esguince: [MP, 'Atención postratamiento del esguince de tobillo', 'https://medlineplus.gov/spanish/ency/patientinstructions/000574.htm'],
    mp_dolor_tobillo: [MP, 'Dolor de tobillo', 'https://medlineplus.gov/spanish/ency/article/003167.htm'],
    mp_fractura: [MP, 'Fractura', 'https://medlineplus.gov/spanish/ency/article/000001.htm'],
    mp_manguito: [MP, 'Problemas con el manguito de los rotadores', 'https://medlineplus.gov/spanish/ency/article/000438.htm'],
    mp_torticolis: [MP, 'Tortícolis', 'https://medlineplus.gov/spanish/ency/article/000749.htm'],
    mp_artritis: [MP, 'Artritis', 'https://medlineplus.gov/spanish/ency/article/001243.htm'],
    mp_osteoartritis: [MP, 'Osteoartritis (video)', 'https://medlineplus.gov/spanish/ency/anatomyvideos/000092.htm'],
    mp_ar: [MP, 'Artritis reumatoidea', 'https://medlineplus.gov/spanish/ency/article/000431.htm'],
    mp_fibromialgia: [MP, 'Fibromialgia', 'https://medlineplus.gov/spanish/ency/article/000427.htm'],
    mp_dolor_talon: [MP, 'Dolor del talón', 'https://medlineplus.gov/spanish/ency/article/003181.htm'],
    mp_dolor_pie: [MP, 'Dolor en el pie', 'https://medlineplus.gov/spanish/ency/article/003183.htm'],
    // ── Segunda ampliación (noviembre 2026)
    // OMS (agencia de salud de la ONU) y OPS
    who_dengue: [OMS, 'Dengue y dengue grave', 'https://www.who.int/es/news-room/fact-sheets/detail/dengue-and-severe-dengue'],
    who_malaria: [OMS, 'Paludismo', 'https://www.who.int/es/news-room/fact-sheets/detail/malaria'],
    who_sarampion: [OMS, 'Sarampión', 'https://www.who.int/es/news-room/fact-sheets/detail/measles'],
    who_mpox: [OMS, 'Viruela símica (mpox)', 'https://www.who.int/es/news-room/fact-sheets/detail/mpox'],
    who_vih: [OMS, 'VIH y sida', 'https://www.who.int/es/news-room/hiv-aids'],
    who_chagas: [OMS, 'Enfermedad de Chagas', 'https://www.who.int/es/news-room/chagas-disease-(american-trypanosomiasis)'],
    who_hep_a: [OMS, 'Hepatitis A', 'https://www.who.int/es/news-room/hepatitis-a'],
    who_hep_b: [OMS, 'Hepatitis B', 'https://www.who.int/es/news-room/fact-sheets/detail/hepatitis-b'],
    who_gripe: [OMS, 'Cinco medidas para protegerse contra la gripe', 'https://www.who.int/es/news-room/feature-stories/detail/five-simple-steps-to-protect-against-flu'],
    who_depresion: [OMS, 'Trastorno depresivo (depresión)', 'https://www.who.int/es/news-room/fact-sheets/depression'],
    who_ansiedad: [OMS, 'Trastornos de ansiedad', 'https://www.who.int/es/news-room/fact-sheets/detail/anxiety-disorders'],
    who_tept: [OMS, 'Trastorno de estrés postraumático', 'https://www.who.int/es/news-room/fact-sheets/detail/post-traumatic-stress-disorder'],
    who_mental: [OMS, 'Trastornos mentales', 'https://www.who.int/es/news-room/fact-sheets/detail/mental-disorders'],
    who_epilepsia: [OMS, 'Epilepsia', 'https://www.who.int/es/news-room/fact-sheets/detail/epilepsy'],
    who_parkinson: [OMS, 'Enfermedad de Parkinson', 'https://www.who.int/es/news-room/fact-sheets/detail/parkinson-disease'],
    who_demencia: [OMS, 'Demencia', 'https://www.who.int/es/news-room/fact-sheets/dementia'],
    who_em: [OMS, 'Esclerosis múltiple', 'https://www.who.int/es/news-room/fact-sheets/detail/multiple-sclerosis'],
    who_cancer: [OMS, 'Cáncer', 'https://www.who.int/es/news-room/fact-sheets/detail/cancer'],
    who_mama: [OMS, 'Cáncer de mama', 'https://www.who.int/es/news-room/fact-sheets/detail/breast-cancer'],
    who_cervix: [OMS, 'Cáncer de cuello uterino', 'https://www.who.int/es/news-room/fact-sheets/detail/cervical-cancer'],
    who_alcohol: [OMS, 'Alcohol', 'https://www.who.int/es/news-room/fact-sheets/detail/alcohol'],
    ops_dengue: [OPS, 'Algoritmos para el manejo clínico del dengue (PDF)', 'https://www.paho.org/sites/default/files/2024-paho-cde-algoritmos-dengue-1125x2436-spa_0.pdf'],
    ops_chagas: [OPS, 'Enfermedad de Chagas (en inglés)', 'https://www.paho.org/en/topics/chagas-disease'],
    // MedlinePlus (NIH)
    mp_dengue: [MP, 'Fiebre del dengue', 'https://medlineplus.gov/spanish/ency/article/001374.htm'],
    mp_malaria: [MP, 'Malaria', 'https://medlineplus.gov/spanish/ency/article/000621.htm'],
    mp_sarampion: [MP, 'Sarampión', 'https://medlineplus.gov/spanish/ency/article/001569.htm'],
    mp_chagas: [MP, 'Enfermedad de Chagas', 'https://medlineplus.gov/spanish/ency/article/001372.htm'],
    mp_mano_pie_boca: [MP, 'Exantema vírico de boca-manos-pies', 'https://medlineplus.gov/spanish/ency/article/000965.htm'],
    mp_impetigo: [MP, 'Impétigo', 'https://medlineplus.gov/spanish/ency/article/000860.htm'],
    mp_mal_altura: [MP, 'Mal agudo de montaña', 'https://medlineplus.gov/spanish/ency/article/000133.htm'],
    mp_hipotermia: [MP, 'Hipotermia', 'https://medlineplus.gov/spanish/ency/article/000038.htm'],
    mp_cancer: [MP, 'Cáncer', 'https://medlineplus.gov/spanish/ency/article/001289.htm'],
    mp_colorrectal: [MP, 'Cáncer colorrectal', 'https://medlineplus.gov/spanish/ency/article/000262.htm'],
    mp_melanoma: [MP, 'Melanoma', 'https://medlineplus.gov/spanish/ency/article/000850.htm'],
    mp_testicular: [MP, 'Cáncer testicular', 'https://medlineplus.gov/spanish/ency/article/001288.htm'],
    mp_sangrado_uterino: [MP, 'Sangrado vaginal o uterino', 'https://medlineplus.gov/spanish/ency/article/007496.htm'],
    mp_tsvp: [MP, 'Taquicardia supraventricular paroxística (TSVP)', 'https://medlineplus.gov/spanish/ency/article/000183.htm'],
    mp_arritmias: [MP, 'Arritmias', 'https://medlineplus.gov/spanish/ency/article/001101.htm'],
    mp_diseccion: [MP, 'Disección aórtica', 'https://medlineplus.gov/spanish/ency/article/000181.htm'],
    mp_eap_t: [MP, 'Enfermedad arterial periférica (tema de salud)', 'https://medlineplus.gov/spanish/peripheralarterialdisease.html'],
    mp_parkinson: [MP, 'Mal de Parkinson', 'https://medlineplus.gov/spanish/ency/article/000755.htm'],
    mp_demencia: [MP, 'Demencia', 'https://medlineplus.gov/spanish/ency/article/000739.htm'],
    mp_em_img: [MP, 'Esclerosis múltiple (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/17089.htm'],
    mp_guillain: [MP, 'Síndrome de Guillain-Barré', 'https://medlineplus.gov/spanish/ency/article/000684.htm'],
    mp_debilidad: [MP, 'Debilidad', 'https://medlineplus.gov/spanish/ency/article/003174.htm'],
    mp_trigemino: [MP, 'Neuralgia del trigémino', 'https://medlineplus.gov/spanish/ency/article/000742.htm'],
    mp_piernas_inquietas: [MP, 'Síndrome de las piernas inquietas', 'https://medlineplus.gov/spanish/ency/article/000807.htm'],
    mp_toc: [MP, 'Trastorno obsesivo-compulsivo', 'https://medlineplus.gov/spanish/ency/article/000929.htm'],
    mp_tdah: [MP, 'Trastorno de hiperactividad con déficit de atención', 'https://medlineplus.gov/spanish/ency/article/001551.htm'],
    mp_anorexia: [MP, 'Anorexia', 'https://medlineplus.gov/spanish/ency/article/000362.htm'],
    mp_bulimia: [MP, 'Bulimia', 'https://medlineplus.gov/spanish/ency/article/000341.htm'],
    mp_obstruccion: [MP, 'Obstrucción e íleo intestinal', 'https://medlineplus.gov/spanish/ency/article/000260.htm'],
    mp_erc: [MP, 'Enfermedad renal crónica', 'https://medlineplus.gov/spanish/ency/article/000471.htm'],
    mp_incontinencia: [MP, 'Incontinencia urinaria', 'https://medlineplus.gov/spanish/ency/article/003142.htm'],
    mp_uropatia: [MP, 'Uropatía obstructiva', 'https://medlineplus.gov/spanish/ency/article/000507.htm'],
    mp_prostatitis: [MP, 'Prostatitis bacteriana', 'https://medlineplus.gov/spanish/ency/article/000519.htm'],
    mp_sop: [MP, 'Síndrome ovárico metabólico poliendocrino (SOP)', 'https://medlineplus.gov/spanish/ency/article/000369.htm'],
    mp_miomas: [MP, 'Miomas uterinos', 'https://medlineplus.gov/spanish/ency/article/000914.htm'],
    mp_amenaza_aborto: [MP, 'Amenaza de aborto', 'https://medlineplus.gov/spanish/ency/article/000907.htm'],
    mp_sangrado_embarazo: [MP, 'Sangrado vaginal a comienzos del embarazo', 'https://medlineplus.gov/spanish/ency/patientinstructions/000614.htm'],
    mp_nauseas_embarazo: [MP, 'Náuseas del embarazo', 'https://medlineplus.gov/spanish/ency/patientinstructions/000604.htm'],
    mp_hiperemesis_en: [MP, 'Hiperémesis gravídica (en inglés)', 'https://medlineplus.gov/ency/article/001499.htm'],
    mp_hernia_disco_t: [MP, 'Hernia de disco (tema de salud)', 'https://medlineplus.gov/spanish/herniateddisk.html'],
    mp_codo_tenista: [MP, 'Codo de tenista', 'https://medlineplus.gov/spanish/ency/article/000449.htm'],
    mp_dolor_codo: [MP, 'Dolor de codo', 'https://medlineplus.gov/spanish/ency/article/003172.htm'],
    mp_lupus: [MP, 'Lupus eritematoso sistémico', 'https://medlineplus.gov/spanish/ency/article/000435.htm'],
    mp_ojo_seco: [MP, 'Síndrome del ojo seco', 'https://medlineplus.gov/spanish/ency/article/000426.htm'],
    mp_cataratas: [MP, 'Cataratas en adultos', 'https://medlineplus.gov/spanish/ency/article/001001.htm'],
    mp_presbicia: [MP, 'Presbicia', 'https://medlineplus.gov/spanish/ency/article/001026.htm'],
    // Mayo Clinic
    mayo_epistaxis: [MAYO, 'Sangrado nasal: causas', 'https://www.mayoclinic.org/es/symptoms/nosebleeds/basics/causes/sym-20050914'],
    mayo_quemaduras: [MAYO, 'Quemaduras: primeros auxilios', 'https://www.mayoclinic.org/first-aid/first-aid-burns/basics/art-20056649'],
    mayo_bulto_mama: [MAYO, 'Bultos sospechosos en la mama', 'https://www.mayoclinic.org/es/diseases-conditions/suspicious-breast-lumps/symptoms-causes/syc-20352786'],
    // MINSAL, ISP, SENDA y Superintendencia
    minsal_sarampion: [MINSAL, 'Sarampión', 'https://www.minsal.cl/sarampion/'],
    minsal_vih: [MINSAL, 'Información VIH/SIDA', 'https://www.minsal.cl/informacion-vih-sida/'],
    minsal_autotest_vih: [MINSAL, 'Autotest y test rápido de VIH gratuito', 'https://www.minsal.cl/autotest-para-vih/'],
    minsal_rabia: [MINSAL, 'Rabia humana: prevención y control', 'http://epi.minsal.cl/rabia-humana-prevencion-y-control/'],
    isp_murcielago: [ISP, '¿Qué hacer si encontramos un murciélago en casa?', 'https://www.ispch.gob.cl/noticia/que-hacer-si-encontramos-un-murcielago-en-casa/'],
    isp_rabia: [ISP, 'Mordeduras y tratamiento antirrábico (preguntas frecuentes)', 'https://www.ispch.gob.cl/pregunta-frecuente/p-365/'],
    minsal_chagas: [MINSAL, 'Chagas y vinchuca (Salud Responde)', 'https://saludresponde.minsal.cl/chagas-y-vinchuca/'],
    minsal_chagas_manual: [MINSAL, 'Manual de atención de pacientes con enfermedad de Chagas (PDF)', 'https://diprece.minsal.cl/wrdprss_minsal/wp-content/uploads/2018/01/2018.01.18_ENFERMEDAD-DE-CHAGAS-2017.pdf'],
    minsal_plaguicidas: [MINSAL, 'Intoxicación por plaguicidas (Departamento de Epidemiología)', 'http://epi.minsal.cl/intoxicacion-por-plaguicidas/'],
    minsal_frio: [MINSAL, 'Qué hacer en caso de frío extremo', 'https://degreyd.minsal.cl/que-hacer-en-caso-de-frio-extremo/'],
    minsal_calor: [MINSAL, 'Qué hacer en caso de calor extremo', 'https://degreyd.minsal.cl/que-hacer-en-caso-de-calor-extremo/'],
    minsal_cancer_piel: [MINSAL, 'Cáncer de piel: regla ABCDE', 'https://www.minsal.cl/campana-verano-2024-2025-cancer-de-piel/'],
    minsal_gran_quemado: [MINSAL, 'Guía clínica AUGE: gran quemado (PDF)', 'https://diprece.minsal.cl/wrdprss_minsal/wp-content/uploads/2016/04/GPC-GRAN-QUEMADO-FINAL-18-MARZO-2016_DIAGRAMADA.pdf'],
    isp_altura: [ISP, 'Nota técnica: trabajo en altura geográfica en Chile (PDF)', 'https://www.ispch.gob.cl/sites/default/files/Nota_Tecnica_N_19_Trabajo_en_Altura_Geografica_en_Chile.pdf'],
    senda: [SENDA, 'Fono Drogas y Alcohol 1412: orientación', 'https://www.senda.gob.cl/orientacion/'],
    sup_ges_listado: [SUP, 'Patologías garantizadas GES', 'https://www.supersalud.gob.cl/portal/w3-propertyname-501.html'],
    // Clínicas chilenas
    clc_mal_altura: [CLC, 'Mal de altura', 'https://www.clinicalascondes.cl/CENTROS-Y-ESPECIALIDADES/Centros/Centro-Medicina-del-Viajero/Noticias/Te-puede-interesar/Mal-de-altura'],
    clc_cancer_gastrico: [CLC, 'Cáncer gástrico', 'https://www.clinicalascondes.cl/CENTROS-Y-ESPECIALIDADES/Centros/Centro-Clinico-del-Cancer/Prevencion/Previcancer/Cancer-Gastrico'],
    clc_melanoma: [CLC, 'Melanoma maligno', 'https://www.clinicalascondes.cl/CENTROS-Y-ESPECIALIDADES/Especialidades/Departamento-de-Dermatologia/Cancer-de-Piel/Melanoma-Maligno'],
    ca_hpylori: [CA, 'Helicobacter pylori: diagnosticar y tratar a tiempo', 'https://www.clinicaalemana.cl/articulos/detalle/2023/helicobacter-pylori-diagnosticar-y-tratar-a-tiempo'],
    ucc_abcde: [UCC, 'Cuida tu piel y evalúa tus lunares con la regla ABCDE', 'https://www.ucchristus.cl/blog-salud-uc/articulos/2023/cuida-tu-piel-y-eval%C3%BAa-tus-lunares-con-la-regla-del-abcde'],
    redsalud_gastrico: [REDSALUD, 'Cáncer gástrico', 'https://www.redsalud.cl/especialidades/cancer-gastrico']
  };

  const URGENCY = {
    1: { label: 'Autocuidado', desc: 'Suele manejarse en casa. Consulta si empeora o no mejora en los plazos habituales.' },
    2: { label: 'Consulta médica', desc: 'Agenda una hora con tu médico o en tu CESFAM en los próximos días.' },
    3: { label: 'Consulta pronto', desc: 'Consulta dentro de 24 a 48 horas (CESFAM, SAPU/SAR o consulta médica).' },
    4: { label: 'Urgencia hoy', desc: 'Acude hoy a un servicio de urgencia (SAPU, SAR o urgencia hospitalaria).' },
    5: { label: 'Emergencia · 131', desc: 'Llama al SAMU 131 o acude de inmediato al servicio de urgencia más cercano.' }
  };

  const INFARTO_AGE = [[0, 29, 0.35], [30, 44, 0.8], [45, 64, 1.2], [65, 200, 1.35]];

  const CONDITIONS = [
    // ───────────── Respiratorio / ORL
    {
      id: 'resfrio', n: 'Resfrío común', alt: 'Resfriado', urg: 1, prev: 1.15, dur: ['h', 'd'],
      s: { congestion: 3, secrecion_nasal: 3, estornudos: 2, dolor_garganta: 2, tos_seca: 1, tos_flema: 1, febricula: 1, ronquera: 1, fatiga: 1, dolor_cabeza: 1, ctx_contagio: 1 },
      que: 'Infección viral leve de la nariz y la garganta, causada sobre todo por rinovirus. Se contagia por gotitas y por las manos; los síntomas aparecen 1 a 3 días después del contagio y suelen durar entre 7 y 10 días.',
      trat: 'No hay un medicamento que lo cure y los antibióticos no sirven porque es un virus. Se maneja con reposo, abundante líquido, lavados nasales con suero fisiológico y paracetamol si hay fiebre o malestar. Lavarse las manos y cubrirse al toser evita contagiar a otros.',
      esp: 'Normalmente no requiere consulta. Si no mejoras en 10 días: médico general o de medicina familiar (CESFAM).',
      alarma: 'Dificultad para respirar, fiebre alta por más de 3 días, dolor intenso de oído o de cara, o empeoramiento después de haber mejorado.',
      src: ['mp_resfrio', 'mp_resfrio_t', 'mayo_covid_dif']
    },
    {
      id: 'influenza', n: 'Influenza', alt: 'Gripe', urg: 2, prev: 1.1, dur: ['h', 'd'],
      s: { fiebre: 3, dolor_muscular: 3, escalofrios: 2, fatiga: 2, dolor_cabeza: 2, tos_seca: 2, dolor_garganta: 1, congestion: 1, secrecion_nasal: 1, ctx_contagio: 1, inapetencia: 1 },
      que: 'Infección respiratoria causada por los virus influenza A y B. A diferencia del resfrío, comienza de golpe con fiebre alta, dolor muscular intenso y gran decaimiento. En Chile circula principalmente en otoño e invierno.',
      trat: 'Reposo, líquidos y paracetamol para la fiebre y el dolor. En personas de riesgo (mayores de 65, embarazadas, enfermedades crónicas, niños pequeños) el médico puede indicar un antiviral como oseltamivir, idealmente en las primeras 48 horas. Los antibióticos no sirven. La vacuna anual es la mejor prevención (gratuita para grupos de riesgo en la campaña de invierno).',
      esp: 'Médico general o de medicina familiar. Si perteneces a un grupo de riesgo, consulta precozmente.',
      alarma: 'Falta de aire, dolor en el pecho, confusión, labios azulados, deshidratación o fiebre que reaparece tras haber mejorado.',
      src: ['mp_gripe', 'mp_gripe_t', 'mayo_covid_dif', 'who_gripe']
    },
    {
      id: 'covid', n: 'COVID-19', alt: 'Coronavirus SARS-CoV-2', urg: 2, prev: 1.0, dur: ['h', 'd', 's'],
      s: { perdida_olfato: 3, fiebre: 2, tos_seca: 2, fatiga: 2, dolor_garganta: 1, dolor_cabeza: 1, dolor_muscular: 1, congestion: 1, secrecion_nasal: 1, falta_aire: 1, diarrea: 1, ctx_contagio: 1 },
      que: 'Enfermedad causada por el coronavirus SARS-CoV-2. Puede ir desde síntomas parecidos a un resfrío hasta una neumonía. La pérdida brusca del olfato o del gusto es bastante característica.',
      trat: 'La mayoría se recupera en casa con reposo, líquidos y paracetamol. Un test (antígeno o PCR) confirma el diagnóstico. Personas mayores o con enfermedades crónicas pueden recibir antivirales si consultan pronto. Usa mascarilla y evita el contacto con personas de riesgo mientras tengas síntomas.',
      esp: 'Médico general o de medicina familiar; broncopulmonar si quedan secuelas respiratorias.',
      alarma: 'Dificultad para respirar, dolor o presión persistente en el pecho, confusión, o labios o cara azulados.',
      src: ['mayo_covid', 'mayo_covid_dif']
    },
    {
      id: 'faringitis_estrep', n: 'Amigdalitis estreptocócica', alt: 'Faringitis bacteriana, “placas”', urg: 2, prev: 1.0, dur: ['h', 'd'],
      age: [[0, 14, 1.3], [15, 25, 1.1], [45, 200, 0.6]],
      s: { dolor_garganta: 3, placas: 3, fiebre: 2, ganglios: 2, dolor_cabeza: 1, nauseas: 1, tos_seca: -1, congestion: -1, secrecion_nasal: -1 },
      que: 'Infección de la garganta y las amígdalas por la bacteria estreptococo del grupo A, más frecuente en niños y adolescentes. Típicamente da dolor de garganta intenso, fiebre, amígdalas con placas blancas y ganglios del cuello sensibles, generalmente sin tos ni mocos.',
      trat: 'Se confirma con un test rápido o cultivo faríngeo y se trata con antibióticos (habitualmente penicilina o amoxicilina) indicados por un médico. Es importante completar el tratamiento para evitar complicaciones como la fiebre reumática. Paracetamol o ibuprofeno alivian el dolor.',
      esp: 'Médico general o pediatra; otorrinolaringólogo si se repite muchas veces al año.',
      alarma: 'Dificultad para tragar saliva o para respirar, babeo, voz “de papa caliente” o imposibilidad de abrir la boca.',
      src: ['mp_strep', 'mp_faringitis']
    },
    {
      id: 'sinusitis', n: 'Sinusitis aguda', urg: 2, prev: 1.05, dur: ['d', 's'],
      s: { dolor_cara: 3, congestion: 2, secrecion_nasal: 2, dolor_cabeza: 1, perdida_olfato: 1, tos_flema: 1, febricula: 1, fatiga: 1 },
      que: 'Inflamación de los senos paranasales (cavidades de la cara alrededor de la nariz), casi siempre después de un resfrío. Produce congestión, mucosidad espesa y dolor o presión en la frente, mejillas o alrededor de los ojos.',
      trat: 'La mayoría es viral y mejora en 7 a 10 días con lavados nasales con suero, analgésicos y a veces corticoides nasales. El médico puede indicar antibióticos si dura más de 10 días, si hay fiebre alta o si empeora tras haber mejorado.',
      esp: 'Médico general; otorrinolaringólogo si es recurrente o crónica (más de 12 semanas).',
      alarma: 'Hinchazón o enrojecimiento alrededor del ojo, visión doble, rigidez de cuello, confusión o dolor de cabeza muy intenso.',
      src: ['mayo_sinusitis']
    },
    {
      id: 'otitis', n: 'Otitis media aguda', alt: 'Infección del oído medio', urg: 2, prev: 1.0, dur: ['h', 'd'],
      age: [[0, 10, 1.3]],
      s: { dolor_oido: 3, audicion: 2, secrecion_oido: 2, fiebre: 1, febricula: 1, congestion: 1, irritabilidad: 1 },
      que: 'Infección del oído medio (detrás del tímpano), habitualmente como complicación de un resfrío o una alergia. Es muy común en niños, pero también ocurre en adultos.',
      trat: 'Analgésicos como paracetamol o ibuprofeno; muchas mejoran solas en 2 a 3 días. Si no mejora, hay fiebre alta o el paciente es pequeño, el médico puede indicar antibióticos. Si sale secreción, no introducir objetos ni gotas sin indicación.',
      esp: 'Médico general o pediatra; otorrinolaringólogo si es recurrente.',
      alarma: 'Hinchazón o dolor detrás de la oreja, rigidez de cuello, parálisis de la cara, mareo intenso o fiebre muy alta.',
      src: ['mayo_otitis']
    },
    {
      id: 'rinitis_alergica', n: 'Rinitis alérgica', alt: 'Alergia nasal, fiebre del heno', urg: 1, prev: 1.1, dur: ['d', 's', 'm'],
      s: { estornudos: 3, picazon_ojos_nariz: 3, secrecion_nasal: 2, congestion: 2, ojo_rojo: 1, ctx_alergeno: 1, tos_seca: 1, fiebre: -2, febricula: -1, lagrimeo: 1 },
      que: 'Reacción alérgica de la nariz a sustancias como pólenes, ácaros del polvo, pelo de mascotas o moho. Se parece a un resfrío, pero no la causa un virus, no da fiebre y suele repetirse en ciertas épocas (por ejemplo, primavera) o ambientes.',
      trat: 'Evitar el alérgeno cuando sea posible, lavados nasales, antihistamínicos orales y corticoides en spray nasal. En casos persistentes, la inmunoterapia (vacunas para la alergia) puede ayudar.',
      esp: 'Médico general; inmunólogo/alergólogo u otorrinolaringólogo si es persistente.',
      alarma: 'Silbido al respirar o falta de aire (puede asociarse a asma).',
      src: ['mayo_rinitis', 'mayo_covid_dif']
    },
    {
      id: 'conjuntivitis', n: 'Conjuntivitis', alt: 'Ojo rosado', urg: 1, prev: 1.0, dur: ['h', 'd', 's'],
      s: { ojo_rojo: 3, laganas: 2, picazon_ojos_nariz: 1, vision_subita: -3, lagrimeo: 1 },
      que: 'Inflamación de la conjuntiva, la membrana que cubre el blanco del ojo. Puede ser viral, bacteriana (con lagañas espesas) o alérgica (con mucha picazón).',
      trat: 'La viral suele pasar sola en 1 a 2 semanas con compresas frías y lágrimas artificiales; la bacteriana puede requerir gotas antibióticas indicadas por un médico; la alérgica mejora con gotas antihistamínicas. Lávate las manos y no compartas toallas.',
      esp: 'Médico general; oftalmólogo si hay dolor, baja de visión o no mejora.',
      alarma: 'Dolor ocular intenso, disminución de la visión, mucha sensibilidad a la luz o si usas lentes de contacto.',
      src: ['mp_conjuntivitis', 'mp_conj_alergica']
    },
    {
      id: 'bronquitis', n: 'Bronquitis aguda', urg: 1, prev: 1.05, dur: ['d', 's'],
      s: { tos_flema: 3, tos_seca: 2, sibilancias: 1, febricula: 1, fatiga: 1, dolor_garganta: 1, dolor_pecho_respirar: 1, falta_aire: 1, congestion: 1, tos_prolongada: 1 },
      que: 'Inflamación de los bronquios, casi siempre causada por un virus después de un resfrío o gripe. La tos puede durar hasta 3 semanas, a veces con flema.',
      trat: 'Suele mejorar sola. Reposo, líquidos, aire humidificado y paracetamol. En la mayoría de los casos NO se necesitan antibióticos. No fumar ayuda a la recuperación.',
      esp: 'Médico general; broncopulmonar si la tos dura más de 3 semanas o se repite.',
      alarma: 'Fiebre alta, dificultad para respirar, dolor en el pecho, tos con sangre o tos que dura más de 3 semanas.',
      src: ['mp_bronquitis']
    },
    {
      id: 'neumonia', n: 'Neumonía', urg: 4, prev: 0.95, dur: ['d', 's'],
      age: [[0, 4, 1.2], [65, 200, 1.3]],
      s: { fiebre: 3, tos_flema: 3, falta_aire: 2, dolor_pecho_respirar: 2, escalofrios: 2, respiracion_rapida: 2, fatiga: 1, confusion: 1, inapetencia: 1, sudoracion: 1 },
      que: 'Infección del tejido de los pulmones, habitualmente por bacterias o virus. Provoca fiebre, tos con flema, dificultad respiratoria y dolor al respirar. Es más grave en adultos mayores y personas con enfermedades crónicas.',
      trat: 'Requiere evaluación médica: examen físico y a veces radiografía de tórax. Las bacterianas se tratan con antibióticos; los casos graves necesitan hospitalización y oxígeno. Las vacunas antineumocócica y contra la influenza ayudan a prevenirla.',
      esp: 'Médico general el mismo día o servicio de urgencia; broncopulmonar en casos complicados.',
      ges: 'La neumonía de manejo ambulatorio en personas de 65 años y más está cubierta por GES.',
      alarma: 'Falta de aire en reposo, labios azulados, confusión, respiración muy rápida o fiebre que no cede.',
      src: ['mp_neumonia', 'mp_neumonia_t', 'minsal_ges']
    },
    {
      id: 'asma', n: 'Crisis de asma', urg: 4, prev: 1.0, dur: ['h', 'd'],
      age: [[0, 2, 0.5]],
      s: { sibilancias: 3, falta_aire: 3, tos_seca: 2, ahogo_severo: 2, respiracion_rapida: 1, ctx_alergeno: 1, labios_azules: 1 },
      que: 'El asma es una enfermedad crónica en la que los bronquios se inflaman y se estrechan. En una crisis aparecen silbido al respirar, tos, pecho apretado y falta de aire, a menudo gatillados por virus, alérgenos, ejercicio, frío o humo.',
      trat: 'Las crisis se tratan con broncodilatadores inhalados de rescate (como salbutamol) y, si es necesario, corticoides. Para el control a largo plazo se usan inhaladores con corticoides y se evitan los desencadenantes. Toda persona con asma debería tener un plan de acción escrito.',
      esp: 'Médico general; broncopulmonar para el control. Urgencia si la crisis no cede con el inhalador.',
      ges: 'El asma bronquial está cubierta por GES (menores y mayores de 15 años).',
      alarma: 'No poder hablar frases completas, labios o uñas azulados, hundimiento de costillas al respirar o falta de mejoría con el inhalador de rescate: llama al 131.',
      src: ['mp_asma', 'mp_disnea', 'minsal_ges']
    },
    {
      id: 'embolia_pulmonar', n: 'Embolia pulmonar', alt: 'Tromboembolismo pulmonar', urg: 5, prev: 0.8, dur: ['h', 'd'],
      req: ['falta_aire', 'ahogo_severo', 'dolor_pecho_respirar', 'tos_sangre', 'respiracion_rapida', 'desmayo', 'palpitaciones'], reqF: 0.4,
      s: { falta_aire: 3, dolor_pecho_respirar: 3, pantorrilla: 3, ctx_inmovil: 3, palpitaciones: 2, respiracion_rapida: 2, tos_sangre: 2, desmayo: 1, sudoracion: 1, mareo: 1, ahogo_severo: 1 },
      que: 'Bloqueo de una arteria del pulmón, generalmente por un coágulo que viaja desde las piernas (trombosis venosa profunda). Es más probable tras viajes largos, cirugías, reposo prolongado, embarazo o uso de anticonceptivos hormonales.',
      trat: 'Es una emergencia. Se diagnostica en el hospital (dímero D, angio-TAC) y se trata con anticoagulantes; en casos graves, con medicamentos que disuelven el coágulo o procedimientos para extraerlo.',
      esp: 'Servicio de urgencia; luego seguimiento con medicina interna, broncopulmonar o hematólogo.',
      alarma: 'Falta de aire súbita, dolor de pecho al respirar, tos con sangre o desmayo: llama al SAMU 131.',
      src: ['mp_embolia', 'mp_dolor_toracico']
    },

    // ───────────── Cardiovascular
    {
      id: 'infarto', n: 'Infarto agudo al miocardio', alt: 'Ataque cardíaco', urg: 5, prev: 0.9, dur: ['h'],
      age: INFARTO_AGE, sexM: 1.1,
      s: { dolor_pecho_opresivo: 3, dolor_irradiado: 3, sudoracion: 2, falta_aire: 2, nauseas: 2, mareo: 1, fatiga: 1, dolor_epigastrio: 1, palpitaciones: 1, miedo_intenso: 1, desmayo: 1, vomitos: 1 },
      que: 'Ocurre cuando una arteria coronaria se tapa y una parte del corazón deja de recibir sangre. El síntoma típico es dolor u opresión en el pecho (como un peso) que puede extenderse al brazo izquierdo, mandíbula, cuello o espalda, con sudor frío, náuseas o falta de aire. Mujeres, adultos mayores y personas con diabetes pueden tener síntomas más sutiles. No es lo mismo que un paro cardíaco (el corazón deja de latir), pero un infarto puede provocarlo.',
      trat: 'Cada minuto cuenta: el tratamiento busca destapar la arteria lo antes posible con medicamentos (trombolíticos) o con angioplastia (cateterismo). Luego se usan medicamentos de por vida, rehabilitación cardíaca y control de factores de riesgo (tabaco, presión, colesterol, diabetes).',
      esp: 'Emergencia: SAMU 131 o servicio de urgencia. Después, cardiólogo.',
      ges: 'El infarto agudo al miocardio está cubierto por GES.',
      alarma: 'Dolor u opresión en el pecho que dura más de unos minutos, sobre todo con sudor frío, falta de aire o náuseas: llama al 131 de inmediato. No manejes tú mismo al hospital.',
      src: ['mp_infarto', 'mp_signos_cardio', 'mp_dolor_toracico', 'minsal_ges']
    },
    {
      id: 'angina', n: 'Angina de pecho', urg: 4, prev: 0.9, dur: ['h', 'd', 's', 'm'],
      age: INFARTO_AGE,
      s: { dolor_pecho_esfuerzo: 3, dolor_pecho_opresivo: 2, dolor_irradiado: 2, falta_aire: 2, fatiga: 1, sudoracion: 1, mareo: 1 },
      que: 'Dolor u opresión en el pecho por falta de flujo de sangre al corazón, generalmente por arterias coronarias estrechas. La angina estable aparece con el esfuerzo o las emociones y cede con el reposo en pocos minutos; la inestable aparece en reposo o va empeorando y es una señal de que puede venir un infarto.',
      trat: 'Requiere estudio cardiológico (electrocardiograma, test de esfuerzo, a veces coronariografía). Se trata con medicamentos (nitratos, betabloqueadores, aspirina, estatinas), cambios de estilo de vida y, según el caso, angioplastia o cirugía de bypass.',
      esp: 'Cardiólogo, con consulta pronta. Si el dolor es nuevo, aparece en reposo o no cede en 5 minutos: urgencia.',
      alarma: 'Dolor que aparece en reposo, dura más de 5 a 10 minutos o es más intenso de lo habitual: trátalo como un posible infarto y llama al 131.',
      src: ['mp_angina', 'mp_angina_inestable', 'mp_signos_cardio']
    },
    {
      id: 'pericarditis', n: 'Pericarditis', urg: 4, prev: 0.8, dur: ['h', 'd'],
      age: [[16, 50, 1.1]],
      s: { dolor_pecho_inclinado: 3, dolor_pecho_respirar: 3, fiebre: 1, febricula: 1, palpitaciones: 1, falta_aire: 1, tos_seca: 1, fatiga: 1 },
      que: 'Inflamación del pericardio, la membrana que envuelve el corazón, frecuentemente después de una infección viral. Produce un dolor de pecho punzante que empeora al acostarse o al respirar hondo y mejora al sentarse inclinado hacia adelante.',
      trat: 'Suele tratarse con antiinflamatorios (como ibuprofeno o aspirina) y colchicina indicados por un médico, más reposo. Se debe descartar acumulación de líquido alrededor del corazón con una ecocardiografía.',
      esp: 'Servicio de urgencia para la evaluación inicial (descartar infarto) y luego cardiólogo.',
      alarma: 'Falta de aire, desmayo, presión baja o hinchazón marcada de las venas del cuello.',
      src: ['mayo_pericarditis', 'mp_dolor_toracico']
    },
    {
      id: 'fibrilacion', n: 'Fibrilación auricular', alt: 'Arritmia', urg: 4, prev: 0.9, dur: ['h', 'd', 's', 'm'],
      age: [[0, 39, 0.5], [60, 200, 1.3]],
      s: { palpitaciones: 3, mareo: 2, fatiga: 2, falta_aire: 2, dolor_pecho_opresivo: 1, desmayo: 1 },
      que: 'Ritmo cardíaco irregular y a menudo rápido, en el que las aurículas del corazón laten de forma desordenada. Puede dar palpitaciones, cansancio, mareo o falta de aire, aunque a veces no da síntomas. Aumenta el riesgo de coágulos y de ACV.',
      trat: 'Se confirma con un electrocardiograma. El tratamiento busca controlar la frecuencia o el ritmo (medicamentos, cardioversión o ablación) y prevenir coágulos con anticoagulantes según el riesgo de cada persona.',
      esp: 'Cardiólogo; urgencia si las palpitaciones son nuevas y se acompañan de otros síntomas.',
      alarma: 'Palpitaciones con dolor de pecho, falta de aire, desmayo o síntomas de ACV.',
      src: ['mp_fa']
    },
    {
      id: 'insuf_cardiaca', n: 'Insuficiencia cardíaca', urg: 3, prev: 0.9, dur: ['d', 's', 'm'],
      age: [[0, 39, 0.35], [40, 59, 0.8], [60, 200, 1.35]],
      s: { ortopnea: 3, hinchazon_piernas: 3, falta_aire: 2, fatiga: 2, aumento_peso: 1, tos_seca: 1, palpitaciones: 1 },
      que: 'El corazón no logra bombear la sangre que el cuerpo necesita y se acumula líquido en los pulmones y las piernas. Produce falta de aire al esfuerzo o al acostarse, hinchazón de tobillos y cansancio. Suele ser consecuencia de hipertensión, infartos previos o enfermedades de las válvulas.',
      trat: 'Es una condición crónica que se controla con medicamentos (diuréticos, IECA/ARA II u otros, betabloqueadores), dieta baja en sal, control diario del peso y actividad física adaptada. A veces se necesitan dispositivos o cirugía.',
      esp: 'Cardiólogo; medicina interna o médico general para el control.',
      alarma: 'Falta de aire en reposo, tos con espuma rosada, aumento rápido de peso (más de 1 a 1,5 kg en un día) o dolor de pecho.',
      src: ['mayo_ic', 'mp_ic']
    },
    {
      id: 'crisis_hipertensiva', n: 'Crisis hipertensiva', alt: 'Presión arterial muy alta', urg: 5, prev: 0.85, dur: ['h'],
      age: [[0, 29, 0.6], [50, 200, 1.2]],
      s: { presion_alta: 3, dolor_cabeza: 2, vision_borrosa: 2, mareo: 1, dolor_pecho_opresivo: 1, falta_aire: 1, confusion: 1, nauseas: 1, sangrado_nariz: 1, presion_alta_cronica: 1 },
      que: 'Elevación brusca y severa de la presión arterial (generalmente 180/120 mm Hg o más). Si hay daño en órganos (cerebro, corazón, riñones, ojos) es una emergencia hipertensiva. La hipertensión común casi nunca da síntomas, por eso es importante medirla.',
      trat: 'Si hay síntomas, requiere manejo en urgencia con medicamentos para bajar la presión de forma controlada. Si no hay síntomas, el médico ajustará el tratamiento oral. A largo plazo: medicamentos, menos sal, ejercicio y control periódico.',
      esp: 'Urgencia si hay síntomas; luego médico general, medicina interna o cardiólogo.',
      ges: 'La hipertensión arterial primaria en personas de 15 años y más está cubierta por GES.',
      alarma: 'Presión muy alta con dolor de pecho, falta de aire, dolor de cabeza intenso, confusión, alteración de la visión o debilidad: llama al 131.',
      src: ['mp_hta_maligna', 'mp_hta', 'minsal_ges']
    },

    // ───────────── Neurológico
    {
      id: 'acv', n: 'Accidente cerebrovascular (ACV)', alt: 'Derrame o infarto cerebral', urg: 5, prev: 0.9, dur: ['h'],
      age: [[0, 34, 0.5], [55, 200, 1.3]],
      s: { debilidad_lado: 3, cara_caida: 3, habla: 3, vision_subita: 2, perdida_equilibrio: 2, confusion: 2, dolor_cabeza_subito: 1, mareo: 1, vertigo: 1 },
      que: 'Una parte del cerebro deja de recibir sangre por un coágulo (isquémico) o por una hemorragia. Los signos aparecen de golpe: cara caída, debilidad o adormecimiento de un brazo o pierna de un lado, dificultad para hablar, pérdida de visión o de equilibrio.',
      trat: 'Es una emergencia que depende del tiempo: en el ACV isquémico se pueden usar medicamentos que disuelven el coágulo (idealmente en las primeras 4,5 horas) o extraerlo por cateterismo. Después siguen la rehabilitación y la prevención de un nuevo evento.',
      esp: 'Emergencia: SAMU 131. Luego neurólogo y equipo de rehabilitación.',
      ges: 'El ACV isquémico en personas de 15 años y más está cubierto por GES.',
      alarma: 'Recuerda: Cara caída, Brazo débil, Habla alterada → llama al 131 y anota la hora en que empezaron los síntomas.',
      src: ['mp_acv', 'minsal_ges']
    },
    {
      id: 'migrana', n: 'Migraña', urg: 2, prev: 1.1, dur: ['h', 'd'], sexF: 1.2,
      age: [[10, 55, 1.1], [60, 200, 0.7]],
      s: { dolor_cabeza_pulsatil: 3, fotofobia: 3, nauseas: 2, aura: 2, dolor_cabeza: 2, vomitos: 1, mareo: 1 },
      que: 'Dolor de cabeza recurrente, habitualmente pulsátil y en un lado, que dura de 4 a 72 horas y empeora con la actividad. Suele acompañarse de náuseas y molestia con la luz y los ruidos. Algunas personas tienen “aura” antes (luces, zigzag o manchas en la visión).',
      trat: 'En la crisis: reposo en un lugar oscuro y analgésicos o antiinflamatorios tomados temprano; los triptanes son medicamentos específicos con receta. Si las crisis son frecuentes, existen tratamientos preventivos. Ayuda identificar desencadenantes (falta de sueño, ayuno, estrés, algunos alimentos).',
      esp: 'Médico general; neurólogo si son frecuentes, cambian de patrón o no responden al tratamiento.',
      alarma: 'El peor dolor de cabeza de tu vida, dolor que empieza de golpe, con fiebre y rigidez de cuello, debilidad, confusión o alteración del habla.',
      src: ['mp_migrana', 'mp_cefalea_peligro']
    },
    {
      id: 'cefalea_tensional', n: 'Cefalea tensional', alt: 'Dolor de cabeza por tensión', urg: 1, prev: 1.15, dur: ['h', 'd', 's', 'm'],
      s: { dolor_cabeza_banda: 3, dolor_cabeza: 2, dolor_cuello: 2, ctx_estres: 1, insomnio: 1, fatiga: 1, nauseas: -1, aura: -1, fiebre: -1 },
      que: 'El tipo de dolor de cabeza más común. Se siente como una banda apretada o presión en la frente, las sienes o la nuca, de intensidad leve a moderada, y suele relacionarse con estrés, mala postura, tensión muscular o falta de sueño.',
      trat: 'Analgésicos comunes (paracetamol, ibuprofeno) de forma ocasional, descanso, manejo del estrés, pausas activas, ejercicio y buena higiene del sueño. Evita usar analgésicos más de 2 a 3 días por semana (pueden causar dolor de cabeza por rebote).',
      esp: 'Médico general; neurólogo si es diaria o cambia de características.',
      alarma: 'Dolor súbito y muy intenso, con fiebre, rigidez de cuello, después de un golpe o con síntomas neurológicos.',
      src: ['mp_cefalea', 'mp_cefalea_peligro']
    },
    {
      id: 'meningitis', n: 'Meningitis', urg: 5, prev: 0.75, dur: ['h', 'd'],
      s: { fiebre: 3, rigidez_cuello: 3, dolor_cabeza: 2, fotofobia: 2, confusion: 2, petequias: 2, vomitos: 1, somnolencia: 1, convulsion: 1, dolor_cabeza_subito: 1 },
      que: 'Inflamación de las membranas que cubren el cerebro y la médula, causada por virus o bacterias. La bacteriana es muy grave y avanza en horas. Los síntomas clásicos son fiebre, dolor de cabeza intenso y rigidez de cuello; puede haber vómitos, confusión, molestia con la luz y manchas en la piel.',
      trat: 'Requiere atención hospitalaria inmediata: punción lumbar para el diagnóstico y antibióticos intravenosos de inmediato si se sospecha origen bacteriano. Algunas virales solo necesitan tratamiento de soporte. Existen vacunas para varias de sus causas.',
      esp: 'Emergencia: SAMU 131 o urgencia. Luego infectólogo o neurólogo.',
      alarma: 'Fiebre con rigidez de cuello, confusión, somnolencia o manchas rojo-moradas que no se borran al presionar: llama al 131.',
      src: ['mp_meningitis', 'mp_cefalea_peligro']
    },
    {
      id: 'vppb', n: 'Vértigo posicional paroxístico benigno', alt: 'VPPB', urg: 2, prev: 1.0, dur: ['h', 'd', 's'],
      age: [[50, 200, 1.2]],
      s: { vertigo_posicion: 3, vertigo: 2, nauseas: 1, mareo: 1, debilidad_lado: -3, habla: -3, cara_caida: -3, dolor_cabeza_subito: -2 },
      que: 'Es la causa más común de vértigo. Pequeños cristales del oído interno se desplazan y provocan episodios breves (segundos a un minuto) en que sientes que todo gira al mover la cabeza, acostarte o darte vuelta en la cama.',
      trat: 'Se trata con maniobras de reposicionamiento (como la maniobra de Epley) que realiza un profesional y suelen ser muy efectivas. Puede volver a aparecer con el tiempo. Los medicamentos contra el mareo solo alivian por poco tiempo.',
      esp: 'Otorrinolaringólogo o neurólogo; también kinesiólogo con formación vestibular.',
      alarma: 'Vértigo con visión doble, dificultad para hablar, debilidad, pérdida de coordinación o dolor de cabeza intenso (puede ser un ACV).',
      src: ['mp_vppb', 'mp_vertigo']
    },
    {
      id: 'conmocion', req: ['ctx_golpe'], reqF: 0.25, n: 'Conmoción cerebral', alt: 'TEC leve', urg: 4, prev: 1.0, dur: ['h', 'd', 's'],
      s: { ctx_golpe: 3, dolor_cabeza: 2, mareo: 2, confusion: 2, vomitos: 2, nauseas: 1, memoria: 1, vision_borrosa: 1, somnolencia: 1, desmayo: 1, fotofobia: 1 },
      que: 'Alteración temporal del funcionamiento del cerebro después de un golpe en la cabeza. Puede causar dolor de cabeza, mareo, confusión, náuseas, problemas de memoria o somnolencia, aunque no haya habido pérdida de conocimiento.',
      trat: 'Evaluación médica tras el golpe, reposo físico y mental los primeros días y retorno gradual a las actividades. Evitar alcohol y deportes de contacto hasta que un médico lo autorice. Paracetamol para el dolor (evitar aspirina al inicio).',
      esp: 'Servicio de urgencia para la evaluación inicial; luego neurólogo si los síntomas persisten.',
      alarma: 'Vómitos repetidos, somnolencia que impide despertar, convulsión, pupilas de distinto tamaño, debilidad, confusión creciente o dolor de cabeza que empeora.',
      src: ['mp_conmocion', 'mp_cefalea_peligro']
    },

    // ───────────── Salud mental
    {
      id: 'panico', n: 'Crisis de pánico', alt: 'Ataque de pánico o de angustia', urg: 2, prev: 1.05, dur: ['h'],
      age: [[15, 45, 1.15], [60, 200, 0.7]],
      s: { miedo_intenso: 3, palpitaciones: 2, respiracion_rapida: 2, temblor: 2, sudoracion: 2, hormigueo: 2, irrealidad: 2, miedo_control: 2, falta_aire: 1, mareo: 1, dolor_pecho_opresivo: 1, nauseas: 1, escalofrios: 1, ansiedad: 1 },
      que: 'Episodio súbito de miedo intenso que alcanza su máximo en minutos, con palpitaciones, sudoración, temblor, falta de aire, hormigueo, mareo, opresión en el pecho y miedo a morir o a perder el control. Es muy angustiante, pero no es peligroso en sí. Cuando se repite y genera miedo a nuevas crisis se habla de trastorno de pánico.',
      trat: 'Durante la crisis: respiración lenta (inhalar 4 segundos, exhalar 6) y recordar que pasará en minutos. El tratamiento más efectivo es la psicoterapia cognitivo-conductual; algunos casos se benefician de medicamentos (antidepresivos ISRS) indicados por un médico.',
      esp: 'Psicólogo y/o psiquiatra; médico general como primer paso (CESFAM).',
      nota: 'Si es tu primera crisis o tienes dolor de pecho, consulta en urgencia para descartar una causa cardíaca antes de atribuirlo al pánico.',
      alarma: 'Dolor de pecho que no cede, desmayo, o si tienes factores de riesgo cardíaco: consulta en urgencia.',
      src: ['mp_panico', 'mp_panico_t', 'who_ansiedad']
    },
    {
      id: 'ansiedad_generalizada', n: 'Trastorno de ansiedad generalizada', urg: 2, prev: 1.05, dur: ['s', 'm'],
      s: { ansiedad: 3, insomnio: 2, irritabilidad: 2, fatiga: 1, dolor_cuello: 1, memoria: 1, palpitaciones: 1, ctx_estres: 1 },
      que: 'Preocupación excesiva y difícil de controlar sobre muchas cosas, la mayoría de los días durante varios meses, con inquietud, cansancio, irritabilidad, tensión muscular, dificultad para concentrarse y problemas de sueño.',
      trat: 'Psicoterapia (especialmente cognitivo-conductual), técnicas de relajación, ejercicio regular, buen dormir y menos cafeína y alcohol. En algunos casos, medicamentos indicados por un médico.',
      esp: 'Psicólogo y/o psiquiatra; médico general como puerta de entrada.',
      alarma: 'Pensamientos de hacerte daño: llama al *4141 o al 131.',
      src: ['mp_ansiedad', 'mp_estres', 'who_ansiedad']
    },
    {
      id: 'depresion', n: 'Depresión', urg: 2, prev: 1.05, dur: ['s', 'm'],
      s: { tristeza: 3, anhedonia: 3, insomnio: 2, fatiga: 2, culpa: 2, ideas_suicidas: 2, inapetencia: 1, memoria: 1, irritabilidad: 1, perdida_peso: 1, aumento_peso: 1 },
      que: 'Trastorno del ánimo con tristeza persistente o pérdida de interés por las cosas durante al menos 2 semanas, que afecta el sueño, el apetito, la energía, la concentración y la autoestima. No es debilidad ni falta de voluntad: es una enfermedad tratable.',
      trat: 'Psicoterapia, medicamentos antidepresivos o la combinación de ambos según la gravedad. También ayudan la actividad física, las rutinas de sueño y el apoyo de personas cercanas.',
      esp: 'Médico general (CESFAM), psicólogo y/o psiquiatra.',
      ges: 'La depresión en personas de 15 años y más está cubierta por GES.',
      alarma: 'Pensamientos de muerte o de hacerte daño: llama al *4141 (gratis, 24 horas) o al SAMU 131.',
      src: ['mp_depresion', 'minsal_4141', 'minsal_ges', 'who_depresion']
    },
    {
      id: 'insomnio_cond', n: 'Insomnio', urg: 1, prev: 1.05, dur: ['d', 's', 'm'],
      s: { insomnio: 3, fatiga: 2, irritabilidad: 1, memoria: 1, ansiedad: 1, ctx_estres: 1 },
      que: 'Dificultad para quedarse dormido, despertarse durante la noche o despertar muy temprano, con cansancio durante el día. Puede ser pasajero (por estrés) o crónico (más de 3 meses).',
      trat: 'Higiene del sueño: horarios regulares, evitar pantallas, cafeína y alcohol en la noche, y usar la cama solo para dormir. La terapia cognitivo-conductual para el insomnio es el tratamiento más efectivo. Los fármacos para dormir, solo por periodos cortos y con indicación médica.',
      esp: 'Médico general; psicólogo, psiquiatra o especialista en sueño si es crónico.',
      alarma: 'Ronquidos fuertes con pausas respiratorias, quedarte dormido al manejar o insomnio con síntomas depresivos importantes.',
      src: ['mp_insomnio']
    },

    // ───────────── Digestivo
    {
      id: 'gastroenteritis', n: 'Gastroenteritis aguda', alt: '“Gripe estomacal”', urg: 1, prev: 1.15, dur: ['h', 'd'],
      s: { diarrea: 3, vomitos: 2, nauseas: 2, dolor_abdominal: 2, febricula: 1, fiebre: 1, dolor_muscular: 1, ctx_contagio: 1, inapetencia: 1 },
      que: 'Infección del estómago y los intestinos, generalmente viral (norovirus en adultos, rotavirus en niños). Produce diarrea, vómitos, náuseas y dolor abdominal; suele durar de 1 a 3 días.',
      trat: 'Lo principal es hidratarse: sales de rehidratación oral en sorbos pequeños y frecuentes. Comidas livianas cuando se toleren. Los antibióticos no sirven en la viral. Lávate las manos para no contagiar.',
      esp: 'Normalmente no requiere especialista; médico general si no mejora. Gastroenterólogo si se prolonga.',
      alarma: 'Signos de deshidratación (orina escasa, mareo al pararse), sangre en las deposiciones, fiebre alta, dolor abdominal intenso o vómitos que no permiten tomar líquidos.',
      src: ['mp_gastroenteritis', 'mp_dolor_abd']
    },
    {
      id: 'intox_alimentaria', req: ['ctx_comida', 'ctx_mariscos'], reqF: 0.6, n: 'Intoxicación alimentaria', urg: 2, prev: 1.0, dur: ['h', 'd'],
      s: { ctx_comida: 3, vomitos: 3, nauseas: 2, diarrea: 2, dolor_abdominal: 2, fiebre: 1, escalofrios: 1, ctx_mariscos: 1 },
      que: 'Enfermedad causada por comer o beber alimentos contaminados con bacterias, virus o sus toxinas. Los síntomas aparecen desde pocas horas hasta días después: náuseas, vómitos, diarrea y dolor abdominal, a veces con fiebre.',
      trat: 'Hidratación con sales de rehidratación oral y reposo; la mayoría mejora en 1 a 3 días. Algunos casos (fiebre alta, diarrea con sangre) necesitan exámenes y antibióticos. Evita los antidiarreicos si hay fiebre o sangre.',
      esp: 'Médico general; urgencia si hay deshidratación.',
      alarma: 'Diarrea con sangre, fiebre alta, deshidratación, visión doble o debilidad muscular (posible botulismo), o si estás embarazada.',
      src: ['mp_alimentos', 'mp_gastroenteritis']
    },
    {
      id: 'erge', n: 'Reflujo gastroesofágico (ERGE)', alt: 'Acidez, reflujo', urg: 1, prev: 1.1, dur: ['d', 's', 'm'],
      s: { ardor_pecho: 3, regurgitacion: 3, dolor_epigastrio: 1, tos_seca: 1, ronquera: 1, nauseas: 1, llenura: 1, tos_prolongada: 1, disfagia: 1 },
      que: 'El contenido ácido del estómago se devuelve hacia el esófago, causando ardor detrás del esternón (acidez), regurgitación ácida y a veces tos o ronquera. Empeora después de comer abundante, al acostarse o al agacharse.',
      trat: 'Cambios de hábitos: comidas más pequeñas, no acostarse hasta 2 a 3 horas después de comer, elevar la cabecera de la cama, bajar de peso y reducir alcohol, tabaco, café y comidas grasas. Antiácidos para síntomas ocasionales; el médico puede indicar inhibidores de la bomba de protones (como omeprazol).',
      esp: 'Médico general; gastroenterólogo si persiste o hay signos de alarma.',
      alarma: 'Dificultad o dolor al tragar, baja de peso, vómitos con sangre, deposiciones negras o dolor de pecho con el esfuerzo (descartar causa cardíaca).',
      src: ['mp_erge']
    },
    {
      id: 'gastritis_ulcera', n: 'Gastritis o úlcera péptica', urg: 2, prev: 1.05, dur: ['d', 's', 'm'],
      s: { dolor_epigastrio: 3, nauseas: 2, llenura: 2, ctx_antiinflam: 2, deposiciones_negras: 2, vomito_sangre: 2, hinchazon_abdominal: 1, inapetencia: 1, ardor_pecho: 1, vomitos: 1, ctx_alcohol: 1 },
      que: 'Inflamación o herida en la mucosa del estómago o del duodeno. Las causas más comunes son la bacteria Helicobacter pylori y el uso de antiinflamatorios (como ibuprofeno o aspirina); el alcohol y el tabaco empeoran el cuadro. Causa dolor o ardor en la boca del estómago, náuseas y sensación de llenura.',
      trat: 'Medicamentos que reducen el ácido (como omeprazol) y, si se detecta H. pylori, una combinación de antibióticos. Suspender los antiinflamatorios si es posible y evitar alcohol y tabaco. A veces se requiere una endoscopía.',
      esp: 'Médico general; gastroenterólogo para endoscopía.',
      alarma: 'Vómito con sangre o como borra de café, deposiciones negras, dolor abdominal súbito e intenso o desmayo: urgencia.',
      ges: 'El tratamiento de erradicación de Helicobacter pylori está cubierto por GES.',
      src: ['mp_ulcera', 'mp_hpylori', 'minsal_ges', 'ca_hpylori']
    },
    {
      id: 'apendicitis', n: 'Apendicitis', urg: 4, prev: 0.95, dur: ['h', 'd'],
      age: [[5, 35, 1.2], [60, 200, 0.8]],
      s: { dolor_ombligo_migra: 3, dolor_fid: 3, nauseas: 2, vomitos: 2, inapetencia: 2, fiebre: 1, febricula: 1, dolor_abdominal: 1, dolor_abdominal_intenso: 1 },
      que: 'Inflamación del apéndice. Típicamente el dolor empieza alrededor del ombligo y en horas se traslada a la parte baja derecha del abdomen, empeorando al caminar o toser, con falta de apetito, náuseas y a veces fiebre.',
      trat: 'Es una urgencia quirúrgica: el tratamiento habitual es extirpar el apéndice (apendicectomía), muchas veces por laparoscopía, junto con antibióticos. Si se retrasa, puede romperse y causar peritonitis.',
      esp: 'Servicio de urgencia; cirujano general.',
      alarma: 'Dolor abdominal que aumenta, abdomen duro, fiebre alta o vómitos persistentes. No tomes analgésicos ni laxantes antes de ser evaluado/a.',
      src: ['mp_apendicitis', 'mp_dolor_abd']
    },
    {
      id: 'colecistitis', n: 'Cálculos en la vesícula / colecistitis', alt: 'Cólico biliar', urg: 4, prev: 0.95, dur: ['h', 'd'], sexF: 1.2,
      age: [[0, 25, 0.6], [40, 200, 1.2]],
      s: { dolor_hipocondrio: 3, nauseas: 2, vomitos: 2, fiebre: 1, ictericia: 1, dolor_epigastrio: 1, hinchazon_abdominal: 1, llenura: 1, coluria: 1 },
      que: 'Los cálculos (piedras) de la vesícula pueden bloquear su salida y causar dolor intenso en la parte alta derecha del abdomen o en la boca del estómago, a menudo después de comidas grasas, que puede irradiarse a la espalda o al hombro derecho. Si la vesícula se inflama o infecta (colecistitis) aparece fiebre.',
      trat: 'El cólico se trata con analgésicos; si los cálculos dan síntomas, el tratamiento habitual es extirpar la vesícula (colecistectomía), generalmente por laparoscopía. La colecistitis requiere hospitalización.',
      esp: 'Médico general o urgencia; cirujano digestivo.',
      ges: 'La colecistectomía preventiva del cáncer de vesícula (personas de 35 a 49 años con cálculos) está cubierta por GES.',
      alarma: 'Fiebre, piel u ojos amarillos, dolor que dura más de 5 a 6 horas o vómitos persistentes.',
      src: ['mp_colecistitis', 'mp_calculos_biliares', 'minsal_ges']
    },
    {
      id: 'pancreatitis', n: 'Pancreatitis aguda', urg: 4, prev: 0.8, dur: ['h', 'd'],
      s: { dolor_cinturon: 3, dolor_epigastrio: 2, vomitos: 2, nauseas: 2, dolor_abdominal_intenso: 2, fiebre: 1, palpitaciones: 1, hinchazon_abdominal: 1, ctx_alcohol: 2 },
      que: 'Inflamación súbita del páncreas, casi siempre por cálculos biliares o por consumo de alcohol. Da un dolor intenso en la parte alta del abdomen que se irradia a la espalda “como un cinturón”, con náuseas y vómitos.',
      trat: 'Requiere hospitalización: ayuno inicial, sueros intravenosos y analgésicos, y tratar la causa (por ejemplo, extirpar la vesícula si hay cálculos o suspender el alcohol).',
      esp: 'Servicio de urgencia; gastroenterólogo o cirujano digestivo.',
      alarma: 'Dolor abdominal intenso con vómitos, fiebre, taquicardia o dificultad para respirar.',
      src: ['mayo_pancreatitis']
    },
    {
      id: 'sii', n: 'Síndrome de intestino irritable', alt: 'Colon irritable', urg: 1, prev: 1.05, dur: ['s', 'm'],
      s: { alivio_defecar: 3, hinchazon_abdominal: 2, dolor_abdominal: 2, diarrea: 1, estrenimiento: 1, ctx_estres: 1, deposiciones_negras: -3, diarrea_sangre: -3, perdida_peso: -2, fiebre: -2 },
      que: 'Trastorno digestivo frecuente y crónico con dolor o molestia abdominal que suele aliviarse al ir al baño, hinchazón, gases y cambios en las deposiciones (diarrea, estreñimiento o ambos). No daña el intestino ni aumenta el riesgo de cáncer.',
      trat: 'Cambios en la alimentación (más fibra soluble, dieta baja en FODMAP con apoyo profesional), manejo del estrés, actividad física y regularidad en las comidas. Según los síntomas, el médico puede indicar antiespasmódicos, laxantes o antidiarreicos.',
      esp: 'Médico general; gastroenterólogo; nutricionista.',
      alarma: 'Baja de peso, sangre en las deposiciones, fiebre, anemia, síntomas que te despiertan en la noche o que comienzan después de los 50 años.',
      src: ['mayo_sii', 'mayo_sii_tx']
    },

    // ───────────── Urinario / renal
    {
      id: 'itu', n: 'Infección urinaria (cistitis)', urg: 2, prev: 1.1, dur: ['h', 'd'], sexF: 1.3, sexM: 0.6,
      s: { ardor_orinar: 3, orinar_frecuente: 3, orina_turbia: 2, dolor_pelvico: 2, sangre_orina: 1, fiebre: -1 },
      que: 'Infección de la vejiga, generalmente por bacterias del intestino, mucho más frecuente en mujeres. Produce ardor al orinar, ganas frecuentes y urgentes de orinar, dolor en la parte baja del abdomen y orina turbia o con mal olor.',
      trat: 'Se confirma con examen de orina y urocultivo y se trata con antibióticos indicados por un médico. Tomar abundante agua ayuda. No te automediques con antibióticos, para evitar la resistencia bacteriana.',
      esp: 'Médico general o matrona; urólogo si se repiten.',
      alarma: 'Fiebre, escalofríos, dolor en la espalda o el costado (posible infección renal), vómitos, o si estás embarazada.',
      src: ['mp_itu']
    },
    {
      id: 'pielonefritis', n: 'Pielonefritis', alt: 'Infección renal', urg: 4, prev: 0.9, dur: ['h', 'd'], sexF: 1.2,
      s: { fiebre: 3, dolor_costado: 3, escalofrios: 2, ardor_orinar: 2, nauseas: 2, orinar_frecuente: 1, vomitos: 1, orina_turbia: 1 },
      que: 'Infección de uno o ambos riñones, a menudo cuando una infección urinaria sube desde la vejiga. Produce fiebre, escalofríos, dolor en un costado de la espalda y síntomas urinarios, a veces con náuseas y vómitos.',
      trat: 'Requiere antibióticos indicados por un médico; si hay vómitos, compromiso del estado general o embarazo, se trata en el hospital con antibióticos intravenosos.',
      esp: 'Servicio de urgencia o médico general el mismo día; urólogo o nefrólogo si se repite.',
      alarma: 'Fiebre alta con escalofríos intensos, confusión, presión baja o vómitos que impiden tomar los medicamentos.',
      src: ['mp_itu']
    },
    {
      id: 'calculo_renal', n: 'Cálculos renales (cólico renal)', alt: 'Piedras en el riñón', urg: 4, prev: 0.95, dur: ['h', 'd'], sexM: 1.1,
      age: [[20, 60, 1.1]],
      s: { colico_renal: 3, dolor_costado: 2, sangre_orina: 2, nauseas: 2, vomitos: 1, orinar_frecuente: 1, ardor_orinar: 1, sudoracion: 1 },
      que: 'Piedras que se forman en el riñón y pueden bajar por el uréter, causando un dolor muy intenso en oleadas desde el costado o la espalda hacia la ingle, a menudo con sangre en la orina, náuseas y vómitos. El principal factor de riesgo es tomar poco líquido.',
      trat: 'Analgésicos y antiinflamatorios; la mayoría de los cálculos pequeños se eliminan solos tomando abundante líquido. Los grandes pueden requerir litotricia (ondas de choque) o procedimientos endoscópicos.',
      esp: 'Servicio de urgencia durante el cólico; luego urólogo.',
      alarma: 'Dolor con fiebre o escalofríos, imposibilidad de orinar o si tienes un solo riñón: urgencia inmediata.',
      src: ['mp_calculos_renales']
    },

    // ───────────── Ginecología / obstetricia / urología
    {
      id: 'embarazo_ectopico', req: ['atraso_menstrual'], reqF: 0.6, n: 'Embarazo ectópico', urg: 5, prev: 0.85, dur: ['h', 'd', 's'], sex: 'F', preg: true, ageRange: [11, 55],
      s: { atraso_menstrual: 3, dolor_pelvico: 3, sangrado_vaginal: 3, desmayo: 2, dolor_abdominal_intenso: 2, mareo: 1, dolor_abdominal: 1 },
      que: 'Embarazo que se implanta fuera del útero, casi siempre en una trompa. Puede dar atraso menstrual, dolor pélvico de un lado y sangrado vaginal. Si la trompa se rompe hay hemorragia interna, que es una emergencia.',
      trat: 'Se diagnostica con test de embarazo (beta-hCG) y ecografía transvaginal. Según el caso, se trata con un medicamento (metotrexato) o con cirugía. Nunca puede llegar a término.',
      esp: 'Urgencia ginecológica; ginecólogo/a.',
      alarma: 'Dolor abdominal o pélvico intenso, mareo, desmayo o dolor en el hombro con atraso menstrual: llama al 131.',
      src: ['mp_ectopico', 'mp_dolor_abd']
    },
    {
      id: 'embarazo', req: ['atraso_menstrual'], reqF: 0.5, n: 'Embarazo inicial', urg: 2, prev: 1.0, dur: ['d', 's', 'm'], sex: 'F', preg: true, ageRange: [11, 55],
      s: { atraso_menstrual: 3, nauseas: 2, sensibilidad_mamas: 2, fatiga: 1, orinar_frecuente: 1, vomitos: 1, mareo: 1 },
      que: 'Atraso menstrual, náuseas (sobre todo en la mañana), pechos sensibles, cansancio y ganas frecuentes de orinar son síntomas habituales del primer trimestre.',
      trat: 'Confírmalo con un test de embarazo (de orina o de sangre). Inicia el control prenatal lo antes posible, comienza ácido fólico y evita alcohol, tabaco y medicamentos sin indicación médica.',
      esp: 'Matrona (CESFAM) o ginecólogo/a obstetra.',
      alarma: 'Sangrado vaginal, dolor abdominal intenso, vómitos que impiden comer o beber, o desmayo.',
      src: ['mp_embarazo']
    },
    {
      id: 'candidiasis', n: 'Candidiasis vaginal', alt: 'Infección por hongos', urg: 2, prev: 1.0, dur: ['d', 's'], sex: 'F',
      s: { picazon_genital: 3, flujo_vaginal: 3, ardor_orinar: 1, dolor_relaciones: 1 },
      que: 'Infección muy común por el hongo Candida. Produce picazón y ardor vulvar, flujo blanco y espeso (tipo leche cortada) y molestias al orinar o en las relaciones. La favorecen los antibióticos, el embarazo, la diabetes o la ropa ajustada.',
      trat: 'Antimicóticos en óvulos, cremas o comprimidos orales. Si es el primer episodio, hay dudas o se repite, conviene una evaluación, porque otras infecciones pueden confundirse con candidiasis.',
      esp: 'Matrona, médico general o ginecólogo/a.',
      alarma: 'Fiebre, dolor pélvico, flujo con mal olor o si estás embarazada.',
      src: ['mp_candidiasis', 'mp_flujo']
    },
    {
      id: 'dismenorrea', n: 'Dismenorrea', alt: 'Dolor menstrual', urg: 1, prev: 1.05, dur: ['h', 'd', 'm'], sex: 'F', ageRange: [9, 55],
      s: { dolor_menstrual: 3, dolor_pelvico: 2, dolor_lumbar: 1, nauseas: 1, diarrea: 1, dolor_cabeza: 1 },
      que: 'Dolor tipo cólico en la parte baja del abdomen antes o durante la menstruación, a veces con dolor lumbar, náuseas o diarrea. Es muy común y suele ser “primaria” (sin otra enfermedad), aunque un dolor muy intenso puede deberse a causas como la endometriosis.',
      trat: 'Antiinflamatorios (como ibuprofeno) desde el inicio del dolor, calor local y ejercicio. Los anticonceptivos hormonales también pueden reducirlo; consulta a un profesional para elegir.',
      esp: 'Matrona o ginecólogo/a.',
      alarma: 'Dolor que no cede con analgésicos, que te impide hacer tu vida normal, fiebre o sangrado muy abundante.',
      src: ['mp_dismenorrea']
    },
    {
      id: 'endometriosis', n: 'Endometriosis', urg: 2, prev: 0.9, dur: ['s', 'm'], sex: 'F', ageRange: [11, 55],
      s: { dolor_menstrual: 3, dolor_pelvico: 2, dolor_relaciones: 2, dolor_lumbar: 1, hinchazon_abdominal: 1, fatiga: 1, estrenimiento: 1 },
      que: 'Tejido similar al revestimiento del útero crece fuera de él (ovarios, trompas, pelvis), causando un dolor menstrual mucho más intenso de lo habitual, dolor pélvico crónico, dolor en las relaciones sexuales y, a veces, dificultad para embarazarse.',
      trat: 'Analgésicos antiinflamatorios, tratamientos hormonales y, en algunos casos, cirugía laparoscópica. El tratamiento depende de los síntomas y del deseo de embarazo.',
      esp: 'Ginecólogo/a.',
      alarma: 'Dolor pélvico súbito e intenso, fiebre o sangrado abundante.',
      src: ['mayo_endometriosis']
    },
    {
      id: 'torsion_testicular', n: 'Torsión testicular', urg: 5, prev: 0.8, dur: ['h'], sex: 'M',
      age: [[0, 30, 1.3], [40, 200, 0.5]],
      s: { dolor_testicular: 3, nauseas: 2, vomitos: 2, dolor_abdominal: 1 },
      que: 'El cordón que irriga el testículo se tuerce y corta su flujo de sangre. Produce dolor súbito e intenso en un testículo, hinchazón, náuseas y vómitos. Es más común en adolescentes y jóvenes.',
      trat: 'Es una emergencia quirúrgica: idealmente se debe operar dentro de las primeras horas (ojalá antes de 4 a 6 horas) para salvar el testículo.',
      esp: 'Urgencia de inmediato; urólogo.',
      alarma: 'Cualquier dolor testicular súbito e intenso requiere ir a urgencia de inmediato.',
      src: ['mp_torsion']
    },

    // ───────────── Piel y alergias
    {
      id: 'urticaria', n: 'Urticaria', alt: 'Reacción alérgica en la piel', urg: 1, prev: 1.05, dur: ['h', 'd', 's'],
      s: { ronchas: 3, picazon_piel: 2, ctx_alergeno: 2, erupcion: 1 },
      que: 'Ronchas elevadas, rojas y que pican mucho, que aparecen y desaparecen en horas (cada roncha suele durar menos de 24 a 48 horas). Puede deberse a alimentos, medicamentos, infecciones o picaduras, o no tener una causa clara.',
      trat: 'Antihistamínicos orales, evitar el desencadenante si se identifica y compresas frías. Si dura más de 6 semanas se considera crónica y requiere estudio.',
      esp: 'Médico general; dermatólogo o inmunólogo si es crónica.',
      alarma: 'Hinchazón de labios, lengua o garganta, dificultad para respirar o mareo: puede ser anafilaxia, llama al 131.',
      src: ['mp_urticaria', 'mp_alergia']
    },
    {
      id: 'anafilaxia', req: ['hinchazon_labios', 'ctx_alergeno', 'ronchas'], reqF: 0.4, n: 'Anafilaxia', alt: 'Reacción alérgica grave', urg: 5, prev: 0.8, dur: ['h'],
      s: { hinchazon_labios: 3, ctx_alergeno: 3, ronchas: 2, ahogo_severo: 2, sibilancias: 2, falta_aire: 2, desmayo: 2, mareo: 1, vomitos: 1, palpitaciones: 1 },
      que: 'Reacción alérgica grave y rápida que afecta todo el cuerpo, generalmente minutos después de un alimento, medicamento o picadura. Puede causar hinchazón de labios y garganta, dificultad para respirar, ronchas, vómitos, mareo y caída de la presión.',
      trat: 'Emergencia: se trata con adrenalina inyectable (si la persona tiene un autoinyector, usarlo de inmediato) y atención en urgencia. Después, estudio con alergólogo y portar adrenalina.',
      esp: 'Emergencia: SAMU 131. Luego inmunólogo/alergólogo.',
      alarma: 'Dificultad para respirar, hinchazón de garganta o desmayo tras exponerte a un alérgeno: llama al 131 inmediatamente.',
      src: ['mp_anafilaxia', 'mp_alergia']
    },
    {
      id: 'celulitis', n: 'Celulitis infecciosa', alt: 'Infección de la piel', urg: 3, prev: 0.95, dur: ['h', 'd'],
      s: { piel_roja_caliente: 3, fiebre: 2, escalofrios: 1, ganglios: 1 },
      que: 'Infección bacteriana de la piel y del tejido bajo ella, que entra por una herida, picadura o grieta. La zona se ve roja, hinchada, caliente y dolorosa, y se va extendiendo; puede haber fiebre. (No es la “celulitis” estética.)',
      trat: 'Antibióticos indicados por un médico (orales, o intravenosos si es extensa) y mantener la zona elevada. Marcar el borde del enrojecimiento ayuda a ver si avanza.',
      esp: 'Médico general o servicio de urgencia; dermatólogo o infectólogo si se repite.',
      alarma: 'Enrojecimiento que avanza rápido, fiebre alta, ampollas, dolor desproporcionado o compromiso de la cara o alrededor del ojo.',
      src: ['mayo_celulitis', 'mp_erupcion']
    },
    {
      id: 'herpes_zoster', n: 'Herpes zóster', alt: 'Culebrilla', urg: 3, prev: 0.95, dur: ['d', 's'],
      age: [[0, 40, 0.6], [50, 200, 1.35]],
      s: { ampollas_franja: 3, erupcion: 1, picazon_piel: 1, febricula: 1, dolor_cabeza: 1, fatiga: 1, hormigueo: 1 },
      que: 'Reactivación del virus de la varicela que quedó “dormido” en los nervios. Suele empezar con dolor, ardor u hormigueo en una zona y, a los pocos días, aparecen ampollas en franja en un solo lado del cuerpo. Es más común sobre los 50 años.',
      trat: 'Antivirales (como aciclovir o valaciclovir), idealmente dentro de las 72 horas desde el inicio del sarpullido, más analgésicos. Existe una vacuna para prevenirlo en adultos mayores.',
      esp: 'Médico general (consulta pronta); dermatólogo. Oftalmólogo si afecta la frente o el ojo.',
      alarma: 'Lesiones cerca del ojo o en la punta de la nariz, sistema inmune debilitado, fiebre alta o confusión.',
      src: ['mayo_zoster', 'mayo_zoster_tx', 'mp_erupcion']
    },

    // ───────────── Metabólico / endocrino
    {
      id: 'diabetes', n: 'Diabetes (azúcar alta)', alt: 'Hiperglicemia', urg: 3, prev: 1.0, dur: ['s', 'm'],
      age: [[0, 29, 0.6], [45, 200, 1.2]],
      s: { sed: 3, orinar_frecuente: 2, perdida_peso: 2, fatiga: 2, vision_borrosa: 2, hambre: 1, hormigueo: 1 },
      que: 'La glucosa en la sangre se mantiene elevada porque el cuerpo no produce suficiente insulina o no la usa bien. Puede no dar síntomas por años; cuando está alta produce mucha sed, orinar seguido, cansancio, visión borrosa y baja de peso.',
      trat: 'Se diagnostica con exámenes de sangre (glicemia, hemoglobina glicosilada). Se trata con alimentación saludable, actividad física, control de peso y medicamentos (metformina u otros, a veces insulina).',
      esp: 'Médico general (Programa de Salud Cardiovascular del CESFAM); endocrinólogo o diabetólogo.',
      ges: 'La diabetes mellitus tipo 1 y tipo 2 están cubiertas por GES.',
      alarma: 'Vómitos, dolor abdominal, respiración rápida, mucha somnolencia o confusión: puede ser una descompensación grave (urgencia).',
      src: ['mp_dm2', 'minsal_ges']
    },
    {
      id: 'hipoglucemia', req: ['ctx_diabetes'], reqF: 0.5, n: 'Hipoglicemia (azúcar baja)', urg: 4, prev: 0.9, dur: ['h'],
      s: { ctx_diabetes: 3, temblor: 3, sudoracion: 2, hambre: 2, palpitaciones: 2, mareo: 2, confusion: 2, ansiedad: 1, irritabilidad: 1, hormigueo: 1, desmayo: 1, convulsion: 1 },
      que: 'Nivel de glucosa en la sangre demasiado bajo (generalmente menos de 70 mg/dL), más frecuente en personas con diabetes que usan insulina u otros medicamentos. Produce temblor, sudoración, hambre, palpitaciones y nerviosismo y, si empeora, confusión, convulsiones o pérdida de conciencia.',
      trat: 'Regla 15-15: tomar 15 g de azúcar rápida (medio vaso de jugo o bebida no dietética, o 3 a 4 cucharaditas de azúcar), esperar 15 minutos y volver a medir. Luego comer algo. Revisa con tu médico la causa y el tratamiento.',
      esp: 'Médico general o endocrinólogo/diabetólogo.',
      alarma: 'Si la persona está confundida, no puede tragar o pierde el conocimiento, no le des nada por la boca y llama al 131.',
      src: ['mp_hipoglucemia', 'mp_hipoglucemia_c']
    },
    {
      id: 'hipotiroidismo', n: 'Hipotiroidismo', alt: 'Tiroides lenta', urg: 2, prev: 1.0, dur: ['s', 'm'], sexF: 1.3,
      s: { fatiga: 3, intolerancia_frio: 3, aumento_peso: 2, estrenimiento: 2, piel_seca: 2, caida_pelo: 1, memoria: 1, tristeza: 1, ronquera: 1 },
      que: 'La tiroides produce menos hormona de la necesaria y el metabolismo se enlentece. Los síntomas aparecen lentamente: cansancio, frío, aumento de peso, estreñimiento, piel seca, caída del pelo, ánimo bajo y problemas de memoria. Es más común en mujeres.',
      trat: 'Se diagnostica con un examen de sangre (TSH y T4) y se trata con levotiroxina diaria, con controles periódicos para ajustar la dosis.',
      esp: 'Médico general; endocrinólogo.',
      ges: 'El hipotiroidismo en personas de 15 años y más está cubierto por GES.',
      alarma: 'Somnolencia extrema, confusión o frío intenso con temperatura corporal baja.',
      src: ['mayo_hipotiroidismo', 'minsal_ges']
    },
    {
      id: 'hipertiroidismo', n: 'Hipertiroidismo', alt: 'Tiroides acelerada', urg: 2, prev: 0.95, dur: ['s', 'm'], sexF: 1.3,
      s: { perdida_peso: 3, intolerancia_calor: 3, palpitaciones: 2, temblor: 2, ansiedad: 2, insomnio: 1, diarrea: 1, sudoracion: 1, irritabilidad: 1, fatiga: 1 },
      que: 'La tiroides produce demasiada hormona y el metabolismo se acelera. Causa palpitaciones, baja de peso aunque se coma bien, intolerancia al calor, sudoración, temblor, nerviosismo, insomnio y deposiciones frecuentes. La causa más común es la enfermedad de Graves.',
      trat: 'Se diagnostica con exámenes de sangre (TSH, T4). Se trata con medicamentos antitiroideos, yodo radiactivo o cirugía; los betabloqueadores alivian las palpitaciones y el temblor.',
      esp: 'Médico general; endocrinólogo.',
      alarma: 'Fiebre alta, palpitaciones muy rápidas, agitación o confusión: posible “tormenta tiroidea” (urgencia).',
      src: ['mp_hipertiroidismo', 'mp_graves']
    },
    {
      id: 'anemia', n: 'Anemia por falta de hierro', urg: 2, prev: 1.0, dur: ['s', 'm'], sexF: 1.2,
      s: { fatiga: 3, palidez: 3, mareo: 2, falta_aire: 1, palpitaciones: 1, dolor_cabeza: 1, caida_pelo: 1, intolerancia_frio: 1, mareo_al_pararse: 1, reglas_abundantes: 1 },
      que: 'Faltan glóbulos rojos sanos por falta de hierro, frecuentemente por menstruaciones abundantes, embarazo, dieta pobre en hierro o pérdidas de sangre digestivas. Produce cansancio, palidez, falta de aire con el esfuerzo, mareo, palpitaciones, uñas quebradizas y antojos de hielo o tierra.',
      trat: 'Se confirma con hemograma y ferritina. Se trata con suplementos de hierro y alimentos ricos en hierro, y buscando la causa de la pérdida (especialmente en hombres y en mujeres después de la menopausia).',
      esp: 'Médico general; hematólogo o gastroenterólogo según la causa.',
      alarma: 'Dolor de pecho, falta de aire en reposo, desmayo, o deposiciones negras o con sangre.',
      src: ['mayo_anemia']
    },

    // ───────────── Ambientales / sistémicas
    {
      id: 'deshidratacion', n: 'Deshidratación', urg: 3, prev: 1.0, dur: ['h', 'd'],
      s: { sed: 3, orina_escasa: 3, mareo: 2, fatiga: 1, dolor_cabeza: 1, diarrea: 1, vomitos: 1, confusion: 1, ctx_calor: 1, mareo_al_pararse: 2 },
      que: 'El cuerpo pierde más líquido del que recibe, por vómitos, diarrea, fiebre, calor o poca ingesta. Produce sed, boca seca, orina escasa y oscura, mareo al ponerse de pie, cansancio y dolor de cabeza. Es más peligrosa en niños pequeños y adultos mayores.',
      trat: 'Leve a moderada: sales de rehidratación oral en sorbos frecuentes. Grave: sueros intravenosos en un centro de salud. Además, tratar la causa (diarrea, fiebre, calor).',
      esp: 'Médico general, o servicio de urgencia si es moderada a grave.',
      alarma: 'Confusión, somnolencia, no orinar en 8 horas o más, pulso muy rápido o desmayo.',
      src: ['mp_deshidratacion']
    },
    {
      id: 'golpe_calor', req: ['ctx_calor', 'piel_caliente_seca'], reqF: 0.3, n: 'Golpe de calor', alt: 'Insolación grave', urg: 5, prev: 0.8, dur: ['h'],
      s: { ctx_calor: 3, piel_caliente_seca: 3, confusion: 3, mareo: 2, desmayo: 2, fiebre: 2, dolor_cabeza: 1, nauseas: 1, palpitaciones: 1, convulsion: 1 },
      que: 'La temperatura del cuerpo sube peligrosamente (sobre 40 °C) porque no logra enfriarse, tras exposición a calor intenso o ejercicio en ambiente caluroso. Produce confusión, piel caliente (seca o sudorosa), mareo y náuseas, y puede llevar a convulsiones o pérdida de conciencia.',
      trat: 'Emergencia: llamar al 131, llevar a la persona a la sombra, quitarle ropa y enfriarla rápidamente con agua, paños húmedos y ventilación. Darle líquidos solo si está consciente y puede tragar.',
      esp: 'Emergencia: SAMU 131.',
      alarma: 'Confusión, convulsión o pérdida de conciencia tras exposición al calor: llama al 131.',
      src: ['mp_calor', 'minsal_calor']
    },
    {
      id: 'monoxido', req: ['ctx_brasero', 'ctx_convivientes'], reqF: 0.3, n: 'Intoxicación por monóxido de carbono', urg: 5, prev: 0.8, dur: ['h'],
      s: { ctx_brasero: 3, ctx_convivientes: 3, dolor_cabeza: 3, mareo: 2, nauseas: 2, confusion: 2, somnolencia: 2, debilidad_general: 1, desmayo: 1, vomitos: 1, dolor_cabeza_despertar: 1 },
      que: 'El monóxido de carbono es un gas sin olor ni color que se produce al quemar combustibles en braseros, estufas a gas, leña o parafina, calefones o motores en lugares mal ventilados. Causa dolor de cabeza, mareo, náuseas, debilidad, confusión y somnolencia; a menudo varias personas de la misma casa (y mascotas) se sienten mal a la vez.',
      trat: 'Salir de inmediato al aire libre, ventilar y llamar al 131. En el hospital se administra oxígeno al 100% (a veces en cámara hiperbárica). Prevención: no usar braseros en espacios cerrados, revisar los artefactos a gas y ventilar.',
      esp: 'Emergencia: SAMU 131 o servicio de urgencia.',
      alarma: 'Cualquier sospecha es una emergencia: sal al aire libre y llama al 131.',
      src: ['mp_co', 'mp_intox', 'minsal_co']
    },
    {
      id: 'hantavirus', req: ['ctx_roedores'], reqF: 0.35, n: 'Hantavirus', alt: 'Síndrome cardiopulmonar por hantavirus', urg: 5, prev: 0.7, dur: ['h', 'd'],
      s: { ctx_roedores: 3, fiebre: 3, dolor_muscular: 2, falta_aire: 2, dolor_cabeza: 1, nauseas: 1, vomitos: 1, dolor_abdominal: 1, escalofrios: 1, respiracion_rapida: 1 },
      que: 'Infección por el virus Andes, transmitido en Chile principalmente por el ratón de cola larga al inhalar polvo contaminado con su orina o heces (limpiar bodegas o cabañas cerradas, trabajos agrícolas o forestales, camping en zonas rurales). Comienza como una gripe (fiebre, dolores musculares, dolor de cabeza, a veces molestias digestivas) y puede evolucionar rápidamente a dificultad respiratoria grave y shock. La incubación puede durar hasta 6 semanas.',
      trat: 'No existe un antiviral específico: el pronóstico depende de la detección y la hospitalización precoz, con soporte en unidad de cuidados intensivos. Si tienes fiebre y estuviste expuesto/a en zona rural, consulta de inmediato y menciónalo.',
      esp: 'Servicio de urgencia de inmediato; infectólogo/UCI.',
      alarma: 'Fiebre con antecedente de exposición a roedores en zona rural, especialmente si aparece falta de aire: urgencia inmediata, llama al 131.',
      src: ['minsal_hanta', 'minsal_hanta_guia']
    },
    {
      id: 'sepsis', n: 'Sepsis', alt: 'Infección generalizada', urg: 5, prev: 0.75, dur: ['h', 'd'],
      age: [[65, 200, 1.3]],
      s: { confusion: 3, fiebre: 2, palpitaciones: 2, respiracion_rapida: 2, somnolencia: 2, escalofrios: 1, sudoracion: 1, orina_escasa: 1, labios_azules: 1, debilidad_general: 1 },
      que: 'Respuesta extrema y descontrolada del cuerpo frente a una infección, que puede dañar órganos y causar la muerte si no se trata rápido. Puede partir de una infección urinaria, pulmonar, de la piel o abdominal.',
      trat: 'Emergencia hospitalaria: antibióticos intravenosos lo antes posible, sueros, oxígeno y soporte de órganos en unidades especializadas.',
      esp: 'Emergencia: SAMU 131 o servicio de urgencia.',
      alarma: 'Infección con confusión, respiración rápida, pulso acelerado, piel fría, moteada o sudorosa, o muy poca orina: llama al 131.',
      src: ['mp_sepsis']
    },

    // ───────────── Musculoesquelético
    {
      id: 'lumbago', n: 'Lumbago', alt: 'Dolor lumbar mecánico', urg: 1, prev: 1.15, dur: ['h', 'd', 's', 'm'],
      s: { dolor_lumbar: 3, ciatica: 2, calambres: 1, esfinteres: 1 },
      que: 'Dolor en la parte baja de la espalda, muy común, generalmente por contractura o sobrecarga de músculos y ligamentos (malas posturas, esfuerzos, sedentarismo). A veces el dolor baja por la pierna (ciática) por irritación de un nervio.',
      trat: 'Mantenerse activo dentro de lo tolerable (el reposo absoluto empeora), calor local, analgésicos o antiinflamatorios por pocos días y kinesiología. La mayoría mejora en 2 a 6 semanas.',
      esp: 'Médico general; kinesiólogo; traumatólogo o fisiatra si persiste.',
      alarma: 'Pérdida de control de la orina o las deposiciones, adormecimiento en la zona genital, debilidad progresiva de las piernas, fiebre o antecedente de cáncer: urgencia.',
      src: ['mp_lumbago']
    },
    {
      id: 'gota', n: 'Gota', alt: 'Ataque de ácido úrico', urg: 3, prev: 0.95, dur: ['h', 'd'], sexM: 1.4,
      age: [[0, 29, 0.5], [40, 200, 1.2]],
      s: { articulacion_hinchada: 3, febricula: 1, ctx_alcohol: 1 },
      que: 'Artritis causada por cristales de ácido úrico en una articulación. Produce ataques súbitos de dolor intenso, hinchazón, enrojecimiento y calor, típicamente en el dedo gordo del pie y a menudo de noche. Se asocia a alcohol, carnes rojas, mariscos, bebidas azucaradas y algunos medicamentos.',
      trat: 'En la crisis: antiinflamatorios, colchicina o corticoides indicados por un médico, reposo y hielo. A largo plazo, si hay crisis repetidas, medicamentos que bajan el ácido úrico (como alopurinol) y cambios en la dieta.',
      esp: 'Médico general; reumatólogo.',
      alarma: 'Fiebre alta con la articulación caliente (hay que descartar una infección de la articulación) o si es la primera vez.',
      src: ['mayo_gota']
    },
    {
      id: 'mononucleosis', n: 'Mononucleosis infecciosa', alt: '“Enfermedad del beso”', urg: 2, prev: 0.9, dur: ['d', 's'],
      age: [[10, 30, 1.35], [40, 200, 0.5]],
      s: { ganglios: 3, fatiga: 3, dolor_garganta: 2, fiebre: 2, placas: 1, dolor_cabeza: 1, erupcion: 1, inapetencia: 1, dolor_muscular: 1 },
      que: 'Infección por el virus de Epstein-Barr, frecuente en adolescentes y adultos jóvenes. Da cansancio intenso, fiebre, dolor de garganta y ganglios inflamados en el cuello; el bazo puede agrandarse.',
      trat: 'No hay un tratamiento específico: reposo, líquidos y analgésicos. Evitar deportes de contacto por al menos 4 semanas (riesgo de rotura del bazo). Los síntomas suelen mejorar en 2 a 4 semanas, aunque el cansancio puede durar más.',
      esp: 'Médico general; infectólogo si hay complicaciones.',
      alarma: 'Dolor abdominal intenso en el lado izquierdo, o dificultad para respirar o tragar.',
      src: ['mayo_mono']
    },
    // ═════════════ Ampliación (noviembre 2026) ═════════════

    // ───────────── Respiratorio / ORL
    {
      id: 'faringitis_viral', n: 'Faringitis viral', alt: 'Dolor de garganta por virus', urg: 1, prev: 1.1, dur: ['h', 'd'],
      s: { dolor_garganta: 3, congestion: 2, tos_seca: 1, secrecion_nasal: 1, ronquera: 1, febricula: 1, fiebre: 1, dolor_cabeza: 1, ganglios: 1 },
      que: 'Inflamación de la garganta causada por virus (los mismos del resfrío o la gripe). Es la causa más frecuente de dolor de garganta y suele venir acompañada de mocos, tos o ronquera.',
      trat: 'Mejora sola en 5 a 7 días. Ayudan los líquidos tibios, las gárgaras con agua con sal, las pastillas para la garganta y el paracetamol o ibuprofeno. Los antibióticos no sirven cuando la causa es un virus.',
      esp: 'Normalmente no requiere consulta; médico general si dura más de una semana, hay fiebre alta o placas de pus.',
      alarma: 'Dificultad para respirar o para tragar saliva, babeo, imposibilidad de abrir la boca o hinchazón en el cuello.',
      src: ['mp_faringitis']
    },
    {
      id: 'laringitis', n: 'Laringitis aguda', alt: 'Disfonía; crup en niños', urg: 1, prev: 1.0, dur: ['h', 'd'],
      age: [[0, 5, 1.2]],
      s: { ronquera: 3, tos_perruna: 2, tos_seca: 2, dolor_garganta: 1, febricula: 1, estridor: 1, congestion: 1 },
      que: 'Inflamación de la laringe (donde están las cuerdas vocales), casi siempre por virus o por forzar la voz. Produce voz ronca o pérdida de la voz. En niños pequeños puede presentarse como crup: tos ronca “de perro” y ruido al respirar, peor en la noche.',
      trat: 'Reposo de la voz, líquidos, aire humidificado y evitar el humo. Los antibióticos no ayudan si es viral. En el crup, el médico puede indicar corticoides; respirar aire fresco suele aliviar.',
      esp: 'Médico general o pediatra; otorrinolaringólogo si la ronquera dura más de 3 semanas.',
      ges: 'La infección respiratoria aguda de manejo ambulatorio en menores de 5 años está cubierta por GES.',
      alarma: 'Ruido agudo al respirar estando en reposo, dificultad para respirar, babeo, labios azulados o un niño muy decaído: urgencia inmediata.',
      src: ['mp_laringitis', 'mp_crup', 'minsal_ges']
    },
    {
      id: 'bronquiolitis', n: 'Bronquiolitis', alt: 'Virus sincicial (VRS) en lactantes', urg: 3, prev: 1.0, dur: ['d'], ageRange: [0, 3],
      s: { sibilancias: 3, tos_seca: 2, respiracion_rapida: 2, congestion: 2, falta_aire: 2, secrecion_nasal: 1, febricula: 1, fiebre: 1, inapetencia: 1 },
      que: 'Infección viral de los bronquiolos (las vías aéreas más pequeñas del pulmón) que afecta a menores de 2 años, sobre todo en invierno. La causa más común es el virus respiratorio sincicial (VRS). Empieza como un resfrío y luego aparecen tos, respiración rápida y silbido al respirar.',
      trat: 'No hay un medicamento que la cure y los antibióticos no sirven. Se maneja con aseo nasal con suero, alimentación fraccionada, hidratación y vigilancia de la respiración; algunos niños necesitan oxígeno u hospitalización.',
      esp: 'Pediatra o médico general (CESFAM); urgencia si respira con dificultad.',
      ges: 'La infección respiratoria aguda de manejo ambulatorio en menores de 5 años está cubierta por GES.',
      alarma: 'Hundimiento de las costillas al respirar, quejido, pausas en la respiración, labios azulados, rechazo del alimento o un lactante menor de 3 meses con dificultad para respirar: urgencia.',
      src: ['mp_bronquiolitis', 'minsal_bronquiolitis', 'minsal_ges']
    },
    {
      id: 'coqueluche', n: 'Coqueluche', alt: 'Tos convulsiva o tos ferina', urg: 3, prev: 0.8, dur: ['d', 's'],
      s: { tos_accesos: 3, tos_prolongada: 2, vomitos: 1, congestion: 1, febricula: 1, secrecion_nasal: 1, labios_azules: 1 },
      que: 'Infección bacteriana muy contagiosa (Bordetella pertussis). Comienza como un resfrío y luego aparecen accesos de tos intensos y seguidos, que pueden terminar en un “gallito” al tomar aire o en vómito. Es especialmente peligrosa en lactantes.',
      trat: 'Se trata con antibióticos indicados por un médico, que además reducen el contagio; a veces también se trata a los contactos cercanos. La vacunación, incluida la de las embarazadas (que protege al recién nacido), es la mejor prevención.',
      esp: 'Médico general o pediatra; urgencia si es un lactante.',
      alarma: 'Lactante con pausas en la respiración, labios azulados durante la tos o que no puede alimentarse: urgencia inmediata.',
      src: ['mp_tosferina']
    },
    {
      id: 'epoc', n: 'Crisis de EPOC', alt: 'Enfermedad pulmonar obstructiva crónica', urg: 4, prev: 0.95, dur: ['d', 's', 'm'],
      age: [[0, 39, 0.3], [40, 200, 1.2]], req: ['ctx_fumador'], reqF: 0.5,
      s: { ctx_fumador: 3, falta_aire: 3, tos_flema: 2, tos_prolongada: 2, sibilancias: 2, fatiga: 1, labios_azules: 1 },
      que: 'Enfermedad crónica de los pulmones, causada principalmente por el tabaco (y también por el humo de leña), que dificulta la salida del aire. Produce falta de aire progresiva, tos con flema y silbido. Las crisis, a menudo gatilladas por infecciones, empeoran bruscamente estos síntomas.',
      trat: 'Dejar de fumar es lo más importante. Se usan inhaladores broncodilatadores, a veces corticoides, vacunas (influenza y neumococo) y rehabilitación respiratoria. En una crisis pueden requerirse antibióticos, corticoides u oxígeno.',
      esp: 'Médico general (programa respiratorio del CESFAM); broncopulmonar.',
      ges: 'La EPOC de tratamiento ambulatorio está cubierta por GES.',
      alarma: 'Falta de aire en reposo, labios azulados, confusión o somnolencia, o si los inhaladores no te alivian: urgencia.',
      src: ['mp_epoc', 'minsal_ges']
    },
    {
      id: 'tuberculosis', n: 'Tuberculosis pulmonar', alt: 'TBC', urg: 3, prev: 0.8, dur: ['s', 'm'],
      s: { tos_prolongada: 3, sudor_nocturno: 3, tos_flema: 2, perdida_peso: 2, tos_sangre: 2, fiebre: 1, febricula: 1, fatiga: 1, inapetencia: 1 },
      que: 'Infección por la bacteria Mycobacterium tuberculosis, que se transmite por el aire al toser. Avanza lentamente: tos con flema por más de 2 semanas, fiebre en las tardes, sudoración nocturna, baja de peso y decaimiento.',
      trat: 'Se diagnostica con un examen de expectoración (baciloscopía), gratuito en los centros de salud públicos. El tratamiento combina varios antibióticos durante al menos 6 meses y es gratuito para todas las personas a través del Programa de Tuberculosis del MINSAL. Completarlo es clave para curarse y no contagiar.',
      esp: 'Médico general o programa respiratorio de tu CESFAM; broncopulmonar o infectólogo.',
      alarma: 'Tos con abundante sangre o dificultad para respirar: urgencia.',
      src: ['mayo_tbc', 'minsal_tbc_epi', 'minsal_tbc']
    },
    {
      id: 'neumotorax', n: 'Neumotórax', alt: 'Pulmón colapsado', urg: 5, prev: 0.75, dur: ['h'], sexM: 1.3,
      age: [[15, 40, 1.2]],
      s: { dolor_pecho_subito_lado: 3, falta_aire: 3, dolor_pecho_respirar: 2, respiracion_rapida: 1, palpitaciones: 1, tos_seca: 1, ctx_fumador: 1, labios_azules: 1 },
      que: 'Entrada de aire en el espacio que rodea al pulmón, lo que hace que este colapse parcial o totalmente. Produce un dolor punzante súbito en un lado del pecho y falta de aire. Es más común en hombres jóvenes, altos y delgados, en fumadores y en personas con enfermedades pulmonares.',
      trat: 'Requiere evaluación urgente con radiografía. Los pequeños pueden resolverse solos con observación y oxígeno; los más grandes necesitan sacar el aire con una aguja o un tubo en el tórax y, si se repiten, cirugía.',
      esp: 'Servicio de urgencia; luego broncopulmonar o cirujano de tórax.',
      alarma: 'Falta de aire que aumenta, labios azulados, pulso muy rápido o mareo: llama al 131.',
      src: ['mp_neumotorax']
    },
    {
      id: 'otitis_externa', n: 'Otitis externa', alt: 'Oído de nadador', urg: 2, prev: 1.0, dur: ['h', 'd'],
      s: { dolor_tocar_oreja: 3, dolor_oido: 3, picazon_oido: 2, secrecion_oido: 2, ctx_agua: 2, audicion: 1, fiebre: -1 },
      que: 'Infección o inflamación del conducto auditivo externo, frecuente después de bañarse en piscina o en el mar, o por limpiar el oído con cotonitos. Duele al tocar o tirar la oreja, pica y puede salir secreción.',
      trat: 'Generalmente se trata con gotas antibióticas (a veces con corticoide) indicadas por un médico durante 7 a 14 días, analgésicos y manteniendo el oído seco. No introducir cotonitos.',
      esp: 'Médico general; otorrinolaringólogo si no mejora.',
      alarma: 'Fiebre, dolor muy intenso o hinchazón detrás de la oreja o en la cara, especialmente si tienes diabetes o defensas bajas.',
      src: ['mp_otitis_externa', 'mp_dolor_oido']
    },
    {
      id: 'tapon_cerumen', n: 'Tapón de cera', alt: 'Cerumen impactado', urg: 1, prev: 1.0, dur: ['d', 's', 'm'],
      s: { audicion: 3, zumbido: 1, picazon_oido: 1, dolor_oido: 1, mareo: 1, fiebre: -2, secrecion_oido: -1 },
      que: 'Acumulación de cera que tapa el conducto del oído. Da sensación de oído tapado, baja de la audición y, a veces, zumbido, picazón o un leve dolor. Usar cotonitos suele empujar la cera más adentro.',
      trat: 'Gotas que ablandan la cera durante algunos días; si no sale, un profesional puede hacer un lavado o una extracción. No uses cotonitos, horquillas ni “conos de vela”.',
      esp: 'Médico general; otorrinolaringólogo si se repite o hay dolor.',
      alarma: 'Pérdida súbita de audición, dolor intenso, secreción o fiebre (puede tratarse de otra causa).',
      src: ['mayo_cerumen']
    },
    {
      id: 'sordera_subita_cond', n: 'Sordera súbita', alt: 'Hipoacusia neurosensorial súbita', urg: 4, prev: 0.75, dur: ['h', 'd'],
      s: { sordera_subita: 3, zumbido: 2, audicion: 2, mareo: 1, vertigo: 1, dolor_oido: -1 },
      que: 'Pérdida rápida de la audición, generalmente en un solo oído, que aparece de golpe o en pocos días, a veces con zumbido o mareo. Muchas veces no se identifica la causa.',
      trat: 'Es una urgencia del oído: el tratamiento con corticoides funciona mejor si se inicia en los primeros días. Requiere una audiometría y, a veces, estudios de imagen.',
      esp: 'Otorrinolaringólogo con urgencia (idealmente antes de 72 horas) o servicio de urgencia.',
      alarma: 'Pérdida de audición con debilidad, dificultad para hablar o vértigo intenso: llama al 131.',
      src: ['mayo_audicion']
    },
    {
      id: 'laberintitis', n: 'Laberintitis o neuritis vestibular', alt: 'Inflamación del oído interno', urg: 3, prev: 0.9, dur: ['h', 'd', 's'],
      s: { vertigo: 3, nauseas: 2, vomitos: 2, perdida_equilibrio: 1, audicion: 1, zumbido: 1, vertigo_posicion: -1, debilidad_lado: -3, habla: -3 },
      que: 'Inflamación del oído interno o de su nervio, generalmente por un virus. Produce vértigo intenso y continuo (sientes que todo gira) que dura horas o días, con náuseas, vómitos e inestabilidad; en la laberintitis también puede bajar la audición.',
      trat: 'Medicamentos para el vértigo y las náuseas por pocos días, hidratación y, a veces, corticoides. Luego ayuda la rehabilitación vestibular (ejercicios de equilibrio). Suele mejorar en algunas semanas.',
      esp: 'Médico general u otorrinolaringólogo; urgencia si es muy intenso, para descartar otras causas.',
      alarma: 'Vértigo con dolor de cabeza intenso, visión doble, dificultad para hablar, debilidad o incapacidad para caminar: puede ser un ACV, llama al 131.',
      src: ['mp_laberintitis', 'mp_vertigo']
    },
    {
      id: 'absceso_dental', n: 'Infección dental (absceso)', alt: 'Flemón', urg: 3, prev: 1.0, dur: ['h', 'd'],
      s: { dolor_muela: 3, hinchazon_encia: 3, fiebre: 1, ganglios: 1, dolor_cara: 1 },
      que: 'Acumulación de pus en un diente o en la encía por una infección bacteriana, casi siempre por caries profundas o fracturas del diente. Produce dolor de muela pulsátil e intenso, hinchazón de la encía o de la cara y, a veces, fiebre.',
      trat: 'El dentista drena la infección y trata el diente (endodoncia o extracción); puede indicar antibióticos y analgésicos. Mientras tanto ayudan los enjuagues con agua tibia con sal. No pongas aspirina sobre la encía.',
      esp: 'Dentista (urgencia dental).',
      ges: 'La urgencia odontológica ambulatoria está cubierta por GES.',
      alarma: 'Hinchazón que se extiende al cuello o al ojo, fiebre alta, o dificultad para tragar, respirar o abrir la boca: urgencia inmediata.',
      src: ['mp_absceso_dental', 'mp_dolor_facial', 'minsal_ges']
    },
    {
      id: 'herpes_labial', n: 'Herpes labial', alt: '«Fuego» en el labio', urg: 1, prev: 1.05, dur: ['d'],
      s: { ampollas_labio: 3, hormigueo: 1, febricula: 1, ganglios: 1 },
      que: 'Infección por el virus herpes simple que provoca ampollitas dolorosas en el borde del labio, conocidas en Chile como “fuego”. Suelen anunciarse con hormigueo o ardor y reaparecen con el estrés, el sol, la fiebre o la menstruación.',
      trat: 'Desaparece sola en 7 a 10 días. Las cremas o comprimidos antivirales (como aciclovir) acortan el episodio si se usan desde el hormigueo. Evita tocar las ampollas, besar y compartir utensilios mientras estén activas.',
      esp: 'Médico general; dermatólogo si se repite muy seguido.',
      alarma: 'Lesiones cerca del ojo, en recién nacidos o en personas con defensas bajas, o que no sanan en 2 semanas.',
      src: ['mp_herpes_oral', 'mp_herpes_labial_t']
    },
    {
      id: 'aftas', n: 'Aftas bucales', alt: 'Úlceras en la boca', urg: 1, prev: 1.0, dur: ['d', 's'],
      s: { llagas_boca: 3, ctx_estres: 1, fiebre: -1 },
      que: 'Pequeñas llagas redondas, blancas o amarillentas con borde rojo, dentro de la boca. Son dolorosas pero no contagiosas, y se relacionan con pequeñas heridas, estrés, cambios hormonales o algunos alimentos.',
      trat: 'Suelen sanar solas en 1 a 2 semanas. Ayudan los enjuagues con agua con sal o bicarbonato, evitar comidas ácidas o picantes y los geles anestésicos de farmacia.',
      esp: 'Médico general o dentista si son muy grandes, frecuentes o duran más de 2 semanas.',
      alarma: 'Llagas que no sanan en 3 semanas, muy numerosas, con fiebre alta o con dificultad para tragar.',
      src: ['mp_aftas', 'mp_ulceras_bucales']
    },

    // ───────────── Ojos
    {
      id: 'orzuelo', n: 'Orzuelo', urg: 1, prev: 1.0, dur: ['d'],
      s: { bulto_parpado: 3, ojo_rojo: 1, lagrimeo: 1 },
      que: 'Bulto rojo y doloroso en el borde del párpado, causado por la infección de una glándula sebácea, habitualmente por estafilococos. Es frecuente y no es grave.',
      trat: 'Compresas tibias de 10 a 15 minutos varias veces al día. No lo aprietes ni lo revientes. Suele drenar y sanar solo en 1 a 2 semanas; a veces se indica un ungüento antibiótico.',
      esp: 'Médico general; oftalmólogo si no mejora o se repite.',
      alarma: 'Hinchazón y enrojecimiento de todo el párpado o de la cara, fiebre o alteración de la visión.',
      src: ['mp_parpado', 'mp_orzuelo_img']
    },
    {
      id: 'glaucoma_agudo', n: 'Glaucoma agudo', alt: 'Crisis de glaucoma de ángulo cerrado', urg: 5, prev: 0.7, dur: ['h'],
      age: [[0, 39, 0.4], [50, 200, 1.3]],
      s: { dolor_ojo: 3, halos: 3, vision_borrosa: 2, ojo_rojo: 2, dolor_cabeza: 1, nauseas: 1, vomitos: 1 },
      que: 'El líquido del interior del ojo no puede salir y la presión ocular sube bruscamente. Produce dolor intenso en un ojo, ojo rojo, visión borrosa, halos alrededor de las luces, dolor de cabeza y náuseas. Puede dañar el nervio óptico en pocas horas.',
      trat: 'Es una emergencia: se usan gotas y medicamentos para bajar la presión y luego un láser o una cirugía para evitar nuevas crisis.',
      esp: 'Urgencia oftalmológica inmediata; oftalmólogo.',
      alarma: 'Dolor intenso en un ojo con visión borrosa o halos: acude de inmediato a urgencia.',
      src: ['mp_glaucoma', 'mp_vision']
    },
    {
      id: 'desprendimiento_retina', n: 'Desprendimiento de retina', urg: 4, prev: 0.8, dur: ['h', 'd'],
      age: [[0, 39, 0.6], [50, 200, 1.2]],
      s: { moscas_destellos: 3, cortina_vision: 3, vision_borrosa: 2, dolor_ojo: -1 },
      que: 'La retina (la capa que capta la luz en el fondo del ojo) se separa de su lugar. Se anuncia con manchas flotantes nuevas, destellos de luz y luego una sombra o cortina que tapa parte de la visión. No duele.',
      trat: 'Requiere tratamiento rápido con láser, gas o cirugía para volver a fijar la retina; mientras antes, mejor resultado visual.',
      esp: 'Oftalmólogo dentro de 24 horas o urgencia oftalmológica.',
      ges: 'El desprendimiento de retina regmatógeno no traumático está cubierto por GES.',
      alarma: 'Una cortina o sombra en la visión, o muchas manchas nuevas con destellos: atención el mismo día.',
      src: ['mp_retina', 'minsal_ges']
    },

    // ───────────── Circulación
    {
      id: 'tvp', n: 'Trombosis venosa profunda', alt: 'Coágulo en una pierna', urg: 4, prev: 0.85, dur: ['h', 'd'],
      s: { pantorrilla: 3, ctx_inmovil: 2, hinchazon_piernas: 1, piernas_pesadas: 1 },
      que: 'Coágulo en una vena profunda, generalmente de la pierna. Produce hinchazón, dolor, calor o enrojecimiento en una sola pantorrilla o muslo. Es más probable tras cirugías, viajes largos, reposo prolongado, embarazo, anticonceptivos hormonales o cáncer.',
      trat: 'Se confirma con una ecografía doppler y se trata con anticoagulantes durante varios meses, para evitar que el coágulo crezca o viaje al pulmón.',
      esp: 'Servicio de urgencia el mismo día; luego medicina interna, hematólogo o cirujano vascular.',
      alarma: 'Falta de aire súbita, dolor de pecho o tos con sangre (el coágulo puede haber viajado al pulmón): llama al 131.',
      src: ['mp_tvp']
    },
    {
      id: 'sincope_vasovagal', n: 'Desmayo vasovagal', alt: 'Síncope vasovagal', urg: 2, prev: 1.05, dur: ['h'],
      age: [[10, 35, 1.15]],
      s: { desmayo: 3, prodromo_desmayo: 3, ctx_vasovagal: 3, mareo: 2, nauseas: 1, sudoracion: 1, palidez: 1, dolor_pecho_opresivo: -2, palpitaciones: -1, convulsion: -1 },
      que: 'Es el desmayo más común. Ocurre cuando el sistema nervioso reacciona de forma exagerada a un gatillante (ver sangre, dolor, miedo, calor o estar mucho rato de pie): bajan la presión y el pulso, y la persona pierde el conocimiento por segundos. Suele anunciarse con calor, náuseas, palidez y visión borrosa.',
      trat: 'Al sentir los síntomas, acuéstate con las piernas en alto o siéntate con la cabeza entre las rodillas. Se previene con buena hidratación y evitando los gatillantes. Por lo general no requiere tratamiento.',
      esp: 'Médico general tras el primer episodio; cardiólogo si se repite.',
      alarma: 'Desmayo durante el ejercicio o estando acostado/a, con dolor de pecho o palpitaciones, con golpe en la cabeza, convulsión o si tienes una enfermedad cardíaca: urgencia.',
      src: ['mayo_vasovagal']
    },
    {
      id: 'hipotension_ortostatica', n: 'Hipotensión ortostática', alt: 'Baja de presión al ponerse de pie', urg: 2, prev: 1.0, dur: ['h', 'd', 's', 'm'],
      age: [[65, 200, 1.3]],
      s: { mareo_al_pararse: 3, mareo: 2, vision_borrosa: 1, desmayo: 1, debilidad_general: 1, fatiga: 1 },
      que: 'Caída de la presión arterial al ponerse de pie, que produce mareo, visión borrosa o sensación de desmayo durante segundos o minutos. Es más común en mayores de 65 años y se asocia a deshidratación, reposo prolongado, algunos medicamentos (como los de la presión), diabetes o Parkinson.',
      trat: 'Levantarse lentamente, hidratarse bien y revisar con el médico los medicamentos. A veces se usan medias de compresión o medicamentos específicos.',
      esp: 'Médico general; cardiólogo o neurólogo según la causa.',
      alarma: 'Desmayos repetidos, caídas, dolor de pecho o falta de aire.',
      src: ['mayo_ortostatica']
    },
    {
      id: 'varices_cond', n: 'Várices', alt: 'Insuficiencia venosa', urg: 1, prev: 1.05, dur: ['m'], sexF: 1.3,
      age: [[0, 29, 0.6], [40, 200, 1.2]],
      s: { varices: 3, piernas_pesadas: 3, hinchazon_piernas: 2, calambres: 1, picazon_piel: 1 },
      que: 'Venas dilatadas y retorcidas en las piernas, porque sus válvulas no funcionan bien y la sangre se acumula. Producen piernas pesadas y cansadas, hinchazón al final del día, calambres y picazón. Son más frecuentes en mujeres, con la edad, el embarazo y al estar mucho tiempo de pie.',
      trat: 'Medias de compresión, elevar las piernas, caminar y mantener un peso saludable. Si molestan mucho, existen tratamientos como escleroterapia, láser o cirugía.',
      esp: 'Médico general; cirujano vascular.',
      alarma: 'Una pierna hinchada, dolorosa y caliente (posible trombosis), una herida que no cicatriza o el sangrado de una várice.',
      src: ['mp_varices', 'mp_insuf_venosa']
    },

    // ───────────── Neurológico
    {
      id: 'paralisis_bell', n: 'Parálisis facial periférica', alt: 'Parálisis de Bell', urg: 4, prev: 0.9, dur: ['h', 'd'],
      s: { paralisis_facial: 3, cara_caida: 2, dolor_oido: 1, lagrimeo: 1, debilidad_lado: -3, habla: -2, perdida_equilibrio: -2 },
      que: 'Debilidad o parálisis súbita de un lado de la cara por inflamación del nervio facial, probablemente por un virus. A diferencia del ACV, afecta también la frente (no puedes arrugarla ni cerrar bien el ojo) y no compromete los brazos ni las piernas.',
      trat: 'Corticoides, idealmente en las primeras 72 horas, a veces con antivirales, y proteger el ojo con lágrimas artificiales y parche nocturno. La mayoría se recupera en semanas a meses.',
      esp: 'Urgencia el mismo día (para descartar un ACV); luego neurólogo u otorrinolaringólogo.',
      nota: 'Toda cara caída de inicio súbito debe evaluarse de inmediato para descartar un ACV.',
      alarma: 'Debilidad de un brazo o pierna, dificultad para hablar, confusión o dolor de cabeza intenso: llama al 131.',
      src: ['mp_bell', 'mp_paralisis_facial']
    },
    {
      id: 'epilepsia', n: 'Crisis convulsiva', alt: 'Epilepsia', urg: 4, prev: 0.9, dur: ['h'],
      s: { convulsion: 3, desmayo: 2, confusion: 2, somnolencia: 1, dolor_cabeza: 1 },
      que: 'Una convulsión es una descarga eléctrica anormal en el cerebro que puede causar sacudidas, rigidez, pérdida de conciencia o episodios de desconexión. Cuando las crisis se repiten sin otra causa se habla de epilepsia. Una primera convulsión también puede deberse a fiebre, alcohol, azúcar baja, golpes o lesiones cerebrales.',
      trat: 'Durante la crisis: proteger la cabeza, poner a la persona de lado y no meter nada en su boca. Se estudia con exámenes, electroencefalograma e imágenes; la epilepsia se controla en la mayoría de los casos con medicamentos antiepilépticos.',
      esp: 'Urgencia ante una primera convulsión; luego neurólogo.',
      ges: 'La epilepsia no refractaria está cubierta por GES (desde 1 año de edad).',
      alarma: 'Convulsión que dura más de 5 minutos, una crisis tras otra sin recuperar la conciencia, primera convulsión, embarazo o lesión: llama al 131.',
      src: ['mp_convulsiones', 'mp_epilepsia', 'minsal_ges', 'who_epilepsia']
    },
    {
      id: 'hsa', n: 'Hemorragia subaracnoidea', alt: 'Rotura de un aneurisma cerebral', urg: 5, prev: 0.75, dur: ['h'],
      s: { dolor_cabeza_subito: 3, rigidez_cuello: 2, vomitos: 2, desmayo: 2, fotofobia: 1, confusion: 1, convulsion: 1, nauseas: 1 },
      que: 'Sangrado en el espacio que rodea al cerebro, casi siempre por la rotura de un aneurisma (una zona débil y dilatada de una arteria). El síntoma típico es un dolor de cabeza súbito y explosivo, “el peor de la vida”, a veces con vómitos, rigidez de cuello o pérdida de conciencia.',
      trat: 'Es una emergencia neuroquirúrgica: se diagnostica con un escáner cerebral y se trata cerrando el aneurisma (cirugía o cateterismo) y con cuidados intensivos.',
      esp: 'Emergencia: SAMU 131. Luego neurocirujano.',
      ges: 'La hemorragia subaracnoidea por rotura de aneurismas cerebrales está cubierta por GES.',
      alarma: 'Dolor de cabeza súbito e intensísimo: llama al 131 de inmediato.',
      src: ['mp_hsa', 'mp_aneurisma', 'minsal_ges']
    },
    {
      id: 'cefalea_racimos', n: 'Cefalea en racimos', urg: 2, prev: 0.8, dur: ['h', 'd', 's'], sexM: 1.4,
      s: { dolor_ojo_racimo: 3, lagrimeo: 2, congestion: 1, ojo_rojo: 1, ansiedad: 1 },
      que: 'Dolor de cabeza muy intenso alrededor o detrás de un ojo, siempre del mismo lado, que dura entre 15 minutos y 3 horas y se repite a diario durante semanas (“racimos”). Se acompaña de lagrimeo, ojo rojo y nariz tapada o goteo del mismo lado; la persona suele estar inquieta. Es más frecuente en hombres.',
      trat: 'En la crisis, oxígeno al 100% o triptanes indicados por un médico; además existen tratamientos preventivos. Conviene evitar el alcohol durante los periodos de crisis.',
      esp: 'Neurólogo.',
      alarma: 'Un primer dolor de cabeza intenso y súbito, o con fiebre, rigidez de cuello o alteraciones neurológicas: urgencia.',
      src: ['mayo_cefaleas', 'mp_racimo_img']
    },
    {
      id: 'tunel_carpiano', n: 'Síndrome del túnel carpiano', urg: 1, prev: 1.0, dur: ['s', 'm'], sexF: 1.3,
      age: [[30, 60, 1.15]],
      s: { hormigueo_mano: 3, ctx_manos: 2, hormigueo: 1 },
      que: 'Compresión del nervio mediano en la muñeca. Produce hormigueo, adormecimiento y dolor en los dedos pulgar, índice y medio, a menudo peor en la noche, y con el tiempo debilidad para agarrar cosas.',
      trat: 'Férula de muñeca en la noche, pausas y ajustes en las tareas repetitivas, antiinflamatorios y, a veces, infiltración. Si es severo o no mejora, cirugía para liberar el nervio.',
      esp: 'Médico general; traumatólogo o fisiatra; kinesiólogo o terapeuta ocupacional.',
      alarma: 'Debilidad marcada de la mano, pérdida de masa muscular en la base del pulgar o síntomas de inicio súbito.',
      src: ['mp_tunel_carpiano']
    },

    // ───────────── Salud mental y sueño
    {
      id: 'bipolar', n: 'Trastorno bipolar', alt: 'Episodio de manía o hipomanía', urg: 3, prev: 0.85, dur: ['d', 's', 'm'],
      age: [[15, 45, 1.1]],
      s: { euforia: 3, menos_sueno: 3, pensamiento_acelerado: 2, impulsividad: 2, irritabilidad: 1, tristeza: 1, ansiedad: 1 },
      que: 'Trastorno del ánimo con periodos de depresión y periodos de manía o hipomanía: ánimo eufórico o muy irritable, mucha energía, necesidad de dormir muy poco, pensamiento acelerado, hablar rápido e impulsividad (gastos, conductas de riesgo).',
      trat: 'Se trata con estabilizadores del ánimo y otros medicamentos indicados por un psiquiatra, junto con psicoterapia y rutinas regulares de sueño. El tratamiento es de largo plazo.',
      esp: 'Psiquiatra; médico general (CESFAM) como puerta de entrada.',
      ges: 'El trastorno bipolar en personas de 15 años y más está cubierto por GES.',
      alarma: 'Conductas de riesgo graves, ideas de hacerte daño, no dormir durante varios días o pérdida de contacto con la realidad: urgencia psiquiátrica.',
      src: ['mp_bipolar_t', 'sup_bipolar', 'who_mental']
    },
    {
      id: 'tept', n: 'Trastorno de estrés postraumático', alt: 'TEPT', urg: 2, prev: 0.9, dur: ['s', 'm'],
      s: { recuerdos_intrusivos: 3, ctx_trauma: 3, hipervigilancia: 2, insomnio: 2, ansiedad: 1, irritabilidad: 1, tristeza: 1, memoria: 1 },
      que: 'Afección de salud mental que aparece después de vivir o presenciar un evento traumático (accidente, violencia, abuso, desastre). Incluye recuerdos intrusivos o pesadillas, evitar lo que lo recuerda, cambios negativos en el ánimo y estar siempre en alerta o sobresaltarse con facilidad.',
      trat: 'La psicoterapia centrada en el trauma (por ejemplo, la terapia cognitivo-conductual) es el tratamiento más efectivo; algunos medicamentos ayudan con los síntomas.',
      esp: 'Psicólogo y/o psiquiatra; médico general (CESFAM) como primer paso.',
      alarma: 'Pensamientos de hacerte daño: llama al *4141 o al 131.',
      src: ['mayo_tept', 'who_tept']
    },
    {
      id: 'burnout', n: 'Agotamiento laboral (burnout)', alt: 'Desgaste profesional', urg: 2, prev: 1.0, dur: ['s', 'm'],
      age: [[0, 17, 0.5]],
      s: { agotamiento_trabajo: 3, fatiga: 2, ctx_estres: 2, insomnio: 1, irritabilidad: 1, memoria: 1, dolor_cabeza: 1, dolor_cuello: 1 },
      que: 'Estado de agotamiento físico y emocional por estrés laboral crónico no resuelto. Se caracteriza por falta de energía, distancia mental o cinismo hacia el trabajo y menor rendimiento. No es una enfermedad en sí, pero afecta la salud y puede confundirse con una depresión.',
      trat: 'Identificar las causas (carga, falta de control, desequilibrio con la vida personal), conversar con la jefatura si es posible, poner límites, dormir bien, hacer ejercicio y buscar apoyo psicológico. Si hay síntomas depresivos, requiere evaluación profesional.',
      esp: 'Psicólogo; médico general o médico del trabajo (mutualidad si es de origen laboral).',
      alarma: 'Tristeza persistente, pérdida de interés en todo o pensamientos de hacerte daño: consulta pronto o llama al *4141.',
      src: ['mayo_burnout']
    },
    {
      id: 'apnea_sueno', n: 'Apnea obstructiva del sueño', urg: 2, prev: 1.0, dur: ['s', 'm'], sexM: 1.3,
      age: [[0, 29, 0.6], [40, 200, 1.2]],
      s: { pausas_respiratorias: 3, ronquidos: 3, somnolencia_diurna: 3, dolor_cabeza_despertar: 2, fatiga: 1, memoria: 1, irritabilidad: 1, nicturia: 1 },
      que: 'La vía aérea se cierra repetidamente mientras duermes e interrumpe la respiración. Produce ronquidos fuertes, pausas respiratorias que otros notan, despertares con ahogo, sueño excesivo durante el día y dolor de cabeza al despertar. Se asocia a sobrepeso, hipertensión y riesgo cardiovascular.',
      trat: 'Se confirma con un estudio de sueño (polisomnografía). El tratamiento más eficaz es el CPAP (equipo de presión positiva); también ayudan bajar de peso, evitar el alcohol y los sedantes en la noche y dormir de lado.',
      esp: 'Médico general; broncopulmonar, otorrinolaringólogo o especialista en sueño.',
      alarma: 'Si te quedas dormido/a mientras manejas, no manejes hasta ser evaluado/a.',
      src: ['mp_apnea']
    },

    // ───────────── Digestivo
    {
      id: 'estrenimiento_cond', n: 'Estreñimiento', alt: 'Constipación', urg: 1, prev: 1.1, dur: ['d', 's', 'm'],
      s: { estrenimiento: 3, hinchazon_abdominal: 2, dolor_abdominal: 1, dolor_anal: 1, sangre_roja_defecar: 1, perdida_peso: -2, deposiciones_negras: -3 },
      que: 'Hacer menos de tres deposiciones a la semana, o deposiciones duras, secas y difíciles de expulsar. Es muy común y suele deberse a poca fibra, poco líquido, sedentarismo, algunos medicamentos o aguantar las ganas.',
      trat: 'Más fibra (frutas, verduras, legumbres, integrales), abundante agua, actividad física y un horario regular para ir al baño. Si no basta, el médico puede indicar laxantes por un tiempo.',
      esp: 'Médico general; gastroenterólogo si es persistente o hay signos de alarma.',
      alarma: 'Sangre en las deposiciones, baja de peso, dolor abdominal intenso con vómitos y sin poder eliminar gases, o un cambio del hábito intestinal después de los 50 años.',
      src: ['mp_estrenimiento']
    },
    {
      id: 'hemorroides', n: 'Hemorroides', alt: 'Almorranas', urg: 1, prev: 1.1, dur: ['d', 's', 'm'],
      s: { bulto_anal: 3, sangre_roja_defecar: 3, picazon_anal: 1, dolor_anal: 1, estrenimiento: 1 },
      que: 'Venas inflamadas en el ano o en la parte baja del recto. Producen sangre roja fresca al limpiarse, picazón, molestia y a veces un bulto. Se asocian al estreñimiento, a pujar mucho, al embarazo y a estar mucho rato sentado en el baño.',
      trat: 'Más fibra y agua, evitar pujar, baños de asiento con agua tibia y cremas de farmacia por pocos días. Si persisten, existen tratamientos como las ligaduras o la cirugía.',
      esp: 'Médico general; coloproctólogo o cirujano digestivo.',
      alarma: 'Sangrado abundante, deposiciones negras, sangre mezclada con las deposiciones, baja de peso o un bulto duro, morado y muy doloroso.',
      src: ['mp_hemorroides', 'mp_sangrado_rectal']
    },
    {
      id: 'fisura_anal', n: 'Fisura anal', urg: 2, prev: 0.95, dur: ['d', 's', 'm'],
      s: { dolor_anal: 3, sangre_roja_defecar: 2, estrenimiento: 2 },
      que: 'Pequeño desgarro en la piel del ano, casi siempre por deposiciones duras o diarrea frecuente. Causa dolor intenso al defecar, que puede durar un rato después, y un poco de sangre roja.',
      trat: 'Ablandar las deposiciones (fibra, agua y, a veces, laxantes), baños de asiento tibios y cremas indicadas por un médico. La mayoría sana en semanas; las crónicas pueden necesitar otros tratamientos o cirugía.',
      esp: 'Médico general; coloproctólogo.',
      alarma: 'Sangrado abundante, fiebre, salida de pus o dolor que no mejora en 2 a 3 semanas.',
      src: ['mp_sangrado_rectal']
    },
    {
      id: 'intolerancia_lactosa', n: 'Intolerancia a la lactosa', urg: 1, prev: 1.05, dur: ['h', 's', 'm'],
      req: ['ctx_lacteos'], reqF: 0.5,
      s: { ctx_lacteos: 3, hinchazon_abdominal: 3, diarrea: 2, dolor_abdominal: 1, nauseas: 1, fiebre: -2, deposiciones_negras: -3, diarrea_sangre: -3 },
      que: 'El intestino produce poca lactasa, la enzima que digiere el azúcar de la leche. Unas horas después de consumir lácteos aparecen gases, hinchazón, dolor tipo cólico y diarrea. No es una alergia ni es peligrosa.',
      trat: 'Reducir o evitar los lácteos con lactosa, preferir productos sin lactosa, yogur o quesos maduros (que se toleran mejor) y, si se desea, tabletas de lactasa. Cuidar el aporte de calcio.',
      esp: 'Médico general; gastroenterólogo o nutricionista.',
      alarma: 'Baja de peso, sangre en las deposiciones, fiebre o diarrea que te despierta en la noche (pueden indicar otra causa).',
      src: ['mp_lactosa', 'mayo_lactosa']
    },
    {
      id: 'celiaca', n: 'Enfermedad celíaca', alt: 'Celiaquía', urg: 2, prev: 0.9, dur: ['s', 'm'],
      s: { diarrea: 3, hinchazon_abdominal: 2, perdida_peso: 2, fatiga: 2, palidez: 1, dolor_abdominal: 1, erupcion: 1, estrenimiento: 1 },
      que: 'Enfermedad autoinmune en la que el gluten (trigo, cebada, centeno) daña el intestino delgado e impide absorber bien los nutrientes. Puede dar diarrea crónica, hinchazón, baja de peso, cansancio y anemia, aunque a veces los síntomas son leves o poco típicos.',
      trat: 'Se diagnostica con exámenes de sangre (anticuerpos) y una biopsia por endoscopía, idealmente sin haber dejado el gluten antes. El tratamiento es una dieta estricta sin gluten de por vida, con la que el intestino se recupera.',
      esp: 'Médico general; gastroenterólogo; nutricionista.',
      alarma: 'Baja de peso importante, anemia marcada, deposiciones con sangre o deshidratación.',
      src: ['mp_celiaca', 'mayo_celiaca']
    },
    {
      id: 'hepatitis_a', n: 'Hepatitis viral aguda', alt: 'Hepatitis A', urg: 3, prev: 0.85, dur: ['d', 's'],
      s: { ictericia: 3, coluria: 3, acolia: 2, fatiga: 2, nauseas: 2, dolor_hipocondrio: 2, fiebre: 1, inapetencia: 1, vomitos: 1, dolor_muscular: 1 },
      que: 'Inflamación del hígado causada por un virus. La hepatitis A se transmite por agua o alimentos contaminados con deposiciones: produce cansancio, náuseas, dolor bajo las costillas derechas y fiebre, y luego piel y ojos amarillos, orina oscura y deposiciones claras. Suele mejorar sola en algunas semanas.',
      trat: 'No tiene un tratamiento específico: reposo, buena hidratación, controles de exámenes y evitar el alcohol y los medicamentos que dañan el hígado (incluido el exceso de paracetamol). Existe vacuna. Las hepatitis B y C requieren otros estudios y tratamientos.',
      esp: 'Médico general; gastroenterólogo o hepatólogo.',
      ges: 'La hepatitis crónica por virus B está cubierta por GES.',
      alarma: 'Confusión, somnolencia, sangrados fáciles, vómitos persistentes o color amarillo muy intenso: urgencia.',
      src: ['mp_hepatitis_a_t', 'mp_hepatitis_t', 'minsal_ges', 'who_hep_a', 'who_hep_b']
    },
    {
      id: 'diverticulitis', n: 'Diverticulitis', urg: 4, prev: 0.85, dur: ['h', 'd'],
      age: [[0, 39, 0.4], [50, 200, 1.3]],
      s: { dolor_fii: 3, fiebre: 2, nauseas: 1, estrenimiento: 1, diarrea: 1, dolor_abdominal: 1, inapetencia: 1 },
      que: 'Inflamación o infección de pequeñas bolsitas (divertículos) que se forman en la pared del colon y que son muy comunes después de los 50 años. Produce dolor abajo a la izquierda del abdomen, fiebre, náuseas y cambios en las deposiciones.',
      trat: 'Los casos leves se tratan con dieta líquida o blanda por unos días y, según el caso, antibióticos. Los graves (absceso, perforación) requieren hospitalización y a veces cirugía. Después, una dieta rica en fibra.',
      esp: 'Médico general el mismo día o servicio de urgencia; gastroenterólogo o cirujano digestivo.',
      alarma: 'Dolor intenso que aumenta, abdomen duro, fiebre alta, vómitos persistentes o sangre en las deposiciones: urgencia.',
      src: ['mp_diverticulosis']
    },
    {
      id: 'eii', n: 'Enfermedad inflamatoria intestinal', alt: 'Enfermedad de Crohn o colitis ulcerosa', urg: 3, prev: 0.85, dur: ['s', 'm'],
      age: [[15, 40, 1.2]],
      s: { diarrea_sangre: 3, diarrea: 2, dolor_abdominal: 2, perdida_peso: 2, fatiga: 1, fiebre: 1, sangre_roja_defecar: 1, palidez: 1 },
      que: 'Enfermedades crónicas en que el sistema inmune inflama el intestino: la colitis ulcerosa afecta el colon y el recto; la enfermedad de Crohn puede afectar cualquier parte del tubo digestivo. Producen diarrea persistente, a menudo con sangre o mucosidad, dolor abdominal, cansancio y baja de peso, con periodos de crisis y de calma.',
      trat: 'Se diagnostica con colonoscopía y biopsias. Se trata con antiinflamatorios intestinales, corticoides, inmunosupresores o medicamentos biológicos; algunos casos requieren cirugía. El control es de largo plazo.',
      esp: 'Gastroenterólogo.',
      alarma: 'Sangrado abundante, fiebre alta, dolor abdominal intenso, abdomen hinchado o deshidratación: urgencia.',
      src: ['mp_crohn', 'mp_colitis_ulcerosa']
    },
    {
      id: 'hernia_inguinal', n: 'Hernia inguinal', urg: 2, prev: 0.95, dur: ['s', 'm'], sexM: 1.5,
      s: { bulto_ingle: 3, dolor_pelvico: 1, dolor_abdominal: 1 },
      que: 'Parte del intestino o de la grasa abdominal sale por un punto débil de la pared abdominal en la ingle, formando un bulto que aumenta al toser, pujar o estar de pie y disminuye al acostarse. Es mucho más frecuente en hombres.',
      trat: 'No se cura sola: el tratamiento definitivo es la cirugía (abierta o laparoscópica), que se programa según las molestias. Mientras tanto, evitar cargar peso y tratar el estreñimiento.',
      esp: 'Médico general; cirujano general.',
      alarma: 'Bulto duro y muy doloroso que no se puede devolver, con vómitos o abdomen hinchado (hernia atascada): urgencia inmediata.',
      src: ['mp_hernia']
    },
    {
      id: 'oxiuros', n: 'Oxiuros', alt: '«Pidulles»', urg: 1, prev: 0.95, dur: ['d', 's'],
      age: [[0, 12, 1.4], [20, 200, 0.7]],
      s: { picazon_anal: 3, insomnio: 1, irritabilidad: 1, ctx_convivientes: 1, dolor_abdominal: 1 },
      que: 'Infección por pequeños gusanos blancos (en Chile, “pidulles”), muy común en niños. El síntoma principal es la picazón anal, sobre todo en la noche, que puede alterar el sueño. Se contagia fácilmente dentro de la familia por los huevos que quedan en las manos, uñas y ropa.',
      trat: 'Antiparasitarios indicados por un médico, que suelen repetirse a las 2 semanas y darse a toda la familia. Ayuda lavarse bien las manos, cortar las uñas y lavar con agua caliente la ropa de cama y la ropa interior.',
      esp: 'Médico general o pediatra.',
      alarma: 'Dolor abdominal intenso, baja de peso o, en niñas, flujo o molestias genitales persistentes.',
      src: ['mp_oxiuros']
    },
    {
      id: 'marea_roja', n: 'Intoxicación por marea roja', alt: 'Veneno paralizante de los mariscos', urg: 5, prev: 0.75, dur: ['h'],
      req: ['ctx_mariscos'], reqF: 0.15,
      s: { ctx_mariscos: 3, hormigueo: 3, debilidad_general: 2, falta_aire: 2, nauseas: 1, vomitos: 1, mareo: 1, habla: 1, perdida_equilibrio: 1 },
      que: 'Intoxicación por comer mariscos bivalvos (choritos, almejas, machas, cholgas, ostras) contaminados con la toxina de la marea roja, presente sobre todo en el sur de Chile. Entre minutos y pocas horas después aparecen hormigueo y adormecimiento en labios, lengua y cara, que avanzan a brazos y piernas, con debilidad, dificultad para hablar y, en casos graves, parálisis respiratoria.',
      trat: 'No existe antídoto: el tratamiento es de soporte en un centro de salud, a veces con ventilación mecánica. La toxina no se destruye con la cocción, el limón ni el vinagre; compra mariscos solo en lugares autorizados y respeta las alertas sanitarias.',
      esp: 'Emergencia: SAMU 131 o servicio de urgencia de inmediato.',
      alarma: 'Hormigueo o adormecimiento de la boca después de comer mariscos: acude de inmediato a urgencia o llama al 131.',
      src: ['minsal_marea_roja', 'minsal_marea_roja_ot', 'isp_marea_roja']
    },

    // ───────────── Urinario, genital y salud sexual
    {
      id: 'hpb', n: 'Crecimiento de la próstata', alt: 'Hiperplasia prostática benigna', urg: 2, prev: 1.0, dur: ['s', 'm'], sex: 'M',
      age: [[0, 39, 0.2], [50, 200, 1.3]],
      s: { chorro_debil: 3, nicturia: 3, orinar_frecuente: 2, ardor_orinar: -1, fiebre: -2, no_puede_orinar: 1 },
      que: 'Aumento de tamaño no canceroso de la próstata, muy común en hombres mayores de 50 años. Aprieta la uretra y produce chorro débil, goteo, sensación de no vaciar la vejiga, ganas frecuentes de orinar y levantarse en la noche a orinar.',
      trat: 'Según las molestias: cambios de hábitos (menos líquido en la noche, menos cafeína y alcohol), medicamentos que relajan o reducen la próstata y, si no basta, cirugía o procedimientos endoscópicos.',
      esp: 'Médico general; urólogo.',
      ges: 'El tratamiento de la hiperplasia benigna de la próstata en personas sintomáticas está cubierto por GES.',
      alarma: 'No poder orinar, sangre en la orina, fiebre o dolor: urgencia.',
      src: ['mp_prostata', 'minsal_ges']
    },
    {
      id: 'uretritis_its', n: 'Infección de transmisión sexual (clamidia o gonorrea)', alt: 'Uretritis o cervicitis', urg: 3, prev: 0.95, dur: ['d', 's'],
      req: ['ctx_sexo'], reqF: 0.5,
      s: { ctx_sexo: 3, secrecion_uretral: 3, ardor_orinar: 2, flujo_vaginal: 2, dolor_pelvico: 1, sangrado_vaginal: 1, dolor_relaciones: 1, orinar_frecuente: 1 },
      que: 'Infecciones de transmisión sexual frecuentes, causadas por las bacterias clamidia y gonococo. En hombres dan ardor al orinar y secreción por el pene; en mujeres, flujo anormal, sangrado entre reglas o dolor pélvico. Muchas veces no dan síntomas y se transmiten sin saberlo.',
      trat: 'Se diagnostican con exámenes de orina o de secreción y se tratan con antibióticos indicados por un profesional, idealmente también a la pareja. Conviene hacerse además el test de VIH y de sífilis. El condón previene la mayoría de las ITS.',
      esp: 'Médico general, matrona, urólogo o ginecólogo/a.',
      alarma: 'Fiebre, dolor pélvico o testicular intenso, o dolor en las articulaciones con lesiones en la piel.',
      src: ['mp_uretritis', 'mp_clamidia', 'mp_its_t']
    },
    {
      id: 'herpes_genital', n: 'Herpes genital', urg: 2, prev: 0.9, dur: ['d', 's'],
      s: { ampollas_genitales: 3, ctx_sexo: 2, ardor_orinar: 1, ganglios: 1, febricula: 1, dolor_muscular: 1, picazon_genital: 1 },
      que: 'Infección de transmisión sexual por el virus herpes simple. Produce pequeñas ampollas o llagas dolorosas en los genitales o alrededor, a veces con ardor al orinar, fiebre y ganglios inflamados en la ingle. El virus queda en el cuerpo y puede reaparecer; muchas personas lo tienen sin saberlo.',
      trat: 'No tiene cura, pero los antivirales (aciclovir, valaciclovir) acortan los brotes y reducen el contagio. Evita las relaciones sexuales mientras haya lesiones y usa condón.',
      esp: 'Médico general, matrona, dermatólogo, ginecólogo/a o urólogo.',
      alarma: 'Imposibilidad de orinar, dolor de cabeza intenso con rigidez de cuello o lesiones durante el embarazo.',
      src: ['mp_ulceras_gen_h', 'mp_ulceras_gen_m', 'mp_its_t']
    },
    {
      id: 'sifilis', n: 'Sífilis', urg: 3, prev: 0.85, dur: ['d', 's', 'm'],
      s: { ulcera_genital: 3, ctx_sexo: 2, ganglios: 2, erupcion: 1, febricula: 1, lesiones_manos_pies: 1 },
      que: 'Infección de transmisión sexual causada por la bacteria Treponema pallidum. Primero aparece una llaga que no duele (chancro) en los genitales, el ano o la boca, que sana sola; semanas después puede haber erupción en el cuerpo (incluidas palmas y plantas), fiebre y ganglios. Sin tratamiento puede dañar órganos años después.',
      trat: 'Se diagnostica con un examen de sangre y se cura con penicilina inyectable indicada por un profesional. También deben estudiarse y tratarse las parejas sexuales. Es especialmente importante tratarla durante el embarazo.',
      esp: 'Médico general, matrona, dermatólogo o infectólogo.',
      alarma: 'Embarazo con sospecha de sífilis, alteraciones de la visión o síntomas neurológicos.',
      src: ['mp_sifilis', 'mp_ulceras_gen_h', 'mp_ulceras_gen_m']
    },
    {
      id: 'epididimitis', n: 'Epididimitis', alt: 'Inflamación testicular', urg: 3, prev: 0.85, dur: ['d'], sex: 'M',
      s: { dolor_testicular_gradual: 3, ardor_orinar: 2, fiebre: 1, secrecion_uretral: 1, ctx_sexo: 1, dolor_testicular: 1 },
      que: 'Inflamación del epidídimo (el conducto detrás del testículo), generalmente por una infección bacteriana: en jóvenes suele ser de transmisión sexual y en mayores, por infecciones urinarias. El dolor y la hinchazón del testículo aparecen de forma gradual, a veces con fiebre y ardor al orinar.',
      trat: 'Antibióticos indicados por un médico, analgésicos, reposo, elevar el escroto y frío local. Si es de transmisión sexual, la pareja también debe tratarse.',
      esp: 'Médico general o urgencia el mismo día; urólogo.',
      nota: 'Si el dolor testicular comenzó de golpe puede ser una torsión, que requiere urgencia inmediata.',
      alarma: 'Dolor súbito e intenso, fiebre alta o testículo muy hinchado: urgencia inmediata.',
      src: ['mp_epididimitis', 'mp_dolor_testiculo']
    },
    {
      id: 'vaginosis', n: 'Vaginosis bacteriana', urg: 2, prev: 1.0, dur: ['d', 's'], sex: 'F',
      s: { flujo_mal_olor: 3, flujo_vaginal: 2, picazon_genital: 1 },
      que: 'Desequilibrio de las bacterias normales de la vagina. Produce un flujo grisáceo o blanquecino, fluido y con olor a pescado, más notorio después de las relaciones. Es más frecuente con parejas nuevas o con duchas vaginales.',
      trat: 'Antibióticos orales, o en óvulos o cremas, indicados por un profesional. Evita las duchas vaginales.',
      esp: 'Matrona, médico general o ginecólogo/a.',
      alarma: 'Fiebre, dolor pélvico o si estás embarazada.',
      src: ['mp_flujo', 'mp_vulvovaginitis']
    },

    // ───────────── Salud de la mujer
    {
      id: 'spm', n: 'Síndrome premenstrual', urg: 1, prev: 1.05, dur: ['d', 'm'], sex: 'F', ageRange: [9, 55],
      req: ['ctx_premenstrual'], reqF: 0.4,
      s: { ctx_premenstrual: 3, sensibilidad_mamas: 2, irritabilidad: 2, hinchazon_abdominal: 1, tristeza: 1, ansiedad: 1, fatiga: 1, dolor_cabeza: 1 },
      que: 'Conjunto de síntomas físicos y emocionales que aparecen en la segunda mitad del ciclo menstrual y desaparecen 1 a 2 días después de que llega la regla: irritabilidad, cambios de ánimo, hinchazón, pechos sensibles, cansancio y dolor de cabeza.',
      trat: 'Ejercicio regular, dormir bien, reducir la sal, la cafeína y el alcohol, y analgésicos para el dolor. Si es intenso, el médico puede indicar anticonceptivos hormonales u otros medicamentos.',
      esp: 'Matrona, médico general o ginecólogo/a.',
      alarma: 'Síntomas emocionales tan intensos que afectan tu vida, o pensamientos de hacerte daño.',
      src: ['mp_spm']
    },
    {
      id: 'menopausia', n: 'Climaterio o menopausia', urg: 1, prev: 1.0, dur: ['s', 'm'], sex: 'F',
      age: [[0, 39, 0.2], [40, 44, 0.7], [45, 58, 1.4]],
      s: { bochornos: 3, reglas_irregulares: 3, insomnio: 2, irritabilidad: 1, tristeza: 1, sudoracion: 1, dolor_relaciones: 1, memoria: 1 },
      que: 'Etapa en que los ovarios dejan de producir hormonas y terminan las menstruaciones, habitualmente entre los 45 y 55 años. En los años previos (climaterio) las reglas se vuelven irregulares y aparecen bochornos, sudores nocturnos, alteraciones del sueño y del ánimo, y sequedad vaginal.',
      trat: 'Medidas de estilo de vida: ropa en capas, ambiente fresco, evitar gatillantes como el alcohol, la cafeína y los picantes, y hacer ejercicio. Si los síntomas son intensos, la terapia hormonal u otros medicamentos pueden ayudar; se decide con un profesional según los riesgos de cada persona.',
      esp: 'Matrona, médico general o ginecólogo/a.',
      alarma: 'Sangrado vaginal después de un año sin reglas, o sangrado muy abundante.',
      src: ['mp_menopausia', 'mp_menopausia_casa']
    },
    {
      id: 'torsion_ovarica', n: 'Quiste o torsión de ovario', urg: 4, prev: 0.85, dur: ['h', 'd'], sex: 'F', ageRange: [9, 60],
      s: { dolor_pelvico: 3, dolor_abdominal_intenso: 2, nauseas: 2, vomitos: 2, fiebre: -1 },
      que: 'Los quistes de ovario son frecuentes y casi siempre inofensivos, pero pueden romperse o hacer que el ovario se tuerza sobre sí mismo (torsión) y se corte su irrigación. Esto provoca un dolor pélvico súbito e intenso en un lado, a menudo con náuseas y vómitos.',
      trat: 'Requiere evaluación urgente con ecografía. La torsión es una urgencia quirúrgica para salvar el ovario; un quiste roto puede manejarse con analgésicos y observación o requerir cirugía si hay sangrado.',
      esp: 'Urgencia ginecológica; ginecólogo/a.',
      alarma: 'Dolor pélvico súbito e intenso, mareo o desmayo: urgencia inmediata (también hay que descartar un embarazo ectópico).',
      src: ['mp_quistes_ovaricos']
    },
    {
      id: 'epi', n: 'Enfermedad inflamatoria pélvica', alt: 'EIP', urg: 3, prev: 0.85, dur: ['d', 's'], sex: 'F', ageRange: [12, 55],
      s: { dolor_pelvico: 3, fiebre: 2, flujo_vaginal: 2, dolor_relaciones: 2, sangrado_vaginal: 1, ardor_orinar: 1, ctx_sexo: 1 },
      que: 'Infección del útero, las trompas o los ovarios, generalmente por bacterias de transmisión sexual (clamidia, gonorrea) que suben desde la vagina. Produce dolor en la parte baja del abdomen, fiebre, flujo anormal, dolor en las relaciones y sangrado irregular. Sin tratamiento puede causar infertilidad.',
      trat: 'Antibióticos indicados por un profesional (a veces con hospitalización), tratamiento de la pareja y abstención sexual hasta terminarlo.',
      esp: 'Ginecólogo/a o médico general; urgencia si hay fiebre alta o dolor intenso.',
      alarma: 'Fiebre alta, dolor intenso, vómitos o sospecha de embarazo: urgencia.',
      src: ['mp_epi']
    },
    {
      id: 'preeclampsia', n: 'Preeclampsia', alt: 'Presión alta en el embarazo', urg: 5, prev: 0.85, dur: ['h', 'd'], sex: 'F', preg: true, ageRange: [11, 55],
      req: ['ctx_embarazo20'], reqF: 0.35,
      s: { ctx_embarazo20: 3, hinchazon_cara_manos: 3, dolor_cabeza: 2, vision_borrosa: 2, dolor_epigastrio: 2, presion_alta: 2, nauseas: 1, falta_aire: 1, aumento_peso: 1 },
      que: 'Complicación del embarazo (desde las 20 semanas y hasta 6 semanas después del parto) con presión arterial alta y daño en órganos como los riñones o el hígado. Puede dar dolor de cabeza persistente, visión borrosa o con luces, hinchazón de la cara y las manos, dolor en la boca del estómago y aumento rápido de peso.',
      trat: 'Requiere control urgente de la presión y exámenes. Según la gravedad y las semanas de embarazo se usan medicamentos para la presión, sulfato de magnesio para prevenir convulsiones y, muchas veces, se adelanta el parto.',
      esp: 'Urgencia obstétrica (maternidad); obstetra.',
      alarma: 'Dolor de cabeza intenso, alteraciones de la visión, dolor en la boca del estómago, falta de aire o convulsión durante el embarazo o el posparto: llama al 131 o acude a la maternidad.',
      src: ['mp_eclampsia', 'mp_hta_embarazo', 'mp_preeclampsia_img']
    },
    {
      id: 'mastitis', n: 'Mastitis', alt: 'Inflamación de la mama', urg: 3, prev: 0.95, dur: ['h', 'd'], sex: 'F',
      req: ['ctx_lactancia'], reqF: 0.4,
      s: { mama_roja: 3, ctx_lactancia: 2, fiebre: 2, escalofrios: 1, dolor_muscular: 1, fatiga: 1 },
      que: 'Inflamación de la mama, casi siempre durante la lactancia, cuando un conducto se obstruye y la leche se acumula, a veces con infección. Produce una zona del pecho roja, caliente, hinchada y dolorosa, y puede dar fiebre y malestar parecido a una gripe.',
      trat: 'Seguir amamantando o extrayendo leche (es seguro para la guagua), aplicar frío o calor según alivie, analgésicos como ibuprofeno y reposo. Si hay fiebre o no mejora en 24 horas, el médico puede indicar antibióticos compatibles con la lactancia.',
      esp: 'Matrona, médico general o ginecólogo/a.',
      alarma: 'Fiebre alta persistente, un bulto duro que no disminuye (posible absceso) o enrojecimiento que avanza rápido.',
      src: ['mp_mastitis_img', 'mp_dolor_mamas']
    },

    // ───────────── Piel
    {
      id: 'dermatitis_atopica', n: 'Dermatitis atópica', alt: 'Eccema', urg: 1, prev: 1.05, dur: ['d', 's', 'm'],
      age: [[0, 12, 1.3]],
      s: { eccema: 3, picazon_piel: 3, piel_seca: 2, erupcion: 1, insomnio: 1 },
      que: 'Enfermedad crónica de la piel que produce zonas secas, rojas, ásperas y con mucha picazón, típicamente en los pliegues de codos, rodillas y cuello. Es común en niños y en personas con asma o rinitis alérgica, y tiene periodos de crisis y de calma. No es contagiosa.',
      trat: 'Hidratar la piel a diario con cremas emolientes, baños cortos con agua tibia, jabones suaves y ropa de algodón. En las crisis se usan cremas con corticoides u otros antiinflamatorios indicados por un médico; los casos severos tienen tratamientos especiales.',
      esp: 'Médico general o pediatra; dermatólogo.',
      alarma: 'Lesiones con pus, costras amarillas, ampollas dolorosas o fiebre (posible infección).',
      src: ['mp_dermatitis_atopica']
    },
    {
      id: 'dermatitis_contacto', n: 'Dermatitis de contacto', urg: 1, prev: 1.0, dur: ['h', 'd', 's'],
      req: ['ctx_irritante'], reqF: 0.5,
      s: { ctx_irritante: 3, erupcion: 2, picazon_piel: 2, eccema: 1 },
      que: 'Inflamación de la piel en la zona que tocó una sustancia irritante o que te da alergia: detergentes, cosméticos, tinturas, metales como el níquel (aros, hebillas) o plantas. Aparecen enrojecimiento, picazón y a veces ampollitas, con la forma del contacto.',
      trat: 'Identificar y evitar la sustancia, lavar la piel con agua y jabón suave, compresas frías y cremas con corticoides o antihistamínicos según indicación. Suele mejorar en 2 a 3 semanas.',
      esp: 'Médico general; dermatólogo (puede hacer pruebas de parche).',
      alarma: 'Compromiso extenso, de la cara o los ojos, hinchazón de labios o dificultad para respirar.',
      src: ['mp_dermatitis_contacto']
    },
    {
      id: 'psoriasis', n: 'Psoriasis', urg: 2, prev: 0.95, dur: ['s', 'm'],
      s: { placas_escamas: 3, picazon_piel: 1, articulaciones_manos: 1, piel_seca: 1 },
      que: 'Enfermedad crónica inflamatoria de la piel, no contagiosa, que produce placas rojas y gruesas cubiertas de escamas plateadas, sobre todo en codos, rodillas, cuero cabelludo y espalda baja; puede afectar las uñas y, en algunas personas, las articulaciones (artritis psoriásica).',
      trat: 'Cremas con corticoides o derivados de la vitamina D, fototerapia y, en casos moderados a severos, medicamentos orales o biológicos. No tiene cura, pero se controla bien con tratamiento.',
      esp: 'Dermatólogo; reumatólogo si hay dolor en las articulaciones.',
      alarma: 'Enrojecimiento de casi toda la piel, fiebre o pústulas extensas: urgencia dermatológica.',
      src: ['mp_psoriasis', 'mp_escamas']
    },
    {
      id: 'sarna', n: 'Sarna', alt: 'Escabiosis', urg: 2, prev: 0.95, dur: ['d', 's'],
      s: { picazon_nocturna: 3, surcos_dedos: 3, picazon_piel: 2, ctx_convivientes: 2, erupcion: 1 },
      que: 'Infestación de la piel por un ácaro diminuto que se transmite por contacto directo piel con piel. Produce una picazón muy intensa que empeora en la noche y granitos o pequeños surcos entre los dedos, en muñecas, axilas, cintura y genitales. Suele afectar a varias personas de la misma casa.',
      trat: 'Cremas o lociones escabicidas (como la permetrina) o comprimidos indicados por un médico, aplicados a todos los convivientes al mismo tiempo. Lavar con agua caliente la ropa y la ropa de cama de los últimos días. La picazón puede durar semanas después del tratamiento.',
      esp: 'Médico general; dermatólogo.',
      alarma: 'Costras gruesas extensas, lesiones infectadas con pus o fiebre.',
      src: ['mp_sarna']
    },
    {
      id: 'varicela', n: 'Varicela', alt: '«Peste cristal»', urg: 2, prev: 0.85, dur: ['d'],
      age: [[0, 14, 1.3], [25, 200, 0.7]],
      s: { ampollas_cuerpo: 3, fiebre: 2, picazon_piel: 2, fatiga: 1, dolor_cabeza: 1, ctx_contagio: 1 },
      que: 'Infección muy contagiosa por el virus varicela-zóster, conocida en Chile como “peste cristal”. Tras uno o dos días de fiebre y malestar aparecen manchitas rojas que se convierten en ampollas con mucha picazón y luego en costras, en distintas etapas a la vez. Hoy es menos frecuente gracias a la vacuna.',
      trat: 'En niños sanos se maneja en casa con paracetamol (nunca aspirina), antihistamínicos, baños tibios y uñas cortas. En adolescentes, adultos, embarazadas o personas con defensas bajas el médico puede indicar antivirales. Contagia hasta que todas las lesiones están en costra.',
      esp: 'Médico general o pediatra.',
      alarma: 'Dificultad para respirar, confusión, rigidez de cuello, lesiones con pus o muy dolorosas, o embarazo: urgencia.',
      src: ['mp_varicela', 'mp_vesiculas']
    },
    {
      id: 'pie_atleta_cond', n: 'Pie de atleta', alt: 'Hongos en los pies (tiña)', urg: 1, prev: 1.05, dur: ['d', 's', 'm'],
      s: { pie_atleta: 3, picazon_piel: 1, ctx_agua: 1 },
      que: 'Infección por hongos de la piel de los pies, favorecida por la humedad, el calor y los camarines o piscinas. Produce picazón y piel agrietada, escamosa o blanquecina entre los dedos, a veces con mal olor.',
      trat: 'Cremas o polvos antimicóticos de farmacia por 2 a 4 semanas, secar bien entre los dedos, calcetines de algodón, alternar el calzado y usar chalas en duchas comunes.',
      esp: 'Médico general o dermatólogo si no mejora en 2 a 4 semanas.',
      alarma: 'Pie rojo, caliente e hinchado o fiebre (posible infección bacteriana), sobre todo si tienes diabetes.',
      src: ['mp_pie_atleta', 'mp_tina']
    },
    {
      id: 'forunculo', n: 'Forúnculo', alt: 'Absceso en la piel', urg: 2, prev: 1.0, dur: ['d'],
      s: { bulto_pus: 3, fiebre: 1, ganglios: 1, piel_roja_caliente: 1 },
      que: 'Infección bacteriana (generalmente por estafilococo) de un folículo del pelo, que forma un bulto rojo, caliente y doloroso que se llena de pus. Es frecuente en axilas, glúteos, muslos y cuello.',
      trat: 'Compresas tibias varias veces al día para que drene solo; no lo aprietes ni lo revientes. Si es grande, el médico puede drenarlo y a veces indicar antibióticos.',
      esp: 'Médico general; dermatólogo si se repiten.',
      alarma: 'Fiebre, enrojecimiento que se extiende, forúnculo en la cara o en la columna, o que dura más de 2 semanas.',
      src: ['mp_forunculo', 'mp_absceso']
    },
    {
      id: 'loxoscelismo', n: 'Picadura de araña de rincón', alt: 'Loxoscelismo', urg: 4, prev: 0.85, dur: ['h', 'd'],
      req: ['ctx_arana', 'lesion_violacea'], reqF: 0.3,
      s: { ctx_arana: 3, lesion_violacea: 3, coluria: 2, fiebre: 1, nauseas: 1, vomitos: 1, dolor_muscular: 1, ictericia: 1, erupcion: 1 },
      que: 'Envenenamiento por la picadura de la araña de rincón (Loxosceles laeta), frecuente dentro de las casas en Chile. Produce dolor y ardor en el sitio de la picadura, que en horas se hincha y se transforma en una placa violácea u oscura que puede necrosarse. En un 10 a 15% de los casos hay compromiso general: fiebre, vómitos, orina oscura o con sangre e ictericia.',
      trat: 'Lavar con agua y jabón, aplicar frío local y acudir de inmediato a urgencia; si es posible, llevar la araña en un frasco. No existe un antídoto eficaz: el manejo es médico, con analgésicos, cuidados de la herida y vigilancia con exámenes durante las primeras 24 a 48 horas.',
      esp: 'Servicio de urgencia de inmediato.',
      alarma: 'Orina oscura o rojiza, fiebre, ictericia, vómitos o decaimiento después de una picadura: urgencia inmediata.',
      src: ['minsal_arana_guia', 'minsal_arana']
    },
    {
      id: 'quemadura_solar', n: 'Quemadura solar', urg: 1, prev: 1.0, dur: ['h', 'd'],
      s: { piel_roja_sol: 3, ctx_calor: 2, dolor_cabeza: 1, fiebre: 1 },
      que: 'Enrojecimiento y dolor de la piel por exposición excesiva a la radiación ultravioleta del sol. Aparece horas después: piel roja, caliente, sensible y a veces con ampollas; si es extensa puede haber fiebre, escalofríos y dolor de cabeza.',
      trat: 'Compresas frías o duchas tibias, cremas hidratantes o con aloe vera, mucha agua y paracetamol o ibuprofeno. No revientes las ampollas. Para prevenir: bloqueador FPS 30 o más, sombrero y evitar el sol del mediodía.',
      esp: 'Normalmente no requiere consulta; médico general si es extensa o con ampollas grandes.',
      alarma: 'Ampollas extensas, fiebre alta, confusión, mareo o deshidratación (posible golpe de calor).',
      src: ['mp_quemadura_solar']
    },

    // ───────────── Músculos, huesos y articulaciones
    {
      id: 'esguince', n: 'Esguince', alt: 'Torcedura de ligamentos', urg: 2, prev: 1.05, dur: ['h', 'd', 's'],
      req: ['ctx_torcedura'], reqF: 0.4,
      s: { ctx_torcedura: 3, hinchazon_moreton: 3, no_apoyar: 1, deformidad: -2 },
      que: 'Lesión de los ligamentos de una articulación (muy común en el tobillo) al torcerla o estirarla bruscamente. Produce dolor, hinchazón, moretón y dificultad para moverla o apoyar.',
      trat: 'Reposo relativo, hielo de 15 a 20 minutos varias veces al día, vendaje compresivo y elevar la extremidad durante las primeras 48 horas, más analgésicos. Luego, movilización progresiva y, a veces, kinesiología.',
      esp: 'Médico general, o urgencia si no puedes apoyar; traumatólogo y kinesiólogo.',
      alarma: 'No poder apoyar ni dar 4 pasos, deformidad, adormecimiento o dolor justo sobre el hueso (posible fractura): urgencia.',
      src: ['mp_esguince', 'mp_dolor_tobillo']
    },
    {
      id: 'fractura', n: 'Fractura', alt: 'Hueso roto', urg: 4, prev: 0.95, dur: ['h', 'd'],
      req: ['ctx_torcedura'], reqF: 0.4,
      s: { ctx_torcedura: 3, no_apoyar: 3, deformidad: 3, hinchazon_moreton: 2 },
      que: 'Rotura de un hueso, generalmente por una caída, un golpe o una torcedura fuerte. Produce dolor intenso, hinchazón, moretón, incapacidad para mover o apoyar la extremidad y, a veces, deformidad o hueso expuesto.',
      trat: 'Inmovilizar la zona sin intentar enderezarla, aplicar frío y acudir a urgencia. Se confirma con radiografía y se trata con yeso, férula o cirugía según el tipo de fractura.',
      esp: 'Servicio de urgencia; traumatólogo.',
      alarma: 'Hueso expuesto, sangrado abundante, extremidad fría, pálida o sin sensibilidad, o golpe en la cabeza, el cuello o la columna: llama al 131.',
      src: ['mp_fractura', 'mp_dolor_tobillo']
    },
    {
      id: 'hombro_doloroso', n: 'Tendinitis del hombro', alt: 'Lesión del manguito rotador', urg: 1, prev: 1.0, dur: ['d', 's', 'm'],
      age: [[40, 200, 1.2]],
      s: { dolor_hombro: 3, insomnio: 1, dolor_cuello: 1 },
      que: 'Irritación de los tendones del manguito rotador y de la bursa del hombro, por sobreuso, movimientos repetidos con el brazo en alto o el desgaste con la edad. Produce dolor al levantar el brazo o al dormir sobre ese lado, y debilidad.',
      trat: 'Reposo relativo de los movimientos que duelen, hielo, antiinflamatorios por pocos días y kinesiología con ejercicios. A veces infiltración y, si hay una rotura importante, cirugía.',
      esp: 'Médico general; traumatólogo; kinesiólogo.',
      alarma: 'Dolor de hombro izquierdo con dolor de pecho o falta de aire (descartar un infarto), o imposibilidad total de levantar el brazo tras una caída.',
      src: ['mp_manguito']
    },
    {
      id: 'torticolis', n: 'Contractura cervical', alt: 'Tortícolis', urg: 1, prev: 1.05, dur: ['h', 'd'],
      s: { dolor_cuello: 3, dolor_cabeza: 1, ctx_estres: 1, rigidez_cuello: -1, fiebre: -2 },
      que: 'Contractura de los músculos del cuello que produce dolor y dificultad para girar la cabeza, a menudo al despertar, por una mala postura al dormir, estrés o esfuerzos.',
      trat: 'Calor local, analgésicos o antiinflamatorios por pocos días, estiramientos suaves y mantener el movimiento dentro de lo tolerable. Suele mejorar en pocos días o una semana.',
      esp: 'Médico general; kinesiólogo.',
      alarma: 'Dolor de cuello con fiebre y dolor de cabeza intenso, después de un golpe, o con hormigueo o debilidad en los brazos: urgencia.',
      src: ['mp_torticolis']
    },
    {
      id: 'artrosis', n: 'Artrosis', alt: 'Osteoartritis', urg: 1, prev: 1.1, dur: ['m'],
      age: [[0, 39, 0.3], [55, 200, 1.35]],
      s: { dolor_rodilla_cadera: 3, rigidez_matinal: 1, articulacion_hinchada: 1 },
      que: 'Desgaste del cartílago de las articulaciones, la forma más común de artritis y muy ligada a la edad. Produce dolor que empeora con el uso y mejora con el reposo, rigidez breve al levantarse y pérdida de movilidad, sobre todo en rodillas, caderas, manos y columna.',
      trat: 'Ejercicio adaptado y kinesiología, control del peso, calor local y analgésicos o antiinflamatorios según indicación. En casos avanzados, infiltraciones o prótesis.',
      esp: 'Médico general; traumatólogo, reumatólogo o fisiatra; kinesiólogo.',
      ges: 'El tratamiento médico de la artrosis de cadera o rodilla leve o moderada en personas de 55 años y más está cubierto por GES.',
      alarma: 'Articulación roja, caliente y muy hinchada con fiebre (posible infección).',
      src: ['mp_artritis', 'mp_osteoartritis', 'minsal_ges']
    },
    {
      id: 'artritis_reumatoide', n: 'Artritis reumatoide', urg: 2, prev: 0.9, dur: ['s', 'm'], sexF: 1.4,
      age: [[30, 60, 1.15]],
      s: { articulaciones_manos: 3, rigidez_matinal: 3, fatiga: 2, articulacion_hinchada: 1, febricula: 1, dolor_articular: 1 },
      que: 'Enfermedad autoinmune en la que el sistema inmune ataca las articulaciones. Produce dolor, hinchazón y rigidez de varias articulaciones a la vez, típicamente de las manos y muñecas de ambos lados, con rigidez matinal de más de una hora y cansancio. Es más frecuente en mujeres.',
      trat: 'El tratamiento temprano con medicamentos modificadores de la enfermedad (como el metotrexato) indicados por un reumatólogo evita el daño de las articulaciones; se complementa con antiinflamatorios, ejercicio y terapia ocupacional.',
      esp: 'Reumatólogo (con derivación del médico general).',
      ges: 'La artritis reumatoide está cubierta por GES.',
      alarma: 'Fiebre alta, una articulación muy roja y caliente, o falta de aire.',
      src: ['mp_ar', 'minsal_ges']
    },
    {
      id: 'fibromialgia', n: 'Fibromialgia', urg: 1, prev: 0.95, dur: ['m'], sexF: 1.4,
      s: { dolor_generalizado: 3, fatiga: 2, insomnio: 2, memoria: 1, dolor_cabeza: 1, tristeza: 1, ansiedad: 1 },
      que: 'Trastorno crónico con dolor generalizado en músculos y articulaciones durante meses, acompañado de cansancio, sueño no reparador, problemas de concentración (“niebla mental”) y, a menudo, ánimo bajo. Es más frecuente en mujeres; los exámenes suelen salir normales.',
      trat: 'El ejercicio aeróbico regular y progresivo es el tratamiento más eficaz, junto con higiene del sueño, manejo del estrés y psicoterapia. Algunos medicamentos ayudan con el dolor y el sueño.',
      esp: 'Médico general; reumatólogo; equipo de salud mental y kinesiólogo.',
      alarma: 'Fiebre, baja de peso, articulaciones hinchadas o debilidad real (sugieren otra causa).',
      src: ['mp_fibromialgia']
    },
    {
      id: 'fascitis_plantar', n: 'Fascitis plantar', alt: 'Dolor de talón', urg: 1, prev: 1.0, dur: ['s', 'm'],
      age: [[35, 65, 1.2]],
      s: { dolor_talon: 3 },
      que: 'Inflamación de la fascia plantar, la banda que va del talón a los dedos. Produce dolor en el talón, sobre todo en los primeros pasos de la mañana o al levantarse después de estar sentado. Se asocia al sobrepeso, a estar mucho de pie, a correr y al calzado inadecuado.',
      trat: 'Estiramientos de la pantorrilla y la planta del pie, hielo, calzado con buen soporte o plantillas, reducir el impacto y analgésicos por pocos días. La mayoría mejora en algunos meses; a veces se usan férulas nocturnas o infiltraciones.',
      esp: 'Médico general; traumatólogo; kinesiólogo o podólogo.',
      alarma: 'Dolor tras una caída o un golpe fuerte, talón hinchado y caliente, o adormecimiento del pie.',
      src: ['mp_dolor_talon', 'mp_dolor_pie']
    },
    // ═════════════ Segunda ampliación (noviembre 2026): OMS, OPS, MINSAL y clínicas chilenas ═════════════

    // ───────────── Infecciones (OMS / OPS / MINSAL)
    {
      id: 'dengue', n: 'Dengue', urg: 3, prev: 0.8, dur: ['d'],
      req: ['ctx_viaje_tropical'], reqF: 0.3,
      s: { ctx_viaje_tropical: 3, fiebre: 3, dolor_retroocular: 3, dolor_muscular: 2, dolor_articular: 2, dolor_cabeza: 2, erupcion: 1, nauseas: 1, vomitos: 1, sangrado_encias: 1, dolor_abdominal_intenso: 1 },
      que: 'Infección viral transmitida por la picadura del mosquito Aedes aegypti en zonas tropicales y subtropicales. En Chile el mosquito está presente en Rapa Nui, y en el continente los casos suelen ser importados de viajes. Produce fiebre alta de inicio brusco, dolor de cabeza y detrás de los ojos, dolores musculares y articulares intensos y a veces erupción; una minoría evoluciona a dengue grave.',
      trat: 'No hay un antiviral específico: reposo, abundante hidratación y paracetamol para la fiebre y el dolor. Evita la aspirina y el ibuprofeno porque aumentan el riesgo de sangrado. Los signos de alarma suelen aparecer cuando baja la fiebre, entre el tercer y el quinto día.',
      esp: 'Médico general el mismo día (menciona el viaje); infectólogo.',
      alarma: 'Dolor abdominal intenso, vómitos persistentes, sangrado de encías o nariz, somnolencia o irritabilidad, o mareo al ponerse de pie: urgencia inmediata (posible dengue grave).',
      src: ['who_dengue', 'mp_dengue', 'ops_dengue']
    },
    {
      id: 'malaria', n: 'Malaria', alt: 'Paludismo', urg: 4, prev: 0.7, dur: ['d', 's'],
      req: ['ctx_viaje_tropical'], reqF: 0.15,
      s: { ctx_viaje_tropical: 3, escalofrios_ciclicos: 3, fiebre: 3, sudoracion: 2, dolor_cabeza: 1, dolor_muscular: 1, nauseas: 1, vomitos: 1, fatiga: 1 },
      que: 'Enfermedad causada por parásitos (Plasmodium) que se transmiten por la picadura de mosquitos en zonas tropicales de África, Asia y América. No se transmite en Chile: se adquiere en viajes. Produce fiebre alta con escalofríos intensos y sudoración que pueden repetirse cada 1 a 3 días, dolor de cabeza y malestar, desde días hasta meses después del viaje.',
      trat: 'Es una urgencia médica: se confirma con un examen de sangre y se trata con medicamentos antipalúdicos según la especie y la zona del viaje. La malaria por P. falciparum puede agravarse en horas. Antes de viajar a zonas de riesgo, consulta por medidas de prevención.',
      esp: 'Servicio de urgencia (menciona el viaje); infectólogo o medicina del viajero.',
      alarma: 'Confusión, somnolencia, convulsiones, dificultad para respirar, orina oscura o color amarillo de la piel: llama al 131.',
      src: ['who_malaria', 'mp_malaria']
    },
    {
      id: 'sarampion', n: 'Sarampión', urg: 3, prev: 0.7, dur: ['d'],
      age: [[0, 14, 1.2]],
      s: { erupcion_cara_desciende: 3, fiebre: 3, tos_seca: 2, ojo_rojo: 2, congestion: 1, secrecion_nasal: 1, ctx_contagio: 1, ctx_viaje_tropical: 1 },
      que: 'Infección viral muy contagiosa que se transmite por el aire. Comienza con fiebre alta, tos, mocos y ojos rojos, y a los pocos días aparece una erupción de manchas rojas que parte en la cara y detrás de las orejas y baja hacia el cuerpo. Chile mantiene la eliminación del sarampión, pero se han detectado casos importados.',
      trat: 'No tiene un tratamiento específico: reposo, líquidos y paracetamol, y a veces vitamina A indicada por un médico. Si sospechas sarampión, usa mascarilla y avisa antes de llegar al centro de salud para no contagiar. La vacuna tres vírica (SRP) es gratuita y es la mejor prevención.',
      esp: 'Médico general o pediatra (avisa que sospechas sarampión y si viajaste).',
      alarma: 'Dificultad para respirar, convulsiones, somnolencia marcada o deshidratación: urgencia.',
      src: ['who_sarampion', 'mp_sarampion', 'minsal_sarampion']
    },
    {
      id: 'mpox', n: 'Mpox', alt: 'Viruela símica', urg: 3, prev: 0.75, dur: ['d', 's'],
      s: { lesiones_mpox: 3, fiebre: 2, ganglios: 2, ctx_sexo: 2, dolor_muscular: 1, dolor_cabeza: 1, fatiga: 1, dolor_anal: 1 },
      que: 'Enfermedad viral que se transmite por contacto estrecho piel con piel, incluido el contacto sexual. Produce lesiones en la piel que pasan de manchas a ampollas con pus y luego a costras (en genitales, ano, boca, cara o manos), muchas veces con fiebre, ganglios inflamados y dolores musculares.',
      trat: 'La mayoría se recupera en 2 a 4 semanas con tratamiento de los síntomas y cuidado de las lesiones. Mientras haya lesiones se debe evitar el contacto estrecho y sexual. Existe vacuna para las personas con mayor riesgo. Las personas con VIH no controlado, las embarazadas y los niños tienen más riesgo de complicaciones.',
      esp: 'Médico general, infectólogo o dermatólogo.',
      alarma: 'Lesiones en los ojos, dolor intenso, dificultad para tragar o respirar, o defensas bajas: consulta de urgencia.',
      src: ['who_mpox']
    },
    {
      id: 'vih_agudo', n: 'Infección por VIH (etapa inicial)', alt: 'Síndrome retroviral agudo', urg: 3, prev: 0.85, dur: ['d', 's'],
      age: [[15, 49, 1.1]],
      req: ['ctx_sexo'], reqF: 0.3,
      s: { ctx_sexo: 3, fiebre: 2, ganglios: 2, erupcion: 2, dolor_garganta: 1, dolor_muscular: 1, fatiga: 1, llagas_boca: 1, diarrea: 1 },
      que: 'El VIH es un virus que se transmite principalmente por relaciones sexuales sin condón, por compartir agujas o de madre a hijo. Entre 2 y 4 semanas después del contagio, muchas personas tienen un cuadro parecido a una gripe o a una mononucleosis: fiebre, ganglios inflamados, dolor de garganta, erupción y dolores musculares. Después puede pasar años sin síntomas.',
      trat: 'La única forma de saberlo es hacerse el examen: en Chile el test rápido de VIH es gratuito y confidencial en la red pública, sin orden médica, y también existe un autotest gratuito. El tratamiento antirretroviral es de por vida, permite una vida larga y, con carga viral indetectable, el virus no se transmite por vía sexual. Si tuviste una exposición de riesgo hace menos de 72 horas, consulta de inmediato por la profilaxis post exposición.',
      esp: 'Médico general, matrona o infectólogo; el test rápido se hace en CESFAM y otros centros sin orden médica.',
      ges: 'El VIH/SIDA está cubierto por GES.',
      alarma: 'Exposición de riesgo en las últimas 72 horas: consulta hoy mismo en urgencia por la profilaxis post exposición.',
      src: ['who_vih', 'minsal_vih', 'minsal_autotest_vih', 'minsal_ges']
    },
    {
      id: 'rabia_mordedura', n: 'Mordedura de animal', alt: 'Riesgo de rabia e infección', urg: 4, prev: 0.9, dur: ['h', 'd'],
      req: ['ctx_mordedura'], reqF: 0.2,
      s: { ctx_mordedura: 3, piel_roja_caliente: 1, fiebre: 1 },
      que: 'Las mordeduras o rasguños de perros, gatos u otros animales pueden infectarse y, en casos raros, transmitir la rabia, una enfermedad viral mortal una vez que aparecen los síntomas. En Chile la rabia circula sobre todo en murciélagos, por lo que cualquier contacto con un murciélago debe evaluarse.',
      trat: 'Lava de inmediato la herida con abundante agua y jabón y acude a un centro de salud: allí evalúan la herida, la necesidad de antibióticos o de vacuna antitetánica y si corresponde la vacuna antirrábica, que es gratuita en la red pública. Si el animal es ubicable, se observa durante 10 días. Las mordeduras de perro deben notificarse a la SEREMI de Salud.',
      esp: 'Servicio de urgencia o SAPU el mismo día.',
      alarma: 'Mordedura de murciélago o de un animal desconocido, heridas profundas o en la cara, cuello o manos, o signos de infección (enrojecimiento que avanza, pus, fiebre): consulta de inmediato.',
      src: ['minsal_rabia', 'isp_rabia', 'isp_murcielago']
    },
    {
      id: 'chagas', n: 'Enfermedad de Chagas', urg: 2, prev: 0.75, dur: ['s', 'm'],
      req: ['ctx_vinchuca'], reqF: 0.2,
      s: { ctx_vinchuca: 3, palpitaciones: 2, disfagia: 2, falta_aire: 1, hinchazon_piernas: 1, estrenimiento: 1, fatiga: 1, fiebre: 1 },
      que: 'Infección por el parásito Trypanosoma cruzi, transmitida por la vinchuca en zonas rurales del norte y centro de Chile, de madre a hijo o por transfusiones. La fase inicial suele pasar inadvertida; años después, una parte de las personas desarrolla daño del corazón (palpitaciones, arritmias, insuficiencia cardíaca) o del tubo digestivo (dificultad para tragar, estreñimiento crónico).',
      trat: 'Se diagnostica con un examen de sangre. El tratamiento con benznidazol o nifurtimox es más eficaz en etapas tempranas, en niños y en mujeres en edad fértil (para evitar la transmisión al bebé), y se complementa con el control de las complicaciones. Si encuentras una vinchuca, llévala al centro de salud o a la SEREMI de Salud.',
      esp: 'Médico general; infectólogo, cardiólogo o gastroenterólogo según el compromiso.',
      alarma: 'Desmayos, palpitaciones con mareo, falta de aire o dolor de pecho: urgencia.',
      src: ['who_chagas', 'mp_chagas', 'minsal_chagas', 'minsal_chagas_manual', 'ops_chagas']
    },
    {
      id: 'mano_pie_boca', n: 'Enfermedad de mano, pie y boca', urg: 1, prev: 0.95, dur: ['d'],
      age: [[0, 9, 1.4], [18, 200, 0.6]],
      s: { lesiones_manos_pies: 3, llagas_boca: 3, fiebre: 2, dolor_garganta: 1, irritabilidad: 1, inapetencia: 1 },
      que: 'Infección viral (generalmente por virus Coxsackie) frecuente en niños menores de 5 años, que se contagia fácilmente en jardines y salas cuna. Produce fiebre, dolor de garganta y llagas en la boca, y luego ampollitas o manchas en las palmas, las plantas y a veces los glúteos.',
      trat: 'Se resuelve sola en 7 a 10 días. Lo importante es aliviar el dolor con paracetamol, asegurar la hidratación con líquidos frescos y comidas blandas, y lavarse bien las manos para evitar contagios.',
      esp: 'Pediatra o médico general.',
      alarma: 'Rechazo de líquidos o signos de deshidratación, fiebre alta persistente, decaimiento marcado, rigidez de cuello o convulsiones.',
      src: ['mp_mano_pie_boca']
    },
    {
      id: 'impetigo', n: 'Impétigo', urg: 2, prev: 0.95, dur: ['d'],
      age: [[0, 12, 1.3]],
      s: { costras_miel: 3, picazon_piel: 1, erupcion: 1 },
      que: 'Infección superficial de la piel por bacterias (estreptococo o estafilococo), muy contagiosa y frecuente en niños. Aparecen ampollitas o heridas que se rompen y forman costras color miel, sobre todo alrededor de la nariz y la boca o en brazos y piernas.',
      trat: 'Lavar suavemente con agua y jabón y aplicar la crema antibiótica indicada por un médico; si es extenso, antibióticos orales. Cortar las uñas, no compartir toallas y lavarse las manos para no contagiar.',
      esp: 'Médico general o pediatra; dermatólogo si se repite.',
      alarma: 'Fiebre, lesiones que se extienden rápido o son profundas, o dolor intenso.',
      src: ['mp_impetigo']
    },

    // ───────────── Ambientales y propias de Chile
    {
      id: 'mal_altura', n: 'Mal agudo de montaña', alt: '«Puna», soroche o apunamiento', urg: 3, prev: 0.9, dur: ['h', 'd'],
      req: ['ctx_altura'], reqF: 0.15,
      s: { ctx_altura: 3, dolor_cabeza: 3, nauseas: 2, mareo: 2, insomnio: 2, fatiga: 1, vomitos: 1, inapetencia: 1, falta_aire: 1, confusion: 1, perdida_equilibrio: 1 },
      que: 'Malestar por la falta de oxígeno al subir rápido a gran altura (sobre 2.500 metros), como en el altiplano o en faenas mineras del norte. Aparece en horas: dolor de cabeza, náuseas, mareo, cansancio, falta de apetito y mal dormir. Las formas graves afectan el cerebro o los pulmones.',
      trat: 'Descansar, no seguir subiendo, hidratarse, evitar el alcohol y tomar analgésicos para el dolor de cabeza. Si no mejora o empeora, la medida principal es bajar a menor altura; a veces se usa oxígeno o medicamentos indicados por un médico. Para prevenirlo, asciende de forma gradual.',
      esp: 'Médico general o el servicio de salud de la faena; medicina del viajero o de montaña.',
      alarma: 'Confusión, dificultad para caminar o mantener el equilibrio, falta de aire en reposo o tos con espuma: baja de inmediato y pide ayuda (emergencia).',
      src: ['mp_mal_altura', 'clc_mal_altura', 'isp_altura']
    },
    {
      id: 'hipotermia', n: 'Hipotermia', urg: 5, prev: 0.75, dur: ['h'],
      age: [[0, 4, 1.2], [70, 200, 1.3]], req: ['ctx_frio', 'temblor_frio'], reqF: 0.2,
      s: { ctx_frio: 3, temblor_frio: 3, confusion: 2, somnolencia: 2, debilidad_general: 1, habla: 1, perdida_equilibrio: 1 },
      que: 'Temperatura corporal peligrosamente baja (bajo 35 °C) por exposición al frío, al agua fría, al viento o a ropa mojada. Es más frecuente en adultos mayores, niños pequeños y personas bajo los efectos del alcohol. Comienza con temblor intenso y piel fría y pálida, y luego aparecen confusión, somnolencia, torpeza y habla arrastrada; en casos graves el temblor se detiene.',
      trat: 'Llama al 131, lleva a la persona a un lugar abrigado, quítale la ropa mojada y cúbrela con mantas, incluida la cabeza. Si está consciente, dale bebidas tibias sin alcohol. No uses calor directo intenso (agua muy caliente o estufa) ni frotes la piel. En el hospital se recalienta de forma controlada.',
      esp: 'Emergencia: SAMU 131.',
      alarma: 'Confusión, somnolencia, respiración lenta o si deja de tiritar estando aún fría: llama al 131.',
      src: ['mp_hipotermia', 'minsal_frio']
    },
    {
      id: 'plaguicidas', n: 'Intoxicación por plaguicidas', urg: 5, prev: 0.75, dur: ['h'],
      req: ['ctx_plaguicidas'], reqF: 0.15,
      s: { ctx_plaguicidas: 3, salivacion: 3, nauseas: 2, vomitos: 2, dolor_cabeza: 2, mareo: 2, falta_aire: 2, diarrea: 1, debilidad_general: 1, vision_borrosa: 1, confusion: 1 },
      que: 'Intoxicación por contacto, inhalación o ingestión de plaguicidas (insecticidas, herbicidas), frecuente en trabajadores agrícolas y durante fumigaciones. Puede producir dolor de cabeza, mareo, náuseas y vómitos y, con algunos insecticidas, salivación, lagrimeo y sudoración excesivos, diarrea, visión borrosa, debilidad muscular y dificultad para respirar.',
      trat: 'Aleja a la persona de la fuente, quítale la ropa contaminada, lava su piel con abundante agua y jabón y llévala de inmediato a un centro asistencial con la etiqueta o el envase del producto. No induzcas el vómito salvo que un profesional lo indique. En Chile estos casos se notifican obligatoriamente a la SEREMI de Salud.',
      esp: 'Emergencia: SAMU 131 o servicio de urgencia.',
      alarma: 'Dificultad para respirar, convulsiones, confusión o pérdida de conciencia: llama al 131.',
      src: ['minsal_plaguicidas', 'mp_intox']
    },
    {
      id: 'intox_alcoholica', n: 'Intoxicación alcohólica aguda', urg: 4, prev: 0.9, dur: ['h'],
      req: ['ctx_alcohol_agudo'], reqF: 0.15,
      s: { ctx_alcohol_agudo: 3, vomitos: 2, confusion: 2, somnolencia: 2, mareo: 1, perdida_equilibrio: 1, habla: 1, convulsion: 1, labios_azules: 1 },
      que: 'Efecto tóxico de consumir mucho alcohol en poco tiempo. Además de la embriaguez, puede producir vómitos, confusión, somnolencia profunda, respiración lenta, hipotermia y, en casos graves, convulsiones, coma y muerte; el riesgo aumenta si se mezcla con otras drogas o medicamentos.',
      trat: 'No dejes sola a la persona. Si está somnolienta, acuéstala de lado (posición lateral de seguridad) para que no se ahogue si vomita, y abrígala. No le des café, duchas frías ni más alcohol, y no la hagas vomitar. Si no responde, respira lento o convulsiona, llama al 131.',
      esp: 'Servicio de urgencia; SENDA (fono 1412) para orientación sobre el consumo.',
      alarma: 'No despierta, respira lento o irregular, tiene los labios azulados, convulsiona o vomita estando inconsciente: llama al 131.',
      src: ['who_alcohol', 'mp_intox', 'senda']
    },
    {
      id: 'quemadura', n: 'Quemadura', urg: 3, prev: 1.0, dur: ['h', 'd'],
      req: ['ctx_quemadura', 'piel_quemada'], reqF: 0.2,
      s: { ctx_quemadura: 3, piel_quemada: 3 },
      que: 'Lesión de la piel por calor (agua o aceite caliente, fuego, superficies), electricidad, químicos o radiación. Las superficiales producen enrojecimiento y dolor; las de segundo grado, ampollas; y las profundas pueden verse blancas, cafés o negras y doler poco porque dañan los nervios.',
      trat: 'Enfría la zona con agua fresca (no helada) durante unos 10 minutos o hasta que el dolor disminuya, retira anillos o ropa que no esté pegada y cubre con un paño limpio. No uses hielo, pasta de dientes, mantequilla ni aceite, y no revientes las ampollas. Las quemaduras pequeñas y superficiales pueden manejarse en casa; las demás requieren atención.',
      esp: 'Médico general o servicio de urgencia según la extensión; unidad de quemados en casos graves.',
      ges: 'La atención del gran quemado está cubierta por GES.',
      alarma: 'Quemaduras extensas, profundas, eléctricas o químicas, en cara, manos, pies, genitales o articulaciones, en niños o adultos mayores, o si hubo inhalación de humo: urgencia o 131.',
      src: ['mayo_quemaduras', 'minsal_gran_quemado']
    },

    // ───────────── Señales de cáncer (requieren estudio, no son un diagnóstico)
    {
      id: 'cancer_mama', n: 'Bulto en la mama', alt: 'Estudio de cáncer de mama', urg: 3, prev: 0.85, dur: ['s', 'm'], sex: 'F',
      age: [[0, 29, 0.3], [40, 200, 1.3]],
      s: { bulto_mama: 3 },
      que: 'La mayoría de los bultos en la mama son benignos (quistes, fibroadenomas), pero todo bulto nuevo debe estudiarse para descartar un cáncer de mama, el cáncer más frecuente en mujeres. Son señales de alerta un bulto duro, indoloro y de bordes irregulares, cambios en la piel (hoyuelos, aspecto de piel de naranja, enrojecimiento), un pezón que se retrae o secreta sangre, y ganglios en la axila.',
      trat: 'Se estudia con examen físico, mamografía y/o ecografía y, si es necesario, biopsia. El cáncer de mama detectado a tiempo tiene muy buen pronóstico; su tratamiento combina cirugía, radioterapia y medicamentos según cada caso. Mantén tus mamografías de control según tu edad.',
      esp: 'Matrona o médico general (CESFAM) para la derivación; mastólogo o cirujano de mama.',
      ges: 'El cáncer de mama en personas de 15 años y más está cubierto por GES.',
      alarma: 'Mama roja, caliente e hinchada sin estar amamantando (puede ser una forma inflamatoria) o un bulto que crece rápido: consulta pronto.',
      src: ['mayo_bulto_mama', 'who_mama', 'minsal_ges']
    },
    {
      id: 'cancer_colorrectal', n: 'Señales de cáncer colorrectal', urg: 3, prev: 0.8, dur: ['s', 'm'],
      age: [[0, 39, 0.3], [50, 200, 1.3]],
      s: { cambio_habito: 3, sangre_roja_defecar: 2, deposiciones_negras: 2, perdida_peso: 2, palidez: 1, fatiga: 1, dolor_abdominal: 1, hinchazon_abdominal: 1 },
      que: 'Cáncer del colon o del recto, uno de los más frecuentes en adultos, sobre todo después de los 50 años. Al principio suele no dar síntomas; las señales de alerta son sangre en las deposiciones, un cambio persistente del hábito intestinal (diarrea o estreñimiento por semanas), anemia sin explicación, cansancio y baja de peso. Estos síntomas también tienen causas benignas, como las hemorroides, pero deben estudiarse.',
      trat: 'Se estudia con exámenes de deposiciones y colonoscopía, que además permite extirpar pólipos antes de que se transformen en cáncer. El tratamiento incluye cirugía y, según la etapa, quimioterapia o radioterapia. Detectado a tiempo, tiene buenas posibilidades de curación.',
      esp: 'Médico general para la derivación; gastroenterólogo o coloproctólogo.',
      ges: 'El cáncer colorrectal en personas de 15 años y más está cubierto por GES.',
      alarma: 'Sangrado abundante, o dolor abdominal intenso con vómitos sin poder eliminar gases: urgencia.',
      src: ['mp_colorrectal', 'who_cancer', 'minsal_ges']
    },
    {
      id: 'cancer_gastrico', n: 'Señales de cáncer gástrico', urg: 3, prev: 0.8, dur: ['s', 'm'], sexM: 1.3,
      age: [[0, 39, 0.3], [40, 200, 1.3]],
      s: { perdida_peso: 3, dolor_epigastrio: 2, inapetencia: 2, llenura: 2, deposiciones_negras: 2, disfagia: 2, vomitos: 1, vomito_sangre: 1, palidez: 1 },
      que: 'El cáncer de estómago es una de las principales causas de muerte por cáncer en Chile y suele detectarse tarde, porque al inicio sus síntomas se confunden con una gastritis o una úlcera: ardor o dolor en la boca del estómago, llenura rápida, falta de apetito y baja de peso. Los vómitos con sangre, las deposiciones negras o la dificultad para tragar sugieren una etapa más avanzada. La infección por Helicobacter pylori es su principal factor de riesgo.',
      trat: 'La endoscopía digestiva alta con biopsia es el examen que confirma o descarta el diagnóstico, por lo que se recomienda ante molestias persistentes, sobre todo después de los 40 años. En etapas iniciales puede curarse con cirugía o tratamiento endoscópico. Tratar el Helicobacter pylori ayuda a prevenirlo.',
      esp: 'Médico general para la derivación; gastroenterólogo (endoscopía).',
      ges: 'El cáncer gástrico está cubierto por GES.',
      alarma: 'Vómitos con sangre, deposiciones negras, dificultad para tragar o baja de peso importante: consulta pronto.',
      src: ['clc_cancer_gastrico', 'ca_hpylori', 'redsalud_gastrico', 'minsal_ges']
    },
    {
      id: 'cancer_pulmon', n: 'Señales de cáncer de pulmón', urg: 3, prev: 0.75, dur: ['s', 'm'],
      age: [[0, 39, 0.3], [55, 200, 1.3]], req: ['ctx_fumador'], reqF: 0.6,
      s: { tos_prolongada: 3, ctx_fumador: 3, tos_sangre: 2, perdida_peso: 2, falta_aire: 1, dolor_pecho_respirar: 1, ronquera: 1, fatiga: 1 },
      que: 'El cáncer de pulmón es la principal causa de muerte por cáncer en el mundo y se relaciona sobre todo con el tabaco y la contaminación del aire. Al inicio suele no dar síntomas; las señales de alerta son tos persistente o que cambia, tos con sangre, falta de aire, dolor en el pecho, ronquera y baja de peso, especialmente en fumadores o exfumadores.',
      trat: 'Se estudia con radiografía o escáner de tórax y biopsia. El tratamiento depende del tipo y la etapa: cirugía, radioterapia, quimioterapia, terapias dirigidas o inmunoterapia. Dejar de fumar reduce el riesgo a cualquier edad.',
      esp: 'Médico general para la derivación; broncopulmonar u oncólogo.',
      alarma: 'Tos con abundante sangre o falta de aire intensa: urgencia.',
      src: ['who_cancer', 'mp_cancer']
    },
    {
      id: 'melanoma', n: 'Lunar sospechoso', alt: 'Estudio de melanoma', urg: 3, prev: 0.85, dur: ['s', 'm'],
      age: [[0, 19, 0.4]],
      s: { lunar_cambia: 3, picazon_piel: 1, ctx_calor: 1 },
      que: 'El melanoma es el cáncer de piel más agresivo; se origina en las células que dan color a la piel, muchas veces en un lunar nuevo o en uno que cambia. Para revisar los lunares se usa la regla ABCDE: Asimetría, Bordes irregulares, Color no uniforme, Diámetro mayor a 6 mm y Evolución (cambios de tamaño, forma o color). También es señal de alerta un lunar que pica, sangra o se ve distinto a los demás.',
      trat: 'El dermatólogo lo evalúa con dermatoscopía y, si es sospechoso, lo extirpa para estudiarlo. Detectado a tiempo, la cirugía suele ser curativa. Para prevenirlo: bloqueador solar, evitar el sol del mediodía y no usar camas solares; revisa tus lunares una vez al mes.',
      esp: 'Dermatólogo (con derivación del médico general).',
      alarma: 'Un lunar que sangra, crece rápido o forma una herida que no sana: consulta pronto.',
      src: ['mp_melanoma', 'minsal_cancer_piel', 'clc_melanoma', 'ucc_abcde']
    },
    {
      id: 'cancer_cervicouterino', n: 'Señales de cáncer cervicouterino', urg: 3, prev: 0.8, dur: ['s', 'm'], sex: 'F',
      age: [[0, 20, 0.4], [25, 64, 1.2]],
      s: { sangrado_postcoital: 3, sangrado_vaginal: 2, flujo_mal_olor: 1, dolor_pelvico: 1, dolor_relaciones: 1 },
      que: 'Cáncer del cuello del útero, causado casi siempre por una infección persistente por el virus del papiloma humano (VPH). En etapas iniciales no da síntomas, por eso es clave el PAP o el test de VPH; más adelante puede producir sangrado después de las relaciones o entre reglas, flujo con mal olor y dolor pélvico.',
      trat: 'Las lesiones precancerosas detectadas en el PAP se tratan de forma sencilla y evitan el cáncer. El cáncer se trata con cirugía, radioterapia y quimioterapia según la etapa. La vacuna contra el VPH y el PAP periódico son la mejor prevención.',
      esp: 'Matrona (CESFAM) o ginecólogo/a.',
      ges: 'El cáncer cervicouterino está cubierto por GES.',
      alarma: 'Sangrado vaginal abundante o después de la menopausia: consulta pronto.',
      src: ['who_cervix', 'mp_sangrado_uterino', 'minsal_ges']
    },
    {
      id: 'cancer_testicular', n: 'Bulto en el testículo', alt: 'Estudio de cáncer testicular', urg: 3, prev: 0.8, dur: ['s', 'm'], sex: 'M',
      age: [[15, 40, 1.4], [50, 200, 0.4]],
      s: { bulto_testiculo: 3, dolor_testicular_gradual: 1 },
      que: 'Un bulto o endurecimiento indoloro en un testículo, o una sensación de pesadez en el escroto, debe estudiarse para descartar un cáncer testicular, más frecuente en hombres jóvenes. Es uno de los cánceres más tratables y curables.',
      trat: 'Se estudia con ecografía testicular y exámenes de sangre (marcadores tumorales). El tratamiento suele incluir la extirpación del testículo afectado y, según el caso, quimioterapia o radioterapia, con tasas de curación muy altas. Se recomienda el autoexamen mensual.',
      esp: 'Urólogo (con derivación del médico general).',
      ges: 'El cáncer de testículo está cubierto por GES.',
      alarma: 'Dolor testicular súbito e intenso (puede ser una torsión): urgencia inmediata.',
      src: ['mp_testicular', 'minsal_ges']
    },

    // ───────────── Corazón y circulación
    {
      id: 'hipertension', n: 'Hipertensión arterial', alt: 'Presión alta', urg: 2, prev: 1.05, dur: ['s', 'm'],
      age: [[0, 29, 0.5], [45, 200, 1.2]],
      s: { presion_alta_cronica: 3, dolor_cabeza_despertar: 1, mareo: 1, sangrado_nariz: 1, zumbido: 1 },
      que: 'Presión arterial elevada de forma persistente (en Chile, 140/90 mm Hg o más en mediciones repetidas). Habitualmente no da síntomas, por eso se le llama “asesina silenciosa”, y se detecta midiendo la presión. Sin tratamiento aumenta el riesgo de infarto, ACV, insuficiencia cardíaca y daño de los riñones.',
      trat: 'Cambios de estilo de vida (menos sal, más actividad física, control del peso, menos alcohol, no fumar) y, en muchos casos, medicamentos diarios. El control se hace en el Programa de Salud Cardiovascular del CESFAM.',
      esp: 'Médico general (Programa de Salud Cardiovascular); cardiólogo o internista si es difícil de controlar.',
      ges: 'La hipertensión arterial primaria en personas de 15 años y más está cubierta por GES.',
      alarma: 'Presión de 180/120 o más con dolor de pecho, falta de aire, dolor de cabeza intenso, confusión o alteración de la visión: llama al 131.',
      src: ['mp_hta', 'minsal_ges']
    },
    {
      id: 'tsvp', n: 'Taquicardia paroxística supraventricular', alt: 'Arritmia rápida', urg: 3, prev: 0.85, dur: ['h'],
      age: [[15, 50, 1.1]],
      s: { palpitaciones_subitas: 3, palpitaciones: 2, mareo: 1, falta_aire: 1, dolor_pecho_opresivo: 1, ansiedad: 1 },
      que: 'Episodios de latidos muy rápidos y regulares que empiezan y terminan de golpe, originados en las cavidades superiores del corazón. Pueden durar minutos u horas y dar palpitaciones, mareo, falta de aire o molestia en el pecho. Por lo general no es peligrosa.',
      trat: 'Algunos episodios se cortan con maniobras vagales enseñadas por un médico; si no, se usan medicamentos en urgencia. Si se repiten, la ablación por catéter suele ser curativa.',
      esp: 'Urgencia durante el episodio; cardiólogo.',
      alarma: 'Palpitaciones con dolor de pecho, desmayo, falta de aire importante o que no ceden: urgencia.',
      src: ['mp_tsvp', 'mp_arritmias']
    },
    {
      id: 'diseccion_aortica', n: 'Disección aórtica', urg: 5, prev: 0.6, dur: ['h'], sexM: 1.3,
      age: [[0, 39, 0.3], [40, 200, 1.2]],
      s: { dolor_desgarrador: 3, dolor_irradiado: 1, sudoracion: 1, desmayo: 1, debilidad_lado: 1, presion_alta: 1, falta_aire: 1 },
      que: 'Desgarro de la pared interna de la aorta, la arteria principal del cuerpo. Produce un dolor súbito, intensísimo y “desgarrador” en el pecho o la espalda, que puede desplazarse, a veces con sudoración, desmayo o síntomas de ACV. Es más frecuente en hombres de 40 a 70 años con presión alta.',
      trat: 'Es una emergencia vital: se diagnostica con escáner y se trata en el hospital con medicamentos para bajar la presión y, según el tipo, cirugía urgente o una prótesis por cateterismo.',
      esp: 'Emergencia: SAMU 131. Luego cirujano cardiovascular.',
      alarma: 'Dolor súbito y desgarrador en el pecho o la espalda: llama al 131 de inmediato.',
      src: ['mp_diseccion', 'mp_dolor_toracico']
    },
    {
      id: 'eap', n: 'Enfermedad arterial periférica', alt: 'Mala circulación de las piernas', urg: 2, prev: 0.85, dur: ['s', 'm'],
      age: [[0, 49, 0.4], [60, 200, 1.3]],
      s: { claudicacion: 3, ctx_fumador: 2, ctx_diabetes: 1, presion_alta_cronica: 1 },
      que: 'Estrechamiento de las arterias de las piernas por aterosclerosis, que reduce el flujo de sangre. El síntoma típico es dolor, calambre o cansancio en las pantorrillas al caminar, que se alivia al detenerse (claudicación). Es más frecuente en fumadores y en personas con diabetes, presión alta o colesterol alto.',
      trat: 'Dejar de fumar, caminar de forma regular y controlar la diabetes, la presión y el colesterol; medicamentos para prevenir coágulos y, en casos avanzados, procedimientos para abrir las arterias.',
      esp: 'Médico general; cirujano vascular.',
      alarma: 'Pierna o pie frío, pálido y muy doloroso de forma súbita, o heridas en los pies que no cicatrizan: urgencia.',
      src: ['mp_eap_t']
    },

    // ───────────── Neurológico
    {
      id: 'parkinson', n: 'Enfermedad de Parkinson', urg: 2, prev: 0.85, dur: ['m'],
      age: [[0, 49, 0.3], [60, 200, 1.3]],
      s: { temblor_reposo: 3, perdida_equilibrio: 1, memoria: 1, estrenimiento: 1, tristeza: 1, insomnio: 1 },
      que: 'Enfermedad neurológica progresiva por pérdida de neuronas que producen dopamina. Produce temblor en reposo (a menudo de una mano), lentitud de movimientos, rigidez, pasos cortos y problemas de equilibrio; también puede dar estreñimiento y alteraciones del sueño, del ánimo y, con los años, de la memoria. Suele comenzar después de los 60 años.',
      trat: 'No tiene cura, pero los medicamentos (como la levodopa) mejoran mucho los síntomas. Ayudan el ejercicio, la kinesiología, la fonoaudiología y la terapia ocupacional; en algunos casos se usa estimulación cerebral profunda.',
      esp: 'Neurólogo (con derivación del médico general).',
      ges: 'La enfermedad de Parkinson está cubierta por GES.',
      alarma: 'Caídas repetidas, alucinaciones, confusión súbita o dificultad para tragar.',
      src: ['mp_parkinson', 'who_parkinson', 'minsal_ges']
    },
    {
      id: 'demencia', n: 'Demencia', alt: 'Incluida la enfermedad de Alzheimer', urg: 2, prev: 0.9, dur: ['m'],
      age: [[0, 59, 0.2], [65, 200, 1.4]],
      s: { olvidos_progresivos: 3, memoria: 2, confusion: 1, irritabilidad: 1, tristeza: 1 },
      que: 'Deterioro progresivo de la memoria y de otras funciones mentales que afecta la vida diaria: olvidos de hechos recientes, repetir preguntas, perderse en lugares conocidos, dificultad para manejar dinero o tareas habituales y cambios de ánimo y de conducta. La causa más frecuente es la enfermedad de Alzheimer.',
      trat: 'Requiere evaluación para descartar causas tratables (como falta de vitamina B12, hipotiroidismo o depresión). No tiene cura, pero algunos medicamentos, la estimulación cognitiva, la actividad física y el apoyo a la familia mejoran la calidad de vida.',
      esp: 'Médico general; neurólogo, geriatra o psiquiatra.',
      ges: 'La enfermedad de Alzheimer y otras demencias están cubiertas por GES.',
      alarma: 'Confusión que aparece en horas o días (puede ser un delirium por una infección u otra causa): urgencia.',
      src: ['mp_demencia', 'who_demencia', 'minsal_ges']
    },
    {
      id: 'esclerosis_multiple', n: 'Esclerosis múltiple', urg: 3, prev: 0.75, dur: ['d', 's', 'm'], sexF: 1.4,
      age: [[15, 50, 1.2], [60, 200, 0.5]],
      s: { vision_dolor_un_ojo: 3, hormigueo: 2, perdida_equilibrio: 2, fatiga: 2, debilidad_lado: 1, vision_subita: 1, orinar_frecuente: 1 },
      que: 'Enfermedad en la que el sistema inmune ataca el cerebro y la médula espinal. Suele comenzar entre los 20 y 40 años, más en mujeres, con brotes de síntomas que duran días o semanas: visión borrosa o dolorosa de un ojo, hormigueo o adormecimiento, debilidad, problemas de equilibrio, cansancio y molestias urinarias.',
      trat: 'Los brotes se tratan con corticoides y existen medicamentos que reducen su frecuencia y la progresión; la rehabilitación ayuda a mantener la función. Requiere control con neurólogo.',
      esp: 'Neurólogo.',
      ges: 'La esclerosis múltiple remitente recurrente está cubierta por GES.',
      alarma: 'Pérdida súbita de visión, debilidad de un lado del cuerpo o dificultad para hablar: urgencia (descartar ACV).',
      src: ['who_em', 'mp_em_img', 'minsal_ges']
    },
    {
      id: 'guillain_barre', n: 'Síndrome de Guillain-Barré', urg: 5, prev: 0.65, dur: ['d'],
      s: { debilidad_ascendente: 3, hormigueo: 2, falta_aire: 1, dolor_lumbar: 1 },
      que: 'El sistema inmune ataca los nervios periféricos, a menudo semanas después de una infección respiratoria o una diarrea. Produce hormigueo y debilidad que comienzan en los pies y suben en horas o días, y pueden afectar los brazos, la cara y los músculos de la respiración.',
      trat: 'Es una urgencia: requiere hospitalización para vigilar la respiración y tratamiento con inmunoglobulina o plasmaféresis. La mayoría se recupera con rehabilitación, aunque puede tardar meses.',
      esp: 'Servicio de urgencia; neurólogo.',
      alarma: 'Debilidad que avanza rápido o dificultad para respirar, tragar o hablar: llama al 131.',
      src: ['mp_guillain', 'mp_debilidad']
    },
    {
      id: 'neuralgia_trigemino', n: 'Neuralgia del trigémino', urg: 2, prev: 0.8, dur: ['d', 's', 'm'],
      age: [[50, 200, 1.2]],
      s: { dolor_facial_electrico: 3, dolor_cara: 1 },
      que: 'Dolor intenso y breve, como una descarga eléctrica, en un lado de la cara (mejilla, mandíbula, labios o alrededor del ojo), que se desencadena al hablar, masticar, cepillarse los dientes o tocarse la cara. Suele deberse a la compresión del nervio trigémino por un vaso sanguíneo.',
      trat: 'Medicamentos indicados por un médico (como la carbamazepina) suelen controlarlo; si no responden, existen bloqueos del nervio y cirugías.',
      esp: 'Neurólogo.',
      alarma: 'Dolor facial con adormecimiento de la cara, debilidad, visión doble o pérdida de audición.',
      src: ['mp_trigemino', 'mp_dolor_facial']
    },
    {
      id: 'piernas_inquietas_cond', n: 'Síndrome de piernas inquietas', urg: 1, prev: 0.95, dur: ['s', 'm'],
      s: { piernas_inquietas: 3, insomnio: 2, somnolencia_diurna: 1, fatiga: 1 },
      que: 'Necesidad irresistible de mover las piernas, con sensaciones molestas (hormigueo, tirantez), que aparece en reposo y en la noche y se alivia al moverlas o caminar. Altera el sueño. Se asocia a falta de hierro, embarazo, enfermedad de los riñones o algunos medicamentos.',
      trat: 'Revisar el hierro (ferritina) y suplementarlo si falta, mantener buenos hábitos de sueño, hacer ejercicio moderado y evitar la cafeína, el tabaco y el alcohol en la noche. Si es intenso, existen medicamentos indicados por un médico.',
      esp: 'Médico general; neurólogo.',
      alarma: 'Debilidad real en las piernas, pérdida de sensibilidad o dolor intenso (sugieren otra causa).',
      src: ['mp_piernas_inquietas']
    },

    // ───────────── Salud mental
    {
      id: 'toc', n: 'Trastorno obsesivo-compulsivo (TOC)', urg: 2, prev: 0.9, dur: ['s', 'm'],
      s: { obsesiones: 3, ansiedad: 2, tristeza: 1 },
      que: 'Trastorno de salud mental con pensamientos, imágenes o impulsos repetitivos e indeseados (obsesiones), como miedo a contaminarse o a hacer daño, y conductas repetitivas para calmar la ansiedad (compulsiones), como lavarse las manos, revisar o contar, que consumen mucho tiempo.',
      trat: 'La terapia cognitivo-conductual con exposición y prevención de respuesta es el tratamiento más eficaz, a menudo junto con medicamentos antidepresivos indicados por un psiquiatra.',
      esp: 'Psicólogo y/o psiquiatra; médico general (CESFAM) como primer paso.',
      alarma: 'Pensamientos de hacerte daño: llama al *4141 o al 131.',
      src: ['mp_toc', 'who_mental']
    },
    {
      id: 'tdah', n: 'Trastorno por déficit de atención (TDAH)', urg: 1, prev: 0.95, dur: ['m'],
      s: { inatencion: 3, impulsividad: 1, irritabilidad: 1, memoria: 1 },
      que: 'Trastorno del neurodesarrollo que comienza en la infancia y muchas veces continúa en la adultez: dificultad para mantener la atención, organizarse y terminar tareas, distracción fácil, olvidos, impulsividad e inquietud. Algunas personas reciben el diagnóstico recién de adultas.',
      trat: 'Se diagnostica con una evaluación clínica que incluye la historia desde la niñez. El tratamiento combina psicoeducación, terapia cognitivo-conductual, estrategias de organización y, en muchos casos, medicamentos indicados por un especialista.',
      esp: 'Psiquiatra o neurólogo (infantil o de adultos); psicólogo.',
      alarma: 'Tristeza persistente, consumo de sustancias o pensamientos de hacerte daño: consulta pronto.',
      src: ['mp_tdah']
    },
    {
      id: 'tca', n: 'Trastorno de la conducta alimentaria', alt: 'Anorexia, bulimia o atracones', urg: 3, prev: 0.85, dur: ['s', 'm'], sexF: 1.3,
      age: [[12, 30, 1.3]],
      s: { conducta_alimentaria: 3, perdida_peso: 2, aumento_peso: 1, reglas_irregulares: 1, fatiga: 1, ansiedad: 1, tristeza: 1, mareo: 1 },
      que: 'Trastornos de salud mental graves en los que la comida, el peso y la imagen corporal dominan la vida: restricción extrema (anorexia), atracones seguidos de vómitos provocados, laxantes o ejercicio excesivo (bulimia), o atracones con culpa. Son más frecuentes en adolescentes y mujeres jóvenes y pueden dañar el corazón y otros órganos.',
      trat: 'Requieren un equipo de salud mental y nutrición: psicoterapia, recuperación nutricional y control médico, a veces con hospitalización. Mientras antes se traten, mejor es el resultado.',
      esp: 'Psiquiatra, psicólogo y nutricionista; médico general como primer paso.',
      alarma: 'Desmayos, palpitaciones, vómitos varias veces al día, baja de peso rápida o pensamientos de hacerte daño: consulta de urgencia o llama al *4141.',
      src: ['mp_anorexia', 'mp_bulimia']
    },
    {
      id: 'consumo_problematico', n: 'Consumo problemático de alcohol u otras drogas', urg: 2, prev: 0.95, dur: ['s', 'm'],
      s: { control_consumo: 3, ctx_alcohol: 2, irritabilidad: 1, insomnio: 1, ansiedad: 1, tristeza: 1, temblor: 1 },
      que: 'Patrón de consumo que se vuelve difícil de controlar y trae problemas de salud, familiares, laborales o legales: consumir más de lo planeado, necesitar cada vez más, intentar dejarlo sin éxito o tener síntomas de abstinencia (temblor, ansiedad, insomnio) al no consumir.',
      trat: 'Tiene tratamiento: intervenciones en atención primaria, psicoterapia, grupos de apoyo y programas ambulatorios o residenciales; algunos medicamentos ayudan a reducir el deseo o a manejar la abstinencia. En Chile, el Fono Drogas y Alcohol 1412 de SENDA orienta de forma gratuita, anónima y confidencial, las 24 horas.',
      esp: 'Médico general (CESFAM); psiquiatra o equipo de salud mental; SENDA 1412.',
      alarma: 'Temblor intenso, confusión, alucinaciones o convulsiones al dejar de beber (abstinencia grave), o pensamientos de hacerte daño: urgencia.',
      src: ['who_alcohol', 'senda']
    },

    // ───────────── Digestivo y renal
    {
      id: 'obstruccion_intestinal', n: 'Obstrucción intestinal', urg: 4, prev: 0.75, dur: ['h', 'd'],
      age: [[60, 200, 1.2]],
      s: { no_elimina_gases: 3, hinchazon_abdominal: 3, dolor_abdominal: 2, vomitos: 2, estrenimiento: 1, nauseas: 1 },
      que: 'Bloqueo del paso del contenido por el intestino, por adherencias de cirugías previas, hernias, tumores u otras causas. Produce dolor abdominal tipo cólico, guata muy hinchada, vómitos y dificultad o imposibilidad para eliminar gases y deposiciones.',
      trat: 'Requiere evaluación urgente con exámenes e imágenes. Algunas obstrucciones parciales se manejan en el hospital con ayuno, sueros y una sonda para descomprimir; otras necesitan cirugía.',
      esp: 'Servicio de urgencia; cirujano general.',
      alarma: 'Dolor intenso y constante, fiebre, vómitos que no paran o abdomen duro: urgencia inmediata.',
      src: ['mp_obstruccion']
    },
    {
      id: 'erc', n: 'Enfermedad renal crónica', urg: 2, prev: 0.85, dur: ['m'],
      age: [[0, 39, 0.4], [60, 200, 1.3]],
      s: { orina_espumosa: 2, hinchazon_piernas: 2, fatiga: 2, presion_alta_cronica: 2, ctx_diabetes: 2, nicturia: 1, inapetencia: 1, nauseas: 1, picazon_piel: 1, palidez: 1 },
      que: 'Pérdida lenta y progresiva de la función de los riñones, causada sobre todo por la diabetes y la hipertensión. Durante años no da síntomas; luego aparecen hinchazón de piernas, cansancio, orina con espuma, orinar de noche, falta de apetito, náuseas, picazón y anemia.',
      trat: 'Se detecta con exámenes de sangre (creatinina) y de orina. Controlar la presión y la diabetes, ajustar medicamentos, cuidar la dieta y evitar los antiinflamatorios ayuda a frenar su avance. En etapas avanzadas se requiere diálisis o trasplante.',
      esp: 'Médico general (Programa de Salud Cardiovascular); nefrólogo.',
      alarma: 'Orinar muy poco, falta de aire, confusión, vómitos persistentes o hinchazón importante: urgencia.',
      src: ['mp_erc']
    },
    {
      id: 'incontinencia', n: 'Incontinencia urinaria', urg: 1, prev: 1.0, dur: ['s', 'm'], sexF: 1.4,
      age: [[40, 200, 1.2]],
      s: { perdida_orina: 3, orinar_frecuente: 1, nicturia: 1 },
      que: 'Pérdida involuntaria de orina. En la de esfuerzo se escapa al toser, reír, estornudar o hacer ejercicio, por debilidad del piso pélvico (frecuente tras los embarazos y en la menopausia); en la de urgencia aparece una necesidad repentina de orinar que no se alcanza a controlar.',
      trat: 'Ejercicios del piso pélvico (Kegel) con kinesiólogo, entrenamiento de la vejiga, bajar de peso y reducir la cafeína; según el tipo, medicamentos o cirugía.',
      esp: 'Médico general o matrona; urólogo, ginecólogo/a o kinesiólogo de piso pélvico.',
      alarma: 'Pérdida de control de la orina o las deposiciones con adormecimiento en la zona genital o debilidad de las piernas: urgencia inmediata.',
      src: ['mp_incontinencia']
    },
    {
      id: 'retencion_urinaria', n: 'Retención urinaria', urg: 4, prev: 0.8, dur: ['h', 'd'], sexM: 1.5,
      age: [[60, 200, 1.3]],
      s: { no_puede_orinar: 3, dolor_pelvico: 2, chorro_debil: 1, orinar_frecuente: 1 },
      que: 'Imposibilidad de vaciar la vejiga a pesar de tener ganas, con dolor e hinchazón en la parte baja del abdomen. Es más común en hombres mayores con crecimiento de la próstata, y también puede deberse a medicamentos, estreñimiento importante, cirugías o problemas neurológicos.',
      trat: 'La retención aguda se alivia en urgencia vaciando la vejiga con una sonda; luego se trata la causa (por ejemplo, con medicamentos o cirugía de la próstata).',
      esp: 'Servicio de urgencia; urólogo.',
      alarma: 'No poder orinar con dolor creciente, fiebre o confusión: urgencia inmediata.',
      src: ['mp_uropatia', 'mp_prostata']
    },
    {
      id: 'prostatitis', n: 'Prostatitis', urg: 3, prev: 0.8, dur: ['h', 'd', 's'], sex: 'M',
      s: { dolor_perineal: 3, fiebre: 2, ardor_orinar: 2, escalofrios: 1, orinar_frecuente: 1, chorro_debil: 1, dolor_lumbar: 1 },
      que: 'Inflamación de la próstata, a menudo por una infección bacteriana. La forma aguda produce fiebre, escalofríos, dolor entre el escroto y el ano, y ardor o dificultad para orinar; la crónica da molestias pélvicas y urinarias durante meses.',
      trat: 'La prostatitis bacteriana se trata con antibióticos durante varias semanas, indicados por un médico, más analgésicos y líquidos; los casos graves requieren hospitalización.',
      esp: 'Médico general o urgencia el mismo día; urólogo.',
      alarma: 'Fiebre alta con escalofríos, no poder orinar o mal estado general: urgencia.',
      src: ['mp_prostatitis']
    },

    // ───────────── Salud de la mujer y embarazo
    {
      id: 'sop', n: 'Síndrome de ovario poliquístico', alt: 'SOP', urg: 2, prev: 0.95, dur: ['m'], sex: 'F',
      age: [[12, 45, 1.2]],
      s: { reglas_irregulares: 3, vello_excesivo: 3, acne: 2, aumento_peso: 2, caida_pelo: 1 },
      que: 'Trastorno hormonal frecuente en mujeres en edad fértil (MedlinePlus lo llama ahora síndrome ovárico metabólico poliendocrino): reglas irregulares o ausentes, exceso de hormonas masculinas (vello en la cara o el cuerpo, acné, caída del pelo) y, a menudo, aumento de peso y resistencia a la insulina. Puede dificultar el embarazo y aumenta el riesgo de diabetes.',
      trat: 'Alimentación saludable, ejercicio y baja de peso si corresponde; anticonceptivos hormonales para regular las reglas y el vello, metformina en algunos casos y tratamientos de fertilidad si se busca un embarazo.',
      esp: 'Ginecólogo/a o endocrinólogo; nutricionista.',
      alarma: 'Ausencia de regla con posible embarazo, sangrado muy abundante o síntomas de diabetes.',
      src: ['mp_sop']
    },
    {
      id: 'miomas', n: 'Miomas uterinos', urg: 2, prev: 1.0, dur: ['m'], sex: 'F',
      age: [[25, 55, 1.2]],
      s: { reglas_abundantes: 3, dolor_pelvico: 2, orinar_frecuente: 1, hinchazon_abdominal: 1, estrenimiento: 1, fatiga: 1, dolor_menstrual: 1 },
      que: 'Tumores benignos (no cancerosos) del músculo del útero, muy frecuentes: hacia los 50 años la mitad de las mujeres los tiene. Muchas no tienen síntomas; otras presentan reglas abundantes o prolongadas (que pueden causar anemia), dolor o presión pélvica, ganas frecuentes de orinar o estreñimiento.',
      trat: 'Si no dan síntomas, solo se controlan. Si molestan, se usan medicamentos para el sangrado y el dolor, tratamientos hormonales, procedimientos para reducirlos o cirugía, según cada caso.',
      esp: 'Ginecólogo/a.',
      alarma: 'Sangrado muy abundante (empapar más de una toalla por hora), mareo o desmayo: urgencia.',
      src: ['mp_miomas', 'mp_sangrado_uterino']
    },
    {
      id: 'amenaza_aborto', n: 'Sangrado en el embarazo inicial', alt: 'Amenaza de aborto', urg: 4, prev: 0.95, dur: ['h', 'd'], sex: 'F', preg: true, ageRange: [11, 55],
      req: ['atraso_menstrual'], reqF: 0.5,
      s: { sangrado_vaginal: 3, dolor_pelvico: 2, atraso_menstrual: 2, dolor_lumbar: 1, dolor_abdominal: 1 },
      que: 'Sangrado vaginal, a veces con dolor tipo cólico o lumbar, en las primeras 20 semanas de embarazo. Es frecuente y en muchos casos el embarazo sigue adelante, pero puede tratarse de un aborto espontáneo en curso o de un embarazo ectópico, por lo que siempre debe evaluarse.',
      trat: 'Se evalúa con examen físico y ecografía (a veces con examen de sangre). Mientras tanto se recomienda reposo relativo y evitar las relaciones sexuales; el manejo depende de lo que se encuentre.',
      esp: 'Urgencia gineco-obstétrica (maternidad); matrona o ginecólogo/a.',
      alarma: 'Sangrado abundante, dolor intenso, fiebre, mareo o desmayo: urgencia inmediata.',
      src: ['mp_amenaza_aborto', 'mp_sangrado_embarazo']
    },
    {
      id: 'hiperemesis', n: 'Hiperémesis gravídica', alt: 'Vómitos intensos del embarazo', urg: 3, prev: 0.85, dur: ['d', 's'], sex: 'F', preg: true, ageRange: [11, 55],
      req: ['vomitos_embarazo', 'atraso_menstrual'], reqF: 0.4,
      s: { vomitos_embarazo: 3, nauseas: 2, perdida_peso: 2, orina_escasa: 2, mareo: 1, atraso_menstrual: 1 },
      que: 'Náuseas y vómitos extremos y persistentes durante el embarazo, mucho más intensos que las náuseas habituales, que impiden comer o beber y pueden causar deshidratación, baja de peso y alteraciones de los electrolitos.',
      trat: 'Comidas pequeñas y frecuentes, líquidos en sorbos y medicamentos contra las náuseas seguros en el embarazo, indicados por un profesional; si hay deshidratación, sueros por vena y a veces hospitalización.',
      esp: 'Matrona u obstetra; urgencia si no toleras líquidos.',
      alarma: 'No retener líquidos durante el día, orina muy escasa y oscura, mareo al pararse, vómito con sangre o dolor abdominal: urgencia.',
      src: ['mp_nauseas_embarazo', 'mp_hiperemesis_en']
    },

    // ───────────── Músculos, huesos y articulaciones
    {
      id: 'hernia_disco', n: 'Hernia de disco lumbar', alt: 'Ciática', urg: 2, prev: 1.0, dur: ['d', 's', 'm'],
      age: [[25, 55, 1.2]],
      s: { ciatica: 3, debilidad_pierna: 3, dolor_lumbar: 2, esfinteres: 1 },
      que: 'Parte del disco que está entre dos vértebras se sale de su lugar y presiona una raíz nerviosa. Produce dolor lumbar que baja por la pierna (ciática), a veces hasta el pie, con hormigueo, adormecimiento o debilidad; empeora al sentarse, toser o agacharse.',
      trat: 'La mayoría mejora en semanas con analgésicos o antiinflamatorios, manteniéndose activo dentro de lo tolerable y con kinesiología. Si el dolor persiste o hay debilidad progresiva, pueden indicarse infiltraciones o cirugía.',
      esp: 'Médico general; traumatólogo, neurocirujano o fisiatra; kinesiólogo.',
      alarma: 'Pérdida de control de la orina o las deposiciones, adormecimiento en la zona genital o debilidad que avanza: urgencia inmediata.',
      src: ['mp_hernia_disco_t', 'mp_lumbago']
    },
    {
      id: 'epicondilitis', n: 'Codo de tenista', alt: 'Epicondilitis lateral', urg: 1, prev: 1.0, dur: ['s', 'm'],
      age: [[35, 55, 1.2]],
      s: { dolor_codo: 3, ctx_manos: 1 },
      que: 'Inflamación o desgaste de los tendones de la parte externa del codo por movimientos repetidos de la muñeca y el brazo (herramientas, teclado, deportes de raqueta). Produce dolor al agarrar, girar o levantar objetos, que puede extenderse al antebrazo. Es más común entre los 35 y 54 años.',
      trat: 'Reposo relativo de la actividad que lo provoca, hielo, antiinflamatorios por pocos días, codera o banda, y kinesiología con ejercicios; la mayoría mejora sin cirugía.',
      esp: 'Médico general; traumatólogo; kinesiólogo.',
      alarma: 'Codo muy hinchado, rojo y caliente con fiebre, o dolor tras una caída con deformidad: urgencia.',
      src: ['mp_codo_tenista', 'mp_dolor_codo']
    },
    {
      id: 'lupus', n: 'Lupus eritematoso sistémico', urg: 2, prev: 0.75, dur: ['s', 'm'], sexF: 1.6,
      age: [[15, 45, 1.2]],
      s: { rash_mariposa: 3, dolor_articular: 2, fatiga: 2, fiebre: 1, febricula: 1, llagas_boca: 1, caida_pelo: 1, dolor_pecho_respirar: 1, hinchazon_piernas: 1, articulaciones_manos: 1 },
      que: 'Enfermedad autoinmune en la que el sistema inmune ataca tejidos sanos y puede afectar la piel, las articulaciones, los riñones, la sangre y otros órganos. Es mucho más frecuente en mujeres jóvenes. Da cansancio, fiebre, dolores articulares, úlceras en la boca, caída del pelo, sensibilidad al sol y una erupción en mejillas y nariz en forma de “mariposa”.',
      trat: 'Se diagnostica con exámenes de sangre y orina. Se trata con hidroxicloroquina, antiinflamatorios, corticoides y otros inmunosupresores según los órganos afectados, además de protección solar. Requiere control de largo plazo.',
      esp: 'Reumatólogo (con derivación del médico general).',
      ges: 'El lupus eritematoso sistémico está cubierto por GES.',
      alarma: 'Dolor de pecho al respirar, falta de aire, hinchazón importante, orina con espuma o sangre, convulsiones o confusión: urgencia.',
      src: ['mp_lupus', 'sup_ges_listado']
    },

    // ───────────── Ojos, nariz
    {
      id: 'ojo_seco', n: 'Ojo seco', urg: 1, prev: 1.05, dur: ['s', 'm'],
      age: [[50, 200, 1.2]],
      s: { arena_ojos: 3, ojo_rojo: 1, lagrimeo: 1, vision_borrosa: 1 },
      que: 'Los ojos no producen lágrimas suficientes o de buena calidad. Produce ardor, sensación de arena, ojos rojos, visión borrosa que mejora al parpadear y, paradójicamente, lagrimeo. Es más común con la edad, en ambientes secos, con el uso de pantallas o lentes de contacto y con algunos medicamentos.',
      trat: 'Lágrimas artificiales, pausas al usar pantallas (parpadear), humidificar el ambiente y evitar el viento y el humo. Si persiste, el oftalmólogo puede indicar otros tratamientos.',
      esp: 'Médico general; oftalmólogo.',
      alarma: 'Dolor ocular intenso, disminución de la visión o sensibilidad marcada a la luz.',
      src: ['mp_ojo_seco']
    },
    {
      id: 'cataratas', n: 'Cataratas', urg: 2, prev: 1.0, dur: ['m'],
      age: [[0, 49, 0.3], [60, 200, 1.4]],
      s: { vision_nublada_progresiva: 3, vision_borrosa: 2, fotofobia: 1 },
      que: 'Opacidad progresiva del cristalino del ojo, muy común con la edad. La visión se va nublando lentamente, los colores se ven apagados, molestan las luces y el encandilamiento al manejar de noche, y la receta de los lentes cambia con frecuencia.',
      trat: 'Al inicio pueden ayudar lentes con mejor graduación y más iluminación. El tratamiento definitivo es una cirugía ambulatoria que reemplaza el cristalino por un lente artificial, cuando la visión afecta la vida diaria.',
      esp: 'Oftalmólogo.',
      ges: 'El tratamiento quirúrgico de las cataratas está cubierto por GES.',
      alarma: 'Pérdida súbita de visión, dolor ocular intenso o visión de cortinas o destellos: urgencia.',
      src: ['mp_cataratas', 'minsal_ges']
    },
    {
      id: 'presbicia', n: 'Presbicia', alt: 'Vista cansada', urg: 1, prev: 1.1, dur: ['m'],
      age: [[0, 37, 0.2], [40, 200, 1.4]],
      s: { vision_cerca: 3, dolor_cabeza: 1 },
      que: 'Pérdida gradual y natural de la capacidad de enfocar de cerca, que aparece alrededor de los 40 a 45 años. Cuesta leer letra pequeña, se necesita alejar el texto o más luz, y puede dar cansancio visual o dolor de cabeza al leer.',
      trat: 'Se corrige con lentes para leer, bifocales o multifocales, o con lentes de contacto; también existen opciones quirúrgicas.',
      esp: 'Oftalmólogo o tecnólogo médico con mención en oftalmología.',
      alarma: 'Pérdida súbita de visión, visión doble o dolor en el ojo.',
      src: ['mp_presbicia']
    },
    {
      id: 'epistaxis', n: 'Sangrado nasal', alt: 'Epistaxis', urg: 1, prev: 1.0, dur: ['h'],
      s: { sangrado_nariz: 3, presion_alta_cronica: 1 },
      que: 'Sangrado por la nariz, generalmente desde vasos pequeños de la parte delantera. Es muy común y casi siempre benigno: se asocia al aire seco (calefacción), a rascarse la nariz, a resfríos, alergias o golpes; también influyen la presión alta y los anticoagulantes.',
      trat: 'Siéntate e inclina la cabeza hacia adelante (no hacia atrás), aprieta la parte blanda de la nariz durante 10 a 15 minutos sin soltar y respira por la boca. Después, evita sonarte o hacer fuerza por unas horas. Humidificar el ambiente ayuda a prevenirlo.',
      esp: 'Normalmente no requiere consulta; otorrinolaringólogo si se repite.',
      alarma: 'Sangrado que no se detiene tras dos intentos de presión (unos 30 minutos), muy abundante, después de un golpe fuerte en la cabeza, con dificultad para respirar o si tomas anticoagulantes: urgencia.',
      src: ['mayo_epistaxis']
    }
  ];

  window.SINTOMAS_DATA = { ZONES, SYMPTOMS, SOURCES, URGENCY, CONDITIONS };
})();
