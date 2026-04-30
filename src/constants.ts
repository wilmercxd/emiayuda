import { Regime, AffiliateStatus, AffiliateType, EmiPlan } from './types';

export const EPS_LIST = [
  "EPS SURA", "EPS SANITAS", "SALUD TOTAL EPS", "NUEVA EPS", "COMPENSAR EPS",
  "COOSALUD EPS", "MUTUAL SER", "FAMISANAR", "ASMET SALUD", "CAPITAL SALUD",
  "SAVIA SALUD", "CAJACOPI EPS", "EMSSANAR", "EPS ALIANSALUD", "EPS SOS",
  "AIC EPSI", "ANAS WAYUU EPSI", "PIJAOS SALUD EPSI", "MALLAMAS EPSI", "COOSALUD",
  "COMFENALCO VALLE", "FERROCARRILES NACIONALES", "POLICIA NACIONAL", "FUERZAS MILITARES",
  "ECOPETROL", "MAGISTERIO (FOMAG)", "UNIVERSIDAD NACIONAL", "OTRA / NO REGISTRA"
].sort();

export const REGIONS = [
  { 
    name: "Cundinamarca", 
    cities: ["Bogotá", "Chía", "Cota", "Cajicá"],
    description: "Perímetro urbano habilitado"
  },
  { 
    name: "Antioquia", 
    cities: ["Medellín", "Rionegro", "Copacabana", "San Antonio de Pereira"],
    description: "Valles de Aburrá y San Nicolás"
  },
  { 
    name: "Valle del Cauca", 
    cities: ["Cali", "Palmira", "Jamundí", "Yumbo"],
    description: "Zona metropolitana de Cali"
  },
  { 
    name: "Eje Cafetero", 
    cities: ["Armenia", "Calarcá", "Pereira", "Dosquebradas", "Manizales", "Villamaría", "Circasia"],
    description: "Triángulo del Café"
  },
  { 
    name: "Costa Atlántica", 
    cities: ["Barranquilla", "Malambo", "Cartagena", "Soledad", "Santa Marta"],
    description: "Principales nodos costeros"
  },
  { 
    name: "Santanderes y Huila", 
    cities: ["Bucaramanga", "Cúcuta", "Neiva"],
    description: "Nodos orientales y sur"
  }
];

export const LEGAL_SCRIPTS = {
  VERSION_INTRO: "Emi, somos su médico personal 24/7 al alcance de su mano donde estés para solucionar dudas y situaciones de salud de manera presencial o virtual. Tenemos acceso multicanal y beneficios como video consulta, orientación médica, atención domiciliaria, acceso a especialistas y cobertura internacional SIEM.",
  MODALITIES: {
    DEBITO: {
      id: 'DEBITO',
      name: 'Débito Automático',
      legal1: "Bajo la modalidad de pago de débito automático de su cuenta de Ahorros/Corriente/Tarjeta de Crédito {BANCO}, terminada en {DIGITOS}, donde se cobra una cuota de inscripción de {VALOR_ADHESION} en emi {PLAN_NAME}. A partir del siguiente mes, continúa pagando una mensualidad de {VALOR_MENSUAL} por cada afiliado, que se debitará los 5 primeros días del mes siguiente. ¿Sí o no?",
    },
    LOCAL_PAGO: {
      id: 'LOCAL_PAGO',
      name: 'Local Pago',
      legal1: "Bajo la modalidad de pago de local pago donde usted podrá realizar los pagos por corresponsal bancario, PSE, web o cajas de oficina. Se cobra una cuota de inscripción de {VALOR_ADHESION} en emi {PLAN_NAME} que le cubre hasta el último día de este mes. A partir del siguiente continúa pagando una mensualidad de {VALOR_MENSUAL} por cada afiliado, los 5 primeros días del mes. ¿Sí o no?",
    },
    DOMICILIARIO: {
      id: 'DOMICILIARIO',
      name: 'Cobro Domiciliario',
      legal1: "Bajo la modalidad de pago de cobro domiciliario en la dirección de residencia indicada por el titular, donde se cobra una cuota de inscripción de {VALOR_ADHESION} en emi {PLAN_NAME}. A partir del siguiente mes continúa pagando una mensualidad de {VALOR_MENSUAL} por cada afiliado, y durante los 5 primeros días uno de nuestros cobradores los estará visitando. ¿Sí o no?",
    }
  },
  TITULAR_TYPES: {
    MISMO_TITULAR: "Usted como titular del servicio contratado, acepta...",
    TERCERO_TITULAR: "Señor/a {TITULAR_NAME}, identificado con cédula {TITULAR_CC}, como titular del servicio para {BENEFICIARIO_NAME}, acepta..."
  }
};

