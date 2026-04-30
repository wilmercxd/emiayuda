import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Download, 
  Clipboard, 
  RefreshCw, 
  Shield, 
  Phone, 
  Info, 
  User, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- DATA ---
const TAR: Record<string, any> = {
  // PLUS (8/8 Beneficios)
  PLUS_DEB:  {n:'EMI Plus Débito',        t:{1:77400, 2:71400, 3:68200, 4:65600, 5:65600}, adh:44400, mod:'DEB', label:'Débito automático'},
  PLUS_LOC:  {n:'EMI Plus Local Pago',   t:{1:87400, 2:81400, 3:78200, 4:75600, 5:75600}, adh:44400, mod:'LOC', label:'Caja y corresponsales'},
  PLUS_DOM:  {n:'EMI Plus Domicilio',    t:{1:92400, 2:86400, 3:83200, 4:80600, 5:80600}, adh:44400, mod:'DOM', label:'Cobro domiciliario'},
  // TRADICIONAL (6/8 Beneficios)
  TRAD_DEB:  {n:'EMI Tradicional Débito', t:{1:58800, 2:54100, 3:51400, 4:49400, 5:49400}, adh:38500, mod:'DEB', label:'Débito automático'},
  TRAD_LOC:  {n:'EMI Tradicional Local',  t:{1:68800, 2:64100, 3:61400, 4:59400, 5:59400}, adh:38500, mod:'LOC', label:'Caja y corresponsales'},
  TRAD_DOM:  {n:'EMI Tradicional Domic.', t:{1:73800, 2:69100, 3:66400, 4:64400, 5:64400}, adh:38500, mod:'DOM', label:'Cobro domiciliario'},
  // ESPECIALES
  SUBSIDIADO:{n:'EMI Subsidiado',         t:{1:67000, 2:67000, 3:67000, 4:67000, 5:67000}, adh:0,     mod:'DEB', label:'Débito automático'},
  VIRTUAL:   {n:'EMI Virtual',            t:{1:26400, 2:26400, 3:26400, 4:24600, 5:24600}, adh:0,     mod:'DEB', label:'Débito automático'},
};

const EF_CIUDADES: Record<string, any> = {
  'BOGOTA': {ciudad: 'Bogotá', numeros: ['601 745 7859', '601 482 4040']},
  'BARRANQUILLA': {ciudad: 'Barranquilla', numeros: ['605 309 1823', '605 311 0100']},
  'CARTAGENA': {ciudad: 'Cartagena', numeros: ['605 693 1313', '605 642 4953']},
  'CALI': {ciudad: 'Cali', numeros: ['602 653 1313', '602 487 8995']},
  'CHIA': {ciudad: 'Chía - Cota - Cajicá', numeros: ['601 745 7859', '601 482 4040']},
  'COTA': {ciudad: 'Chía - Cota - Cajicá', numeros: ['601 745 7859', '601 482 4040']},
  'CAJICA': {ciudad: 'Chía - Cota - Cajicá', numeros: ['601 745 7859', '601 482 4040']},
  'MANIZALES': {ciudad: 'Manizales', numeros: ['604 887 9911', '604 896 8267']},
  'MEDELLIN': {ciudad: 'Medellín', numeros: ['604 444 1330', '604 604 5853']},
  'PALMIRA': {ciudad: 'Palmira', numeros: ['602 285 5161', '602 487 8995']},
  'RIONEGRO': {ciudad: 'Rionegro', numeros: ['604 444 1330', '604 604 5853']},
  'PEREIRA': {ciudad: 'Pereira', numeros: ['606 313 5911', '606 348 9141']},
  'ARMENIA': {ciudad: 'Armenia', numeros: ['606 731 4031', '606 736 2643']},
  'CUCUTA': {ciudad: 'Cúcuta', numeros: ['607 574 8942', '607 598 8020', '316 473 6949']},
  'SANTA MARTA': {ciudad: 'Santa Marta', numeros: ['605 423 7201', '605 311 1150', '316 473 6949']},
  'BUCARAMANGA': {ciudad: 'Bucaramanga', numeros: ['607 657 7171', '607 689 8020', '316 473 6949']},
};

const COSTA_CITIES = ['Barranquilla', 'Cartagena', 'Malambo', 'Santa Marta', 'Soledad'];
const COSTA_PRICES: any = {
  TRAD_DEB: 38100, PLUS_DEB: 44000,
  TRAD_LOC: 43100, PLUS_LOC: 49000
};

const PERSONAS = [
  {id:'familia',  e:'👨‍👩‍👧', n:'Padre/Madre de Familia', s:'"Como cabeza de hogar, usted sabe que la salud de sus hijos no espera. ¿Qué valor tiene para usted que un pediatra esté en su sala en minutos, sin exponer a sus pequeños al virus del hospital?"'},
  {id:'soltero',  e:'💼', n:'Adulto Independiente',     s:'"Usted trabaja duro y sabe que el tiempo es dinero. ¿Cuántas horas ha perdido en urgencias? Con EMI eso se acabó — médico en su casa, usted sigue produciendo."'},
  {id:'cuidador', e:'👴', n:'Hijo Cuidador',             s:'"¿Tiene a sus padres solos en casa? Una caída, un dolor de pecho, un mareo — EMI es la red de seguridad que le permite trabajar tranquilo sabiendo que un médico puede estar con ellos en minutos."'},
  {id:'corp',     e:'🏢', n:'Perfil Corporativo',       s:'"El ausentismo laboral por salud le cuesta a su empresa. EMI reduce visitas a clínicas en un 80% al resolver los casos en casa. Es una inversión, no un gasto."'},
  {id:'joven',    e:'🎓', n:'Adulto Joven',              s:'"¿Cuándo fue la última vez que fue a urgencias y esperó 6 horas? Con EMI hundes un botón en la app y el médico llega. Más eficiente que pedir un domicilio."'},
];

const OBJECIONES = [
  {topic:'Presupuesto', obj:'Es muy caro / No hay presupuesto.',
   guion:'Entiendo que cuida su dinero. Imagine la paz mental de saber que por $2.000 diarios, menos que un café, tiene un médico en su sala sin pagar un peso más.',
   tracy:'¿El precio es lo único que nos impide trabajar hoy? Véalo como un fondo de ahorro: una sola urgencia particular cuesta 5 meses de nuestra mensualidad.',
   hormozi:'Si no te afilias, igual gastarás ese dinero en taxis y copagos de EPS. Aquí compras tranquilidad ilimitada por el precio de dos pizzas. Es un trato ridículo.'},
  {topic:'Decisión', obj:'Debo consultarlo con mi esposo/a.',
   guion:'Valoro que decidan juntos. Si pudiera sentir ahora que ante un vómito a las 3 a.m. un médico llega en minutos, ¿qué diría su pareja?',
   tracy:'Entiendo. Si su pareja estuviera aquí, ¿qué pregunta cree que me haría? Despejémosla para que le lleve la información completa y segura.',
   hormozi:'Entiendo, pero la salud no espera. El bono de $38.500 expira al colgar. Tienes 5 días para retractarte, pero si esperas, pierdes el ahorro hoy.'},
  {topic:'Información', obj:'Envíeme la info al WhatsApp.',
   guion:'Claro, ya se la envío. Pero escuche: mi sistema solo sostiene el cupo preferencial mientras estamos en línea. Validemos su cobertura rápido.',
   tracy:'Para que la info le sea útil, ¿qué es lo más importante hoy: la rapidez de atención o el ahorro en especialistas? Así le envío solo lo vital.',
   hormozi:'Te la envío, pero tienes 50 chats sin leer. Tardamos 3 minutos en verificar si calificas para el descuento de bienvenida. ¿Cuál es su dirección?'},
  {topic:'Competencia', obj:'Ya tengo Plan Premium / Prepagada.',
   guion:'Excelente que esté protegido. Su plan es de "hotelería" para cuando ya está en la clínica; EMI es la logística para que no tenga que ir allá.',
   tracy:'Muchos clientes pensaban igual hasta que vieron que EMI resuelve el 80% de los casos en su cama. ¿Prefiere esperar horas en triaje o que el médico llegue?',
   hormozi:'Tener Prepagada sin EMI es como un Ferrari sin llaves. Tienes salud, pero no acceso rápido. Por $2.000 al día saltas la fila de urgencias de la EPS.'},
  {topic:'Salud', obj:'Yo casi no me enfermo.',
   guion:'Qué buena noticia. EMI es para proteger esa salud. Nadie planea una apendicitis. Es mejor tener al médico y no necesitarlo, ¿verdad?',
   tracy:'Usted es el perfil ideal: riesgo bajo. Pero la salud no avisa. EMI es su seguro de disponibilidad 24/7. Un solo traslado evitado y se pagó solo.',
   hormozi:'Es como el seguro del auto: pagas para no chocar. Si hoy te da un cólico fuerte, ¿prefieres buscar un taxi o hundir un botón en tu App?'},
];

const BENEFITS = [
  {e:'🚑', t:'Urgencias 24/7', d:'Médico en puerta <45 min'},
  {e:'📱', t:'Videoconsulta', d:'Ilimitada, sin costo extra'},
  {e:'💬', t:'Chat Médico', d:'Orientación inmediata'},
  {e:'🏠', t:'Comodidad Total', d:'Sin filas ni salas de espera'},
  {e:'👶', t:'Protección Infantil', d:'Pediatra 24/7 a domicilio'},
  {e:'🦷', t:'Urgencias Odonto', d:'Sin costo adicional'},
  {e:'👨‍⚕️', t:'900+ Especialistas', d:'Tarifa preferencial VIP'},
  {e:'🌎', t:'Red SIEM', d:'Cobertura nacional e intl.'},
];

const CLAVES=['TIPO DE IDENTIFICACIÓN','TIPO DE IDENTIFICACION',
  'NÚMERO DE IDENTIFICACION','NUMERO DE IDENTIFICACION',
  'NOMBRES','APELLIDOS','FECHA DE NACIMIENTO','DEPARTAMENTO','MUNICIPIO',
  'ESTADO','ENTIDAD','REGIMEN','RÉGIMEN',
  'FECHA DE AFILIACION EFECTIVA','FECHA DE AFILIACIÓN EFECTIVA',
  'FECHA DE FINALIZACION DE AFILIACION','TIPO DE AFILIADO','COLUMNAS','DATOS',
  'NOMBRE COMPLETO AFILIADO', 'AFILIADOS A VINCULAR', 'EPS ACTUAL', 'CIUDAD'];

