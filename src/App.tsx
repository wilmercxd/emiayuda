/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  ClipboardCheck, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Hash,
  ChevronRight,
  MousePointer2,
  Phone,
  FileText,
  BadgeInfo,
  Clock,
  Zap,
  Globe,
  MessageSquare,
  Video,
  Home,
  CheckCircle,
  Baby,
  Activity,
  Gift,
  Clipboard,
  Info,
  Building2,
  Copy,
  Check,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DocumentType, 
  Regime, 
  AffiliateStatus, 
  AffiliateType, 
  AdresData, 
  EmiPlan 
} from './types';
import { EPS_LIST, PLANS, SCRIPTS, BANKS, BENEFITS, REGIONS, OBJECTION_MATRIX, LEGAL_SCRIPTS, BUYER_PERSONAS, SAVINGS_METRICS, PLAN_COSTA, EMOTIONAL_BENEFITS } from './constants';

const ADRES_URL = "https://aplicaciones.adres.gov.co/BDUA_Internet/Pages/ConsultarAfiliadoWeb_2.aspx";

export default function App() {
  const [docType, setDocType] = useState<DocumentType>(DocumentType.CC);
  const [docId, setDocId] = useState('');
  const [showIframe, setShowIframe] = useState(false);
  const [scriptTab, setScriptTab] = useState<'intro' | 'legal' | 'cierre'>('intro');
  const [rawPaste, setRawPaste] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  const [adresData, setAdresData] = useState<AdresData>({
    documentType: DocumentType.CC,
    idNumber: '',
    fullName: '',
    eps: '',
    regime: Regime.CONTRIBUTIVO,
    status: AffiliateStatus.ACTIVO,
    type: AffiliateType.COTIZANTE,
    department: '',
    city: '',
    affiliationDate: ''
  });

  const [numAffiliates, setNumAffiliates] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState(REGIONS[0].cities[0]);
  const [callStep, setCallStep] = useState(1);
  const [showObjections, setShowObjections] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [legalModality, setLegalModality] = useState('DEBITO');
  const [bankInfo, setBankInfo] = useState({ name: 'Bancolombia', lastDigits: '1234' });
  const [selectedPersonaId, setSelectedPersonaId] = useState('padre_familia');
  const [saleScenario, setSaleScenario] = useState<'NEW' | 'CROSS_SELL'>('NEW');
  const [titularType, setTitularType] = useState('MISMO_TITULAR');
  const [agentName, setAgentName] = useState('');
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    docType: 'CC',
    docNumber: '',
    birthDate: '',
    address: '',
    neighborhood: '',
    city: '',
    references: '',
    phone: '',
    email: '',
    bankAccountType: 'Ahorros'
  });

  // Recommendation Logic (Internal)
  const systemRecommendedPlanId = useMemo(() => {
    const { regime, status, type } = adresData;
    if (status === AffiliateStatus.FALLECIDO) return 'EMI_TRADICIONAL_DOMICILIO';
    if (status === AffiliateStatus.SUSPENDIDO) return 'EMI_TRADICIONAL_DOMICILIO';
    if (status === AffiliateStatus.INACTIVO || status === AffiliateStatus.NO_REGISTRA) return 'EMI_PLUS_DOMICILIO';
    if (regime === Regime.SUBSIDIADO) return 'EMI_SUBSIDIADO';
    if (regime === Regime.CONTRIBUTIVO && status === AffiliateStatus.ACTIVO) {
      return type === AffiliateType.COTIZANTE ? 'EMI_PLUS_DEBITO' : 'EMI_TRADICIONAL_DEBITO';
    }
    return 'EMI_PLUS_DEBITO';
  }, [adresData]);

  // Set initial plan selection based on recommendation when data changes
  useEffect(() => {
    setSelectedPlanId(systemRecommendedPlanId);
  }, [systemRecommendedPlanId]);

  const activePlan = useMemo(() => {
    return selectedPlanId ? PLANS[selectedPlanId] : PLANS[systemRecommendedPlanId];
  }, [selectedPlanId, systemRecommendedPlanId]);

  const currentPricing = useMemo(() => {
    const isCosta = REGIONS.find(r => r.name === SAVINGS_METRICS.COSTA_REGION_NAME)?.cities.includes(selectedCity);
    const isPlus = activePlan.id.includes('PLUS');
    const modalityKey = legalModality === 'DEBITO' ? 'DEBITO' : 'LOCAL_PAGO';
    const planKey = isPlus ? 'EMI_PLUS' : 'EMI_TRADICIONAL';

    let monthlyVal = activePlan.tariffs.find(t => t.affiliates === numAffiliates)?.valuePerPerson || 0;
    let adhesionFee = activePlan.adhesionFee;

    if (isCosta && planKey in PLAN_COSTA) {
      monthlyVal = PLAN_COSTA[planKey as keyof typeof PLAN_COSTA][modalityKey as 'DEBITO' | 'LOCAL_PAGO'];
      adhesionFee = 0;
    }

    return { 
      isCosta, 
      monthlyValue: monthlyVal, 
      adhesionFee,
      totalMonthly: monthlyVal * numAffiliates,
      totalInitial: adhesionFee * numAffiliates
    };
  }, [activePlan, selectedCity, legalModality, numAffiliates]);

  // Smart Parser
  useEffect(() => {
    if (rawPaste.length > 10) {
      const text = rawPaste.toUpperCase();
      const newData = { ...adresData };
      
      // Basic heuristic parsing
      if (text.includes('NOMBRES')) {
        const match = rawPaste.match(/NOMBRES\s+([^\n\r]+)/i);
        const matchL = rawPaste.match(/APELLIDOS\s+([^\n\r]+)/i);
        if (match && matchL) newData.fullName = `${match[1]} ${matchL[1]}`.trim();
      }
      
      if (text.includes('FALLECIDO')) newData.status = AffiliateStatus.FALLECIDO;
      else if (text.includes('ACTIVO')) newData.status = AffiliateStatus.ACTIVO;
      else if (text.includes('SUSPENDIDO')) newData.status = AffiliateStatus.SUSPENDIDO;
      else if (text.includes('INACTIVO')) newData.status = AffiliateStatus.INACTIVO;

      if (text.includes('SUBSIDIADO')) {
        newData.regime = Regime.SUBSIDIADO;
        newData.type = AffiliateType.SUBSIDIADO;
      } else if (text.includes('CONTRIBUTIVO')) {
        newData.regime = Regime.CONTRIBUTIVO;
      }

      if (text.includes('COTIZANTE')) newData.type = AffiliateType.COTIZANTE;
      else if (text.includes('BENEFICIARIO')) newData.type = AffiliateType.BENEFICIARIO;

      // EPS detection
      const foundEps = EPS_LIST.find(e => text.includes(e.toUpperCase()));
      if (foundEps) newData.eps = foundEps;

      setAdresData(newData);
    }
  }, [rawPaste]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdresData(prev => ({ ...prev, [name]: value }));
  };

  const IconMap: Record<string, any> = {
    AlertCircle, Home, Zap, Video, MessageSquare, Phone, Activity, Baby, FileText, Globe, Users, Gift, Clipboard, CheckCircle
  };

  const CALL_STEPS = [
    { id: 1, label: 'Protocolo', icon: Phone },
    { id: 2, label: 'Diagnóstico', icon: Search },
    { id: 3, label: 'Oferta', icon: Gift },
    { id: 4, label: 'Fricción', icon: MessageSquare },
    { id: 5, label: 'Legalización', icon: ShieldCheck },
    { id: 6, label: 'Despedida', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 font-sans selection:bg-emi-red/10">
      {/* GLOBAL TOP BAR */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emi-red rounded-lg flex items-center justify-center">
            <Activity className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-gray-900 italic tracking-tighter leading-none">CONEXIONES <span className="text-emi-red italic uppercase">Digitales</span></h1>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Aliado Estratégico Outbound / v3.0</p>
          </div>
        </div>

        {/* STEP NAVIGATOR */}
        <nav className="hidden lg:flex items-center bg-gray-50 p-1 rounded-xl gap-1">
          {CALL_STEPS.map(step => {
            const Icon = step.icon;
            const isActive = callStep === step.id;
            const isCompleted = callStep > step.id;
            return (
              <button
                key={step.id}
                onClick={() => setCallStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${
                  isActive 
                    ? 'bg-white text-emi-red shadow-sm' 
                    : isCompleted ? 'text-green-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isActive ? 'bg-emi-red text-white' : isCompleted ? 'bg-green-100' : 'bg-gray-200'}`}>
                  {isCompleted ? <Check size={10} /> : step.id}
                </div>
                {step.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowObjections(!showObjections)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${showObjections ? 'bg-emi-red text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}
          >
            Matriz Objeciones <BadgeInfo size={14} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL: DATA & CONTEXT */}
        <aside className="w-[380px] bg-white border-r border-gray-100 overflow-y-auto p-6 space-y-6 hidden xl:block shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emi-red rounded-lg flex items-center justify-center shadow-lg shadow-emi-red/20">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 italic tracking-tighter">EMI <span className="text-emi-red">FALCK</span></h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Asistente de ventas v2.8</p>
          </div>
        </div>

        {/* 1. DOCUMENTO */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emi-red">
            <Search size={14} />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Consulta de Afiliado</h2>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <select 
              value={docType} 
              onChange={(e) => setDocType(e.target.value as DocumentType)}
              className="col-span-4 bg-white border-gray-200 text-xs rounded-lg px-2 h-10 focus:ring-1 focus:ring-emi-red focus:border-emi-red outline-none"
            >
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="TI">TI</option>
            </select>
            <input 
              type="text" 
              placeholder="Cédula" 
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              className="col-span-8 bg-white border-gray-200 text-sm rounded-lg px-3 h-10 focus:ring-1 focus:ring-emi-red focus:border-emi-red outline-none"
            />
          </div>
          <button 
            onClick={() => window.open(ADRES_URL, '_blank')}
            className="w-full bg-emi-red hover:bg-red-600 text-white font-black text-xs py-3 rounded-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow-lg shadow-emi-red/20"
          >
            VERIFICAR EN ADRES <ExternalLink size={14} />
          </button>
        </div>

        {/* 2. SMART PASTE HELPER */}
        <div className="bg-emi-red/5 border border-emi-red/10 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emi-red uppercase">Pegado Inteligente</span>
            <Info size={12} className="text-emi-red/30" />
          </div>
          <textarea 
            placeholder="Copie y pegue aquí el resultado del ADRES para autocompletar..."
            value={rawPaste}
            onChange={(e) => setRawPaste(e.target.value)}
            className="w-full h-20 bg-white border-gray-200 text-[10px] font-mono p-2 rounded-lg scrollbar-hide resize-none focus:border-emi-red focus:outline-none transition-colors"
          />
        </div>

        {/* 3. FORMULARIO DE REGISTRO */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-gray-400">
            <ClipboardCheck size={14} />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]">Registro de Resultado</h2>
          </div>
          
          <div className="grid gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Nombre Completo Afiliado</label>
              <input name="fullName" value={adresData.fullName} onChange={handleInputChange} className="w-full h-9 bg-white border-gray-200 rounded-lg px-3 text-sm focus:border-emi-red outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Municipio / Ciudad</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)} 
                  className="w-full h-9 bg-white border-gray-200 rounded-lg px-2 text-xs focus:border-emi-red outline-none"
                >
                  {REGIONS.map(reg => (
                    <optgroup key={reg.name} label={reg.name}>
                      {reg.cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </optgroup>
                  ))}
                  <option value="OTRA">Fuera de Cobertura Presencial</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Régimen</label>
                <select name="regime" value={adresData.regime} onChange={handleInputChange} className="w-full h-9 bg-white border-gray-200 rounded-lg px-2 text-xs focus:border-emi-red outline-none">
                  {Object.values(Regime).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            {selectedCity === 'OTRA' && (
              <div className="bg-blue-50 border-l-2 border-blue-500 p-3 rounded flex gap-2">
                <Globe size={16} className="text-blue-600 shrink-0" />
                <p className="text-[10px] text-blue-700 italic">Ofrecer Plan Virtual: Videoconsultas, chat médico y Red SIEM internacional inclusida.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Estado ADRES</label>
                <select name="status" value={adresData.status} onChange={handleInputChange} className={`w-full h-9 bg-white border-gray-200 rounded-lg px-2 text-xs focus:border-emi-red outline-none font-bold ${adresData.status === AffiliateStatus.FALLECIDO ? 'text-black bg-gray-200' : 'text-emi-red'}`}>
                  {Object.values(AffiliateStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Tipo Afiliado</label>
                <select name="type" value={adresData.type} onChange={handleInputChange} className="w-full h-9 bg-white border-gray-200 rounded-lg px-2 text-xs focus:border-emi-red outline-none">
                  {Object.values(AffiliateType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Afiliados a vincular (Grupo Familiar)</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n => (
                  <button 
                    key={n} 
                    onClick={() => setNumAffiliates(n)}
                    className={`flex-1 h-9 rounded-lg text-xs font-bold transition-all ${numAffiliates === n ? 'bg-emi-red text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">EPS Actual</label>
              <select name="eps" value={adresData.eps} onChange={handleInputChange} className="w-full h-9 bg-white border-gray-200 rounded-lg px-2 text-xs focus:border-emi-red outline-none">
                <option value="">Seleccione...</option>
                {EPS_LIST.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ALERTS SECTION (Dynamic based on EPS) */}
        {adresData.eps.includes('NUEVA EPS') && (
          <div className="bg-yellow-50 border-l-2 border-yellow-500 p-4 rounded-r-xl flex gap-3 animate-pulse">
            <AlertTriangle className="text-yellow-700 shrink-0" size={18} />
            <p className="text-[10px] text-yellow-700 leading-tight">
              <strong>ALERTA OPERATIVA:</strong> Nueva EPS está intervenida. Oportunidad de venta por insatisfacción real.
            </p>
          </div>
        )}
      </aside>

      {/* MAIN DASHBOARD: CALL NAVIGATOR */}
      <section className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50/30">
        <AnimatePresence>
          {adresData.status === AffiliateStatus.FALLECIDO && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center space-y-6"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <AlertCircle size={64} />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">AFILIADO FALLECIDO</h2>
                <p className="text-gray-500 max-w-md mx-auto font-medium">
                  El estado del afiliado en el ADRES figura como fallecido. No es posible realizar una vinculación bajo estas condiciones. Por favor verifique los datos o proceda con otro prospecto.
                </p>
              </div>
              <button 
                onClick={() => setAdresData(prev => ({ ...prev, status: AffiliateStatus.ACTIVO }))}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full text-xs transition-all"
              >
                RESTABLECER CONSULTA
              </button>
            </motion.div>
          )}
        </AnimatePresence>
          <AnimatePresence mode="wait">
            {showObjections && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="absolute top-4 right-4 bottom-4 w-[400px] bg-white shadow-2xl rounded-3xl z-[60] border border-gray-100 flex flex-col overflow-hidden"
              >
                <div className="p-6 bg-emi-red text-white flex items-center justify-between">
                   <h3 className="font-black italic tracking-tighter">MATRIZ DE OBJECIONES</h3>
                   <button onClick={() => setShowObjections(false)} className="hover:bg-white/20 p-1 rounded"><BadgeInfo /></button>
                </div>
                <div className="p-4 border-b">
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input 
                        className="w-full h-10 pl-10 pr-4 bg-gray-50 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emi-red/20" 
                        placeholder="Buscar objeción (ej. caro, esposo, eps)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                   {OBJECTION_MATRIX
                    .filter(o => o.objection.toLowerCase().includes(searchTerm.toLowerCase()) || o.topic.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(obj => (
                      <div key={obj.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                         <div className="p-4 bg-gray-50 flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{obj.topic}</span>
                            <span className="text-xs font-black text-emi-red uppercase italic">MÉTODO AAA</span>
                         </div>
                         <div className="p-4 space-y-4">
                            <p className="text-sm font-bold text-gray-900 border-l-2 border-emi-red pl-3">"{obj.objection}"</p>
                            
                            <div className="space-y-3">
                               <div className="p-3 bg-red-50 rounded-xl">
                                  <p className="text-[10px] font-black text-emi-red uppercase mb-1">Guión Ganador (PNL)</p>
                                  <p className="text-[11px] text-gray-700 italic leading-relaxed">{obj.guion}</p>
                               </div>
                               <div className="p-3 bg-blue-50 rounded-xl">
                                  <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Psicología (Brian Tracy)</p>
                                  <p className="text-[11px] text-gray-700 italic leading-relaxed">{obj.tracy}</p>
                               </div>
                               <div className="p-3 bg-green-50 rounded-xl">
                                  <p className="text-[10px] font-black text-green-600 uppercase mb-1">Valor (Alex Hormozi)</p>
                                  <p className="text-[11px] text-gray-700 italic leading-relaxed">{obj.hormozi}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
             <motion.div 
               key={callStep}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="max-w-4xl mx-auto p-8 lg:p-12"
             >
                {/* STEP CONTENT DYNAMICALLY RENDERED */}
                 {callStep === 1 && (
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <span className="text-emi-red text-[10px] font-black uppercase tracking-[0.4em]">Fase 01</span>
                        <h2 className="text-4xl font-black italic tracking-tighter text-gray-900 uppercase">Protocolo de Enganche</h2>
                        <p className="text-gray-400 text-sm max-w-xl">El primer contacto debe generar confianza y cumplir con la normativa de protección al usuario.</p>
                     </div>

                     <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 space-y-6 relative overflow-hidden">
                           <div className="absolute -top-10 -right-10 w-40 h-40 bg-emi-red/5 rounded-full blur-3xl" />
                           <div className="space-y-6 relative">
                              <div className="flex items-center gap-2">
                                 <BadgeInfo className="text-emi-red" size={14} />
                                 <span className="text-[10px] font-bold text-gray-400 uppercase">Guión de Apertura Legal</span>
                              </div>
                              <p className="text-2xl leading-relaxed text-gray-800 font-medium">
                                 "Buenos días/tardes <span className="text-emi-red font-black uppercase tracking-tighter">[{adresData.fullName || 'Sr/Sra'}]</span>, mi nombre es <span className="border-b-2 border-emi-red/20 font-bold">{agentName || '[Su Nombre]'}</span> y me comunico como Ejecutivo Comercial de <span className="text-emi-red font-black italic">Grupo EMI</span>."
                              </p>

                              <div className="bg-red-50 border-l-4 border-emi-red p-6 rounded-2xl space-y-2">
                                 <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-black text-emi-red uppercase">Aviso de Grabación (Obligatorio)</p>
                                    <Zap className="text-emi-red animate-pulse" size={14} />
                                 </div>
                                 <p className="text-xl text-gray-700 italic font-bold">
                                    "Le recuerdo que esta llamada es grabada y monitoreada para efectos de calidad en el servicio."
                                 </p>
                                 <p className="text-[9px] text-emi-red/60 font-black uppercase mt-2">* LA OMISIÓN DE ESTA FRASE ES UN FALLO CRÍTICO DE CALIDAD</p>
                              </div>

                              <div className="space-y-4">
                                 <p className="text-sm text-gray-500 font-medium border-b border-gray-100 pb-2 italic">Enganche Inicial de Fidelización:</p>
                                 <p className="text-lg text-gray-800">
                                    "Veo que usted es un cliente preferencial <span className="text-emi-red font-black italic">EMI</span>, ¿cómo le ha ido con nuestro servicio médico en casa?"
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white space-y-6 self-start transform hover:scale-[1.02] transition-transform">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-emi-red">Identidad del Asesor</label>
                              <input 
                                 type="text"
                                 placeholder="Su Nombre Completo"
                                 value={agentName}
                                 onChange={(e) => setAgentName(e.target.value)}
                                 className="w-full bg-white/10 border border-white/20 h-12 px-4 rounded-xl text-sm font-bold outline-none focus:bg-white/20 transition-all placeholder:text-white/30"
                              />
                           </div>
                           <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                              <p className="text-[9px] font-black uppercase opacity-60 mb-2">Checklist de Calidad</p>
                              <ul className="space-y-2">
                                 <li className="flex items-center gap-2 text-[10px] font-medium"><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Tono de voz empático</li>
                                 <li className="flex items-center gap-2 text-[10px] font-medium"><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Pronunciación clara de EMI</li>
                                 <li className="flex items-center gap-2 text-[10px] font-medium"><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Mención de grabación</li>
                              </ul>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-end">
                        <button onClick={() => setCallStep(2)} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emi-red transition-all shadow-lg active:scale-95">
                           Siguiente: Diagnóstico <ChevronRight size={16} />
                        </button>
                     </div>
                  </div>
                )}

                {callStep === 2 && (
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <span className="text-emi-red text-[10px] font-black uppercase tracking-[0.4em]">Fase 02</span>
                              <h2 className="text-4xl font-black italic tracking-tighter text-gray-900 uppercase">Diagnóstico Estratégico</h2>
                           </div>
                           <div className="text-right">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Avatar del Cliente</label>
                              <div className="flex gap-2">
                                 {BUYER_PERSONAS.map(p => (
                                    <button 
                                       key={p.id}
                                       onClick={() => setSelectedPersonaId(p.id)}
                                       className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${selectedPersonaId === p.id ? 'bg-emi-red text-white scale-110 shadow-lg' : 'bg-white border border-gray-100 grayscale'}`}
                                       title={p.name}
                                    >
                                       {p.avatar}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="p-4 bg-gray-900 text-white rounded-2xl flex items-center gap-4">
                           <Zap className="text-yellow-400 animate-pulse" size={20} />
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-emi-red">Perfil Seleccionado: {BUYER_PERSONAS.find(p => p.id === selectedPersonaId)?.name}</p>
                              <p className="text-sm italic font-medium opacity-80 leading-relaxed">
                                 "{BUYER_PERSONAS.find(p => p.id === selectedPersonaId)?.script}"
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { title: 'SITUACIÓN', q: '¿Con quiénes convive actualmente? ¿Sus hijos o padres están protegidos hoy ante una emergencia?', icon: <Users size={20} /> },
                          { title: 'PROBLEMA', q: '¿Cómo les afecta cuando tienen que esperar horas en el triaje de una clínica por una fiebre o cólico?', icon: <AlertTriangle size={20} /> },
                          { title: 'IMPLICACIÓN', q: '¿Qué pasaría si hoy a las 3 a.m. ocurre algo y no tiene un médico privado que llegue en menos de 90 min?', icon: <Clock size={20} /> },
                          { title: 'NECESIDAD', q: '¿Cómo le ayudaría recibir atención inmediata en casa sin exponerse a virus en un hospital?', icon: <Home size={20} /> }
                        ].map(item => (
                          <div key={item.title} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-emi-red/10 rounded-lg text-emi-red">{item.icon}</div>
                                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{item.title}</span>
                             </div>
                             <p className="text-sm text-gray-900 font-bold leading-relaxed italic">"{item.q}"</p>
                          </div>
                        ))}
                     </div>

                     <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex gap-4">
                        <Info className="text-blue-600 shrink-0" />
                        <div className="space-y-1">
                           <p className="text-xs font-black text-blue-900 uppercase">DATO CLAVE ADRES</p>
                           <p className="text-sm text-blue-800">
                             El cliente está en <span className="font-bold underline">{adresData.eps}</span> ({adresData.regime}). Use esto para resaltar las demoras actuales de su entidad.
                           </p>
                        </div>
                     </div>

                     <div className="flex justify-between">
                        <button onClick={() => setCallStep(1)} className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 px-6 py-4">
                           <ChevronRight size={16} className="rotate-180" /> Atrás
                        </button>
                        <button onClick={() => setCallStep(3)} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emi-red transition-all shadow-lg active:scale-95">
                           Siguiente: Oferta de Valor <ChevronRight size={16} />
                        </button>
                     </div>
                  </div>
                )}

                {callStep === 3 && (() => {
                  const { isCosta, monthlyValue: monthlyVal, totalInitial: totalInitialCost } = currentPricing;
                  const dailyVal = Math.round(monthlyVal / 30);
                  
                  // Savings logic
                  const savingsPerUrgency = SAVINGS_METRICS.TAXI_ROUND_TRIP + (SAVINGS_METRICS.TIME_VALUE_HOUR * SAVINGS_METRICS.EPS_WAIT_HOURS) + SAVINGS_METRICS.CLINIC_COPAY;
                  const estimatedUrgenciesYear = 3; 
                  const annualSavings = savingsPerUrgency * estimatedUrgenciesYear;
                  
                  return (
                  <div className="space-y-8 text-black">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <span className="text-emi-red text-[10px] font-black uppercase tracking-[0.4em]">Fase 03</span>
                              <h2 className="text-4xl font-black italic tracking-tighter text-gray-900 uppercase">La Oferta Irresistible</h2>
                           </div>
                           <div className="flex gap-2">
                              <div className="hidden lg:flex p-1 bg-gray-100 rounded-xl">
                                 <button 
                                    onClick={() => setSaleScenario('NEW')}
                                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${saleScenario === 'NEW' ? 'bg-white text-emi-red shadow-sm' : 'text-gray-400'}`}
                                 >
                                    Venta Nueva
                                 </button>
                                 <button 
                                    onClick={() => setSaleScenario('CROSS_SELL')}
                                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${saleScenario === 'CROSS_SELL' ? 'bg-white text-emi-red shadow-sm' : 'text-gray-400'}`}
                                 >
                                    Venta Cruzada
                                 </button>
                              </div>
                              <select 
                                 value={selectedPlanId || systemRecommendedPlanId}
                                 onChange={(e) => setSelectedPlanId(e.target.value)}
                                 className="h-10 bg-white border border-gray-200 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red transition-all"
                              >
                                 {Object.values(PLANS).map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                 ))}
                              </select>
                           </div>
                        </div>
                        {isCosta && (
                          <div className="bg-yellow-100 border border-yellow-200 p-3 rounded-xl flex items-center gap-3">
                             <MapPin size={16} className="text-yellow-700" />
                             <p className="text-[10px] font-black text-yellow-800 uppercase tracking-widest">Tarifa Especial Preferencial para {selectedCity} (Costa)</p>
                          </div>
                        )}
                     </div>

                     <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-gray-400/20 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><ShieldCheck size={200} /></div>
                        
                        <div className="space-y-6 relative">
                           <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase tracking-widest text-emi-red">Estrategia: Solución al Dolor (Hormozi Style)</p>
                              <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
                                {saleScenario === 'NEW' ? 'Tu Médico Personal 24/7' : 'Protección Total para tu Círculo'}
                              </h3>
                           </div>
                           
                           <p className="text-2xl leading-tight font-medium italic">
                              {saleScenario === 'NEW' 
                                ? `"${adresData.fullName.split(' ')[0]}, no le vendo un plan médico. Le devuelvo la tranquilidad de saber que si su hijo tiene fiebre a las 2 a.m., un médico estará en su puerta en minutos, evitándole el riesgo y el caos de una clínica pública."`
                                : `"${adresData.fullName.split(' ')[0]}, usted ya conoce la paz de tener a EMI. Hoy tiene la oportunidad única de extender esta muralla de protección a [Beneficiario] con un beneficio de fidelidad que no se repetirá."`
                              }
                           </p>

                           <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white/5 p-6 rounded-3xl backdrop-blur-md border border-white/10 space-y-4">
                                 <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Inversión Actual Estimada ({adresData.eps})</p>
                                    <div className="text-xl font-bold opacity-40 line-through">$100.000+ / mes</div>
                                    <p className="text-[8px] opacity-40 italic mt-1">(Costo de transporte + Tiempo perdido + Copagos)</p>
                                 </div>
                                 <div className="pt-4 border-t border-white/10">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-emi-red mb-1">Tu Nueva Tarifa Preferencial</p>
                                    <div className="flex items-end gap-2">
                                       <span className="text-4xl font-black text-yellow-400 italic">${monthlyVal.toLocaleString()}</span>
                                       <span className="text-xs opacity-60 pb-1">/ mes</span>
                                    </div>
                                    <div className="mt-2 py-1.5 px-3 bg-yellow-400/10 rounded-lg inline-block border border-yellow-400/20">
                                       <p className="text-[11px] font-black text-yellow-400 italic">Solo ${dailyVal.toLocaleString()} al día</p>
                                    </div>
                                 </div>
                              </div>

                              <div className="bg-white/10 p-6 rounded-3xl border border-white/20 space-y-4">
                                 <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Calculadora de Impacto y Ahorro</p>
                                 <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                       <span className="opacity-60">Ahorro en Taxis (Ida/Vuelta)</span>
                                       <span className="font-bold">+${SAVINGS_METRICS.TAXI_ROUND_TRIP.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                       <span className="opacity-60">Valor del Tiempo (6h en EPS)</span>
                                       <span className="font-bold">+${(SAVINGS_METRICS.TIME_VALUE_HOUR * SAVINGS_METRICS.EPS_WAIT_HOURS).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                       <span className="opacity-60">Copagos / Medicamentos</span>
                                       <span className="font-bold">+${SAVINGS_METRICS.CLINIC_COPAY.toLocaleString()}</span>
                                    </div>
                                    <div className="pt-2 border-t border-white/20 flex justify-between items-center">
                                       <span className="text-[10px] font-black uppercase">Ahorro Mensual Real</span>
                                       <span className="text-lg font-black text-emerald-400">${(SAVINGS_METRICS.TAXI_ROUND_TRIP + (SAVINGS_METRICS.TIME_VALUE_HOUR * SAVINGS_METRICS.EPS_WAIT_HOURS) + SAVINGS_METRICS.CLINIC_COPAY).toLocaleString()}</span>
                                    </div>
                                 </div>
                                 <div className="p-3 bg-emerald-400/20 rounded-xl border border-emerald-400/30 text-center">
                                    <p className="text-[10px] font-black uppercase text-emerald-400">Ahorro Anual Pro proyectado: ${(annualSavings + (SAVINGS_METRICS.CLINIC_COPAY * 12)).toLocaleString()}</p>
                                 </div>
                              </div>
                           </div>

                           {/* EMOTIONAL BENEFITS GRID */}
                           <div className="space-y-4 pt-6 border-t border-white/10">
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emi-red">Bondades y Valor del Plan {activePlan.name.replace('EMI ', '')}</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                 {EMOTIONAL_BENEFITS.CORE.map((b, i) => (
                                    <motion.div 
                                       key={i}
                                       initial={{ opacity: 0, y: 10 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ delay: i * 0.1 }}
                                       className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
                                    >
                                       <div className="text-2xl mb-2 group-hover:scale-110 transition-transform inline-block">{b.emoji}</div>
                                       <h4 className="text-[11px] font-black uppercase text-white mb-1 leading-tight">{b.title}</h4>
                                       <p className="text-[10px] text-gray-400 leading-tight opacity-70">{b.desc}</p>
                                    </motion.div>
                                 ))}
                                 
                                 {/* PLAN SPECIFIC EMOTIONAL HOOKS */}
                                 {selectedPersonaId === 'padre_familia' && (
                                    <motion.div 
                                       initial={{ opacity: 0, scale: 0.9 }}
                                       animate={{ opacity: 1, scale: 1 }}
                                       className="bg-emi-red/20 p-4 rounded-2xl border border-emi-red/30"
                                    >
                                       <div className="text-2xl mb-2">{EMOTIONAL_BENEFITS.PEDIATRIA.emoji}</div>
                                       <h4 className="text-[11px] font-black uppercase text-emi-red mb-1 leading-tight">{EMOTIONAL_BENEFITS.PEDIATRIA.title}</h4>
                                       <p className="text-[10px] text-red-200/80 leading-tight">{EMOTIONAL_BENEFITS.PEDIATRIA.desc}</p>
                                    </motion.div>
                                 )}
                                 
                                 {selectedPersonaId === 'hijo_cuidador' && (
                                    <motion.div 
                                       initial={{ opacity: 0, scale: 0.9 }}
                                       animate={{ opacity: 1, scale: 1 }}
                                       className="bg-emi-red/20 p-4 rounded-2xl border border-emi-red/30"
                                    >
                                       <div className="text-2xl mb-2">{EMOTIONAL_BENEFITS.ADULTO_MAYOR.emoji}</div>
                                       <h4 className="text-[11px] font-black uppercase text-emi-red mb-1 leading-tight">{EMOTIONAL_BENEFITS.ADULTO_MAYOR.title}</h4>
                                       <p className="text-[10px] text-red-200/80 leading-tight">{EMOTIONAL_BENEFITS.ADULTO_MAYOR.desc}</p>
                                    </motion.div>
                                 )}

                                 {activePlan.id.includes('PLUS') && EMOTIONAL_BENEFITS.PLUS_ONLY.map((b, i) => (
                                    <motion.div 
                                       key={`plus-${i}`}
                                       initial={{ opacity: 0, y: 10 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       className="bg-yellow-400/10 p-4 rounded-2xl border border-yellow-400/20"
                                    >
                                       <div className="text-2xl mb-2">{b.emoji}</div>
                                       <h4 className="text-[11px] font-black uppercase text-yellow-500 mb-1 leading-tight">{b.title}</h4>
                                       <p className="text-[10px] text-yellow-200/60 leading-tight">{b.desc}</p>
                                    </motion.div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-between">
                        <button onClick={() => setCallStep(2)} className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 px-6 py-4">
                           <ChevronRight size={16} className="rotate-180" /> Atrás
                        </button>
                        <button onClick={() => setCallStep(4)} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emi-red transition-all shadow-lg active:scale-95">
                           Siguiente: Manejo Objeciones <ChevronRight size={16} />
                        </button>
                     </div>
                  </div>
                )})()}

                {callStep === 4 && (
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <span className="text-emi-red text-[10px] font-black uppercase tracking-[0.4em]">Fase 04</span>
                        <h2 className="text-4xl font-black italic tracking-tighter text-gray-900 uppercase">Gestión de Fricción</h2>
                        <p className="text-gray-400 text-sm max-w-xl">Use el método AAA (Reconocer, Preguntar, AConsejar) para desarmar objeciones.</p>
                     </div>

                     <div className="grid md:grid-cols-3 gap-6">
                        {[
                          { title: 'RECONOCER', text: '"Entiendo perfectamente que deba consultarlo con su familia o que el precio sea factor..."', color: 'bg-red-50 text-red-700' },
                          { title: 'PREGUNTAR', text: '"¿Qué factor es hoy el más importante para su tranquilidad: la rapidez o el costo?"', color: 'bg-blue-50 text-blue-700' },
                          { title: 'ACONSEJAR', text: '"Le aconsejo aprovechar hoy que es cliente antiguo, mañana la salud no avisa."', color: 'bg-green-50 text-green-700' }
                        ].map(step => (
                          <div key={step.title} className={`${step.color} p-6 rounded-3xl border border-current/10 space-y-3`}>
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{step.title}</span>
                             <p className="text-[13px] font-bold italic leading-relaxed">"{step.text}"</p>
                          </div>
                        ))}
                     </div>

                     <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-emi-red">¿Sigue habiendo dudas?</p>
                           <p className="text-sm font-medium opacity-70">Abra la matriz lateral para ver guiones estilo Hormozi o Tracy.</p>
                        </div>
                        <button 
                          onClick={() => setShowObjections(true)}
                          className="bg-emi-red px-6 py-3 rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-transform"
                        >
                          Abrir Matriz
                        </button>
                     </div>

                     <div className="flex justify-between">
                        <button onClick={() => setCallStep(3)} className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 px-6 py-4">
                           <ChevronRight size={16} className="rotate-180" /> Atrás
                        </button>
                        <button onClick={() => setCallStep(5)} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emi-red transition-all shadow-lg active:scale-95">
                           Siguiente: Legalización <ChevronRight size={16} />
                        </button>
                     </div>
                  </div>
                )}

                {callStep === 5 && (
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <span className="text-emi-red text-[10px] font-black uppercase tracking-[0.4em]">Fase 05</span>
                              <h2 className="text-4xl font-black italic tracking-tighter text-gray-900 uppercase">Legalización y Registro</h2>
                           </div>
                           <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center gap-2">
                                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Modalidad de Pago</label>
                                 <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                                    {Object.values(LEGAL_SCRIPTS.MODALITIES).map(m => (
                                       <button 
                                          key={m.id}
                                          onClick={() => setLegalModality(m.id)}
                                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${legalModality === m.id ? 'bg-white text-emi-red shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                       >
                                          {m.name}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Titularidad del Contrato</label>
                                 <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                                    <button 
                                       onClick={() => setTitularType('MISMO_TITULAR')}
                                       className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${titularType === 'MISMO_TITULAR' ? 'bg-white text-emi-red shadow-sm' : 'text-gray-400'}`}
                                    >
                                       Mismo Titular
                                    </button>
                                    <button 
                                       onClick={() => setTitularType('TERCERO_TITULAR')}
                                       className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${titularType === 'TERCERO_TITULAR' ? 'bg-white text-emi-red shadow-sm' : 'text-gray-400'}`}
                                    >
                                       Tercero Titular
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* DATA COLLECTION FORM */}
                     <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl space-y-8">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                           <div className="flex items-center gap-2">
                              <FileText className="text-emi-red" size={18} />
                              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Formulario Único de Vinculación</h3>
                           </div>
                           <span className="text-[10px] font-black text-gray-400 uppercase">Campos obligatorios</span>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Nombres y Apellidos Completos</label>
                              <input 
                                 type="text"
                                 className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all"
                                 placeholder="Tal cual aparece en la cédula"
                                 value={registrationData.fullName}
                                 onChange={(e) => setRegistrationData({...registrationData, fullName: e.target.value})}
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Tipo de Documento</label>
                              <select 
                                 className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all font-sans"
                                 value={registrationData.docType}
                                 onChange={(e) => setRegistrationData({...registrationData, docType: e.target.value})}
                              >
                                 <option value="CC">Cédula de Ciudadanía</option>
                                 <option value="TI">Tarjeta de Identidad</option>
                                 <option value="RC">Registro Civil</option>
                                 <option value="CE">Cédula de Extranjería</option>
                              </select>
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Número de ID</label>
                              <input 
                                 type="text"
                                 className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all font-mono"
                                 placeholder="Sin puntos ni comas"
                                 value={registrationData.docNumber}
                                 onChange={(e) => setRegistrationData({...registrationData, docNumber: e.target.value})}
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Fecha de Nacimiento</label>
                              <input 
                                 type="date"
                                 className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all text-gray-400"
                                 value={registrationData.birthDate}
                                 onChange={(e) => setRegistrationData({...registrationData, birthDate: e.target.value})}
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Ciudad / Municipio</label>
                              <input 
                                 type="text"
                                 className="w-full h-11 bg-gray-100 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none"
                                 value={selectedCity}
                                 readOnly
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Barrio</label>
                              <input 
                                 type="text"
                                 className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all"
                                 placeholder="Nombre del barrio"
                                 value={registrationData.neighborhood}
                                 onChange={(e) => setRegistrationData({...registrationData, neighborhood: e.target.value})}
                              />
                           </div>
                           <div className="md:col-span-2 space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Dirección de Residencia</label>
                              <input 
                                 type="text"
                                 className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all"
                                 placeholder="Calle / Carrera / Apto"
                                 value={registrationData.address}
                                 onChange={(e) => setRegistrationData({...registrationData, address: e.target.value})}
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Teléfono Celular</label>
                              <div className="relative">
                                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                 <input 
                                    type="tel"
                                    className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all font-mono"
                                    placeholder="3xx xxxxxxx"
                                    value={registrationData.phone}
                                    onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                                 />
                              </div>
                           </div>
                           <div className="md:col-span-1 space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Correo Electrónico</label>
                              <div className="relative">
                                 <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                 <input 
                                    type="email"
                                    className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all"
                                    placeholder="correo@ejemplo.com"
                                    value={registrationData.email}
                                    onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                                 />
                              </div>
                           </div>
                           <div className="md:col-span-2 space-y-1">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Puntos de Referencia</label>
                              <input 
                                 type="text"
                                 className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all"
                                 placeholder="Frente al parque, casa de color azul, etc."
                                 value={registrationData.references}
                                 onChange={(e) => setRegistrationData({...registrationData, references: e.target.value})}
                              />
                           </div>
                        </div>

                        {/* BANK DATA (CONDITIONAL) */}
                        <AnimatePresence>
                           {legalModality === 'DEBITO' && (
                              <motion.div 
                                 initial={{ opacity: 0, height: 0 }}
                                 animate={{ opacity: 1, height: 'auto' }}
                                 exit={{ opacity: 0, height: 0 }}
                                 className="pt-6 border-t border-gray-100 grid md:grid-cols-3 gap-6"
                              >
                                 <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Institución Financiera</label>
                                    <select 
                                       className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all"
                                       value={bankInfo.name}
                                       onChange={(e) => setBankInfo({...bankInfo, name: e.target.value})}
                                    >
                                       {BANKS.map(b => (
                                          <option key={b} value={b}>{b}</option>
                                       ))}
                                       <option value="OTRO">Otro Banco...</option>
                                    </select>
                                 </div>
                                 <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Tipo de Cuenta</label>
                                    <select 
                                       className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all"
                                       value={registrationData.bankAccountType}
                                       onChange={(e) => setRegistrationData({...registrationData, bankAccountType: e.target.value})}
                                    >
                                       <option value="Ahorros">Ahorros</option>
                                       <option value="Corriente">Corriente</option>
                                       <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                                    </select>
                                 </div>
                                 <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Últimos 4 Dígitos</label>
                                    <input 
                                       type="text"
                                       maxLength={4}
                                       className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emi-red/20 transition-all font-mono"
                                       placeholder="X X X X"
                                       value={bankInfo.lastDigits}
                                       onChange={(e) => setBankInfo({...bankInfo, lastDigits: e.target.value})}
                                    />
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>

                     <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl">
                        <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <ShieldCheck className="text-emi-red" size={16} />
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Guión Confronta EMI</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              <span className="text-[10px] font-black text-red-500 uppercase">Modo Grabación Activo</span>
                           </div>
                        </div>
                        <div className="p-10 space-y-8">
                           {/* DYNAMIC FIELD EDITOR FOR LEGAL SCRIPT */}
                           {legalModality === 'DEBITO' && (
                              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                 <div className="space-y-1">
                                    <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Banco</label>
                                    <input 
                                       className="w-full bg-white border-0 h-8 px-3 rounded-lg text-[10px] outline-none" 
                                       value={bankInfo.name} 
                                       onChange={(e) => setBankInfo({...bankInfo, name: e.target.value})}
                                    />
                                 </div>
                                 <div className="space-y-1">
                                    <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Últimos 4 Dígitos</label>
                                    <input 
                                       className="w-full bg-white border-0 h-8 px-3 rounded-lg text-[10px] outline-none" 
                                       value={bankInfo.lastDigits} 
                                       onChange={(e) => setBankInfo({...bankInfo, lastDigits: e.target.value})}
                                    />
                                 </div>
                              </div>
                           )}

                           <div className="space-y-6">
                              <div className="space-y-2">
                                 <span className="text-[9px] font-black text-white bg-gray-900 px-2 py-0.5 rounded">INTRODUCCIÓN</span>
                                 <p className="text-sm leading-relaxed text-gray-600 italic">
                                    {LEGAL_SCRIPTS.VERSION_INTRO}
                                 </p>
                              </div>

                              <div className="space-y-4">
                                 <div className="space-y-3 bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                                    <div className="flex items-center justify-between mb-2">
                                       <span className="text-[9px] font-black text-white bg-blue-600 px-2 py-0.5 rounded">ACEPTACIÓN TITULAR</span>
                                       <p className="text-[9px] font-black text-blue-600 uppercase">Verifique Tipo de Titular</p>
                                    </div>
                                    <p className="text-lg leading-relaxed text-gray-800 font-bold">
                                       "{titularType === 'MISMO_TITULAR' 
                                          ? LEGAL_SCRIPTS.TITULAR_TYPES.MISMO_TITULAR 
                                          : LEGAL_SCRIPTS.TITULAR_TYPES.TERCERO_TITULAR
                                             .replace('{TITULAR_NAME}', '[Nombre del Titular]')
                                             .replace('{TITULAR_CC}', '[Cédula]')
                                             .replace('{BENEFICIARIO_NAME}', adresData.fullName || '[Usuario]')
                                       }"
                                    </p>
                                 </div>

                                 <div className="space-y-3 bg-red-50/50 p-6 rounded-3xl border border-emi-red/10">
                                    <div className="flex items-center justify-between mb-2">
                                       <span className="text-[9px] font-black text-white bg-emi-red px-2 py-0.5 rounded">LEGAL 1: MODELO DE PAGO</span>
                                       <p className="text-[9px] font-black text-emi-red uppercase">Lectura textual obligatoria</p>
                                    </div>
                                    <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-bold">
                                      "Señor/a <span className="text-emi-red uppercase">{adresData.fullName || '...'}</span>, {LEGAL_SCRIPTS.MODALITIES[legalModality as keyof typeof LEGAL_SCRIPTS.MODALITIES].legal1
                                        .replace('{BANCO}', bankInfo.name)
                                        .replace('{DIGITOS}', bankInfo.lastDigits)
                                        .replace('{VALOR_ADHESION}', `$${currentPricing.totalInitial.toLocaleString()}`)
                                        .replace('{PLAN_NAME}', activePlan.name.replace('EMI ', ''))
                                        .replace('{VALOR_MENSUAL}', `$${currentPricing.monthlyValue.toLocaleString()}`)
                                      }"
                                    </p>
                                 </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4">
                                 <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-2">
                                    <span className="text-[9px] font-black text-gray-400 uppercase">LEGAL 2 (TÉRMINOS)</span>
                                    <p className="text-sm text-gray-800 font-bold leading-relaxed italic">"¿Certifica usted que conoce y acepta, todos los términos y condiciones del contrato, así como la política de tratamiento de datos personales de grupo emi s.a.s?"</p>
                                 </div>
                                 <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-2">
                                    <span className="text-[9px] font-black text-gray-400 uppercase">LEGAL 3 (IDENTIDAD)</span>
                                    <p className="text-sm text-gray-800 font-bold leading-relaxed italic">"¿Autoriza usted a grupo emi s.a.s., para validar su identidad por medio de 5 preguntas?"</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-between">
                        <button onClick={() => setCallStep(4)} className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 px-6 py-4">
                           <ChevronRight size={16} className="rotate-180" /> Atrás
                        </button>
                        <button onClick={() => setCallStep(6)} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emi-red transition-all shadow-lg active:scale-95">
                           Siguiente: Cierre <ChevronRight size={16} />
                        </button>
                     </div>
                  </div>
                )}

                {callStep === 6 && (
                  <div className="space-y-8">
                     <div className="space-y-2 text-center max-w-xl mx-auto">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
                           <CheckCircle className="text-green-600 w-10 h-10" />
                        </div>
                        <span className="text-emi-red text-[10px] font-black uppercase tracking-[0.4em]">Fase 06</span>
                        <h2 className="text-4xl font-black italic tracking-tighter text-gray-900 uppercase">Cierre y Bienvenida</h2>
                        <p className="text-gray-400 text-sm">Refuerce la confianza y entregue los canales de atención inmediata.</p>
                     </div>

                     <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 space-y-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600" />
                        
                        <div className="space-y-4">
                           <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">¡Venta Exitosa!</h3>
                           <p className="text-lg text-gray-600 max-w-md mx-auto">
                             "Bienvenido a la familia <span className="text-emi-red font-black italic">EMI</span>. Su servicio se activará en un máximo de <span className="font-bold text-gray-900">72 horas hábiles</span>."
                           </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                           <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                              <MessageSquare className="text-emi-red mx-auto mb-2" size={24} />
                              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">WhatsApp Médico</p>
                              <p className="text-xs font-bold font-mono">310 000 0000</p>
                           </div>
                           <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                              <Phone className="text-emi-red mx-auto mb-2" size={24} />
                              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Citas Externas</p>
                              <p className="text-xs font-bold font-mono">01 8000 ...</p>
                           </div>
                        </div>

                        <p className="text-xl font-medium italic text-gray-500">
                           "Fue un placer atenderle, le habló <span className="text-emi-red font-bold italic">{agentName || '[Su Nombre]'}</span>, su asesor de confianza."
                        </p>
                     </div>

                     <div className="flex justify-center flex-wrap gap-4">
                        <button onClick={() => {
                          setCallStep(1);
                          setAdresData({
                            documentType: DocumentType.CC,
                            idNumber: '',
                            fullName: '',
                            eps: '',
                            regime: Regime.CONTRIBUTIVO,
                            status: AffiliateStatus.ACTIVO,
                            type: AffiliateType.COTIZANTE,
                            department: '',
                            city: '',
                            affiliationDate: ''
                          });
                          setDocId('');
                        }} className="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                           Nueva Llamada
                        </button>
                        <button className="bg-emi-red text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emi-red/20 flex items-center gap-2">
                           Descargar Resumen <FileText size={16} />
                        </button>
                     </div>
                  </div>
                )}
             </motion.div>
          </AnimatePresence>

          {/* F. FOOTER LINKS */}
          <div className="pt-24 pb-12 px-12 opacity-50 flex flex-wrap gap-8 justify-center">
            {[
              { label: 'Venta Asistida', url: '#' },
              { label: 'Sura Personas', url: '#' },
              { label: 'Manual Corporativo', url: '#' },
              { label: 'Líneas Soporte', url: '#' }
            ].map(l => (
              <a key={l.label} href={l.url} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-emi-red transition-colors flex items-center gap-1">
                {l.label} <ChevronRight size={10} />
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
