/**
 * EMI FALCK Asistente de Ventas v3.0
 * Constantes y datos de configuración
 */

import {
  DocumentType,
  Regime,
  AffiliateStatus,
  AffiliateType,
  EmiPlan,
} from './types';

// ═══════════════════════════════════════════════════════════════════
// LISTA DE EPS
// ═══════════════════════════════════════════════════════════════════
export const EPS_LIST = [
  'Aliansalud',
  'Asmet Salud',
  'Cafesalud',
  'Capital Salud',
  'Colsanitas',
  'Comfenalco Valle',
  'Compensar',
  'Coosalud',
  'Coomeva',
  'Cruz Blanca',
  'Ecoopsos',
  'Emssanar',
  'EPS Sura / Suramericana',
  'Famisanar',
  'Golden Group',
  'Medimás',
  'Mutual Ser',
  'Nueva EPS',
  'Pijaos Salud',
  'Salud Total',
  'Sanitas EPS',
  'Savia Salud',
];

// ═══════════════════════════════════════════════════════════════════
// PLANES EMI 2026
// Fuente: Tarifario_2026_EMI.pdf
// ═══════════════════════════════════════════════════════════════════
export const PLANS: EmiPlan[] = [
  {
    id: 'PLUS_DEB',
    name: 'EMI Plus - Débito Automático',
    code: '(1110001)',
    tariffs: [
      { affiliates: 1, valuePerPerson: 77400, totalGroup: 77400 },
      { affiliates: 2, valuePerPerson: 71400, totalGroup: 142800 },
      { affiliates: 3, valuePerPerson: 68200, totalGroup: 204600 },
      { affiliates: 4, valuePerPerson: 65600, totalGroup: 262400 },
      { affiliates: 5, valuePerPerson: 65600, totalGroup: 328000 },
    ],
    adhesionFee: 0,
    argument: 'Plan completo con cobertura total',
    objection: 'El precio es lo único que nos impide trabajar hoy.',
  },
  {
    id: 'PLUS_LOC',
    name: 'EMI Plus - Local Pago',
    code: '(1110002)',
    tariffs: [
      { affiliates: 1, valuePerPerson: 87400, totalGroup: 87400 },
      { affiliates: 2, valuePerPerson: 81400, totalGroup: 162800 },
      { affiliates: 3, valuePerPerson: 78200, totalGroup: 234600 },
      { affiliates: 4, valuePerPerson: 75600, totalGroup: 302400 },
      { affiliates: 5, valuePerPerson: 75600, totalGroup: 378000 },
    ],
    adhesionFee: 0,
    argument: 'Flexibilidad de pago sin débito automático',
    objection: 'Prefiero pagar en el banco o corresponsal.',
  },
  {
    id: 'PLUS_DOM',
    name: 'EMI Plus - Cobro Domiciliario',
    code: '(1110003)',
    tariffs: [
      { affiliates: 1, valuePerPerson: 92400, totalGroup: 92400 },
      { affiliates: 2, valuePerPerson: 86400, totalGroup: 172800 },
      { affiliates: 3, valuePerPerson: 83200, totalGroup: 249600 },
      { affiliates: 4, valuePerPerson: 80600, totalGroup: 322400 },
      { affiliates: 5, valuePerPerson: 80600, totalGroup: 403000 },
    ],
    adhesionFee: 0,
    argument: 'Cobranza en la puerta de tu casa',
    objection: 'Prefiero no dar datos de mi cuenta bancaria.',
  },
  {
    id: 'TRAD_DEB',
    name: 'EMI Tradicional - Débito Automático',
    code: '(1110004)',
    tariffs: [
      { affiliates: 1, valuePerPerson: 58800, totalGroup: 58800 },
      { affiliates: 2, valuePerPerson: 54100, totalGroup: 108200 },
      { affiliates: 3, valuePerPerson: 51400, totalGroup: 154200 },
      { affiliates: 4, valuePerPerson: 49400, totalGroup: 197600 },
      { affiliates: 5, valuePerPerson: 49400, totalGroup: 247000 },
    ],
    adhesionFee: 0,
    argument: 'Plan esencial con buena cobertura',
    objection: 'No hay presupuesto para esto.',
  },
  {
    id: 'TRAD_LOC',
    name: 'EMI Tradicional - Local Pago',
    code: '(1110005)',
    tariffs: [
      { affiliates: 1, valuePerPerson: 68800, totalGroup: 68800 },
      { affiliates: 2, valuePerPerson: 64100, totalGroup: 128200 },
      { affiliates: 3, valuePerPerson: 61400, totalGroup: 184200 },
      { affiliates: 4, valuePerPerson: 59400, totalGroup: 237600 },
      { affiliates: 5, valuePerPerson: 59400, totalGroup: 297000 },
    ],
    adhesionFee: 0,
    argument: 'Plan esencial con flexibilidad de pago',
    objection: 'Es muy caro para mi presupuesto.',
  },
  {
    id: 'TRAD_DOM',
    name: 'EMI Tradicional - Cobro Domiciliario',
    code: '(1110006)',
    tariffs: [
      { affiliates: 1, valuePerPerson: 73800, totalGroup: 73800 },
      { affiliates: 2, valuePerPerson: 69100, totalGroup: 138200 },
      { affiliates: 3, valuePerPerson: 66400, totalGroup: 199200 },
      { affiliates: 4, valuePerPerson: 64400, totalGroup: 257600 },
      { affiliates: 5, valuePerPerson: 64400, totalGroup: 322000 },
    ],
    adhesionFee: 0,
    argument: 'Plan esencial con cobranza a domicilio',
    objection: 'Debo consultarlo con mi pareja.',
  },
  {
    id: 'SUBSIDIADO',
    name: 'EMI Subsidiado',
    code: '(1110007)',
    tariffs: [
      { affiliates: 1, valuePerPerson: 67000, totalGroup: 67000 },
      { affiliates: 2, valuePerPerson: 62300, totalGroup: 124600 },
      { affiliates: 3, valuePerPerson: 59600, totalGroup: 178800 },
      { affiliates: 4, valuePerPerson: 57600, totalGroup: 230400 },
      { affiliates: 5, valuePerPerson: 57600, totalGroup: 288000 },
    ],
    adhesionFee: 0,
    argument: 'Plan para régimen subsidiado',
    objection: 'Estoy en el régimen subsidiado.',
  },
  {
    id: 'VIRTUAL',
    name: 'EMI Virtual',
    code: '(1097) 1100174',
    tariffs: [
      { affiliates: 1, valuePerPerson: 26400, totalGroup: 26400 },
      { affiliates: 2, valuePerPerson: 26400, totalGroup: 52800 },
      { affiliates: 3, valuePerPerson: 26400, totalGroup: 79200 },
      { affiliates: 4, valuePerPerson: 24600, totalGroup: 98400 },
      { affiliates: 5, valuePerPerson: 24600, totalGroup: 123000 },
    ],
    adhesionFee: 0,
    argument: 'Solo consultas virtuales sin urgencias presenciales',
    objection: 'Me mudé a una zona sin cobertura presencial.',
  },
];