export const BUYER_PERSONAS = [
  {
    id: 'padre_familia',
    name: 'Padre de Familia Preocupado',
    avatar: '👨‍👩‍👧‍👦',
    pains: 'Falta de tiempo, miedo a contagios en clínicas, espera en pediatría.',
    script: 'Usted como cabeza de hogar sabe que la salud de sus hijos no espera a que la EPS asigne una cita. ¿Qué valor tiene para usted que un pediatra esté en su sala en minutos sin exponer a sus pequeños al virus del hospital?'
  },
  {
    id: 'hijo_cuidador',
    name: 'Hijo Cuidador (Adulto Mayor)',
    avatar: '👵',
    pains: 'Dificultad de traslado de padres, fragilidad de salud, soledad.',
    script: 'Sus padres ya le dieron todo, ahora ellos necesitan comodidad. Trasladar a un adulto mayor a urgencias es un trauma físico y emocional. Con EMI, el hospital va a su cuarto. ¿Le daría paz saber que ellos están protegidos aunque usted no esté en casa?'
  },
  {
    id: 'profesional_ocupado',
    name: 'Profesional Autónomo',
    avatar: '💼',
    pains: 'Pérdida de ingresos por tiempo perdido, burocracia de EPS, eficiencia.',
    script: 'Para usted el tiempo es dinero. Una mañana perdida en una sala de espera de la EPS es una mañana que no produce. EMI es el atajo VIP a la salud: video consulta en segundos y médico en casa para que usted no pare su agenda.'
  }
];

export const SAVINGS_METRICS = {
  TAXI_ROUND_TRIP: 45000,
  TIME_VALUE_HOUR: 25000,
  EPS_WAIT_HOURS: 7,
  CLINIC_COPAY: 18000,
  COSTA_REGION_NAME: "Costa Atlántica"
};

export const PLAN_COSTA = {
  EMI_TRADICIONAL: {
    DEBITO: 38100,
    LOCAL_PAGO: 43100
  },
  EMI_PLUS: {
    DEBITO: 44000,
    LOCAL_PAGO: 49000
  }
};

