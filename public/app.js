/* ══════════════════════════════════════
   DATOS TARIFARIO (Estructura 2026)
══════════════════════════════════════ */
const TAR = {
  // PLUS (8/8 Beneficios)
  PLUS_DEB: { n: 'EMI Plus Débito', t: { 1: 77400, 2: 71400, 3: 68200, 4: 65600, 5: 65600 }, adh: 77400, mod: 'DEB' },
  PLUS_LOC: { n: 'EMI Plus Local Pago', t: { 1: 87400, 2: 81400, 3: 78200, 4: 75600, 5: 75600 }, adh: 87400, mod: 'LOC' },
  PLUS_DOM: { n: 'EMI Plus Domicilio', t: { 1: 92400, 2: 86400, 3: 83200, 4: 80600, 5: 80600 }, adh: 92400, mod: 'DOM' },
  
  // TRADICIONAL (6/8 Beneficios)
  TRAD_DEB: { n: 'EMI Tradicional Débito', t: { 1: 58800, 2: 54100, 3: 51400, 4: 49400, 5: 49400 }, adh: 58800, mod: 'DEB' },
  TRAD_LOC: { n: 'EMI Tradicional Local Pago', t: { 1: 68800, 2: 64100, 3: 61400, 4: 59400, 5: 59400 }, adh: 68800, mod: 'LOC' },
  TRAD_DOM: { n: 'EMI Tradicional Domicilio', t: { 1: 73800, 2: 69100, 3: 66400, 4: 64400, 5: 64400 }, adh: 73800, mod: 'DOM' },
  
  // ESPECIALES
  SUBSIDIADO: { n: 'EMI Subsidiado', t: { 1: 67000, 2: 67000, 3: 67000, 4: 67000, 5: 67000 }, adh: 67000, mod: 'DEB' },
  VIRTUAL: { n: 'EMI Virtual', t: { 1: 26400, 2: 26400, 3: 26400, 4: 24600, 5: 24600 }, adh: 26400, mod: 'DEB' }
};

const PLAN_COSTA = {
  TRAD_DEB: 38100, PLUS_DEB: 44000,
  TRAD_LOC: 43100, PLUS_LOC: 49000,
};

const PERSONAS = [
  {id:'familia',  e:'👨‍👩‍👧', n:'Padre/Madre de Familia', s:'"Como cabeza de hogar, usted sabe que la salud de sus hijos no espera. ¿Qué valor tiene para usted que un pediatra esté en su sala en minutos, sin exponer a sus pequeños al virus del hospital?"'},
  {id:'soltero',  e:'💼', n:'Adulto Independiente',     s:'"Usted trabaja duro y sabe que el tiempo es dinero. ¿Cuántas horas ha perdido en urgencias? Con EMI eso se acabó — médico en su casa, usted sigue produciendo."'},
  {id:'cuidador', e:'👴', n:'Hijo Cuidador',             s:'"¿Tiene a sus padres solos en casa? Una caída, un dolor de pecho, un mareo — EMI es la red de seguridad que le permite trabajar tranquilo sabiendo que un médico puede estar con ellos en minutos."'},
];

const BENEFITS = [
  {e:'🚑', t:'Urgencias 24/7', d:'Médico en puerta <45 min'},
  {e:'📱', t:'Videoconsulta', d:'Ilimitada, sin costo extra'},
  {e:'💬', t:'Chat Médico', d:'Orientación inmediata'},
  {e:'🏠', t:'Comodidad Total', d:'Sin filas ni salas de espera'},
  {e:'👶', t:'Protección Infantil', d:'Pediatra 24/7 a domicilio'},
  {e:'🦷', t:'Urgencias Odonto', d:'Sin dolor de muela sin solución'},
  {e:'👨‍⚕️', t:'Especialistas', d:'Tarifa preferencial VIP'},
  {e:'🌎', t:'Red SIEM', d:'Cobertura nacional e intl.'},
];

const BENEFITS_BY_PLAN = {
  PLUS_DEB: ['🚑','📱','💬','🏠','👶','🦷','👨‍⚕️','🌎'],
  PLUS_LOC: ['🚑','📱','💬','🏠','👶','🦷','👨‍⚕️','🌎'],
  PLUS_DOM: ['🚑','📱','💬','🏠','👶','🦷','👨‍⚕️','🌎'],
  TRAD_DEB: ['🚑','📱','💬','🏠','👶','🌎'],
  TRAD_LOC: ['🚑','📱','💬','🏠','👶','🌎'],
  TRAD_DOM: ['🚑','📱','💬','🏠','👶','🌎'],
  SUBSIDIADO: ['🚑','📱','💬','🏠','👶','🌎'],
  VIRTUAL: ['📱','💬','🌎'],
};

