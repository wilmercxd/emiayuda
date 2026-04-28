export enum DocumentType {
  CC = 'Cedula de Ciudadania (CC)',
  CE = 'Cedula de Extranjeria (CE)',
  TI = 'Tarjeta de Identidad (TI)',
  RC = 'Registro Civil (RC)',
  PA = 'Pasaporte (PA)',
  NUIP = 'NUIP'
}

export enum Regime {
  CONTRIBUTIVO = 'Contributivo',
  SUBSIDIADO = 'Subsidiado',
  EXCEPCION = 'Excepcion',
  ESPECIAL = 'Especial'
}

export enum AffiliateStatus {
  ACTIVO = 'Activo',
  SUSPENDIDO = 'Suspendido',
  INACTIVO = 'Inactivo',
  NO_REGISTRA = 'No registra',
  FALLECIDO = 'Fallecido'
}

export enum AffiliateType {
  COTIZANTE = 'Cotizante',
  BENEFICIARIO = 'Beneficiario',
  SUBSIDIADO = 'Afiliado Subsidiado'
}

export interface AdresData {
  documentType: string;
  idNumber: string;
  fullName: string;
  eps: string;
  regime: Regime;
  status: AffiliateStatus;
  type: AffiliateType;
  department: string;
  city: string;
  affiliationDate: string;
}

export interface PlanTariff {
  affiliates: number;
  valuePerPerson: number;
  totalGroup: number;
}

export interface EmiPlan {
  id: string;
  name: string;
  code: string;
  tariffs: PlanTariff[];
  adhesionFee: number;
  argument: string;
  objection: string;
}