export const OBJECTION_MATRIX = [
  {
    id: 1, topic: "Presupuesto", objection: "Es muy caro / No hay presupuesto.",
    guion: "Entiendo que cuida su dinero. Imagine la paz mental de saber que por $2.000 diarios, menos que un café, tiene un médico en su sala sin pagar un peso más.",
    tracy: "¿El precio es lo único que nos impide trabajar hoy? Véalo como un fondo de ahorro: una sola urgencia particular cuesta 5 meses de nuestra mensualidad.",
    hormozi: "Si no te afilias, igual gastarás ese dinero en taxis y copagos de EPS. Aquí compras tranquilidad ilimitada por el precio de dos pizzas. Es un trato ridículo."
  },
  {
    id: 2, topic: "Decisión", objection: "Debo consultarlo con mi esposo/a.",
    guion: "Valoro que decidan juntos. Si pudiera sentir ahora que ante un vómito a las 3 a.m. un médico llega en minutos, ¿qué diría su pareja?",
    tracy: "Entiendo. Si su pareja estuviera aquí, ¿qué pregunta cree que me haría? Despejémosla para que le lleve la información completa y segura.",
    hormozi: "Entiendo, pero la salud no espera. El bono de $38.500 expira al colgar. Tienes 5 días para retractarte, pero si esperas, pierdes el ahorro hoy."
  },
  {
    id: 3, topic: "Información", objection: "Envíeme la info al WhatsApp.",
    guion: "Claro, ya se la envío. Pero escuche esto: mi sistema solo sostiene el cupo preferencial mientras estamos en línea. Validemos su cobertura rápido.",
    tracy: "Para que la info le sea útil, ¿qué es lo más importante hoy: la rapidez de atención o el ahorro en especialistas? Así le envío solo lo vital.",
    hormozi: "Te la envío, pero tienes 50 chats sin leer. Tardamos 3 minutos en verificar si calificas para el descuento de bienvenida. ¿Cuál es su dirección?"
  },
  {
    id: 4, topic: "Competencia", objection: "Ya tengo Plan Premium / Prepagada.",
    guion: "Excelente que esté protegido. Su plan es de 'hotelería' para cuando ya está en la clínica; EMI es la logística para que no tenga que ir allá.",
    tracy: "Muchos clientes pensaban igual hasta que vieron que EMI resuelve el 80% de los casos en su cama. ¿Prefiere esperar horas en triaje o que el médico llegue?",
    hormozi: "Tener Prepagada sin EMI es como un Ferrari sin llaves. Tienes salud, pero no acceso rápido. Por $2.000 al día saltas la fila de urgencias de la EPS."
  },
  {
    id: 5, topic: "Salud", objection: "Yo casi no me enfermo.",
    guion: "Qué buena noticia. EMI es para proteger esa salud. Nadie planea una apendicitis. Es mejor tener al médico y no necesitarlo, ¿verdad?",
    tracy: "Usted es el perfil ideal: riesgo bajo. Pero la salud no avisa. EMI es su seguro de disponibilidad 24/7. Un solo traslado evitado y se pagó solo.",
    hormozi: "Es como el seguro del auto: pagas para no chocar. Si hoy te da un cólico fuerte, ¿prefieres buscar un taxi o hundir un botón en tu App?"
  },
  {
    id: 6, topic: "Servicio", objection: "Las ambulancias se demoran mucho.",
    guion: "Siento que haya escuchado eso. Por eso creamos la Telemedicina 24/7: mientras la móvil llega, usted ya está hablando con el médico por video.",
    tracy: "Clasificamos por gravedad. En una emergencia vital somos prioridad absoluta. ¿No le daría paz saber que lo atienden en su propia cama y no en una silla?",
    hormozi: "El tráfico es real, por eso resolvemos el 95% de casos en casa vía virtual o presencial. No te dejamos solo; estamos en tu celular en segundos."
  },
  {
    id: 7, topic: "Trámite", objection: "El afiliado ya falleció.",
    guion: "Lamento profundamente su pérdida. Entiendo que su prioridad es organizar todo. Queremos apoyarlos para que el resto de la familia no quede desprotegida.",
    tracy: "Le ofrezco mis condolencias. Para apoyarla, aplicaremos el 'Precio de Lealtad' ($58.800) para que usted mantenga su protección ahora que está sola.",
    hormozi: "Siento mucho lo ocurrido. El trámite es enviar el acta. Pero no dejes que el resto de la familia quede expuesta. Bajemos tu tarifa para que sigas protegida."
  },
  {
    id: 8, topic: "Seguridad", objection: "Me da inseguridad dar mi cuenta bancaria.",
    guion: "Comprendo su cautela. Vea esto: EMI es vigilada por la Supersalud. Solo enlazamos la cuenta para su comodidad, nunca pedimos claves.",
    tracy: "Es una duda razonable. Trabajamos con los principales bancos del país mediante enlaces cifrados. ¿Qué le daría más seguridad para proceder?",
    hormozi: "No pedimos contraseñas, solo el número para cobrarte los $2.000 diarios. Es más seguro que pagarle a un cobrador en la calle. Hagamos el enlace."
  },
  {
    id: 9, topic: "Régimen", objection: "Estoy en el Régimen Subsidiado.",
    guion: "Perfecto. Tenemos un plan especial para usted sin cuota de adhesión y con bonos por hospitalización. Es protección de élite a su alcance.",
    tracy: "Usted también merece atención rápida. Por solo $67.000 (Plan Subsidiado) evita las largas filas de la red pública en la madrugada.",
    hormozi: "El subsidiado no cobra entrada. Son $2.200 al día por tener un pediatra 24/7 en tu celular. No dejes a tus hijos sin ese respaldo."
  },
  {
    id: 10, topic: "Cobertura", objection: "Me mudé a una zona sin cobertura presencial.",
    guion: "Entiendo. Aunque no llegue la móvil, usted sigue teniendo el Médico Virtual 24/7 y asistencia en viajes nacionales e internacionales.",
    tracy: "Si viaja o se mueve, EMI lo acompaña. La Red SIEM lo protege en 14 países. ¿No le gustaría mantener la orientación médica en su celular?",
    hormozi: "Perder el servicio físico no significa perder al médico. Tienes chats y videollamadas ilimitadas. Por la mitad del precio sigues conectado."
  },
  {
    id: 11, topic: "Contrato", objection: "¿Hay cláusula de permanencia?",
    guion: "Para nada. Usted es libre. Estamos tan seguros de nuestro servicio que puede retirarse cuando quiera avisando 30 días antes.",
    tracy: "Nuestra meta es que se quede por calidad, no por contrato. Puede probar la experiencia EMI hoy y decidir mes a mes.",
    hormozi: "Cero contratos largos. Entras hoy, si no te gusta, te vas. Pero una vez que veas que el médico llega a tu casa, no querrás volver a las filas."
  },
  {
    id: 12, topic: "Tarifa", objection: "La tarifa me aumentó mucho este año.",
    guion: "Veo lo que dice. Por eso lo llamo: para dejarle una tarifa fija y permanente de $58.800 al afiliar a su familiar hoy.",
    tracy: "Entiendo su malestar. Mi labor hoy es ajustar su plan como Cliente Preferencial para que ese valor no vuelva a subir de forma inesperada.",
    hormozi: "El sistema sube precios si no estás en plan grupal. Si agregas a tu hijo hoy, tu precio baja y el de él queda en bono. Es ganar-ganar."
  },
  {
    id: 13, topic: "Venta Cruzada", objection: "No tengo a quién más afiliar.",
    guion: "No hay problema. Puede afiliarse usted mismo como beneficiario para que también reciba la atención y baje el costo de su factura total.",
    tracy: "A veces pensamos solo en los demás. Pero usted es quien paga; ¿no cree que usted también merece ser atendido en casa si se enferma?",
    hormozi: "Afíliate tú. Pagas casi lo mismo por uno que por dos en el plan tradicional. Es como tener un segundo servicio gratis. ¿Lo activamos?"
  },
  {
    id: 14, topic: "Pago", objection: "Prefiero pagar en el banco o corresponsal.",
    guion: "Claro, puede hacerlo por 'Local Pago'. Es un poco más, pero le da la libertad de pagar donde quiera (Efecty, Bancolombia).",
    tracy: "Si la comodidad es su prioridad, el débito automático le ahorra $13.000 mensuales y no tiene que hacer filas. ¿Le parece un buen ahorro?",
    hormozi: "Pagar en caja es tirar $150.000 al año a la basura. Enlaza tu cuenta, ahorra ese dinero y olvídate de las fechas de vencimiento."
  },
  {
    id: 15, topic: "ADRES", objection: "Mi EPS está suspendida / No aparezco.",
    guion: "No se preocupe. Solo necesitamos que descargue el certificado de que pertenece a una EPS. Con eso legalizamos su protección hoy mismo.",
    tracy: "Para servirle como complemento, el sistema exige estar en una entidad de salud. Si me envía el pantallazo de ADRES, procedemos de una vez.",
    hormozi: "Sin EPS no hay EMI. Es la ley. Descarga el certificado de Sanitas en 2 minutos, me lo pasas y activamos tu médico personal hoy."
  },
  {
    id: 16, topic: "Seguridad Hospitalaria", objection: "Me da miedo el hospital por los virus.",
    guion: "Esa es la razón principal de EMI. Evitamos que se exponga a virus intrahospitalarios resolviendo el 95% de casos en su hogar.",
    tracy: "Usted tiene toda la razón. Ir a urgencias es un riesgo. Con EMI, el médico va a su cama con protocolos de bioseguridad estrictos.",
    hormozi: "Ir al hospital por una gripe es buscarse un problema mayor. Quédate en tu cama, que nosotros llevamos la clínica a tu casa."
  },
  {
    id: 17, topic: "Cierre", objection: "Llámeme el próximo mes, estoy ocupado.",
    guion: "Entiendo su tiempo. Pero el bono de $38.500 es solo por hoy. Validemos su dirección en 60 segundos para que no pierda el beneficio.",
    tracy: "¿Qué va a cambiar el próximo mes? La salud no avisa. Permítame 2 minutos para explicarle por qué hoy es el día más económico para entrar.",
    hormozi: "Si colgamos, el precio sube. Tu familia queda desprotegida 30 noches más. Hagámoslo en 3 minutos y duerme tranquilo hoy."
  },
  {
    id: 18, topic: "Calidad", objection: "¿Cómo sé si los médicos son buenos?",
    guion: "Gran pregunta. Todos nuestros médicos están certificados y entrenados en Soporte Vital Avanzado. Son expertos en urgencias en casa.",
    tracy: "Somos parte de Falck (Dinamarca), líderes mundiales con 118 años de experiencia. Atendemos más de 9 millones de servicios al año.",
    hormozi: "No mandamos practicantes. Mandamos tripulaciones con médico y paramédico equipados con tecnología de punta. Calidad garantizada."
  },
  {
    id: 19, topic: "Cobro", objection: "Me preocupa que me cobren doble.",
    guion: "Le aseguro que no pasará. Unificamos su cuenta para que pague un solo valor mensual debitado los primeros 5 días. Todo es transparente.",
    tracy: "Es una preocupación válida. El sistema genera una factura unificada. Usted recibirá el soporte en su correo antes de cada cobro.",
    hormozi: "Cero enredos. Te llega un correo con el contrato y el valor exacto. Si ves un peso de más, puedes reclamar ante la Supersalud."
  },
  {
    id: 20, topic: "Especialistas", objection: "Necesito especialistas rápido.",
    guion: "Lo entiendo. Con EMI Especialistas accede a más de 900 expertos con citas en menos de 5 días hábiles y tarifas preferenciales.",
    tracy: "En la EPS una cita tarda meses. Con nosotros tiene prioridad. ¿Qué especialista usa más? Podemos darle la cita para la próxima semana.",
    hormozi: "Deja de rogarle a la EPS. Por $88.000 tienes al especialista que quieras, cuando quieras. Es el acceso más rápido de Colombia."
  }
];