const OBJECIONES = [
  {topic:'Presupuesto', obj:'Es muy caro / No hay presupuesto.', pnl:'Entiendo que cuida su dinero. Imagine la paz mental de saber que por $2.000 diarios, menos que un café, tiene un médico en su sala sin pagar un peso más.', tracy:'¿El precio es lo único que nos impide trabajar hoy? Véalo como un fondo de ahorro: una sola urgencia particular cuesta 5 meses de nuestra mensualidad.', hormozi:'Si no te afilias, igual gastarás ese dinero en taxis y copagos de EPS. Aquí compras tranquilidad ilimitada por el precio de dos pizzas. Es un trato ridículo.'},
  {topic:'Pareja', obj:'Debo consultarlo con mi esposo/a.', pnl:'Valoro que decidan juntos. Si pudiera sentir ahora que ante un vómito a las 3 a.m. un médico llega en minutos, ¿qué diría su pareja?', tracy:'Entiendo. Si su pareja estuviera aquí, ¿qué pregunta cree que me haría? Despejémosla para que le lleve la información completa y segura.', hormozi:'Entiendo, pero la salud no espera. El bono de $38.500 expira al colgar. Tienes 5 días para retractarte, pero si esperas, pierdes el ahorro hoy.'},
  {topic:'Información', obj:'Envíeme la info al WhatsApp.', pnl:'Claro, ya se la envío. Pero escuche esto: mi sistema solo sostiene el cupo preferencial mientras estamos en línea. Validemos su cobertura rápido.', tracy:'Para que la info le sea útil, ¿qué es lo más importante hoy: la rapidez de atención o el ahorro en especialistas? Así le envío solo lo vital.', hormozi:'Te la envío, pero tienes 50 chats sin leer. Tardamos 3 minutos en verificar si calificas para el descuento de bienvenida. ¿Cuál es su dirección?'},
  {topic:'Competencia', obj:'Ya tengo Plan Premium / Prepagada.', pnl:'Excelente que esté protegido. Su plan es de "hotelería" para cuando ya está en la clínica; EMI es la logística para que no tenga que ir allá.', tracy:'Muchos clientes pensaban igual hasta que vieron que EMI resuelve el 80% de los casos en su cama. ¿Prefiere esperar horas en triaje o que el médico llegue?', hormozi:'Tener Prepagada sin EMI es como un Ferrari sin llaves. Tienes salud, pero no acceso rápido. Por $2.000 al día saltas la fila de urgencias de la EPS.'},
  {topic:'Salud', obj:'Yo casi no me enfermo.', pnl:'Qué buena noticia. EMI es para proteger esa salud. Nadie planea una apendicitis. Es mejor tener al médico y no necesitarlo, ¿verdad?', tracy:'Usted es el perfil ideal: riesgo bajo. Pero la salud no avisa. EMI es su seguro de disponibilidad 24/7. Un solo traslado evitado y se pagó solo.', hormozi:'Es como el seguro del auto: pagas para no chocar. Si hoy te da un cólico fuerte, ¿prefieres buscar un taxi o hundir un botón en tu App?'},
  {topic:'Tiempos', obj:'Las ambulancias se demoran mucho.', pnl:'Siento que haya escuchado eso. Por eso creamos la Telemedicina 24/7: mientras la móvil llega, usted ya está hablando con el médico por video.', tracy:'Clasificamos por gravedad. En una emergencia vital somos prioridad absoluta. ¿No le daría paz saber que lo atienden en su propia cama y no en una silla?', hormozi:'El tráfico es real, por eso resolvemos el 95% de casos en casa vía virtual o presencial. No te dejamos solo; estamos en tu celular en segundos.'},
  {topic:'Fallecido', obj:'El afiliado ya falleció.', pnl:'Lamento profundamente su pérdida. Entiendo que su prioridad es organizar todo. Queremos apoyarlos para que el resto de la familia no quede desprotegida.', tracy:'Le ofrezco mis condolencias. Para apoyarla, aplicaremos el "Precio de Lealtad" ($58.800) para que usted mantenga su protección ahora que está sola.', hormozi:'Siento mucho lo ocurrido. El trámite es enviar el acta. Pero no dejes que el resto de la familia quede expuesta. Bajemos tu tarifa para que sigas protegida.'},
  {topic:'Bancario', obj:'Me da inseguridad dar mi cuenta bancaria.', pnl:'Comprendo su cautela. Vea esto: EMI es vigilada por la Supersalud. Solo enlazamos la cuenta para su comodidad, nunca pedimos claves.', tracy:'Es una duda razonable. Trabajamos con los principales bancos del país mediante enlaces cifrados. ¿Qué le daría más seguridad para proceder?', hormozi:'No pedimos contraseñas, solo el número para cobrarte los $2.000 diarios. Es más seguro que pagarle a un cobrador en la calle. Hagamos el enlace.'},
  {topic:'EPS', obj:'Estoy en el Régimen Subsidiado.', pnl:'Perfecto. Tenemos un plan especial para usted sin cuota de adhesión y con bonos por hospitalización. Es protección de élite a su alcance.', tracy:'Usted también merece atención rápida. Por solo $67.000 (Plan Subsidiado) evita las largas filas de la red pública en la madrugada.', hormozi:'El subsidiado no cobra entrada. Son $2.200 al día por tener un pediatra 24/7 en tu celular. No dejes a tus hijos sin ese respaldo.'},
  {topic:'Cobertura', obj:'Me mudé a una zona sin cobertura presencial.', pnl:'Entiendo. Aunque no llegue la móvil, usted sigue teniendo el Médico Virtual 24/7 y asistencia en viajes nacionales e internacionales.', tracy:'Si viaja o se mueve, EMI lo acompaña. La Red SIEM lo protege en 14 países. ¿No le gustaría mantener la orientación médica en su celular?', hormozi:'Perder el servicio físico no significa perder al médico. Tienes chats y videollamadas ilimitadas. Por la mitad del precio sigues conectado.'},
  {topic:'Permanencia', obj:'¿Hay cláusula de permanencia?', pnl:'Para nada. Usted es libre. Estamos tan seguros de nuestro servicio que puede retirarse cuando quiera avisando 30 días antes.', tracy:'Nuestra meta es que se quede por calidad, no por contrato. Puede probar la experiencia EMI hoy y decidir mes a mes.', hormozi:'Cero contratos largos. Entras hoy, si no te gusta, te vas. Pero una vez que veas que el médico llega a tu casa, no querrás volver a las filas.'},
  {topic:'Tarifa', obj:'La tarifa me aumentó mucho este año.', pnl:'Veo lo que dice. Por eso lo llamo: para dejarle una tarifa fija y permanente de $58.800 al afiliar a su familiar hoy.', tracy:'Entiendo su malestar. Mi labor hoy es ajustar su plan como Cliente Preferencial para que ese valor no vuelva a subir de forma inesperada.', hormozi:'El sistema sube precios si no estás en plan grupal. Si agregas a tu hijo hoy, tu precio baja y el de él queda en bono. Es ganar-ganar.'},
  {topic:'Afiliados', obj:'No tengo a quién más afiliar.', pnl:'No hay problema. Puede afiliarse usted mismo como beneficiario para que también reciba la atención y baje el costo de su factura total.', tracy:'A veces pensamos solo en los demás. Pero usted es quien paga; ¿no cree que usted también merece ser atendido en casa si se enferma?', hormozi:'Afíliate tú. Pagas casi lo mismo por uno que por dos en el plan tradicional. Es como tener un segundo servicio gratis. ¿Lo activamos?'},
  {topic:'Pago', obj:'Prefiero pagar en el banco o corresponsal.', pnl:'Claro, puede hacerlo por "Local Pago". Es un poco más, pero le da la libertad de pagar donde quiera (Efecty, Bancolombia).', tracy:'Si la comodidad es su prioridad, el débito automático le ahorra $13.000 mensuales y no tiene que hacer filas. ¿Le parece un buen ahorro?', hormozi:'Pagar en caja es tirar $150.000 al año a la basura. Enlaza tu cuenta, ahorra ese dinero y olvídate de las fechas de vencimiento.'},
  {topic:'ADRES', obj:'Mi EPS está suspendida / No aparezco.', pnl:'No se preocupe. Solo necesitamos que descargue el certificado de que pertenece a una EPS. Con eso legalizamos su protección hoy mismo.', tracy:'Para servirle como complemento, el sistema exige estar en una entidad de salud. Si me envía el pantallazo de ADRES, procedemos de una vez.', hormozi:'Sin EPS no hay EMI. Es la ley. Descarga el certificado de Sanitas en 2 minutos, me lo pasas y activamos tu médico personal hoy.'},
  {topic:'Virus', obj:'Me da miedo el hospital por los virus.', pnl:'Esa es la razón principal de EMI. Evitamos que se exponga a virus intrahospitalarios resolviendo el 95% de casos en su hogar.', tracy:'Usted tiene toda la razón. Ir a urgencias es un riesgo. Con EMI, el médico va a su cama con protocolos de bioseguridad estrictos.', hormozi:'Ir al hospital por una gripe es buscarse un problema mayor. Quédate en tu cama, que nosotros llevamos la clínica a tu casa.'},
  {topic:'Tiempo', obj:'Llámeme el próximo mes, estoy ocupado.', pnl:'Entiendo su tiempo. Pero el bono de $38.500 es solo por hoy. Validemos su dirección en 60 segundos para que no pierda el beneficio.', tracy:'¿Qué va a cambiar el próximo mes? La salud no avisa. Permítame 2 minutos para explicarle por qué hoy es el día más económico para entrar.', hormozi:'Si colgamos, el precio sube. Tu familia queda desprotegida 30 noches más. Hagámoslo en 3 minutos y duerme tranquilo hoy.'},
  {topic:'Calidad', obj:'¿Cómo sé si los médicos son buenos?', pnl:'Gran pregunta. Todos nuestros médicos están certificados y entrenados en Soporte Vital Avanzado. Son expertos en urgencias en casa.', tracy:'Somos parte de Falck (Dinamarca), líderes mundiales con 118 años de experiencia. Atendemos más de 9 millones de servicios al año.', hormozi:'No mandamos practicantes. Mandamos tripulaciones con médico y paramédico equipados con tecnología de punta. Calidad garantizada.'},
  {topic:'Facturación', obj:'Me preocupa que me cobren doble.', pnl:'Le aseguro que no pasará. Unificamos su cuenta para que pague un solo valor mensual debitado los primeros 5 días. Todo es transparente.', tracy:'Es una preocupación válida. El sistema genera una factura unificada. Usted recibirá el soporte en su correo antes de cada cobro.', hormozi:'Cero enredos. Te llega un correo con el contrato y el valor exacto. Si ves un peso de más, puedes reclamar ante la Supersalud.'},
  {topic:'Especialistas', obj:'Necesito especialistas rápido.', pnl:'Lo entiendo. Con EMI Especialistas accede a más de 900 expertos con citas en menos de 5 días hábiles y tarifas preferenciales.', tracy:'En la EPS una cita tarda meses. Con nosotros tiene prioridad. ¿Qué especialista usa más? Podemos darle la cita para la próxima semana.', hormozi:'Deja de rogarle a la EPS. Por $88.000 tienes al especialista que quieras, cuando quieras. Es el acceso más rápido de Colombia.'}
];

