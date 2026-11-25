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
        s: { parpado_caido: 3, vision_borrosa: 1, debilidad_progresiva: -1, miotonia: -1 },
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
})();
