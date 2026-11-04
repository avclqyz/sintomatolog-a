/*
 * Sintomatología · base de conocimiento
 * --------------------------------------
 * Contenido redactado a partir de fuentes médicas confiables:
 *   - MedlinePlus en español (Biblioteca Nacional de Medicina de EE. UU., NIH)
 *   - Mayo Clinic (versión en español cuando existe)
 *   - Ministerio de Salud de Chile (MINSAL), AUGE/GES
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
    { id: 'oong', n: 'Ojos, oídos, nariz y garganta' },
    { id: 'respiracion', n: 'Pecho y respiración' },
    { id: 'corazon', n: 'Corazón y circulación' },
    { id: 'digestivo', n: 'Abdomen y digestión' },
    { id: 'urogenital', n: 'Urinario y genital' },
    { id: 'piel', n: 'Piel' },
    { id: 'musculo', n: 'Músculos y articulaciones' },
    { id: 'mente', n: 'Ánimo y emociones' },
    { id: 'contexto', n: 'Contexto y exposiciones' }
  ];

  // [id, nombre, zona, gravedad, sinónimos, sexo opcional]
  const RAW_SYMPTOMS = [
    // ── General
    ['fiebre', 'Fiebre (38 °C o más)', 'general', 2, ['temperatura', 'calentura', 'afiebrado', 'fiebre alta', 'febril']],
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
    ['vision_subita', 'Pérdida súbita de visión o visión doble', 'cabeza', 3, ['visión doble', 'ceguera', 'dejé de ver', 'diplopía']],
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
    ['ojo_rojo', 'Ojo rojo', 'oong', 1, ['ojos rojos', 'ojo irritado']],
    ['laganas', 'Lagañas o secreción en el ojo', 'oong', 1, ['legañas', 'pus en el ojo', 'ojo pegado']],
    ['vision_borrosa', 'Visión borrosa', 'oong', 2, ['veo borroso', 'visión nublada']],
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
    ['orina_escasa', 'Orinar muy poco u orina muy oscura', 'urogenital', 2, ['oliguria', 'orina oscura', 'casi no orino']],
    ['dolor_costado', 'Dolor en un costado de la espalda (zona del riñón)', 'urogenital', 2, ['dolor de riñón', 'dolor lumbar lateral']],
    ['colico_renal', 'Dolor muy intenso en oleadas, del costado hacia la ingle', 'urogenital', 2, ['cólico renal', 'piedra en el riñón', 'cálculo']],
    ['dolor_pelvico', 'Dolor en la parte baja del abdomen o pelvis', 'urogenital', 1, ['dolor de ovarios', 'bajo vientre', 'dolor pélvico', 'hipogastrio']],
    ['atraso_menstrual', 'Atraso menstrual', 'urogenital', 1, ['no me llega la regla', 'falta de regla', 'atraso', 'amenorrea'], 'F'],
    ['sangrado_vaginal', 'Sangrado vaginal fuera de la regla', 'urogenital', 2, ['metrorragia', 'manchado', 'sangrado anormal'], 'F'],
    ['flujo_vaginal', 'Flujo vaginal anormal', 'urogenital', 1, ['flujo', 'descarga vaginal', 'leucorrea'], 'F'],
    ['picazon_genital', 'Picazón o ardor genital', 'urogenital', 1, ['comezón genital', 'prurito vulvar', 'picazón vaginal']],
    ['dolor_menstrual', 'Dolor menstrual intenso', 'urogenital', 1, ['cólicos menstruales', 'dismenorrea', 'dolor de regla'], 'F'],
    ['dolor_relaciones', 'Dolor en las relaciones sexuales', 'urogenital', 1, ['dispareunia', 'dolor al tener sexo']],
    ['sensibilidad_mamas', 'Pechos sensibles o hinchados', 'urogenital', 1, ['mamas sensibles', 'dolor de pechos', 'senos sensibles'], 'F'],
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
    ['ctx_contagio', 'Contacto reciente con alguien resfriado o con gripe', 'contexto', 0, ['contagio', 'familiar enfermo', 'compañero enfermo']],
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
    ['ctx_antiinflam', 'Uso frecuente de antiinflamatorios (ibuprofeno, aspirina)', 'contexto', 0, ['ibuprofeno', 'aspirina', 'ketoprofeno', 'diclofenaco', 'naproxeno']]
  ];

  // Síntomas de alarma que justifican llamar al 131 (el resto de los rosados: ir a urgencia de inmediato)
  const CALL_131 = new Set(['desmayo', 'convulsion', 'debilidad_lado', 'cara_caida', 'habla', 'vision_subita', 'rigidez_cuello',
    'confusion', 'perdida_equilibrio', 'dolor_cabeza_subito', 'ahogo_severo', 'labios_azules', 'dolor_pecho_opresivo',
    'dolor_irradiado', 'presion_alta', 'vomito_sangre', 'hinchazon_labios', 'petequias', 'piel_caliente_seca', 'ideas_suicidas', 'tos_sangre']);

  const SYMPTOMS = RAW_SYMPTOMS.map(([id, n, z, sev, syn, sx]) => ({
    id, n, z, sev, syn: syn || [], sx: sx || null,
    em: sev === 3 ? (CALL_131.has(id) ? 5 : 4) : 0
  }));

  // ── Fuentes verificadas
  const MP = 'MedlinePlus (NIH)';
  const MAYO = 'Mayo Clinic';
  const MINSAL = 'MINSAL Chile';
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
    minsal_ges: [MINSAL, 'Problemas de salud AUGE/GES', 'https://auge.minsal.cl/problemasdesalud/index']
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
      src: ['mp_gripe', 'mp_gripe_t', 'mayo_covid_dif']
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
      s: { estornudos: 3, picazon_ojos_nariz: 3, secrecion_nasal: 2, congestion: 2, ojo_rojo: 1, ctx_alergeno: 1, tos_seca: 1, fiebre: -2, febricula: -1 },
      que: 'Reacción alérgica de la nariz a sustancias como pólenes, ácaros del polvo, pelo de mascotas o moho. Se parece a un resfrío, pero no la causa un virus, no da fiebre y suele repetirse en ciertas épocas (por ejemplo, primavera) o ambientes.',
      trat: 'Evitar el alérgeno cuando sea posible, lavados nasales, antihistamínicos orales y corticoides en spray nasal. En casos persistentes, la inmunoterapia (vacunas para la alergia) puede ayudar.',
      esp: 'Médico general; inmunólogo/alergólogo u otorrinolaringólogo si es persistente.',
      alarma: 'Silbido al respirar o falta de aire (puede asociarse a asma).',
      src: ['mayo_rinitis', 'mayo_covid_dif']
    },
    {
      id: 'conjuntivitis', n: 'Conjuntivitis', alt: 'Ojo rosado', urg: 1, prev: 1.0, dur: ['h', 'd', 's'],
      s: { ojo_rojo: 3, laganas: 2, picazon_ojos_nariz: 1, vision_subita: -3 },
      que: 'Inflamación de la conjuntiva, la membrana que cubre el blanco del ojo. Puede ser viral, bacteriana (con lagañas espesas) o alérgica (con mucha picazón).',
      trat: 'La viral suele pasar sola en 1 a 2 semanas con compresas frías y lágrimas artificiales; la bacteriana puede requerir gotas antibióticas indicadas por un médico; la alérgica mejora con gotas antihistamínicas. Lávate las manos y no compartas toallas.',
      esp: 'Médico general; oftalmólogo si hay dolor, baja de visión o no mejora.',
      alarma: 'Dolor ocular intenso, disminución de la visión, mucha sensibilidad a la luz o si usas lentes de contacto.',
      src: ['mp_conjuntivitis', 'mp_conj_alergica']
    },
    {
      id: 'bronquitis', n: 'Bronquitis aguda', urg: 1, prev: 1.05, dur: ['d', 's'],
      s: { tos_flema: 3, tos_seca: 2, sibilancias: 1, febricula: 1, fatiga: 1, dolor_garganta: 1, dolor_pecho_respirar: 1, falta_aire: 1, congestion: 1 },
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
      s: { presion_alta: 3, dolor_cabeza: 2, vision_borrosa: 2, mareo: 1, dolor_pecho_opresivo: 1, falta_aire: 1, confusion: 1, nauseas: 1, sangrado_nariz: 1 },
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
      src: ['mp_panico', 'mp_panico_t']
    },
    {
      id: 'ansiedad_generalizada', n: 'Trastorno de ansiedad generalizada', urg: 2, prev: 1.05, dur: ['s', 'm'],
      s: { ansiedad: 3, insomnio: 2, irritabilidad: 2, fatiga: 1, dolor_cuello: 1, memoria: 1, palpitaciones: 1, ctx_estres: 1 },
      que: 'Preocupación excesiva y difícil de controlar sobre muchas cosas, la mayoría de los días durante varios meses, con inquietud, cansancio, irritabilidad, tensión muscular, dificultad para concentrarse y problemas de sueño.',
      trat: 'Psicoterapia (especialmente cognitivo-conductual), técnicas de relajación, ejercicio regular, buen dormir y menos cafeína y alcohol. En algunos casos, medicamentos indicados por un médico.',
      esp: 'Psicólogo y/o psiquiatra; médico general como puerta de entrada.',
      alarma: 'Pensamientos de hacerte daño: llama al *4141 o al 131.',
      src: ['mp_ansiedad', 'mp_estres']
    },
    {
      id: 'depresion', n: 'Depresión', urg: 2, prev: 1.05, dur: ['s', 'm'],
      s: { tristeza: 3, anhedonia: 3, insomnio: 2, fatiga: 2, culpa: 2, ideas_suicidas: 2, inapetencia: 1, memoria: 1, irritabilidad: 1, perdida_peso: 1, aumento_peso: 1 },
      que: 'Trastorno del ánimo con tristeza persistente o pérdida de interés por las cosas durante al menos 2 semanas, que afecta el sueño, el apetito, la energía, la concentración y la autoestima. No es debilidad ni falta de voluntad: es una enfermedad tratable.',
      trat: 'Psicoterapia, medicamentos antidepresivos o la combinación de ambos según la gravedad. También ayudan la actividad física, las rutinas de sueño y el apoyo de personas cercanas.',
      esp: 'Médico general (CESFAM), psicólogo y/o psiquiatra.',
      ges: 'La depresión en personas de 15 años y más está cubierta por GES.',
      alarma: 'Pensamientos de muerte o de hacerte daño: llama al *4141 (gratis, 24 horas) o al SAMU 131.',
      src: ['mp_depresion', 'minsal_4141', 'minsal_ges']
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
      id: 'intox_alimentaria', req: ['ctx_comida'], reqF: 0.6, n: 'Intoxicación alimentaria', urg: 2, prev: 1.0, dur: ['h', 'd'],
      s: { ctx_comida: 3, vomitos: 3, nauseas: 2, diarrea: 2, dolor_abdominal: 2, fiebre: 1, escalofrios: 1 },
      que: 'Enfermedad causada por comer o beber alimentos contaminados con bacterias, virus o sus toxinas. Los síntomas aparecen desde pocas horas hasta días después: náuseas, vómitos, diarrea y dolor abdominal, a veces con fiebre.',
      trat: 'Hidratación con sales de rehidratación oral y reposo; la mayoría mejora en 1 a 3 días. Algunos casos (fiebre alta, diarrea con sangre) necesitan exámenes y antibióticos. Evita los antidiarreicos si hay fiebre o sangre.',
      esp: 'Médico general; urgencia si hay deshidratación.',
      alarma: 'Diarrea con sangre, fiebre alta, deshidratación, visión doble o debilidad muscular (posible botulismo), o si estás embarazada.',
      src: ['mp_alimentos', 'mp_gastroenteritis']
    },
    {
      id: 'erge', n: 'Reflujo gastroesofágico (ERGE)', alt: 'Acidez, reflujo', urg: 1, prev: 1.1, dur: ['d', 's', 'm'],
      s: { ardor_pecho: 3, regurgitacion: 3, dolor_epigastrio: 1, tos_seca: 1, ronquera: 1, nauseas: 1, llenura: 1 },
      que: 'El contenido ácido del estómago se devuelve hacia el esófago, causando ardor detrás del esternón (acidez), regurgitación ácida y a veces tos o ronquera. Empeora después de comer abundante, al acostarse o al agacharse.',
      trat: 'Cambios de hábitos: comidas más pequeñas, no acostarse hasta 2 a 3 horas después de comer, elevar la cabecera de la cama, bajar de peso y reducir alcohol, tabaco, café y comidas grasas. Antiácidos para síntomas ocasionales; el médico puede indicar inhibidores de la bomba de protones (como omeprazol).',
      esp: 'Médico general; gastroenterólogo si persiste o hay signos de alarma.',
      alarma: 'Dificultad o dolor al tragar, baja de peso, vómitos con sangre, deposiciones negras o dolor de pecho con el esfuerzo (descartar causa cardíaca).',
      src: ['mp_erge']
    },
    {
      id: 'gastritis_ulcera', n: 'Gastritis o úlcera péptica', urg: 2, prev: 1.05, dur: ['d', 's', 'm'],
      s: { dolor_epigastrio: 3, nauseas: 2, llenura: 2, ctx_antiinflam: 2, deposiciones_negras: 2, vomito_sangre: 2, hinchazon_abdominal: 1, inapetencia: 1, ardor_pecho: 1, vomitos: 1 },
      que: 'Inflamación o herida en la mucosa del estómago o del duodeno. Las causas más comunes son la bacteria Helicobacter pylori y el uso de antiinflamatorios (como ibuprofeno o aspirina); el alcohol y el tabaco empeoran el cuadro. Causa dolor o ardor en la boca del estómago, náuseas y sensación de llenura.',
      trat: 'Medicamentos que reducen el ácido (como omeprazol) y, si se detecta H. pylori, una combinación de antibióticos. Suspender los antiinflamatorios si es posible y evitar alcohol y tabaco. A veces se requiere una endoscopía.',
      esp: 'Médico general; gastroenterólogo para endoscopía.',
      alarma: 'Vómito con sangre o como borra de café, deposiciones negras, dolor abdominal súbito e intenso o desmayo: urgencia.',
      src: ['mp_ulcera', 'mp_hpylori']
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
      s: { dolor_hipocondrio: 3, nauseas: 2, vomitos: 2, fiebre: 1, ictericia: 1, dolor_epigastrio: 1, hinchazon_abdominal: 1, llenura: 1 },
      que: 'Los cálculos (piedras) de la vesícula pueden bloquear su salida y causar dolor intenso en la parte alta derecha del abdomen o en la boca del estómago, a menudo después de comidas grasas, que puede irradiarse a la espalda o al hombro derecho. Si la vesícula se inflama o infecta (colecistitis) aparece fiebre.',
      trat: 'El cólico se trata con analgésicos; si los cálculos dan síntomas, el tratamiento habitual es extirpar la vesícula (colecistectomía), generalmente por laparoscopía. La colecistitis requiere hospitalización.',
      esp: 'Médico general o urgencia; cirujano digestivo.',
      ges: 'La colecistectomía preventiva del cáncer de vesícula (personas de 35 a 49 años con cálculos) está cubierta por GES.',
      alarma: 'Fiebre, piel u ojos amarillos, dolor que dura más de 5 a 6 horas o vómitos persistentes.',
      src: ['mp_colecistitis', 'mp_calculos_biliares', 'minsal_ges']
    },
    {
      id: 'pancreatitis', n: 'Pancreatitis aguda', urg: 4, prev: 0.8, dur: ['h', 'd'],
      s: { dolor_cinturon: 3, dolor_epigastrio: 2, vomitos: 2, nauseas: 2, dolor_abdominal_intenso: 2, fiebre: 1, palpitaciones: 1, hinchazon_abdominal: 1 },
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
      s: { fatiga: 3, palidez: 3, mareo: 2, falta_aire: 1, palpitaciones: 1, dolor_cabeza: 1, caida_pelo: 1, intolerancia_frio: 1 },
      que: 'Faltan glóbulos rojos sanos por falta de hierro, frecuentemente por menstruaciones abundantes, embarazo, dieta pobre en hierro o pérdidas de sangre digestivas. Produce cansancio, palidez, falta de aire con el esfuerzo, mareo, palpitaciones, uñas quebradizas y antojos de hielo o tierra.',
      trat: 'Se confirma con hemograma y ferritina. Se trata con suplementos de hierro y alimentos ricos en hierro, y buscando la causa de la pérdida (especialmente en hombres y en mujeres después de la menopausia).',
      esp: 'Médico general; hematólogo o gastroenterólogo según la causa.',
      alarma: 'Dolor de pecho, falta de aire en reposo, desmayo, o deposiciones negras o con sangre.',
      src: ['mayo_anemia']
    },

    // ───────────── Ambientales / sistémicas
    {
      id: 'deshidratacion', n: 'Deshidratación', urg: 3, prev: 1.0, dur: ['h', 'd'],
      s: { sed: 3, orina_escasa: 3, mareo: 2, fatiga: 1, dolor_cabeza: 1, diarrea: 1, vomitos: 1, confusion: 1, ctx_calor: 1 },
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
      src: ['mp_calor']
    },
    {
      id: 'monoxido', req: ['ctx_brasero', 'ctx_convivientes'], reqF: 0.3, n: 'Intoxicación por monóxido de carbono', urg: 5, prev: 0.8, dur: ['h'],
      s: { ctx_brasero: 3, ctx_convivientes: 3, dolor_cabeza: 3, mareo: 2, nauseas: 2, confusion: 2, somnolencia: 2, debilidad_general: 1, desmayo: 1, vomitos: 1 },
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
      s: { articulacion_hinchada: 3, febricula: 1 },
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
    }
  ];

  window.SINTOMAS_DATA = { ZONES, SYMPTOMS, SOURCES, URGENCY, CONDITIONS };
})();