// ═══════════════════════════════════════════════════════════════════
// PLAN COSTA (Especial para ciudades costeras)
// Tarifas fijas únicas por persona, sin cuota de adhesión
// Facturación diaria
// ═══════════════════════════════════════════════════════════════════
export const PLAN_COSTA = {
  TRAD_DEB: 38100,
  PLUS_DEB: 44000,
  TRAD_LOC: 43100,
  PLUS_LOC: 49000,
};

export const CIUDADES_COSTA = ['Barranquilla', 'Cartagena', 'Malambo', 'Santa Marta', 'Soledad'];

// ═══════════════════════════════════════════════════════════════════
// CONTACTOS POR CIUDAD (Números locales dinámicos)
// ═══════════════════════════════════════════════════════════════════
export const CONTACTOS_CIUDADES = {
  BOGOTA: { ciudad: 'Bogotá', numeros: ['601 745 7859', '601 482 4040'] },
  BARRANQUILLA: { ciudad: 'Barranquilla', numeros: ['605 309 1823', '605 311 0100'] },
  CARTAGENA: { ciudad: 'Cartagena', numeros: ['605 693 1313', '605 642 4953'] },
  CALI: { ciudad: 'Cali', numeros: ['602 653 1313', '602 487 8995'] },
  CHIA: { ciudad: 'Chía - Cota - Cajicá', numeros: ['601 745 7859', '601 482 4040'] },
  MANIZALES: { ciudad: 'Manizales', numeros: ['604 887 9911', '604 896 8267'] },
  MEDELLIN: { ciudad: 'Medellín', numeros: ['604 444 1330', '604 604 5853'] },
  PALMIRA: { ciudad: 'Palmira', numeros: ['602 285 5161', '602 487 8995'] },
  RIONEGRO: { ciudad: 'Rionegro', numeros: ['604 444 1330', '604 604 5853'] },
  PEREIRA: { ciudad: 'Pereira', numeros: ['606 313 5911', '606 348 9141'] },
  ARMENIA: { ciudad: 'Armenia', numeros: ['606 731 4031', '606 736 2643'] },
  CUCUTA: { ciudad: 'Cúcuta', numeros: ['607 574 8942', '607 598 8020', '316 473 6949'] },
  SANTA_MARTA: { ciudad: 'Santa Marta', numeros: ['605 423 7201', '605 311 1150', '316 473 6949'] },
  BUCARAMANGA: { ciudad: 'Bucaramanga', numeros: ['607 657 7171', '607 689 8020', '316 473 6949'] },
};