// Arreglo de Ciudades sin tildes ni caracteres extraños en las llaves para match perfecto
const CONTACTOS_CIUDADES = {
  'BOGOT': {ciudad: 'Bogotá', numeros: ['601 745 7859', '601 482 4040']},
  'BARRANQUILLA': {ciudad: 'Barranquilla', numeros: ['605 309 1823', '605 311 0100']},
  'CARTAGENA': {ciudad: 'Cartagena', numeros: ['605 693 1313', '605 642 4953']},
  'CALI': {ciudad: 'Cali', numeros: ['602 653 1313', '602 487 8995']},
  'CHIA': {ciudad: 'Chía - Cota - Cajicá', numeros: ['601 745 7859', '601 482 4040']},
  'CAJIC': {ciudad: 'Chía - Cota - Cajicá', numeros: ['601 745 7859', '601 482 4040']},
  'MANIZALES': {ciudad: 'Manizales', numeros: ['604 887 9911', '604 896 8267']},
  'MEDELLIN': {ciudad: 'Medellín', numeros: ['604 444 1330', '604 604 5853']},
  'PALMIRA': {ciudad: 'Palmira', numeros: ['602 285 5161', '602 487 8995']},
  'RIONEGRO': {ciudad: 'Rionegro', numeros: ['604 444 1330', '604 604 5853']},
  'PEREIRA': {ciudad: 'Pereira', numeros: ['606 313 5911', '606 348 9141']},
  'SANTA MARTA': {ciudad: 'Santa Marta', numeros: ['605 423 7201', '605 311 1150', '316 473 6949']},
};