export const PLANS: Record<string, EmiPlan> = {
  EMI_PLUS_DEBITO: {
    id: 'EMI_PLUS_DEBITO',
    name: 'EMI Plus Débito',
    code: '(1091) 1100108',
    argument: 'Aproveche que con su cuenta de ahorros o corriente el servicio le queda más económico y con cobertura Plus: urgencias odontológicas incluidas y médico en casa sin pagar nada extra.',
    objection: 'Precisamente porque ya tiene EPS sabe que los tiempos de espera son largos. EMI Plus es su médico privado que llega en menos de 90 min sin que usted gaste un peso de más.',
    adhesionFee: 44400,
    tariffs: [
      { affiliates: 1, valuePerPerson: 69300, totalGroup: 69300 },
      { affiliates: 2, valuePerPerson: 64600, totalGroup: 129200 },
      { affiliates: 3, valuePerPerson: 61700, totalGroup: 185100 },
      { affiliates: 4, valuePerPerson: 59900, totalGroup: 239600 },
      { affiliates: 5, valuePerPerson: 59900, totalGroup: 299500 }
    ]
  },
  EMI_TRADICIONAL_DEBITO: {
    id: 'EMI_TRADICIONAL_DEBITO',
    name: 'EMI Tradicional Débito',
    code: '(1091) 1100108',
    argument: 'Es nuestro plan más equilibrado. Atención médica 24/7 en su domicilio con la comodidad del débito automático para que nunca se quede sin servicio.',
    objection: 'La EPS atiende su salud básica, nosotros atendemos su tranquilidad. Un médico en su sala por una pequeña cuota mensual que se debita sola.',
    adhesionFee: 38500,
    tariffs: [
      { affiliates: 1, valuePerPerson: 63400, totalGroup: 63400 },
      { affiliates: 2, valuePerPerson: 58800, totalGroup: 117600 },
      { affiliates: 3, valuePerPerson: 55800, totalGroup: 167400 },
      { affiliates: 4, valuePerPerson: 54000, totalGroup: 216000 },
      { affiliates: 5, valuePerPerson: 54000, totalGroup: 270000 }
    ]
  },
  EMI_PLUS_DOMICILIO: {
    id: 'EMI_PLUS_DOMICILIO',
    name: 'EMI Plus Domicilio',
    code: '(1090) 1100107',
    argument: 'Ideal para quienes prefieren pagar en efectivo o por recaudo. Cobertura total Plus con Odontología y especialistas a precio preferencial.',
    objection: 'No necesita bancos. El plan más robusto para proteger a los suyos, pagando cómodamente desde su casa u oficina.',
    adhesionFee: 44400,
    tariffs: [
      { affiliates: 1, valuePerPerson: 81900, totalGroup: 81900 },
      { affiliates: 2, valuePerPerson: 75900, totalGroup: 151800 },
      { affiliates: 3, valuePerPerson: 72200, totalGroup: 216600 },
      { affiliates: 4, valuePerPerson: 68800, totalGroup: 275200 },
      { affiliates: 5, valuePerPerson: 68800, totalGroup: 344000 }
    ]
  },
  EMI_TRADICIONAL_DOMICILIO: {
    id: 'EMI_TRADICIONAL_DOMICILIO',
    name: 'EMI Tradicional Domicilio',
    code: '(1090) 1100107',
    argument: 'Protección inmediata 24/7. El médico va a donde usted esté y el pago se gestiona directamente en su domicilio.',
    objection: 'Piense en la última vez que tuvo que salir a urgencias a media noche. Por este valor, el médico será quien vaya a buscarlo a usted.',
    adhesionFee: 38500,
    tariffs: [
      { affiliates: 1, valuePerPerson: 76000, totalGroup: 76000 },
      { affiliates: 2, valuePerPerson: 70000, totalGroup: 140000 },
      { affiliates: 3, valuePerPerson: 66300, totalGroup: 198900 },
      { affiliates: 4, valuePerPerson: 63000, totalGroup: 252000 },
      { affiliates: 5, valuePerPerson: 63000, totalGroup: 315000 }
    ]
  },
  EMI_SUBSIDIADO: {
    id: 'EMI_SUBSIDIADO',
    name: 'EMI Subsidiado',
    code: '(1110853)',
    argument: 'Porque su salud no tiene estratos. Un plan diseñado exclusivamente para el régimen subsidiado con la misma calidad de médicos EMI.',
    objection: 'Estar en el subsidiado no significa esperar. Con EMI tiene línea prioritaria y médico en casa para que su familia esté siempre segura.',
    adhesionFee: 0,
    tariffs: [
      { affiliates: 1, valuePerPerson: 67000, totalGroup: 67000 },
      { affiliates: 2, valuePerPerson: 64500, totalGroup: 129000 },
      { affiliates: 3, valuePerPerson: 61333, totalGroup: 184000 },
      { affiliates: 4, valuePerPerson: 58625, totalGroup: 234500 },
      { affiliates: 5, valuePerPerson: 58625, totalGroup: 293125 }
    ]
  }
};

