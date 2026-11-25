/*
 * Sintomatología · ampliación: enfermedades frecuentes
 * © 2026 Agustín Vivanco. Todos los derechos reservados.
 * --------------------------------------
 * Mismo formato y criterios que js/data.js (ver su encabezado).
 * Cada tanda suma síntomas, fuentes verificadas y enfermedades con addPack.
 */
(function () {
  'use strict';
  const D = window.SINTOMAS_DATA;
  const { MP, MAYO, MINSAL, SUP, ISP, OMS, OPS, SENDA, CLC, CA, UCC, REDSALUD, GOB, ORPHA } = D.ORGS;

  // ── Tanda 1 (noviembre 2026): oídos, nariz, boca y garganta
  D.addPack({
    symptoms: [
      ['goteo_posnasal', 'Mucosidad que baja por la garganta (goteo posnasal)', 'oong', 1, ['goteo nasal posterior', 'flema en la garganta', 'carraspera']],
      ['congestion_irritantes', 'Nariz tapada o que gotea con olores fuertes, humo o cambios de temperatura', 'oong', 1, ['rinitis vasomotora', 'nariz sensible', 'me gotea la nariz con el frío']],
      ['nariz_tapada_un_lado', 'Nariz tapada siempre del mismo lado', 'oong', 1, ['tabique desviado', 'una fosa tapada']],
      ['respira_boca', 'Respira siempre por la boca (sobre todo al dormir)', 'oong', 1, ['respirador bucal', 'duerme con la boca abierta']],
      ['audicion_gradual', 'Pérdida de audición lenta en ambos oídos (cuesta entender conversaciones)', 'oong', 1, ['sordera progresiva', 'oigo menos', 'presbiacusia', 'sordera de la edad']],
      ['oido_tapado_tragar', 'Oído tapado que cruje o hace chasquidos al tragar o bostezar', 'oong', 1, ['trompa de Eustaquio', 'oído tapado', 'oído con crujidos']],
      ['hinchazon_comer', 'Hinchazón dolorosa bajo la mandíbula o junto a la oreja al comer', 'oong', 1, ['cálculo salival', 'glándula salival', 'sialolitiasis']],
      ['dolor_dulce_frio', 'Dolor de un diente con lo frío, dulce o caliente', 'oong', 1, ['sensibilidad dental', 'dientes sensibles', 'me duele con lo helado']],
      ['mancha_diente', 'Manchas oscuras o agujeros en un diente', 'oong', 1, ['caries', 'diente picado', 'muela picada']],
      ['dientes_flojos', 'Dientes que se mueven o encías que se retraen', 'oong', 1, ['periodontitis', 'piorrea', 'dientes sueltos']],
      ['mal_aliento', 'Mal aliento persistente', 'oong', 1, ['halitosis', 'mal olor de boca', 'mal olor bucal']],
      ['dolor_muela_juicio', 'Dolor e hinchazón de la encía detrás de las últimas muelas', 'oong', 1, ['muela del juicio', 'cordal', 'pericoronaritis']],
      ['grietas_comisuras', 'Grietas o heridas en las comisuras de los labios', 'oong', 1, ['boqueras', 'queilitis angular', 'comisuras partidas']],
      ['llagas_fondo_garganta', 'Llagas o ampollitas en el fondo de la garganta o el paladar', 'oong', 1, ['herpangina', 'ampollas en la garganta']],
      ['lengua_mapa', 'Manchas lisas y rojas en la lengua que cambian de lugar (como un mapa)', 'oong', 1, ['lengua geográfica', 'glositis migratoria']],
      ['secrecion_un_lado', 'Secreción con mal olor por una sola fosa nasal', 'oong', 1, ['moco con mal olor', 'secreción de un lado']],
      ['nariz_deformada', 'Nariz hinchada, desviada o muy dolorosa tras un golpe', 'oong', 1, ['nariz quebrada', 'fractura nasal', 'nariz chueca']],
      ['ctx_voz', 'Usas mucho la voz (profesor/a, cantante, gritos frecuentes)', 'contexto', 0, ['uso de la voz', 'disfonía profesional', 'canto']],
      ['ctx_presion', 'Viaje en avión, buceo, explosión o golpe en el oído reciente', 'contexto', 0, ['avión', 'buceo', 'cambio de presión']],
      ['ctx_ruido', 'Exposición frecuente a ruido fuerte (trabajo, música alta, disparos)', 'contexto', 0, ['ruido laboral', 'trauma acústico', 'audífonos fuertes']],
      ['ctx_objeto', 'Un niño pudo meterse un objeto en la nariz, el oído o la boca', 'contexto', 0, ['se metió algo', 'cuerpo extraño', 'tragó algo', 'se tragó una pila']]
    ],
    sources: {
      mp_sinusitis: [MP, 'Sinusitis', 'https://medlineplus.gov/spanish/ency/article/000647.htm'],
      mp_sinusitis_cronica_img: [MP, 'Sinusitis crónica (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/19356.htm'],
      mayo_rinitis_no_alergica: [MAYO, 'Rinitis no alérgica', 'https://www.mayoclinic.org/es/diseases-conditions/nonallergic-rhinitis/symptoms-causes/syc-20351229'],
      mp_polipos_img: [MP, 'Pólipos nasales (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/9226.htm'],
      mp_nariz_t: [MP, 'Lesiones y enfermedades de la nariz (tabique desviado, fracturas)', 'https://medlineplus.gov/spanish/noseinjuriesanddisorders.html'],
      mp_adenoides: [MP, 'Hipertrofia de adenoides', 'https://medlineplus.gov/spanish/ency/article/001649.htm'],
      mp_ronquera: [MP, 'Ronquera', 'https://medlineplus.gov/spanish/ency/article/003054.htm'],
      mp_voz_t: [MP, 'Trastornos de la voz', 'https://medlineplus.gov/spanish/voicedisorders.html'],
      mp_otitis_efusion: [MP, 'Otitis media exudativa', 'https://medlineplus.gov/spanish/ency/article/007010.htm'],
      mp_timpano: [MP, 'Ruptura del tímpano', 'https://medlineplus.gov/spanish/ency/article/001038.htm'],
      mp_tinnitus: [MP, 'Tinnitus', 'https://medlineplus.gov/spanish/ency/article/003043.htm'],
      mp_hipoacusia: [MP, 'Hipoacusia', 'https://medlineplus.gov/spanish/ency/article/003044.htm'],
      mp_trauma_acustico: [MP, 'Trauma acústico', 'https://medlineplus.gov/spanish/ency/article/001061.htm'],
      mp_hipoacusia_ocupacional: [MP, 'Hipoacusia ocupacional', 'https://medlineplus.gov/spanish/ency/article/001048.htm'],
      mp_barotrauma: [MP, 'Barotrauma del oído', 'https://medlineplus.gov/spanish/ency/article/001064.htm'],
      mp_oido_altura: [MP, 'Oído tapado en altitudes elevadas', 'https://medlineplus.gov/spanish/ency/article/002077.htm'],
      mp_sialolitos: [MP, 'Sialolitos en los conductos salivales', 'https://medlineplus.gov/spanish/ency/article/001039.htm'],
      mp_caries: [MP, 'Caries dentales', 'https://medlineplus.gov/spanish/ency/article/001055.htm'],
      mp_periodontitis: [MP, 'Periodontitis', 'https://medlineplus.gov/spanish/ency/article/001059.htm'],
      mp_diente_impactado: [MP, 'Diente impactado (muela del juicio)', 'https://medlineplus.gov/spanish/ency/article/001057.htm'],
      mayo_dientes_sensibles: [MAYO, 'Dientes sensibles: ¿qué tratamientos hay?', 'https://www.mayoclinic.org/es/healthy-lifestyle/adult-health/expert-answers/sensitive-teeth/faq-20057854'],
      ca_labios: [CA, 'Labios secos y agrietados: por qué se producen', 'https://clinicaalemana.cl/articulos/detalle/2017/labios-secos-y-agrietados-por-que-se-producen'],
      mp_boca_t: [MP, 'Enfermedades de la boca', 'https://medlineplus.gov/spanish/mouthdisorders.html'],
      mp_estomatitis_herpetica: [MP, 'Estomatitis herpética', 'https://medlineplus.gov/spanish/ency/article/001383.htm'],
      mp_herpangina: [MP, 'Herpangina', 'https://medlineplus.gov/spanish/ency/article/000969.htm'],
      ca_herpangina: [CA, 'Herpangina: un contagioso y molesto virus', 'https://www.clinicaalemana.cl/articulos/detalle/2017/herpangina-un-contagioso-y-molesto-virus'],
      mp_glositis: [MP, 'Glositis', 'https://medlineplus.gov/spanish/ency/article/001053.htm'],
      mp_lengua_geografica: [MP, 'Lengua geográfica', 'https://medlineplus.gov/spanish/ency/article/001049.htm'],
      mp_cuerpo_extrano_nariz: [MP, 'Cuerpo extraño en la nariz', 'https://medlineplus.gov/spanish/ency/article/000037.htm'],
      mp_emergencias_oido: [MP, 'Emergencias del oído', 'https://medlineplus.gov/spanish/ency/article/000052.htm']
    },
    conditions: [
      {
        id: 'sinusitis_cronica', n: 'Sinusitis crónica', alt: 'Rinosinusitis crónica', urg: 2, prev: 0.95, dur: ['m'],
        s: { dolor_cara: 3, congestion: 2, goteo_posnasal: 2, secrecion_nasal: 2, perdida_olfato: 2, tos_seca: 1, mal_aliento: 1, dolor_cabeza: 1, fiebre: -1 },
        que: 'Inflamación de los senos paranasales que dura más de 12 semanas. Suele deberse a alergias, pólipos o un tabique desviado que impiden el drenaje, más que a una infección aguda.',
        trat: 'Lavados nasales con suero, corticoides en spray y tratamiento de la alergia; antibióticos solo si hay infección bacteriana. Si no mejora, el otorrino puede indicar cirugía endoscópica.',
        esp: 'Médico general; otorrinolaringólogo.',
        alarma: 'Hinchazón o enrojecimiento alrededor del ojo, visión doble, fiebre alta, dolor de cabeza intenso o rigidez de cuello: urgencia.',
        src: ['mp_sinusitis', 'mp_sinusitis_cronica_img']
      },
      {
        id: 'rinitis_vasomotora', n: 'Rinitis no alérgica', alt: 'Rinitis vasomotora', urg: 1, prev: 0.95, dur: ['s', 'm'],
        s: { congestion_irritantes: 3, congestion: 2, secrecion_nasal: 2, goteo_posnasal: 2, estornudos: 1, picazon_ojos_nariz: -1, fiebre: -1 },
        que: 'Nariz tapada o que gotea de forma crónica sin alergia ni infección. Se desencadena con olores fuertes, humo, cambios de temperatura, comidas condimentadas, alcohol o algunos medicamentos, y casi no produce picazón.',
        trat: 'Evitar los desencadenantes, lavados con suero y, según indicación médica, sprays de corticoides o antihistamínicos nasales. No usar descongestionantes en spray más de 3 días seguidos: pueden empeorarla (rinitis por medicamentos).',
        esp: 'Médico general; otorrinolaringólogo.',
        alarma: 'Secreción por un solo lado, con sangre o mal olor, o pérdida persistente del olfato: consulta para descartar otras causas.',
        src: ['mayo_rinitis_no_alergica']
      },
      {
        id: 'polipos_nasales', n: 'Pólipos nasales', urg: 2, prev: 0.9, dur: ['m'],
        age: [[0, 17, 0.4]],
        s: { perdida_olfato: 3, congestion: 3, secrecion_nasal: 1, goteo_posnasal: 1, ronquidos: 1, dolor_cara: 1 },
        que: 'Crecimientos blandos e indoloros de la mucosa de la nariz y los senos paranasales, causados por inflamación crónica. Son más frecuentes en personas con asma, rinitis alérgica, sinusitis crónica o sensibilidad a la aspirina.',
        trat: 'Corticoides en spray (a veces en comprimidos por poco tiempo) y lavados nasales. Si son grandes o no responden, se extirpan con cirugía endoscópica, aunque pueden volver a aparecer.',
        esp: 'Otorrinolaringólogo.',
        alarma: 'Pólipo de un solo lado, con sangrado, o pólipos en un niño: consulta pronto para descartar otras causas.',
        src: ['mp_polipos_img', 'mp_sinusitis']
      },
      {
        id: 'tabique_desviado', n: 'Desviación del tabique nasal', alt: 'Tabique desviado', urg: 1, prev: 0.95, dur: ['m'],
        s: { nariz_tapada_un_lado: 3, congestion: 2, ronquidos: 1, sangrado_nariz: 1, dolor_cara: 1, respira_boca: 1 },
        que: 'El tabique, la pared que separa las fosas nasales, está corrido hacia un lado, de nacimiento o por un golpe. Una fosa queda más estrecha y aparecen nariz tapada, ronquidos o sinusitis a repetición.',
        trat: 'Si las molestias son leves, sprays de corticoides o antihistamínicos alivian la inflamación. Cuando dificulta mucho la respiración, se corrige con una cirugía llamada septoplastía.',
        esp: 'Otorrinolaringólogo.',
        alarma: 'Tras un golpe en la nariz, hinchazón dolorosa dentro del tabique (posible hematoma): urgencia ese mismo día.',
        src: ['mp_nariz_t', 'mp_sinusitis']
      },
      {
        id: 'hipertrofia_adenoides', n: 'Hipertrofia de adenoides', alt: 'Adenoides grandes (vegetaciones)', urg: 2, prev: 1.0, dur: ['m'],
        ageRange: [0, 17], age: [[2, 8, 1.3]],
        s: { respira_boca: 3, ronquidos: 2, congestion: 2, pausas_respiratorias: 1, secrecion_nasal: 1, audicion: 1 },
        que: 'Las adenoides, tejido de defensa ubicado detrás de la nariz, crecen más de lo normal en algunos niños. Producen nariz tapada permanente, respiración por la boca, ronquidos y otitis o sinusitis frecuentes. Se achican con la edad.',
        trat: 'Si las molestias son leves, se observa y se usan corticoides en spray. Cuando hay apneas del sueño, otitis a repetición o mucha dificultad para respirar, se extirpan (adenoidectomía).',
        esp: 'Pediatra; otorrinolaringólogo.',
        alarma: 'Pausas en la respiración al dormir, mucho sueño o cansancio de día, o problemas de audición: consulta pronto.',
        src: ['mp_adenoides']
      },
      {
        id: 'nodulos_vocales', n: 'Nódulos o pólipos en las cuerdas vocales', urg: 2, prev: 0.95, dur: ['s', 'm'],
        s: { ronquera: 3, ctx_voz: 3, dolor_garganta: 1, fiebre: -1 },
        que: 'Engrosamientos benignos en las cuerdas vocales causados por usar mucho o forzar la voz (gritar, cantar, hablar fuerte por trabajo). Producen voz ronca, cansada o que se corta.',
        trat: 'Reposo de la voz, buena hidratación y terapia con fonoaudiólogo para aprender a usarla bien; dejar de fumar. Si no mejoran, el otorrino puede extirparlos.',
        esp: 'Otorrinolaringólogo; fonoaudiólogo.',
        alarma: 'Ronquera de más de 3 semanas, sobre todo si fumas, o con dificultad para tragar o respirar: consulta para descartar cáncer de laringe.',
        src: ['mp_ronquera', 'mp_voz_t']
      },
      {
        id: 'otitis_efusion', n: 'Otitis media con efusión', alt: 'Otitis serosa (líquido en el oído)', urg: 2, prev: 1.0, dur: ['s', 'm'],
        age: [[0, 10, 1.3]],
        s: { audicion: 3, oido_tapado_tragar: 2, ctx_infeccion_reciente: 2, dolor_oido: 1, zumbido: 1, fiebre: -1 },
        que: 'Acumulación de líquido detrás del tímpano, sin infección activa. Es frecuente en niños después de una otitis o un resfrío y produce oído tapado o menor audición; muchas veces no duele.',
        trat: 'Suele desaparecer sola en semanas o pocos meses, con controles. Si dura más de 3 meses o afecta la audición o el lenguaje, el otorrino puede poner tubitos de ventilación (colleras).',
        esp: 'Pediatra o médico general; otorrinolaringólogo.',
        alarma: 'Niño que no responde cuando le hablan, retraso del lenguaje, dolor intenso o fiebre: consulta pronto.',
        src: ['mp_otitis_efusion']
      },
      {
        id: 'timpano_perforado', n: 'Perforación del tímpano', alt: 'Tímpano roto', urg: 3, prev: 0.95, dur: ['h', 'd', 's'],
        s: { secrecion_oido: 3, audicion: 2, dolor_oido: 2, ctx_presion: 2, zumbido: 1, vertigo: 1 },
        que: 'Agujero en la membrana del tímpano, casi siempre por una otitis media (el dolor alivia de golpe y sale secreción), un golpe, una explosión, cambios de presión o por meter objetos en el oído.',
        trat: 'La mayoría cierra sola en semanas a 2 meses. Mantener el oído seco y no usar gotas sin indicación; a veces se dan antibióticos. Si no cierra, se repara con cirugía (timpanoplastía).',
        esp: 'Médico general; otorrinolaringólogo.',
        alarma: 'Vértigo intenso, debilidad de la cara o pérdida brusca de la audición: urgencia.',
        src: ['mp_timpano']
      },
      {
        id: 'tinnitus', n: 'Tinnitus crónico', alt: 'Acúfenos (zumbido persistente)', urg: 2, prev: 0.95, dur: ['s', 'm'],
        age: [[50, 200, 1.2]],
        s: { zumbido: 3, audicion_gradual: 1, ctx_ruido: 1, insomnio: 1, ansiedad: 1, vertigo_crisis_oido: -1 },
        que: 'Escuchar un pitido, zumbido o silbido sin un sonido externo, durante semanas o meses. Es muy frecuente y suele acompañar a la pérdida de audición por edad o ruido, al tapón de cera o a algunos medicamentos.',
        trat: 'Tratar la causa si se encuentra; audífonos si hay pérdida auditiva, sonidos de fondo para enmascararlo y terapia para manejar la molestia y el insomnio. Evitar el ruido fuerte.',
        esp: 'Médico general; otorrinolaringólogo.',
        alarma: 'Zumbido en un solo oído con pérdida de audición, zumbido que late con el pulso o con vértigo: consulta pronto.',
        src: ['mp_tinnitus']
      },
      {
        id: 'presbiacusia', n: 'Pérdida de audición por la edad', alt: 'Presbiacusia', urg: 2, prev: 1.0, dur: ['m'],
        age: [[0, 49, 0.3], [60, 200, 1.4]],
        s: { audicion_gradual: 3, zumbido: 1, audicion: 1, sordera_subita: -2 },
        que: 'Disminución lenta y progresiva de la audición en ambos oídos que aparece con los años. Primero cuesta entender las conversaciones con ruido de fondo y los sonidos agudos.',
        trat: 'No se revierte, pero los audífonos mejoran mucho la comunicación y la calidad de vida. Evitar el ruido fuerte y revisar si hay tapón de cera.',
        ges: 'La hipoacusia bilateral en personas de 65 años y más que requieren audífono está cubierta por GES.',
        esp: 'Médico general; otorrinolaringólogo; audiometría.',
        alarma: 'Pérdida súbita de audición en un oído: urgencia en las primeras 72 horas.',
        src: ['mp_hipoacusia', 'mayo_audicion', 'minsal_ges']
      },
      {
        id: 'hipoacusia_ruido', n: 'Pérdida de audición por ruido', alt: 'Trauma acústico', urg: 2, prev: 0.95, dur: ['h', 'm'],
        req: ['ctx_ruido'], reqF: 0.4,
        s: { ctx_ruido: 3, audicion_gradual: 2, zumbido: 2, audicion: 1 },
        que: 'Daño del oído interno por ruido muy fuerte, de una sola vez (explosión, disparo) o por exposición repetida (trabajo, música alta). Produce zumbido y pérdida de audición que puede ser permanente.',
        trat: 'El daño permanente no tiene cura; lo principal es prevenir: protectores auditivos y menos volumen. Los audífonos ayudan. Tras un trauma acústico reciente, consultar pronto.',
        esp: 'Médico general; otorrinolaringólogo; mutual de seguridad si es por el trabajo.',
        alarma: 'Pérdida brusca de audición tras una explosión o un ruido intenso: consulta ese mismo día.',
        src: ['mp_trauma_acustico', 'mp_hipoacusia_ocupacional']
      },
      {
        id: 'barotrauma', n: 'Barotrauma del oído', urg: 2, prev: 0.95, dur: ['h', 'd'],
        req: ['ctx_presion'], reqF: 0.3,
        s: { ctx_presion: 3, dolor_oido: 2, audicion: 2, oido_tapado_tragar: 2, zumbido: 1, mareo: 1 },
        que: 'Molestia o daño del oído por un cambio brusco de presión (aterrizaje de un avión, buceo, subidas o bajadas rápidas) cuando la trompa de Eustaquio está tapada, por ejemplo por un resfrío o una alergia.',
        trat: 'Tragar, bostezar o mascar chicle; descongestionantes o sprays nasales según indicación. Suele mejorar en días. Si hay perforación o infección, el médico indicará el tratamiento.',
        esp: 'Médico general; otorrinolaringólogo.',
        alarma: 'Vértigo intenso, pérdida importante de audición o sangre por el oído, sobre todo después de bucear: urgencia.',
        src: ['mp_barotrauma']
      },
      {
        id: 'disfuncion_trompa', n: 'Disfunción de la trompa de Eustaquio', alt: 'Oído tapado persistente', urg: 1, prev: 0.95, dur: ['d', 's', 'm'],
        s: { oido_tapado_tragar: 3, audicion: 2, ctx_infeccion_reciente: 1, congestion: 1, zumbido: 1, dolor_oido: 1, ctx_presion: 1 },
        que: 'La trompa de Eustaquio, que comunica el oído con la nariz, no se abre bien y deja el oído tapado, con crujidos al tragar y menor audición. Suele aparecer con resfríos, alergias o sinusitis.',
        trat: 'Maniobras para destapar el oído (tragar, bostezar, soplar suave con la nariz tapada), lavados nasales y tratar la alergia o el resfrío. Si dura semanas, evaluación por otorrino.',
        esp: 'Médico general; otorrinolaringólogo.',
        alarma: 'Dolor intenso, fiebre, secreción por el oído o pérdida brusca de la audición: consulta pronto.',
        src: ['mp_oido_altura', 'mp_otitis_efusion']
      },
      {
        id: 'sialolitiasis', n: 'Cálculo o infección de una glándula salival', alt: 'Sialolitiasis o sialoadenitis', urg: 2, prev: 0.9, dur: ['d', 's'],
        s: { hinchazon_comer: 3, hinchazon_parotida: 1, fiebre: 1, sed: 1, dolor_mandibula: 1 },
        que: 'Una piedrecita (cálculo) tapa el conducto de una glándula salival, casi siempre la que está bajo la mandíbula. Al comer, la saliva no sale y la glándula se hincha y duele; a veces se infecta.',
        trat: 'Tomar abundante agua, chupar limón o caramelos ácidos para estimular la saliva, masajes y calor local. Si hay infección se usan antibióticos; los cálculos grandes se retiran por la boca o con endoscopia.',
        esp: 'Médico general; otorrinolaringólogo o cirujano maxilofacial.',
        alarma: 'Fiebre alta, pus en la boca, hinchazón que crece rápido o dificultad para tragar o respirar: urgencia.',
        src: ['mp_sialolitos']
      },
      {
        id: 'caries', n: 'Caries dental', urg: 2, prev: 1.05, dur: ['s', 'm'],
        s: { mancha_diente: 3, dolor_dulce_frio: 2, dolor_muela: 2, mal_aliento: 1, hinchazon_encia: -1 },
        que: 'Destrucción del diente por los ácidos que producen las bacterias de la placa a partir de los azúcares. Empieza como manchas blancas o cafés y avanza a agujeros que duelen con lo dulce, lo frío o lo caliente.',
        trat: 'El dentista limpia la caries y pone una tapadura; si llegó al nervio, endodoncia o extracción. Prevención: cepillado con pasta con flúor 2 a 3 veces al día, hilo dental y menos azúcar.',
        ges: 'La salud oral integral a los 6 años, en el embarazo y a los 60 años, y la urgencia odontológica ambulatoria, están cubiertas por GES.',
        esp: 'Dentista.',
        alarma: 'Hinchazón de la cara o la encía, fiebre o dolor que no deja dormir: urgencia odontológica.',
        src: ['mp_caries', 'minsal_ges']
      },
      {
        id: 'periodontitis', n: 'Periodontitis', alt: 'Enfermedad avanzada de las encías («piorrea»)', urg: 2, prev: 1.0, dur: ['m'],
        age: [[0, 29, 0.5], [40, 200, 1.2]],
        s: { dientes_flojos: 3, encias_cepillado: 2, mal_aliento: 2, hinchazon_encia: 1, dolor_muela: 1, ctx_fumador: 1, ctx_diabetes: 1 },
        que: 'Infección crónica de las encías que destruye el hueso y los ligamentos que sujetan los dientes. Suele venir de una gingivitis no tratada y produce encías que sangran y se retraen, mal aliento y dientes que se mueven. Es más frecuente en fumadores y personas con diabetes.',
        trat: 'Limpieza profunda bajo las encías (destartraje y pulido radicular), a veces antibióticos o cirugía de encías. Buena higiene diaria con hilo dental, dejar de fumar y controlar la diabetes.',
        esp: 'Dentista; periodoncista.',
        alarma: 'Hinchazón con pus, fiebre o dolor intenso: consulta odontológica pronto.',
        src: ['mp_periodontitis']
      },
      {
        id: 'pericoronaritis', n: 'Pericoronaritis', alt: 'Infección de la muela del juicio', urg: 2, prev: 0.95, dur: ['d'],
        age: [[15, 30, 1.4], [40, 200, 0.5]],
        s: { dolor_muela_juicio: 3, dolor_mandibula: 2, mal_aliento: 1, ganglios: 1, fiebre: 1, dolor_garganta: 1 },
        que: 'Inflamación e infección de la encía que cubre en parte una muela del juicio que no termina de salir. Se acumulan restos de comida y bacterias, con dolor detrás de las últimas muelas, dificultad para abrir la boca y mal sabor.',
        trat: 'Lavados con agua tibia con sal o clorhexidina, analgésicos y, si hay infección, antibióticos indicados por el dentista. Cuando se repite, se recomienda sacar la muela del juicio.',
        esp: 'Dentista; cirujano maxilofacial.',
        alarma: 'Hinchazón de la cara o el cuello, fiebre alta o dificultad para tragar o respirar: urgencia.',
        src: ['mp_diente_impactado']
      },
      {
        id: 'sensibilidad_dental', n: 'Sensibilidad dental', alt: 'Hipersensibilidad dentinaria', urg: 1, prev: 1.0, dur: ['s', 'm'],
        s: { dolor_dulce_frio: 3, dolor_muela: 1, mancha_diente: -1, hinchazon_encia: -1 },
        que: 'Dolor breve y agudo en uno o varios dientes con lo frío, caliente, dulce o al cepillarse. Ocurre cuando el esmalte se desgasta o las encías se retraen y queda expuesta la dentina; también tras blanqueamientos o por apretar los dientes.',
        trat: 'Pasta de dientes para dientes sensibles, cepillo suave sin frotar fuerte y menos bebidas ácidas. El dentista puede aplicar flúor o sellantes y revisar si hay caries o una tapadura desgastada.',
        esp: 'Dentista.',
        alarma: 'Dolor que dura minutos después del estímulo, que aparece solo o que no deja dormir: consulta (puede ser una caries profunda).',
        src: ['mayo_dientes_sensibles']
      },
      {
        id: 'queilitis_angular', n: 'Queilitis angular', alt: '«Boqueras»', urg: 1, prev: 1.0, dur: ['d', 's'],
        s: { grietas_comisuras: 3, placas_boca: 1, ctx_diabetes: 1, palidez: 1 },
        que: 'Grietas rojas y dolorosas en las comisuras de la boca. Se producen por saliva acumulada (al lamerse los labios, por prótesis dentales mal ajustadas o pliegues), a menudo con hongos o bacterias; también puede reflejar falta de hierro o de vitaminas.',
        trat: 'Mantener la zona seca, usar bálsamo o vaselina y, si hay hongos o bacterias, cremas antifúngicas o antibióticas indicadas por el médico. Revisar la prótesis dental y tratar la anemia si existe.',
        esp: 'Médico general; dermatólogo o dentista.',
        alarma: 'Si no mejora en 2 semanas o se repite a menudo: consulta para buscar anemia, diabetes u otras causas.',
        src: ['ca_labios', 'mp_boca_t']
      },
      {
        id: 'gingivoestomatitis', n: 'Gingivoestomatitis herpética', alt: 'Primera infección por herpes en la boca', urg: 2, prev: 1.0, dur: ['d'],
        age: [[0, 6, 1.5], [15, 200, 0.6]],
        s: { llagas_boca: 3, encias_cepillado: 2, fiebre: 2, inapetencia: 1, ganglios: 1, irritabilidad: 1, mal_aliento: 1, llagas_fondo_garganta: -1 },
        que: 'Infección por el virus del herpes simple, generalmente la primera vez, sobre todo en niños pequeños. Produce fiebre, encías rojas e hinchadas que sangran y muchas llagas dolorosas en la boca y los labios, por lo que el niño no quiere comer ni beber.',
        trat: 'Mejora sola en 7 a 14 días. Paracetamol o ibuprofeno según el peso, líquidos fríos y comidas blandas. El médico puede indicar un antiviral (aciclovir) si se consulta en los primeros días.',
        esp: 'Pediatra o médico general.',
        alarma: 'Niño que no toma líquidos, orina poco o está decaído; ampollas cerca de los ojos: consulta urgente.',
        src: ['mp_estomatitis_herpetica']
      },
      {
        id: 'herpangina', n: 'Herpangina', urg: 2, prev: 1.0, dur: ['d'],
        age: [[0, 10, 1.5], [15, 200, 0.5]],
        s: { llagas_fondo_garganta: 3, fiebre: 2, dolor_garganta: 2, inapetencia: 1, dolor_cabeza: 1, vomitos: 1, lesiones_manos_pies: -1 },
        que: 'Infección por enterovirus (como el coxsackie), frecuente en niños en verano y otoño. Produce fiebre de inicio brusco y ampollitas o úlceras dolorosas en el fondo de la garganta y el paladar. Es pariente de la enfermedad de mano, pie y boca.',
        trat: 'No necesita antibióticos: paracetamol o ibuprofeno según el peso, abundantes líquidos fríos (helados, leche fría) y evitar comidas ácidas o calientes. Dura alrededor de una semana.',
        esp: 'Pediatra o médico general.',
        alarma: 'Signos de deshidratación (orina escasa, boca seca, decaimiento), convulsión o rigidez de cuello: urgencia.',
        src: ['mp_herpangina', 'ca_herpangina']
      },
      {
        id: 'lengua_geografica', n: 'Lengua geográfica', alt: 'Glositis migratoria benigna', urg: 1, prev: 1.0, dur: ['s', 'm'],
        s: { lengua_mapa: 3, llagas_boca: -1 },
        que: 'Manchas lisas y rojas con borde blanquecino en la lengua que cambian de forma y de lugar con los días, como un mapa. Es benigna y no contagiosa; a veces arde con comidas picantes o ácidas.',
        trat: 'No requiere tratamiento. Si molesta, evitar alimentos picantes, ácidos o muy calientes; el médico puede indicar geles o enjuagues para el ardor.',
        esp: 'Dentista o médico general.',
        alarma: 'Mancha o herida en la lengua que no cambia ni desaparece en 2 semanas: consulta para descartar otras causas.',
        src: ['mp_glositis', 'mp_lengua_geografica']
      },
      {
        id: 'cuerpo_extrano_nariz', n: 'Cuerpo extraño en la nariz', urg: 3, prev: 0.95, dur: ['h', 'd', 's'],
        age: [[1, 8, 1.5], [15, 200, 0.4]],
        s: { secrecion_un_lado: 3, ctx_objeto: 3, nariz_tapada_un_lado: 2, sangrado_nariz: 1, mal_aliento: 1 },
        que: 'Objeto pequeño (semilla, juguete, papel, pila) que un niño se introduce en la nariz. A veces no se nota y aparece días después como secreción con mal olor o sangre por una sola fosa.',
        trat: 'No intentar sacarlo con pinzas ni cotonitos: puede empujarlo más adentro. Si se ve, tapar la otra fosa y soplar suave. Si no sale, el médico lo extrae con instrumentos adecuados.',
        esp: 'Servicio de urgencia; otorrinolaringólogo.',
        alarma: 'Pila de botón o imanes en la nariz, dificultad para respirar o sangrado que no se detiene: urgencia inmediata.',
        src: ['mp_cuerpo_extrano_nariz']
      },
      {
        id: 'cuerpo_extrano_oido', n: 'Cuerpo extraño en el oído', alt: 'Objeto o insecto en el oído', urg: 3, prev: 0.95, dur: ['h', 'd'],
        req: ['ctx_objeto'], reqF: 0.4,
        s: { ctx_objeto: 3, audicion: 2, dolor_oido: 2, secrecion_oido: 1, zumbido: 1 },
        que: 'Un objeto pequeño (cuentas, piedrecitas, algodón) o un insecto queda dentro del conducto del oído. Produce oído tapado, dolor o ruidos; un insecto vivo causa mucha molestia.',
        trat: 'No meter cotonitos ni pinzas. Inclinar la cabeza hacia el lado afectado para que salga. Si es un insecto, se pueden poner unas gotas de aceite tibio (nunca si se sospecha que el tímpano está roto). Si no sale, lo extrae el médico.',
        esp: 'Servicio de urgencia; otorrinolaringólogo.',
        alarma: 'Pila de botón en el oído, dolor intenso, sangrado o pérdida de audición: urgencia.',
        src: ['mp_emergencias_oido']
      },
      {
        id: 'fractura_nasal', n: 'Fractura de nariz', alt: 'Nariz quebrada', urg: 3, prev: 0.95, dur: ['h', 'd'],
        s: { nariz_deformada: 3, ctx_golpe: 2, sangrado_nariz: 2, congestion: 1, hinchazon_moreton: 1 },
        que: 'Quiebre de los huesos o el cartílago de la nariz por un golpe (deporte, caída, pelea). Produce dolor, hinchazón, moretones alrededor de los ojos, sangrado y a veces la nariz queda chueca.',
        trat: 'Frío local, cabeza elevada y analgésicos. El médico la evalúa entre los días 3 y 7, cuando baja la hinchazón; si quedó desviada, se puede reacomodar. Para el sangrado, presionar la nariz.',
        esp: 'Servicio de urgencia; otorrinolaringólogo.',
        alarma: 'Sangrado que no para en 15 minutos, salida de líquido claro por la nariz, golpe fuerte en la cabeza, visión doble o hinchazón dentro del tabique: urgencia.',
        src: ['mp_nariz_t']
      }
    ]
  });

  // ── Tanda 2 (noviembre 2026): boca, ojos y bronquios
  D.addPack({
    symptoms: [
      ['diente_roto', 'Diente roto, suelto o que se salió por un golpe', 'oong', 2, ['diente quebrado', 'se me cayó un diente', 'trauma dental']],
      ['lengua_atada', 'Lengua que no se puede sacar ni levantar bien (o bebé que no logra mamar bien)', 'oong', 1, ['frenillo corto', 'anquiloglosia', 'lengua atada']],
      ['placa_blanca_fija', 'Placa blanca en la boca que no se desprende al rasparla', 'oong', 1, ['leucoplasia', 'mancha blanca en la boca']],
      ['bulto_labio', 'Bultito blando, transparente o azulado, en el labio o dentro de la boca', 'oong', 1, ['mucocele', 'quiste en el labio', 'ampolla en el labio']],
      ['ctx_anginas_repetidas', 'Has tenido muchas amigdalitis («anginas») en el último año', 'contexto', 0, ['amigdalitis a repetición', 'anginas seguidas']],
      ['bulto_parpado_indoloro', 'Bulto firme e indoloro en el párpado que crece lento', 'ojos', 1, ['chalazión', 'quiste en el párpado']],
      ['carnosidad_ojo', 'Carnosidad o mancha amarillenta en la parte blanca del ojo, junto a la córnea', 'ojos', 1, ['pterigión', 'carnosidad', 'pinguécula', 'telita en el ojo']],
      ['mancha_roja_ojo', 'Mancha roja intensa en la parte blanca del ojo, sin dolor', 'ojos', 1, ['derrame en el ojo', 'vena reventada en el ojo', 'hemorragia subconjuntival']],
      ['vision_lejos', 'Dificultad para ver de lejos (pizarra, letreros, televisión)', 'ojos', 1, ['miopía', 'no veo de lejos']],
      ['ojos_desviados', 'Un ojo se desvía hacia adentro, afuera, arriba o abajo', 'ojos', 1, ['estrabismo', 'ojo bizco', 'ojo desviado']],
      ['vision_un_ojo_nino', 'Un ojo ve menos que el otro (lo detectaron en un control o en el colegio)', 'ojos', 1, ['ojo perezoso', 'ojo flojo', 'ambliopía']],
      ['vision_lateral', 'Pérdida lenta de la visión de los costados (visión en túnel)', 'ojos', 1, ['visión de túnel', 'pierdo visión lateral']],
      ['hinchazon_lagrimal', 'Hinchazón roja y dolorosa en el ángulo interno del ojo, junto a la nariz', 'ojos', 1, ['dacriocistitis', 'lagrimal infectado']],
      ['moreton_ojo', 'Moretón e hinchazón alrededor del ojo tras un golpe', 'ojos', 1, ['ojo morado', 'ojo en tinta', 'hematoma en el ojo']],
      ['parpado_hinchado_rojo', 'Párpado muy hinchado, rojo y caliente', 'ojos', 2, ['celulitis del párpado', 'párpado inflamado']],
      ['colores_confunde', 'Confundes algunos colores (por ejemplo, rojo con verde)', 'ojos', 1, ['daltonismo', 'no distingo colores']],
      ['flema_abundante', 'Mucha flema todos los días, a veces con mal olor', 'respiracion', 1, ['expectoración abundante', 'desgarro diario', 'bronquiectasias']],
      ['ctx_lentes_contacto', 'Usas lentes de contacto', 'contexto', 0, ['lentes de contacto', 'pupilentes']],
      ['ctx_pantallas', 'Muchas horas al día frente a pantallas o leyendo', 'contexto', 0, ['computador', 'celular', 'pantallas']],
      ['ctx_quimico_ojo', 'Te entró un químico en el ojo (cloro, cal, cemento, soda cáustica, limpiadores)', 'contexto', 0, ['químico en el ojo', 'cloro en el ojo', 'quemadura química']]
    ],
    sources: {
      mp_diente_golpe: [MP, 'Fractura o caída de un diente por un golpe', 'https://medlineplus.gov/spanish/ency/article/000058.htm'],
      mp_aliento: [MP, 'Aliento fuerte', 'https://medlineplus.gov/spanish/ency/article/003058.htm'],
      mp_frenillo: [MP, 'Frenillo lingual corto', 'https://medlineplus.gov/spanish/ency/article/001640.htm'],
      mayo_frenillo: [MAYO, 'Anquiloglosia (frenillo lingual corto)', 'https://www.mayoclinic.org/es/diseases-conditions/tongue-tie/symptoms-causes/syc-20378452'],
      mp_cancer_oral: [MP, 'Cáncer oral (incluye la leucoplasia)', 'https://medlineplus.gov/spanish/ency/article/001035.htm'],
      mp_mucocele: [MP, 'Quiste mucoso oral', 'https://medlineplus.gov/spanish/ency/article/001639.htm'],
      mp_amigdalitis: [MP, 'Amigdalitis', 'https://medlineplus.gov/spanish/ency/article/001043.htm'],
      mp_chalazion: [MP, 'Chalazión', 'https://medlineplus.gov/spanish/ency/article/001006.htm'],
      mp_pinguecula: [MP, 'Pinguécula (y pterigión)', 'https://medlineplus.gov/spanish/ency/article/001025.htm'],
      mp_hemorragia_subconj: [MP, 'Hemorragia subconjuntival', 'https://medlineplus.gov/spanish/ency/article/001616.htm'],
      mp_miopia: [MP, 'Miopía', 'https://medlineplus.gov/spanish/ency/article/001023.htm'],
      mp_astigmatismo: [MP, 'Astigmatismo', 'https://medlineplus.gov/spanish/ency/article/001015.htm'],
      mp_refraccion_t: [MP, 'Errores de refracción', 'https://medlineplus.gov/spanish/refractiveerrors.html'],
      mp_estrabismo: [MP, 'Estrabismo', 'https://medlineplus.gov/spanish/ency/article/001004.htm'],
      mp_ambliopia: [MP, 'Ambliopía', 'https://medlineplus.gov/spanish/ency/article/001014.htm'],
      mp_ulcera_cornea: [MP, 'Úlceras e infecciones corneales', 'https://medlineplus.gov/spanish/ency/article/001032.htm'],
      mp_ojos_rojos: [MP, 'Enrojecimiento de los ojos (incluye la uveítis)', 'https://medlineplus.gov/spanish/ency/article/003031.htm'],
      mp_lampara_hendidura: [MP, 'Examen con lámpara de hendidura', 'https://medlineplus.gov/spanish/ency/article/003880.htm'],
      mp_diabetes_ojos: [MP, 'Diabetes y enfermedad ocular', 'https://medlineplus.gov/spanish/ency/article/001212.htm'],
      mp_moscas_volantes: [MP, 'Moscas volantes', 'https://medlineplus.gov/spanish/ency/article/002085.htm'],
      mp_conj_neonatal: [MP, 'Conjuntivitis neonatal (y conducto lagrimal obstruido)', 'https://medlineplus.gov/spanish/ency/article/001606.htm'],
      mayo_fatiga_ocular: [MAYO, 'Fatiga ocular', 'https://www.mayoclinic.org/es/diseases-conditions/eyestrain/symptoms-causes/syc-20372397'],
      mayo_ojo_morado: [MAYO, 'Ojo morado: primeros auxilios', 'https://www.mayoclinic.org/es/first-aid/first-aid-black-eye/basics/art-20056675'],
      mp_celulitis_periorbitaria: [MP, 'Celulitis periorbitaria', 'https://medlineplus.gov/spanish/ency/article/000976.htm'],
      mayo_daltonismo: [MAYO, 'Daltonismo', 'https://www.mayoclinic.org/es/diseases-conditions/color-blindness/symptoms-causes/syc-20354988'],
      mp_parpado_caido: [MP, 'Párpado caído', 'https://medlineplus.gov/spanish/ency/article/001018.htm'],
      mp_bronquiectasia: [MP, 'Bronquiectasia', 'https://medlineplus.gov/spanish/ency/article/000144.htm']
    },
    conditions: [
      {
        id: 'trauma_dental', n: 'Trauma dental', alt: 'Diente roto o caído por un golpe', urg: 4, prev: 0.95, dur: ['h', 'd'],
        s: { diente_roto: 3, ctx_golpe: 1, dolor_muela: 2, sangrado_encias: -1 },
        que: 'Fractura, aflojamiento o salida completa de un diente por un golpe (caídas, deporte, accidentes). Un diente definitivo que se salió puede volver a implantarse si se actúa rápido, idealmente en menos de una hora.',
        trat: 'Tomar el diente por la corona (nunca por la raíz), no frotarlo ni limpiarlo con alcohol; si es posible, volver a ponerlo en su lugar y morder una gasa, o guardarlo en leche o en saliva. Ir de inmediato al dentista o a una urgencia dental.',
        ges: 'La urgencia odontológica ambulatoria está cubierta por GES.',
        esp: 'Dentista (urgencia dental).',
        alarma: 'Golpe en la cabeza con pérdida de conocimiento, vómitos o si no puedes juntar los dientes (posible fractura de mandíbula): urgencia.',
        src: ['mp_diente_golpe', 'minsal_ges']
      },
      {
        id: 'halitosis', n: 'Mal aliento', alt: 'Halitosis', urg: 1, prev: 1.0, dur: ['s', 'm'],
        s: { mal_aliento: 3, sed: 1, goteo_posnasal: 1, encias_cepillado: 1, regurgitacion: 1 },
        que: 'Olor desagradable de la boca que persiste. Casi siempre se origina en la propia boca: restos de comida y bacterias en la lengua, caries o enfermedad de las encías, boca seca, tabaco o algunos alimentos. Con menos frecuencia viene de la nariz, la garganta, el estómago o enfermedades generales.',
        trat: 'Cepillarse los dientes y la lengua, usar hilo dental, tomar agua, no fumar y controlarse con el dentista. Si persiste a pesar de una buena higiene, consultar al médico para buscar otras causas.',
        esp: 'Dentista; médico general si persiste.',
        alarma: 'Mal aliento con fiebre, dolor o hinchazón de la boca, o con baja de peso: consulta pronto.',
        src: ['mp_aliento']
      },
      {
        id: 'frenillo_corto', n: 'Frenillo lingual corto', alt: 'Anquiloglosia', urg: 1, prev: 1.0, dur: ['m'],
        age: [[0, 2, 1.4], [12, 200, 0.4]],
        s: { lengua_atada: 3 },
        que: 'La banda de tejido bajo la lengua es corta o gruesa y limita su movimiento. Es frecuente en recién nacidos; a veces dificulta la lactancia (mal agarre, dolor del pezón) y, en niños mayores, algunos sonidos del habla.',
        trat: 'Muchos no necesitan tratamiento. Si causa problemas de lactancia o del habla, se corta con un procedimiento simple (frenotomía o frenuloplastía). Una matrona o consultora de lactancia puede ayudar con el agarre.',
        esp: 'Pediatra; matrona o consultora de lactancia; odontopediatra u otorrino.',
        alarma: 'Bebé que no sube de peso o que moja pocos pañales: consulta pronto.',
        src: ['mp_frenillo', 'mayo_frenillo']
      },
      {
        id: 'leucoplasia', n: 'Leucoplasia oral', urg: 2, prev: 0.9, dur: ['s', 'm'],
        age: [[0, 34, 0.4], [40, 200, 1.2]],
        s: { placa_blanca_fija: 3, ctx_fumador: 2, ctx_alcohol: 1, placas_boca: -1 },
        que: 'Placas blancas y gruesas en la lengua, las encías o las mejillas que no se desprenden al rasparlas. Se relaciona con el tabaco, el alcohol o roces crónicos. Casi siempre es benigna, pero algunas pueden transformarse en cáncer de boca.',
        trat: 'Dejar de fumar y de beber alcohol y corregir roces de prótesis o dientes. El dentista o médico puede pedir una biopsia y, según el resultado, extirparla y hacer controles.',
        esp: 'Dentista; cirujano maxilofacial o dermatólogo.',
        alarma: 'Placa roja o mixta, herida que no cicatriza en 2 semanas, bulto o dolor al tragar: consulta pronto para descartar cáncer.',
        src: ['mp_cancer_oral']
      },
      {
        id: 'mucocele', n: 'Mucocele', alt: 'Quiste mucoso del labio', urg: 1, prev: 1.0, dur: ['d', 's', 'm'],
        s: { bulto_labio: 3 },
        que: 'Bultito blando, liso y a veces azulado en la cara interna del labio inferior, en las mejillas o bajo la lengua. Se forma cuando una glándula salival pequeña se rompe o se tapa, a menudo por morderse el labio. No es grave.',
        trat: 'Muchas veces desaparece solo. Si persiste, se repite o molesta, el dentista o cirujano lo extirpa con un procedimiento menor. Evitar morderse el labio.',
        esp: 'Dentista; cirujano maxilofacial.',
        alarma: 'Bulto duro, que sangra, crece rápido o no desaparece en un mes: consulta para revisarlo.',
        src: ['mp_mucocele']
      },
      {
        id: 'amigdalitis_recurrente', n: 'Amigdalitis recurrente', alt: 'Anginas a repetición', urg: 2, prev: 0.95, dur: ['d', 'm'],
        req: ['ctx_anginas_repetidas'], reqF: 0.4,
        s: { ctx_anginas_repetidas: 3, dolor_garganta: 2, placas: 2, fiebre: 1, ganglios: 1, mal_aliento: 1, ronquidos: 1 },
        que: 'Inflamación repetida de las amígdalas, por virus o por estreptococo, varias veces al año. Además de los episodios de dolor de garganta y fiebre, puede haber amígdalas grandes con ronquidos o pausas al dormir.',
        trat: 'Cada episodio se trata según su causa (antibiótico si es estreptococo). Cuando las amigdalitis son muy frecuentes (por ejemplo, 7 o más en un año) o hay apneas del sueño, el otorrino puede indicar sacar las amígdalas.',
        esp: 'Médico general o pediatra; otorrinolaringólogo.',
        alarma: 'Dolor intenso de un lado con dificultad para abrir la boca o tragar saliva, voz apagada o dificultad para respirar: urgencia.',
        src: ['mp_amigdalitis']
      },
      {
        id: 'chalazion', n: 'Chalazión', alt: 'Quiste del párpado', urg: 1, prev: 1.0, dur: ['s', 'm'],
        s: { bulto_parpado_indoloro: 3, bulto_parpado: 1, vision_borrosa: 1 },
        que: 'Bulto firme y generalmente indoloro en el párpado, causado por la obstrucción de una glándula de grasa. Puede quedar después de un orzuelo y es más frecuente con blefaritis o rosácea.',
        trat: 'Compresas tibias varias veces al día por unos minutos y masaje suave; muchos desaparecen en semanas. Si persiste o es grande, el oftalmólogo puede vaciarlo con una cirugía menor o inyectarlo.',
        esp: 'Médico general; oftalmólogo.',
        alarma: 'Párpado muy rojo e hinchado con fiebre, o bulto que vuelve a salir en el mismo lugar: consulta (a veces hay que descartar otras lesiones).',
        src: ['mp_chalazion', 'mp_parpado']
      },
      {
        id: 'pterigion', n: 'Pterigión y pinguécula', alt: '«Carnosidad» en el ojo', urg: 1, prev: 1.0, dur: ['m'],
        age: [[0, 19, 0.3]],
        s: { carnosidad_ojo: 3, ojo_rojo: 1, arena_ojos: 1, ctx_calor: 1 },
        que: 'Crecimientos benignos de la conjuntiva por la exposición al sol, el viento y el polvo. La pinguécula es una mancha amarillenta que no cubre la córnea; el pterigión es una carnosidad que avanza sobre ella y, si es grande, puede afectar la visión.',
        trat: 'Lágrimas artificiales y lentes de sol con filtro UV; gotas antiinflamatorias si se inflaman. Si el pterigión crece hacia el centro de la córnea o molesta mucho, se extirpa con cirugía.',
        esp: 'Oftalmólogo.',
        alarma: 'Disminución de la visión o crecimiento rápido: consulta con oftalmólogo.',
        src: ['mp_pinguecula']
      },
      {
        id: 'hemorragia_subconjuntival', n: 'Derrame en el ojo', alt: 'Hemorragia subconjuntival', urg: 1, prev: 1.0, dur: ['h', 'd', 's'],
        s: { mancha_roja_ojo: 3, ojo_rojo: 1, dolor_ojo: -2, vision_borrosa: -1, laganas: -1 },
        que: 'Mancha roja intensa en la parte blanca del ojo por la rotura de un vasito sanguíneo, muchas veces tras toser, estornudar o hacer fuerza, o sin causa clara. No duele ni afecta la visión, aunque se ve llamativa.',
        trat: 'No necesita tratamiento: se reabsorbe sola en 2 a 3 semanas, cambiando de color como un moretón. Lágrimas artificiales si hay sensación de arenilla. Controlar la presión arterial.',
        esp: 'Médico general si se repite.',
        alarma: 'Dolor, baja de la visión, sangrado tras un golpe fuerte, derrames repetidos o moretones en otras partes: consulta pronto.',
        src: ['mp_hemorragia_subconj']
      },
      {
        id: 'vicios_refraccion', n: 'Vicios de refracción', alt: 'Miopía, hipermetropía o astigmatismo', urg: 1, prev: 1.05, dur: ['m'],
        s: { vision_lejos: 3, vision_borrosa: 2, dolor_cabeza: 1, vision_cerca: 1, arena_ojos: 1, vision_subita: -2 },
        que: 'El ojo no enfoca bien la luz: en la miopía se ve mal de lejos, en la hipermetropía cuesta enfocar de cerca y en el astigmatismo se ve borroso o distorsionado. Suelen aparecer en la niñez o la adolescencia y causar dolor de cabeza o cansancio visual.',
        trat: 'Lentes ópticos o de contacto; en adultos con la graduación estable, cirugía láser. En niños son importantes los controles para no afectar el aprendizaje.',
        ges: 'Los vicios de refracción en personas de 65 años y más están cubiertos por GES.',
        esp: 'Oftalmólogo o tecnólogo médico en oftalmología.',
        alarma: 'Pérdida súbita de visión, visión doble, destellos o una cortina en la vista: urgencia.',
        src: ['mp_miopia', 'mp_astigmatismo', 'mp_refraccion_t']
      },
      {
        id: 'estrabismo', n: 'Estrabismo', alt: 'Ojos desviados («bizco»)', urg: 2, prev: 1.0, dur: ['m'],
        age: [[0, 9, 1.4]],
        s: { ojos_desviados: 3, vision_un_ojo_nino: 1, vision_borrosa: 1 },
        que: 'Los ojos no miran en la misma dirección: uno se desvía hacia adentro, afuera, arriba o abajo. Es frecuente en niños y, si no se trata a tiempo, el cerebro deja de usar el ojo desviado (ojo perezoso).',
        trat: 'Lentes, parches en el ojo sano y, a veces, cirugía de los músculos del ojo. Mientras antes se trate en niños, mejor es el resultado.',
        ges: 'El estrabismo en menores de 9 años está cubierto por GES.',
        esp: 'Oftalmólogo (oftalmología infantil).',
        alarma: 'Desviación de un ojo o visión doble que aparece de golpe en un adulto o un niño mayor: urgencia (puede ser un problema neurológico).',
        src: ['mp_estrabismo', 'minsal_ges']
      },
      {
        id: 'ambliopia', n: 'Ambliopía', alt: 'Ojo perezoso', urg: 2, prev: 1.0, dur: ['m'],
        ageRange: [0, 18], age: [[0, 8, 1.3]],
        s: { vision_un_ojo_nino: 3, ojos_desviados: 2, vision_borrosa: 1 },
        que: 'Disminución de la visión de un ojo porque el cerebro dejó de usarlo durante la infancia, por estrabismo, una diferencia grande de graduación entre ambos ojos o algo que tapaba la visión (como un párpado caído o una catarata).',
        trat: 'Corregir la causa (lentes) y obligar al ojo débil a trabajar con parches en el ojo sano o gotas. Funciona mejor antes de los 7 u 8 años; por eso son importantes los controles visuales infantiles.',
        esp: 'Oftalmólogo (oftalmología infantil).',
        alarma: 'Cualquier sospecha en un niño pequeño: consulta pronto, porque el tratamiento depende de la edad.',
        src: ['mp_ambliopia']
      },
      {
        id: 'queratitis', n: 'Queratitis o úlcera de córnea', urg: 4, prev: 0.95, dur: ['h', 'd'],
        s: { dolor_ojo: 3, ojo_rojo: 2, fotofobia: 2, vision_borrosa: 2, ctx_lentes_contacto: 2, lagrimeo: 1, laganas: 1, cuerpo_extrano_ojo: 1 },
        que: 'Infección o inflamación de la córnea, la capa transparente del ojo, por bacterias, virus (herpes), hongos o amebas. Es más frecuente en personas que usan lentes de contacto, sobre todo si duermen con ellos o los lavan con agua. Produce dolor, ojo rojo, molestia con la luz y visión borrosa.',
        trat: 'Requiere evaluación oftalmológica urgente y tratamiento con gotas antibióticas, antivirales o antifúngicas según la causa. Suspender los lentes de contacto. Si se retrasa, puede dejar cicatriz y pérdida de visión.',
        esp: 'Oftalmólogo (urgencia oftalmológica).',
        alarma: 'Dolor intenso, mancha blanca en la córnea o baja de la visión: urgencia el mismo día.',
        src: ['mp_ulcera_cornea']
      },
      {
        id: 'uveitis', n: 'Uveítis', alt: 'Iritis (inflamación dentro del ojo)', urg: 4, prev: 0.9, dur: ['h', 'd', 's'],
        s: { fotofobia: 3, dolor_ojo: 2, ojo_rojo: 2, vision_borrosa: 2, moscas_destellos: 1, dolor_lumbar: 1, laganas: -2 },
        que: 'Inflamación de la úvea, la capa media del ojo. Produce ojo rojo (sobre todo alrededor de la córnea), dolor, mucha molestia con la luz y visión borrosa, sin lagañas. Puede asociarse a enfermedades reumáticas (como la espondilitis), intestinales o infecciones.',
        trat: 'Gotas de corticoides y gotas que dilatan la pupila indicadas por el oftalmólogo; a veces tratamiento general. Hay que buscar enfermedades asociadas.',
        esp: 'Oftalmólogo (pronto); reumatólogo si se repite.',
        alarma: 'Baja de la visión o dolor intenso: urgencia oftalmológica el mismo día.',
        src: ['mp_ojos_rojos', 'mp_lampara_hendidura']
      },
      {
        id: 'glaucoma_cronico', n: 'Glaucoma crónico', alt: 'Glaucoma de ángulo abierto', urg: 2, prev: 1.0, dur: ['m'],
        age: [[0, 39, 0.3], [60, 200, 1.4]],
        s: { vision_lateral: 3, ctx_familia: 1, vision_borrosa: 1, ctx_diabetes: 1, dolor_ojo: -2, halos: -1 },
        que: 'Daño lento del nervio óptico, generalmente por presión alta dentro del ojo. No duele y al principio no da síntomas; con los años se pierde la visión de los costados. Es más frecuente después de los 40 años, con antecedentes familiares, diabetes o miopía alta.',
        trat: 'Gotas que bajan la presión del ojo, de por vida, y a veces láser o cirugía. La visión perdida no se recupera, por eso es clave el control con fondo de ojo y medición de la presión desde los 40 años.',
        esp: 'Oftalmólogo.',
        alarma: 'Dolor intenso del ojo con visión borrosa, halos, náuseas o vómitos: urgencia (crisis de glaucoma agudo).',
        src: ['mp_glaucoma', 'mp_ojos_rojos']
      },
      {
        id: 'retinopatia_diabetica', n: 'Retinopatía diabética', urg: 2, prev: 1.0, dur: ['s', 'm'],
        req: ['ctx_diabetes'], reqF: 0.3,
        s: { ctx_diabetes: 3, vision_borrosa: 2, moscas_destellos: 1, vision_central: 1 },
        que: 'Daño de los vasos sanguíneos de la retina por la diabetes. Al principio no da síntomas; después aparecen visión borrosa, manchas o pérdida de visión. Es una de las principales causas de ceguera en adultos y se puede prevenir.',
        trat: 'Buen control del azúcar, la presión y el colesterol; fondo de ojo al menos una vez al año. Según la etapa, láser, inyecciones dentro del ojo o cirugía.',
        ges: 'La retinopatía diabética está cubierta por GES.',
        esp: 'Médico de cabecera; oftalmólogo.',
        alarma: 'Pérdida súbita de visión, muchas manchas nuevas o una cortina en la vista: urgencia oftalmológica.',
        src: ['mp_diabetes_ojos', 'minsal_ges']
      },
      {
        id: 'desprendimiento_vitreo', n: 'Desprendimiento del vítreo', alt: '«Moscas volantes»', urg: 3, prev: 1.0, dur: ['h', 'd', 's', 'm'],
        age: [[0, 39, 0.4], [50, 200, 1.3]],
        s: { moscas_destellos: 3, vision_borrosa: 1, cortina_vision: -2 },
        que: 'Con la edad, el gel que llena el ojo (vítreo) se licúa y se separa de la retina. Aparecen manchas, hilos o telarañas que flotan en la visión, a veces con destellos de luz. Suele ser benigno, pero en algunos casos rompe la retina.',
        trat: 'Las moscas volantes antiguas no necesitan tratamiento y el cerebro se acostumbra. Cuando aparecen de golpe, sobre todo con destellos, el oftalmólogo debe revisar la retina con las pupilas dilatadas en los días siguientes.',
        esp: 'Oftalmólogo.',
        alarma: 'Muchas manchas nuevas de golpe, destellos o una sombra o cortina que tapa parte de la visión: urgencia el mismo día (posible desprendimiento de retina).',
        src: ['mp_moscas_volantes']
      },
      {
        id: 'lagrimal_obstruido', n: 'Obstrucción del lagrimal o dacriocistitis', urg: 2, prev: 1.0, dur: ['d', 's', 'm'],
        age: [[0, 1, 1.5]],
        s: { lagrimeo: 3, laganas: 2, hinchazon_lagrimal: 2, ojo_rojo: 1, fiebre: 1 },
        que: 'El conducto que drena las lágrimas hacia la nariz está tapado, lo que causa lagrimeo constante y lagañas. Es muy frecuente en lactantes y suele abrirse solo antes del año. En adultos puede infectarse (dacriocistitis), con hinchazón roja y dolorosa junto a la nariz.',
        trat: 'En bebés, masaje suave entre el ojo y la nariz varias veces al día y limpieza; si no se resuelve al año, un procedimiento simple. Si hay infección, antibióticos; en adultos con obstrucción persistente, cirugía.',
        esp: 'Pediatra o médico general; oftalmólogo.',
        alarma: 'Hinchazón roja y caliente junto al ojo con fiebre, párpado muy hinchado o un recién nacido con mucha secreción: consulta urgente.',
        src: ['mp_conj_neonatal']
      },
      {
        id: 'fatiga_visual', n: 'Fatiga visual', alt: 'Cansancio de la vista por pantallas', urg: 1, prev: 1.0, dur: ['h', 'd', 's', 'm'],
        req: ['ctx_pantallas'], reqF: 0.5,
        s: { ctx_pantallas: 3, arena_ojos: 2, vision_borrosa: 1, dolor_cabeza: 1, dolor_cuello: 1, ojo_rojo: 1 },
        que: 'Ojos cansados, secos, que arden o pican y visión borrosa después de mirar pantallas o leer por mucho rato, a menudo con dolor de cabeza o de cuello. Se debe a que se pestañea menos y se enfoca de cerca por mucho tiempo.',
        trat: 'Regla 20-20-20 (cada 20 minutos, mirar algo a unos 6 metros por 20 segundos), pestañear más, buena iluminación, pantalla un poco bajo la altura de los ojos y lágrimas artificiales. Revisar si se necesitan lentes.',
        esp: 'Médico general; oftalmólogo si persiste.',
        alarma: 'Dolor de ojo intenso, visión doble o pérdida de visión: consulta pronto.',
        src: ['mayo_fatiga_ocular']
      },
      {
        id: 'ojo_morado', n: 'Ojo morado', alt: 'Hematoma alrededor del ojo', urg: 2, prev: 1.0, dur: ['h', 'd'],
        s: { moreton_ojo: 3, ctx_golpe: 2, hinchazon_moreton: 1, mancha_roja_ojo: 1 },
        que: 'Moretón e hinchazón de los párpados y la piel alrededor del ojo después de un golpe. Suele ser leve y cambia de color durante varios días, pero puede acompañar a lesiones del ojo o de los huesos de la cara.',
        trat: 'Frío local sin presionar el ojo durante las primeras 24 a 48 horas, después compresas tibias. Paracetamol para el dolor. Consultar para revisar el ojo si el golpe fue fuerte.',
        esp: 'Médico general; oftalmólogo si hay molestias en la visión.',
        alarma: 'Visión doble o borrosa, sangre dentro del ojo, dolor intenso, ambos ojos morados tras un golpe en la cabeza o líquido por la nariz: urgencia.',
        src: ['mayo_ojo_morado']
      },
      {
        id: 'quemadura_quimica_ojo', n: 'Quemadura química del ojo', urg: 4, prev: 0.9, dur: ['h'],
        req: ['ctx_quimico_ojo'], reqF: 0.2,
        s: { ctx_quimico_ojo: 3, dolor_ojo: 2, ojo_rojo: 2, lagrimeo: 1, vision_borrosa: 1 },
        que: 'Lesión del ojo por contacto con un químico. Los álcalis (cal, cemento, soda cáustica, amoníaco) son los más peligrosos porque penetran el ojo; los ácidos y el cloro también pueden dañar la córnea.',
        trat: 'Lavar de inmediato el ojo con abundante agua limpia durante al menos 15 a 20 minutos, manteniendo los párpados abiertos, y luego ir a urgencia. No frotar ni poner otras sustancias. Llevar el envase del producto.',
        esp: 'Servicio de urgencia; oftalmólogo.',
        alarma: 'Siempre requiere atención urgente después de lavar el ojo, sobre todo con álcalis o si la visión está afectada.',
        src: ['mp_emergencias_ojo']
      },
      {
        id: 'celulitis_periorbitaria', n: 'Celulitis periorbitaria u orbitaria', alt: 'Infección del párpado y alrededor del ojo', urg: 4, prev: 0.9, dur: ['d'],
        age: [[0, 10, 1.3]],
        s: { parpado_hinchado_rojo: 3, fiebre: 2, dolor_ojo: 1, congestion: 1, vision_subita: 1 },
        que: 'Infección del párpado y la piel alrededor del ojo, más frecuente en niños, a menudo después de una sinusitis, una picadura o una herida. Si la infección pasa detrás del ojo (celulitis orbitaria) es grave: dolor al mover el ojo, ojo saltón y visión doble.',
        trat: 'Antibióticos indicados por un médico; en niños pequeños o si es orbitaria, hospitalización con antibióticos por vena y, a veces, cirugía para drenar.',
        esp: 'Servicio de urgencia; oftalmólogo; otorrino si viene de una sinusitis.',
        alarma: 'Dolor al mover el ojo, ojo saltón, visión doble o borrosa, fiebre alta o decaimiento: urgencia inmediata.',
        src: ['mp_celulitis_periorbitaria']
      },
      {
        id: 'daltonismo', n: 'Daltonismo', alt: 'Deficiencia de la visión de los colores', urg: 1, prev: 1.0, dur: ['m'], sexF: 0.2,
        s: { colores_confunde: 3, ctx_familia: 1, vision_borrosa: -1 },
        que: 'Dificultad para distinguir ciertos colores, sobre todo rojo y verde. Casi siempre es hereditario y presente desde el nacimiento, mucho más frecuente en hombres; a veces aparece por enfermedades del ojo o medicamentos.',
        trat: 'El daltonismo hereditario no tiene tratamiento, pero no empeora y la mayoría se adapta bien. Existen lentes con filtros que ayudan a algunas personas. Si aparece en la adultez, buscar la causa.',
        esp: 'Oftalmólogo.',
        alarma: 'Cambio en la visión de los colores que aparece de repente o en un solo ojo: consulta pronto.',
        src: ['mayo_daltonismo']
      },
      {
        id: 'ptosis', n: 'Párpado caído', alt: 'Ptosis palpebral', urg: 2, prev: 0.95, dur: ['s', 'm'],
        age: [[60, 200, 1.3]],
        s: { parpado_caido: 3, vision_borrosa: 1, debilidad_progresiva: -1, miotonia: -1, debilidad_fluctuante: -1, vision_doble_cansancio: -1 },
        que: 'El párpado superior cae más de lo normal. En adultos mayores suele deberse a que el músculo se estira con la edad o tras usar lentes de contacto por años; también puede venir de nacimiento o por enfermedades de nervios o músculos.',
        trat: 'Si tapa la visión o molesta, se corrige con cirugía del párpado. En niños es importante tratarlo para evitar el ojo perezoso. Si es reciente, buscar la causa.',
        esp: 'Oftalmólogo; neurólogo si apareció de golpe o varía durante el día.',
        alarma: 'Párpado que cae de golpe con dolor de cabeza, visión doble, pupila más grande o debilidad: urgencia. Si empeora en la tarde y mejora al descansar, consulta pronto (miastenia).',
        src: ['mp_parpado_caido']
      },
      {
        id: 'bronquiectasias', n: 'Bronquiectasias', urg: 2, prev: 0.9, dur: ['m'],
        s: { flema_abundante: 3, tos_prolongada: 2, tos_flema: 2, infecciones_repetidas: 2, falta_aire: 1, tos_sangre: 1, sibilancias: 1 },
        que: 'Los bronquios quedan dilatados y dañados de forma permanente, por infecciones graves anteriores, tuberculosis, fibrosis quística u otras enfermedades. Se acumula flema y hay tos crónica con mucha expectoración e infecciones respiratorias repetidas.',
        trat: 'Kinesiología respiratoria para sacar las secreciones, ejercicio, vacunas y antibióticos en las infecciones (a veces de forma preventiva); tratar la causa si se conoce.',
        esp: 'Médico general; broncopulmonar.',
        alarma: 'Tos con sangre abundante, fiebre alta o falta de aire que aumenta: urgencia.',
        src: ['mp_bronquiectasia']
      }
    ]
  });

  // ── Tanda 3 (noviembre 2026): pulmones, corazón, circulación y nervios
  D.addPack({
    symptoms: [
      ['falta_aire_progresiva', 'Falta de aire que aumenta de a poco en días o semanas', 'respiracion', 2, ['ahogo progresivo', 'cada vez me falta más el aire']],
      ['desmayo_esfuerzo', 'Desmayo o casi desmayo al hacer ejercicio o esfuerzo', 'corazon', 3, ['síncope de esfuerzo', 'me desmayé corriendo']],
      ['pulso_lento', 'Pulso lento (menos de 50 por minuto) medido en reposo', 'corazon', 2, ['bradicardia', 'pulso bajo', 'corazón lento']],
      ['latido_salteado', 'Sensación de latido que se salta o de un golpe fuerte aislado en el pecho', 'corazon', 1, ['extrasístoles', 'el corazón se salta un latido', 'vuelco en el corazón']],
      ['dedos_blancos_frio', 'Dedos que se ponen blancos o morados con el frío o el estrés y luego rojos', 'piel', 1, ['Raynaud', 'dedos blancos', 'dedos morados con el frío']],
      ['cordon_vena', 'Vena superficial dura, roja y dolorosa, como un cordón', 'corazon', 1, ['flebitis', 'tromboflebitis', 'vena inflamada']],
      ['herida_pierna', 'Herida en la pierna, cerca del tobillo, que no cicatriza', 'piel', 2, ['úlcera varicosa', 'úlcera venosa', 'herida que no sana']],
      ['hinchazon_un_brazo_pierna', 'Hinchazón persistente de un brazo o una pierna que no se va al descansar', 'corazon', 1, ['linfedema', 'brazo hinchado', 'pierna hinchada']],
      ['taquicardia_pararse', 'El pulso sube mucho (más de 30 latidos) al ponerte de pie', 'corazon', 1, ['POTS', 'taquicardia al pararse']],
      ['dolor_nuca_punzante', 'Dolor punzante o como corriente en la nuca que sube por detrás de la cabeza', 'cabeza', 1, ['neuralgia occipital', 'dolor en la nuca']],
      ['dolor_quemante_piel', 'Dolor quemante o como corriente en una zona de la piel, que aumenta al rozarla', 'piel', 1, ['dolor neuropático', 'ardor en la piel', 'alodinia']],
      ['temblor_accion', 'Temblor de las manos al usarlas (escribir, beber), que mejora en reposo', 'cabeza', 1, ['temblor esencial', 'me tiemblan las manos al escribir']],
      ['hormigueo_menique', 'Hormigueo o adormecimiento del meñique y parte del anular', 'musculo', 1, ['nervio cubital', 'túnel cubital', 'meñique dormido']],
      ['ardor_muslo', 'Ardor, hormigueo o adormecimiento en la cara externa de un muslo', 'musculo', 1, ['meralgia parestésica', 'muslo dormido']],
      ['dolor_brazo_cuello', 'Dolor que baja del cuello a un brazo, con hormigueo en la mano', 'musculo', 2, ['hernia cervical', 'radiculopatía cervical', 'cervicobraquialgia']],
      ['dolor_piernas_caminar', 'Dolor o adormecimiento de las piernas al caminar o estar de pie, que alivia al sentarte o inclinarte', 'musculo', 2, ['canal lumbar estrecho', 'estenosis lumbar', 'claudicación neurógena']],
      ['malestar_post_esfuerzo', 'Cansancio que empeora mucho después de un esfuerzo y dura días', 'general', 1, ['fatiga crónica', 'crash después del ejercicio']],
      ['tics', 'Movimientos o sonidos repetitivos y bruscos que cuesta controlar', 'cabeza', 1, ['tics', 'Tourette', 'tic nervioso']],
      ['desconexiones', 'Episodios breves de mirada fija y desconexión (segundos), muchas veces al día', 'cabeza', 2, ['ausencias', 'se queda pegado', 'crisis de ausencia']],
      ['ctx_ejercicio', 'Los síntomas aparecen durante o justo después de hacer ejercicio', 'contexto', 0, ['al hacer deporte', 'al correr']],
      ['ctx_soplo', 'Te han dicho que tienes un soplo en el corazón', 'contexto', 0, ['soplo cardíaco', 'soplo']],
      ['ctx_estimulantes', 'Tomas mucho café, bebidas energéticas, alcohol o fumas', 'contexto', 0, ['cafeína', 'energéticas', 'estimulantes']],
      ['ctx_cirugia_ganglios', 'Cirugía o radioterapia con extracción de ganglios (por ejemplo, por cáncer de mama)', 'contexto', 0, ['vaciamiento ganglionar', 'cirugía de cáncer']],
      ['ctx_analgesicos_frecuentes', 'Tomas analgésicos para el dolor de cabeza 10 o más días al mes', 'contexto', 0, ['abuso de analgésicos', 'tomo pastillas para el dolor todos los días']],
      ['ctx_herpes_zoster', 'Tuviste herpes zóster («culebrilla») en esa zona', 'contexto', 0, ['culebrilla', 'herpes zóster previo']],
      ['ctx_anticoagulantes', 'Tomas anticoagulantes o aspirina a diario', 'contexto', 0, ['anticoagulante', 'tomo aspirina', 'acenocumarol']]
    ],
    sources: {
      mp_derrame_paraneumonico: [MP, 'Derrame pleural paraneumónico', 'https://medlineplus.gov/spanish/ency/article/000139.htm'],
      mp_pleura_t: [MP, 'Enfermedades de la pleura (pleuresía y derrame pleural)', 'https://medlineplus.gov/spanish/pleuraldisorders.html'],
      mp_asma_ejercicio: [MP, 'El ejercicio y el asma en la escuela', 'https://medlineplus.gov/spanish/ency/patientinstructions/000037.htm'],
      mp_micoplasma: [MP, 'Neumonía por micoplasma', 'https://medlineplus.gov/spanish/ency/article/000082.htm'],
      mp_neumonia_atipica: [MP, 'Neumonía atípica', 'https://medlineplus.gov/spanish/ency/article/000079.htm'],
      mp_estenosis_aortica: [MP, 'Estenosis aórtica', 'https://medlineplus.gov/spanish/ency/article/000178.htm'],
      mp_insuf_mitral: [MP, 'Insuficiencia de la válvula mitral', 'https://medlineplus.gov/spanish/ency/article/000176.htm'],
      mp_valvulas_t: [MP, 'Enfermedades de las válvulas del corazón', 'https://medlineplus.gov/spanish/heartvalvediseases.html'],
      mayo_bradicardia: [MAYO, 'Bradicardia', 'https://www.mayoclinic.org/es/diseases-conditions/bradycardia/symptoms-causes/syc-20355474'],
      mayo_extrasistoles: [MAYO, 'Contracciones ventriculares prematuras', 'https://www.mayoclinic.org/es/diseases-conditions/premature-ventricular-contractions/symptoms-causes/syc-20376757'],
      mp_raynaud: [MP, 'Fenómeno de Raynaud', 'https://medlineplus.gov/spanish/ency/article/000412.htm'],
      mayo_tromboflebitis: [MAYO, 'Tromboflebitis', 'https://www.mayoclinic.org/es/diseases-conditions/thrombophlebitis/symptoms-causes/syc-20354607'],
      mp_obstruccion_linfatica: [MP, 'Obstrucción linfática (linfedema)', 'https://medlineplus.gov/spanish/ency/article/001117.htm'],
      mp_linfedema_t: [MP, 'Linfedema', 'https://medlineplus.gov/spanish/lymphedema.html'],
      mayo_pots: [MAYO, 'Síndrome de taquicardia ortostática postural en adolescentes (en inglés)', 'https://www.mayoclinic.org/medical-professionals/endocrinology/news/postural-orthostatic-tachycardia-syndrome-and-chronic-fatigue-in-adolescents/mac-20430815'],
      mayo_cefalea_abuso: [MAYO, 'Cefalea por abuso de medicamentos', 'https://www.mayoclinic.org/es/diseases-conditions/medication-overuse-headache/diagnosis-treatment/drc-20377089'],
      mp_neuralgia: [MP, 'Neuralgia', 'https://medlineplus.gov/spanish/ency/article/001407.htm'],
      mp_neuralgia_posherpetica: [MP, 'Neuralgia posherpética: cuidados posteriores', 'https://medlineplus.gov/spanish/ency/patientinstructions/000555.htm'],
      mp_temblor_esencial: [MP, 'Temblor esencial', 'https://medlineplus.gov/spanish/ency/article/000762.htm'],
      mp_nervio_cubital: [MP, 'Disfunción del nervio cubital', 'https://medlineplus.gov/spanish/ency/article/000789.htm'],
      mp_mononeuropatia: [MP, 'Mononeuropatía', 'https://medlineplus.gov/spanish/ency/article/000780.htm'],
      mp_espondilosis_cervical: [MP, 'Espondilosis cervical', 'https://medlineplus.gov/spanish/ency/article/000436.htm'],
      mp_dolor_cuello: [MP, 'Dolor de cuello', 'https://medlineplus.gov/spanish/ency/article/003025.htm'],
      mp_estenosis_raquidea: [MP, 'Estenosis raquídea', 'https://medlineplus.gov/spanish/ency/article/000441.htm'],
      mp_hematoma_subdural: [MP, 'Hematoma subdural', 'https://medlineplus.gov/spanish/ency/article/000713.htm'],
      mp_hematoma_subdural_cronico: [MP, 'Hematoma subdural crónico', 'https://medlineplus.gov/spanish/ency/article/000781.htm'],
      mp_fatiga_cronica: [MP, 'Encefalomielitis miálgica / síndrome de fatiga crónica', 'https://medlineplus.gov/spanish/ency/article/001244.htm'],
      mp_tourette: [MP, 'Síndrome de la Tourette', 'https://medlineplus.gov/spanish/ency/article/000733.htm'],
      mp_tics: [MP, 'Tics faciales', 'https://medlineplus.gov/spanish/ency/article/001410.htm']
    },
    conditions: [
      {
        id: 'derrame_pleural', n: 'Derrame pleural', alt: 'Líquido alrededor del pulmón', urg: 3, prev: 0.9, dur: ['d', 's'],
        s: { falta_aire_progresiva: 3, falta_aire: 2, dolor_pecho_respirar: 2, tos_seca: 1, fiebre: 1, hinchazon_piernas: 1 },
        que: 'Acumulación de líquido entre el pulmón y la pared del tórax. Se debe con más frecuencia a insuficiencia cardíaca, neumonía, cáncer o embolia pulmonar. Produce falta de aire que aumenta, dolor al respirar hondo y tos seca.',
        trat: 'Tratar la causa (por ejemplo, antibióticos si viene de una neumonía o diuréticos si es por el corazón). Si es grande o hay infección, se saca el líquido con una aguja (toracocentesis) o con un tubo.',
        esp: 'Médico general; broncopulmonar.',
        alarma: 'Falta de aire en reposo, labios morados, fiebre alta o dolor de pecho intenso: urgencia.',
        src: ['mp_pleura_t', 'mp_derrame_paraneumonico']
      },
      {
        id: 'pleuritis', n: 'Pleuritis', alt: 'Pleuresía', urg: 3, prev: 0.9, dur: ['d', 's'],
        s: { dolor_pecho_respirar: 3, tos_seca: 1, fiebre: 1, ctx_infeccion_reciente: 1, dolor_pecho_presion: -1 },
        que: 'Inflamación de la pleura, la membrana que rodea los pulmones. Produce un dolor punzante en el pecho que aumenta al respirar hondo, toser o estornudar. La causa más frecuente es una infección viral, pero también aparece con neumonía, embolia pulmonar o enfermedades autoinmunes.',
        trat: 'Antiinflamatorios y reposo; tratar la causa. Un médico debe descartar neumonía, embolia o neumotórax, sobre todo si hay falta de aire.',
        esp: 'Médico general.',
        alarma: 'Dolor de pecho con falta de aire, tos con sangre, pierna hinchada o fiebre alta: urgencia.',
        src: ['mp_pleura_t']
      },
      {
        id: 'asma_ejercicio', n: 'Asma inducida por ejercicio', alt: 'Broncoconstricción por ejercicio', urg: 2, prev: 1.0, dur: ['h', 's', 'm'],
        req: ['ctx_ejercicio'], reqF: 0.4,
        s: { ctx_ejercicio: 3, sibilancias: 2, falta_aire: 2, tos_seca: 2, dolor_pecho_presion: -1 },
        que: 'Estrechamiento de los bronquios que aparece durante o poco después del ejercicio, sobre todo con aire frío y seco. Produce tos, silbido al respirar, opresión en el pecho y falta de aire. Es frecuente en personas con asma o alergias, pero puede aparecer sola.',
        trat: 'Calentar antes del ejercicio y usar el inhalador de alivio rápido (salbutamol) unos 15 minutos antes, según indicación médica; tratar el asma de base si existe. Con buen control se puede hacer deporte sin problemas.',
        esp: 'Médico general o pediatra; broncopulmonar.',
        alarma: 'Ahogo que no mejora con el inhalador, labios morados o dificultad para hablar: llama al 131.',
        src: ['mp_asma_ejercicio']
      },
      {
        id: 'neumonia_atipica', n: 'Neumonía atípica', alt: 'Neumonía por micoplasma («neumonía caminante»)', urg: 2, prev: 0.95, dur: ['d', 's'],
        age: [[5, 40, 1.3]],
        s: { tos_seca: 3, febricula: 2, fatiga: 2, dolor_garganta: 1, dolor_cabeza: 1, tos_prolongada: 1, falta_aire: 1 },
        que: 'Neumonía causada por bacterias como Mycoplasma pneumoniae, frecuente en niños en edad escolar y adultos jóvenes. Los síntomas suelen ser más leves que en la neumonía típica: tos seca persistente, fiebre baja, cansancio, dolor de garganta y de cabeza, que se prolongan por semanas.',
        trat: 'Antibióticos indicados por un médico (macrólidos como la azitromicina u otros), reposo y líquidos. La tos puede durar varias semanas.',
        esp: 'Médico general o pediatra.',
        alarma: 'Falta de aire, dolor al respirar, fiebre alta persistente o decaimiento: consulta pronto.',
        src: ['mp_micoplasma', 'mp_neumonia_atipica']
      },
      {
        id: 'estenosis_aortica', n: 'Estenosis aórtica', alt: 'Válvula aórtica estrecha', urg: 3, prev: 0.9, dur: ['s', 'm'],
        age: [[0, 49, 0.3], [65, 200, 1.4]],
        s: { ctx_soplo: 3, dolor_pecho_esfuerzo: 2, falta_aire: 2, desmayo_esfuerzo: 2, fatiga: 1, palpitaciones: 1 },
        que: 'La válvula aórtica, que deja salir la sangre del corazón al cuerpo, se estrecha y se endurece con la edad. Durante años no da síntomas (solo un soplo); luego aparecen dolor de pecho y falta de aire al esfuerzo, cansancio y desmayos.',
        trat: 'Controles con ecocardiograma; cuando aparecen síntomas o la estrechez es grave, se reemplaza la válvula con cirugía o por cateterismo (TAVI).',
        ges: 'El tratamiento quirúrgico de las lesiones crónicas de la válvula aórtica en personas de 15 años y más está cubierto por GES.',
        esp: 'Médico general; cardiólogo.',
        alarma: 'Desmayo, dolor de pecho o falta de aire con esfuerzos pequeños: consulta urgente; si el dolor no cede, llama al 131.',
        src: ['mp_estenosis_aortica', 'minsal_ges']
      },
      {
        id: 'valvula_mitral', n: 'Prolapso o insuficiencia de la válvula mitral', urg: 2, prev: 0.95, dur: ['m'],
        s: { ctx_soplo: 3, palpitaciones: 2, falta_aire: 1, fatiga: 1, ortopnea: 1, dolor_pecho_presion: 1 },
        que: 'La válvula mitral no cierra bien y deja que parte de la sangre se devuelva. El prolapso es frecuente y muchas veces solo da un soplo o palpitaciones; la insuficiencia importante produce cansancio, falta de aire al esfuerzo o al acostarse y arritmias.',
        trat: 'Si es leve, solo controles. Medicamentos para los síntomas y, si la insuficiencia es grave, reparación o reemplazo de la válvula.',
        ges: 'El tratamiento quirúrgico de las lesiones crónicas de las válvulas mitral y tricúspide en personas de 15 años y más está cubierto por GES.',
        esp: 'Médico general; cardiólogo.',
        alarma: 'Falta de aire que empeora, palpitaciones con mareo o desmayo: consulta urgente.',
        src: ['mp_insuf_mitral', 'mp_valvulas_t', 'minsal_ges']
      },
      {
        id: 'bradicardia', n: 'Bradicardia o bloqueo cardíaco', alt: 'Corazón demasiado lento', urg: 3, prev: 0.9, dur: ['d', 's', 'm'],
        age: [[0, 49, 0.4], [65, 200, 1.3]],
        s: { pulso_lento: 3, mareo: 2, fatiga: 2, desmayo: 2, falta_aire: 1, confusion: 1 },
        que: 'El corazón late demasiado lento (menos de 60 por minuto) por un problema en su sistema eléctrico, que es más frecuente con la edad, o por medicamentos (como algunos para la presión o el corazón). Puede no dar síntomas o causar cansancio, mareos, falta de aire o desmayos.',
        trat: 'Revisar y ajustar los medicamentos que la causan y tratar problemas como el hipotiroidismo. Si da síntomas o hay un bloqueo importante, se implanta un marcapasos.',
        ges: 'Los trastornos de generación del impulso y conducción que requieren marcapaso, en personas de 15 años y más, están cubiertos por GES.',
        esp: 'Médico general; cardiólogo.',
        alarma: 'Desmayo, dolor de pecho, confusión o falta de aire con el pulso lento: llama al 131.',
        src: ['mayo_bradicardia', 'minsal_ges']
      },
      {
        id: 'extrasistoles', n: 'Extrasístoles', alt: 'Latidos prematuros', urg: 2, prev: 1.0, dur: ['d', 's', 'm'],
        s: { latido_salteado: 3, palpitaciones: 2, ctx_estimulantes: 1, ansiedad: 1, palpitaciones_subitas: -1 },
        que: 'Latidos que llegan antes de tiempo y se sienten como un salto, un vuelco o un golpe en el pecho. Son muy frecuentes y casi siempre benignos; aumentan con la cafeína, el alcohol, el tabaco, el estrés y la falta de sueño.',
        trat: 'Si el corazón es sano, suele bastar con reducir los estimulantes y el estrés. El médico puede pedir un electrocardiograma o un Holter; si son muy frecuentes o molestas, hay medicamentos o ablación.',
        esp: 'Médico general; cardiólogo.',
        alarma: 'Palpitaciones con desmayo, dolor de pecho o falta de aire: urgencia.',
        src: ['mayo_extrasistoles']
      },
      {
        id: 'raynaud', n: 'Fenómeno de Raynaud', urg: 2, prev: 1.0, dur: ['m'], sexF: 1.3,
        s: { dedos_blancos_frio: 3, ctx_frio: 2, hormigueo: 1, piel_dura: -1 },
        que: 'Los vasos de los dedos se cierran en exceso con el frío o el estrés: los dedos se ponen blancos, luego morados y al recuperarse rojos, con dolor u hormigueo. Suele ser benigno (primario), pero a veces se asocia a enfermedades como la esclerodermia o el lupus.',
        trat: 'Abrigar manos y pies, evitar cambios bruscos de temperatura, no fumar y manejar el estrés. Si es intenso, medicamentos que dilatan los vasos. Buscar enfermedades asociadas.',
        esp: 'Médico general; reumatólogo si hay otros síntomas.',
        alarma: 'Heridas en las yemas de los dedos, crisis muy dolorosas o piel que se endurece: consulta pronto.',
        src: ['mp_raynaud']
      },
      {
        id: 'tromboflebitis', n: 'Tromboflebitis superficial', alt: 'Flebitis', urg: 2, prev: 1.0, dur: ['d', 's'],
        s: { cordon_vena: 3, varices: 2, piel_roja_caliente: 1, pantorrilla: -1 },
        que: 'Inflamación con un coágulo en una vena cercana a la piel, frecuente en várices o después de una vía venosa. Se nota un cordón duro, rojo, caliente y doloroso a lo largo de la vena.',
        trat: 'Calor local, elevar la pierna, medias de compresión y antiinflamatorios según indicación. Si es extensa o está cerca de la ingle, el médico puede indicar anticoagulantes y una ecografía.',
        esp: 'Médico general; cirujano vascular.',
        alarma: 'Pantorrilla hinchada y dolorosa, falta de aire o dolor de pecho: urgencia (posible trombosis profunda o embolia).',
        src: ['mayo_tromboflebitis']
      },
      {
        id: 'ulcera_venosa', n: 'Úlcera venosa de la pierna', alt: 'Úlcera varicosa', urg: 2, prev: 0.95, dur: ['s', 'm'],
        age: [[0, 39, 0.4], [60, 200, 1.3]],
        s: { herida_pierna: 3, varices: 2, hinchazon_piernas: 2, piernas_pesadas: 1 },
        que: 'Herida abierta que no cicatriza, casi siempre cerca del tobillo, causada por la mala circulación de las venas (insuficiencia venosa). La piel alrededor suele estar oscura, endurecida y con picazón, y la pierna se hincha.',
        trat: 'Curaciones regulares, vendaje o medias de compresión, elevar las piernas y caminar. Tratar las várices. Es importante controlar la diabetes y descartar problemas arteriales.',
        esp: 'Médico general o enfermería; cirujano vascular.',
        alarma: 'Enrojecimiento que se extiende, fiebre, mal olor o dolor intenso: consulta pronto (infección).',
        src: ['mp_insuf_venosa']
      },
      {
        id: 'linfedema', n: 'Linfedema', urg: 2, prev: 0.95, dur: ['s', 'm'],
        s: { hinchazon_un_brazo_pierna: 3, ctx_cirugia_ganglios: 2, piel_roja_caliente: -1, pantorrilla: -1 },
        que: 'Hinchazón crónica de un brazo o una pierna porque el sistema linfático está dañado o bloqueado, con más frecuencia después de una cirugía o radioterapia por cáncer (por ejemplo, de mama). La extremidad se siente pesada y la piel se puede engrosar.',
        trat: 'No tiene cura, pero se controla de por vida con drenaje linfático manual, vendajes o prendas de compresión, ejercicios y cuidado de la piel para evitar infecciones.',
        esp: 'Médico general; fisiatra o kinesiólogo especializado.',
        alarma: 'Enrojecimiento, calor y fiebre en la extremidad (infección), o hinchazón brusca con dolor de pantorrilla: urgencia.',
        src: ['mp_obstruccion_linfatica', 'mp_linfedema_t']
      },
      {
        id: 'pots', n: 'Síndrome de taquicardia postural', alt: 'POTS', urg: 2, prev: 0.9, dur: ['s', 'm'], sexF: 1.4,
        age: [[12, 45, 1.2]],
        s: { taquicardia_pararse: 3, mareo_al_pararse: 2, palpitaciones: 2, fatiga: 2, ctx_infeccion_reciente: 1, desmayo: 1 },
        que: 'Alteración del sistema nervioso autónomo en la que el pulso sube mucho al ponerse de pie, con mareo, palpitaciones, cansancio, dificultad para concentrarse y a veces desmayo. Es más frecuente en mujeres jóvenes y puede aparecer después de una infección viral.',
        trat: 'Más agua y sal en la dieta (si el médico lo indica), medias de compresión, ejercicio progresivo y, a veces, medicamentos. Requiere descartar otras causas.',
        esp: 'Médico general; cardiólogo o neurólogo.',
        alarma: 'Desmayo con golpe, dolor de pecho o palpitaciones en reposo que no ceden: urgencia.',
        src: ['mayo_pots', 'mayo_ortostatica']
      },
      {
        id: 'cefalea_abuso', n: 'Cefalea por abuso de analgésicos', alt: 'Cefalea de rebote', urg: 2, prev: 0.95, dur: ['s', 'm'],
        req: ['ctx_analgesicos_frecuentes'], reqF: 0.3,
        s: { ctx_analgesicos_frecuentes: 3, dolor_cabeza: 2, dolor_cabeza_despertar: 1, irritabilidad: 1 },
        que: 'Dolor de cabeza casi diario (15 o más días al mes) en personas que toman analgésicos para la cefalea muchos días al mes. Los medicamentos dejan de funcionar y el dolor empeora cuando su efecto pasa.',
        trat: 'Suspender o reducir los analgésicos con apoyo médico (el dolor suele empeorar unos días antes de mejorar) e iniciar un tratamiento preventivo de la migraña o la cefalea de base.',
        esp: 'Médico general; neurólogo.',
        alarma: 'Dolor de cabeza súbito e intenso, con fiebre, rigidez de cuello, confusión o debilidad: urgencia.',
        src: ['mayo_cefalea_abuso']
      },
      {
        id: 'neuralgia_occipital', n: 'Neuralgia occipital', urg: 2, prev: 0.95, dur: ['d', 's', 'm'],
        s: { dolor_nuca_punzante: 3, dolor_cuello: 1, dolor_cabeza: 1, fotofobia: 1 },
        que: 'Dolor por irritación de los nervios occipitales, que suben desde el cuello por detrás de la cabeza. Se siente como pinchazos o descargas en la nuca y el cuero cabelludo, a veces detrás del ojo, y el cuero cabelludo queda sensible.',
        trat: 'Calor local, masaje, reposo y analgésicos o antiinflamatorios; si persiste, medicamentos para el dolor de los nervios o bloqueos anestésicos indicados por un especialista.',
        esp: 'Médico general; neurólogo.',
        alarma: 'Dolor de cabeza súbito e intenso, fiebre con rigidez de cuello o debilidad: urgencia.',
        src: ['mp_neuralgia']
      },
      {
        id: 'neuralgia_posherpetica', n: 'Neuralgia posherpética', urg: 2, prev: 0.95, dur: ['s', 'm'],
        age: [[60, 200, 1.3]],
        req: ['ctx_herpes_zoster'], reqF: 0.3,
        s: { ctx_herpes_zoster: 3, dolor_quemante_piel: 3, insomnio: 1, ampollas_franja: -1 },
        que: 'Dolor que persiste más de un mes después de un herpes zóster («culebrilla»), en la misma zona donde estuvo la erupción. Es quemante o como descargas, y empeora con el roce de la ropa. Es más frecuente en mayores de 60 años.',
        trat: 'Medicamentos para el dolor de los nervios, parches de lidocaína y cremas indicadas por el médico. La vacuna contra el herpes zóster reduce el riesgo.',
        esp: 'Médico general; neurólogo o unidad del dolor.',
        alarma: 'Dolor que impide dormir o comer, o tristeza persistente: consulta pronto.',
        src: ['mp_neuralgia_posherpetica', 'mp_neuralgia']
      },
      {
        id: 'temblor_esencial', n: 'Temblor esencial', urg: 2, prev: 1.0, dur: ['m'],
        age: [[50, 200, 1.2]],
        s: { temblor_accion: 3, temblor: 2, ctx_familia: 1, temblor_reposo: -2 },
        que: 'El tipo de temblor más frecuente: un temblor de las manos que aparece al usarlas (escribir, tomar una taza) y suele ser menor en reposo. A veces afecta la cabeza o la voz, empeora con el estrés o la cafeína y suele haber familiares con temblor.',
        trat: 'Si molesta, medicamentos como propranolol o primidona; en casos graves, cirugía o estimulación cerebral. Reducir la cafeína.',
        esp: 'Médico general; neurólogo.',
        alarma: 'Temblor en reposo con lentitud y rigidez (posible Parkinson), o temblor que aparece de golpe con otros síntomas: consulta.',
        src: ['mp_temblor_esencial']
      },
      {
        id: 'tunel_cubital', n: 'Síndrome del túnel cubital', alt: 'Compresión del nervio cubital en el codo', urg: 2, prev: 1.0, dur: ['s', 'm'],
        s: { hormigueo_menique: 3, dolor_codo: 1, hormigueo_mano: -1 },
        que: 'Compresión del nervio cubital a nivel del codo (el «hueso de la risa»), por apoyar mucho el codo o mantenerlo doblado. Produce hormigueo y adormecimiento del meñique y parte del anular y, con el tiempo, torpeza de la mano.',
        trat: 'Evitar apoyar el codo y dormir con el brazo doblado, férula nocturna y antiinflamatorios. Si hay debilidad o no mejora, cirugía para liberar el nervio.',
        esp: 'Médico general; traumatólogo o neurólogo.',
        alarma: 'Pérdida de fuerza o de masa muscular en la mano: consulta pronto.',
        src: ['mp_nervio_cubital']
      },
      {
        id: 'meralgia', n: 'Meralgia parestésica', urg: 1, prev: 0.95, dur: ['s', 'm'],
        s: { ardor_muslo: 3, aumento_peso: 1 },
        que: 'Compresión de un nervio de la sensibilidad del muslo a la altura de la ingle. Produce ardor, hormigueo o adormecimiento en la cara externa del muslo. Se asocia al sobrepeso, el embarazo, los pantalones o cinturones apretados y la diabetes.',
        trat: 'Usar ropa holgada, bajar de peso y analgésicos. Si persiste, medicamentos para el dolor de los nervios o una infiltración.',
        esp: 'Médico general; neurólogo.',
        alarma: 'Debilidad de la pierna, dolor de espalda con pérdida de control de la orina: urgencia.',
        src: ['mp_mononeuropatia']
      },
      {
        id: 'hernia_cervical', n: 'Hernia de disco cervical', alt: 'Radiculopatía cervical', urg: 2, prev: 1.0, dur: ['d', 's', 'm'],
        s: { dolor_brazo_cuello: 3, dolor_cuello: 2, hormigueo_mano: 1, debilidad_general: -1 },
        que: 'Un disco o el desgaste de la columna del cuello (espondilosis) comprime una raíz nerviosa. Produce dolor de cuello que baja por un brazo, con hormigueo, adormecimiento o debilidad en la mano.',
        trat: 'Analgésicos, antiinflamatorios, kinesiología y evitar posturas forzadas; la mayoría mejora en semanas. Si hay debilidad progresiva o compresión de la médula, cirugía.',
        esp: 'Médico general; traumatólogo o neurocirujano; kinesiólogo.',
        alarma: 'Debilidad en brazos o piernas, torpeza al caminar o pérdida del control de la orina: urgencia.',
        src: ['mp_espondilosis_cervical', 'mp_dolor_cuello']
      },
      {
        id: 'estenosis_lumbar', n: 'Estenosis del canal lumbar', alt: 'Canal lumbar estrecho', urg: 2, prev: 1.0, dur: ['m'],
        age: [[0, 49, 0.3], [60, 200, 1.4]],
        s: { dolor_piernas_caminar: 3, dolor_lumbar: 2, ciatica: 1, debilidad_pierna: 1 },
        que: 'Estrechamiento del canal de la columna lumbar por desgaste, que comprime los nervios. Produce dolor, adormecimiento o calambres en las piernas al caminar o estar de pie, que se alivian al sentarse o inclinarse hacia adelante. Es frecuente después de los 60 años.',
        trat: 'Kinesiología, ejercicio, analgésicos e infiltraciones. Si limita mucho la marcha o hay debilidad, cirugía para descomprimir los nervios.',
        esp: 'Médico general; traumatólogo o neurocirujano.',
        alarma: 'Pérdida de control de la orina o las deposiciones, o adormecimiento entre las piernas: urgencia.',
        src: ['mp_estenosis_raquidea']
      },
      {
        id: 'hematoma_subdural', n: 'Hematoma subdural', alt: 'Sangre entre el cráneo y el cerebro', urg: 5, prev: 0.9, dur: ['h', 'd', 's'],
        age: [[0, 49, 0.5], [65, 200, 1.4]],
        req: ['ctx_golpe', 'ctx_anticoagulantes'], reqF: 0.4,
        s: { ctx_golpe: 2, dolor_cabeza: 2, confusion: 2, somnolencia: 2, ctx_anticoagulantes: 2, olvidos_progresivos: 1, debilidad_lado: 1, vomitos: 1 },
        que: 'Acumulación de sangre entre las membranas que cubren el cerebro, casi siempre tras un golpe en la cabeza. En personas mayores o que toman anticoagulantes puede aparecer días o semanas después de un golpe leve, con dolor de cabeza, confusión, somnolencia, olvidos o debilidad de un lado.',
        trat: 'Es una urgencia: se confirma con un escáner. Según su tamaño, se observa en el hospital o se drena con cirugía, y se revisan los anticoagulantes.',
        ges: 'El traumatismo craneoencefálico moderado o grave está cubierto por GES.',
        esp: 'Servicio de urgencia; neurocirujano.',
        alarma: 'Somnolencia, confusión, vómitos, debilidad o pupilas desiguales después de un golpe: llama al 131.',
        src: ['mp_hematoma_subdural', 'mp_hematoma_subdural_cronico', 'minsal_ges']
      },
      {
        id: 'fatiga_cronica', n: 'Síndrome de fatiga crónica', alt: 'Encefalomielitis miálgica', urg: 2, prev: 0.9, dur: ['m'], sexF: 1.3,
        s: { malestar_post_esfuerzo: 3, fatiga: 3, memoria: 2, insomnio: 1, dolor_muscular: 1, dolor_cabeza: 1, mareo_al_pararse: 1 },
        que: 'Enfermedad prolongada con cansancio intenso que no mejora con el descanso y empeora claramente después de esfuerzos físicos o mentales, junto con sueño no reparador, problemas de memoria y concentración, y a veces mareo al ponerse de pie. Puede comenzar tras una infección.',
        trat: 'No hay cura: dosificar la actividad para no superar los propios límites, mejorar el sueño, tratar el dolor y los síntomas asociados, y apoyo psicológico. Requiere descartar otras causas de cansancio.',
        esp: 'Médico general; medicina interna.',
        alarma: 'Baja de peso, fiebre, sudores nocturnos o tristeza intensa con ideas de hacerse daño: consulta pronto.',
        src: ['mp_fatiga_cronica']
      },
      {
        id: 'tics_tourette', n: 'Tics y síndrome de Tourette', urg: 1, prev: 1.0, dur: ['s', 'm'], sexF: 0.4,
        age: [[4, 18, 1.4]],
        s: { tics: 3, ctx_familia: 1, inatencion: 1, obsesiones: 1 },
        que: 'Los tics son movimientos o sonidos breves, repetitivos y difíciles de controlar (parpadear, encoger los hombros, carraspear). Son frecuentes en la niñez y suelen pasar solos; cuando hay tics motores y vocales por más de un año se habla de síndrome de Tourette, que puede acompañarse de déficit atencional o TOC.',
        trat: 'Muchos niños no necesitan tratamiento: explicar a la familia y al colegio, sin retar al niño. Si los tics interfieren, terapia conductual (como la inversión de hábitos) y, a veces, medicamentos.',
        esp: 'Pediatra; neurólogo infantil; psicólogo.',
        alarma: 'Tics que causan dolor o lesiones, problemas importantes en el colegio o tristeza: consulta.',
        src: ['mp_tourette', 'mp_tics']
      },
      {
        id: 'crisis_ausencia', n: 'Crisis de ausencia', alt: 'Epilepsia de ausencias', urg: 2, prev: 0.95, dur: ['s', 'm'],
        age: [[4, 14, 1.4]],
        s: { desconexiones: 3, inatencion: 1, convulsion: -1 },
        que: 'Tipo de epilepsia frecuente en niños: episodios de pocos segundos en que el niño se queda con la mirada fija, desconectado, a veces parpadeando, y luego sigue como si nada. Pueden repetirse muchas veces al día y confundirse con distracción.',
        trat: 'Medicamentos antiepilépticos indicados por un neurólogo; muchos niños dejan de tenerlas en la adolescencia. Se confirma con un electroencefalograma.',
        ges: 'La epilepsia no refractaria en personas desde 1 año y menores de 15 años está cubierta por GES.',
        esp: 'Pediatra; neurólogo infantil.',
        alarma: 'Convulsión con sacudidas, desmayo o una crisis que dura más de 5 minutos: llama al 131.',
        src: ['mp_epilepsia', 'mp_convulsiones', 'minsal_ges']
      }
    ]
  });

  // ── Tanda 4 (noviembre 2026): salud mental, sueño, infancia y nervios
  D.addPack({
    symptoms: [
      ['mano_caida', 'No puedes levantar la muñeca ni estirar los dedos (mano caída)', 'musculo', 2, ['mano caída', 'parálisis del sábado', 'nervio radial']],
      ['dolor_gluteo', 'Dolor profundo en un glúteo que empeora al estar sentado', 'musculo', 1, ['piriforme', 'dolor en la nalga']],
      ['miedo_objeto', 'Miedo intenso y desproporcionado a algo específico (animales, alturas, agujas, volar)', 'mente', 1, ['fobia', 'terror a las arañas', 'miedo a volar']],
      ['miedo_social', 'Miedo intenso a ser juzgado o hacer el ridículo frente a otros, que te hace evitar situaciones sociales', 'mente', 1, ['fobia social', 'timidez extrema', 'ansiedad social']],
      ['miedo_lugares', 'Miedo a estar en lugares de los que es difícil escapar (multitudes, transporte, salir solo/a)', 'mente', 1, ['agorafobia', 'miedo a salir']],
      ['animo_bajo_anos', 'Ánimo bajo casi todos los días durante 2 años o más', 'mente', 1, ['distimia', 'depresión crónica', 'siempre triste']],
      ['emociones_inestables', 'Emociones muy intensas y cambiantes, miedo al abandono y relaciones muy inestables', 'mente', 1, ['inestabilidad emocional', 'trastorno límite', 'limítrofe']],
      ['alucinaciones', 'Escuchar voces o ver cosas que otros no perciben, o creencias extrañas que nadie comparte', 'mente', 2, ['alucinaciones', 'escucho voces', 'delirios', 'psicosis']],
      ['aislamiento', 'Aislamiento, descuido personal y pérdida de interés en estudiar o trabajar', 'mente', 1, ['se encierra', 'abandono personal']],
      ['preocupacion_sintomas', 'Preocupación excesiva y constante por síntomas físicos, que ocupa gran parte del día', 'mente', 1, ['somatización', 'preocupación por el cuerpo']],
      ['miedo_enfermedad', 'Miedo persistente a tener una enfermedad grave a pesar de exámenes normales', 'mente', 1, ['hipocondría', 'miedo a estar enfermo']],
      ['ganas_fumar', 'No logras dejar de fumar o fumas apenas despiertas', 'mente', 1, ['adicción al cigarro', 'tabaquismo', 'dependencia a la nicotina']],
      ['despierta_gritando', 'Niño que despierta gritando o aterrado de noche y luego no recuerda nada', 'mente', 1, ['terrores nocturnos', 'pesadillas']],
      ['camina_dormido', 'Camina o hace cosas dormido y no lo recuerda', 'mente', 1, ['sonambulismo', 'sonámbulo']],
      ['moja_cama', 'Moja la cama durante la noche (después de los 5 años)', 'urogenital', 1, ['enuresis', 'se hace pipí en la cama', 'se orina en la cama']],
      ['ensucia_ropa', 'Niño que ensucia la ropa interior con deposiciones después de haber aprendido a ir al baño', 'digestivo', 1, ['encopresis', 'se hace caca']],
      ['miedo_separarse', 'Niño con angustia intensa al separarse de sus padres o de la casa (no quiere ir al colegio)', 'mente', 1, ['ansiedad por separación', 'no quiere ir al colegio']],
      ['ctx_viaje_movimiento', 'Ocurre al viajar en auto, bus, barco o avión', 'contexto', 0, ['mareo en el auto', 'mareo en barco']],
      ['ctx_posparto', 'Tuviste un bebé en los últimos 12 meses', 'contexto', 0, ['posparto', 'puerperio', 'recién parida'], 'F'],
      ['ctx_cambio_vital', 'Un cambio o problema importante en los últimos 3 meses (separación, despido, mudanza, enfermedad)', 'contexto', 0, ['crisis', 'problema importante', 'cambio de vida']],
      ['ctx_viaje_husos', 'Viaje reciente cruzando varios husos horarios o trabajo por turnos de noche', 'contexto', 0, ['jet lag', 'turnos de noche', 'desfase horario']],
      ['ctx_dejo_alcohol', 'Dejaste o bajaste bruscamente el alcohol después de beber mucho por tiempo', 'contexto', 0, ['abstinencia', 'dejé de tomar']],
      ['ctx_muerte_cercano', 'Muerte de un ser querido en los últimos meses', 'contexto', 0, ['duelo', 'falleció un familiar', 'pérdida']]
    ],
    sources: {
      mayo_cinetosis: [MAYO, 'Mareos por movimiento: primeros auxilios', 'https://www.mayoclinic.org/es/first-aid/first-aid-motion-sickness/basics/art-20056697'],
      mp_nervio_radial: [MP, 'Disfunción del nervio radial', 'https://medlineplus.gov/spanish/ency/article/000790.htm'],
      mp_piriforme: [MP, 'Síndrome piriforme', 'https://medlineplus.gov/spanish/ency/patientinstructions/000776.htm'],
      mp_fobias_t: [MP, 'Fobias', 'https://medlineplus.gov/spanish/phobias.html'],
      mp_fobia_social: [MP, 'Fobia social', 'https://medlineplus.gov/spanish/ency/article/000957.htm'],
      mp_agorafobia: [MP, 'Agorafobia', 'https://medlineplus.gov/spanish/ency/article/000923.htm'],
      mp_distimia: [MP, 'Trastorno depresivo persistente', 'https://medlineplus.gov/spanish/ency/article/000918.htm'],
      mp_depresion_posparto: [MP, 'Depresión posparto', 'https://medlineplus.gov/spanish/ency/article/007215.htm'],
      mp_adaptacion: [MP, 'Trastorno de adaptación', 'https://medlineplus.gov/spanish/ency/article/000932.htm'],
      mayo_tlp: [MAYO, 'Trastorno límite de la personalidad', 'https://www.mayoclinic.org/es/diseases-conditions/borderline-personality-disorder/symptoms-causes/syc-20370237'],
      mp_esquizofrenia: [MP, 'Esquizofrenia', 'https://medlineplus.gov/spanish/ency/article/000928.htm'],
      mp_psicosis: [MP, 'Psicosis', 'https://medlineplus.gov/spanish/ency/article/001553.htm'],
      mp_tea: [MP, 'Trastorno del espectro autista', 'https://medlineplus.gov/spanish/ency/article/001526.htm'],
      mp_sintomas_somaticos: [MP, 'Trastorno de síntomas somáticos', 'https://medlineplus.gov/spanish/ency/article/000955.htm'],
      mp_ansiedad_enfermedad: [MP, 'Trastorno de ansiedad por enfermedad', 'https://medlineplus.gov/spanish/ency/article/001236.htm'],
      mp_nicotina: [MP, 'Nicotina y tabaco', 'https://medlineplus.gov/spanish/ency/article/000953.htm'],
      mp_tdpm: [MP, 'Trastorno disfórico premenstrual', 'https://medlineplus.gov/spanish/ency/article/007193.htm'],
      mp_trastornos_sueno: [MP, 'Trastornos del sueño (incluye los terrores nocturnos)', 'https://medlineplus.gov/spanish/ency/article/000800.htm'],
      mp_sonambulismo: [MP, 'Sonambulismo', 'https://medlineplus.gov/spanish/ency/article/000808.htm'],
      mp_enuresis: [MP, 'Orinarse en la cama', 'https://medlineplus.gov/spanish/ency/patientinstructions/000703.htm'],
      mayo_enuresis: [MAYO, 'Mojar la cama', 'https://www.mayoclinic.org/es/diseases-conditions/bed-wetting/symptoms-causes/syc-20366685'],
      mp_encopresis: [MP, 'Encopresis', 'https://medlineplus.gov/spanish/ency/article/001570.htm'],
      mp_jet_lag: [MP, 'Prevención del desfase horario (jet lag)', 'https://medlineplus.gov/spanish/ency/patientinstructions/000719.htm'],
      mp_abstinencia_alcohol: [MP, 'Abstinencia alcohólica', 'https://medlineplus.gov/spanish/ency/article/000764.htm'],
      mp_delirium_tremens: [MP, 'Delirium tremens', 'https://medlineplus.gov/spanish/ency/article/000766.htm'],
      mp_duelo: [MP, 'Duelo', 'https://medlineplus.gov/spanish/ency/article/001530.htm'],
      mayo_ansiedad_separacion: [MAYO, 'Trastorno de ansiedad por separación', 'https://www.mayoclinic.org/es/diseases-conditions/separation-anxiety-disorder/symptoms-causes/syc-20377455']
    },
    conditions: [
      {
        id: 'deterioro_cognitivo_leve', n: 'Deterioro cognitivo leve', urg: 2, prev: 1.0, dur: ['m'],
        age: [[0, 49, 0.2], [65, 200, 1.4]],
        s: { memoria: 3, olvidos_progresivos: -1, tristeza: -1, confusion: -1 },
        que: 'Más problemas de memoria o de concentración de lo esperado para la edad, pero sin que afecten la independencia en la vida diaria. No siempre avanza a demencia, y a veces se debe a causas tratables como depresión, falta de vitamina B12, hipotiroidismo o medicamentos.',
        trat: 'Evaluar y tratar las causas reversibles; controlar la presión, el azúcar y la audición; ejercicio físico, actividad mental y social, buen sueño. Controles periódicos para ver si avanza.',
        esp: 'Médico general; neurólogo o geriatra.',
        alarma: 'Confusión que aparece de golpe, desorientación, dificultad para hablar o debilidad: urgencia.',
        src: ['mp_demencia']
      },
      {
        id: 'cinetosis', n: 'Mareo por movimiento', alt: 'Cinetosis', urg: 1, prev: 1.0, dur: ['h'],
        req: ['ctx_viaje_movimiento'], reqF: 0.3,
        s: { ctx_viaje_movimiento: 3, nauseas: 2, mareo: 2, vomitos: 1, sudoracion: 1, palidez: 1 },
        que: 'Náuseas, mareo, sudor frío y a veces vómitos al viajar en auto, bus, barco, avión o en juegos mecánicos, porque el oído interno y la vista envían señales distintas al cerebro. Es muy frecuente en niños y embarazadas.',
        trat: 'Sentarse adelante o donde haya menos movimiento, mirar el horizonte, no leer ni usar pantallas, ventilar y comer liviano. Medicamentos de farmacia (como dimenhidrinato o meclizina) 30 a 60 minutos antes de viajar, según indicación.',
        esp: 'Médico general si es muy intenso.',
        alarma: 'Mareo o vértigo que aparece sin viajar, con dolor de cabeza intenso, visión doble o debilidad: consulta urgente.',
        src: ['mayo_cinetosis']
      },
      {
        id: 'paralisis_radial', n: 'Parálisis del nervio radial', alt: 'Mano caída («parálisis del sábado en la noche»)', urg: 3, prev: 0.9, dur: ['h', 'd', 's'],
        s: { mano_caida: 3, hormigueo_mano: 1, ctx_alcohol_agudo: 1, debilidad_lado: -2, cara_caida: -2 },
        que: 'Daño del nervio radial, que mueve los músculos que levantan la muñeca y los dedos. Suele deberse a una compresión del brazo (dormir apoyado sobre él, a veces tras beber alcohol, o el uso de muletas) o a una fractura del húmero. La mano cae y cuesta estirar la muñeca y los dedos.',
        trat: 'Si es por compresión, suele recuperarse en semanas o meses: férula que mantiene la muñeca levantada y kinesiología. Si hay fractura o no mejora, evaluación por especialista.',
        esp: 'Médico general; traumatólogo o neurólogo; kinesiólogo.',
        alarma: 'Debilidad de todo un lado del cuerpo, cara caída o dificultad para hablar: llama al 131 (puede ser un ACV).',
        src: ['mp_nervio_radial']
      },
      {
        id: 'piriforme', n: 'Síndrome del piriforme', urg: 1, prev: 0.95, dur: ['d', 's', 'm'], sexF: 1.2,
        s: { dolor_gluteo: 3, ciatica: 2, dolor_lumbar: -1 },
        que: 'El músculo piriforme, en el glúteo, comprime el nervio ciático. Produce dolor profundo en el glúteo que puede bajar por la parte posterior de la pierna y que empeora al estar sentado mucho rato o al subir escaleras.',
        trat: 'Elongaciones del glúteo, kinesiología, calor o frío local y antiinflamatorios; evitar estar mucho tiempo sentado. A veces infiltraciones; la cirugía es excepcional.',
        esp: 'Médico general; kinesiólogo; traumatólogo.',
        alarma: 'Pérdida de fuerza en la pierna, adormecimiento entre las piernas o pérdida del control de la orina: urgencia.',
        src: ['mp_piriforme']
      },
      {
        id: 'fobia_especifica', n: 'Fobia específica', urg: 2, prev: 1.0, dur: ['m'],
        s: { miedo_objeto: 3, ansiedad: 1, palpitaciones: 1, sudoracion: 1 },
        que: 'Miedo intenso y desproporcionado a algo concreto (animales, alturas, agujas, sangre, volar, espacios cerrados), que lleva a evitarlo y limita la vida diaria. Al enfrentarlo pueden aparecer palpitaciones, sudor o una crisis de pánico.',
        trat: 'La terapia cognitivo-conductual con exposición gradual es muy eficaz; a veces medicamentos por un tiempo corto en situaciones puntuales.',
        esp: 'Psicólogo; psiquiatra si es grave.',
        alarma: 'Si el miedo impide atenderte en salud (por ejemplo, a agujas) o se acompaña de tristeza intensa: consulta.',
        src: ['mp_fobias_t']
      },
      {
        id: 'ansiedad_social', n: 'Ansiedad social', alt: 'Fobia social', urg: 2, prev: 1.0, dur: ['m'],
        age: [[12, 35, 1.2]],
        s: { miedo_social: 3, ansiedad: 1, sudoracion: 1, palpitaciones: 1, temblor: 1 },
        que: 'Miedo intenso y persistente a ser observado, juzgado o hacer el ridículo en situaciones sociales (hablar en público, comer frente a otros, conocer gente). Lleva a evitarlas y afecta los estudios, el trabajo y las relaciones.',
        trat: 'Terapia cognitivo-conductual con exposición gradual; en algunos casos, antidepresivos indicados por un médico.',
        esp: 'Psicólogo; psiquiatra.',
        alarma: 'Tristeza profunda, consumo de alcohol para enfrentar situaciones o ideas de hacerse daño: consulta pronto (línea *4141).',
        src: ['mp_fobia_social']
      },
      {
        id: 'agorafobia', n: 'Agorafobia', urg: 2, prev: 0.95, dur: ['m'],
        s: { miedo_lugares: 3, miedo_intenso: 1, ansiedad: 1, palpitaciones: 1 },
        que: 'Miedo y ansiedad intensos a estar en lugares o situaciones de los que sería difícil escapar o recibir ayuda (multitudes, transporte, filas, salir solo). A menudo aparece después de crisis de pánico y puede llevar a no salir de casa.',
        trat: 'Terapia cognitivo-conductual con exposición gradual y, a veces, antidepresivos. Mientras antes se trate, mejor.',
        esp: 'Psicólogo; psiquiatra.',
        alarma: 'Si no puedes salir de casa, o hay tristeza intensa o ideas de hacerte daño: consulta pronto (línea *4141).',
        src: ['mp_agorafobia']
      },
      {
        id: 'distimia', n: 'Trastorno depresivo persistente', alt: 'Distimia', urg: 2, prev: 0.95, dur: ['m'],
        s: { animo_bajo_anos: 3, tristeza: 2, fatiga: 1, insomnio: 1, culpa: 1, anhedonia: 1 },
        que: 'Forma crónica de depresión: el ánimo está bajo casi todos los días durante 2 años o más, con poca energía, baja autoestima, problemas de sueño o apetito y dificultad para concentrarse. Al ser tan prolongada, muchas personas creen que «son así».',
        trat: 'Psicoterapia y antidepresivos, que funcionan mejor combinados; actividad física y apoyo social.',
        ges: 'La depresión en personas de 15 años y más está cubierta por GES.',
        esp: 'Médico general; psicólogo; psiquiatra.',
        alarma: 'Pensamientos de muerte o de hacerte daño: llama a la línea *4141 o al 131.',
        src: ['mp_distimia', 'minsal_ges']
      },
      {
        id: 'depresion_posparto', n: 'Depresión posparto', urg: 3, prev: 1.0, dur: ['s', 'm'], sex: 'F',
        req: ['ctx_posparto'], reqF: 0.3,
        s: { ctx_posparto: 3, tristeza: 2, anhedonia: 2, culpa: 2, ansiedad: 1, insomnio: 1, irritabilidad: 1, ideas_suicidas: 1 },
        que: 'Depresión que aparece en el primer año después del parto, con más frecuencia en los primeros 3 meses. A diferencia de la «tristeza posparto», que dura pocos días, persiste más de 2 semanas: tristeza, llanto, culpa, angustia, falta de interés, dificultad para cuidar al bebé o para crear un vínculo con él.',
        trat: 'Psicoterapia y, si es necesario, antidepresivos compatibles con la lactancia; apoyo de la pareja y la familia, descanso y redes de apoyo. Tiene buen pronóstico con tratamiento.',
        ges: 'La depresión en personas de 15 años y más está cubierta por GES.',
        esp: 'Médico general, matrona o ginecólogo; psicólogo; psiquiatra.',
        alarma: 'Pensamientos de hacerte daño o de dañar al bebé, o ideas extrañas o voces: urgencia inmediata (131 o línea *4141).',
        src: ['mp_depresion_posparto', 'minsal_ges']
      },
      {
        id: 'trastorno_adaptacion', n: 'Trastorno de adaptación', urg: 2, prev: 1.0, dur: ['s', 'm'],
        req: ['ctx_cambio_vital'], reqF: 0.4,
        s: { ctx_cambio_vital: 3, tristeza: 2, ansiedad: 2, insomnio: 1, irritabilidad: 1, palpitaciones: 1 },
        que: 'Reacción emocional o de conducta más intensa de lo esperado frente a un cambio o problema importante (separación, despido, mudanza, enfermedad), que aparece dentro de los 3 meses y afecta el trabajo o la vida social: tristeza, ansiedad, llanto, insomnio o molestias físicas.',
        trat: 'Psicoterapia breve, apoyo social y técnicas para manejar el estrés; a veces medicamentos por poco tiempo. Suele mejorar en meses.',
        esp: 'Médico general; psicólogo.',
        alarma: 'Ideas de muerte o de hacerte daño, o consumo de alcohol o drogas para sobrellevarlo: consulta pronto (línea *4141).',
        src: ['mp_adaptacion']
      },
      {
        id: 'trastorno_limite', n: 'Trastorno límite de la personalidad', urg: 3, prev: 0.9, dur: ['m'],
        age: [[15, 40, 1.2]],
        s: { emociones_inestables: 3, impulsividad: 2, irritabilidad: 1, tristeza: 1, ideas_suicidas: 1 },
        que: 'Patrón persistente de emociones muy intensas y cambiantes, miedo intenso al abandono, relaciones inestables, impulsividad, sensación de vacío, enojo intenso y, a veces, autolesiones. Suele comenzar al inicio de la adultez.',
        trat: 'La psicoterapia especializada (como la terapia dialéctico-conductual) es el tratamiento principal; los medicamentos ayudan con síntomas como la depresión o la ansiedad. Con tratamiento, muchas personas mejoran.',
        esp: 'Psiquiatra; psicólogo.',
        alarma: 'Autolesiones o pensamientos de quitarte la vida: llama a la línea *4141 o al 131.',
        src: ['mayo_tlp']
      },
      {
        id: 'esquizofrenia', n: 'Esquizofrenia y psicosis', urg: 4, prev: 0.9, dur: ['s', 'm'],
        age: [[15, 35, 1.3]],
        s: { alucinaciones: 3, aislamiento: 2, confusion: 1, menos_sueno: 1, irritabilidad: 1, euforia: -1 },
        que: 'La psicosis es la pérdida de contacto con la realidad: escuchar voces, creencias extrañas (como sentirse perseguido), lenguaje desorganizado. La esquizofrenia es un trastorno mental crónico que suele empezar entre los 15 y 35 años, a menudo con aislamiento y descuido personal antes de las alucinaciones. El consumo de drogas puede desencadenarla.',
        trat: 'Medicamentos antipsicóticos, generalmente por largo tiempo, junto con psicoterapia, apoyo familiar y rehabilitación. Mientras antes se trate el primer episodio, mejor es la evolución.',
        ges: 'El tratamiento de la esquizofrenia está cubierto por GES.',
        esp: 'Psiquiatra (consulta urgente si es un primer episodio).',
        alarma: 'Riesgo de hacerse daño o dañar a otros, agitación intensa o voces que ordenan hacer daño: urgencia inmediata (131).',
        src: ['mp_esquizofrenia', 'mp_psicosis', 'minsal_ges']
      },
      {
        id: 'autismo', n: 'Trastorno del espectro autista', alt: 'TEA', urg: 2, prev: 1.0, dur: ['m'], sexF: 0.4,
        age: [[1, 12, 1.3]],
        s: { dificultad_social: 3, sin_habla: 1, retraso_desarrollo: 1, cara_alargada: -2, movimientos_manos: -1 },
        que: 'Condición del neurodesarrollo que aparece en los primeros años: dificultades en la comunicación y la interacción social (poco contacto visual, no responde a su nombre, le cuesta jugar con otros), intereses muy restringidos y conductas o movimientos repetitivos, con sensibilidad a sonidos o texturas.',
        trat: 'No es una enfermedad que se cure, pero la intervención temprana (terapia del lenguaje, terapia ocupacional, análisis conductual) mejora mucho el desarrollo y la autonomía. Apoyo escolar y familiar.',
        esp: 'Pediatra; neurólogo infantil o psiquiatra infantil; fonoaudiólogo; terapeuta ocupacional.',
        alarma: 'Pérdida de palabras o habilidades ya adquiridas a cualquier edad: consulta pronto.',
        src: ['mp_tea']
      },
      {
        id: 'sintomas_somaticos', n: 'Trastorno de síntomas somáticos', urg: 2, prev: 0.9, dur: ['m'],
        s: { preocupacion_sintomas: 3, dolor_generalizado: 1, fatiga: 1, ansiedad: 1 },
        que: 'Síntomas físicos reales (dolor, cansancio, molestias digestivas) acompañados de una preocupación tan intensa y constante que ocupa gran parte del día y afecta la vida, aunque los exámenes no muestren una enfermedad que los explique por completo. La persona no los está inventando.',
        trat: 'Un médico de cabecera estable, controles regulares, terapia cognitivo-conductual y, a veces, antidepresivos; evitar exámenes innecesarios repetidos.',
        esp: 'Médico general; psicólogo; psiquiatra.',
        alarma: 'Un síntoma nuevo o distinto (por ejemplo, dolor de pecho, baja de peso o sangrados): consulta para evaluarlo.',
        src: ['mp_sintomas_somaticos']
      },
      {
        id: 'hipocondria', n: 'Ansiedad por la salud', alt: 'Hipocondría', urg: 2, prev: 0.95, dur: ['m'],
        s: { miedo_enfermedad: 3, ansiedad: 2, insomnio: 1 },
        que: 'Preocupación persistente de tener una enfermedad grave, a pesar de exámenes normales y de que un médico lo descarte. Lleva a revisarse el cuerpo, buscar información en internet y consultar o evitar al médico de forma repetida.',
        trat: 'La terapia cognitivo-conductual es eficaz; a veces antidepresivos. Ayuda limitar las búsquedas de síntomas en internet y mantener controles con un mismo médico.',
        esp: 'Médico general; psicólogo; psiquiatra.',
        alarma: 'Ante síntomas nuevos de alarma (dolor de pecho, falta de aire, debilidad), consulta igualmente.',
        src: ['mp_ansiedad_enfermedad']
      },
      {
        id: 'tabaquismo', n: 'Tabaquismo', alt: 'Dependencia de la nicotina', urg: 2, prev: 1.0, dur: ['m'],
        req: ['ctx_fumador'], reqF: 0.3,
        s: { ctx_fumador: 3, ganas_fumar: 3, tos_flema: 1, ansiedad: 1, irritabilidad: 1 },
        que: 'Adicción a la nicotina del cigarrillo, del cigarrillo electrónico u otros productos de tabaco. Al intentar dejarlo aparecen ganas intensas de fumar, ansiedad, irritabilidad e insomnio. Es la principal causa evitable de cáncer, infartos, ACV y EPOC.',
        trat: 'Consejería, terapia de reemplazo de nicotina (parches, chicles) y medicamentos indicados por un médico aumentan mucho la probabilidad de dejarlo. Nunca es tarde para dejar de fumar.',
        esp: 'Médico general; programas de cesación tabáquica del consultorio.',
        alarma: 'Tos con sangre, baja de peso, falta de aire que aumenta o dolor de pecho: consulta pronto.',
        src: ['mp_nicotina']
      },
      {
        id: 'tdpm', n: 'Trastorno disfórico premenstrual', urg: 2, prev: 0.95, dur: ['m'], sex: 'F',
        req: ['ctx_premenstrual'], reqF: 0.3,
        s: { ctx_premenstrual: 3, irritabilidad: 3, tristeza: 2, ansiedad: 2, insomnio: 1, sensibilidad_mamas: 1 },
        que: 'Forma grave del síndrome premenstrual: en la semana previa a la regla aparecen tristeza intensa, irritabilidad o enojo, ansiedad y cambios de ánimo que afectan el trabajo y las relaciones, y desaparecen pocos días después de que empieza la regla.',
        trat: 'Ejercicio, manejo del estrés y, según indicación médica, antidepresivos (a veces solo en la segunda mitad del ciclo) o anticonceptivos hormonales.',
        esp: 'Ginecólogo o médico general; psiquiatra si es necesario.',
        alarma: 'Ideas de hacerte daño: llama a la línea *4141 o al 131.',
        src: ['mp_tdpm']
      },
      {
        id: 'terrores_nocturnos', n: 'Pesadillas y terrores nocturnos', urg: 1, prev: 1.0, dur: ['s', 'm'],
        age: [[2, 10, 1.4]],
        s: { despierta_gritando: 3, insomnio: 1, convulsion: -2 },
        que: 'Los terrores nocturnos son episodios en que el niño se sienta o grita aterrado durante el sueño profundo, sin despertar del todo, y al día siguiente no lo recuerda. Las pesadillas, en cambio, son sueños angustiantes que el niño sí recuerda. Ambos son frecuentes y suelen desaparecer con la edad.',
        trat: 'Mantener horarios regulares de sueño, evitar el cansancio excesivo y las pantallas antes de dormir, no despertarlo bruscamente durante un terror nocturno y cuidar su seguridad.',
        esp: 'Pediatra si son muy frecuentes.',
        alarma: 'Movimientos rígidos o sacudidas, mordedura de lengua o pérdida de orina durante el episodio: consulta (descartar convulsiones).',
        src: ['mp_trastornos_sueno']
      },
      {
        id: 'sonambulismo', n: 'Sonambulismo', urg: 1, prev: 1.0, dur: ['s', 'm'],
        age: [[4, 14, 1.3]],
        s: { camina_dormido: 3, somnolencia_diurna: 1 },
        que: 'Levantarse y caminar o hacer otras actividades mientras se duerme, sin recordarlo después. Es frecuente en niños y disminuye con la edad; se asocia al cansancio, la falta de sueño y la ansiedad.',
        trat: 'Dormir lo suficiente, horarios regulares y un ambiente seguro (cerrar puertas y ventanas, retirar objetos peligrosos). No es necesario despertarlo; basta con guiarlo de vuelta a la cama.',
        esp: 'Pediatra o médico general si es muy frecuente o hay riesgo.',
        alarma: 'Episodios con lesiones, conductas violentas o que empiezan en la adultez: consulta.',
        src: ['mp_sonambulismo', 'mp_trastornos_sueno']
      },
      {
        id: 'enuresis', n: 'Enuresis nocturna', alt: 'Mojar la cama', urg: 1, prev: 1.0, dur: ['m'],
        ageRange: [5, 17],
        s: { moja_cama: 3, ctx_familia: 1, ardor_orinar: -1, sed: -1 },
        que: 'Orinarse en la cama durante el sueño en niños mayores de 5 años. Es muy frecuente, suele ser hereditaria y se debe a que la vejiga y su control todavía están madurando o a que se produce mucha orina de noche. No es culpa del niño.',
        trat: 'Nunca castigar. Reducir líquidos en la noche, orinar antes de dormir, alarmas de humedad y, a veces, desmopresina. La mayoría lo supera con la edad.',
        esp: 'Pediatra.',
        alarma: 'Si vuelve a mojar la cama después de meses seco, o hay ardor al orinar, mucha sed o se orina también de día: consulta.',
        src: ['mp_enuresis', 'mayo_enuresis']
      },
      {
        id: 'encopresis', n: 'Encopresis', urg: 2, prev: 0.95, dur: ['m'],
        ageRange: [4, 17],
        s: { ensucia_ropa: 3, estrenimiento: 2, dolor_abdominal: 1 },
        que: 'Niño que ya aprendió a ir al baño y vuelve a ensuciar la ropa interior con deposiciones. Casi siempre se debe a un estreñimiento crónico: las deposiciones duras se acumulan y las más blandas se escapan sin que el niño lo note.',
        trat: 'Tratar el estreñimiento (vaciar el intestino y mantener deposiciones blandas con laxantes indicados por el médico), rutinas para ir al baño después de comer, más fibra y agua. Sin castigos.',
        esp: 'Pediatra.',
        alarma: 'Dolor abdominal intenso, vómitos, sangre o falta de crecimiento: consulta pronto.',
        src: ['mp_encopresis']
      },
      {
        id: 'jet_lag', n: 'Jet lag y alteraciones del ritmo del sueño', alt: 'Desfase horario', urg: 1, prev: 1.0, dur: ['d', 's'],
        req: ['ctx_viaje_husos'], reqF: 0.3,
        s: { ctx_viaje_husos: 3, insomnio: 2, somnolencia_diurna: 2, fatiga: 1, memoria: 1, irritabilidad: 1 },
        que: 'Alteración del reloj biológico al viajar cruzando varios husos horarios o al trabajar en turnos de noche: insomnio, sueño durante el día, cansancio, dificultad para concentrarse y molestias digestivas.',
        trat: 'Adaptarse al horario del destino desde el primer día, exponerse a la luz natural de día y evitar la luz de noche; la melatonina puede ayudar. En turnos, mantener horarios regulares de sueño.',
        esp: 'Médico general si persiste.',
        alarma: 'Somnolencia que provoca accidentes o casi accidentes al manejar: consulta.',
        src: ['mp_jet_lag']
      },
      {
        id: 'abstinencia_alcohol', n: 'Síndrome de abstinencia de alcohol', urg: 4, prev: 0.95, dur: ['h', 'd'],
        req: ['ctx_dejo_alcohol'], reqF: 0.3,
        s: { ctx_dejo_alcohol: 3, temblor: 3, sudoracion: 2, ansiedad: 2, nauseas: 1, insomnio: 1, palpitaciones: 1, alucinaciones: 1, convulsion: 1, confusion: 1 },
        que: 'Síntomas que aparecen horas o días después de dejar o reducir el alcohol en personas que beben mucho por tiempo: temblor, sudor, ansiedad, náuseas, insomnio y palpitaciones. En casos graves hay convulsiones o delirium tremens (confusión, alucinaciones, fiebre), que puede ser mortal.',
        trat: 'Requiere evaluación médica: medicamentos para la abstinencia, vitamina B1 (tiamina) y control; los casos graves se tratan en el hospital. Después, apoyo para mantener la abstinencia.',
        esp: 'Servicio de urgencia o médico; programas de tratamiento de alcohol (SENDA, fono 1412).',
        alarma: 'Convulsión, confusión, alucinaciones o fiebre: llama al 131.',
        src: ['mp_abstinencia_alcohol', 'mp_delirium_tremens', 'senda']
      },
      {
        id: 'duelo', n: 'Duelo', urg: 1, prev: 1.0, dur: ['s', 'm'],
        req: ['ctx_muerte_cercano'], reqF: 0.3,
        s: { ctx_muerte_cercano: 3, tristeza: 2, insomnio: 1, culpa: 1, inapetencia: 1, anhedonia: 1 },
        que: 'Reacción natural ante la muerte de un ser querido: tristeza, llanto, rabia, culpa, incredulidad, problemas de sueño o apetito, que van y vienen y suelen disminuir con los meses. No ocurre en etapas fijas y cada persona lo vive a su manera.',
        trat: 'Darse tiempo, hablar de la pérdida, apoyarse en familiares, amigos o grupos de duelo, cuidar el sueño y la alimentación. Si es muy intenso o se prolonga, ayuda psicológica.',
        esp: 'Médico general o psicólogo si se complica.',
        alarma: 'Ideas de muerte o de hacerte daño, consumo de alcohol o drogas, o no poder funcionar después de varios meses: consulta (línea *4141).',
        src: ['mp_duelo']
      },
      {
        id: 'ansiedad_separacion', n: 'Ansiedad por separación', alt: 'En niños', urg: 2, prev: 1.0, dur: ['s', 'm'],
        age: [[3, 12, 1.4]],
        s: { miedo_separarse: 3, dolor_abdominal: 1, dolor_cabeza: 1, insomnio: 1 },
        que: 'Angustia excesiva y persistente del niño al separarse de sus padres o de la casa, más de lo esperado para su edad: miedo a que les pase algo, rechazo a ir al colegio o a dormir solo, y dolores de guata o de cabeza antes de separarse.',
        trat: 'Terapia cognitivo-conductual con participación de los padres, separaciones graduales y coordinación con el colegio; rara vez medicamentos.',
        esp: 'Pediatra; psicólogo infantil.',
        alarma: 'Si deja de ir al colegio por semanas, o hay tristeza intensa o crisis de pánico: consulta pronto.',
        src: ['mayo_ansiedad_separacion']
      }
    ]
  });

  // ── Tanda 5 (noviembre 2026): digestivas, hígado y urológicas
  D.addPack({
    symptoms: [
      ['bulto_ombligo', 'Bulto en el ombligo o en una cicatriz del abdomen que sale al pujar o toser', 'digestivo', 1, ['hernia umbilical', 'ombligo salido', 'eventración']],
      ['sangre_heces_bebe', 'Bebé con hilos de sangre o mucosidad en las deposiciones', 'digestivo', 2, ['sangre en la caca del bebé', 'deposiciones con mucosidad']],
      ['reaccion_repite_alimento', 'Reacción (ronchas, picazón en la boca, vómitos) cada vez que comes un alimento específico', 'digestivo', 1, ['alergia a un alimento', 'alergia al maní', 'alergia a los mariscos']],
      ['secrecion_anal', 'Secreción de pus o líquido por un orificio cerca del ano', 'digestivo', 1, ['fístula anal', 'pus en el ano']],
      ['bulto_coxis', 'Bulto doloroso o con pus en el pliegue entre los glúteos, sobre el coxis', 'piel', 1, ['quiste pilonidal', 'quiste en el coxis']],
      ['escape_deposiciones', 'Escape involuntario de deposiciones o gases', 'digestivo', 1, ['incontinencia fecal', 'no aguanto la caca']],
      ['dolor_tragar', 'Dolor al tragar detrás del esternón (no en la garganta)', 'digestivo', 1, ['odinofagia', 'dolor del esófago']],
      ['urgencia_orinar', 'Ganas urgentes y repentinas de orinar, a veces con escape', 'urogenital', 1, ['vejiga hiperactiva', 'urgencia urinaria']],
      ['escroto_hinchado_indoloro', 'Escroto agrandado, blando e indoloro (como una bolsa de agua)', 'urogenital', 1, ['hidrocele', 'agua en el testículo'], 'M'],
      ['bulto_sobre_testiculo', 'Bultito blando e indoloro encima o detrás de un testículo, separado de él', 'urogenital', 1, ['espermatocele', 'quiste del epidídimo'], 'M'],
      ['glande_rojo', 'Glande rojo e hinchado, con picazón, ardor o secreción', 'urogenital', 1, ['balanitis', 'cabeza del pene irritada'], 'M'],
      ['prepucio_no_baja', 'El prepucio no se puede bajar, o quedó atrapado detrás del glande y está hinchado', 'urogenital', 2, ['fimosis', 'parafimosis'], 'M'],
      ['eyacula_antes', 'Eyaculación antes de lo deseado casi siempre, con malestar', 'urogenital', 1, ['eyaculación precoz', 'eyaculación rápida'], 'M'],
      ['deseo_sexual_bajo', 'Disminución marcada del deseo sexual', 'urogenital', 1, ['bajo deseo sexual', 'libido baja', 'sin ganas']],
      ['ctx_sobrepeso', 'Sobrepeso u obesidad, sobre todo en la cintura', 'contexto', 0, ['obesidad', 'sobrepeso', 'guatita']],
      ['ctx_examen_higado', 'Te dijeron que tienes el hígado graso o las enzimas del hígado elevadas en un examen', 'contexto', 0, ['hígado graso', 'transaminasas altas']],
      ['ctx_hepatitis_b', 'Te dijeron que tienes un examen positivo para hepatitis B', 'contexto', 0, ['hepatitis B positiva']],
      ['ctx_hepatitis_c', 'Te dijeron que tienes un examen positivo para hepatitis C', 'contexto', 0, ['hepatitis C positiva']],
      ['ctx_antibioticos', 'Tomaste antibióticos en las últimas semanas', 'contexto', 0, ['antibiótico reciente']],
      ['ctx_ayuno_estres', 'Aparece con ayuno, estrés, ejercicio intenso o infecciones', 'contexto', 0, ['ayuno', 'trasnoche']]
    ],
    sources: {
      mp_indigestion: [MP, 'Indigestión', 'https://medlineplus.gov/spanish/ency/article/003260.htm'],
      mp_hernia_hiato: [MP, 'Hernia de hiato', 'https://medlineplus.gov/spanish/ency/article/001137.htm'],
      mp_hernia_umbilical: [MP, 'Hernia umbilical', 'https://medlineplus.gov/spanish/ency/article/000987.htm'],
      mp_higado_graso: [MP, 'Enfermedad del hígado graso no alcohólico', 'https://medlineplus.gov/spanish/ency/article/007657.htm'],
      mp_hepatitis: [MP, 'Hepatitis', 'https://medlineplus.gov/spanish/ency/article/001154.htm'],
      who_hep_c: [OMS, 'Hepatitis C (nota descriptiva)', 'https://www.who.int/es/news-room/fact-sheets/detail/hepatitis-c'],
      mp_colestasis: [MP, 'Colestasis', 'https://medlineplus.gov/spanish/ency/article/000215.htm'],
      mp_colitis_seudomembranosa: [MP, 'Colitis seudomembranosa (C. difficile)', 'https://medlineplus.gov/spanish/ency/article/000259.htm'],
      mp_diarrea_viajero: [MP, 'Dieta para la diarrea del viajero', 'https://medlineplus.gov/spanish/ency/article/002433.htm'],
      mp_guia_viajeros: [MP, 'Guía de viajeros para evitar enfermedades infecciosas', 'https://medlineplus.gov/spanish/ency/article/001925.htm'],
      mp_alergia_alimentaria: [MP, 'Alergia alimentaria', 'https://medlineplus.gov/spanish/ency/article/000817.htm'],
      mp_reflujo_bebes: [MP, 'Reflujo gastroesofágico en bebés', 'https://medlineplus.gov/spanish/ency/article/001134.htm'],
      mp_ano_t: [MP, 'Enfermedades del ano (incluye el prurito anal y las fístulas)', 'https://medlineplus.gov/spanish/analdisorders.html'],
      mp_pilonidal: [MP, 'Enfermedad del seno pilonidal', 'https://medlineplus.gov/spanish/ency/article/003253.htm'],
      mp_reeducacion_intestinal: [MP, 'Reeducación intestinal (incontinencia fecal)', 'https://medlineplus.gov/spanish/ency/article/003971.htm'],
      mp_gilbert: [MP, 'Síndrome de Gilbert', 'https://medlineplus.gov/spanish/ency/article/000301.htm'],
      mp_esofagitis: [MP, 'Esofagitis', 'https://medlineplus.gov/spanish/ency/article/001153.htm'],
      mp_miccion_urgente: [MP, 'Micción urgente o frecuente', 'https://medlineplus.gov/spanish/ency/article/003140.htm'],
      mp_hidrocele_img: [MP, 'Hidrocele (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/19667.htm'],
      mp_espermatocele_img: [MP, 'Espermatocele (ilustración)', 'https://medlineplus.gov/spanish/ency/esp_imagepages/19692.htm'],
      mp_balanitis: [MP, 'Balanitis', 'https://medlineplus.gov/spanish/ency/article/000862.htm'],
      mp_parafimosis: [MP, 'Parafimosis', 'https://medlineplus.gov/spanish/ency/article/001281.htm'],
      mp_eyaculacion_precoz: [MP, 'Eyaculación precoz', 'https://medlineplus.gov/spanish/ency/article/001524.htm'],
      mp_hipogonadismo: [MP, 'Hipogonadismo masculino', 'https://medlineplus.gov/spanish/ency/article/000395.htm']
    },
    conditions: [
      {
        id: 'dispepsia', n: 'Dispepsia funcional', alt: 'Indigestión', urg: 2, prev: 1.0, dur: ['s', 'm'],
        s: { dolor_epigastrio: 3, llenura: 3, nauseas: 1, hinchazon_abdominal: 1, deposiciones_negras: -2, vomito_sangre: -2, perdida_peso: -1 },
        que: 'Molestia o dolor recurrente en la parte alta del abdomen, con sensación de llenura rápida o pesadez después de comer, sin una lesión que lo explique en los exámenes. Empeora con comidas abundantes, grasas o picantes, el café, el alcohol, el tabaco y el estrés.',
        trat: 'Comer porciones pequeñas y sin apuro, reducir grasas, café, alcohol y tabaco, manejar el estrés y, según indicación médica, medicamentos para la acidez o que mejoran el vaciamiento del estómago. Buscar Helicobacter pylori si corresponde.',
        esp: 'Médico general; gastroenterólogo si persiste.',
        alarma: 'Vómitos con sangre, deposiciones negras, baja de peso, dificultad para tragar o anemia, sobre todo después de los 40 años: consulta pronto.',
        src: ['mp_indigestion']
      },
      {
        id: 'hernia_hiatal', n: 'Hernia hiatal', alt: 'Hernia de hiato', urg: 2, prev: 0.95, dur: ['m'],
        age: [[50, 200, 1.2]],
        s: { ardor_pecho: 3, regurgitacion: 2, llenura: 1, disfagia: 1, ctx_sobrepeso: 1 },
        que: 'Parte del estómago sube hacia el tórax a través de una abertura del diafragma. Es frecuente con la edad, el sobrepeso y el tabaco; muchas veces no da síntomas, pero puede causar acidez, regurgitación y reflujo.',
        trat: 'Las mismas medidas del reflujo: bajar de peso, comer porciones pequeñas, no acostarse después de comer, elevar la cabecera y medicamentos para la acidez. Rara vez se necesita cirugía.',
        esp: 'Médico general; gastroenterólogo.',
        alarma: 'Dolor de pecho intenso, vómitos que no ceden, dificultad para tragar o vómito con sangre: urgencia.',
        src: ['mp_hernia_hiato']
      },
      {
        id: 'hernia_umbilical', n: 'Hernia umbilical o de la pared abdominal', alt: 'Hernia del ombligo o eventración', urg: 2, prev: 1.0, dur: ['s', 'm'],
        s: { bulto_ombligo: 3, dolor_abdominal: 1, ctx_sobrepeso: 1, bulto_ingle: -1 },
        que: 'Bulto en el ombligo o en una cicatriz de una cirugía, por donde sale parte del contenido del abdomen a través de un punto débil de la pared. Aumenta al toser o pujar y suele volver a entrar al acostarse. En los bebés es frecuente y casi siempre se cierra sola.',
        trat: 'En niños, observar hasta los 4 o 5 años. En adultos, si molesta o crece, cirugía programada para repararla.',
        esp: 'Médico general o pediatra; cirujano.',
        alarma: 'Bulto duro, muy doloroso, que no vuelve a entrar o se pone rojo, con vómitos: urgencia (hernia atascada).',
        src: ['mp_hernia_umbilical', 'mp_hernia']
      },
      {
        id: 'higado_graso', n: 'Hígado graso', alt: 'Esteatosis hepática', urg: 2, prev: 1.0, dur: ['m'],
        req: ['ctx_examen_higado', 'ctx_sobrepeso'], reqF: 0.4,
        s: { ctx_examen_higado: 3, ctx_sobrepeso: 3, ctx_diabetes: 1, fatiga: 1, dolor_hipocondrio: 1 },
        que: 'Acumulación de grasa en el hígado no causada por el alcohol, muy frecuente en personas con sobrepeso, diabetes, colesterol o triglicéridos altos. Casi nunca da síntomas y se descubre en una ecografía o por exámenes alterados; en algunos casos avanza a inflamación y cirrosis.',
        trat: 'Bajar de peso de forma gradual (un 7 a 10 % mejora mucho el hígado), alimentación saludable, ejercicio, evitar el alcohol y controlar la diabetes y el colesterol.',
        esp: 'Médico general; gastroenterólogo o hepatólogo.',
        alarma: 'Ictericia, abdomen que crece o vómitos con sangre: consulta urgente.',
        src: ['mp_higado_graso']
      },
      {
        id: 'hepatitis_b', n: 'Hepatitis B', urg: 2, prev: 0.9, dur: ['d', 's', 'm'],
        req: ['ctx_hepatitis_b'], reqF: 0.3,
        s: { ctx_hepatitis_b: 3, fatiga: 2, ictericia: 2, coluria: 1, dolor_hipocondrio: 1, dolor_articular: 1, ctx_sexo: 1 },
        que: 'Infección del hígado por un virus que se transmite por sangre, relaciones sexuales y de la madre al bebé durante el parto. Puede no dar síntomas o causar cansancio, ictericia y orina oscura; en algunas personas se vuelve crónica y lleva a cirrosis o cáncer de hígado.',
        trat: 'La infección aguda suele tratarse con reposo y controles. La crónica se controla con antivirales indicados por un especialista. Existe una vacuna eficaz, incluida en el programa de vacunación.',
        ges: 'La hepatitis crónica por virus de la hepatitis B está cubierta por GES.',
        esp: 'Médico general; gastroenterólogo o hepatólogo.',
        alarma: 'Ictericia con confusión, somnolencia, vómitos persistentes o sangrados: urgencia.',
        src: ['mp_hepatitis', 'who_hep_b', 'minsal_ges']
      },
      {
        id: 'hepatitis_c', n: 'Hepatitis C', urg: 2, prev: 0.9, dur: ['m'],
        req: ['ctx_hepatitis_c'], reqF: 0.3,
        s: { ctx_hepatitis_c: 3, fatiga: 2, ictericia: 1, dolor_articular: 1, dolor_hipocondrio: 1 },
        que: 'Infección del hígado por un virus que se transmite sobre todo por la sangre (jeringas compartidas, transfusiones antiguas, tatuajes sin control). Suele no dar síntomas durante años mientras daña el hígado y puede llevar a cirrosis o cáncer de hígado.',
        trat: 'Hoy se cura en más del 95 % de los casos con antivirales orales por 8 a 12 semanas. Se recomienda hacerse el examen al menos una vez en la vida.',
        ges: 'El tratamiento de la hepatitis C está cubierto por GES.',
        esp: 'Médico general; gastroenterólogo o hepatólogo.',
        alarma: 'Ictericia, abdomen que crece, vómitos con sangre o confusión: urgencia.',
        src: ['mp_hepatitis', 'who_hep_c', 'minsal_ges']
      },
      {
        id: 'coledocolitiasis', n: 'Cálculo en el colédoco o colangitis', alt: 'Piedra en el conducto biliar', urg: 4, prev: 0.9, dur: ['h', 'd'],
        age: [[40, 200, 1.2]],
        s: { ictericia: 3, dolor_hipocondrio: 3, fiebre: 2, escalofrios: 2, coluria: 2, acolia: 1, nauseas: 1 },
        que: 'Un cálculo de la vesícula pasa al conducto biliar principal (colédoco) y lo tapa: dolor arriba a la derecha, ictericia, orina oscura y deposiciones claras. Si la bilis se infecta (colangitis) aparecen fiebre alta y escalofríos, lo que es grave.',
        trat: 'Requiere hospitalización: antibióticos si hay infección y extracción del cálculo por endoscopia (ERCP), y luego sacar la vesícula.',
        esp: 'Servicio de urgencia; gastroenterólogo y cirujano.',
        alarma: 'Fiebre con escalofríos e ictericia, confusión o presión baja: urgencia inmediata.',
        src: ['mp_colestasis', 'mp_calculos_biliares']
      },
      {
        id: 'colitis_c_difficile', n: 'Diarrea por antibióticos', alt: 'Colitis por Clostridioides difficile', urg: 3, prev: 0.95, dur: ['d', 's'],
        age: [[65, 200, 1.2]],
        req: ['ctx_antibioticos'], reqF: 0.3,
        s: { ctx_antibioticos: 3, diarrea: 3, dolor_abdominal: 2, fiebre: 1, diarrea_sangre: 1 },
        que: 'Diarrea que aparece durante o semanas después de tomar antibióticos. Las formas leves se deben al desequilibrio de las bacterias intestinales; las más intensas, a la bacteria Clostridioides difficile, que produce diarrea acuosa frecuente, dolor abdominal y fiebre, sobre todo en mayores o tras hospitalizaciones.',
        trat: 'Hidratación; si es por C. difficile, antibióticos específicos indicados por el médico. No usar antidiarreicos sin indicación. Lavado de manos con agua y jabón para evitar el contagio.',
        esp: 'Médico general; gastroenterólogo o infectólogo.',
        alarma: 'Diarrea con sangre, fiebre alta, abdomen hinchado y doloroso o signos de deshidratación: urgencia.',
        src: ['mp_colitis_seudomembranosa']
      },
      {
        id: 'diarrea_viajero', n: 'Diarrea del viajero', urg: 2, prev: 1.0, dur: ['h', 'd'],
        req: ['ctx_viaje_tropical'], reqF: 0.3,
        s: { ctx_viaje_tropical: 3, diarrea: 3, dolor_abdominal: 2, nauseas: 1, fiebre: 1, vomitos: 1 },
        que: 'Diarrea que aparece durante o poco después de un viaje, por consumir agua o alimentos contaminados con bacterias, virus o parásitos. Suele durar pocos días y rara vez es grave en adultos.',
        trat: 'Rehidratación con abundante líquido o sales de rehidratación oral y comidas livianas. A veces el médico indica antibióticos. Prevención: agua embotellada o hervida, evitar hielo, comida cruda y alimentos de la calle.',
        esp: 'Médico general.',
        alarma: 'Diarrea con sangre, fiebre alta, vómitos que impiden beber o signos de deshidratación, sobre todo en niños: consulta urgente.',
        src: ['mp_diarrea_viajero', 'mp_guia_viajeros']
      },
      {
        id: 'alergia_leche_vaca', n: 'Alergia a la proteína de la leche de vaca', alt: 'En lactantes', urg: 2, prev: 1.0, dur: ['d', 's', 'm'],
        ageRange: [0, 3],
        s: { sangre_heces_bebe: 3, vomitos: 1, eccema: 1, irritabilidad: 1, llanto_inconsolable: 1, poco_crecimiento: 1, ronchas: 1, diarrea: 1 },
        que: 'Reacción del sistema inmune a las proteínas de la leche de vaca, frecuente en lactantes que toman fórmula o cuya madre consume lácteos. Puede producir deposiciones con sangre o mucosidad, vómitos, eccema, cólicos y poco aumento de peso; a veces ronchas o reacciones rápidas.',
        trat: 'Eliminar la leche de vaca: fórmulas especiales hidrolizadas o, si amamanta, dieta sin lácteos de la madre, según indicación médica. La mayoría la supera antes de los 3 años.',
        esp: 'Pediatra; gastroenterólogo infantil o alergólogo.',
        alarma: 'Hinchazón de labios o lengua, dificultad para respirar, vómitos intensos o decaimiento: urgencia.',
        src: ['mp_alergia_alimentaria']
      },
      {
        id: 'alergia_alimentaria', n: 'Alergia alimentaria', urg: 2, prev: 1.0, dur: ['h', 'm'],
        s: { reaccion_repite_alimento: 3, ronchas: 2, ctx_alergeno: 2, picazon_piel: 1, vomitos: 1, dolor_abdominal: 1, hinchazon_labios: 1 },
        que: 'Reacción del sistema inmune a un alimento (maní, nueces, mariscos, pescado, huevo, leche, soya o trigo) que aparece minutos u horas después de comerlo: ronchas, picazón en la boca, hinchazón, vómitos o, en casos graves, anafilaxia. Es distinta de la intolerancia a la lactosa.',
        trat: 'Evitar el alimento (leer las etiquetas), antihistamínicos para reacciones leves y, si hubo reacciones graves, llevar adrenalina autoinyectable indicada por el médico. Estudio con alergólogo.',
        esp: 'Médico general; alergólogo.',
        alarma: 'Hinchazón de labios, lengua o garganta, dificultad para respirar, mareo o desmayo: llama al 131.',
        src: ['mp_alergia_alimentaria']
      },
      {
        id: 'reflujo_lactante', n: 'Reflujo del lactante', urg: 1, prev: 1.0, dur: ['d', 's', 'm'],
        ageRange: [0, 1],
        s: { regurgitacion: 3, vomitos: 1, irritabilidad: 1, poco_crecimiento: -1, fiebre: -1 },
        que: 'El contenido del estómago se devuelve hacia el esófago y la boca, con «chanchitos» o regurgitaciones después de mamar. Es normal en muchos bebés, no les impide subir de peso y suele desaparecer antes del año.',
        trat: 'Hacerlo eructar, mantenerlo erguido un rato después de comer, no sobrealimentarlo y acostarlo de espaldas. Rara vez se necesitan medicamentos.',
        esp: 'Pediatra.',
        alarma: 'Vómitos con fuerza (en proyectil), verdes o con sangre, bebé que no sube de peso, rechaza el alimento o tiene dificultad para respirar: consulta urgente.',
        src: ['mp_reflujo_bebes']
      },
      {
        id: 'prurito_anal', n: 'Picazón anal', alt: 'Prurito anal', urg: 1, prev: 1.0, dur: ['s', 'm'],
        age: [[0, 12, 0.5]],
        s: { picazon_anal: 3, sangre_roja_defecar: -1, ctx_convivientes: -1 },
        que: 'Picazón persistente alrededor del ano. Suele deberse a una higiene excesiva o insuficiente, humedad, irritación por jabones o papel perfumado, hemorroides, fisuras, hongos, parásitos (oxiuros) o algunos alimentos (café, picantes).',
        trat: 'Limpiar con agua tibia y secar suave, evitar jabones perfumados y rascarse, usar ropa interior de algodón y cremas protectoras. Tratar la causa si se encuentra.',
        esp: 'Médico general; dermatólogo o coloproctólogo si persiste.',
        alarma: 'Sangrado, bulto, cambios del hábito intestinal o picazón que no mejora en semanas: consulta.',
        src: ['mp_ano_t']
      },
      {
        id: 'fistula_anal', n: 'Fístula anal', urg: 2, prev: 0.95, dur: ['s', 'm'],
        s: { secrecion_anal: 3, dolor_anal: 1, bulto_anal: 1, picazon_anal: 1, ctx_colitis: 1 },
        que: 'Túnel anormal entre el interior del ano y la piel cercana, casi siempre después de un absceso perianal. Produce secreción de pus o líquido por un orificio cerca del ano, irritación y molestias que van y vienen.',
        trat: 'Generalmente requiere cirugía para cerrarla o drenarla; si se asocia a enfermedad de Crohn, tratamiento médico específico.',
        esp: 'Coloproctólogo o cirujano.',
        alarma: 'Dolor intenso, fiebre o hinchazón roja y caliente cerca del ano: urgencia (nuevo absceso).',
        src: ['mp_ano_t', 'mp_absceso_anorrectal']
      },
      {
        id: 'quiste_pilonidal', n: 'Quiste pilonidal', urg: 2, prev: 1.0, dur: ['d', 's', 'm'], sexF: 0.6,
        age: [[15, 35, 1.3]],
        s: { bulto_coxis: 3, fiebre: 1, bulto_pus: 1 },
        que: 'Inflamación de los folículos pilosos en el pliegue entre los glúteos, sobre el coxis, que forma un quiste o un orificio con pelos. Si se infecta produce un bulto doloroso con pus. Es más frecuente en hombres jóvenes con mucho vello o que pasan mucho tiempo sentados.',
        trat: 'Si no da molestias, buena higiene y depilación de la zona. Si se infecta, drenaje y antibióticos; si se repite, cirugía para extirparlo.',
        esp: 'Médico general; cirujano.',
        alarma: 'Bulto muy doloroso, rojo y caliente con fiebre: consulta pronto para drenarlo.',
        src: ['mp_pilonidal']
      },
      {
        id: 'incontinencia_fecal', n: 'Incontinencia fecal', urg: 2, prev: 0.95, dur: ['s', 'm'],
        ageRange: [15, 200], age: [[65, 200, 1.3]],
        s: { escape_deposiciones: 3, diarrea: 1, estrenimiento: 1, perdida_orina: 1 },
        que: 'Escape involuntario de deposiciones o gases. Es más frecuente en personas mayores y en mujeres después de partos difíciles, y se asocia a diarrea, estreñimiento con impactación, daño de los músculos del ano o enfermedades de los nervios.',
        trat: 'Tratar la diarrea o el estreñimiento, ajustar la fibra, ejercicios del piso pélvico y reeducación intestinal (biofeedback); a veces cirugía.',
        esp: 'Médico general; gastroenterólogo o coloproctólogo; kinesiólogo de piso pélvico.',
        alarma: 'Pérdida brusca del control de las deposiciones u orina con dolor de espalda o adormecimiento entre las piernas: urgencia.',
        src: ['mp_reeducacion_intestinal']
      },
      {
        id: 'gilbert', n: 'Síndrome de Gilbert', urg: 1, prev: 1.0, dur: ['d', 'm'],
        age: [[0, 1, 0.2], [12, 40, 1.2]],
        req: ['ctx_ayuno_estres'], reqF: 0.4,
        s: { ictericia: 3, ctx_ayuno_estres: 2, ctx_familia: 1, coluria: -2, acolia: -2, dolor_hipocondrio: -1, fiebre: -1, palidez: -1, bazo_grande: -1, poco_crecimiento: -1, picazon_piel: -1, vomitos: -1 },
        que: 'Condición hereditaria y benigna muy frecuente en que el hígado procesa más lento la bilirrubina. Produce un color amarillo leve de los ojos o la piel que aparece con ayuno, estrés, ejercicio intenso o infecciones. No daña el hígado.',
        trat: 'No requiere tratamiento. Conviene saberlo para no repetir estudios innecesarios y mantener comidas regulares.',
        esp: 'Médico general.',
        alarma: 'Ictericia con orina oscura, deposiciones claras, dolor abdominal o fiebre: consulta pronto (otra causa).',
        src: ['mp_gilbert']
      },
      {
        id: 'esofagitis', n: 'Esofagitis', alt: 'Inflamación del esófago', urg: 2, prev: 0.95, dur: ['d', 's'],
        s: { dolor_tragar: 3, ardor_pecho: 2, disfagia: 2, placas_boca: 1, regurgitacion: 1 },
        que: 'Inflamación del esófago por reflujo ácido, por pastillas que se quedan pegadas al tragarlas con poca agua (como algunos antibióticos o antiinflamatorios) o por infecciones (hongos o virus) en personas con defensas bajas. Produce dolor al tragar, acidez y dificultad para tragar.',
        trat: 'Medicamentos para la acidez, tomar las pastillas con abundante agua y sin acostarse enseguida, y tratar la infección si existe.',
        esp: 'Médico general; gastroenterólogo.',
        alarma: 'Vómito con sangre, imposibilidad de tragar líquidos o dolor de pecho intenso: urgencia.',
        src: ['mp_esofagitis']
      },
      {
        id: 'vejiga_hiperactiva', n: 'Vejiga hiperactiva', urg: 2, prev: 1.0, dur: ['m'],
        age: [[50, 200, 1.2]],
        s: { urgencia_orinar: 3, orinar_frecuente: 2, nicturia: 2, perdida_orina: 1, ardor_orinar: -2, orina_turbia: -1, fiebre: -1 },
        que: 'Ganas urgentes y repentinas de orinar, difíciles de aguantar, con necesidad de ir muchas veces al baño de día y de noche y, a veces, escapes de orina. Es más frecuente con la edad y no se debe a una infección.',
        trat: 'Entrenamiento de la vejiga (ir a horarios y aguantar de a poco), ejercicios del piso pélvico, reducir la cafeína y el alcohol y, si no basta, medicamentos.',
        esp: 'Médico general; urólogo o ginecólogo.',
        alarma: 'Ardor al orinar, fiebre, sangre en la orina o imposibilidad de orinar: consulta pronto.',
        src: ['mp_miccion_urgente']
      },
      {
        id: 'hidrocele', n: 'Hidrocele', alt: 'Líquido alrededor del testículo', urg: 2, prev: 1.0, dur: ['s', 'm'], sex: 'M',
        age: [[0, 1, 1.4]],
        s: { escroto_hinchado_indoloro: 3, dolor_testicular: -2, bulto_testiculo: -1 },
        que: 'Acumulación de líquido alrededor de un testículo que agranda el escroto de forma blanda e indolora. Es común en recién nacidos y suele desaparecer en los primeros meses; en adultos puede aparecer tras una inflamación o un golpe.',
        trat: 'En bebés, observar. En adultos, si es grande o molesta, cirugía. Siempre conviene una ecografía para descartar otras causas.',
        esp: 'Pediatra o médico general; urólogo.',
        alarma: 'Dolor testicular súbito, bulto duro en el testículo o hinchazón que aumenta con el esfuerzo y no se reduce: consulta urgente.',
        src: ['mp_hidrocele_img']
      },
      {
        id: 'espermatocele', n: 'Espermatocele', alt: 'Quiste del epidídimo', urg: 2, prev: 0.95, dur: ['m'], sex: 'M',
        s: { bulto_sobre_testiculo: 3, bulto_testiculo: -2, dolor_testicular: -2 },
        que: 'Quiste lleno de líquido en el epidídimo, el conducto que está encima y detrás del testículo. Se siente como un bultito blando, liso e indoloro separado del testículo. Es benigno.',
        trat: 'Generalmente no necesita tratamiento; si crece mucho o molesta, cirugía. Una ecografía confirma el diagnóstico.',
        esp: 'Médico general; urólogo.',
        alarma: 'Bulto duro dentro del propio testículo o dolor súbito: consulta urgente.',
        src: ['mp_espermatocele_img']
      },
      {
        id: 'balanitis', n: 'Balanitis', alt: 'Inflamación del glande', urg: 2, prev: 1.0, dur: ['d', 's'], sex: 'M',
        s: { glande_rojo: 3, picazon_genital: 2, ctx_diabetes: 1, secrecion_uretral: -1 },
        que: 'Inflamación del glande y a veces del prepucio, con enrojecimiento, hinchazón, picazón, ardor y mal olor. Suele deberse a hongos (candidiasis), bacterias, higiene insuficiente o irritantes; es más frecuente en hombres no circuncidados y con diabetes.',
        trat: 'Lavar con agua tibia y secar bien, evitar jabones irritantes y usar cremas antifúngicas o antibióticas según indicación médica. Controlar la diabetes.',
        esp: 'Médico general; urólogo o dermatólogo.',
        alarma: 'Imposibilidad de bajar o subir el prepucio, dificultad para orinar o úlceras: consulta pronto.',
        src: ['mp_balanitis']
      },
      {
        id: 'fimosis', n: 'Fimosis y parafimosis', urg: 3, prev: 1.0, dur: ['h', 'm'], sex: 'M',
        s: { prepucio_no_baja: 3, glande_rojo: 1, dolor_relaciones: 1 },
        que: 'En la fimosis, el prepucio es tan estrecho que no se puede bajar para descubrir el glande; es normal en niños pequeños y suele resolverse con los años. En la parafimosis, el prepucio queda atrapado detrás del glande y lo aprieta, con hinchazón y dolor: es una urgencia.',
        trat: 'Fimosis: higiene, cremas de corticoides o cirugía (circuncisión) si persiste o causa problemas. Parafimosis: el médico debe reducirla cuanto antes.',
        esp: 'Pediatra o médico general; urólogo.',
        alarma: 'Prepucio atrapado detrás del glande con hinchazón o dolor, o glande de color oscuro: urgencia inmediata.',
        src: ['mp_parafimosis']
      },
      {
        id: 'eyaculacion_precoz', n: 'Eyaculación precoz', urg: 1, prev: 1.0, dur: ['m'], sex: 'M',
        s: { eyacula_antes: 3, ansiedad: 1 },
        que: 'Eyaculación que ocurre antes de lo que la persona desea, casi siempre, causando malestar. Es la queja sexual más frecuente en los hombres y puede tener causas psicológicas, de pareja o físicas.',
        trat: 'Técnicas conductuales (parar y empezar, compresión), terapia sexual y de pareja y, a veces, medicamentos o anestésicos tópicos indicados por el médico.',
        esp: 'Médico general; urólogo o sexólogo.',
        alarma: 'Si se acompaña de dificultad de erección, dolor o tristeza persistente: consulta.',
        src: ['mp_eyaculacion_precoz']
      },
      {
        id: 'hipogonadismo', n: 'Testosterona baja', alt: 'Hipogonadismo masculino', urg: 2, prev: 0.95, dur: ['m'], sex: 'M',
        age: [[50, 200, 1.2]],
        s: { deseo_sexual_bajo: 3, disfuncion_erectil: 2, fatiga: 2, crecimiento_mamas_hombre: 1, tristeza: 1, testiculos_pequenos: 1 },
        que: 'Los testículos producen poca testosterona, por un problema propio o de la hipófisis, o con la edad y la obesidad. Produce menos deseo sexual, problemas de erección, cansancio, ánimo bajo, pérdida de masa muscular y a veces crecimiento de las mamas.',
        trat: 'Confirmar con exámenes de sangre en la mañana y buscar la causa; tratar el sobrepeso y otras enfermedades; reemplazo de testosterona cuando está indicado, con controles.',
        esp: 'Médico general; endocrinólogo o urólogo.',
        alarma: 'Dolor de cabeza intenso con problemas de la vista o secreción de leche por las mamas: consulta pronto.',
        src: ['mp_hipogonadismo']
      }
    ]
  });

  // ── Tanda 6 (noviembre 2026): salud sexual, ginecología, embarazo, lactancia y piel
  D.addPack({
    symptoms: [
      ['flujo_verdoso_espumoso', 'Flujo vaginal amarillo verdoso y espumoso', 'mujer', 1, ['tricomonas', 'flujo verde'], 'F'],
      ['verrugas_genitales_bultos', 'Verrugas o bultitos blandos en los genitales o el ano', 'urogenital', 1, ['condilomas', 'VPH', 'verrugas genitales']],
      ['picazon_pubis', 'Picazón intensa en el vello púbico, con piojitos o liendres visibles', 'urogenital', 1, ['ladillas', 'piojos del pubis']],
      ['testiculo_ausente', 'No se palpa un testículo en el escroto (en un niño)', 'urogenital', 1, ['criptorquidia', 'testículo no bajado'], 'M'],
      ['bulto_vulva', 'Bulto doloroso o hinchazón a un lado de la entrada de la vagina', 'mujer', 1, ['quiste de Bartolino', 'absceso en la vulva'], 'F'],
      ['sequedad_vaginal', 'Sequedad, ardor o irritación vaginal', 'mujer', 1, ['vagina seca', 'atrofia vaginal'], 'F'],
      ['bulto_vagina', 'Sensación de bulto o peso que sale por la vagina', 'mujer', 1, ['prolapso', 'útero caído'], 'F'],
      ['bulto_mama_movil', 'Bulto en la mama liso, firme e indoloro que se mueve al tocarlo', 'mujer', 1, ['fibroadenoma', 'pelotita en la mama'], 'F'],
      ['mamas_nodulares', 'Mamas con nódulos o «grumos» dolorosos que cambian con el ciclo', 'mujer', 1, ['mamas fibroquísticas', 'mastopatía'], 'F'],
      ['contracciones', 'Contracciones o endurecimiento de la guata repetidos (más de 4 por hora) en el embarazo', 'mujer', 2, ['contracciones', 'se pone dura la guata'], 'F'],
      ['perdida_liquido_vagina', 'Salida de líquido claro por la vagina en el embarazo (como si te orinaras sin control)', 'mujer', 3, ['rompí bolsa', 'rotura de membranas', 'se me rompió la fuente'], 'F'],
      ['mamas_duras_lactancia', 'Mamas muy llenas, duras, calientes y dolorosas en los primeros días de lactancia', 'mujer', 1, ['congestión mamaria', 'bajada de la leche'], 'F'],
      ['pezon_agrietado', 'Pezones agrietados o con heridas que duelen al amamantar', 'mujer', 1, ['grietas del pezón', 'pezón herido'], 'F'],
      ['espasmo_vaginal', 'La penetración es imposible o muy dolorosa por tensión involuntaria de la vagina', 'mujer', 1, ['vaginismo'], 'F'],
      ['sangrado_postmenopausia', 'Sangrado vaginal después de la menopausia', 'mujer', 2, ['sangrado en la menopausia'], 'F'],
      ['sin_regla_meses', 'No te llega la regla hace 3 meses o más (sin embarazo)', 'mujer', 1, ['amenorrea', 'se me cortó la regla'], 'F'],
      ['secrecion_pezon', 'Salida de líquido lechoso por los pezones sin estar embarazada ni amamantando', 'mujer', 1, ['galactorrea', 'sale leche del pecho']],
      ['dolor_mitad_ciclo', 'Dolor en un lado de la parte baja del abdomen a mitad del ciclo menstrual', 'mujer', 1, ['dolor de ovulación', 'Mittelschmerz'], 'F'],
      ['perlitas_piel', 'Bultitos pequeños, brillantes y color perla con un hoyito en el centro', 'piel', 1, ['molusco contagioso', 'verruguitas de agua']],
      ['placa_heraldo', 'Una mancha ovalada grande y luego muchas pequeñas en el tronco (en forma de árbol de Navidad)', 'piel', 1, ['pitiriasis rosada', 'placa heraldo']],
      ['ctx_psa_alto', 'Te dijeron que tienes el antígeno prostático (PSA) elevado', 'contexto', 0, ['PSA alto', 'antígeno prostático'], 'M'],
      ['ctx_glucosa_alta_embarazo', 'Te dijeron que tu glucosa salió alta en un examen del embarazo', 'contexto', 0, ['diabetes gestacional', 'azúcar alta en el embarazo'], 'F']
    ],
    sources: {
      mp_cancer_prostata: [MP, 'Cáncer de próstata', 'https://medlineplus.gov/spanish/ency/article/000380.htm'],
      mp_psa: [MP, 'Examen de sangre para antígeno prostático específico (PSA)', 'https://medlineplus.gov/spanish/ency/article/003346.htm'],
      mp_verrugas_genitales: [MP, 'Verrugas genitales', 'https://medlineplus.gov/spanish/ency/article/000886.htm'],
      mp_ladillas: [MP, 'Piojos del pubis (ladillas)', 'https://medlineplus.gov/spanish/ency/article/000841.htm'],
      mayo_criptorquidia: [MAYO, 'Testículo no descendido', 'https://www.mayoclinic.org/es/diseases-conditions/undescended-testicle/symptoms-causes/syc-20351995'],
      mp_bartolino: [MP, 'Absceso o quiste de Bartolino', 'https://medlineplus.gov/spanish/ency/article/001489.htm'],
      mayo_adenomiosis: [MAYO, 'Adenomiosis', 'https://www.mayoclinic.org/es/diseases-conditions/adenomyosis/symptoms-causes/syc-20369138'],
      mp_utero_t: [MP, 'Enfermedades del útero (incluye el prolapso uterino)', 'https://medlineplus.gov/spanish/uterinediseases.html'],
      mp_fibroadenoma: [MP, 'Fibroadenoma de la mama', 'https://medlineplus.gov/spanish/ency/article/007216.htm'],
      mp_tumor_mamario: [MP, 'Tumor mamario (bulto en la mama)', 'https://medlineplus.gov/spanish/ency/article/003155.htm'],
      mp_mamas_fibroquisticas: [MP, 'Mamas fibroquísticas', 'https://medlineplus.gov/spanish/ency/article/000912.htm'],
      mp_glucemia_embarazo: [MP, 'Pruebas de glucemia durante el embarazo', 'https://medlineplus.gov/spanish/ency/article/007562.htm'],
      mp_bebe_madre_diabetica: [MP, 'Bebé de madre diabética', 'https://medlineplus.gov/spanish/ency/article/001597.htm'],
      mp_parto_prematuro: [MP, 'Parto prematuro', 'https://medlineplus.gov/spanish/ency/patientinstructions/000486.htm'],
      mp_rpm: [MP, 'Ruptura prematura de membranas', 'https://medlineplus.gov/spanish/ency/patientinstructions/000512.htm'],
      mp_lactancia_problemas: [MP, 'Superación de problemas de la lactancia materna', 'https://medlineplus.gov/spanish/ency/article/002452.htm'],
      mayo_dispareunia: [MAYO, 'Relaciones sexuales dolorosas (dispareunia)', 'https://www.mayoclinic.org/es/diseases-conditions/painful-intercourse/symptoms-causes/syc-20375967'],
      mp_vaginismo: [MP, 'Vaginismo', 'https://medlineplus.gov/spanish/ency/article/001487.htm'],
      mp_cancer_endometrio: [MP, 'Cáncer endometrial', 'https://medlineplus.gov/spanish/ency/article/000910.htm'],
      mp_prolactina: [MP, 'Examen de sangre de prolactina (galactorrea y amenorrea)', 'https://medlineplus.gov/spanish/ency/article/003718.htm'],
      mp_endometritis: [MP, 'Endometritis', 'https://medlineplus.gov/spanish/ency/article/001484.htm'],
      mp_mittelschmerz: [MP, 'Mittelschmerz (dolor de ovulación)', 'https://medlineplus.gov/spanish/ency/article/001503.htm'],
      mp_molusco: [MP, 'Molusco contagioso', 'https://medlineplus.gov/spanish/ency/article/000826.htm'],
      mp_pitiriasis_rosada: [MP, 'Pitiriasis rosada', 'https://medlineplus.gov/spanish/ency/article/000871.htm']
    },
    conditions: [
      {
        id: 'cancer_prostata', n: 'Señales de cáncer de próstata', urg: 3, prev: 0.9, dur: ['m'], sex: 'M',
        age: [[0, 39, 0.1], [55, 200, 1.4]],
        req: ['ctx_psa_alto', 'dolor_huesos', 'sangre_orina'], reqF: 0.4,
        s: { ctx_psa_alto: 3, chorro_debil: 2, nicturia: 1, sangre_orina: 1, dolor_huesos: 1, ctx_familia: 1 },
        que: 'El cáncer más frecuente en hombres mayores. En etapas iniciales casi nunca da síntomas y se sospecha por un PSA elevado o un tacto rectal alterado; los síntomas urinarios suelen deberse al crecimiento benigno de la próstata. En etapas avanzadas puede causar dolor de huesos o sangre en la orina.',
        trat: 'Según la etapa y la edad: vigilancia activa, cirugía (prostatectomía), radioterapia u hormonoterapia. Conversar con el médico los beneficios y riesgos del examen de PSA desde los 50 años (o antes con antecedentes familiares).',
        ges: 'El cáncer de próstata en personas de 15 años y más está cubierto por GES.',
        esp: 'Médico general; urólogo.',
        alarma: 'Dolor de huesos persistente, baja de peso, debilidad de piernas o imposibilidad de orinar: consulta urgente.',
        src: ['mp_cancer_prostata', 'mp_psa', 'minsal_ges']
      },
      {
        id: 'tricomoniasis', n: 'Tricomoniasis', urg: 2, prev: 0.95, dur: ['d', 's'],
        s: { flujo_verdoso_espumoso: 3, flujo_mal_olor: 2, picazon_genital: 2, ctx_sexo: 2, ardor_orinar: 1, dolor_relaciones: 1, secrecion_uretral: 1 },
        que: 'Infección de transmisión sexual por un parásito (Trichomonas vaginalis). En mujeres produce flujo amarillo verdoso y espumoso con mal olor, picazón, ardor al orinar y dolor en las relaciones; en hombres suele no dar síntomas o causar una leve secreción.',
        trat: 'Antibióticos (metronidazol o tinidazol) indicados por un médico, para la persona y su pareja al mismo tiempo, y sin relaciones sexuales hasta terminar el tratamiento. Usar condón.',
        esp: 'Médico general, matrona o ginecólogo.',
        alarma: 'Fiebre, dolor abdominal o embarazo: consulta pronto.',
        src: ['mp_vulvovaginitis', 'mp_its_t']
      },
      {
        id: 'verrugas_genitales', n: 'Verrugas genitales', alt: 'Condilomas por virus papiloma humano (VPH)', urg: 2, prev: 1.0, dur: ['s', 'm'],
        s: { verrugas_genitales_bultos: 3, ctx_sexo: 2, picazon_genital: 1 },
        que: 'Bultitos blandos, del color de la piel o rosados, en los genitales, el ano o la ingle, causados por algunos tipos del virus papiloma humano (VPH) que se transmiten por contacto sexual. Otros tipos del VPH pueden causar cáncer de cuello uterino, por eso es importante el Papanicolaou.',
        trat: 'Cremas o soluciones indicadas por el médico, congelación (crioterapia), láser o cirugía; pueden volver a aparecer. La vacuna contra el VPH, incluida en el programa de vacunación escolar, las previene. Usar condón.',
        esp: 'Médico general, matrona, dermatólogo o ginecólogo.',
        alarma: 'Lesiones que sangran, crecen rápido o heridas que no sanan: consulta pronto.',
        src: ['mp_verrugas_genitales']
      },
      {
        id: 'ladillas', n: 'Ladillas', alt: 'Piojos del pubis', urg: 1, prev: 1.0, dur: ['d', 's'],
        s: { picazon_pubis: 3, ctx_sexo: 1, picazon_genital: 1, piojos: -1 },
        que: 'Infestación del vello púbico por un piojo diminuto que se transmite sobre todo por contacto sexual, y a veces por ropa o sábanas. Produce picazón intensa, peor de noche, y se pueden ver los piojos o las liendres pegadas al vello.',
        trat: 'Lociones o cremas con permetrina, repitiendo a los 7 a 10 días; lavar la ropa de cama y la ropa con agua caliente y tratar a la pareja al mismo tiempo. Conviene estudiar otras infecciones de transmisión sexual.',
        esp: 'Médico general o matrona.',
        alarma: 'Si aparecen en las pestañas o en niños: consulta.',
        src: ['mp_ladillas']
      },
      {
        id: 'criptorquidia', n: 'Testículo no descendido', alt: 'Criptorquidia', urg: 2, prev: 1.0, dur: ['m'], sex: 'M',
        ageRange: [0, 17], age: [[0, 1, 1.4]],
        s: { testiculo_ausente: 3, bulto_ingle: 1 },
        que: 'Uno o ambos testículos no bajaron al escroto antes del nacimiento. Es frecuente en bebés prematuros y muchas veces el testículo baja solo en los primeros meses. Si no baja, aumenta el riesgo de infertilidad, torsión y cáncer testicular.',
        trat: 'Si no ha bajado a los 6 meses, cirugía (orquidopexia) idealmente antes del año de vida. Controles por el pediatra.',
        esp: 'Pediatra; cirujano o urólogo infantil.',
        alarma: 'Dolor intenso en la ingle o el escroto, o bulto doloroso en la ingle: urgencia.',
        src: ['mayo_criptorquidia']
      },
      {
        id: 'bartolino', n: 'Quiste o absceso de Bartolino', urg: 2, prev: 1.0, dur: ['d', 's'], sex: 'F',
        s: { bulto_vulva: 3, dolor_relaciones: 1, fiebre: 1 },
        que: 'Las glándulas de Bartolino, a cada lado de la entrada de la vagina, se tapan y se llenan de líquido formando un quiste; si se infecta se forma un absceso, con un bulto muy doloroso, rojo e hinchado que dificulta caminar o sentarse.',
        trat: 'Baños de asiento con agua tibia varias veces al día; si hay absceso, drenaje por el médico y a veces antibióticos. Si se repite, un procedimiento para evitar que vuelva.',
        esp: 'Médico general, matrona o ginecólogo.',
        alarma: 'Fiebre alta, dolor intenso o bulto que crece rápido: consulta pronto. Un bulto en la vulva después de los 40 años debe evaluarse.',
        src: ['mp_bartolino']
      },
      {
        id: 'atrofia_vaginal', n: 'Atrofia vaginal', alt: 'Síndrome genitourinario de la menopausia', urg: 1, prev: 1.0, dur: ['m'], sex: 'F',
        age: [[0, 39, 0.3], [50, 200, 1.4]],
        s: { sequedad_vaginal: 3, dolor_relaciones: 2, picazon_genital: 1, orinar_frecuente: 1, bochornos: 1 },
        que: 'Después de la menopausia (o con la lactancia o algunos tratamientos), la falta de estrógenos adelgaza y seca la vagina. Produce sequedad, ardor, picazón, dolor en las relaciones sexuales y molestias urinarias o infecciones urinarias más frecuentes.',
        trat: 'Hidratantes y lubricantes vaginales; si no bastan, estrógenos vaginales en dosis bajas indicados por el médico. La actividad sexual regular ayuda a mantener la elasticidad.',
        esp: 'Médico general, matrona o ginecólogo.',
        alarma: 'Sangrado vaginal después de la menopausia: consulta pronto.',
        src: ['mp_flujo', 'mp_menopausia']
      },
      {
        id: 'sangrado_uterino_anormal', n: 'Sangrado uterino anormal', urg: 2, prev: 1.0, dur: ['s', 'm'], sex: 'F',
        ageRange: [11, 55],
        s: { reglas_abundantes: 2, sangrado_vaginal: 2, reglas_irregulares: 2, palidez: 1, fatiga: 1, atraso_menstrual: -1 },
        que: 'Reglas demasiado abundantes, largas, frecuentes o irregulares, o sangrado entre reglas. Se debe a desequilibrios hormonales (frecuentes en la adolescencia y cerca de la menopausia), miomas, pólipos, adenomiosis, trastornos de la coagulación o, con menos frecuencia, cáncer.',
        trat: 'Buscar la causa (ecografía, exámenes de sangre); tratamientos hormonales, ácido tranexámico, antiinflamatorios, hierro si hay anemia o procedimientos según la causa.',
        esp: 'Médico general, matrona o ginecólogo.',
        alarma: 'Sangrado muy abundante (empapa una toalla por hora), mareo o desmayo, o sangrado con posible embarazo: urgencia.',
        src: ['mp_sangrado_uterino']
      },
      {
        id: 'adenomiosis', n: 'Adenomiosis', urg: 2, prev: 0.9, dur: ['m'], sex: 'F',
        age: [[0, 29, 0.4], [35, 50, 1.3]],
        s: { reglas_abundantes: 3, dolor_menstrual: 3, dolor_pelvico: 2, dolor_relaciones: 1 },
        que: 'El tejido que recubre el útero crece dentro de su pared muscular. Muchas veces no da síntomas; cuando los da, produce reglas muy abundantes o prolongadas, dolor menstrual intenso, dolor pélvico crónico y dolor en las relaciones. Es más frecuente entre los 35 y 50 años.',
        trat: 'Antiinflamatorios y tratamientos hormonales (anticonceptivos, dispositivo con hormona); en casos graves, cirugía. Mejora después de la menopausia.',
        esp: 'Ginecólogo.',
        alarma: 'Sangrado muy abundante con mareo, palidez o desmayo: urgencia.',
        src: ['mayo_adenomiosis']
      },
      {
        id: 'prolapso_genital', n: 'Prolapso genital', alt: 'Útero o vejiga caída', urg: 2, prev: 1.0, dur: ['m'], sex: 'F',
        age: [[0, 39, 0.3], [50, 200, 1.3]],
        s: { bulto_vagina: 3, perdida_orina: 1, estrenimiento: 1, dolor_lumbar: 1 },
        que: 'El útero, la vejiga o el recto descienden hacia la vagina por debilidad de los músculos y ligamentos del piso pélvico, después de partos vaginales, con la menopausia, la obesidad o el esfuerzo crónico. Produce sensación de bulto o peso en la vagina y molestias urinarias o intestinales.',
        trat: 'Ejercicios del piso pélvico (kinesiología), un pesario vaginal o cirugía según el grado y las molestias.',
        esp: 'Ginecólogo; kinesiólogo de piso pélvico.',
        alarma: 'Imposibilidad de orinar, sangrado o úlcera en el tejido que sale: consulta pronto.',
        src: ['mp_utero_t']
      },
      {
        id: 'fibroadenoma', n: 'Fibroadenoma de mama', urg: 2, prev: 1.0, dur: ['s', 'm'], sex: 'F',
        age: [[15, 35, 1.4], [50, 200, 0.3]],
        s: { bulto_mama_movil: 3, bulto_mama: 2 },
        que: 'El tumor benigno de la mama más frecuente en mujeres jóvenes: un bulto liso, firme, indoloro y que se mueve con facilidad bajo la piel. No es cáncer, aunque todo bulto nuevo debe evaluarse.',
        trat: 'Se confirma con ecografía y, a veces, biopsia; muchos se controlan sin tratamiento y otros se extirpan si crecen o molestan.',
        esp: 'Médico general, matrona o ginecólogo; especialista en mamas.',
        alarma: 'Bulto duro, fijo o que crece rápido, cambios en la piel o el pezón, o secreción con sangre: consulta pronto.',
        src: ['mp_fibroadenoma', 'mp_tumor_mamario']
      },
      {
        id: 'mama_fibroquistica', n: 'Cambios fibroquísticos de la mama', urg: 1, prev: 1.0, dur: ['m'], sex: 'F',
        age: [[20, 50, 1.2]],
        s: { mamas_nodulares: 3, sensibilidad_mamas: 3, ctx_premenstrual: 1 },
        que: 'Cambios benignos y muy frecuentes de la mama: zonas con nódulos o grumos y dolor o sensibilidad que aumentan antes de la regla y mejoran después. No aumentan el riesgo de cáncer de mama.',
        trat: 'Sostén firme, compresas tibias o frías y analgésicos; reducir la cafeína puede ayudar a algunas mujeres. Controles y exámenes de imagen si aparece un bulto distinto.',
        esp: 'Médico general, matrona o ginecólogo.',
        alarma: 'Bulto nuevo que no cambia con el ciclo, cambios en la piel o el pezón, o secreción con sangre: consulta.',
        src: ['mp_mamas_fibroquisticas']
      },
      {
        id: 'diabetes_gestacional', n: 'Diabetes gestacional', urg: 2, prev: 1.0, dur: ['s', 'm'], sex: 'F', preg: true,
        ageRange: [12, 55],
        req: ['ctx_glucosa_alta_embarazo'], reqF: 0.4,
        s: { ctx_glucosa_alta_embarazo: 3, sed: 2, orinar_frecuente: 1, fatiga: 1, ctx_sobrepeso: 1 },
        que: 'Azúcar alta en la sangre que aparece o se detecta durante el embarazo, generalmente en el segundo o tercer trimestre. Casi nunca da síntomas y se detecta con los exámenes de glucosa del control prenatal. Sin control, el bebé puede crecer demasiado y aumentan las complicaciones del parto.',
        trat: 'Alimentación indicada por nutricionista, actividad física, control de la glucosa y, si no basta, insulina u otros medicamentos. Suele desaparecer tras el parto, pero aumenta el riesgo de diabetes tipo 2 después.',
        esp: 'Matrona; médico o ginecólogo obstetra; nutricionista.',
        alarma: 'Mucha sed y orina abundante con decaimiento, o el bebé se mueve menos: consulta urgente.',
        src: ['mp_glucemia_embarazo', 'mp_bebe_madre_diabetica']
      },
      {
        id: 'parto_prematuro', n: 'Amenaza de parto prematuro', urg: 4, prev: 0.95, dur: ['h', 'd'], sex: 'F', preg: true,
        ageRange: [12, 55],
        req: ['ctx_embarazo20'], reqF: 0.4,
        s: { contracciones: 3, ctx_embarazo20: 2, dolor_lumbar: 1, sangrado_vaginal: 1, flujo_vaginal: 1, dolor_pelvico: 1 },
        que: 'Contracciones regulares, presión en la pelvis, dolor lumbar, aumento del flujo o sangrado antes de las 37 semanas de embarazo. Puede llevar a un parto prematuro, por eso requiere evaluación inmediata.',
        trat: 'Evaluación en la maternidad: según el caso, medicamentos que frenan las contracciones, corticoides para madurar los pulmones del bebé y otros tratamientos.',
        ges: 'La prevención del parto prematuro está cubierta por GES.',
        esp: 'Urgencia de la maternidad; obstetra.',
        alarma: 'Contracciones regulares, sangrado o salida de líquido antes de las 37 semanas: acude de inmediato a la maternidad.',
        src: ['mp_parto_prematuro', 'minsal_ges']
      },
      {
        id: 'rotura_membranas', n: 'Rotura prematura de membranas', alt: 'Romper la bolsa antes de tiempo', urg: 4, prev: 0.95, dur: ['h'], sex: 'F', preg: true,
        ageRange: [12, 55],
        s: { perdida_liquido_vagina: 3, ctx_embarazo20: 2, contracciones: 1, fiebre: 1 },
        que: 'La bolsa de las aguas se rompe antes de que empiece el trabajo de parto, a veces antes de las 37 semanas. Se nota como salida de líquido claro por la vagina, en chorro o goteo continuo. Aumenta el riesgo de infección para la madre y el bebé.',
        trat: 'Acudir a la maternidad para confirmar y decidir el manejo: hospitalización, antibióticos y, según las semanas, inducir el parto o esperar con corticoides.',
        esp: 'Urgencia de la maternidad; obstetra.',
        alarma: 'Toda salida de líquido por la vagina en el embarazo requiere evaluación inmediata, sobre todo con fiebre, líquido verde o el bebé se mueve menos.',
        src: ['mp_rpm']
      },
      {
        id: 'congestion_mamaria', n: 'Congestión mamaria', alt: 'Ingurgitación en la lactancia', urg: 1, prev: 1.0, dur: ['d'], sex: 'F',
        s: { mamas_duras_lactancia: 3, ctx_lactancia: 2, febricula: 1, mama_roja: -1 },
        que: 'En los primeros días después del parto, cuando aumenta la producción de leche, las mamas se ponen muy llenas, duras, calientes y dolorosas, y al bebé le cuesta agarrarse. Es frecuente y pasajera.',
        trat: 'Amamantar seguido y a libre demanda, extraer un poco de leche antes para ablandar la aréola, compresas tibias antes y frías después de mamar, y apoyo de una matrona o consultora de lactancia.',
        esp: 'Matrona; consultora de lactancia.',
        alarma: 'Zona roja, caliente y dolorosa en una mama con fiebre o malestar: consulta pronto (posible mastitis).',
        src: ['mp_lactancia_problemas']
      },
      {
        id: 'grietas_pezon', n: 'Grietas en el pezón', urg: 1, prev: 1.0, dur: ['d', 's'], sex: 'F',
        s: { pezon_agrietado: 3, ctx_lactancia: 2 },
        que: 'Heridas o fisuras en los pezones durante la lactancia, casi siempre porque el bebé no se agarra bien al pecho. Producen dolor intenso al amamantar y pueden sangrar.',
        trat: 'Corregir el acople con ayuda de una matrona o consultora de lactancia, aplicar unas gotas de la propia leche y dejar secar al aire; a veces cremas de lanolina. Revisar si el bebé tiene frenillo corto.',
        esp: 'Matrona; consultora de lactancia; pediatra.',
        alarma: 'Fiebre, mama roja y dolorosa o pus: consulta pronto.',
        src: ['mp_lactancia_problemas']
      },
      {
        id: 'dispareunia', n: 'Dolor en las relaciones sexuales', alt: 'Dispareunia y vaginismo', urg: 2, prev: 1.0, dur: ['s', 'm'], sexM: 0.3,
        s: { dolor_relaciones: 3, espasmo_vaginal: 2, sequedad_vaginal: 1, ansiedad: 1 },
        que: 'Dolor genital antes, durante o después de las relaciones sexuales. Puede deberse a falta de lubricación (menopausia, lactancia, medicamentos), infecciones, endometriosis, cicatrices o a vaginismo: contracción involuntaria de los músculos de la vagina que dificulta la penetración, a menudo relacionada con ansiedad o experiencias previas.',
        trat: 'Tratar la causa; lubricantes, kinesiología de piso pélvico, dilatadores progresivos y terapia sexual o psicológica. Conversarlo con el médico sin vergüenza ayuda mucho.',
        esp: 'Ginecólogo o matrona; kinesiólogo de piso pélvico; psicólogo o sexólogo.',
        alarma: 'Dolor con fiebre, flujo con mal olor o sangrado después de las relaciones: consulta pronto.',
        src: ['mayo_dispareunia', 'mp_vaginismo']
      },
      {
        id: 'cancer_endometrio', n: 'Señales de cáncer de endometrio', alt: 'Cáncer de útero', urg: 3, prev: 0.9, dur: ['s', 'm'], sex: 'F',
        age: [[0, 39, 0.2], [50, 200, 1.4]],
        s: { sangrado_postmenopausia: 3, sangrado_vaginal: 2, sangrado_postcoital: 1, dolor_pelvico: 1, ctx_sobrepeso: 1, ctx_diabetes: 1 },
        que: 'El cáncer más frecuente del útero, sobre todo después de la menopausia. Su señal principal es el sangrado vaginal después de la menopausia, o sangrados entre reglas cerca de ella. Es más frecuente con obesidad, diabetes y uso de estrógenos sin progesterona. Detectado a tiempo, suele curarse.',
        trat: 'Ecografía y biopsia del endometrio; el tratamiento habitual es la cirugía (histerectomía), a veces con radioterapia u otros tratamientos.',
        esp: 'Ginecólogo.',
        alarma: 'Todo sangrado después de la menopausia debe evaluarse pronto.',
        src: ['mp_cancer_endometrio']
      },
      {
        id: 'amenorrea', n: 'Amenorrea', alt: 'Ausencia de regla', urg: 2, prev: 1.0, dur: ['m'], sex: 'F',
        ageRange: [11, 55],
        s: { sin_regla_meses: 3, perdida_peso: 1, ctx_estres: 1, conducta_alimentaria: 1, vello_excesivo: 1, secrecion_pezon: 1 },
        que: 'Falta de la regla por 3 meses o más en una mujer que antes menstruaba (o ausencia de la primera regla a los 15 años). La causa más común es el embarazo; otras son el estrés, la baja de peso o el ejercicio intenso, el síndrome de ovario poliquístico, problemas de tiroides o de prolactina y la menopausia precoz.',
        trat: 'Descartar embarazo y buscar la causa con exámenes; tratarla (alimentación, peso, tiroides, prolactina) y, a veces, tratamiento hormonal para proteger los huesos.',
        esp: 'Médico general, matrona o ginecólogo; endocrinólogo.',
        alarma: 'Dolor abdominal intenso o sangrado con posible embarazo: urgencia.',
        src: ['mp_sangrado_uterino', 'mp_prolactina']
      },
      {
        id: 'galactorrea', n: 'Galactorrea', alt: 'Secreción de leche fuera de la lactancia', urg: 2, prev: 0.95, dur: ['s', 'm'],
        s: { secrecion_pezon: 3, sin_regla_meses: 1, reglas_irregulares: 1, dolor_cabeza: 1, vision_borrosa: 1, vision_lateral: -1 },
        que: 'Salida de líquido lechoso por uno o ambos pezones sin estar embarazada ni amamantando. Suele deberse a la prolactina alta por medicamentos (algunos para el ánimo, las náuseas o la presión), hipotiroidismo o un tumor benigno de la hipófisis; también puede aparecer en hombres.',
        trat: 'Medir la prolactina y la tiroides, revisar los medicamentos y, si hay un tumor de la hipófisis, medicamentos que la reducen.',
        esp: 'Médico general o ginecólogo; endocrinólogo.',
        alarma: 'Secreción con sangre o de un solo pezón con bulto, o dolor de cabeza con problemas de la vista: consulta pronto.',
        src: ['mp_prolactina']
      },
      {
        id: 'endometritis_posparto', n: 'Endometritis posparto', alt: 'Infección del útero después del parto', urg: 4, prev: 0.95, dur: ['d'], sex: 'F',
        req: ['ctx_posparto'], reqF: 0.3,
        s: { ctx_posparto: 2, fiebre: 3, dolor_pelvico: 2, flujo_mal_olor: 2, sangrado_vaginal: 1 },
        que: 'Infección del revestimiento del útero en los días o semanas después de un parto o un aborto, más frecuente tras una cesárea o un trabajo de parto prolongado. Produce fiebre, dolor en la parte baja del abdomen y flujo con mal olor.',
        trat: 'Antibióticos indicados por un médico, a veces en el hospital por vena.',
        esp: 'Urgencia de la maternidad; ginecólogo obstetra.',
        alarma: 'Fiebre después del parto, especialmente con escalofríos, mareo o sangrado abundante: urgencia.',
        src: ['mp_endometritis']
      },
      {
        id: 'mittelschmerz', n: 'Dolor de ovulación', alt: 'Mittelschmerz', urg: 1, prev: 1.0, dur: ['h', 'd'], sex: 'F',
        ageRange: [11, 55],
        s: { dolor_mitad_ciclo: 3, dolor_pelvico: 1, fiebre: -1, atraso_menstrual: -2 },
        que: 'Dolor en un lado de la parte baja del abdomen a mitad del ciclo menstrual, cuando el ovario libera el óvulo. Dura de minutos a uno o dos días y puede acompañarse de un poco de flujo o manchado. Es frecuente y no es dañino.',
        trat: 'Calor local y analgésicos; si molesta mucho cada mes, los anticonceptivos hormonales lo evitan.',
        esp: 'Médico general o ginecólogo si es intenso.',
        alarma: 'Dolor intenso que no cede, con fiebre, vómitos, mareo o atraso menstrual: urgencia (torsión de ovario, apendicitis o embarazo ectópico).',
        src: ['mp_mittelschmerz']
      },
      {
        id: 'molusco', n: 'Molusco contagioso', urg: 1, prev: 1.0, dur: ['s', 'm'],
        age: [[1, 10, 1.4]],
        s: { perlitas_piel: 3, picazon_piel: 1 },
        que: 'Infección viral de la piel muy frecuente en niños: bultitos pequeños, firmes, brillantes y color perla con un hoyito en el centro. Se contagia por contacto directo o toallas y puede durar meses. En adultos puede transmitirse por vía sexual.',
        trat: 'Suele desaparecer solo en meses o hasta un par de años. Si molestan o se extienden, el médico puede retirarlos o aplicar cremas. Evitar rascarse y compartir toallas.',
        esp: 'Pediatra o médico general; dermatólogo.',
        alarma: 'Lesiones muy numerosas o grandes en un adulto o cerca del ojo: consulta.',
        src: ['mp_molusco']
      },
      {
        id: 'pitiriasis_rosada', n: 'Pitiriasis rosada', urg: 1, prev: 1.0, dur: ['s'],
        age: [[10, 35, 1.2]],
        s: { placa_heraldo: 3, picazon_piel: 1, erupcion: 1, fiebre: -1 },
        que: 'Erupción frecuente en adolescentes y adultos jóvenes, probablemente por un virus. Empieza con una mancha ovalada rosada y escamosa (placa heraldo) y días después aparecen muchas manchas más pequeñas en el tronco, en forma de árbol de Navidad. Puede picar.',
        trat: 'Desaparece sola en 4 a 8 semanas (a veces hasta 12). Cremas hidratantes, antihistamínicos o corticoides suaves para la picazón y algo de sol ayudan.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Fiebre, lesiones en palmas y plantas, o erupción en el embarazo: consulta (descartar otras causas).',
        src: ['mp_pitiriasis_rosada']
      }
    ]
  });

  // ── Tanda 7 (noviembre 2026): piel, pelo, uñas, bultos, cicatrices y picaduras
  D.addPack({
    symptoms: [
      ['manchas_claras_tronco', 'Manchas más claras, rosadas o café, con escamas finas, en el pecho, la espalda o los hombros (se notan más después del sol)', 'piel', 1, ['tiña versicolor', 'manchas del sol', 'hongos en la piel']],
      ['manchas_blancas_piel', 'Manchas blancas como la leche, sin escamas, que crecen de a poco (manos, cara, alrededor de la boca o de los genitales)', 'piel', 1, ['vitíligo', 'piel despigmentada']],
      ['manchas_oscuras_cara', 'Manchas café o grisáceas, parejas a ambos lados, en mejillas, frente, nariz o sobre el labio', 'piel', 1, ['melasma', 'paño', 'manchas del embarazo']],
      ['calva_redonda', 'Zonas redondas sin pelo, de piel lisa, que aparecen de repente (cuero cabelludo, barba o cejas)', 'piel', 1, ['alopecia areata', 'pelada']],
      ['entradas_coronilla', 'El pelo se va adelgazando de a poco: entradas y coronilla en hombres, o la raya del centro más ancha en mujeres', 'piel', 1, ['calvicie', 'alopecia androgénica']],
      ['caida_pelo_abundante', 'Se cae mucho pelo de todo el cuero cabelludo, semanas o meses después de una enfermedad, un parto, una dieta o un estrés fuerte', 'piel', 1, ['efluvio telógeno', 'se me cae el pelo a mechones']],
      ['manchas_pegadas', 'Manchas o placas café a negras, de aspecto ceroso, como «pegadas» sobre la piel', 'piel', 1, ['queratosis seborreica', 'verrugas de la edad']],
      ['placa_aspera_sol', 'Placa pequeña, áspera y escamosa, como lija, en piel expuesta al sol (cara, orejas, calva, dorso de las manos)', 'piel', 1, ['queratosis actínica', 'lesión por sol']],
      ['bulto_perlado', 'Bultito brillante o perlado, con vasitos finos, que sangra fácil y forma costra (cara, cuello, orejas)', 'piel', 2, ['carcinoma basocelular', 'cáncer de piel']],
      ['bulto_escamoso_crece', 'Bulto rojo y firme o placa con escamas y costra que crece en semanas, en piel expuesta al sol o en el labio inferior', 'piel', 2, ['carcinoma espinocelular', 'cáncer de piel']],
      ['herida_no_sana_piel', 'Herida o costra en la piel que no sana en 4 semanas o vuelve a abrirse', 'piel', 2, ['herida que no cicatriza']],
      ['bulto_blando_movil', 'Bulto blando, gomoso e indoloro bajo la piel, que se mueve al presionarlo y crece muy lento', 'piel', 1, ['lipoma', 'bolita de grasa']],
      ['bulto_piel_punto', 'Bulto redondo bajo la piel con un puntito oscuro al centro; a veces sale un material espeso con mal olor', 'piel', 1, ['quiste sebáceo', 'quiste epidérmico']],
      ['cicatriz_gruesa', 'Cicatriz gruesa, elevada y brillante que crece más allá de la herida original y pica', 'piel', 1, ['queloide', 'cicatriz hipertrófica']],
      ['sudor_excesivo', 'Sudas demasiado en manos, pies, axilas o cara, sin calor ni ejercicio, hasta mojar la ropa o gotear', 'piel', 1, ['hiperhidrosis', 'manos sudorosas']],
      ['pliegue_rojo', 'Piel roja, húmeda y con ardor en los pliegues (bajo las mamas, en las ingles o entre los rollitos de la guata)', 'piel', 1, ['intertrigo', 'roce en los pliegues', 'paspadura']],
      ['papulas_violaceas', 'Bultitos planos de color violáceo que pican mucho (muñecas, tobillos), a veces con líneas blancas en la boca', 'piel', 1, ['liquen plano']],
      ['bultos_axilas_ingle', 'Bultos dolorosos que se repiten en axilas, ingles o bajo las mamas, supuran y dejan cicatrices', 'piel', 2, ['hidradenitis supurativa', 'golondrinos']],
      ['granitos_pelos', 'Granitos rojos o con pus alrededor de los pelos (barba, piernas, glúteos), que pican o arden', 'piel', 1, ['foliculitis', 'pelos encarnados']],
      ['callo', 'Piel dura y engrosada en zonas de roce o presión (planta del pie, dedos o manos)', 'piel', 1, ['callo', 'callosidad', 'ojo de pescado']],
      ['ctx_picadura_abeja', 'Te picó una abeja, avispa o chaqueta amarilla', 'contexto', 0, ['abeja', 'avispa', 'chaqueta amarilla']],
      ['hinchazon_picadura', 'Hinchazón, dolor y enrojecimiento alrededor de una picadura', 'piel', 1, ['picadura hinchada']],
      ['ronchas_picaduras', 'Ronchitas rojas que pican mucho, en grupos o en línea, en zonas descubiertas o donde aprieta la ropa', 'piel', 1, ['picaduras de zancudo', 'picaduras de pulga', 'chinches']],
      ['ampollitas_dedos', 'Ampollitas pequeñas y profundas que pican mucho en los costados de los dedos, las palmas o las plantas', 'piel', 1, ['eccema dishidrótico', 'ponfólix']],
      ['dedo_unia_hinchado', 'Borde de una uña de la mano rojo, hinchado y doloroso, a veces con pus', 'piel', 1, ['panadizo', 'paroniquia', 'uñero']],
      ['dedos_rojos_frio', 'Zonas rojas o moradas, hinchadas, que pican o arden en los dedos de manos o pies, horas después de estar en el frío', 'piel', 1, ['sabañones']],
      ['herida_presion', 'Zona roja que no se aclara al presionarla, o herida, sobre huesos que apoyan (sacro, talones, caderas) en alguien que pasa mucho tiempo en cama o en silla', 'piel', 2, ['escara', 'úlcera por presión', 'llaga por estar en cama']]
    ],
    sources: {
      mp_tina_versicolor: [MP, 'Tiña versicolor', 'https://medlineplus.gov/spanish/ency/article/001465.htm'],
      mp_vitiligo: [MP, 'Vitiligo', 'https://medlineplus.gov/spanish/ency/article/000831.htm'],
      mayo_vitiligo: [MAYO, 'Vitiligo', 'https://www.mayoclinic.org/es/diseases-conditions/vitiligo/symptoms-causes/syc-20355912'],
      mp_manchas_piel: [MP, 'Manchas en la piel (incluye melasma y vitiligo)', 'https://medlineplus.gov/spanish/ency/article/003224.htm'],
      mayo_melasma: [MAYO, 'Preguntas y respuestas: tratar el melasma', 'https://newsnetwork.mayoclinic.org/es/2020/03/09/preguntas-y-respuestas-tratar-el-melasma/'],
      mp_alopecia_areata: [MP, 'Alopecia areata', 'https://medlineplus.gov/spanish/ency/article/001450.htm'],
      mp_perdida_cabello: [MP, 'Pérdida de cabello', 'https://medlineplus.gov/spanish/ency/article/003246.htm'],
      mp_queratosis_seborreica: [MP, 'Queratosis seborreica', 'https://medlineplus.gov/spanish/ency/article/000884.htm'],
      mp_queratosis_actinica: [MP, 'Queratosis actínica', 'https://medlineplus.gov/spanish/ency/article/000827.htm'],
      mp_basocelular: [MP, 'Carcinoma de células basales', 'https://medlineplus.gov/spanish/ency/article/000824.htm'],
      mp_escamocelular: [MP, 'Cáncer de piel escamocelular', 'https://medlineplus.gov/spanish/ency/article/000829.htm'],
      mayo_lipoma: [MAYO, 'Lipoma', 'https://www.mayoclinic.org/es/diseases-conditions/lipoma/symptoms-causes/syc-20374470'],
      mp_quiste_epidermoide: [MP, 'Quiste epidermoide', 'https://medlineplus.gov/spanish/ency/article/000842.htm'],
      mayo_quiste_epidermoide: [MAYO, 'Quistes epidermoides', 'https://www.mayoclinic.org/es/diseases-conditions/epidermoid-cysts/symptoms-causes/syc-20352701'],
      mayo_queloide: [MAYO, 'Cicatriz queloide', 'https://www.mayoclinic.org/es/diseases-conditions/keloid-scar/symptoms-causes/syc-20520901'],
      mp_hiperhidrosis: [MP, 'Hiperhidrosis', 'https://medlineplus.gov/spanish/ency/article/007259.htm'],
      mp_intertrigo: [MP, 'Intertrigo', 'https://medlineplus.gov/spanish/ency/article/003223.htm'],
      mp_liquen_plano: [MP, 'Liquen plano', 'https://medlineplus.gov/spanish/ency/article/000867.htm'],
      mp_hidradenitis_t: [MP, 'Hidradenitis supurativa', 'https://medlineplus.gov/spanish/hidradenitissuppurativa.html'],
      mayo_foliculitis: [MAYO, 'Foliculitis', 'https://www.mayoclinic.org/es/diseases-conditions/folliculitis/symptoms-causes/syc-20361634'],
      mp_callos: [MP, 'Callos y callosidades', 'https://medlineplus.gov/spanish/ency/article/001232.htm'],
      mp_picaduras: [MP, 'Mordeduras y picaduras de insectos', 'https://medlineplus.gov/spanish/ency/article/000033.htm'],
      mp_pulgas: [MP, 'Pulgas', 'https://medlineplus.gov/spanish/ency/article/001329.htm'],
      mp_ponfolix: [MP, 'Eccema ponfólix (dishidrótico)', 'https://medlineplus.gov/spanish/ency/article/000832.htm'],
      mp_paroniquia: [MP, 'Paroniquia', 'https://medlineplus.gov/spanish/ency/article/001444.htm'],
      mayo_sabanones: [MAYO, 'Sabañones', 'https://www.mayoclinic.org/es/diseases-conditions/chilblains/symptoms-causes/syc-20351097'],
      mp_ulceras_presion_cuidado: [MP, 'Cómo cuidar las úlceras de decúbito', 'https://medlineplus.gov/spanish/ency/patientinstructions/000740.htm'],
      mp_prevenir_presion: [MP, 'Prevenir las lesiones por presión', 'https://medlineplus.gov/spanish/ency/patientinstructions/000147.htm']
    },
    conditions: [
      {
        id: 'pitiriasis_versicolor', n: 'Pitiriasis versicolor', alt: 'Tiña versicolor', urg: 1, prev: 1.0, dur: ['s', 'm'],
        age: [[0, 11, 0.4], [12, 40, 1.2]],
        s: { manchas_claras_tronco: 3, picazon_piel: 1, ctx_calor: 1 },
        que: 'Infección superficial y muy frecuente de la piel por un hongo (Malassezia) que vive normalmente en ella. Produce manchas bien delimitadas, más claras, rosadas o café, con escamas finas, en el pecho, la espalda y los hombros, que se notan más después de tomar sol. No se contagia y es más frecuente con calor, humedad y sudor.',
        trat: 'Champús, cremas o lociones antifúngicas y, si es extensa, antifúngicos en comprimidos indicados por un médico. El color de la piel puede tardar meses en emparejarse y suele volver, por lo que a veces se repite el tratamiento.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Manchas que no mejoran con el tratamiento o pierden la sensibilidad: consulta.',
        src: ['mp_tina_versicolor']
      },
      {
        id: 'vitiligo', n: 'Vitíligo', urg: 2, prev: 0.95, dur: ['s', 'm'],
        s: { manchas_blancas_piel: 3, ctx_autoinmune: 1, ctx_familia: 1, manchas_blancas_hoja: -1, manchas_claras_tronco: -1 },
        que: 'Las células que dan color a la piel dejan de funcionar y aparecen manchas blancas, sin escamas, que suelen empezar en las manos, la cara o alrededor de la boca y los genitales, y pueden agrandarse con el tiempo. El pelo de esas zonas puede ponerse blanco. Se relaciona con el sistema inmune y a veces con otras enfermedades autoinmunes, como las de tiroides. No es contagioso.',
        trat: 'Cremas con corticoides u otros medicamentos, fototerapia con luz ultravioleta y protección solar de las manchas. Puede afectar la autoestima: el apoyo psicológico también ayuda.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Cansancio, cambios de peso u otros síntomas de tiroides: consulta.',
        src: ['mp_vitiligo', 'mayo_vitiligo']
      },
      {
        id: 'melasma', n: 'Melasma', alt: 'Paño o manchas del embarazo', urg: 1, prev: 1.0, dur: ['m'], sexF: 1.5, sexM: 0.4,
        age: [[0, 14, 0.2], [20, 50, 1.3]],
        s: { manchas_oscuras_cara: 3, ctx_calor: 1, lunar_cambia: -1 },
        que: 'Manchas café o grisáceas en la cara, parejas a ambos lados, sobre todo en mejillas, frente, nariz y labio superior. Es mucho más frecuente en mujeres y se desencadena con el sol y los cambios hormonales del embarazo o los anticonceptivos. No es dañino, pero suele volver.',
        trat: 'Protector solar diario de amplio espectro (y sombrero), cremas despigmentantes indicadas por un dermatólogo y, a veces, peelings u otros procedimientos. Puede aclarar solo después del embarazo.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Una mancha que cambia de forma, color o tamaño, o que sangra: consulta pronto.',
        src: ['mp_manchas_piel', 'mayo_melasma']
      },
      {
        id: 'alopecia_areata', n: 'Alopecia areata', alt: 'Pelada', urg: 2, prev: 0.95, dur: ['s', 'm'],
        s: { calva_redonda: 3, caida_pelo: 1, ctx_autoinmune: 1, ctx_estres: 1 },
        que: 'Enfermedad autoinmune en que el sistema de defensas ataca la raíz del pelo. Produce zonas redondas sin pelo, de piel lisa y sana, que aparecen en poco tiempo en el cuero cabelludo, la barba o las cejas. Muchas veces el pelo vuelve a crecer solo en meses, aunque puede repetirse.',
        trat: 'Inyecciones o cremas con corticoides y otros medicamentos indicados por un dermatólogo; en casos extensos existen tratamientos orales nuevos. El apoyo emocional es importante.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Pérdida rápida de todo el pelo, o zonas con piel roja, escamas o pus (puede ser una tiña): consulta.',
        src: ['mp_alopecia_areata']
      },
      {
        id: 'calvicie_comun', n: 'Calvicie común', alt: 'Alopecia androgénica', urg: 1, prev: 1.0, dur: ['m'], sexM: 1.3,
        age: [[0, 14, 0.2], [20, 200, 1.2]],
        s: { entradas_coronilla: 3, caida_pelo: 1, ctx_familia: 1 },
        que: 'La causa más frecuente de pérdida de pelo, hereditaria y relacionada con las hormonas. En hombres produce entradas y pérdida en la coronilla; en mujeres, adelgazamiento difuso con la raya del centro más ancha. Avanza lentamente con los años y no es una enfermedad.',
        trat: 'Si molesta, minoxidil en loción y, en hombres, medicamentos como la finasterida indicados por un médico; también trasplante capilar. Los resultados aparecen tras meses y se pierden al suspender.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'En mujeres, caída de pelo con reglas irregulares, acné o vello en la cara: consulta (posible causa hormonal).',
        src: ['mp_perdida_cabello']
      },
      {
        id: 'efluvio_telogeno', n: 'Caída del pelo por estrés', alt: 'Efluvio telógeno', urg: 1, prev: 1.0, dur: ['s', 'm'],
        s: { caida_pelo_abundante: 3, caida_pelo: 2, ctx_estres: 1, ctx_posparto: 1, ctx_infeccion_reciente: 1, perdida_peso: 1, calva_redonda: -1 },
        que: 'Caída abundante y pareja de pelo de todo el cuero cabelludo que aparece 2 a 3 meses después de un evento que «estresa» al cuerpo: fiebre alta o una infección (como el COVID), un parto, una cirugía, una dieta estricta, la falta de hierro o un estrés emocional fuerte. No deja zonas calvas.',
        trat: 'Suele recuperarse sola en 6 a 12 meses al pasar la causa. Conviene revisar el hierro, la tiroides y la alimentación con un médico si dura más o se repite.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Caída que no se detiene después de 6 meses, o con cansancio, frío o palidez: consulta.',
        src: ['mp_perdida_cabello']
      },
      {
        id: 'queratosis_seborreica', n: 'Queratosis seborreica', urg: 1, prev: 1.0, dur: ['m'],
        age: [[0, 30, 0.2], [40, 200, 1.3]],
        s: { manchas_pegadas: 3, picazon_piel: 1, lunar_cambia: -1 },
        que: 'Crecimientos benignos y muy frecuentes de la piel desde los 40 años. Son manchas o placas café a negras, redondas u ovaladas, de superficie cerosa o rugosa, como «pegadas» sobre la piel; suelen ser varias y tienden a ser hereditarias. No son cáncer.',
        trat: 'No necesitan tratamiento; si molestan, se pueden quitar con congelación (crioterapia), raspado o láser.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Una lesión única, que cambia rápido, sangra o tiene bordes o colores irregulares: consulta pronto (descartar melanoma).',
        src: ['mp_queratosis_seborreica']
      },
      {
        id: 'queratosis_actinica', n: 'Queratosis actínica', alt: 'Lesión precancerosa por sol', urg: 2, prev: 1.0, dur: ['m'],
        age: [[0, 30, 0.2], [50, 200, 1.3]],
        s: { placa_aspera_sol: 3, ctx_calor: 1 },
        que: 'Zona pequeña, áspera y escamosa de la piel causada por años de exposición al sol, más frecuente en personas de piel clara, mayores o con trasplantes. Aparece en la cara, las orejas, la calva o el dorso de las manos. Es una lesión precancerosa: algunas se transforman en cáncer de piel escamocelular.',
        trat: 'Congelación (crioterapia), cremas indicadas por el dermatólogo, terapia fotodinámica o raspado. Protector solar diario y sombrero para prevenir nuevas.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Si la lesión crece, se endurece, duele o sangra: consulta pronto.',
        src: ['mp_queratosis_actinica']
      },
      {
        id: 'carcinoma_basocelular', n: 'Señales de carcinoma basocelular', alt: 'Cáncer de piel más frecuente', urg: 3, prev: 0.9, dur: ['s', 'm'],
        age: [[0, 30, 0.2], [50, 200, 1.4]],
        s: { bulto_perlado: 3, herida_no_sana_piel: 2, ctx_calor: 1 },
        que: 'El cáncer de piel más frecuente, relacionado con la exposición al sol durante años, sobre todo en personas de piel clara mayores de 50. Suele aparecer en la cara, el cuello o las orejas como un bultito brillante o perlado con vasitos finos, o como una herida que sangra, forma costra y no sana. Crece lento y casi nunca se extiende a otros órganos, pero puede dañar la piel alrededor.',
        trat: 'Extirpación con cirugía (a veces cirugía de Mohs), raspado y quemado, cremas o radioterapia, según el tamaño y la ubicación. Revisar la piel periódicamente y usar protector solar.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Toda herida en la piel que no sana en un mes debe evaluarse.',
        src: ['mp_basocelular']
      },
      {
        id: 'carcinoma_espinocelular', n: 'Señales de carcinoma espinocelular', alt: 'Cáncer de piel escamocelular', urg: 3, prev: 0.9, dur: ['s', 'm'],
        age: [[0, 30, 0.2], [50, 200, 1.4]],
        s: { bulto_escamoso_crece: 3, herida_no_sana_piel: 2, placa_aspera_sol: 1, ctx_calor: 1, ctx_fumador: 1 },
        que: 'El segundo cáncer de piel más frecuente. Aparece en piel expuesta al sol (o en el labio inferior en fumadores) como un bulto rojo y firme, una placa con escamas y costra, o una herida que crece. Puede nacer de una queratosis actínica y, a diferencia del basocelular, a veces se extiende, por lo que debe extirparse pronto.',
        trat: 'Cirugía en la mayoría de los casos; a veces raspado y quemado, cirugía de Mohs o radioterapia. Controles de la piel y protección solar.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Bulto que crece rápido, duele o sangra, o ganglios inflamados cerca: consulta pronto.',
        src: ['mp_escamocelular']
      },
      {
        id: 'lipoma', n: 'Lipoma', alt: 'Bulto de grasa bajo la piel', urg: 1, prev: 1.0, dur: ['m'],
        age: [[0, 19, 0.4], [40, 60, 1.2]],
        s: { bulto_blando_movil: 3 },
        que: 'Bulto de grasa de crecimiento muy lento bajo la piel, blando, gomoso, indoloro y que se mueve con los dedos. Suele aparecer en el cuello, los hombros, la espalda, el abdomen, los brazos o los muslos. No es cáncer y tiende a ser hereditario.',
        trat: 'No necesita tratamiento; si molesta, duele o crece, se extirpa con una cirugía menor.',
        esp: 'Médico general; cirujano o dermatólogo.',
        alarma: 'Bulto duro, fijo, doloroso, que crece rápido o mide más de 5 cm: consulta pronto.',
        src: ['mayo_lipoma', 'mp_protuberancias']
      },
      {
        id: 'quiste_epidermico', n: 'Quiste epidérmico', alt: 'Quiste sebáceo', urg: 1, prev: 1.0, dur: ['s', 'm'],
        s: { bulto_piel_punto: 3, bulto_pus: 1 },
        que: 'Bulto redondo, benigno y de crecimiento lento bajo la piel, con frecuencia en la cara, el cuello o el tronco. A menudo tiene un puntito oscuro al centro por donde puede salir un material espeso, blanco y de mal olor (queratina). Puede inflamarse o infectarse.',
        trat: 'Si no molesta, no requiere tratamiento. Si se inflama: compresas tibias y, a veces, drenaje o inyección de corticoide; para que no vuelva, se extirpa completo con cirugía menor. No hay que reventarlo.',
        esp: 'Médico general; dermatólogo o cirujano.',
        alarma: 'Enrojecimiento que se extiende, dolor intenso o fiebre: consulta pronto.',
        src: ['mp_quiste_epidermoide', 'mayo_quiste_epidermoide']
      },
      {
        id: 'queloide', n: 'Queloide', alt: 'Cicatriz que crece de más', urg: 1, prev: 1.0, dur: ['m'],
        age: [[10, 30, 1.2]],
        s: { cicatriz_gruesa: 3, picazon_piel: 1 },
        que: 'Cicatriz gruesa, elevada y brillante que sigue creciendo más allá de la herida original, por exceso de colágeno al cicatrizar. Aparece tras cortes, cirugías, quemaduras, acné o perforaciones, sobre todo en el lóbulo de la oreja, los hombros, las mejillas o el pecho. Puede picar o doler. No es cáncer ni se contagia.',
        trat: 'Inyecciones de corticoides, láminas o geles de silicona, presión, congelación o cirugía (que a veces se combina con radioterapia porque puede volver). Quienes los forman deben evitar perforaciones y tatuajes.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Cicatriz que sangra, se abre o cambia de forma: consulta.',
        src: ['mayo_queloide']
      },
      {
        id: 'hiperhidrosis', n: 'Hiperhidrosis', alt: 'Sudoración excesiva', urg: 1, prev: 1.0, dur: ['m'],
        age: [[12, 40, 1.2]],
        s: { sudor_excesivo: 3, ansiedad: 1, sudoracion: 1, sudor_nocturno: -1, perdida_peso: -1, palpitaciones: -1, fiebre: -1 },
        que: 'Sudoración mucho mayor de la necesaria para enfriar el cuerpo, sobre todo en manos, pies, axilas o cara, que puede empapar la ropa. Suele empezar en la niñez o la adolescencia y la mayoría de las veces no tiene una causa; con menos frecuencia se debe a otra enfermedad (tiroides, diabetes, menopausia, infecciones) o medicamentos.',
        trat: 'Antitranspirantes con cloruro de aluminio, iontoforesis para manos y pies, toxina botulínica, medicamentos y, en casos seleccionados, cirugía.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Sudor de todo el cuerpo que empieza de adulto, de noche, o con baja de peso, fiebre o palpitaciones: consulta (descartar otras causas).',
        src: ['mp_hiperhidrosis']
      },
      {
        id: 'intertrigo', n: 'Intertrigo', alt: 'Roce en los pliegues', urg: 1, prev: 1.0, dur: ['d', 's'],
        s: { pliegue_rojo: 3, picazon_piel: 1, ctx_sobrepeso: 1, ctx_diabetes: 1, ctx_calor: 1 },
        que: 'Inflamación de los pliegues de la piel donde dos superficies se rozan y queda humedad: bajo las mamas, en las ingles, las axilas o entre los rollitos de la guata. La piel se pone roja, húmeda, con ardor o picazón y a veces mal olor; puede sobreinfectarse con hongos o bacterias.',
        trat: 'Mantener los pliegues limpios y secos (separarlos con gasa o una tela de algodón, secar con aire frío), ropa suelta y cremas de barrera; si hay hongos o bacterias, cremas antifúngicas o antibióticas indicadas por el médico.',
        esp: 'Médico general.',
        alarma: 'Mal olor fuerte, pus, dolor o fiebre: consulta.',
        src: ['mp_intertrigo']
      },
      {
        id: 'liquen_plano', n: 'Liquen plano', urg: 2, prev: 0.9, dur: ['s', 'm'],
        age: [[30, 60, 1.2]],
        s: { papulas_violaceas: 3, picazon_piel: 2, placas_boca: 1, llagas_boca: 1 },
        que: 'Inflamación de la piel o de la boca de causa no del todo conocida, relacionada con el sistema inmune. En la piel aparecen bultitos planos, violáceos y brillantes que pican mucho, sobre todo en muñecas y tobillos; en la boca, líneas blancas como encaje o heridas dolorosas. También puede afectar uñas, cuero cabelludo y genitales.',
        trat: 'Cremas con corticoides, antihistamínicos para la picazón y otros tratamientos indicados por el dermatólogo. En la piel suele mejorar en meses o pocos años; el de la boca dura más y requiere controles.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Heridas en la boca que no sanan o un bulto en la boca: consulta pronto.',
        src: ['mp_liquen_plano']
      },
      {
        id: 'hidradenitis', n: 'Hidradenitis supurativa', urg: 2, prev: 0.9, dur: ['s', 'm'], sexF: 1.3,
        age: [[0, 11, 0.2], [15, 40, 1.3]],
        s: { bultos_axilas_ingle: 3, bulto_pus: 2, ctx_sobrepeso: 1, ctx_fumador: 1 },
        que: 'Enfermedad crónica en que se tapan e inflaman los folículos del pelo de zonas con pliegues: axilas, ingles, glúteos y bajo las mamas. Produce bultos dolorosos que se repiten, supuran y dejan cicatrices o túneles bajo la piel. Empieza después de la pubertad y empeora con el tabaco y el sobrepeso. No se debe a falta de higiene ni se contagia.',
        trat: 'Antibióticos, cremas, medicamentos biológicos en casos moderados a graves, y cirugía. Dejar de fumar y bajar de peso ayudan mucho. Tratarla temprano evita cicatrices.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Fiebre, dolor muy intenso o enrojecimiento que se extiende: consulta pronto.',
        src: ['mp_hidradenitis_t']
      },
      {
        id: 'foliculitis', n: 'Foliculitis', urg: 1, prev: 1.0, dur: ['d', 's'],
        s: { granitos_pelos: 3, picazon_piel: 1, bulto_pus: 1, ctx_agua: 1 },
        que: 'Inflamación de los folículos del pelo, casi siempre por bacterias (estafilococo) y a veces por hongos o por el roce y el afeitado. Aparecen granitos rojos o con pus alrededor de los pelos que pican o arden, en la barba, las piernas, los glúteos o el cuero cabelludo; también tras usar tinas calientes o piscinas mal mantenidas.',
        trat: 'Los casos leves mejoran en días con lavado suave, compresas tibias y evitar afeitarse o la ropa apretada; si no mejora o se extiende, cremas o comprimidos antibióticos o antifúngicos indicados por un médico.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Bultos grandes y dolorosos, fiebre o enrojecimiento que se extiende: consulta pronto.',
        src: ['mayo_foliculitis', 'mp_forunculo']
      },
      {
        id: 'callos', n: 'Callos y callosidades', urg: 1, prev: 1.0, dur: ['m'],
        s: { callo: 3 },
        que: 'Engrosamiento de la piel en zonas de roce o presión repetida, como defensa: callosidades en la planta del pie o las manos y callos más pequeños y dolorosos, con un centro duro, sobre o entre los dedos. Se deben a zapatos apretados, deformidades de los pies o trabajos manuales.',
        trat: 'Zapatos cómodos, almohadillas o plantillas, limar la piel tras un baño tibio y cremas con urea o ácido salicílico. Quienes tienen diabetes o mala circulación no deben cortarlos en casa: deben acudir al podólogo.',
        esp: 'Podólogo; médico general.',
        alarma: 'En personas con diabetes: enrojecimiento, herida, pus o dolor en el callo, consulta pronto.',
        src: ['mp_callos']
      },
      {
        id: 'picadura_abeja', n: 'Picadura de abeja o avispa', urg: 1, prev: 1.0, dur: ['h', 'd'],
        req: ['ctx_picadura_abeja'], reqF: 0.3,
        s: { ctx_picadura_abeja: 3, hinchazon_picadura: 3, picazon_piel: 1, hinchazon_labios: -2, ahogo_severo: -2, ronchas: -1 },
        que: 'La picadura produce dolor, enrojecimiento e hinchazón en el lugar, que pueden extenderse por varios centímetros durante uno o dos días. En personas alérgicas, o con muchas picaduras a la vez, puede causar una reacción grave en todo el cuerpo (anafilaxia).',
        trat: 'Retirar el aguijón raspándolo con una tarjeta, lavar con agua y jabón, frío local, elevar la zona y analgésicos o antihistamínicos. Quienes han tenido reacciones graves deben portar adrenalina autoinyectable indicada por un médico.',
        esp: 'Autocuidado; médico general si la hinchazón es muy grande.',
        alarma: 'Ronchas en el cuerpo, hinchazón de la cara o la garganta, dificultad para respirar o mareo tras una picadura: llama al 131.',
        src: ['mp_picaduras']
      },
      {
        id: 'picaduras_insectos', n: 'Picaduras de insectos', alt: 'Zancudos, pulgas o chinches', urg: 1, prev: 1.0, dur: ['d', 's'],
        s: { ronchas_picaduras: 3, picazon_piel: 2, hinchazon_picadura: 1, ctx_convivientes: 1, picazon_nocturna: -1, surcos_dedos: -2 },
        que: 'Ronchitas rojas que pican mucho por picaduras de zancudos, pulgas (de mascotas, en grupos en los tobillos), chinches de cama (en línea, en zonas descubiertas al dormir) u otros insectos. Rascarse puede infectarlas.',
        trat: 'Lavar, frío local, cremas para la picazón o antihistamínicos; evitar rascarse. Buscar la fuente: tratar a las mascotas contra pulgas, revisar colchones por chinches, usar mosquiteros y repelentes.',
        esp: 'Autocuidado; médico general si se infectan.',
        alarma: 'Fiebre, pus, una zona roja que crece o reacción en todo el cuerpo: consulta.',
        src: ['mp_picaduras', 'mp_pulgas']
      },
      {
        id: 'eccema_dishidrotico', n: 'Eccema dishidrótico', alt: 'Ponfólix', urg: 1, prev: 1.0, dur: ['d', 's'],
        s: { ampollitas_dedos: 3, picazon_piel: 2, ctx_estres: 1, ctx_calor: 1, ctx_irritante: 1, fiebre: -1 },
        que: 'Brotes de ampollitas pequeñas y profundas, que pican mucho, en los costados de los dedos, las palmas o las plantas; al secarse, la piel se pela y se agrieta. Se relaciona con el estrés, las alergias, el contacto con irritantes o metales, el sudor y el calor. No se contagia.',
        trat: 'Compresas frías, cremas con corticoides, hidratación de la piel y evitar los irritantes (usar guantes); en casos difíciles, otros tratamientos indicados por el dermatólogo.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Pus, dolor intenso o fiebre: consulta (posible infección).',
        src: ['mp_ponfolix']
      },
      {
        id: 'paroniquia', n: 'Paroniquia', alt: 'Panadizo o uñero', urg: 2, prev: 1.0, dur: ['d', 's'],
        s: { dedo_unia_hinchado: 3, bulto_pus: 1, una_encarnada: -1 },
        que: 'Infección de la piel alrededor de la uña. La forma aguda, por bacterias, aparece tras morderse las uñas, sacarse los pellejitos o una manicura, con el borde rojo, hinchado, caliente y doloroso, a veces con pus. La forma crónica, por hongos, es frecuente en quienes tienen las manos mucho tiempo en agua.',
        trat: 'Remojar el dedo en agua tibia 2 a 3 veces al día; si hay pus, el médico puede drenarlo, y a veces se usan antibióticos o antifúngicos. No cortar las cutículas.',
        esp: 'Médico general.',
        alarma: 'Enrojecimiento que avanza por el dedo o la mano, fiebre o mucho dolor: consulta pronto.',
        src: ['mp_paroniquia']
      },
      {
        id: 'sabanones', n: 'Sabañones', urg: 1, prev: 1.0, dur: ['d', 's'], sexF: 1.2,
        age: [[15, 30, 1.2]],
        s: { dedos_rojos_frio: 3, ctx_frio: 2, picazon_piel: 1, dedos_blancos_frio: -1 },
        que: 'Inflamación de los vasos sanguíneos pequeños de la piel por una reacción anormal al frío húmedo seguido de recalentamiento. Horas después aparecen zonas rojas o moradas, hinchadas, que pican o arden, sobre todo en los dedos de manos y pies; a veces con ampollas o heridas. Más frecuentes en mujeres jóvenes, personas delgadas y en invierno.',
        trat: 'Suelen mejorar en 1 a 3 semanas: recalentar la piel lentamente (sin estufa ni agua caliente directa), no rascar, mantener manos y pies abrigados y secos; a veces cremas o medicamentos indicados por el médico.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Heridas que se infectan, síntomas que no mejoran en 2 semanas o que siguen en primavera: consulta.',
        src: ['mayo_sabanones']
      },
      {
        id: 'ulceras_presion', n: 'Úlceras por presión', alt: 'Escaras', urg: 3, prev: 1.0, dur: ['d', 's', 'm'],
        age: [[70, 200, 1.3]],
        s: { herida_presion: 3, ctx_inmovil: 2, fiebre: 1, ctx_diabetes: 1 },
        que: 'Heridas de la piel y los tejidos que aparecen cuando la presión se mantiene en la misma zona, en personas que pasan mucho tiempo en cama o en silla de ruedas. Empiezan como una zona roja que no se aclara al presionarla, caliente, dura o esponjosa, sobre el sacro, los talones, las caderas o los codos, y pueden convertirse en úlceras profundas.',
        trat: 'Aliviar la presión cambiando de posición al menos cada 2 horas, colchones o cojines especiales, curaciones según la etapa, buena alimentación e hidratación y control de la humedad de la piel.',
        esp: 'Enfermería (curaciones) en el CESFAM o a domicilio; médico general.',
        alarma: 'Fiebre, mal olor, pus, herida que se agranda o se ve el hueso: consulta pronto.',
        src: ['mp_ulceras_presion_cuidado', 'mp_prevenir_presion']
      }
    ]
  });

  // ── Tanda 8 (noviembre 2026): piel del bebé y del adulto, tendones, muñeca y rodilla
  D.addPack({
    symptoms: [
      ['herida_pie_diabetico', 'Herida, ampolla o zona roja en el pie que duele poco o nada, en alguien con diabetes', 'piel', 2, ['pie diabético', 'úlcera del pie']],
      ['granitos_boca', 'Granitos rojos pequeños alrededor de la boca, la nariz o los ojos, que respetan el borde del labio', 'piel', 1, ['dermatitis perioral']],
      ['mancha_roja_bebe', 'Mancha o bulto rojo frambuesa o azulado en la piel de un bebé, que crece en los primeros meses', 'piel', 1, ['hemangioma', 'frutilla', 'mancha vascular']],
      ['granitos_calor', 'Granitos rojos o ampollitas transparentes que pican o pinchan en zonas de sudor (cuello, pecho, pliegues) con el calor', 'piel', 1, ['sudamina', 'miliaria', 'salpullido por calor']],
      ['manchas_rn', 'Recién nacido con manchas rojas con un puntito blanco o amarillo al centro, en los primeros días de vida', 'piel', 1, ['eritema tóxico', 'granitos del recién nacido']],
      ['zona_pelo_escamas', 'Zonas del cuero cabelludo con escamas, pelos quebrados y caída de pelo, a veces con pus (en niños)', 'piel', 1, ['tiña de la cabeza', 'hongos en el cuero cabelludo']],
      ['ingle_roja_borde', 'Mancha roja que pica en las ingles o la cara interna de los muslos, con el borde más marcado', 'piel', 1, ['tiña inguinal', 'hongos en la ingle']],
      ['piel_gallina_brazos', 'Granitos ásperos como «piel de gallina» en la parte de atrás de los brazos, los muslos o las mejillas', 'piel', 1, ['queratosis pilar']],
      ['piel_oscura_pliegues', 'Piel más oscura, gruesa y aterciopelada en el cuello, las axilas o las ingles', 'piel', 1, ['acantosis nigricans', 'cuello oscuro']],
      ['ronchas_sol', 'Granitos o placas rojas que pican en zonas expuestas al sol, horas después de asolearte (sobre todo en primavera)', 'piel', 1, ['alergia al sol', 'erupción polimorfa lumínica']],
      ['manchas_claras_cara_nino', 'Manchas más claras, redondeadas y algo ásperas en la cara o los brazos de un niño, que se notan más en verano', 'piel', 1, ['pitiriasis alba', 'manchas blancas en la cara']],
      ['manchas_cafe_sol', 'Manchas planas café claro a oscuro en zonas expuestas al sol (dorso de las manos, cara, hombros)', 'piel', 1, ['manchas solares', 'lentigos', 'manchas de la edad']],
      ['bulto_codo_rodilla', 'Hinchazón blanda y dolorosa sobre el codo, la rodilla o el costado de la cadera (como una bolsa de líquido)', 'musculo', 1, ['bursitis', 'codo de estudiante', 'rodilla de beata']],
      ['dolor_aquiles', 'Dolor y rigidez en el tendón de atrás del tobillo, sobre el talón, al caminar, correr o en la mañana', 'musculo', 1, ['tendinitis de Aquiles']],
      ['chasquido_talon', 'Sentiste un golpe o chasquido en la parte de atrás del tobillo y ahora no puedes ponerte en puntas de pie', 'musculo', 2, ['rotura del tendón de Aquiles']],
      ['dolor_pulgar_muneca', 'Dolor en el lado del pulgar de la muñeca al agarrar, pellizcar o girar la mano', 'musculo', 1, ['tendinitis de De Quervain', 'dolor de muñeca']],
      ['dedo_trabado', 'Un dedo se traba doblado y luego se suelta de golpe, con dolor o un bultito en su base', 'musculo', 1, ['dedo en gatillo', 'dedo en resorte']],
      ['bulto_muneca', 'Bulto redondo, firme o blando, en el dorso o la palma de la muñeca o en un dedo', 'musculo', 1, ['ganglión', 'quiste sinovial']],
      ['bulto_detras_rodilla', 'Bulto o hinchazón detrás de la rodilla que se siente apretado al estirarla', 'musculo', 1, ['quiste de Baker']],
      ['dolor_frente_rodilla', 'Dolor en la parte de adelante de la rodilla, alrededor de la rótula, al subir o bajar escaleras, agacharte o estar mucho rato sentado', 'musculo', 1, ['condromalacia', 'dolor patelofemoral', 'rodilla del corredor']],
      ['rodilla_trabada', 'La rodilla se traba o se «engancha» y cuesta estirarla del todo, después de girarla con el pie apoyado', 'musculo', 1, ['menisco', 'rodilla bloqueada']],
      ['rodilla_hinchada', 'Rodilla hinchada después de una lesión o un esfuerzo', 'musculo', 1, ['derrame en la rodilla']],
      ['chasquido_rodilla', 'Sentiste un chasquido en la rodilla al frenar, saltar o cambiar de dirección, y ahora la rodilla «se va» o falla', 'musculo', 2, ['ligamento cruzado', 'LCA']],
      ['bulto_bajo_rotula', 'Bulto doloroso justo bajo la rótula, en un niño o adolescente deportista', 'musculo', 1, ['Osgood-Schlatter']]
    ],
    sources: {
      mp_ulceras_pie_diabetes: [MP, 'Úlceras en los pies por diabetes', 'https://medlineplus.gov/spanish/ency/patientinstructions/000077.htm'],
      mp_pies_diabetes: [MP, 'Cuidado de los pies en caso de diabetes', 'https://medlineplus.gov/spanish/ency/patientinstructions/000081.htm'],
      mp_dermatitis_perioral: [MP, 'Dermatitis perioral', 'https://medlineplus.gov/spanish/ency/article/001455.htm'],
      mp_xerosis: [MP, 'Xerosis (piel seca)', 'https://medlineplus.gov/spanish/ency/article/000835.htm'],
      mp_piel_rn: [MP, 'Signos en la piel de los recién nacidos (incluye hemangiomas)', 'https://medlineplus.gov/spanish/ency/article/002301.htm'],
      mp_ictericia_rn: [MP, 'Ictericia del recién nacido', 'https://medlineplus.gov/spanish/ency/article/001559.htm'],
      mayo_miliaria: [MAYO, 'Miliaria (sarpullido por calor)', 'https://www.mayoclinic.org/es/diseases-conditions/heat-rash/symptoms-causes/syc-20373276'],
      mp_eritema_toxico: [MP, 'Eritema tóxico', 'https://medlineplus.gov/spanish/ency/article/001458.htm'],
      mp_tina_cabeza: [MP, 'Tiña de la cabeza', 'https://medlineplus.gov/spanish/ency/article/000878.htm'],
      mp_tina: [MP, 'Tiña (incluye la tiña inguinal)', 'https://medlineplus.gov/spanish/ency/article/001439.htm'],
      mp_queratosis_pilar: [MP, 'Queratosis pilar', 'https://medlineplus.gov/spanish/ency/article/001462.htm'],
      mp_acantosis: [MP, 'Acantosis nigricans', 'https://medlineplus.gov/spanish/ency/article/000852.htm'],
      mayo_erupcion_luminica: [MAYO, 'Erupción polimorfa lumínica', 'https://www.mayoclinic.org/es/diseases-conditions/polymorphous-light-eruption/symptoms-causes/syc-20355868'],
      mayo_alergia_sol: [MAYO, 'Alergia al sol', 'https://www.mayoclinic.org/es/diseases-conditions/sun-allergy/symptoms-causes/syc-20378077'],
      mp_pitiriasis_alba: [MP, 'Pitiriasis alba', 'https://medlineplus.gov/spanish/ency/article/001463.htm'],
      mayo_manchas_edad: [MAYO, 'Manchas seniles (lentigos solares)', 'https://www.mayoclinic.org/es/diseases-conditions/age-spots/symptoms-causes/syc-20355859'],
      mp_manchas_vejez: [MP, 'Manchas de la vejez: ¿debe preocuparse?', 'https://medlineplus.gov/spanish/ency/article/002086.htm'],
      mayo_bursitis: [MAYO, 'Bursitis', 'https://www.mayoclinic.org/es/diseases-conditions/bursitis/symptoms-causes/syc-20353242'],
      mp_tendinitis_aquilea: [MP, 'Tendinitis aquílea', 'https://medlineplus.gov/spanish/ency/article/001072.htm'],
      mp_rotura_aquiles: [MP, 'Atención postratamiento para la ruptura del tendón de Aquiles', 'https://medlineplus.gov/spanish/ency/patientinstructions/000546.htm'],
      mayo_de_quervain: [MAYO, 'Tenosinovitis de De Quervain', 'https://www.mayoclinic.org/es/diseases-conditions/de-quervain-tenosynovitis/symptoms-causes/syc-20371332'],
      mp_de_quervain: [MP, 'Tendinitis de De Quervain: cuidados', 'https://medlineplus.gov/spanish/ency/patientinstructions/000537.htm'],
      mayo_dedo_gatillo: [MAYO, 'Dedo en gatillo', 'https://www.mayoclinic.org/es/diseases-conditions/trigger-finger/symptoms-causes/syc-20365100'],
      mayo_ganglion: [MAYO, 'Ganglión (quiste ganglionar)', 'https://www.mayoclinic.org/es/diseases-conditions/ganglion-cyst/symptoms-causes/syc-20351156'],
      mayo_quiste_baker: [MAYO, 'Quiste de Baker', 'https://www.mayoclinic.org/es/diseases-conditions/bakers-cyst/symptoms-causes/syc-20369950'],
      mp_dolor_anterior_rodilla: [MP, 'Dolor anterior de rodilla (condromalacia rotuliana)', 'https://medlineplus.gov/spanish/ency/article/000452.htm'],
      mayo_menisco: [MAYO, 'Rotura de menisco', 'https://www.mayoclinic.org/es/diseases-conditions/torn-meniscus/symptoms-causes/syc-20354818'],
      mp_lca: [MP, 'Lesión del ligamento cruzado anterior (LCA)', 'https://medlineplus.gov/spanish/ency/article/001074.htm'],
      mayo_lca: [MAYO, 'Lesión del ligamento cruzado anterior', 'https://www.mayoclinic.org/es/diseases-conditions/acl-injury/symptoms-causes/syc-20350738'],
      mp_osgood: [MP, 'Enfermedad de Osgood-Schlatter', 'https://medlineplus.gov/spanish/ency/article/001258.htm']
    },
    conditions: [
      {
        id: 'pie_diabetico', n: 'Pie diabético', alt: 'Úlcera del pie por diabetes', urg: 3, prev: 1.0, dur: ['d', 's', 'm'],
        age: [[0, 29, 0.4], [50, 200, 1.2]],
        req: ['ctx_diabetes'], reqF: 0.3,
        s: { herida_pie_diabetico: 3, ctx_diabetes: 3, ardor_pies: 1, piel_roja_caliente: 1, fiebre: 1 },
        que: 'La diabetes daña con los años los nervios y la circulación de los pies: se pierde la sensibilidad y las heridas, ampollas o roces pasan inadvertidos y sanan mal. Pueden infectarse y avanzar hasta la gangrena; es una de las principales causas de amputación.',
        trat: 'Curaciones por profesionales, descargar el pie (no apoyar la herida), antibióticos si hay infección y buen control de la glucosa. Prevención: revisar los pies todos los días, lavarlos y secarlos bien, usar calzado cómodo, no andar descalzo y acudir al control de pies en el CESFAM.',
        esp: 'CESFAM (control y curaciones de pie diabético); médico general; cirujano vascular si hay mala circulación.',
        alarma: 'Herida con pus, mal olor, enrojecimiento que avanza, fiebre o un dedo negro: consulta hoy.',
        src: ['mp_ulceras_pie_diabetes', 'mp_pies_diabetes']
      },
      {
        id: 'dermatitis_perioral', n: 'Dermatitis perioral', urg: 1, prev: 1.0, dur: ['s', 'm'], sexF: 1.4,
        age: [[15, 45, 1.2]],
        s: { granitos_boca: 3, picazon_piel: 1, acne: -1, rash_mariposa: -1 },
        que: 'Erupción de granitos rojos pequeños, a veces con escamas o pus, alrededor de la boca y, a veces, de la nariz o los ojos, que suele dejar libre una franja junto al labio. Es más frecuente en mujeres jóvenes y empeora con cremas de corticoides en la cara, cremas muy grasas o algunos cosméticos.',
        trat: 'Suspender las cremas con corticoides y los cosméticos pesados (puede empeorar al principio), lavar con agua y un limpiador suave y usar cremas o comprimidos antibióticos indicados por un médico; el tratamiento dura varias semanas o meses.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Si se extiende, duele o no mejora con el tratamiento: consulta.',
        src: ['mp_dermatitis_perioral']
      },
      {
        id: 'xerosis', n: 'Piel seca', alt: 'Xerosis', urg: 1, prev: 1.0, dur: ['s', 'm'],
        age: [[65, 200, 1.3]],
        s: { piel_seca: 3, picazon_piel: 2, ctx_frio: 1, eccema: -1, intolerancia_frio: -1 },
        que: 'Sequedad anormal de la piel que produce descamación, picazón, aspereza y a veces grietas, sobre todo en las piernas, los brazos y las manos. Es muy frecuente en personas mayores, en invierno, con la calefacción y con duchas largas y calientes.',
        trat: 'Cremas humectantes (mejor con urea o ácido láctico) justo después del baño, duchas cortas con agua tibia, jabones suaves y secar la piel con toques suaves.',
        esp: 'Autocuidado; médico general si no mejora.',
        alarma: 'Picazón intensa en todo el cuerpo sin causa clara, grietas que sangran o se infectan, o piel seca con mucho cansancio y frío: consulta.',
        src: ['mp_xerosis']
      },
      {
        id: 'hemangioma', n: 'Hemangioma infantil', alt: 'Mancha frutilla', urg: 2, prev: 1.0, dur: ['s', 'm'],
        ageRange: [0, 10], age: [[0, 1, 1.4]],
        s: { mancha_roja_bebe: 3 },
        que: 'Tumor benigno y frecuente de los vasos sanguíneos de la piel, que aparece al nacer o en las primeras semanas como una mancha o bulto rojo frambuesa (o azulado si es más profundo). Crece en los primeros meses y luego se achica de a poco durante años; la mayoría no necesita tratamiento.',
        trat: 'Controles con el pediatra; si está cerca del ojo, la nariz, la boca o los genitales, crece muy rápido, sangra o se ulcera, existen medicamentos (como el propranolol) indicados por especialistas.',
        esp: 'Pediatra; dermatólogo infantil.',
        alarma: 'Hemangioma que sangra, se ulcera, crece muy rápido o está cerca del ojo o la boca: consulta pronto.',
        src: ['mp_piel_rn']
      },
      {
        id: 'ictericia_rn', n: 'Ictericia del recién nacido', urg: 3, prev: 1.0, dur: ['d', 's'],
        ageRange: [0, 0],
        s: { ictericia: 3, somnolencia: 1, cansancio_mamar: 1, acolia: -2, coluria: -1, vomitos: -2, ctx_leche_bebe: -1, hipotonia_bebe: -2, estrenimiento: -1 },
        que: 'Color amarillo de la piel y los ojos del recién nacido por acumulación de bilirrubina. Es muy frecuente y casi siempre aparece entre el segundo y tercer día de vida y desaparece sola en una o dos semanas. A veces la bilirrubina sube demasiado y debe tratarse para proteger el cerebro del bebé.',
        trat: 'Amamantar seguido (8 a 12 veces al día) y control en la consulta del recién nacido; si la bilirrubina está alta, fototerapia (luz especial) y, rara vez, otros tratamientos.',
        esp: 'Pediatra o control del recién nacido; matrona.',
        alarma: 'Amarillo intenso o que avanza hacia las piernas, ictericia en las primeras 24 horas o que dura más de 2 semanas, bebé muy dormido que no mama, fiebre o deposiciones claras: consulta hoy.',
        src: ['mp_ictericia_rn']
      },
      {
        id: 'miliaria', n: 'Sudamina', alt: 'Miliaria o salpullido por calor', urg: 1, prev: 1.0, dur: ['h', 'd'],
        age: [[0, 3, 1.3]],
        s: { granitos_calor: 3, ctx_calor: 2, picazon_piel: 1, fiebre: -1 },
        que: 'Erupción que aparece cuando el sudor queda atrapado bajo la piel, con calor y humedad o por exceso de abrigo. Son granitos rojos o ampollitas transparentes que pican o pinchan en el cuello, el pecho, la espalda o los pliegues. Es muy frecuente en bebés.',
        trat: 'Enfriar la piel: ambiente fresco, ropa liviana de algodón, no abrigar de más y baños tibios. Suele desaparecer en pocos días; evitar cremas espesas.',
        esp: 'Autocuidado; pediatra o médico general si no mejora.',
        alarma: 'Fiebre, granitos con pus o bebé decaído: consulta.',
        src: ['mayo_miliaria']
      },
      {
        id: 'eritema_toxico', n: 'Eritema tóxico del recién nacido', urg: 1, prev: 1.0, dur: ['d'],
        ageRange: [0, 0],
        s: { manchas_rn: 3, fiebre: -2 },
        que: 'Erupción benigna y muy frecuente en los recién nacidos (la mitad la tiene), que aparece entre el primer y tercer día de vida: manchas rojas con un puntito blanco o amarillo al centro en la cara, el tronco o las extremidades. No molesta al bebé y desaparece sola en días.',
        trat: 'No necesita tratamiento.',
        esp: 'Pediatra o control del recién nacido.',
        alarma: 'Fiebre, ampollas, bebé decaído o que no mama: consulta de inmediato.',
        src: ['mp_eritema_toxico', 'mp_piel_rn']
      },
      {
        id: 'tina_cabeza', n: 'Tiña de la cabeza', urg: 2, prev: 1.0, dur: ['s', 'm'],
        age: [[2, 12, 1.4], [18, 200, 0.3]],
        s: { zona_pelo_escamas: 3, picazon_piel: 1, ganglios: 1, ctx_convivientes: 1, calva_redonda: -1 },
        que: 'Infección por hongos del cuero cabelludo, casi exclusiva de los niños, que se contagia entre personas o por perros y gatos. Produce zonas con escamas, pelos quebrados y caída de pelo; a veces una placa inflamada con pus (querion) y ganglios en el cuello.',
        trat: 'Requiere antifúngicos en comprimidos durante varias semanas, indicados por un médico; el champú antifúngico ayuda a no contagiar pero no la cura solo. Revisar a los convivientes y mascotas.',
        esp: 'Pediatra o médico general; dermatólogo.',
        alarma: 'Placa hinchada con pus o fiebre: consulta pronto.',
        src: ['mp_tina_cabeza']
      },
      {
        id: 'tina_inguinal', n: 'Tiña inguinal', alt: 'Hongos en la ingle', urg: 1, prev: 1.0, dur: ['d', 's'], sexM: 1.4,
        s: { ingle_roja_borde: 3, picazon_piel: 2, ctx_calor: 1, pie_atleta: 1, pliegue_rojo: 1 },
        que: 'Infección por hongos de las ingles y la cara interna de los muslos, más frecuente en hombres, con el calor, el sudor, la ropa ajustada y el pie de atleta. Produce una mancha roja que pica y arde, con el borde más marcado y a veces escamas.',
        trat: 'Cremas antifúngicas por 2 a 4 semanas, mantener la zona seca, ropa interior de algodón y tratar también el pie de atleta para evitar que vuelva.',
        esp: 'Autocuidado o médico general.',
        alarma: 'Si se extiende, supura o no mejora en 2 semanas de tratamiento: consulta.',
        src: ['mp_tina']
      },
      {
        id: 'queratosis_pilar', n: 'Queratosis pilar', urg: 1, prev: 1.0, dur: ['m'],
        age: [[5, 30, 1.2]],
        s: { piel_gallina_brazos: 3, piel_seca: 1 },
        que: 'Condición frecuente e inofensiva en que la queratina tapa los folículos del pelo y forma granitos ásperos, como piel de gallina, en la parte de atrás de los brazos, los muslos o las mejillas. Es hereditaria, empeora en invierno y suele mejorar con la edad.',
        trat: 'Cremas humectantes, sobre todo con urea, ácido láctico o salicílico; evitar frotar fuerte.',
        esp: 'Autocuidado; dermatólogo si molesta.',
        alarma: 'No es peligrosa; consulta si se inflama o pica mucho.',
        src: ['mp_queratosis_pilar']
      },
      {
        id: 'acantosis_nigricans', n: 'Acantosis nigricans', alt: 'Piel oscura y aterciopelada en los pliegues', urg: 2, prev: 1.0, dur: ['m'],
        s: { piel_oscura_pliegues: 3, ctx_sobrepeso: 2, ctx_diabetes: 1, vello_excesivo: 1 },
        que: 'Piel más oscura, gruesa y aterciopelada en los pliegues, sobre todo el cuello, las axilas y las ingles. Casi siempre se relaciona con sobrepeso y resistencia a la insulina (riesgo de diabetes tipo 2); también con problemas hormonales o algunos medicamentos. Si aparece de forma rápida y extensa en un adulto, debe descartarse un cáncer.',
        trat: 'No es una suciedad: no se quita lavando. Mejora al tratar la causa: bajar de peso, actividad física y estudio de glucosa e insulina; a veces cremas para aclarar.',
        esp: 'Médico general; endocrinólogo; dermatólogo.',
        alarma: 'Aparición rápida en un adulto, con baja de peso: consulta pronto.',
        src: ['mp_acantosis']
      },
      {
        id: 'erupcion_luminica', n: 'Alergia al sol', alt: 'Erupción polimorfa lumínica', urg: 1, prev: 1.0, dur: ['h', 'd'], sexF: 1.3,
        s: { ronchas_sol: 3, ctx_calor: 1, picazon_piel: 1, rash_mariposa: -1, dolor_articular: -1 },
        que: 'Erupción que aparece horas después de exponerse al sol en personas que se han vuelto sensibles a él, sobre todo en primavera y comienzos del verano. Produce granitos, ampollitas o placas rojas que pican o arden en el escote, los brazos o las piernas. Suele repetirse cada año y desaparece sola en unos 10 días sin dejar marca.',
        trat: 'Evitar el sol fuerte, ropa que cubra y protector solar de amplio espectro; cremas con corticoides o antihistamínicos para la picazón. En casos graves, fototerapia preventiva indicada por el dermatólogo.',
        esp: 'Médico general; dermatólogo.',
        alarma: 'Manchas en la cara con dolores articulares, fiebre o cansancio: consulta (descartar lupus).',
        src: ['mayo_erupcion_luminica', 'mayo_alergia_sol']
      },
      {
        id: 'pitiriasis_alba', n: 'Pitiriasis alba', urg: 1, prev: 1.0, dur: ['s', 'm'],
        age: [[2, 15, 1.4], [20, 200, 0.3]],
        s: { manchas_claras_cara_nino: 3, piel_seca: 1, eccema: 1, manchas_blancas_piel: -1 },
        que: 'Manchas más claras, redondeadas y algo escamosas, muy frecuentes en niños y adolescentes, en la cara, el cuello o la parte alta de los brazos. Se relaciona con la piel atópica y se nota más en verano porque la piel de alrededor se broncea. Es inofensiva.',
        trat: 'Cremas humectantes y protector solar; a veces cremas con corticoides suaves. El color se recupera solo en meses.',
        esp: 'Pediatra o médico general.',
        alarma: 'Manchas que pierden la sensibilidad o crecen sin parar: consulta.',
        src: ['mp_pitiriasis_alba']
      },
      {
        id: 'lentigos', n: 'Manchas solares', alt: 'Lentigos o manchas de la edad', urg: 1, prev: 1.0, dur: ['m'],
        age: [[0, 30, 0.2], [50, 200, 1.3]],
        s: { manchas_cafe_sol: 3, ctx_calor: 1, lunar_cambia: -2 },
        que: 'Manchas planas de color café claro a oscuro que aparecen por años de exposición al sol, sobre todo en el dorso de las manos, la cara, los hombros y los brazos, desde los 50 años. Son inofensivas y no necesitan tratamiento.',
        trat: 'Protector solar diario para prevenir nuevas; si molestan, cremas aclarantes, láser o congelación con un dermatólogo.',
        esp: 'Autocuidado; dermatólogo.',
        alarma: 'Mancha oscura que cambia de tamaño, forma o color, con bordes irregulares, o que sangra: consulta pronto (descartar melanoma).',
        src: ['mayo_manchas_edad', 'mp_manchas_vejez']
      },
      {
        id: 'bursitis', n: 'Bursitis', urg: 2, prev: 1.0, dur: ['d', 's', 'm'],
        age: [[40, 200, 1.2]],
        s: { bulto_codo_rodilla: 3, dolor_hombro: 1, articulacion_hinchada: 1, fiebre: 1 },
        que: 'Inflamación de las bolsas de líquido que amortiguan huesos, tendones y músculos cerca de las articulaciones, sobre todo en el hombro, el codo, la cadera y la rodilla. Produce dolor, rigidez e hinchazón que empeoran al moverse o al apoyarse; se debe a movimientos repetidos, apoyarse mucho en codos o rodillas, golpes, gota, artritis o infecciones.',
        trat: 'Reposo relativo de la zona, hielo, analgésicos o antiinflamatorios y kinesiología; a veces punción o inyección de corticoide. Si está infectada, antibióticos.',
        esp: 'Médico general; traumatólogo; kinesiólogo.',
        alarma: 'Fiebre, zona muy roja y caliente o dolor que impide mover la articulación: consulta pronto (posible infección).',
        src: ['mayo_bursitis']
      },
      {
        id: 'tendinitis_aquiles', n: 'Tendinitis de Aquiles', urg: 1, prev: 1.0, dur: ['d', 's', 'm'],
        age: [[30, 60, 1.2]],
        s: { dolor_aquiles: 3, ctx_ejercicio: 1, dolor_talon: 1, chasquido_talon: -2 },
        que: 'Inflamación o desgaste del tendón que une la pantorrilla con el talón, por sobrecarga: correr o saltar mucho, aumentar de golpe el ejercicio, calzado inadecuado o pantorrillas tensas. Produce dolor y rigidez sobre el talón, peor en la mañana y al hacer actividad. Aumenta el riesgo de rotura del tendón.',
        trat: 'Reducir la actividad que causa dolor, hielo, analgésicos, ejercicios de estiramiento y fortalecimiento (excéntricos) y calzado con algo de taco; kinesiología. Rara vez cirugía.',
        esp: 'Médico general; kinesiólogo; traumatólogo.',
        alarma: 'Chasquido brusco y dolor fuerte en el talón, o no poder ponerte en puntas de pie: urgencia (posible rotura).',
        src: ['mp_tendinitis_aquilea']
      },
      {
        id: 'rotura_aquiles', n: 'Rotura del tendón de Aquiles', urg: 3, prev: 0.95, dur: ['h', 'd'],
        age: [[30, 60, 1.2]],
        req: ['chasquido_talon'], reqF: 0.3,
        s: { chasquido_talon: 3, no_apoyar: 1, hinchazon_moreton: 1, ctx_ejercicio: 1, dolor_aquiles: 1 },
        que: 'Desgarro del tendón que une la pantorrilla con el talón, casi siempre al empujar o saltar con fuerza en deportes como el fútbol, el básquetbol o el tenis, a veces sobre un tendón ya dañado. Se siente como un golpe o chasquido detrás del tobillo, con dolor e hinchazón, y no se puede empujar con el pie ni ponerse en puntas.',
        trat: 'Inmovilización con bota o yeso o cirugía de reparación, según el caso, seguidas de kinesiología por varios meses.',
        esp: 'Servicio de urgencia o traumatólogo; kinesiólogo.',
        alarma: 'Ante la sospecha, consulta en las próximas horas; el tratamiento temprano mejora el resultado.',
        src: ['mp_rotura_aquiles']
      },
      {
        id: 'de_quervain', n: 'Tenosinovitis de De Quervain', alt: 'Tendinitis del pulgar', urg: 1, prev: 1.0, dur: ['s', 'm'], sexF: 1.3,
        s: { dolor_pulgar_muneca: 3, ctx_manos: 1, hormigueo_mano: -1 },
        que: 'Inflamación de los tendones del lado del pulgar de la muñeca por movimientos repetidos de la mano. Produce dolor e hinchazón cerca de la base del pulgar al agarrar, pellizcar, girar la muñeca o cerrar el puño, a veces con sensación de traba. Es frecuente en mujeres y en quienes cuidan a un bebé.',
        trat: 'Reposo de la mano con una férula para el pulgar, hielo, antiinflamatorios y cambiar los movimientos que la provocan; a veces una inyección de corticoide y, rara vez, cirugía. Suele mejorar en 4 a 6 semanas.',
        esp: 'Médico general; traumatólogo; terapeuta ocupacional o kinesiólogo.',
        alarma: 'Hinchazón roja y caliente con fiebre, o dolor que no mejora en semanas: consulta.',
        src: ['mayo_de_quervain', 'mp_de_quervain']
      },
      {
        id: 'dedo_gatillo', n: 'Dedo en gatillo', urg: 1, prev: 1.0, dur: ['s', 'm'], sexF: 1.2,
        age: [[40, 200, 1.2]],
        s: { dedo_trabado: 3, ctx_manos: 1, ctx_diabetes: 1, rigidez_matinal: 1 },
        que: 'Un dedo se traba en posición doblada y luego se estira de golpe, como un gatillo, porque su tendón no se desliza bien por su vaina. Produce rigidez (sobre todo en la mañana), chasquido y un bultito doloroso en la base del dedo; afecta más al pulgar y al anular. Es más frecuente en mujeres, personas con diabetes o artritis y trabajos de agarre repetido.',
        trat: 'Reposo, férula nocturna y ejercicios suaves; una inyección de corticoide suele solucionarlo, y si no, una cirugía menor libera el tendón.',
        esp: 'Médico general; traumatólogo de mano.',
        alarma: 'Dedo trabado que no se puede estirar, o hinchazón roja y caliente: consulta pronto.',
        src: ['mayo_dedo_gatillo']
      },
      {
        id: 'ganglion', n: 'Ganglión', alt: 'Quiste sinovial', urg: 1, prev: 1.0, dur: ['s', 'm'], sexF: 1.3,
        age: [[20, 40, 1.2]],
        s: { bulto_muneca: 3, hormigueo_mano: 1 },
        que: 'Bulto redondo lleno de un líquido gelatinoso que sale de una articulación o un tendón, casi siempre en el dorso o la palma de la muñeca, y también en dedos, tobillos o pies. Es benigno, suele no doler y puede cambiar de tamaño o desaparecer solo; si presiona un nervio, causa dolor u hormigueo. Es más frecuente entre los 20 y 40 años y en mujeres.',
        trat: 'Si no molesta, solo controlar; si duele o limita, inmovilización, punción para aspirar el líquido o cirugía. No hay que golpearlo para reventarlo.',
        esp: 'Médico general; traumatólogo.',
        alarma: 'Bulto duro que crece rápido, duele mucho o con adormecimiento persistente: consulta.',
        src: ['mayo_ganglion']
      },
      {
        id: 'quiste_baker', n: 'Quiste de Baker', urg: 2, prev: 1.0, dur: ['s', 'm'],
        age: [[40, 200, 1.2]],
        s: { bulto_detras_rodilla: 3, dolor_rodilla_cadera: 1, rodilla_hinchada: 1, pantorrilla: -2 },
        que: 'Bolsa de líquido detrás de la rodilla que se forma cuando la rodilla produce demasiado líquido por una artrosis, un desgarro del menisco u otra inflamación. Produce un abultamiento con sensación de tirantez, a veces dolor y rigidez. Si se rompe, el líquido baja a la pantorrilla y puede parecer una trombosis.',
        trat: 'Tratar la causa de la rodilla, reposo relativo, hielo y analgésicos; a veces punción o inyección de corticoide.',
        esp: 'Médico general; traumatólogo.',
        alarma: 'Pantorrilla hinchada, roja y dolorosa: consulta hoy (descartar trombosis venosa).',
        src: ['mayo_quiste_baker']
      },
      {
        id: 'dolor_patelofemoral', n: 'Dolor patelofemoral', alt: 'Condromalacia o rodilla del corredor', urg: 1, prev: 1.0, dur: ['s', 'm'], sexF: 1.3,
        age: [[10, 35, 1.3]],
        s: { dolor_frente_rodilla: 3, ctx_ejercicio: 1, dolor_rodilla_cadera: 1, rodilla_trabada: -1, chasquido_rodilla: -2 },
        que: 'Dolor en la parte de adelante de la rodilla, alrededor de la rótula, muy frecuente en adolescentes y adultos jóvenes deportistas, sobre todo mujeres. Empeora al subir o bajar escaleras, agacharse, correr o estar mucho rato sentado, y puede haber sensación de roce. Se relaciona con sobrecarga, debilidad del muslo y la cadera o mala alineación de la rótula.',
        trat: 'Reducir por un tiempo la actividad que lo provoca, hielo, analgésicos y, sobre todo, ejercicios de fortalecimiento de cuádriceps y cadera con un kinesiólogo.',
        esp: 'Médico general; kinesiólogo; traumatólogo.',
        alarma: 'Rodilla muy hinchada, que se traba o que falla: consulta (posible lesión interna).',
        src: ['mp_dolor_anterior_rodilla']
      },
      {
        id: 'menisco', n: 'Lesión de menisco', urg: 2, prev: 1.0, dur: ['d', 's', 'm'],
        s: { rodilla_trabada: 3, ctx_torcedura: 2, rodilla_hinchada: 2, dolor_rodilla_cadera: 1, hinchazon_moreton: -1 },
        que: 'Desgarro del cartílago en forma de C que amortigua la rodilla, al girarla bruscamente con el pie apoyado (deporte) o por desgaste en personas mayores. Produce dolor al girar, hinchazón y rigidez que pueden aparecer en las horas siguientes, dificultad para estirar la rodilla y sensación de que se traba o se engancha.',
        trat: 'Reposo relativo, hielo, elevación, analgésicos y kinesiología; si la rodilla se bloquea o no mejora, artroscopia para reparar o recortar el menisco.',
        esp: 'Médico general; traumatólogo; kinesiólogo.',
        alarma: 'Rodilla bloqueada que no se puede estirar, o muy hinchada: consulta pronto.',
        src: ['mayo_menisco']
      },
      {
        id: 'lesion_lca', n: 'Rotura del ligamento cruzado anterior', alt: 'Lesión del LCA', urg: 3, prev: 1.0, dur: ['h', 'd', 's'],
        age: [[14, 40, 1.2]],
        req: ['chasquido_rodilla'], reqF: 0.3,
        s: { chasquido_rodilla: 3, rodilla_hinchada: 2, ctx_torcedura: 2, no_apoyar: 1 },
        que: 'Rotura de uno de los ligamentos principales de la rodilla, típica de deportes con frenadas, saltos o cambios bruscos de dirección (fútbol, básquetbol, esquí). Se siente un chasquido, dolor fuerte que impide seguir jugando, hinchazón rápida y luego sensación de que la rodilla falla. A menudo se acompaña de lesión de meniscos.',
        trat: 'Hielo, elevación, muletas y kinesiología al inicio; según la edad, la actividad y la inestabilidad, cirugía de reconstrucción del ligamento seguida de rehabilitación de 4 a 6 meses o más.',
        esp: 'Servicio de urgencia o traumatólogo; kinesiólogo.',
        alarma: 'Deformidad, adormecimiento o pie frío, o dolor intenso que no permite apoyar: urgencia.',
        src: ['mp_lca', 'mayo_lca']
      },
      {
        id: 'osgood', n: 'Enfermedad de Osgood-Schlatter', urg: 1, prev: 1.0, dur: ['s', 'm'], sexM: 1.2,
        ageRange: [8, 18],
        s: { bulto_bajo_rotula: 3, ctx_ejercicio: 1, dolor_frente_rodilla: 1 },
        que: 'Inflamación dolorosa del bulto óseo justo bajo la rótula, donde se inserta su tendón, en niños y adolescentes deportistas en pleno crecimiento. Duele al correr, saltar, arrodillarse o subir escaleras y mejora con el reposo. Desaparece al terminar el crecimiento, aunque el bulto puede quedar.',
        trat: 'Reducir por un tiempo la actividad que causa dolor (sin dejar de moverse), hielo después del deporte, analgésicos, rodillera o cinta bajo la rótula y ejercicios de elongación.',
        esp: 'Pediatra o médico general; kinesiólogo; traumatólogo infantil.',
        alarma: 'Dolor de noche, fiebre, cojera intensa o hinchazón roja: consulta (descartar otras causas).',
        src: ['mp_osgood']
      }
    ]
  });
})();