// ═══════════════════════════════════════════════════════════════════
// BENEFICIOS POR PLAN (DINÁMICOS)
// ═══════════════════════════════════════════════════════════════════
export const BENEFITS = [
  { id: '1', emoji: '🚑', title: 'Urgencias 24/7', desc: 'Médico en puerta <45 min' },
  { id: '2', emoji: '📱', title: 'Videoconsulta', desc: 'Ilimitada, sin costo extra' },
  { id: '3', emoji: '💬', title: 'Chat Médico', desc: 'Orientación inmediata' },
  { id: '4', emoji: '🏠', title: 'Comodidad Total', desc: 'Sin filas ni salas de espera' },
  { id: '5', emoji: '👶', title: 'Protección Infantil', desc: 'Pediatra 24/7 a domicilio' },
  { id: '6', emoji: '🦷', title: 'Urgencias Odonto', desc: 'Sin dolor de muela sin solución' },
  { id: '7', emoji: '👨‍⚕️', title: '900+ Especialistas', desc: 'Tarifa preferencial VIP' },
  { id: '8', emoji: '🌎', title: 'Red SIEM', desc: 'Cobertura nacional e intl.' },
];

export const BENEFITS_BY_PLAN = {
  PLUS_DEB: ['1', '2', '3', '4', '5', '6', '7', '8'],
  PLUS_LOC: ['1', '2', '3', '4', '5', '6', '7', '8'],
  PLUS_DOM: ['1', '2', '3', '4', '5', '6', '7', '8'],
  TRAD_DEB: ['1', '2', '3', '4', '5', '6', '8'],
  TRAD_LOC: ['1', '2', '3', '4', '5', '6', '8'],
  TRAD_DOM: ['1', '2', '3', '4', '5', '6', '8'],
  SUBSIDIADO: ['1', '2', '3', '4', '5', '8'],
  VIRTUAL: ['2', '3', '8'],
};

// ═══════════════════════════════════════════════════════════════════
// MATRICES Y SCRIPTS
// ═══════════════════════════════════════════════════════════════════
export const OBJECTION_MATRIX = [
  {
    objection: 'Es muy caro / No hay presupuesto.',
    topic: 'Presupuesto',
    responses: {
      guion: 'Entiendo que cuida su dinero. Imagine la paz mental de saber que por $2.000 diarios, menos que un café, tiene un médico en su sala sin pagar un peso más.',
      tracy: '¿El precio es lo único que nos impide trabajar hoy? Véalo como un fondo de ahorro: una sola urgencia particular cuesta 5 meses de nuestra mensualidad.',
      hormozi: 'Si no te afilias, igual gastarás ese dinero en taxis y copagos de EPS. Aquí compras tranquilidad ilimitada por el precio de dos pizzas. Es un trato ridículo.',
    },
  },
  {
    objection: 'Debo consultarlo con mi pareja.',
    topic: 'Decisión',
    responses: {
      guion: 'Valoro que decidan juntos. Si pudiera sentir ahora que ante un vómito a las 3 a.m. un médico llega en minutos, ¿qué diría su pareja?',
      tracy: 'Entiendo. Si su pareja estuviera aquí, ¿qué pregunta cree que me haría? Despejémosla para que le lleve la información completa y segura.',
      hormozi: 'Entiendo, pero la salud no espera. El bono de $38.500 expira al colgar. Tienes 5 días para retractarte, pero si esperas, pierdes el ahorro hoy.',
    },
  },
  {
    objection: 'Envíeme la info al WhatsApp.',
    topic: 'Información',
    responses: {
      guion: 'Claro, ya se la envío. Pero escuche: mi sistema solo sostiene el cupo preferencial mientras estamos en línea. Validemos su cobertura rápido.',
      tracy: 'Para que la info le sea útil, ¿qué es lo más importante hoy: la rapidez de atención o el ahorro en especialistas? Así le envío solo lo vital.',
      hormozi: 'Te la envío, pero tienes 50 chats sin leer. Tardamos 3 minutos en verificar si calificas para el descuento de bienvenida. ¿Cuál es su dirección?',
    },
  },
];