const EPS_MAP=[
  {b:['ALIANSALUD'],v:'Aliansalud'},{b:['ASMET'],v:'Asmet Salud'},
  {b:['CAFESALUD'],v:'Cafesalud'},{b:['CAPITAL SALUD'],v:'Capital Salud'},
  {b:['COLSANITAS'],v:'Colsanitas'},{b:['COMFENALCO'],v:'Comfenalco Valle'},
  {b:['COMPENSAR'],v:'Compensar'},{b:['COOSALUD'],v:'Coosalud'},
  {b:['COOMEVA'],v:'Coomeva'},{b:['CRUZ BLANCA'],v:'Cruz Blanca'},
  {b:['ECOOPSOS'],v:'Ecoopsos'},{b:['EMSSANAR'],v:'Emssanar'},
  {b:['SURAMERICANA','EPS SURA','SURA EPS','SURA S.A'],v:'EPS Sura / Suramericana'},
  {b:['FAMISANAR'],v:'Famisanar'},{b:['GOLDEN GROUP'],v:'Golden Group'},
  {b:['MEDIMAS','MEDIMÁS'],v:'Medimás'},{b:['MUTUAL SER'],v:'Mutual Ser'},
  {b:['NUEVA EPS'],v:'Nueva EPS'},{b:['PIJAOS'],v:'Pijaos Salud'},
  {b:['SALUD TOTAL'],v:'Salud Total'},{b:['SANITAS'],v:'Sanitas EPS'},
  {b:['SAVIA'],v:'Savia Salud'},
];

// --- UTILS ---
const fmt = (v: number) => '$' + Math.round(v).toLocaleString('es-CO');
const primerNombre = (nom: string) => {
  if (!nom) return 'Sra/Sra';
  const p = nom.trim().split(/\s+/);
  return p.length >= 3 ? p[2] : p[0];
};

