/*
 * Sintomatología · ampliación: enfermedades poco frecuentes o raras
 * © 2026 Agustín Vivanco. Todos los derechos reservados.
 * --------------------------------------
 * Mismo formato y criterios que js/data.js (ver su encabezado).
 * Cada tanda suma síntomas, fuentes verificadas y enfermedades con addPack.
 */
(function () {
  'use strict';
  const D = window.SINTOMAS_DATA;
  const { MP, MAYO, MINSAL, SUP, ISP, OMS, OPS, SENDA, CLC, CA, UCC, REDSALUD, GOB, ORPHA } = D.ORGS;

  // ── Tanda 1 (noviembre 2026): enfermedades genéticas y hereditarias
  D.addPack({
    symptoms: [
      // de uso compartido con otras tandas
      ['ctx_familia', 'Familiares directos con la misma enfermedad o síntomas parecidos', 'contexto', 0, ['hereditario', 'antecedente familiar', 'genético', 'corre en la familia']],
      ['talla_baja', 'Talla baja marcada para la edad', 'general', 1, ['bajo de estatura', 'no crece', 'enanismo']],
      ['poco_crecimiento', 'Niño que no sube de peso ni crece como debería', 'general', 1, ['no sube de peso', 'retraso del crecimiento', 'desnutrición']],
      ['retraso_desarrollo', 'Retraso en el desarrollo (sentarse, caminar, hablar o aprender)', 'general', 1, ['retraso psicomotor', 'discapacidad intelectual', 'retraso del lenguaje']],
      ['dificultad_social', 'Dificultad marcada para relacionarse, con intereses o movimientos repetitivos', 'mente', 1, ['autismo', 'TEA', 'no mira a los ojos']],
      ['parpado_caido', 'Párpado caído', 'ojos', 1, ['ptosis', 'ojo caído']],
      ['columna_desviada', 'Columna desviada (espalda torcida o un hombro más alto)', 'musculo', 1, ['escoliosis', 'espalda chueca']],
      ['crecimiento_mamas_hombre', 'Crecimiento de las mamas en un hombre o un niño', 'urogenital', 1, ['ginecomastia', 'pechos en hombres'], 'M'],
      ['infertilidad', 'Dificultad para lograr un embarazo después de un año de intentarlo', 'urogenital', 1, ['infertilidad', 'no puedo tener hijos', 'esterilidad']],
      ['infecciones_repetidas', 'Infecciones repetidas (pulmones, oídos, senos nasales o piel)', 'general', 1, ['me enfermo seguido', 'defensas bajas', 'infecciones a cada rato']],
      ['moretones_faciles', 'Moretones grandes o frecuentes con golpes mínimos', 'general', 1, ['moretones', 'hematomas fáciles', 'me salen moretones']],
      ['sangrado_prolongado', 'Sangrado que dura mucho tras un corte, una cirugía o sacar una muela', 'general', 2, ['sangra mucho', 'no para de sangrar', 'problema de coagulación']],
      ['anemia_no_mejora', 'Anemia que no mejora con tratamiento de hierro', 'general', 1, ['anemia persistente', 'anemia hereditaria']],
      ['bazo_grande', 'Bulto o pesadez bajo las costillas izquierdas (bazo grande)', 'digestivo', 1, ['bazo grande', 'esplenomegalia']],
      ['articulaciones_laxas', 'Articulaciones muy flexibles que se salen de lugar con facilidad', 'musculo', 1, ['hiperlaxitud', 'laxitud articular', 'me disloco']],
      ['pie_caido', 'Pie caído: arrastras la punta del pie al caminar', 'musculo', 2, ['pie caído', 'arrastro el pie', 'tropiezo con la punta del pie']],
      ['debilidad_progresiva', 'Debilidad muscular que avanza en meses o años (hombros, caderas o piernas)', 'musculo', 2, ['debilidad muscular progresiva', 'miopatía', 'pierdo fuerza']],
      ['torpeza_progresiva', 'Marcha inestable y torpeza que empeoran con los años', 'cabeza', 2, ['ataxia', 'camino como borracho', 'incoordinación']],
      ['movimientos_involuntarios', 'Movimientos involuntarios bruscos o como de baile', 'cabeza', 2, ['corea', 'movimientos raros', 'no puedo quedarme quieto']],
      ['hipotonia_bebe', 'Bebé muy flácido (blando), con poca fuerza para succionar o moverse', 'general', 2, ['hipotonía', 'bebé flácido', 'bebé blando']],
      ['sin_pubertad', 'La pubertad no empieza a la edad esperada (o no llega la primera regla)', 'general', 1, ['pubertad tardía', 'no le llega la regla', 'no se desarrolla']],
      // propios de esta tanda
      ['sudor_salado', 'Sudor muy salado (al besarlo se siente sabor salado)', 'general', 1, ['fibrosis quística', 'piel salada']],
      ['hemartrosis', 'Articulación hinchada y dolorosa por sangrado, sin un golpe fuerte', 'musculo', 2, ['hemartrosis', 'sangrado en la rodilla']],
      ['crisis_dolor_huesos', 'Crisis repetidas de dolor intenso en huesos, pecho o abdomen', 'musculo', 2, ['crisis drepanocítica', 'crisis de dolor']],
      ['ctx_habas', 'Comiste habas o tomaste un medicamento nuevo en los días previos', 'contexto', 0, ['habas', 'favismo', 'medicamento nuevo']],
      ['muy_alto_delgado', 'Estatura muy alta y delgada, con brazos y dedos muy largos', 'musculo', 1, ['Marfan', 'muy alto', 'dedos largos']],
      ['piel_elastica', 'Piel muy elástica y frágil, con cicatrices anchas', 'piel', 1, ['piel hiperelástica', 'Ehlers-Danlos']],
      ['fracturas_repetidas', 'Fracturas repetidas con golpes o caídas leves', 'musculo', 2, ['huesos frágiles', 'huesos de cristal', 'me fracturo fácil']],
      ['escleras_azules', 'La parte blanca de los ojos se ve azulada', 'ojos', 1, ['escleróticas azules']],
      ['extremidades_cortas', 'Brazos y piernas cortos en relación con el tronco, con cabeza grande', 'musculo', 1, ['acondroplasia', 'enanismo']],
      ['manchas_cafe', 'Varias manchas color café con leche en la piel', 'piel', 1, ['manchas café con leche', 'neurofibromatosis']],
      ['bultos_nervios', 'Bultitos blandos en o bajo la piel que aumentan con los años', 'piel', 1, ['neurofibromas', 'bultos en la piel']],
      ['pecas_axilas', 'Pecas en las axilas o las ingles', 'piel', 1, ['efélides axilares']],
      ['manchas_blancas_hoja', 'Manchas blancas en la piel con forma de hoja, desde la infancia', 'piel', 1, ['manchas hipocrómicas', 'esclerosis tuberosa']],
      ['bultitos_cara', 'Bultitos rojizos en mejillas y nariz desde la niñez (no es acné)', 'piel', 1, ['angiofibromas']],
      ['cuello_alado', 'Cuello ancho con pliegues de piel a los lados', 'general', 1, ['cuello alado']],
      ['testiculos_pequenos', 'Testículos pequeños y firmes', 'urogenital', 1, ['testículos chicos', 'hipogonadismo'], 'M'],
      ['cara_alargada', 'Cara alargada con orejas grandes y mentón prominente', 'general', 1, ['X frágil']],
      ['hambre_insaciable', 'Hambre que nunca se sacia, desde la niñez', 'general', 1, ['come sin parar', 'Prader-Willi', 'hiperfagia']],
      ['risa_facil', 'Risa y excitación muy frecuentes sin motivo, con movimientos torpes', 'mente', 1, ['Angelman', 'risa inmotivada']],
      ['sin_habla', 'No desarrolla el lenguaje o pierde palabras que ya decía', 'mente', 1, ['no habla', 'pérdida del lenguaje', 'regresión']],
      ['movimientos_manos', 'Movimientos repetitivos de las manos (como lavarlas o retorcerlas) y pérdida de su uso', 'cabeza', 1, ['Rett', 'estereotipias de manos']],
      ['debilidad_piernas_nino', 'Niño que se cae mucho y le cuesta subir escaleras o levantarse del suelo', 'musculo', 2, ['Duchenne', 'se cae mucho', 'se apoya en los muslos para pararse']],
      ['pantorrillas_grandes', 'Pantorrillas muy gruesas en un niño con debilidad', 'musculo', 1, ['pseudohipertrofia']],
      ['miotonia', 'Te cuesta soltar la mano después de apretar algo (músculos que se relajan lento)', 'musculo', 1, ['miotonía', 'distrofia miotónica', 'no puedo soltar']],
      ['pies_cavos', 'Pies con arco muy alto y dedos en garra, con tobillos que se tuercen', 'musculo', 1, ['pie cavo', 'Charcot-Marie-Tooth']]
    ],
    sources: {
      mp_fibrosis_quistica: [MP, 'Fibrosis quística', 'https://medlineplus.gov/spanish/ency/article/000107.htm'],
      mp_hemofilia: [MP, 'Hemofilia', 'https://medlineplus.gov/spanish/ency/article/000537.htm'],
      mp_von_willebrand: [MP, 'Enfermedad de von Willebrand', 'https://medlineplus.gov/spanish/ency/article/000544.htm'],
      mp_drepanocitica: [MP, 'Enfermedad drepanocítica', 'https://medlineplus.gov/spanish/ency/article/000527.htm'],
      mp_talasemia: [MP, 'Talasemia', 'https://medlineplus.gov/spanish/ency/article/000587.htm'],
      mp_hemoglobinopatia: [MP, 'Hemoglobinopatía', 'https://medlineplus.gov/spanish/ency/article/001291.htm'],
      mp_esferocitosis_img: [MP, 'Glóbulos rojos: esferocitosis (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/1220.htm'],
      mp_fragilidad_osmotica: [MP, 'Examen de la fragilidad osmótica', 'https://medlineplus.gov/spanish/ency/article/003641.htm'],
      mp_g6pd_examen: [MP, 'Examen de glucosa-6-fosfato deshidrogenasa', 'https://medlineplus.gov/spanish/ency/article/003671.htm'],
      mp_g6pd_gen: [MP, 'Deficiencia de G6PD (MedlinePlus Genetics, en inglés)', 'https://medlineplus.gov/genetics/condition/glucose-6-phosphate-dehydrogenase-deficiency/'],
      mp_marfan: [MP, 'Síndrome de Marfan', 'https://medlineplus.gov/spanish/ency/article/000418.htm'],
      mp_piel_hiperelastica: [MP, 'Piel hiperelástica (síndrome de Ehlers-Danlos)', 'https://medlineplus.gov/spanish/ency/article/003280.htm'],
      mp_osteogenesis_t: [MP, 'Osteogénesis imperfecta', 'https://medlineplus.gov/spanish/osteogenesisimperfecta.html'],
      mp_acondroplasia: [MP, 'Acondroplasia', 'https://medlineplus.gov/spanish/ency/article/001577.htm'],
      mp_nf1: [MP, 'Neurofibromatosis tipo 1', 'https://medlineplus.gov/spanish/ency/article/000847.htm'],
      mp_esclerosis_tuberosa_t: [MP, 'Esclerosis tuberosa', 'https://medlineplus.gov/spanish/tuberoussclerosis.html'],
      mp_turner: [MP, 'Síndrome de Turner', 'https://medlineplus.gov/spanish/ency/article/000379.htm'],
      mp_klinefelter: [MP, 'Síndrome de Klinefelter', 'https://medlineplus.gov/spanish/ency/article/000382.htm'],
      mp_x_fragil: [MP, 'Síndrome del cromosoma X frágil', 'https://medlineplus.gov/spanish/ency/article/001668.htm'],
      mp_prader_willi: [MP, 'Síndrome de Prader-Willi', 'https://medlineplus.gov/spanish/ency/article/001605.htm'],
      mp_angelman: [MP, 'Síndrome de Angelman', 'https://medlineplus.gov/spanish/ency/article/007616.htm'],
      mp_rett: [MP, 'Síndrome de Rett', 'https://medlineplus.gov/spanish/ency/article/001536.htm'],
      mp_duchenne: [MP, 'Distrofia muscular de Duchenne', 'https://medlineplus.gov/spanish/ency/article/000705.htm'],
      mp_distrofia: [MP, 'Distrofia muscular', 'https://medlineplus.gov/spanish/ency/article/001190.htm'],
      mp_distrofia_miotonica_gen: [MP, 'Distrofia miotónica (MedlinePlus Genetics, en inglés)', 'https://medlineplus.gov/genetics/condition/myotonic-dystrophy/'],
      mp_ame: [MP, 'Atrofia muscular espinal', 'https://medlineplus.gov/spanish/ency/article/000996.htm'],
      mp_cmt: [MP, 'Enfermedad de Charcot-Marie-Tooth', 'https://medlineplus.gov/spanish/ency/article/000727.htm'],
      mp_friedreich: [MP, 'Ataxia de Friedreich', 'https://medlineplus.gov/spanish/ency/article/001411.htm'],
      mp_huntington: [MP, 'Enfermedad de Huntington', 'https://medlineplus.gov/spanish/ency/article/000770.htm']
    },
    conditions: [
      {
        id: 'fibrosis_quistica', n: 'Fibrosis quística', urg: 3, prev: 0.6, dur: ['m'],
        age: [[0, 18, 1.3]],
        req: ['sudor_salado', 'infecciones_repetidas', 'poco_crecimiento'], reqF: 0.3,
        s: { sudor_salado: 3, infecciones_repetidas: 2, tos_prolongada: 2, tos_flema: 2, diarrea_grasosa: 2, poco_crecimiento: 2, sibilancias: 1, ctx_familia: 1 },
        que: 'Enfermedad hereditaria en la que el moco del cuerpo es muy espeso y pegajoso. Tapa los pulmones (tos con flema e infecciones repetidas) y el páncreas (diarrea grasosa y dificultad para subir de peso). El sudor es muy salado. Se busca en el recién nacido y se confirma con el test del sudor.',
        trat: 'No tiene cura, pero el tratamiento ha mejorado mucho la sobrevida: kinesiología respiratoria diaria, medicamentos inhalados, antibióticos, enzimas pancreáticas con las comidas, buena nutrición y, en algunos casos, medicamentos moduladores de la proteína CFTR.',
        ges: 'La fibrosis quística está cubierta por GES.',
        esp: 'Pediatra o médico general; broncopulmonar y equipo especializado en fibrosis quística.',
        alarma: 'Dificultad para respirar, tos con sangre, fiebre o baja de peso marcada: consulta urgente.',
        src: ['mp_fibrosis_quistica', 'minsal_ges']
      },
      {
        id: 'hemofilia', n: 'Hemofilia', urg: 3, prev: 0.6, dur: ['m'], sexF: 0.15,
        req: ['hemartrosis', 'sangrado_prolongado'], reqF: 0.3,
        s: { hemartrosis: 3, sangrado_prolongado: 3, moretones_faciles: 2, ctx_familia: 2, sangre_orina: 1 },
        que: 'Trastorno hereditario de la coagulación por falta del factor VIII (hemofilia A) o del factor IX (hemofilia B). Afecta casi siempre a hombres: sangrados prolongados tras cortes o cirugías, moretones grandes y sangrados dentro de articulaciones y músculos.',
        trat: 'Reposición del factor de coagulación que falta, de forma preventiva o ante sangrados, en centros especializados. Evitar aspirina e ibuprofeno. Controles con hematología.',
        ges: 'La hemofilia está cubierta por GES.',
        esp: 'Hematólogo.',
        alarma: 'Golpe en la cabeza, sangrado que no se detiene, dolor de cabeza intenso, vómitos o articulación muy hinchada: urgencia inmediata.',
        src: ['mp_hemofilia', 'minsal_ges']
      },
      {
        id: 'von_willebrand', n: 'Enfermedad de von Willebrand', urg: 2, prev: 0.7, dur: ['m'],
        req: ['sangrado_prolongado', 'moretones_faciles'], reqF: 0.3,
        s: { sangrado_prolongado: 3, moretones_faciles: 2, sangrado_nariz: 2, reglas_abundantes: 2, ctx_familia: 2, encias_cepillado: 1 },
        que: 'El trastorno hereditario de la coagulación más frecuente: falta o funciona mal el factor de von Willebrand, que ayuda a las plaquetas a pegarse. Produce sangrados de nariz frecuentes, moretones fáciles, reglas muy abundantes y sangrado prolongado tras cirugías o extracciones dentales.',
        trat: 'Muchas personas no necesitan tratamiento diario. Antes de cirugías o ante sangrados se usan desmopresina, concentrados del factor o ácido tranexámico; para las reglas abundantes, tratamiento hormonal. Evitar aspirina e ibuprofeno.',
        esp: 'Médico general; hematólogo; ginecólogo si hay reglas abundantes.',
        alarma: 'Sangrado que no se detiene, vómito con sangre o deposiciones negras: urgencia.',
        src: ['mp_von_willebrand']
      },
      {
        id: 'drepanocitosis', n: 'Anemia de células falciformes', alt: 'Enfermedad drepanocítica', urg: 3, prev: 0.5, dur: ['h', 'd', 'm'],
        req: ['crisis_dolor_huesos'], reqF: 0.3,
        s: { crisis_dolor_huesos: 3, palidez: 2, ictericia: 2, ctx_familia: 2, fatiga: 1, infecciones_repetidas: 1, fiebre: 1 },
        que: 'Enfermedad hereditaria de la hemoglobina que deforma los glóbulos rojos en forma de hoz: se rompen con facilidad (anemia) y tapan vasos pequeños, lo que causa crisis de dolor. Es más frecuente en personas con ascendencia africana o del Caribe.',
        trat: 'Hidratación y analgésicos en las crisis, ácido fólico, vacunas y antibióticos preventivos en niños, hidroxiurea y, a veces, transfusiones. El trasplante de médula puede curarla en casos seleccionados.',
        esp: 'Hematólogo.',
        alarma: 'Fiebre, dolor de pecho con falta de aire, dolor que no cede, debilidad de un lado del cuerpo o erección dolorosa prolongada: urgencia inmediata.',
        src: ['mp_drepanocitica']
      },
      {
        id: 'talasemia', n: 'Talasemia', urg: 2, prev: 0.5, dur: ['m'],
        req: ['anemia_no_mejora', 'ctx_familia'], reqF: 0.3,
        s: { anemia_no_mejora: 3, palidez: 2, fatiga: 2, ctx_familia: 2, ictericia: 1, poco_crecimiento: 1, bazo_grande: 1 },
        que: 'Grupo de enfermedades hereditarias en que el cuerpo fabrica poca hemoglobina normal. La forma leve (rasgo talasémico) solo produce una anemia leve con glóbulos pequeños que se confunde con falta de hierro; la forma grave aparece en los primeros años con anemia intensa. Es más frecuente en familias de origen mediterráneo, asiático o africano.',
        trat: 'La forma leve no necesita tratamiento y no debe tratarse con hierro si no hay déficit. Las formas graves requieren transfusiones periódicas, medicamentos que eliminan el exceso de hierro y, a veces, trasplante de médula.',
        esp: 'Médico general; hematólogo.',
        alarma: 'Palidez intensa, cansancio extremo, falta de aire o niño que no crece: consulta pronto.',
        src: ['mp_talasemia', 'mp_hemoglobinopatia']
      },
      {
        id: 'esferocitosis', n: 'Esferocitosis hereditaria', urg: 2, prev: 0.5, dur: ['m'],
        req: ['anemia_no_mejora', 'bazo_grande', 'ctx_familia'], reqF: 0.3,
        s: { anemia_no_mejora: 3, ictericia: 2, palidez: 2, bazo_grande: 2, ctx_familia: 2, fatiga: 1, dolor_hipocondrio: 1, coluria: 1 },
        que: 'Enfermedad hereditaria en la que los glóbulos rojos tienen forma de esfera y se destruyen antes de tiempo en el bazo. Produce anemia, color amarillo de la piel o los ojos, bazo grande y cálculos en la vesícula desde edades jóvenes.',
        trat: 'Ácido fólico y controles; transfusiones si hay crisis. En casos moderados o graves se extirpa el bazo (con vacunas previas) y, a veces, la vesícula.',
        esp: 'Pediatra o médico general; hematólogo.',
        alarma: 'Palidez y cansancio que aumentan bruscamente, sobre todo con fiebre o una infección viral: urgencia.',
        src: ['mp_esferocitosis_img', 'mp_fragilidad_osmotica']
      },
      {
        id: 'deficit_g6pd', n: 'Déficit de G6PD', alt: 'Favismo', urg: 3, prev: 0.5, dur: ['h', 'd'], sexF: 0.5,
        req: ['ctx_habas'], reqF: 0.25,
        s: { ctx_habas: 3, coluria: 3, ictericia: 2, palidez: 2, fatiga: 1, dolor_lumbar: 1, respiracion_rapida: 1 },
        que: 'Falta hereditaria de una enzima que protege a los glóbulos rojos. Al comer habas, tomar ciertos medicamentos (algunos antibióticos o antimaláricos) o tener una infección, los glóbulos rojos se rompen bruscamente: orina oscura, color amarillo y palidez. Es más frecuente en hombres.',
        trat: 'Suspender lo que desencadenó la crisis, hidratación y, si la anemia es intensa, transfusión. Para prevenir: evitar las habas y los medicamentos de riesgo e informar el diagnóstico antes de cualquier tratamiento.',
        esp: 'Servicio de urgencia en una crisis; hematólogo.',
        alarma: 'Orina color bebida cola, palidez intensa, falta de aire o decaimiento: urgencia.',
        src: ['mp_g6pd_examen', 'mp_g6pd_gen']
      },
      {
        id: 'marfan', n: 'Síndrome de Marfan', urg: 2, prev: 0.5, dur: ['m'],
        req: ['muy_alto_delgado'], reqF: 0.3,
        s: { muy_alto_delgado: 3, articulaciones_laxas: 2, ctx_familia: 2, vision_borrosa: 1, columna_desviada: 1, palpitaciones: 1 },
        que: 'Trastorno hereditario del tejido conectivo. Las personas son altas y delgadas, con brazos, piernas y dedos muy largos, articulaciones flexibles, problemas de la vista (miopía, desplazamiento del cristalino) y, lo más importante, dilatación de la aorta.',
        trat: 'No tiene cura. Controles anuales del corazón con ecocardiograma, medicamentos que protegen la aorta y cirugía si se dilata mucho; controles oftalmológicos. Evitar deportes de contacto o de gran esfuerzo.',
        esp: 'Médico general; cardiólogo; genetista; oftalmólogo.',
        alarma: 'Dolor de pecho o espalda súbito y desgarrador, falta de aire o pérdida brusca de visión: llama al 131.',
        src: ['mp_marfan']
      },
      {
        id: 'ehlers_danlos', n: 'Síndrome de Ehlers-Danlos', urg: 2, prev: 0.6, dur: ['m'],
        req: ['piel_elastica', 'articulaciones_laxas'], reqF: 0.3,
        s: { articulaciones_laxas: 3, piel_elastica: 3, moretones_faciles: 2, dolor_articular: 2, ctx_familia: 1, fatiga: 1 },
        que: 'Grupo de trastornos hereditarios del colágeno. Producen articulaciones muy flexibles que se salen de lugar con facilidad, piel muy elástica y frágil, moretones fáciles, cicatrices anchas y dolor crónico. Un tipo poco común (vascular) afecta las arterias y los órganos.',
        trat: 'No tiene cura: kinesiología para fortalecer los músculos y proteger las articulaciones, manejo del dolor y cuidado de la piel. En el tipo vascular, controles estrictos y atención inmediata ante dolores bruscos.',
        esp: 'Médico general; reumatólogo; genetista.',
        alarma: 'Dolor abdominal o de pecho súbito e intenso, sangrado importante o luxación que no vuelve a su lugar: urgencia.',
        src: ['mp_piel_hiperelastica']
      },
      {
        id: 'osteogenesis_imperfecta', n: 'Osteogénesis imperfecta', alt: '«Huesos de cristal»', urg: 2, prev: 0.5, dur: ['m'],
        req: ['fracturas_repetidas'], reqF: 0.3,
        s: { fracturas_repetidas: 3, escleras_azules: 2, ctx_familia: 2, talla_baja: 1, audicion_gradual: 1, columna_desviada: 1 },
        que: 'Trastorno genético del colágeno que hace frágiles los huesos: se fracturan con golpes leves, a veces desde antes de nacer. Puede acompañarse de la parte blanca de los ojos azulada, talla baja, dientes frágiles y pérdida de audición en la adultez.',
        trat: 'No tiene cura. Medicamentos que fortalecen el hueso (bifosfonatos), kinesiología, cirugías ortopédicas para corregir deformidades y medidas para evitar caídas.',
        esp: 'Pediatra; traumatólogo; genetista; endocrinólogo.',
        alarma: 'Ante una fractura nueva, deformidad o dolor intenso: atención médica pronto.',
        src: ['mp_osteogenesis_t']
      },
      {
        id: 'acondroplasia', n: 'Acondroplasia', urg: 2, prev: 0.5, dur: ['m'],
        req: ['extremidades_cortas'], reqF: 0.2,
        s: { extremidades_cortas: 3, talla_baja: 3, ctx_familia: 1, dolor_lumbar: 1, ronquidos: 1 },
        que: 'La causa más común de talla baja desproporcionada (enanismo), por un cambio en el gen FGFR3: brazos y piernas cortos, cabeza grande y tronco de tamaño normal. La inteligencia y la esperanza de vida suelen ser normales.',
        trat: 'No hay un tratamiento que la cure. Se hacen controles para detectar a tiempo compresión de la médula, apneas del sueño, otitis y problemas de columna o de peso, y se tratan cuando aparecen.',
        esp: 'Pediatra; genetista; traumatólogo; neurocirujano si hay compresión.',
        alarma: 'En lactantes, pausas respiratorias, debilidad o pérdida de fuerza: consulta urgente.',
        src: ['mp_acondroplasia']
      },
      {
        id: 'neurofibromatosis', n: 'Neurofibromatosis tipo 1', urg: 2, prev: 0.6, dur: ['m'],
        req: ['manchas_cafe', 'bultos_nervios'], reqF: 0.3,
        s: { manchas_cafe: 3, bultos_nervios: 3, pecas_axilas: 2, ctx_familia: 2, columna_desviada: 1, retraso_desarrollo: 1, vision_borrosa: 1 },
        que: 'Trastorno genético que hace crecer tumores benignos en los nervios (neurofibromas). Desde la infancia aparecen varias manchas color café con leche y pecas en axilas o ingles; con los años, bultitos en la piel. Puede afectar la vista, los huesos y el aprendizaje.',
        trat: 'No tiene cura. Controles anuales de la piel, la vista, la presión y la columna; cirugía de los tumores que duelen o comprimen y, en algunos casos, medicamentos que los reducen. Consejo genético.',
        esp: 'Pediatra o médico general; neurólogo; genetista; dermatólogo.',
        alarma: 'Bulto que crece rápido o duele, pérdida de visión, debilidad o convulsiones: consulta pronto.',
        src: ['mp_nf1']
      },
      {
        id: 'esclerosis_tuberosa', n: 'Esclerosis tuberosa', urg: 3, prev: 0.5, dur: ['m'],
        req: ['manchas_blancas_hoja', 'bultitos_cara'], reqF: 0.3,
        s: { manchas_blancas_hoja: 3, bultitos_cara: 3, convulsion: 2, retraso_desarrollo: 2, ctx_familia: 1, dificultad_social: 1 },
        que: 'Enfermedad genética que produce tumores benignos en el cerebro, la piel, los riñones, el corazón y los pulmones. Suele manifestarse en la infancia con convulsiones, manchas blancas con forma de hoja, bultitos rojizos en la cara y problemas del aprendizaje o la conducta.',
        trat: 'No tiene cura: medicamentos para las convulsiones, controles de riñón, corazón y cerebro, apoyo al desarrollo y, para algunos tumores, medicamentos específicos o cirugía.',
        esp: 'Neurólogo; genetista; dermatólogo; nefrólogo.',
        alarma: 'Convulsión que dura más de 5 minutos o se repite, espasmos en un lactante o dolor de cabeza intenso con vómitos: urgencia.',
        src: ['mp_esclerosis_tuberosa_t']
      },
      {
        id: 'turner', n: 'Síndrome de Turner', urg: 2, prev: 0.5, dur: ['m'], sex: 'F',
        req: ['talla_baja', 'sin_pubertad', 'cuello_alado'], reqF: 0.3,
        s: { talla_baja: 3, sin_pubertad: 3, cuello_alado: 2, infertilidad: 1, hinchazon_cara_manos: 1, poco_crecimiento: 1 },
        que: 'Condición genética de las mujeres en que falta total o parcialmente un cromosoma X. Produce talla baja, pubertad que no llega o se atrasa porque los ovarios no funcionan bien, cuello ancho y, a veces, problemas del corazón y los riñones.',
        trat: 'Hormona de crecimiento en la niñez, estrógenos para inducir la pubertad y controles del corazón, los riñones, la audición y la tiroides. Con apoyo, la mayoría lleva una vida independiente.',
        esp: 'Pediatra; endocrinólogo; genetista; cardiólogo.',
        alarma: 'Niña con talla muy baja o sin desarrollo puberal a los 13 años: consulta para estudio.',
        src: ['mp_turner']
      },
      {
        id: 'klinefelter', n: 'Síndrome de Klinefelter', alt: '47,XXY', urg: 2, prev: 0.6, dur: ['m'], sex: 'M',
        req: ['testiculos_pequenos', 'infertilidad', 'crecimiento_mamas_hombre'], reqF: 0.3,
        s: { testiculos_pequenos: 3, crecimiento_mamas_hombre: 2, infertilidad: 2, sin_pubertad: 2, muy_alto_delgado: 1, fatiga: 1 },
        que: 'Condición genética de los hombres que nacen con un cromosoma X extra (47,XXY). Produce testículos pequeños, poca testosterona, menos vello, crecimiento de las mamas, estatura alta e infertilidad. Muchas veces se descubre en la adultez al estudiar la infertilidad.',
        trat: 'Reemplazo de testosterona desde la pubertad, apoyo escolar si hay dificultades de aprendizaje y técnicas de reproducción asistida si se busca tener hijos.',
        esp: 'Endocrinólogo; urólogo; genetista.',
        alarma: 'Bulto en la mama de un hombre: consulta pronto.',
        src: ['mp_klinefelter']
      },
      {
        id: 'x_fragil', n: 'Síndrome X frágil', urg: 2, prev: 0.6, dur: ['m'], sexF: 0.5,
        req: ['cara_alargada', 'retraso_desarrollo'], reqF: 0.3,
        s: { retraso_desarrollo: 3, cara_alargada: 3, dificultad_social: 2, ctx_familia: 2, impulsividad: 1, inatencion: 1 },
        que: 'La causa hereditaria más común de discapacidad intelectual en los hombres, por un cambio en un gen del cromosoma X. Produce retraso del desarrollo y del lenguaje, rasgos del espectro autista, hiperactividad y, con la edad, cara alargada con orejas grandes. En las mujeres suele ser más leve.',
        trat: 'No tiene un tratamiento específico: estimulación temprana, terapia del lenguaje y ocupacional, apoyo escolar y medicamentos para la ansiedad o la hiperactividad. Consejo genético para la familia.',
        esp: 'Pediatra; neurólogo infantil; genetista.',
        alarma: 'Pérdida de habilidades ya adquiridas o convulsiones: consulta pronto.',
        src: ['mp_x_fragil']
      },
      {
        id: 'prader_willi', n: 'Síndrome de Prader-Willi', urg: 2, prev: 0.5, dur: ['m'],
        req: ['hambre_insaciable', 'hipotonia_bebe'], reqF: 0.3,
        s: { hambre_insaciable: 3, hipotonia_bebe: 3, aumento_peso: 2, retraso_desarrollo: 2, talla_baja: 1, sin_pubertad: 1 },
        que: 'Trastorno genético del cromosoma 15. El recién nacido es muy flácido y succiona poco; entre los 2 y 6 años aparece un hambre que nunca se sacia, con riesgo de obesidad grave, además de talla baja, pubertad incompleta y dificultades de aprendizaje y de conducta.',
        trat: 'Control estricto de la alimentación (a veces hay que guardar la comida bajo llave), ejercicio, hormona de crecimiento, hormonas sexuales y apoyo conductual y escolar.',
        esp: 'Pediatra; endocrinólogo; genetista; nutricionista.',
        alarma: 'Vómitos, dolor abdominal intenso o un atracón muy grande (riesgo de rotura del estómago): urgencia.',
        src: ['mp_prader_willi']
      },
      {
        id: 'angelman', n: 'Síndrome de Angelman', urg: 2, prev: 0.5, dur: ['m'],
        req: ['risa_facil'], reqF: 0.3,
        s: { risa_facil: 3, retraso_desarrollo: 3, sin_habla: 2, convulsion: 2, insomnio: 1 },
        que: 'Trastorno genético (gen UBE3A, cromosoma 15) que afecta el sistema nervioso. Se nota entre los 6 y 12 meses: retraso marcado del desarrollo, casi sin lenguaje, marcha inestable, convulsiones y un carácter muy alegre, con risa frecuente y manos que aletean.',
        trat: 'No tiene cura: medicamentos para las convulsiones, terapias física, ocupacional y de comunicación, y manejo del sueño.',
        esp: 'Neurólogo infantil; genetista.',
        alarma: 'Convulsión que dura más de 5 minutos: llama al 131.',
        src: ['mp_angelman']
      },
      {
        id: 'rett', n: 'Síndrome de Rett', urg: 2, prev: 0.5, dur: ['m'], sex: 'F', ageRange: [0, 40],
        req: ['movimientos_manos'], reqF: 0.3,
        s: { movimientos_manos: 3, sin_habla: 3, retraso_desarrollo: 2, convulsion: 1, dificultad_social: 1, respiracion_rapida: 1 },
        que: 'Trastorno genético del sistema nervioso que afecta casi solo a niñas. Tras un desarrollo inicial normal, entre los 6 y 18 meses pierden el lenguaje y el uso útil de las manos; aparecen movimientos repetitivos de lavado o retorcimiento de manos, problemas de la marcha, respiración irregular y convulsiones.',
        trat: 'No tiene cura: terapias física, ocupacional y del lenguaje, apoyo nutricional y medicamentos para las convulsiones y el sueño.',
        esp: 'Neurólogo infantil; genetista.',
        alarma: 'Convulsiones prolongadas, pausas respiratorias largas o atoros frecuentes al comer: consulta urgente.',
        src: ['mp_rett']
      },
      {
        id: 'duchenne', n: 'Distrofia muscular de Duchenne', urg: 2, prev: 0.5, dur: ['m'], sex: 'M', ageRange: [1, 35],
        req: ['debilidad_piernas_nino', 'pantorrillas_grandes'], reqF: 0.3,
        s: { debilidad_piernas_nino: 3, pantorrillas_grandes: 3, debilidad_progresiva: 2, retraso_desarrollo: 1, ctx_familia: 1, fatiga: 1 },
        que: 'Enfermedad genética ligada al cromosoma X que afecta a varones: falta la distrofina, una proteína que protege el músculo. Entre los 2 y 5 años aparecen caídas frecuentes, dificultad para correr, subir escaleras o levantarse del suelo (se apoya en los muslos) y pantorrillas gruesas. Avanza hasta afectar el corazón y la respiración.',
        trat: 'No tiene cura: corticoides que retrasan la debilidad, kinesiología, controles del corazón y los pulmones y, en algunos casos, terapias génicas nuevas. El manejo en equipo ha prolongado mucho la vida.',
        esp: 'Neurólogo infantil; equipo de enfermedades neuromusculares.',
        alarma: 'Falta de aire, dolores de cabeza al despertar, mucha somnolencia o palpitaciones: consulta pronto.',
        src: ['mp_duchenne', 'mp_distrofia']
      },
      {
        id: 'distrofia_miotonica', n: 'Distrofia miotónica', urg: 2, prev: 0.5, dur: ['m'],
        age: [[20, 50, 1.2]],
        req: ['miotonia'], reqF: 0.3,
        s: { miotonia: 3, debilidad_progresiva: 2, parpado_caido: 2, ctx_familia: 2, vision_nublada_progresiva: 1, somnolencia_diurna: 1, palpitaciones: 1 },
        que: 'La distrofia muscular más común en adultos. Es hereditaria y produce dificultad para relajar los músculos (no poder soltar la mano después de apretar), debilidad de la cara, el cuello, las manos y los pies, párpados caídos, cataratas tempranas, alteraciones del ritmo cardíaco y somnolencia.',
        trat: 'No tiene cura: kinesiología, órtesis, medicamentos para la miotonía si molesta y controles periódicos del corazón (a veces marcapasos), la vista y el azúcar.',
        esp: 'Neurólogo; cardiólogo; genetista.',
        alarma: 'Desmayos, palpitaciones o falta de aire: consulta urgente (riesgo de arritmias).',
        src: ['mp_distrofia', 'mp_distrofia_miotonica_gen']
      },
      {
        id: 'ame', n: 'Atrofia muscular espinal', alt: 'AME', urg: 3, prev: 0.5, dur: ['s', 'm'],
        age: [[0, 3, 1.4]],
        req: ['hipotonia_bebe', 'debilidad_progresiva'], reqF: 0.3,
        s: { hipotonia_bebe: 3, debilidad_progresiva: 3, retraso_desarrollo: 1, respiracion_rapida: 1, ctx_familia: 1 },
        que: 'Enfermedad genética que daña las neuronas de la médula espinal que mueven los músculos. La forma más común aparece en los primeros meses: bebé muy flácido, que no sostiene la cabeza ni se sienta, con llanto débil y problemas para tragar y respirar. Hay formas más leves en niños mayores y adultos.',
        trat: 'Hoy existen tratamientos que cambian el curso de la enfermedad (terapia génica y medicamentos que aumentan la proteína SMN), más eficaces mientras antes se inicien, junto a kinesiología y apoyo respiratorio y nutricional.',
        esp: 'Neurólogo infantil; equipo de enfermedades neuromusculares.',
        alarma: 'Bebé con dificultad para respirar, para tragar o que pierde fuerza: urgencia.',
        src: ['mp_ame']
      },
      {
        id: 'charcot_marie_tooth', n: 'Enfermedad de Charcot-Marie-Tooth', urg: 2, prev: 0.6, dur: ['m'],
        req: ['pies_cavos', 'pie_caido'], reqF: 0.3,
        s: { pies_cavos: 3, pie_caido: 3, ctx_familia: 2, ardor_pies: 1, debilidad_progresiva: 1, calambres: 1 },
        que: 'Grupo de enfermedades hereditarias de los nervios de brazos y piernas. Empieza en la niñez o la adolescencia con debilidad y adelgazamiento de los músculos de pies y piernas, pie caído, tropiezos, pies con arco alto y dedos en garra, y menos sensibilidad. Avanza lentamente.',
        trat: 'No tiene cura: kinesiología, órtesis para el tobillo, calzado adecuado y, a veces, cirugía de los pies. La mayoría mantiene la capacidad de caminar.',
        esp: 'Neurólogo; traumatólogo; fisiatra.',
        alarma: 'Debilidad que avanza en pocos días o problemas para respirar: consulta urgente (puede tratarse de otra causa).',
        src: ['mp_cmt']
      },
      {
        id: 'ataxia_friedreich', n: 'Ataxia de Friedreich', urg: 2, prev: 0.4, dur: ['m'],
        age: [[5, 25, 1.4]],
        req: ['torpeza_progresiva'], reqF: 0.3,
        s: { torpeza_progresiva: 3, ctx_familia: 2, pies_cavos: 1, columna_desviada: 1, palpitaciones: 1, ardor_pies: 1 },
        que: 'Enfermedad hereditaria poco frecuente que daña la médula espinal y los nervios. Suele empezar entre los 5 y 15 años con una marcha inestable que empeora, torpeza, habla arrastrada, pies con arco alto, escoliosis y, a menudo, problemas del corazón y diabetes.',
        trat: 'No tiene cura: kinesiología, terapia del lenguaje, ayudas para la marcha y controles del corazón y del azúcar.',
        esp: 'Neurólogo; cardiólogo; genetista.',
        alarma: 'Palpitaciones, desmayos o falta de aire: consulta urgente.',
        src: ['mp_friedreich']
      },
      {
        id: 'huntington', n: 'Enfermedad de Huntington', urg: 2, prev: 0.5, dur: ['m'],
        age: [[0, 19, 0.3], [30, 55, 1.3]],
        req: ['movimientos_involuntarios'], reqF: 0.3,
        s: { movimientos_involuntarios: 3, ctx_familia: 3, olvidos_progresivos: 2, irritabilidad: 1, tristeza: 1, torpeza_progresiva: 1, impulsividad: 1 },
        que: 'Enfermedad hereditaria (cada hijo de una persona afectada tiene 50 % de probabilidad de heredarla) en la que se degeneran neuronas del cerebro. Suele comenzar entre los 30 y 50 años con movimientos involuntarios bruscos (corea), cambios de carácter, depresión, irritabilidad y deterioro de la memoria y el juicio.',
        trat: 'No tiene cura ni se puede detener: medicamentos para los movimientos y los síntomas psiquiátricos, terapias física, ocupacional y del lenguaje, y apoyo a la familia. Consejo genético.',
        esp: 'Neurólogo; psiquiatra; genetista.',
        alarma: 'Pensamientos de hacerse daño (llama al *4141), atoros frecuentes al comer o caídas: consulta pronto.',
        src: ['mp_huntington']
      }
    ]
  });
})();