export const SCRIPTS = {
  opening: '"Buenos días/tardes, [Sr/Sra], mi nombre es [Su Nombre] y me comunico como Ejecutivo Comercial de Grupo EMI."',
  recording: '"Le recuerdo que esta llamada es grabada y monitoreada para efectos de calidad en el servicio."',
  engagement: '"Veo que usted es un cliente preferencial EMI, ¿cómo le ha ido con nuestro servicio médico en casa?"',
};

export const LEGAL_SCRIPTS = {
  debito: '"Señor/a [Nombre], bajo la modalidad de pago de débito automático de su cuenta de [Tipo]/[Banco], terminada en [Dígitos], donde se cobra una cuota de inscripción de $[Adhesión] en EMI [Plan]. A partir del siguiente mes, continúa pagando una mensualidad de $[Tarifa] por cada afiliado, que se debitará los 5 primeros días del mes siguiente. ¿Sí o no?"',
  local: '"Señor/a [Nombre], bajo la modalidad de pago de local pago donde usted podrá realizar los pagos por corresponsal bancario, PSE, web o cajas de oficina. Se cobra una cuota de inscripción de $[Adhesión] en EMI [Plan] que le cubre hasta el último día de este mes. A partir del siguiente continúa pagando una mensualidad de $[Tarifa] por cada afiliado, los 5 primeros días del mes. ¿Sí o no?"',
};

export const BUYER_PERSONAS = [
  {
    id: 'padre_familia',
    name: 'Padre/Madre de Familia',
    emoji: '👨‍👩‍👧',
    script: '"Como cabeza de hogar, usted sabe que la salud de sus hijos no espera. ¿Qué valor tiene para usted que un pediatra esté en su sala en minutos, sin exponer a sus pequeños al virus del hospital?"',
  },
  {
    id: 'independiente',
    name: 'Adulto Independiente',
    emoji: '💼',
    script: '"Usted trabaja duro y sabe que el tiempo es dinero. ¿Cuántas horas ha perdido en urgencias? Con EMI eso se acabó — médico en su casa, usted sigue produciendo."',
  },
  {
    id: 'cuidador',
    name: 'Hijo Cuidador',
    emoji: '👴',
    script: '"¿Tiene a sus padres solos en casa? Una caída, un dolor de pecho, un mareo — EMI es la red de seguridad que le permite trabajar tranquilo sabiendo que un médico puede estar con ellos en minutos."',
  },
  {
    id: 'corporativo',
    name: 'Perfil Corporativo',
    emoji: '🏢',
    script: '"El ausentismo laboral por salud le cuesta a su empresa. EMI reduce visitas a clínicas en un 80% al resolver los casos en casa. Es una inversión, no un gasto."',
  },
];

export const REGIONS = [
  {
    name: 'Bogotá y Alrededores',
    cities: ['Bogotá', 'Chía', 'Cota', 'Cajicá'],
  },
  {
    name: 'Costa Atlántica',
    cities: ['Barranquilla', 'Cartagena', 'Santa Marta'],
  },
  {
    name: 'Valle del Cauca',
    cities: ['Cali', 'Palmira'],
  },
  {
    name: 'Eje Cafetero',
    cities: ['Manizales', 'Pereira', 'Armenia'],
  },
  {
    name: 'Medellín y Alrededores',
    cities: ['Medellín', 'Rionegro'],
  },
  {
    name: 'Oriente Colombiano',
    cities: ['Bucaramanga', 'Cúcuta'],
  },
];

export const BANKS = [
  'Bancolombia',
  'Banco de Bogotá',
  'Banco del Occidente',
  'BBVA',
  'Citibanamex',
  'Davivienda',
  'Itaú',
  'Nequi',
  'Rappipay',
  'Scotiabank',
];

export const EMOTIONAL_BENEFITS = [
  { metric: 'Tranquilidad', value: '100%', description: 'Saber que está protegido 24/7' },
  { metric: 'Ahorro de tiempo', value: '80%', description: 'Menos trámites y esperas' },
  { metric: 'Rapidez', value: '45 min', description: 'Médico en puerta máximo' },
  { metric: 'Cobertura', value: '14 países', description: 'Protección en el extranjero' },
];

export const SAVINGS_METRICS = [
  { period: 'Mensual', amount: '2,000 COP', description: 'Ahorro vs copagos EPS' },
  { period: 'Semestral', amount: '120,000 COP', description: 'En traslados y esperas' },
  { period: 'Anual', amount: '240,000 COP', description: 'Suma equivalente a un mes extra' },
];