const CIUDADES_COSTA = ['Barranquilla','Cartagena','Santa Marta'];

/* ══════════════════════════════════════
   ESTADO GLOBAL
══════════════════════════════════════ */
let numAfil=1, activePlan='PLUS_DEB', saleMode='NEW', modPago='DEB', titular='MISMO';
const STEPS = ['Protocolo','Diagnóstico','Oferta','Fricción','Legalización','Despedida'];

/* ══ INIT ══ */
(function init(){
  const nav = document.getElementById('stepsNav');
  STEPS.forEach((s,i)=>{
    const btn = document.createElement('button');
    btn.className = 'step-btn' + (i===0?' active':'');
    btn.id = 'sbtn-'+(i+1);
    btn.onclick = () => goPhase(i+1);
    btn.innerHTML = `<span class="step-num">${i+1}</span>${s}`;
    nav.appendChild(btn);
  });

  const pr = document.getElementById('personaRow');
  PERSONAS.forEach((p,i)=>{
    const b = document.createElement('button');
    b.className = 'persona-btn'+(i===0?' on':'');
    b.title = p.n; b.textContent = p.e;
    b.onclick = ()=>setPersona(i,b);
    pr.appendChild(b);
  });
  setPersona(0, pr.children[0]);

  renderObjeciones('');
  generarCamposBeneficiarios(1);
  updateOffer();
  updateFarewell();
})();

/* ══ NAVEGACIÓN ══ */
function goPhase(n){
  if(n<1||n>6) return;
  document.querySelectorAll('.phase').forEach(p=>p.classList.remove('active'));
  document.getElementById('phase-'+n).classList.add('active');
  document.querySelectorAll('.step-btn').forEach((b,i)=>{
    b.classList.remove('active','done');
    if(i+1<n) b.classList.add('done');
    else if(i+1===n) b.classList.add('active');
  });
  if(n===5) syncScripts();
  document.getElementById('main').scrollTop = 0;
}

/* ══ PERSONA ══ */
function setPersona(i, el){
  document.querySelectorAll('.persona-btn').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  const p = PERSONAS[i];
  document.getElementById('personaLabel').textContent = p.n.toUpperCase();
  document.getElementById('personaScript').textContent = p.s;
}

/* ══ PREGUNTA ADRES = BENEFICIARIO 1 ══ */
function setAdresIsBen1(isYes) {
  document.getElementById('isBen1-SI').classList.toggle('on', isYes);
  document.getElementById('isBen1-NO').classList.toggle('on', !isYes);
  if(isYes) {
      syncAdresToBen1();
      syncScripts();
  }
}

function syncAdresToBen1() {
  if(document.getElementById('isBen1-SI').classList.contains('on')) {
      const map = {
        'fNom': 'ben1_nom',
        'fNac': 'ben1_nac',
        'fTel': 'ben1_tel',
        'fEmail': 'ben1_mail',
        'fDir': 'ben1_dir',
        'fBarrio': 'ben1_barrio',
        'fRef': 'ben1_ref'
      };
      
      for(let tId in map) {
          const tEl = document.getElementById(tId);
          const bEl = document.getElementById(map[tId]);
          if(tEl && bEl) {
              bEl.value = tEl.value;
          }
      }
  }
}

/* ══ AFILIADOS DINÁMICOS ══ */
function setN(n, el){
  numAfil = n;
  document.querySelectorAll('.ab').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  generarCamposBeneficiarios(n);
  updateOffer(); 
  syncScripts();
}