export const BANKS = [
  "Bancolombia", "Davivienda", "BBVA", "Banco de Bogotá", "Av Villas", 
  "Banco de Occidente", "Banco Falabella", "Caja Social", "Colpatria", 
  "Itaú-Corpbanca", "Popular", "Helm Bank", "City Bank", "Colmena", "Sudameris"
];

export const EMOTIONAL_BENEFITS = {
  CORE: [
    { emoji: '🛡️', title: 'Prevención Total', desc: 'Evite que un síntoma leve se convierta en una urgencia grave.' },
    { emoji: '🚫', title: 'Cero Automedicación', desc: 'Hable con un médico real antes de tomar cualquier fármaco.' },
    { emoji: '🛋️', title: 'Comodidad Absoluta', desc: 'Atención en la sala de su casa, sin filas ni salas de espera.' },
    { emoji: '📱', title: 'Médico en su Bolsillo', desc: 'Orientación inmediata por chat o video desde cualquier lugar.' }
  ],
  PLUS_ONLY: [
    { emoji: '🦷', title: 'Odontología Express', desc: 'Solución inmediata ante dolores de muela inesperados.' },
    { emoji: '👨‍⚕️', title: 'Acceso VIP a Especialistas', desc: 'Citas rápidas sin pasar por el médico general de la EPS.' }
  ],
  PEDIATRIA: { emoji: '👶', title: 'Protección Infantil', desc: 'No exponga a sus hijos a los virus de las salas de urgencias.' },
  ADULTO_MAYOR: { emoji: '👵', title: 'Dignidad y Cuidado', desc: 'Evite traslados traumáticos para sus padres; nosotros vamos a ellos.' }
};