export default function App() {
  const [phase, setPhase] = useState(0);
  const [numAfil, setNumAfil] = useState(1);
  const [agentName, setAgentName] = useState('');
  const [saleMode, setSaleMode] = useState('NEW');
  const [activePlan, setActivePlan] = useState('PLUS_DEB');
  const [modPago, setModPago] = useState('DEB');
  const [titular, setTitular] = useState('MISMO');
  const [personaIdx, setPersonaIdx] = useState(0);
  const [diagnostico, setDiagnostico] = useState('');
  const [extractoAdres, setExtractoAdres] = useState('');
  const [showObj, setShowObj] = useState(false);
  const [objFilter, setObjFilter] = useState('');
  const [toast, setToast] = useState('');
  const [adresData, setAdresData] = useState<any>({});
  const [bens, setBens] = useState<any[]>([]);

  useEffect(() => {
    // Generate empty bens when numAfil changes
    const newBens = Array.from({ length: numAfil }, (_, i) => ({
      nom: '', nac: '', tel: '', mail: '', dir: '', barrio: '', ref: ''
    }));
    setBens(newBens);
  }, [numAfil]);

  const updateBen = (idx: number, field: string, val: string) => {
    const next = [...bens];
    next[idx] = { ...next[idx], [field]: val };
    setBens(next);
  };
  const [formData, setFormData] = useState({
    rNom: '',
    rCed: '',
    rReg: '',
    rEst: 'ACTIVO',
    rTip: 'COTIZANTE',
    rEps: '',
    rCiudad: 'Bogotá',
    fNom: '',
    fNac: '',
    fTel: '',
    fEmail: '',
    fDir: '',
    fBarrio: '',
    fRef: '',
    fBanco: 'Bancolombia',
    fTipoCuenta: 'Ahorros',
    fDigitos: ''
  });

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  const parseADRES = (txt: string) => {
    const d: any = {};
    const up = txt.toUpperCase();

    const esOtraClave = (v: string) => {
      const vu = v.toUpperCase().trim();
      return CLAVES.some(c => vu === c || vu.startsWith(c));
    };

    const findCampo = (claves: string[]) => {
      const lineas = txt.split(/\r?\n/).map(l => l.trim());
      for (const clave of claves) {
        const cu = clave.toUpperCase();
        // Look for pattern "KEY[tab]VALUE"
        const m1 = txt.match(new RegExp(clave + '\\s*\\t+\\s*([^\\t\\n\\r]+)', 'i'));
        if (m1) { const v = m1[1].trim(); if (v && !esOtraClave(v)) return v; }

        // Look for "KEY[2+ spaces]VALUE"
        const m2 = txt.match(new RegExp(clave + '\\s{2,}([^\\n\\r]+)', 'i'));
        if (m2) { const v = m2[1].trim(); if (v && !esOtraClave(v)) return v; }

        // Look for "KEY" on one line, "VALUE" on next
        for (let i = 0; i < lineas.length - 1; i++) {
          if (lineas[i].toUpperCase() === cu) {
            const s = lineas[i + 1].trim();
            if (s && !esOtraClave(s)) return s;
          }
        }
      }
      return null;
    };

    const getFilaDatos = () => {
      const lineas = txt.split(/\r?\n/).map(l => l.trim()).filter(l => l);
      const ESTADOS = ['ACTIVO', 'INACTIVO', 'SUSPENDIDO', 'FALLECIDO', 'NOVEDAD'];
      for (let i = 0; i < lineas.length; i++) {
        const l = lineas[i].toUpperCase();
        if (ESTADOS.some(e => l === e || l.startsWith(e + '\t') || l.startsWith(e + ' '))) {
          return lineas.slice(i, i + 8).join('\t');
        }
      }
      return null;
    };

    const fila = getFilaDatos();
    if (fila) {
      const fu = fila.toUpperCase();
      if (fu.includes('FALLECIDO')) d.estado = 'FALLECIDO';
      else if (fu.includes('INACTIVO')) d.estado = 'INACTIVO';
      else if (fu.includes('SUSPENDIDO') || fu.includes('NOVEDAD')) d.estado = 'SUSPENDIDO';
      else d.estado = 'ACTIVO';

      if (fu.includes('CONTRIBUTIVO')) d.regimen = 'CONTRIBUTIVO';
      else if (fu.includes('SUBSIDIADO')) d.regimen = 'SUBSIDIADO';
      else if (fu.includes('EXCEPCI')) d.regimen = 'EXCEPCION';
      else if (fu.includes('ESPECIAL')) d.regimen = 'ESPECIAL';

      if (fu.includes('COTIZANTE')) d.tipo = 'COTIZANTE';
      else if (fu.includes('BENEFICIARIO')) d.tipo = 'BENEFICIARIO';
      else if (fu.includes('CABEZA DE FAMILIA')) d.tipo = 'COTIZANTE';
      else if (fu.includes('AFILIADO')) d.tipo = 'SUB';

      const entStr = findCampo(['ENTIDAD']);
      if (entStr) {
        const eu = entStr.toUpperCase();
        for (const e of EPS_MAP) { if (e.b.some(b => eu.includes(b))) { d.eps = e.v; break; } }
      }
    }

    const nombres = findCampo(['NOMBRES']);
    const apellidos = findCampo(['APELLIDOS']);
    if (nombres && apellidos) d.nombre = (apellidos + ' ' + nombres).toUpperCase();
    else if (nombres) d.nombre = nombres.toUpperCase();

    const mun = findCampo(['MUNICIPIO']);
    if (mun) d.municipio = mun.toUpperCase().trim();

    const numId = findCampo(['NÚMERO DE IDENTIFICACION', 'NUMERO DE IDENTIFICACION', 'NÚMERO DE IDENTIFICACIÓN']);
    if (numId) d.documento = numId.replace(/\D/g, '');

    const numAfilMatch = txt.match(/Afiliados a vincular\s*[:\-]?\s*(\d+)/i);
    if (numAfilMatch) d.numAfil = parseInt(numAfilMatch[1]);

    return d;
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const txt = e.clipboardData.getData('text');
    if (txt.length < 20) return;
    const d = parseADRES(txt);
    if (d.nombre || d.eps || d.documento) {
      setAdresData(d);
      if (d.numAfil) setNumAfil(d.numAfil);
      setFormData(prev => ({
        ...prev,
        rNom: d.nombre || prev.rNom,
        rCed: d.documento || prev.rCed,
        rReg: d.regimen || prev.rReg,
        rEst: d.estado || prev.rEst,
        rEps: d.eps || prev.rEps,
        rCiudad: d.municipio || prev.rCiudad
      }));
      showToast('✓ Datos de ADRES extraídos');
    }
  };

  const getBenefits = (planId: string) => {
    const icons = {
      PLUS: ['🚑','📱','💬','🏠','👶','🦷','👨‍⚕️', '🌎'],
      TRAD: ['🚑','📱','💬','🏠','👶','🌎'],
      SUBSIDIADO: ['🚑','📱','💬','🏠','👶','🌎'],
      VIRTUAL: ['📱','💬','🌎']
    };
    const key = planId.includes('PLUS') ? 'PLUS' : 
                planId.includes('TRAD') ? 'TRAD' : 
                planId === 'SUBSIDIADO' ? 'SUBSIDIADO' : 'VIRTUAL';
    const allowed = icons[key as keyof typeof icons] || icons.TRAD;
    return BENEFITS.filter(b => allowed.includes(b.e));
  };
  const downloadSummary = () => {
    const benInfo = bens.map((b, i) => `BENEFICIARIO ${i+1}:
  Nombre: ${b.nom}
  Nacimiento: ${b.nac}
  Tel: ${b.tel}
  Email: ${b.mail}
  Dir: ${b.dir}
  Barrio: ${b.barrio}
  Ref: ${b.ref}\n`).join('\n');
    
    const content = `════════════════════════════════════════════════════════════════════════
                    RESUMEN DE VENTA EMI FALCK
════════════════════════════════════════════════════════════════════════

INFORMACIÓN DEL CLIENTE (ADRES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre ADRES:         ${formData.rNom || 'No capturado'}
Régimen:              ${formData.rReg || 'No capturado'}
Estado:               ${formData.rEst || 'No capturado'}
Tipo Afiliado:        ${formData.rTip || 'No capturado'}
Ciudad:               ${formData.rCiudad || 'No capturado'}
EPS Actual:           ${formData.rEps || 'No capturado'}

INFORMACIÓN PERSONAL DEL AFILIADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre Completo:      ${formData.fNom || 'No capturado'}
Fecha de Nacimiento:  ${formData.fNac || 'No capturado'}
Teléfono:             ${formData.fTel || 'No capturado'}
Correo Electrónico:   ${formData.fEmail || 'No capturado'}
Dirección:            ${formData.fDir || 'No capturado'}
Barrio:               ${formData.fBarrio || 'No capturado'}
Referencia:           ${formData.fRef || 'No capturado'}

INFORMACIÓN DE PAGO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Institución Bancaria: ${formData.fBanco || 'No capturado'}
Tipo de Cuenta:       ${formData.fTipoCuenta || 'No capturado'}
Últimos 4 Dígitos:    ${formData.fDigitos || 'XXXX'}

INFORMACIÓN DEL ASESOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Asesor:               ${agentName || 'ejecutivo'}
Empresa:              Grupo EMI - EMI FALCK
Fecha de Contacto:    ${new Date().toLocaleString()}

DETALLES DE LA OFERTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Plan Contratado:      ${TAR[activePlan]?.n}
Número de Afiliados:  ${numAfil}
Tarifa Mensual:       ${fmt(currentPrice)}
Modalidad de Pago:    ${modPago}
Titularidad:          ${titular}

${numAfil > 1 ? 'LISTA DE BENEFICIARIOS\n' + benInfo : ''}

════════════════════════════════════════════════════════════════════════
Documento generado por EMI FALCK Asistente v3.0
════════════════════════════════════════════════════════════════════════`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Venta_EMI_${(formData.fNom || formData.rNom || 'Contrato').replace(/\s+/g, '_')}.txt`;
    a.click();
    showToast('✓ Resumen detallado descargado');
  };

  const getLegal1 = () => {
    const nominee = formData.fNom || formData.rNom || 'Afiliado';
    const cedula = formData.rCed || 'XXXXX';
    const numAfiliados = numAfil;
    const planNom = TAR[activePlan]?.n || 'EMI Plus';
    const cuota = fmt(TAR[activePlan]?.adh || 0);
    const mensual = fmt(getPrice());
    const direccion = formData.fDir || 'Dirección de residencia';
    const ciudad = formData.rCiudad;
    const banco = formData.fBanco;
    const tipoCta = formData.fTipoCuenta;
    const digits = formData.fDigitos || 'XXXX';
    const mesActual = new Date().toLocaleDateString('es-CO', { month: 'long' });
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const fechaFin = `${ultimoDia}/${String(hoy.getMonth() + 1).padStart(2, '0')}/${hoy.getFullYear()}`;

    const benList = bens.map((b, i) => b.nom || `Beneficiario ${i+1}`).join(', ');
    const R = (t: string) => `<span style="color:#E8001D;font-weight:900">${t}</span>`;

    if (saleMode === 'CROSS') {
        return `• Señor/a ${R(nominee)}, acepta usted el servicio contratado con grupo emi s.a.s. a nombre del titular ${R(nominee)}, identificado con cedula de ciudadanía ${R(cedula)}
• Para los beneficiarios: ${R(benList)}
• En la dirección de residencia ${R(direccion + (ciudad ? ', ' + ciudad : ''))}
• Donde se cobra una cuota de inscripción de ${R(cuota)} por persona agregada a su plan emi ${R(planNom)}
• A partir del siguiente mes, continúa pagando una mensualidad ${R(mensual)} por cada afiliado.
• que se debitara los 5 primeros días hábiles a partir de hoy. Si o no.`;
    }

    if (modPago === 'DEB') {
        return `Señor/a ${R(nominee)}, acepta usted el servicio contratado con grupo emi s.a.s., a nombre del titular ${R(nominee)}, identificado con cedula de ciudadanía ${R(cedula)}, Para los beneficiarios: ${R(benList)}, En la dirección de residencia ${R(direccion)}, Bajo la modalidad de pago de débito automático de su cuenta de ${R(tipoCta + ' ' + banco)}, terminada en ${R(digits)}, Donde se cobra una cuota de inscripción de ${R(cuota)} por ${R(numAfiliados + ' persona(s)')} en emi ${R(planNom)}. A partir del siguiente mes, continua pagando una mensualidad ${R(mensual)} por cada afiliado, que se debitara los 5 primeros días del mes siguiente. Si o no.`;
    }

    if (modPago === 'LOC') {
        return `Señor/a ${R(nominee)}, acepta usted el servicio contratado con grupo emi s.a.s., a nombre del titular ${R(nominee)}, identificada con cedula de ciudadanía ${R(cedula)}, para los beneficiarios: ${R(benList)}, en la dirección de residencia ${R(direccion)}, con una tarifa de mensual de ${R(planNom)}, bajo la modalidad de pago de local pago donde usted deberá realizar los pagos es cualquiera de estos medios: Opción 1: corresponsal bancario (decir el código de convenio) y su cedula de ciudadanía. Opción 2: entidad financiera autorizada (indicar número de cuenta, código de convenio, nit de emi), soporte de pago a soportespago.colombia@grupoemi.com. Opción 3: Pago botón PSE. Opción 4: Pago en línea https://www.grupoemi.com/colombia. Opción 5: Ir a la oficina administrativa y pagar en caja. Donde para el mes de afiliación ${R(mesActual)} se cobra una cuota de inscripción de ${R(cuota)} por ${R(numAfiliados + ' persona(s)')} en emi ${R(planNom)} que le cubre el servicio hasta ${R(fechaFin)} y a partir del siguiente mes continua pagando una mensualidad ${R(mensual)} por cada afiliado, que se deberá realizar los 5 primeros días del mes. si o no`;
    }

    return `Señor/a ${R(nominee)}, acepta usted el servicio contratado con grupo emi s.a.s., a nombre del titular ${R(nominee)}, identificada con cedula de ciudadanía ${R(cedula)}, para los beneficiarios: ${R(benList)}, en la dirección de residencia ${R(direccion)}, con una tarifa de mensual de ${R(planNom)}, bajo la modalidad de pago de cobro domiciliario en la dirección de residencia indicada por el titular, donde para el mes de afiliación ${R(mesActual)} se cobra una cuota de inscripción de ${R(cuota)} por ${R(numAfiliados + ' persona(s)')} en emi ${R(planNom)} que le cubre el servicio hasta ${R(fechaFin)} y a partir del siguiente mes continua pagando una mensualidad ${R(mensual)} por cada afiliado, que durante los 5 primeros días uno de nuestros Cobradores los estará visitando sí o no`;
  };

  const handleNav = (n: number) => {
    if (n < 1 || n > 6) return;
    if (n === 5) {
      setFormData(prev => ({
        ...prev,
        fNom: prev.fNom || prev.rNom,
        fDir: prev.fDir || (bens[0]?.dir || ''),
        fBarrio: prev.fBarrio || (bens[0]?.barrio || ''),
        fRef: prev.fRef || (bens[0]?.ref || ''),
        fTel: prev.fTel || (bens[0]?.tel || ''),
        fEmail: prev.fEmail || (bens[0]?.mail || ''),
        fNac: prev.fNac || (bens[0]?.nac || ''),
      }));
    }
    setPhase(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPrice = () => {
    const ciudad = formData.rCiudad || '';
    const isCosta = COSTA_CITIES.some(c => ciudad.includes(c));
    const p = TAR[activePlan];
    if (!p) return 0;

    if (isCosta && (activePlan.includes('PLUS') || activePlan.includes('TRAD'))) {
      const esPlus = activePlan.startsWith('PLUS');
      const esLoc = modPago === 'LOC' || activePlan.endsWith('LOC');
      const key = (esPlus ? 'PLUS' : 'TRAD') + '_' + (esLoc ? 'LOC' : 'DEB');
      return COSTA_PRICES[key] || 40000;
    }
    const n = Math.min(numAfil, 5);
    return p.t[n] || p.t[1];
  };

  const updateModPago = (m: string) => {
    setModPago(m);
    // If it's a PLUS or TRAD plan, sync the activePlan with the new modality
    if (activePlan.startsWith('PLUS') || activePlan.startsWith('TRAD')) {
      const base = activePlan.split('_')[0];
      const nextPlan = base + '_' + m;
      if (TAR[nextPlan]) {
        setActivePlan(nextPlan);
      }
    }
  };

  const getPriceForPlan = (id: string) => {
    const ciudad = formData.rCiudad || '';
    const isCosta = COSTA_CITIES.some(c => ciudad.includes(c));
    const p = id === 'VIRTUAL' ? TAR.VIRTUAL : (modPago === 'DEB' ? TAR[id] : TAR[id.replace('DEB', modPago)]);
    if (!p) return 0;

    if (isCosta && (id.includes('PLUS') || id.includes('TRAD'))) {
      const esPlus = id.startsWith('PLUS');
      const esLoc = modPago === 'LOC' || id.endsWith('LOC');
      const key = (esPlus ? 'PLUS' : 'TRAD') + '_' + (esLoc ? 'LOC' : 'DEB');
      return COSTA_PRICES[key] || 40000;
    }
    const n = Math.min(numAfil, 5);
    return p.t[n] || p.t[1];
  };

  const renderLegal1 = () => {
    const text = getLegal1();
    return (
      <div className="whitespace-pre-wrap">
        {text.split('\n').map((line, i) => (
          <p key={i} className="mb-2">
            {line.split(/(Señor\/a|titular|identificado con|identificada con|beneficiarios:|dirección de residencia|cuota de inscripción de|mensualidad|débito automático|local pago|cobro domiciliario|Si o no|si o no)/g).map((part, j) => {
              const highlights = ['Señor/a', 'titular', 'identificado con', 'identificada con', 'beneficiarios:', 'dirección de residencia', 'cuota de inscripción de', 'mensualidad', 'débito automático', 'local pago', 'cobro domiciliario', 'Si o no', 'si o no'];
              if (highlights.includes(part)) return <span key={j} className="text-r font-black">{part}</span>;
              return part;
            })}
          </p>
        ))}
      </div>
    );
  };

  const currentPrice = getPrice();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* --- TOP BAR --- */}
      <header className="top h-[52px] bg-white border-b border-k1 sticky top-0 z-50 flex items-center px-5 gap-4">
        <div className="top-brand flex items-center gap-2.5">
          <div className="top-logo bg-r text-white font-black italic text-xs px-2.5 py-1 rounded">EMI FALCK</div>
          <div className="top-brand-txt">
            <div className="name text-sm font-extrabold italic leading-none">CONEXIONES <span className="text-r">Digitales</span></div>
            <div className="sub text-[9px] font-semibold text-k3 tracking-widest uppercase">Aliado Estratégico Outbound</div>
          </div>
        </div>

        <nav className="steps-nav flex-1 flex justify-center gap-1">
          {[1,2,3,4,5,6].map((n) => (
            <button 
              key={n}
              onClick={() => handleNav(n)}
              className={`step-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-all ${phase === n ? 'active bg-white text-r shadow-s0 border border-k1' : phase > n ? 'done text-g' : 'text-k3'}`}
            >
              <span className={`step-num w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${phase === n ? 'bg-r text-white' : phase > n ? 'bg-g text-white' : 'bg-k1 text-k5'}`}>{n}</span>
              <span className="hidden lg:inline">{['Protocolo', 'Diagnóstico', 'Oferta', 'Manejo', 'Legal', 'Cierre'][n-1]}</span>
            </button>
          ))}
        </nav>

        <div className="top-right flex gap-2">
          <button 
            onClick={() => setShowObj(!showObj)}
            className={`tbtn px-3.5 py-1.5 rounded-lg text-xs font-bold border ${showObj ? 'bg-r text-white border-r' : 'bg-rl text-r border-rb'}`}
          >
            Matriz Objeciones ⓘ
          </button>
        </div>
      </header>

      <div className="app-wrapper flex-1 grid grid-cols-[340px_1fr] h-[calc(100vh-52px)] overflow-hidden">
        {/* --- SIDEBAR --- */}
        <aside className="sidebar bg-white border-r border-k1 overflow-y-auto p-4 flex flex-col gap-5">
          {/* Phase 1 & 2 Sidebar content */}
          {(phase === 1 || phase === 2) && (
            <>
              <div className="spanel">
                <div className="sh text-[9px] font-extrabold text-r uppercase tracking-widest flex items-center gap-2 mb-3 after:content-[''] after:flex-1 after:h-[1px] after:bg-rb">Pegado Inteligente</div>
                <div className={`paste-box border-1.5 border-dashed rounded-lg p-3 ${adresData.nombre ? 'ok border-g bg-gl' : 'border-k3 bg-white'}`}>
                  <div className="pz-top flex justify-between text-[9px] font-bold mb-1.5">
                    <span className="text-k5 uppercase">Ctrl+V desde ADRES</span>
                    <span className={`font-mono transition-colors ${adresData.nombre ? 'text-g' : 'text-k5'}`}>{adresData.nombre ? '✓ Extraído' : 'Esperando...'}</span>
                  </div>
                  <textarea 
                    onPaste={handlePaste}
                    placeholder="Pega el resultado aquí..."
                    className="pz-ta w-full bg-transparent border-none text-[10px] font-mono resize-none focus:outline-none min-h-[70px]"
                  />
                </div>
                {adresData.nombre && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="xg grid grid-cols-3 gap-1.5 mt-3">
                    <div className="xc bg-white border border-k1 rounded-md p-2 shadow-s0">
                      <div className="xk text-[8px] font-bold text-k5 uppercase">Nombre</div>
                      <div className="xv text-[11px] font-bold truncate">{adresData.nombre}</div>
                    </div>
                    <div className="xc bg-white border border-k1 rounded-md p-2 shadow-s0">
                      <div className="xk text-[8px] font-bold text-k5 uppercase">EPS</div>
                      <div className="xv text-[11px] font-bold truncate">{adresData.eps}</div>
                    </div>
                    <div className="xc bg-white border border-k1 rounded-md p-2 shadow-s0">
                      <div className="xk text-[8px] font-bold text-k5 uppercase">Estado</div>
                      <div className={`xv text-[11px] font-bold truncate ${adresData.estado === 'ACTIVO' ? 'text-g' : 'text-r'}`}>{adresData.estado}</div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="spanel">
                <div className="sh text-[9px] font-extrabold text-r uppercase tracking-widest flex items-center gap-2 mb-3 after:content-[''] after:flex-1 after:h-[1px] after:bg-rb">Registro Inicial</div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Nombre Afiliado</label>
                    <input 
                      type="text" 
                      value={formData.rNom} 
                      onChange={(e) => setFormData({...formData, rNom: e.target.value})}
                      className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Regimen</label>
                      <select 
                        value={formData.rReg} 
                        onChange={(e) => setFormData({...formData, rReg: e.target.value})}
                        className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k focus:outline-none bg-white"
                      >
                        <option value="">Seleccionar</option>
                        <option value="CONTRIBUTIVO">Contributivo</option>
                        <option value="SUBSIDIADO">Subsidiado</option>
                      </select>
                    </div>
                    <div>
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Estado ADRES</label>
                      <select 
                        value={formData.rEst} 
                        onChange={(e) => setFormData({...formData, rEst: e.target.value})}
                        className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k focus:outline-none bg-white"
                      >
                        <option value="ACTIVO">Activo</option>
                        <option value="SUSPENDIDO">Suspendido</option>
                        <option value="INACTIVO">Inactivo</option>
                        <option value="FALLECIDO">Fallecido</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Tipo Afiliado</label>
                      <select 
                        value={formData.rTip} 
                        onChange={(e) => setFormData({...formData, rTip: e.target.value})}
                        className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k focus:outline-none bg-white font-bold"
                      >
                        <option value="COTIZANTE">Cotizante</option>
                        <option value="BENEFICIARIO">Beneficiario</option>
                        <option value="SUB">Sub</option>
                      </select>
                    </div>
                    <div>
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">EPS Actual</label>
                      <input 
                        type="text" 
                        value={formData.rEps} 
                        onChange={(e) => setFormData({...formData, rEps: e.target.value})}
                        className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k focus:outline-none"
                        placeholder="Nombre EPS"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Afiliados a vincular</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(n => (
                          <button key={n} onClick={() => setNumAfil(n)} className={`flex-1 h-9 rounded-lg border-2 flex items-center justify-center font-black text-sm transition-all ${numAfil === n ? 'bg-k text-white border-k scale-105' : 'bg-white text-k5 border-k1 hover:border-k3'}`}>{n}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Ciudad/Municipio</label>
                    <select 
                      value={formData.rCiudad} 
                      onChange={(e) => setFormData({...formData, rCiudad: e.target.value})}
                      className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k focus:outline-none bg-white font-bold"
                    >
                      {['Bogotá', 'Barranquilla', 'Cartagena', 'Cali', 'Chía', 'Manizales', 'Medellín', 'Palmira', 'Pereira', 'Rionegro'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Phase 3 & 4 Sidebar content */}
          {(phase === 3 || phase === 4) && (
            <>
              <div className="spanel">
                 <div className="sh text-[9px] font-extrabold text-r uppercase tracking-widest flex items-center gap-2 mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-rb">Configuración de Oferta</div>
                 <div className="flex flex-col gap-4">
                    <div>
                       <label className="flbl text-[9px] font-bold text-k5 uppercase mb-2 block">Modalidad de Venta</label>
                       <div className="flex gap-1 bg-k05 p-1 rounded-lg border border-k1">
                          <button onClick={() => setSaleMode('NEW')} className={`flex-1 py-2 rounded-md text-[10px] font-black uppercase transition-all ${saleMode === 'NEW' ? 'bg-white text-r shadow-s0' : 'text-k5'}`}>Nueva</button>
                          <button onClick={() => setSaleMode('CROSS')} className={`flex-1 py-2 rounded-md text-[10px] font-black uppercase transition-all ${saleMode === 'CROSS' ? 'bg-white text-r shadow-s0' : 'text-k5'}`}>Cruzada</button>
                       </div>
                    </div>
                    <div>
                       <label className="flbl text-[9px] font-bold text-k5 uppercase mb-2 block">Selección de Plan</label>
                       <div className="flex flex-col gap-1.5">
                          {Object.entries(TAR).map(([id, p]) => (
                            <button 
                              key={id} 
                              onClick={() => setActivePlan(id)}
                              className={`w-full text-left p-3 rounded-xl border-2 transition-all flex justify-between items-center ${activePlan === id ? 'bg-k/5 border-k' : 'bg-white border-k1 hover:border-k3'}`}
                            >
                               <div>
                                  <div className={`text-[10px] font-black uppercase leading-tight ${activePlan === id ? 'text-k' : 'text-k5'}`}>{p.n}</div>
                                  <div className="text-[9px] opacity-60 mt-0.5">{p.label}</div>
                               </div>
                               <div className="text-xs font-black">{fmt(p.t[Math.min(numAfil, 5)])}</div>
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
              
              {phase === 4 && (
                <div className="spanel">
                   <div className="sh text-[9px] font-extrabold text-b uppercase tracking-widest flex items-center gap-2 mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-bb">Matriz de Objeciones</div>
                   <div className="flex flex-wrap gap-2">
                     {OBJECIONES.slice(0, 8).map((o, i) => (
                       <button 
                        key={i} 
                        onClick={() => { setObjFilter(o.topic); setShowObj(true); }}
                        className="bg-white border border-k1 rounded-lg px-2.5 py-1.5 text-[9px] font-bold text-k5 hover:border-b hover:text-b transition-all uppercase"
                       >
                         {o.topic}
                       </button>
                     ))}
                   </div>
                </div>
              )}
            </>
          )}

          {/* Phase 5 Sidebar content */}
          {phase === 5 && (
            <div className="spanel">
              <div className="sh text-[9px] font-extrabold text-r uppercase tracking-widest flex items-center gap-2 mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-rb">Datos para Legalización</div>
              <div className="flex flex-col gap-3">
                 <div>
                    <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Nombre Completo (fNom)</label>
                    <input 
                      value={formData.fNom} 
                      onChange={(e) => setFormData({...formData, fNom: e.target.value})}
                      className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k focus:outline-none"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                   <div>
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Nacimiento (fNac)</label>
                      <input type="date" value={formData.fNac} onChange={(e) => setFormData({...formData, fNac: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none" />
                   </div>
                   <div>
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Celular (fTel)</label>
                      <input value={formData.fTel} onChange={(e) => setFormData({...formData, fTel: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none" />
                   </div>
                 </div>
                 <div>
                    <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Email (fEmail)</label>
                    <input value={formData.fEmail} onChange={(e) => setFormData({...formData, fEmail: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none" />
                 </div>
                 <div>
                    <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Dirección (fDir)</label>
                    <input value={formData.fDir} onChange={(e) => setFormData({...formData, fDir: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                   <div>
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Barrio (fBarrio)</label>
                      <input value={formData.fBarrio} onChange={(e) => setFormData({...formData, fBarrio: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none" />
                   </div>
                   <div>
                      <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Ref (fRef)</label>
                      <input value={formData.fRef} onChange={(e) => setFormData({...formData, fRef: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none" />
                   </div>
                 </div>

                 {modPago === 'DEB' && (
                   <div className="mt-4 pt-4 border-t border-k1 flex flex-col gap-3 bg-k05/30 -mx-4 px-4 pb-4 rounded-b-xl">
                      <div className="text-[10px] font-black uppercase text-k7 mb-1 flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5"/> Información Bancaria</div>
                      <div>
                        <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Banco (fBanco)</label>
                        <select value={formData.fBanco} onChange={(e) => setFormData({...formData, fBanco: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none bg-white">
                           <option>Bancolombia</option><option>Davivienda</option><option>BBVA</option><option>Banco de Bogotá</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                           <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Tipo Cuenta</label>
                           <select value={formData.fTipoCuenta} onChange={(e) => setFormData({...formData, fTipoCuenta: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none bg-white">
                              <option>Ahorros</option><option>Corriente</option>
                           </select>
                        </div>
                        <div>
                           <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1 block">Dígitos (fDigitos)</label>
                           <input maxLength={4} value={formData.fDigitos} onChange={(e) => setFormData({...formData, fDigitos: e.target.value})} className="w-full border border-k1 rounded-md p-2 text-sm focus:border-k outline-none" placeholder="XXXX" />
                        </div>
                      </div>
                   </div>
                 )}
              </div>
            </div>
          )}

          {phase === 6 && (
            <div className="spanel text-center py-10">
               <CheckCircle2 className="w-12 h-12 text-g mx-auto mb-4 opacity-20" />
               <div className="text-[10px] font-black text-g uppercase tracking-widest">Proceso Finalizado</div>
               <p className="text-xs text-k7 italic mt-2">Venta registrada y legalizada correctamente.</p>
            </div>
          )}
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="main bg-k05 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div 
                key="splash" 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 1.1 }}
                className="phase flex flex-col items-center justify-center min-h-[70vh] text-center"
              >
                <div className="w-24 h-24 bg-r text-white flex items-center justify-center rounded-3xl font-black italic text-2xl mb-8 shadow-s2">EMI</div>
                <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Asistente de Ventas <span className="text-r">v3.0</span></h1>
                <p className="text-k3 font-semibold uppercase tracking-widest text-sm mb-12">Aliado Estratégico Outbound / Conexiones Digitales</p>
                <button 
                  onClick={() => setPhase(1)}
                  className="bg-k text-white px-12 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-r transition-all shadow-s1"
                >
                  Comenzar
                </button>
              </motion.div>
            )}

            {phase === 1 && (
              <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="phase max-w-[900px] mx-auto">
                <div className="ph-label text-[9px] font-extrabold text-r tracking-[0.3em] uppercase mb-1">Fase 01</div>
                <div className="ph-title text-4xl font-black italic tracking-tighter uppercase leading-none mb-1.5">Protocolo de Enganche</div>
                <div className="ph-desc text-sm text-k5 mb-8">El primer contacto debe generar confianza y cumplir la normativa.</div>

                <div className="agent-card bg-white border border-k1 border-solid rounded-xl p-6 shadow-s0 mb-6 text-k">
                  <div className="agent-label text-[13px] font-bold text-r uppercase tracking-widest mb-4">Escribe tu nombre</div>
                  <input 
                    placeholder="Tu Nombre Completo"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="agent-input w-full border-2 border-k rounded-lg p-3 text-sm font-semibold mb-4"
                  />
                  <div className="checklist bg-k05 border border-k1 rounded-lg p-4">
                    <div className="checklist-title text-[8px] font-extrabold text-r uppercase tracking-widest mb-2.5">Checklist de Calidad</div>
                    <div className="check-item flex items-center gap-2 text-xs font-semibold mb-1.5"><div className="check-dot w-2 h-2 rounded-full bg-g" /> Tono de voz empático</div>
                    <div className="check-item flex items-center gap-2 text-xs font-semibold mb-1.5"><div className="check-dot w-2 h-2 rounded-full bg-g" /> Pronunciación clara</div>
                    <div className="check-item flex items-center gap-2 text-xs font-semibold"><div className="check-dot w-2 h-2 rounded-full bg-g" /> Mención de grabación</div>
                  </div>
                </div>

                <div className="script-box bg-white border border-k1 rounded-xl p-6 mb-8 text-[22px] font-bold leading-relaxed shadow-s0">
                  <div className="text-[11px] font-extrabold text-k5 uppercase mb-3">Guión de Apertura Legal</div>
                  "Buenos días, <span className="script-field text-r">{primerNombre(formData.fNom || formData.rNom)}</span>, mi nombre es <span className="script-field text-r">{agentName || '[Tu Nombre]'}</span> y me comunico como Ejecutivo Comercial de <span className="script-field text-r">Grupo EMI</span>."
                  <div className="script-alert bg-rl border-l-4 border-r rounded-r-lg p-4 mt-4">
                    <div className="script-alert-label text-[9px] font-extrabold text-r uppercase flex items-center gap-2 mb-1.5">
                      <div className="recording-dot w-1.5 h-1.5 rounded-full bg-r animate-pulse" /> Aviso de Grabación (Obligatorio)
                    </div>
                    <div className="script-alert-text text-base italic text-k7">"Le recuerdo que esta llamada es grabada y monitoreada para efectos de calidad."</div>
                    <div className="alert-critical text-[9px] font-extrabold text-r uppercase mt-2 opacity-70">* LA OMISIÓN DE ESTA FRASE ES UN FALLO CRÍTICO DE CALIDAD</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-k1 text-sm italic text-k5">
                    <span className="font-bold">Enganche inicial:</span> "Veo que usted es un cliente preferencial <span className="font-bold text-r">EMI</span>, ¿cómo le ha ido con nuestro servicio médico en casa?"
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="phase max-w-[900px] mx-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="ph-label text-[9px] font-extrabold text-r tracking-[0.3em] uppercase mb-1">Fase 02</div>
                    <div className="ph-title text-4xl font-black italic tracking-tighter uppercase leading-none mb-1.5">Diagnóstico Estratégico</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Avatar del Cliente</span>
                    <div className="persona-row flex gap-2 flex-wrap justify-end">
                      {PERSONAS.map((p, i) => (
                        <button key={i} onClick={() => setPersonaIdx(i)} className={`persona-btn w-10 h-10 rounded-xl border flex items-center justify-center text-lg transition-all ${personaIdx === i ? 'on bg-r text-white border-r shadow-[0_4px_12px_rgba(232,0,29,0.3)] scale-110' : 'bg-white border-k1 hover:scale-105'}`}>{p.e}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="persona-banner bg-k text-white rounded-xl p-5 flex gap-4 mb-6 items-start">
                   <div className="flex-1">
                      <div className="persona-banner-label text-[9px] font-extrabold text-r uppercase tracking-widest mb-1">{PERSONAS[personaIdx].n}</div>
                      <p className="persona-banner-script text-sm font-semibold italic opacity-90 leading-relaxed">{PERSONAS[personaIdx].s}</p>
                   </div>
                </div>

                {/* --- ANÁLISIS DEL CASO --- */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="card bg-white border border-k1 rounded-2xl p-6 shadow-s0">
                    <div className="text-[10px] font-black text-k5 uppercase tracking-widest mb-4">Análisis del Caso</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Diagnóstico Clínico / Observaciones</label>
                        <textarea 
                          value={diagnostico}
                          onChange={(e) => setDiagnostico(e.target.value)}
                          placeholder="Describa la situación de salud del grupo familiar..."
                          className="w-full border border-k1 rounded-lg p-3 text-sm focus:border-k outline-none bg-k05/20 min-h-[100px]"
                        />
                      </div>
                      <div>
                        <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Extracto ADRES (Referencia)</label>
                        <textarea 
                          value={extractoAdres}
                          onChange={(e) => setExtractoAdres(e.target.value)}
                          placeholder="Pegue aquí el texto plano de ADRES para referencia..."
                          className="w-full border border-k1 rounded-lg p-3 text-[11px] font-mono focus:border-k outline-none bg-k05/20 min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- CAMPOS DINÁMICOS BENEFICIARIOS --- */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                   {bens.map((ben, idx) => (
                     <div key={idx} className="card bg-white border border-k1 rounded-2xl p-6 shadow-s0 hover:shadow-s1 transition-all">
                       <div className="text-[10px] font-black text-r uppercase tracking-widest mb-5 flex items-center gap-2 pb-3 border-b border-k05">
                          <User className="w-3.5 h-3.5"/> Datos Beneficiario {idx + 1}
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          <div className="lg:col-span-2">
                             <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Nombre Completo</label>
                             <input 
                               type="text" value={ben.nom} onChange={(e) => updateBen(idx, 'nom', e.target.value)}
                               className="w-full border border-k1 rounded-lg px-3 py-2.5 text-sm focus:border-k outline-none bg-k05/30 transition-colors"
                               placeholder="Tal cual aparece en documento"
                             />
                          </div>
                          <div>
                             <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Fecha Nacimiento</label>
                             <input 
                               type="date" value={ben.nac} onChange={(e) => updateBen(idx, 'nac', e.target.value)}
                               className="w-full border border-k1 rounded-lg px-3 py-2.5 text-sm focus:border-k outline-none bg-k05/30"
                             />
                          </div>
                          <div>
                             <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Celular</label>
                             <input 
                               type="tel" value={ben.tel} onChange={(e) => updateBen(idx, 'tel', e.target.value)}
                               className="w-full border border-k1 rounded-lg px-3 py-2.5 text-sm focus:border-k outline-none bg-k05/30"
                               placeholder="3xx xxxxxxx"
                             />
                          </div>
                          <div>
                             <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Email</label>
                             <input 
                               type="email" value={ben.mail} onChange={(e) => updateBen(idx, 'mail', e.target.value)}
                               className="w-full border border-k1 rounded-lg px-3 py-2.5 text-sm focus:border-k outline-none bg-k05/30"
                               placeholder="correo@ejemplo.com"
                             />
                          </div>
                          <div>
                             <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Dirección</label>
                             <input 
                               type="text" value={ben.dir} onChange={(e) => updateBen(idx, 'dir', e.target.value)}
                               className="w-full border border-k1 rounded-lg px-3 py-2.5 text-sm focus:border-k outline-none bg-k05/30"
                               placeholder="Calle... Carrera..."
                             />
                          </div>
                          <div>
                             <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Barrio</label>
                             <input 
                               type="text" value={ben.barrio} onChange={(e) => updateBen(idx, 'barrio', e.target.value)}
                               className="w-full border border-k1 rounded-lg px-3 py-2.5 text-sm focus:border-k outline-none bg-k05/30"
                             />
                          </div>
                          <div className="lg:col-span-2">
                             <label className="flbl text-[9px] font-bold text-k5 uppercase mb-1.5 block">Punto de Referencia</label>
                             <input 
                               type="text" value={ben.ref} onChange={(e) => updateBen(idx, 'ref', e.target.value)}
                               className="w-full border border-k1 rounded-lg px-3 py-2.5 text-sm focus:border-k outline-none bg-k05/30"
                               placeholder="Ejem: Frente al parque, casa azul..."
                             />
                          </div>
                       </div>
                     </div>
                   ))}
                </div>

                <div className="spin-grid grid grid-cols-2 gap-3 mb-6">
                   <div className="spin-card bg-white border border-k1 rounded-xl p-4 shadow-s0 hover:shadow-s1 transition-shadow">
                      <div className="spin-ico w-8 h-8 rounded-lg bg-rl flex items-center justify-center mb-2.5 text-r"><Phone className="w-4 h-4"/></div>
                      <div className="spin-type text-[9px] font-extrabold text-k5 uppercase tracking-widest mb-1.5">Situación</div>
                      <div className="spin-q text-sm font-bold italic leading-relaxed">"¿Con quiénes convive? ¿Sus hijos están protegidos hoy ante una emergencia?"</div>
                   </div>
                   <div className="spin-card bg-white border border-k1 rounded-xl p-4 shadow-s0">
                      <div className="spin-ico w-8 h-8 rounded-lg bg-rl flex items-center justify-center mb-2.5 text-r"><AlertCircle className="w-4 h-4"/></div>
                      <div className="spin-type text-[9px] font-extrabold text-k5 uppercase tracking-widest mb-1.5">Problema</div>
                      <div className="spin-q text-sm font-bold italic leading-relaxed">"¿Cómo les afecta esperar horas en triaje por una fiebre a las 2 a.m.?"</div>
                   </div>
                </div>

                <div className="adres-tip bg-bl border border-bb rounded-xl p-4 flex gap-3 items-center">
                   <Info className="w-5 h-5 text-b shrink-0" />
                   <div>
                     <div className="adres-tip-label text-[9px] font-extrabold text-b uppercase tracking-widest mb-1">Dato Clave ADRES</div>
                     <p className="adres-tip-text text-xs italic font-medium">El cliente está en <span className="text-b font-bold">{formData.rEps || 'su EPS'}</span>. Resalte las demoras de triaje de esta entidad.</p>
                   </div>
                </div>
              </motion.div>
            )}

            {phase === 3 && (
              <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="phase max-w-[1000px] mx-auto">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <div className="ph-label text-[9px] font-extrabold text-r tracking-[0.3em] uppercase mb-1">Fase 03</div>
                    <div className="ph-title text-4xl font-black italic tracking-tighter uppercase leading-none mb-1.5">Oferta de Valor</div>
                    <div className="ph-desc text-sm text-k5">Presente la solución ideal basada en el diagnóstico.</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="sw-group bg-k05 border border-k1 rounded-xl p-1.5 flex gap-1 shadow-inner">
                      <button onClick={() => setSaleMode('NEW')} className={`sw px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${saleMode === 'NEW' ? 'bg-white text-r shadow-s0' : 'text-k5'}`}>Venta Nueva</button>
                      <button onClick={() => setSaleMode('CROSS')} className={`sw px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${saleMode === 'CROSS' ? 'bg-white text-r shadow-s0' : 'text-k5'}`}>Venta Cruzada</button>
                    </div>
                  </div>
                </div>

                {/* --- PLAN CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {['PLUS_DEB', 'TRAD_DEB', 'VIRTUAL'].map((id) => {
                    const p = id === 'VIRTUAL' ? TAR.VIRTUAL : (modPago === 'DEB' ? TAR[id] : TAR[id.replace('DEB', modPago)]);
                    if (!p) return null;
                    const isActive = activePlan.startsWith(id.split('_')[0]);
                    const price = getPriceForPlan(id);

                    return (
                      <div 
                        key={id} 
                        onClick={() => setActivePlan(id)}
                        className={`plan-card relative bg-white border-2 rounded-3xl p-6 transition-all cursor-pointer flex flex-col ${isActive ? 'border-r shadow-s2 scale-[1.02]' : 'border-k1 hover:border-k3 shadow-s0'}`}
                      >
                        {isActive && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-r text-white text-[9px] font-black uppercase px-4 py-1 rounded-full shadow-s1">Plan Seleccionado</div>}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="text-[10px] font-black text-k5 uppercase mb-1 tracking-widest">{p.n.split(' ')[1]}</div>
                            <div className="text-2xl font-black italic uppercase tracking-tight leading-none text-k">{p.n.split(' ')[0]}</div>
                          </div>
                          <div className="w-12 h-12 bg-k05 rounded-2xl flex items-center justify-center text-2xl">{id.includes('PLUS') ? '👑' : id.includes('TRAD') ? '🛡️' : '📱'}</div>
                        </div>
                        
                        <div className="mb-6 h-[140px] overflow-hidden">
                          <div className="text-[9px] font-black text-r uppercase mb-3 pb-2 border-b border-k05">Beneficios Elite</div>
                          <div className="flex flex-col gap-2">
                            {getBenefits(id).slice(0, 4).map((b, i) => (
                              <div key={i} className="flex gap-2 items-start">
                                <span className="text-xs">{b.e}</span>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-black uppercase leading-none">{b.t}</span>
                                  <span className="text-[9px] text-k3 leading-tight">{b.d}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-k05">
                           <div className="text-[9px] font-bold text-k5 uppercase mb-1">Inversión Mensual</div>
                           <div className="flex items-baseline gap-1.5">
                              <span className="text-3xl font-black font-mono text-k">{fmt(price)}</span>
                              <span className="text-[10px] text-k5 font-medium">/ mes</span>
                           </div>
                           <div className="mt-3 bg-k05 rounded-xl p-3 flex justify-between items-center">
                              <div className="text-[10px] font-bold text-k5 italic">Sólo {fmt(Math.round(price / 30))} x día</div>
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black border border-k1 shadow-sm">→</div>
                           </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="offer-dark bg-k text-white rounded-3xl p-10 relative overflow-hidden mb-12 shadow-s1">
                   <div className="absolute -top-24 -right-24 w-64 h-64 bg-r/20 rounded-full blur-[100px]" />
                   <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-b/10 rounded-full blur-[100px]" />
                   <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                         <div>
                            <div className="offer-label text-[10px] font-black text-r uppercase tracking-[0.4em] mb-3">Estrategia: Solución al Dolor (Hormozi Style)</div>
                            <div className="offer-headline text-5xl font-black italic tracking-tighter uppercase leading-none">
                              {saleMode === 'NEW' ? 'Tu Médico Personal 24/7' : 'Protección Total para tu Círculo'}
                            </div>
                         </div>
                         <div className="flex flex-col items-end">
                            <div className="text-[9px] font-black text-white/40 uppercase mb-1">Tarifa {TAR[activePlan]?.n}</div>
                            <div className="text-5xl font-black font-mono text-[#FFD600] leading-none mb-1">{fmt(currentPrice)}</div>
                            <div className="text-[10px] font-bold text-white/50">{numAfil} Persona{numAfil > 1 ? 's' : ''}</div>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
                        <div>
                          <p className="offer-script text-2xl font-semibold italic text-white/90 leading-relaxed mb-8 border-l-4 border-r pl-6">
                            {saleMode === 'NEW' 
                              ? `"${primerNombre(formData.fNom || formData.rNom)}, no le vendo un plan médico. Le devuelvo la tranquilidad de saber que si su hijo tiene fiebre a las 2 a.m., un médico estará en su puerta en minutos, evitándole el riesgo y el caos de una clínica pública."`
                              : `"${primerNombre(formData.fNom || formData.rNom)}, usted ya conoce la paz de tener a EMI. Hoy tiene la oportunidad única de extender esta muralla de protección a ${bens.map(b => b.nom || '[Beneficiario]').join(', ')} con un beneficio de fidelidad que no se repetirá."`
                            }
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4">
                             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                                <div className="text-[10px] font-black text-g uppercase mb-3 flex items-center gap-2 tracking-widest"><Shield className="w-3.5 h-3.5"/> Valor de Vida</div>
                                <div className="text-sm font-medium italic opacity-80 leading-relaxed">"Elimine el estrés de la incertidumbre. El médico llega a usted, usted no corre al hospital."</div>
                             </div>
                             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                                <div className="text-[10px] font-black text-b uppercase mb-3 flex items-center gap-2 tracking-widest"><Phone className="w-3.5 h-3.5"/> Acceso Inmediato</div>
                                <div className="text-sm font-medium italic opacity-80 leading-relaxed">"Ilimitado. Sin copagos extra. Sin autorizaciones eternas. Solo salud 24/7."</div>
                             </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4">
                           <div className="bg-[#FFD600] text-k rounded-2xl p-6 shadow-s2">
                              <div className="text-[10px] font-black uppercase mb-2 opacity-60">Matemática del Ahorro</div>
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-xs font-bold">Inversión x Día</span>
                                 <span className="text-lg font-black">{fmt(Math.round(currentPrice / 30))}</span>
                              </div>
                              <div className="h-[1px] bg-k/10 my-3" />
                              <div className="text-[11px] font-semibold italic leading-tight">
                                "Por lo que cuesta una gaseosa al día, garantizas un médico en la puerta de tu casa."
                              </div>
                           </div>

                           <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                              <div className="text-[10px] font-black text-white/40 uppercase mb-4 tracking-[0.2em]">Bonos Incluidos Hoy</div>
                              <div className="space-y-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-g/20 text-g flex items-center justify-center text-sm">🦷</div>
                                    <div className="text-xs font-bold">Urgencias Odontológicas Ilimitadas</div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-b/20 text-b flex items-center justify-center text-sm">🌎</div>
                                    <div className="text-xs font-bold">Cobertura Nacional e Internacional</div>
                                 </div>
                              </div>
                           </div>
                           
                           {COSTA_CITIES.some(c => formData.rCiudad.includes(c)) && (
                             <div className="bg-blue-600 text-white rounded-2xl p-5 flex items-center gap-4 shadow-s1 animate-pulse">
                               <div className="text-3xl">🌊</div>
                               <div>
                                 <div className="text-[10px] font-black uppercase">Exclusivo: Plan Costa</div>
                                 <div className="text-xs font-bold opacity-90 leading-tight">Bonificación de residente aplicada automáticamente.</div>
                               </div>
                             </div>
                           )}
                        </div>
                      </div>
                   </div>
                </div>

                <div className="flex justify-center gap-8 items-center bg-white border border-k1 rounded-2xl p-8 shadow-s0">
                   <div className="text-center">
                      <div className="text-[10px] font-black text-k5 uppercase mb-1">Médicos</div>
                      <div className="text-2xl font-black">900+</div>
                   </div>
                   <div className="w-[1px] h-10 bg-k1" />
                   <div className="text-center">
                      <div className="text-[10px] font-black text-k5 uppercase mb-1">Especialistas</div>
                      <div className="text-2xl font-black">1.200+</div>
                   </div>
                   <div className="w-[1px] h-10 bg-k1" />
                   <div className="text-center">
                      <div className="text-[10px] font-black text-k5 uppercase mb-1">Satisfacción</div>
                      <div className="text-2xl font-black text-g">9.8/10</div>
                   </div>
                </div>
              </motion.div>
            )}

            {phase === 4 && (
              <motion.div key="p4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="phase max-w-[900px] mx-auto">
                 <div className="ph-label text-[9px] font-extrabold text-r tracking-[0.3em] uppercase mb-1">Fase 04</div>
                 <div className="ph-title text-4xl font-black italic tracking-tighter uppercase leading-none mb-1.5">Gestión de Fricción</div>
                 <div className="ph-desc text-sm text-k5 mb-8">Use el método AAA (Reconocer, Preguntar, Aconsejar) para desarmar objeciones.</div>

                 <div className="aaa-grid grid grid-cols-3 gap-3 mb-6">
                    <div className="aaa-card aaa-r bg-rl border-rb text-r rounded-xl p-5">
                       <div className="aaa-label text-[9px] font-extrabold uppercase mb-2 opacity-80">Reconocer</div>
                       <div className="aaa-text text-sm font-bold italic leading-relaxed">"Entiendo que cuida su presupuesto. Imagine que un café al día le garantiza hospitalización en casa..."</div>
                    </div>
                    <div className="aaa-card aaa-b bg-bl border-bb text-b rounded-xl p-5">
                       <div className="aaa-label text-[9px] font-extrabold uppercase mb-2 opacity-80">Preguntar</div>
                       <div className="aaa-text text-sm font-bold italic leading-relaxed">"¿Si hoy surge una fiebre a las 3 a.m., qué le daría más paz: ir a urgencias o llamar a EMI?"</div>
                    </div>
                    <div className="aaa-card aaa-g bg-gl border-gb text-g rounded-xl p-5">
                       <div className="aaa-label text-[9px] font-extrabold uppercase mb-2 opacity-80">Aconsejar</div>
                       <div className="aaa-text text-sm font-bold italic leading-relaxed">"Le aconsejo activar hoy el precio de bienvenida. La salud no avisa y este ahorro expira al colgar."</div>
                    </div>
                 </div>

                 <div className="open-matrix-banner bg-k text-white rounded-xl p-5 flex items-center justify-between shadow-s1">
                    <div className="omx-text">
                       <div className="t text-[10px] font-extrabold text-r uppercase tracking-widest mb-1">¿Sigue habiendo dudas?</div>
                       <div className="d text-sm font-medium opacity-70">Accede a la matriz completa de guiones (Tracy/Hormozi).</div>
                    </div>
                    <button onClick={() => setShowObj(true)} className="bg-r text-white font-bold text-xs px-6 py-2.5 rounded-lg uppercase shadow-[0_4px_12px_rgba(232,0,29,0.4)]">Matriz Objeciones</button>
                 </div>
              </motion.div>
            )}

            {phase === 5 && (
              <motion.div key="p5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="phase max-w-[900px] mx-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="ph-label text-[9px] font-extrabold text-r tracking-[0.3em] uppercase mb-1">Fase 05</div>
                    <div className="ph-title text-4xl font-black italic tracking-tighter uppercase leading-none mb-1.5">Legalización</div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div className="mod-label text-[9px] font-bold text-k5 uppercase mb-1">Modalidad de Pago</div>
                    <div className="mod-pills bg-k05 border border-k1 rounded-lg p-1 flex gap-1 mb-2">
                      {['DEB', 'LOC', 'DOM'].map(m => (
                        <button key={m} onClick={() => updateModPago(m)} className={`mod-pill px-3 py-1.5 rounded-md text-[10px] font-extrabold uppercase transition-all ${modPago === m ? 'bg-white text-r shadow-s0' : 'text-k5'}`}>
                          {m === 'DEB' ? 'Débito' : m === 'LOC' ? 'Local' : 'Domi'}
                        </button>
                      ))}
                    </div>
                    <div className="mod-label text-[9px] font-bold text-k5 uppercase mb-1">Titularidad Bancaria</div>
                    <div className="mod-pills bg-k05 border border-k1 rounded-lg p-1 flex gap-1">
                      {['MISMO', 'TERCERO'].map(t => (
                        <button key={t} onClick={() => setTitular(t)} className={`mod-pill px-3 py-1.5 rounded-md text-[10px] font-extrabold uppercase transition-all ${titular === t ? 'bg-white text-r shadow-s0' : 'text-k5'}`}>{t === 'MISMO' ? 'Titular' : 'Otra Persona'}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card bg-white border border-k1 rounded-2xl p-6 shadow-s0 mb-6">
                  <div className="form-grid grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="form-field md:col-span-2 flex flex-col gap-1.5">
                       <label className="flbl text-[9px] font-bold text-k5 uppercase tracking-widest">Nombre del Titular</label>
                       <input value={formData.fNom} onChange={(e) => setFormData({...formData, fNom: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-k05/20" placeholder="Nombre completo" />
                    </div>
                    <div className="form-field flex flex-col gap-1.5">
                       <label className="flbl text-[9px] font-bold text-k5 uppercase">Cédula</label>
                       <input value={formData.rCed} onChange={(e) => setFormData({...formData, rCed: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-k05/20" />
                    </div>
                    <div className="form-field flex flex-col gap-1.5">
                       <label className="flbl text-[9px] font-bold text-k5 uppercase">Nacimiento</label>
                       <input type="date" value={formData.fNac} onChange={(e) => setFormData({...formData, fNac: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-k05/20" />
                    </div>
                    <div className="form-field flex flex-col gap-1.5">
                        <label className="flbl text-[9px] font-bold text-k5 uppercase">Celular</label>
                        <input value={formData.fTel} onChange={(e) => setFormData({...formData, fTel: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-k05/20" />
                    </div>
                    <div className="form-field flex flex-col gap-1.5">
                        <label className="flbl text-[9px] font-bold text-k5 uppercase">Email</label>
                        <input value={formData.fEmail} onChange={(e) => setFormData({...formData, fEmail: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-k05/20" />
                    </div>
                    <div className="form-field md:col-span-2 flex flex-col gap-1.5">
                       <label className="flbl text-[9px] font-bold text-k5 uppercase">Dirección de Residencia</label>
                       <input value={formData.fDir} onChange={(e) => setFormData({...formData, fDir: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-k05/20" />
                    </div>
                    <div className="form-field flex flex-col gap-1.5">
                       <label className="flbl text-[9px] font-bold text-k5 uppercase">Barrio</label>
                       <input value={formData.fBarrio} onChange={(e) => setFormData({...formData, fBarrio: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-k05/20" />
                    </div>
                    <div className="form-field md:col-span-3 flex flex-col gap-1.5">
                       <label className="flbl text-[9px] font-bold text-k5 uppercase">Puntos de Referencia</label>
                       <input value={formData.fRef} onChange={(e) => setFormData({...formData, fRef: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-k05/20" />
                    </div>
                  </div>

                  {modPago === 'DEB' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bank-section pt-4 border-t border-k1 grid grid-cols-3 gap-4">
                       <div className="form-field flex flex-col gap-1.5">
                          <label className="flbl text-[9px] font-bold text-k5 uppercase">Banco</label>
                          <select value={formData.fBanco} onChange={(e) => setFormData({...formData, fBanco: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-white">
                             <option>Bancolombia</option><option>Davivienda</option><option>BBVA</option>
                          </select>
                       </div>
                       <div className="form-field flex flex-col gap-1.5">
                          <label className="flbl text-[9px] font-bold text-k5 uppercase">Tipo Cuenta</label>
                          <select value={formData.fTipoCuenta} onChange={(e) => setFormData({...formData, fTipoCuenta: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none bg-white">
                             <option>Ahorros</option><option>Corriente</option>
                          </select>
                       </div>
                       <div className="form-field flex flex-col gap-1.5">
                          <label className="flbl text-[9px] font-bold text-k5 uppercase">Últimos 4 Dígitos</label>
                          <input maxLength={4} value={formData.fDigitos} onChange={(e) => setFormData({...formData, fDigitos: e.target.value})} className="border border-k1 rounded-lg px-3 py-2 text-sm focus:border-k outline-none" placeholder="XXXX" />
                       </div>
                    </motion.div>
                  )}
                </div>

                <div className="guion-wrap bg-white border border-k1 rounded-xl shadow-s0 overflow-hidden">
                   <div className="guion-header bg-k05 border-b border-k1 px-5 py-3 flex justify-between items-center">
                      <div className="guion-title flex items-center gap-2 text-[10px] font-extrabold uppercase text-k5"><Shield className="w-4 h-4"/> Guión Legal Confronta</div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(getLegal1());
                            showToast('✓ Script legal copiado');
                          }}
                          className="flex items-center gap-1.5 text-[9px] font-bold text-b hover:text-r transition-colors"
                        >
                          <Clipboard className="w-3 h-3"/> Copiar Script
                        </button>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-r"><div className="w-1.5 h-1.5 bg-r rounded-full animate-pulse" /> Grabación Activa</div>
                      </div>
                   </div>
                   <div className="guion-body p-6 text-[12px] text-k5 leading-relaxed">
                      <div className="g-section-label bg-k text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase mb-3 inline-block">Introducción</div>
                       <div className="italic mb-6 space-y-4">
                          <p>Buenos días/tardes sr/Sra. <span className="text-r font-bold">{formData.fNom || formData.rNom || '(Nombre del Usuario)'}</span>, mi nombre es: <span className="text-r font-bold">{agentName || '(Nombre Completo Asesor/a)'}</span> Ejecutiva Comercial del grupo emi.</p>
                          <p>Le recuerdo que esta llamada es grabada y monitoreada para efectos de calidad en el servicio.</p>
                          <p>Para continuar con el proceso de verificación, realizaré unas preguntas de confirmación y validación, donde solo deberá responder si o no.</p>
                          <p><strong>Antes de iniciar quiero dejar por sentado que se informó de:</strong><br/>
                          • "Emi, somos su médico personal 24/7 al alcance de su mano donde estés para solucionar dudas y situaciones de salud de manera presencial o virtual"<br/>
                          • "Tenemos acceso multicanal: esto quiere decir, que el afiliado tiene la opción de elegir como desea acceder a nuestro servicio" (línea atención telefónica o app).<br/>
                          • "Por ser afiliado emi tiene beneficios: video consulta, atención medica domiciliaria, emi especialistas, cobertura nacional e internacional."</p>
                          <p><strong>Adicionalmente le recuerdo que tiene orientación médica para:</strong><br/>
                          • Emergencia, es una situación de salud en la que está comprometida la vida del paciente y debe ser atendida de forma inmediata<br/>
                          • Urgencia, situación de salud en la cual la vida del paciente no está comprometida, pero se requiere de atención oportuna.<br/>
                          • Consulta médica domiciliaria cualquier situación de salud que requiere de una valoración médica y no comprometa la vida del paciente.</p>
                          <p>Teniendo en cuenta lo anterior iniciaremos con el proceso de validación y verificación de identidad.</p>
                       </div>
                      
                      <div className="g-legal-box bg-rl border border-rb rounded-xl p-5 mb-4">
                         <div className="g-legal-label flex justify-between text-[9px] font-extrabold text-r uppercase mb-3"><span>Legal 1</span> <span>Lectura Textual</span></div>
                         <div className="g-legal-text text-base font-extrabold text-k leading-snug">
                            {renderLegal1()}
                         </div>
                      </div>

                      <div className="g-legal-box bg-bl border border-bb rounded-xl p-5 shadow-sm mb-4">
                         <div className="g-legal-label flex justify-between text-[9px] font-extrabold text-b uppercase mb-3"><span>Legal 2</span> <span>Términos y Condiciones</span></div>
                         <div className="g-legal-text text-sm font-extrabold text-k leading-snug">
                           {`Señor/a ${formData.fNom || formData.rNom || '(Nombre del Usuario)'}, ¿certifica usted que conoce y acepta, todos los términos y condiciones del contrato, así como la política de tratamiento de datos personales de grupo emi s.a.s?`}
                         </div>
                      </div>

                      <div className="g-legal-box bg-bl border border-bb rounded-xl p-5 shadow-sm mb-4">
                         <div className="g-legal-label flex justify-between text-[9px] font-extrabold text-b uppercase mb-3"><span>Legal 3</span> <span>Validación Identidad</span></div>
                         <div className="g-legal-text text-sm font-extrabold text-k leading-snug">
                           {`Señor/a ${formData.fNom || formData.rNom || '(Nombre del Usuario)'}, autoriza usted a grupo emi s.a.s., para validar su identidad por medio de 5 preguntas.`}
                         </div>
                      </div>

                      <div className="g-legal-box bg-gl border border-gb rounded-xl p-5 shadow-sm mb-4">
                         <div className="g-legal-label flex justify-between text-[9px] font-extrabold text-g uppercase mb-3"><span>✅</span> <span>Confronta Exitoso</span></div>
                         <div className="g-legal-text text-sm font-extrabold text-k leading-snug">
                           {`Señor/a ${formData.fNom || formData.rNom || '(Nombre del Usuario)'}, le informo que el proceso de validación fue exitoso, cuando el servicio se encuentre activo, usted recibirá correo electrónico, en un promedio de 72 horas hábiles.`}
                         </div>
                      </div>

                      <div className="g-legal-box bg-yl border border-yb rounded-xl p-5 shadow-sm">
                         <div className="g-legal-label flex justify-between text-[9px] font-extrabold text-y uppercase mb-3"><span>📋</span> <span>Confirmación Final</span></div>
                         <div className="g-legal-text text-sm font-extrabold text-k leading-snug">
                           {`Señor(a) ${formData.fNom || formData.rNom || '(Nombre Cliente)'}, con numero de cedula ${formData.rCed || '(# de cedula)'}, le confirmo que el PLAN DE SALUD que ha contratado con EMI FALCK es el siguiente: ${TAR[activePlan]?.n || '(Nombre Plan)'}: ${getBenefits(activePlan).map(b => b.t).join(', ')}, VALOR DE INSCRIPCIÓN ${fmt(TAR[activePlan]?.adh || 0)} Y VALOR DE MENSUALIDAD ${fmt(getPrice())} POR CADA AFILIADO, para las siguientes personas: ${bens.map(b => b.nom || '(Nombre)').join(', ')}. ¿Está de acuerdo con estas condiciones? SI/NO.`}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {phase === 6 && (
              <motion.div key="p6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="phase max-w-[900px] mx-auto text-center">
                 <div className="success-box bg-white border border-k1 rounded-3xl p-12 shadow-s2 relative overflow-hidden">
                    <div className="success-top-bar absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-g to-g/60" />
                    <div className="success-icon w-20 h-20 rounded-full bg-gl border-2 border-g/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-g" />
                    </div>
                    <h2 className="success-title text-4xl font-black italic tracking-tighter uppercase mb-4 text-k">¡Venta Exitosa!</h2>
                    <p className="success-script text-base text-k5 italic leading-relaxed mb-8 max-w-md mx-auto">
                      "Bienvenido a la familia <span className="text-r font-bold">EMI</span>. Su servicio se activará en un máximo de <span className="text-k font-bold">72 horas hábiles</span>."
                    </p>

                    <div className="success-channels grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
                       <div className="channel-card bg-k05 border border-k1 rounded-xl p-4">
                          <div className="channel-ico text-2xl mb-1">📍</div>
                          <div className="channel-label text-[9px] font-bold text-k5 uppercase mb-1">Tu Ciudad</div>
                          <div className="channel-val text-sm font-bold">{formData.rCiudad}</div>
                       </div>
                       <div className="channel-card bg-k05 border border-k1 rounded-xl p-4">
                          <div className="channel-ico text-2xl mb-1">📞</div>
                          <div className="channel-label text-[9px] font-bold text-k5 uppercase mb-1">Línea Atención</div>
                          <div className="channel-val text-sm font-bold">
                            {EF_CIUDADES[formData.rCiudad.toUpperCase()] ? EF_CIUDADES[formData.rCiudad.toUpperCase()].numeros.join(' · ') : '601 745 7859'}
                          </div>
                       </div>
                    </div>

                    <div className="success-farewell text-lg italic text-k5 mb-10">
                       "Fue un placer atenderle, le habló <span className="text-r font-bold">{agentName || 'su ejecutivo'}</span>, su asesor de confianza."
                    </div>

                    <div className="flex justify-center gap-3">
                       <button 
                         onClick={downloadSummary}
                         className="bg-k text-white font-bold text-xs px-6 py-3 rounded-lg uppercase flex items-center gap-2 hover:bg-r transition-all"
                       >
                         <Download className="w-4 h-4"/> Bajar Resumen
                       </button>
                       <button 
                         onClick={() => setPhase(1)}
                         className="bg-k05 text-k5 font-bold text-xs px-6 py-3 rounded-lg border-2 border-k1 uppercase hover:border-k transition-all flex items-center gap-2"
                       >
                         <RefreshCw className="w-4 h-4"/> Nueva Llamada
                       </button>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="nav-row max-w-[900px] mx-auto pb-10 flex justify-between">
            <button 
              disabled={phase === 1}
              onClick={() => handleNav(phase - 1)}
              className="nav-btn nav-prev flex items-center gap-1.5 text-xs font-extrabold text-k5 uppercase disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" /> Atrás
            </button>
            <button 
              disabled={phase === 6}
              onClick={() => handleNav(phase + 1)}
              className="nav-btn nav-next bg-k text-white px-8 py-3 rounded-xl flex items-center gap-2 text-xs font-extrabold uppercase shadow-s1 hover:bg-r transition-all disabled:opacity-0"
            >
              {phase === 5 ? 'Finalizar Venta' : 'Siguiente'} <ChevronRight className="w-4 h-4" />
            </button>
          </footer>
        </main>
      </div>

      {/* --- SIDE OVERLAY: OBJECIONES --- */}
      <AnimatePresence>
        {showObj && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="obj-overlay fixed top-[52px] right-0 bottom-0 w-[420px] bg-white border-l border-k1 shadow-s2 z-[100] flex flex-col"
          >
            <div className="obj-overlay-hdr bg-r text-white p-4 flex justify-between items-center">
              <span className="font-black italic uppercase text-sm tracking-tight">Matriz de Objeciones</span>
              <button onClick={() => setShowObj(false)} className="bg-white/20 hover:bg-white/30 p-1.5 rounded-lg"><X className="w-4 h-4"/></button>
            </div>
            <div className="obj-search-wrap p-3 border-b border-k1">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-k3" />
                 <input 
                  placeholder="Buscar objeción..."
                  value={objFilter}
                  onChange={(e) => setObjFilter(e.target.value)}
                  className="obj-search w-full bg-k05 border border-k1 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-k outline-none" 
                 />
               </div>
            </div>
            <div className="obj-list flex-1 overflow-y-auto p-4 flex flex-col gap-3">
               {OBJECIONES.filter(o => o.obj.toLowerCase().includes(objFilter.toLowerCase()) || o.topic.toLowerCase().includes(objFilter.toLowerCase())).map((o, i) => (
                 <div key={i} className="obj-item border border-k1 rounded-xl overflow-hidden hover:shadow-s0 transition-all">
                    <div className="obj-q p-4 cursor-pointer hover:bg-k05">
                       <div className="text-[8px] font-extrabold text-k5 uppercase mb-1">{o.topic}</div>
                       <div className="text-sm font-bold italic tracking-tight leading-tight border-l-2 border-r pl-2.5">"{o.obj}"</div>
                    </div>
                    <div className="obj-body p-4 pt-0 flex flex-col gap-2">
                       <div className="obj-method-block omb-r bg-rl border border-rb rounded-lg p-3">
                          <div className="omb-label text-[8.5px] font-black text-r uppercase mb-1">Guión Ganador</div>
                          <p className="omb-text text-[11px] font-medium leading-relaxed italic">"{o.guion}"</p>
                       </div>
                       <div className="obj-method-block omb-b bg-bl border border-bb rounded-lg p-3">
                          <div className="omb-label text-[8.5px] font-black text-b uppercase mb-1">Tracy Style</div>
                          <p className="omb-text text-[11px] font-medium leading-relaxed italic">"{o.tracy}"</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`toast fixed bottom-5 left-1/2 -translate-x-1/2 translate-y-20 bg-k text-white font-mono text-xs px-5 py-3 rounded-lg shadow-s2 transition-all z-[1000] ${toast ? 'on opacity-100 !translate-y-0' : 'opacity-0'}`}>
        {toast}
      </div>
    </div>
  );
}