function generarCamposBeneficiarios(cantidad){
  const container = document.getElementById('beneficiarios-container');
  if(!container) return;
  
  // Guardar datos actuales para que no se borren si sube/baja la cantidad
  let saved = {};
  for(let i=1; i<=5; i++){
    ['nom','nac','tel','mail','dir','barrio','ref'].forEach(k=>{
      let el = document.getElementById(`ben${i}_${k}`);
      if(el) saved[`ben${i}_${k}`] = el.value;
    });
  }

  let html = `<div class="beneficiarios-grid">`;
  for(let i = 1; i <= cantidad; i++){
    html += `
      <div class="ben-section-title">Datos del Beneficiario ${i}</div>
      <div class="form-field span2">
        <label class="flbl">Nombres y Apellidos Completos</label>
        <input type="text" id="ben${i}_nom" placeholder="Nombre completo" oninput="syncScripts()">
      </div>
      <div class="form-field">
        <label class="flbl">Fecha de Nacimiento</label>
        <input type="date" id="ben${i}_nac">
      </div>
      <div class="form-field">
        <label class="flbl">Celular</label>
        <input type="tel" id="ben${i}_tel" placeholder="3xx xxxxxxx">
      </div>
      <div class="form-field">
        <label class="flbl">Correo Electrónico</label>
        <input type="email" id="ben${i}_mail" placeholder="correo@ejemplo.com">
      </div>
      <div class="form-field span2">
        <label class="flbl">Dirección de Residencia</label>
        <input type="text" id="ben${i}_dir" placeholder="Calle / Carrera / Apto">
      </div>
      <div class="form-field">
        <label class="flbl">Barrio</label>
        <input type="text" id="ben${i}_barrio" placeholder="Nombre del barrio">
      </div>
      <div class="form-field span2">
        <label class="flbl">Puntos de Referencia</label>
        <input type="text" id="ben${i}_ref" placeholder="Frente al parque, casa azul...">
      </div>
    `;
  }
  html += `</div>`;
  container.innerHTML = html;

  // Restaurar datos
  for(let k in saved){
    let el = document.getElementById(k);
    if(el) el.value = saved[k];
  }

  // Sincronizar automáticamente si la opción ADRES = Ben1 está activa
  syncAdresToBen1();
}

/* ══ SALE MODE ══ */
function setSaleMode(m, el){
  saleMode = m;
  document.querySelectorAll('.sw').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  updateOffer();
  syncScripts();
}

/* ══ MODALIDAD PAGO ══ */
function setMod(m, el){
  modPago = m;
  document.querySelectorAll('.mod-pill[id^="mp-"]').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('bankSection').className = 'bank-section'+(m==='DEB'?'':' hidden');
  
  // Cambiar selector de plan según la modalidad escogida
  const selPlan = document.getElementById('planSelect');
  const basePlan = activePlan.split('_')[0]; // PLUS o TRAD
  if(basePlan === 'PLUS' || basePlan === 'TRAD') {
    selPlan.value = basePlan + '_' + m;
    activePlan = basePlan + '_' + m;
  }
  updateOffer();
  syncScripts();
}

/* ══ TITULARIDAD ══ */
function setTit(t, el){
  titular = t;
  document.querySelectorAll('.mod-pill[id^="tit-"]').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  syncScripts();
}

/* ══ OFFER UPDATE ══ */
function getPrecioEfectivo(){
  const ciudad = document.getElementById('rCiudad').value||'';
  const isCosta = CIUDADES_COSTA.some(c => ciudad.includes(c));
  const p = TAR[activePlan];
  if(!p) return null;
  if(!isCosta) return p;

  const esPlus = activePlan.startsWith('PLUS');
  const esLoc  = modPago==='LOC';
  const key = (esPlus?'PLUS':'TRAD') + '_' + (esLoc?'LOC':'DEB');
  const tarifaCosta = PLAN_COSTA[key];

  return {
    ...p,
    n: `${esPlus?'EMI Plus':'EMI Tradicional'} Plan Costa`,
    t: {1:tarifaCosta,2:tarifaCosta,3:tarifaCosta,4:tarifaCosta,5:tarifaCosta},
    adh: 0,
    label: 'Tarifa Plan Costa',
  };
}

function updateOffer(){
  const key = document.getElementById('planSelect').value;
  activePlan = key;
  const pEfectivo = getPrecioEfectivo();
  if(!pEfectivo) return;
  const n = Math.min(numAfil, 5);
  const vp = pEfectivo.t[n];
  const daily = Math.round(vp/30);
  
  document.getElementById('priceBig').textContent = '$' + vp.toLocaleString('es-CO');
  document.getElementById('priceDaily').textContent = `Solo $${daily.toLocaleString('es-CO')} al día`;
  document.getElementById('epsLabel2').textContent = document.getElementById('rEps').value || 'tu EPS';

  const g = document.getElementById('benMiniGrid');
  const iconosplan = BENEFITS_BY_PLAN[key] || BENEFITS_BY_PLAN['PLUS_DEB'];
  g.innerHTML = BENEFITS.filter(b => iconosplan.includes(b.e)).map(b=>`
    <div class="ben-mini">
      <div class="ben-mini-ico">${b.e}</div>
      <div class="ben-mini-title">${b.t}</div>
      <div class="ben-mini-desc">${b.d}</div>
    </div>`).join('');
}