export const BENEFITS = [
  { id: 'emergencias', label: 'Emergencias médicas 24/7', icon: 'AlertCircle' },
  { id: 'domiciliaria', label: 'Consulta domiciliaria', icon: 'Home' },
  { id: 'urgencias', label: 'Urgencias domiciliarias', icon: 'Zap' },
  { id: 'video', label: 'Videoconsulta médica', icon: 'Video' },
  { id: 'chat', label: 'Chat orientación médica', icon: 'MessageSquare' },
  { id: 'linea', label: 'Línea médica 24/7', icon: 'Phone' },
  { id: 'odontologia', label: 'Urgencias odontológicas (Plus)', icon: 'Activity' },
  { id: 'pediatria', label: 'Videoconsulta pediátrica', icon: 'Baby' },
  { id: 'examenes', label: 'Lectura de exámenes', icon: 'FileText' },
  { id: 'siem', label: 'Red SIEM nacional e intl.', icon: 'Globe' },
  { id: 'especialistas', label: '+900 especialistas', icon: 'Users' },
  { id: 'alianzas', label: 'EMI Beneficios/alianzas', icon: 'Gift' },
  { id: 'historia', label: 'Historia clínica digital', icon: 'Clipboard' },
  { id: 'copagos', label: 'Sin copagos', icon: 'CheckCircle' },
  { id: 'preexistencias', label: 'Sin preexistencias', icon: 'CheckCircle' },
  { id: 'edad', label: 'Sin límite de edad', icon: 'CheckCircle' },
  { id: 'uso', label: 'Sin límite de uso', icon: 'CheckCircle' },
  { id: 'medicamentos', label: 'Medicamentos incluidos', icon: 'CheckCircle' }
];

export const SCRIPTS = {
  intro: `Buenos días/tardes sr/Sra. [NOMBRE], mi nombre es [ASESOR], Ejecutivo Comercial del grupo emi. Le recuerdo que esta llamada es grabada y monitoreada para efectos de calidad en el servicio.`,
  legal1_direct: `Señor/a [NOMBRE], acepta usted el servicio contratado con grupo emi s.a.s., a nombre del titular [TITULAR], identificado con cedula [CEDULA]. Bajo la modalidad de pago de débito automático de su cuenta de [BANCO], terminada en [DIGITOS]...`,
  legal2: `¿Certifica usted que conoce y acepta todos los términos y condiciones del contrato, así como la política de tratamiento de datos personales de grupo emi s.a.s?`,
  legal3: `Autoriza usted a grupo emi s.a.s. para validar su identidad por medio de 5 preguntas.`,
  close: `Le confirmo que el proceso fue exitoso. Recibirá un correo de bienvenida en 72 horas hábiles.`
};