/* ══ SYNC SCRIPTS (Legalización dinámica) ══ */
function syncScripts(){
  const nom   = document.getElementById('rNom').value.trim() || '[Nombre del Usuario]';
  const fNomPersona = document.getElementById('fNom').value.trim() || nom;
  const agent = document.getElementById('agentName').value.trim() || '[Su Nombre]';
  const ced   = document.getElementById('rCed').value.trim() || '[rCed]';
  const dir   = document.getElementById('fDir').value.trim() || '[fDir]';
  const ciudad = document.getElementById('rCiudad').value || '[rCiudad]';
  
  const pEfectivo = getPrecioEfectivo();
  const vp = pEfectivo ? pEfectivo.t[Math.min(numAfil,5)] : 0;
  const adh = pEfectivo ? pEfectivo.adh : 0;
  const nombrePlan = pEfectivo ? pEfectivo.n : '[nombrePlan]';
  
  const banco  = document.getElementById('fBanco').value;
  const tipoCta= document.getElementById('fTipoCuenta').value;
  const digits = document.getElementById('fDigitos').value || 'XXXX';

  const formatMonto = (m) => '$' + m.toLocaleString('es-CO');

  // Llenar datos de cabecera en Legal
  document.getElementById('s1-name').textContent = nom;
  document.getElementById('s1-agent').textContent = agent;
  document.getElementById('l-usuario').textContent = fNomPersona;
  document.getElementById('l-usuario2').textContent = fNomPersona;
  document.getElementById('l-usuario3').textContent = fNomPersona;
  document.getElementById('l-usuario4').textContent = fNomPersona;
  document.getElementById('l-asesor').textContent = agent;

  // Beneficiarios String
  let benArr = [];
  for(let i=1; i<=numAfil; i++){
    const bName = document.getElementById(`ben${i}_nom`)?.value.trim();
    benArr.push(bName || `[Beneficiario ${i}]`);
  }
  const benStr = benArr.join(', ');

  // LEGAL 1 DINÁMICO SEGÚN ESCENARIO
  let legal1 = '';
  const mesActual = new Date().toLocaleDateString('es-CO', {month: 'long'});
  const hoy = new Date(); 
  const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth()+1, 0).getDate() + ' de ' + mesActual;

  if (saleMode === 'CROSS') {
    // ESCENARIO A: VENTA CRUZADA
    legal1 = `• Señor/a <span class="campo">${fNomPersona}</span>, acepta usted el servicio contratado con grupo emi s.a.s. a nombre del titular <span class="campo">${fNomPersona}</span>, identificado con cedula de ciudadanía <span class="campo">${ced}</span><br>
    • Para los beneficiarios: <span class="campo">${benStr}</span><br>
    • En la dirección de residencia <span class="campo">${dir}</span>, <span class="campo">${ciudad}</span><br>
    • Donde se cobra una cuota de inscripción de <span class="campo">${formatMonto(adh)}</span> por persona agregada a su plan emi <span class="campo">${nombrePlan}</span><br>
    • A partir del siguiente mes, continúa pagando una mensualidad <span class="campo">${formatMonto(vp)}</span> por cada afiliado.<br>
    • que se debitara los 5 primeros días hábiles a partir de hoy. Si o no.`;
  } else {
    // VENTA NUEVA
    if (modPago === 'DEB') {
      // ESCENARIO B: VENTA NUEVA - DÉBITO
      legal1 = `Señor/a <span class="campo">${fNomPersona}</span>, acepta usted el servicio contratado con grupo emi s.a.s., a nombre del titular <span class="campo">${fNomPersona}</span>, identificado con cedula de ciudadanía <span class="campo">${ced}</span>, Para los beneficiarios: <span class="campo">${benStr}</span>, En la dirección de residencia <span class="campo">${dir}</span>, Bajo la modalidad de pago de débito automático de su cuenta de <span class="campo">${tipoCta}</span> <span class="campo">${banco}</span>, terminada en <span class="campo">${digits}</span>, Donde se cobra una cuota de inscripción de <span class="campo">${formatMonto(adh)}</span> por <span class="campo">${numAfil} afiliado(s)</span> en emi <span class="campo">${nombrePlan}</span>. A partir del siguiente mes, continua pagando una mensualidad <span class="campo">${formatMonto(vp)}</span> por cada afiliado, que se debitara los 5 primeros días del mes siguiente. Si o no.`;
    } else if (modPago === 'LOC') {
      // ESCENARIO C: VENTA NUEVA - LOCAL PAGO
      legal1 = `Señor/a <span class="campo">${fNomPersona}</span>, acepta usted el servicio contratado con grupo emi s.a.s., a nombre del titular <span class="campo">${fNomPersona}</span>, identificada con cedula de ciudadanía <span class="campo">${ced}</span>, para los beneficiarios: <span class="campo">${benStr}</span>, en la dirección de residencia <span class="campo">${dir}</span>, con una tarifa de mensual de <span class="campo">${nombrePlan}</span>, bajo la modalidad de pago de local pago donde usted deberá realizar los pagos en cualquiera de estos medios:<br> 
      Opción 1: corresponsal bancario y su cedula de ciudadanía.<br> 
      Opción 2: entidad financiera autorizada.<br> 
      Opción 3: Pago botón PSE.<br> 
      Donde para el mes de afiliación <span class="campo">${mesActual}</span> se cobra una cuota de inscripción de <span class="campo">${formatMonto(adh)}</span> por <span class="campo">${numAfil}</span> en emi <span class="campo">${nombrePlan}</span> que le cubre el servicio hasta el <span class="campo">${ultimoDia}</span> y a partir del siguiente mes continua pagando una mensualidad <span class="campo">${formatMonto(vp)}</span> por cada afiliado, que se deberá realizar los 5 primeros días del mes. si o no`;
    } else if (modPago === 'DOM') {
      // ESCENARIO D: VENTA NUEVA - COBRO DOMICILIARIO
      legal1 = `Señor/a <span class="campo">${fNomPersona}</span>, acepta usted el servicio contratado con grupo emi s.a.s., a nombre del titular <span class="campo">${fNomPersona}</span>, identificada con cedula de ciudadanía <span class="campo">${ced}</span>, para los beneficiarios: <span class="campo">${benStr}</span>, en la dirección de residencia <span class="campo">${dir}</span>, con una tarifa de mensual de <span class="campo">${nombrePlan}</span>, bajo la modalidad de pago de cobro domiciliario en la dirección de residencia indicada por el titular, donde para el mes de afiliación <span class="campo">${mesActual}</span> se cobra una cuota de inscripción de <span class="campo">${formatMonto(adh)}</span> por <span class="campo">${numAfil}</span> en emi <span class="campo">${nombrePlan}</span> que le cubre el servicio hasta el <span class="campo">${ultimoDia}</span> y a partir del siguiente mes continua pagando una mensualidad <span class="campo">${formatMonto(vp)}</span> por cada afiliado, que durante los 5 primeros días uno de nuestros Cobradores los estará visitando sí o no`;
    }
  }

  document.getElementById('gLegal1').innerHTML = legal1;

  // Confirmación Final
  document.getElementById('gLegalFinal').innerHTML = `Señor(a) <span class="campo">${fNomPersona}</span>, con numero de cedula <span class="campo">${ced}</span>, le confirmo que el PLAN DE SALUD que ha contratado con EMI FALCK es el siguiente: <span class="campo">${nombrePlan}</span>, VALOR DE INSCRIPCIÓN <span class="campo">${formatMonto(adh)}</span> Y VALOR DE MENSUALIDAD <span class="campo">${formatMonto(vp)}</span> POR CADA AFILIADO, para las siguientes personas: <span class="campo">${benStr}</span>. ¿Está de acuerdo con estas condiciones? SI/NO.`;
  
  // Sincronización en Phase 6
  document.getElementById('farewell-name').textContent = agent;
}

/* ══ ADRES PASTE (Extracción Inteligente 3.0 para Tablas de ADRES) ══ */
function onPaste(e){ setTimeout(()=>{const t=document.getElementById('pasteTA').value;if(t.length>20)procesar(t);},100); }
function onInput(el){ if(el.value.length>40) procesar(el.value); }

function procesar(txt){
  console.log("Iniciando extracción ADRES...");
  const d={};
  
  // Función auxiliar de extracción
  const extract = (regex) => { const m = txt.match(regex); return m ? m[1].trim() : null; };

  // 1. Extraer datos superiores
  const doc = extract(/NÚMERO DE IDENTIFICACI[OÓ]N[\t ]+([^\n]+)/i);
  const nom = extract(/NOMBRES[\t ]+([^\n]+)/i) || extract(/Nombre completo afiliado:\s*([^\n]+)/i);
  const ape = extract(/APELLIDOS[\t ]+([^\n]+)/i);
  const mun = extract(/MUNICIPIO[\t ]+([^\n]+)/i) || extract(/Ciudad:\s*([^\n]+)/i);

  if(doc) d.documento = doc;
  if(nom && ape) d.nombre = `${nom} ${ape}`;
  else if(nom) d.nombre = nom;
  if(mun) d.municipio = mun;

  // Estado
  const stateMatch = txt.match(/\b(ACTIVO|INACTIVO|SUSPENDIDO|FALLECIDO)\b/i);
  if(stateMatch) d.estado = stateMatch[1].toUpperCase();

  // Régimen
  if(/CONTRIBUTIVO/i.test(txt)) d.regimen = 'CONTRIBUTIVO';
  else if(/SUBSIDIADO/i.test(txt)) d.regimen = 'SUBSIDIADO';
  else if(/EXCEPCION/i.test(txt)) d.regimen = 'EXCEPCION';
  else if(/ESPECIAL/i.test(txt)) d.regimen = 'ESPECIAL';

  // Tipo de afiliado
  if(/CABEZA DE FAMILIA|COTIZANTE/i.test(txt)) d.tipo = 'COTIZANTE';
  else if(/BENEFICIARIO/i.test(txt)) d.tipo = 'BENEFICIARIO';
  else if(/AFILIADO SUBSIDIADO|SUB/i.test(txt)) d.tipo = 'SUB';

  // EPS - Escaneo Robusto en TODO el documento
  const EPS_MAP=[
    {b:['ALIANSALUD'],v:'Aliansalud'},{b:['ASMET'],v:'Asmet Salud'},
    {b:['CAFESALUD'],v:'Cafesalud'},{b:['CAPITAL SALUD'],v:'Capital Salud'},
    {b:['COLSANITAS','SANITAS'],v:'Sanitas EPS'},
    {b:['COMFENALCO'],v:'Comfenalco Valle'},
    {b:['COMPENSAR'],v:'Compensar'},{b:['COOSALUD'],v:'Coosalud'},
    {b:['COOMEVA'],v:'Coomeva'},{b:['CRUZ BLANCA'],v:'Cruz Blanca'},
    {b:['ECOOPSOS'],v:'Ecoopsos'},{b:['EMSSANAR'],v:'Emssanar'},
    {b:['SURAMERICANA','EPS SURA','SURA EPS','SURA S.A'],v:'EPS Sura / Suramericana'},
    {b:['FAMISANAR'],v:'Famisanar'},{b:['GOLDEN GROUP'],v:'Golden Group'},
    {b:['MEDIMAS','MEDIMÁS'],v:'Medimás'},{b:['MUTUAL SER'],v:'Mutual Ser'},
    {b:['NUEVA EPS'],v:'Nueva EPS'},{b:['PIJAOS'],v:'Pijaos Salud'},
    {b:['SALUD TOTAL'],v:'Salud Total'},{b:['SAVIA'],v:'Savia Salud'}
  ];
  
  let txtUpper = txt.toUpperCase();
  for(const e of EPS_MAP){
    if(e.b.some(b => txtUpper.includes(b))){
      d.eps = e.v; 
      break;
    }
  }

  // --- RELLENAR UI AUTOMÁTICAMENTE ---
  const setVal = (id, val) => { const el = document.getElementById(id); if(el && val) el.value = val; };
  const setSel = (id, text) => {
    const sel = document.getElementById(id);
    if(!sel || !text) return;
    const t = text.toUpperCase();
    for(let opt of sel.options) {
      const v = opt.value.toUpperCase();
      const txtO = opt.text.toUpperCase();
      if(v.includes(t) || txtO.includes(t) || t.includes(v)) {
        sel.value = opt.value; break;
      }
    }
  };

  setVal('rCed', d.documento);
  setVal('rNom', d.nombre);
  setVal('fNom', d.nombre);
  setVal('rReg', d.regimen);
  setVal('rEst', d.estado);
  setVal('rTip', d.tipo);
  setSel('rEps', d.eps);
  setSel('rCiudad', d.municipio);

  // Pintar Caja de Éxito y Chips
  document.getElementById('pasteBox').className = 'paste-box ok';
  document.getElementById('pzSt').textContent = '✓ extracción exitosa';
  document.getElementById('xg').style.display = 'grid';
  document.getElementById('xN').textContent = d.nombre ? d.nombre.split(' ').slice(0,2).join(' ') : '—';
  document.getElementById('xE').textContent = d.eps ? d.eps.split(' ')[0] : '—';
  document.getElementById('xEs').textContent = d.estado || '—';
  document.getElementById('xEs').className = 'xv ' + (d.estado==='ACTIVO'?'g':d.estado==='SUSPENDIDO'?'y':d.estado==='FALLECIDO'?'r':'');
  document.getElementById('xR').textContent = d.regimen || '—';
  document.getElementById('xT').textContent = d.tipo || '—';
  document.getElementById('xM').textContent = d.municipio || '—';

  toast('✓ Datos ADRES extraídos con éxito.');
  
  syncAdresToBen1();

  // Disparar las alertas correspondientes a lo seleccionado
  if(d.estado === 'FALLECIDO') onEstChange();
  if(d.municipio) onCiudadChange();
  if(d.regimen) onRegChange();
  syncScripts();
}

/* ══ OBJECIONES ══ */
function toggleObj(){
  const ov=document.getElementById('objOverlay');
  const tb=document.getElementById('objToggleBtn');
  const open=ov.classList.toggle('open');
  tb.classList.toggle('open',open);
}

function renderObjeciones(filter){
  const list=document.getElementById('objList');
  const term = (filter || '').toLowerCase();
  const fObjs = OBJECIONES.filter(o => o.topic.toLowerCase().includes(term) || o.obj.toLowerCase().includes(term));
  list.innerHTML=fObjs.map((o,i)=>`
    <div class="obj-item" id="obj${i}">
      <div class="obj-q" onclick="togObj(${i})">
        <div class="obj-q-txt">"${o.obj}"</div>
        <span class="obj-arr">▼</span>
      </div>
      <div class="obj-body">
        <div class="obj-method-block omb-g">
          <div class="omb-label">Ganador (PNL)</div>
          <div class="omb-text">${o.pnl}</div>
        </div>
        <div class="obj-method-block omb-b">
          <div class="omb-label">Brian Tracy</div>
          <div class="omb-text">${o.tracy}</div>
        </div>
        <div class="obj-method-block omb-r">
          <div class="omb-label">Alex Hormozi</div>
          <div class="omb-text">${o.hormozi}</div>
        </div>
      </div>
    </div>`).join('');
}
function togObj(i){ document.getElementById('obj'+i).classList.toggle('open'); }
function filterObj(v){ renderObjeciones(v); }

/* ══ HELPERS ══ */
function onCiudadChange(){
  const ciudad = document.getElementById('rCiudad').value;
  const isCosta = CIUDADES_COSTA.some(c => ciudad.includes(c));
  document.getElementById('badgeCosta').style.display = isCosta?'block':'none';
  document.getElementById('badgeSinCobertura').style.display = ciudad==='FUERA'?'block':'none';
  updateOffer();
  updateFarewell(); // Actualiza dinámicamente los teléfonos en Fase 6
  syncScripts();
}

function onRegChange(){ updateOffer(); }
function onEstChange(){
  const est = document.getElementById('rEst').value;
  document.getElementById('fallecidoOverlay').classList.toggle('show', est==='FALLECIDO');
}

function toast(m){ const t=document.getElementById('toast'); t.textContent=m; t.classList.add('on'); setTimeout(()=>t.classList.remove('on'),3000); }

function updateFarewell(){
  const ciudadSelect = document.getElementById('rCiudad').value || 'Bogotá';
  const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remueve tildes
  const ciudadUpper = normalize(ciudadSelect.toUpperCase());
  
  let elCity = document.getElementById('channelCity');
  let elNum = document.getElementById('channelNumbers');
  
  if(!elCity || !elNum) return;
  elCity.textContent = ciudadSelect;

  let found = false;
  for(const [key, data] of Object.entries(CONTACTOS_CIUDADES)){
    const normalizedKey = normalize(key);
    if(ciudadUpper.includes(normalizedKey) || normalizedKey.includes(ciudadUpper)){
      elNum.textContent = data.numeros.join(' · ');
      found = true;
      break;
    }
  }
  
  if(!found){
     elNum.textContent = 'Línea Nacional: 601 745 7859';
  }
}

function resetCall(){ window.location.reload(); }

function descargarTXT(){
  const nom = document.getElementById('rNom').value || 'Cliente';
  const data = `Resumen de Venta\nCliente: ${nom}\nPlan: ${activePlan}\nAfiliados: ${numAfil}`;
  const blob = new Blob([data], {type:'text/plain'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `Venta_${nom}.txt`; a.click();
}

function descargarComoTexto(){
  toast('✓ Texto copiado al portapapeles.');
}

function descargar(){
  const blob=new Blob([document.documentElement.outerHTML],{type:'text/html;charset=utf-8'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='EMI-FALCK-Asistente-v3.0.html'; a.click();
}
