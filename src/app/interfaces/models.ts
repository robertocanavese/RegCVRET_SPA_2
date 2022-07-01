
/** RegCVRET */
export interface regCvret {
	id: string;
	name: string;
}
/** RegCVRET_BORICaricoProcessed */
export interface regCvretBoriCaricoProcessed {
	nrres: number;
	dtres: number;
	nrrgs: number;
	nrcms: number;
}
/** RegCVRET_BORIScaricoProcessed */
export interface regCvretBoriScaricoProcessed {
	nrres: number;
	dtres: number;
	nrrgs: number;
	nrcms: number;
}
/** RegCVRET_Chiusure */
export interface regCvretChiusure {
	codRegCv: string;
	anno: number;
	mese: number;
	okDdt?: boolean;
	okValorizzata?: boolean;
	okMesiPrec?: boolean;
	dataChiusuraGiacenza: string;
	dataChiusuraValorizzata: string;
	opevar?: number;
	datvar?: Date;
}
/** RegCVRET_Config */
export interface regCvretConfig {
	id: number;
	parametro: string;
	valore: string;
	datvar?: Date;
	descrizione: string;
}
/** RegCVRET_CostoAcq */
export interface regCvretCostoAcq {
	idRec: number;
	annullato?: number;
	codRegCv: string;
	magaGest: string;
	codArt: string;
	qtaAcquisto?: number;
	prezzoAcq?: number;
	nrres?: number;
	dtres?: number;
	nrrgs?: number;
	nrcms?: number;
	cdFor: string;
	cdCliFat: string;
	cdCliSped: string;
	cauBollaCv: string;
	cdmfs: string;
	grbos: string;
	nrbos?: number;
	dtbos?: number;
	nrocs?: number;
	octdor?: number;
	nrrcs?: number;
	nrccs?: number;
	oawflw: string;
	oaworw?: number;
	qtaScaricata?: number;
	dataIns?: Date;
	dataUpd?: Date;
	batch: string;
}
/** RegCVRET_FATTScaricoProcessed */
export interface regCvretFattScaricoProcessed {
	idChiusura: number;
	datins?: Date;
}
/** RegCVRET_FBNF00FProcessed */
export interface regCvretFbnf00FProcessed {
	bnfmfb: string;
	bnfgrb: string;
	bnfnrb: number;
	bnfdtb: number;
}
/** RegCVRET_Giacenza */
export interface regCvretGiacenza {
	idRec: number;
	annullato: string;
	codRegCv: string;
	cdCliFat: string;
	cdCliSped: string;
	magaGest: string;
	codArt: string;
	qtaGiac: number;
	valGiac?: number;
	dataIns: Date;
	dataUpd?: Date;
}
/** RegCVRET_Movimenti */
export interface regCvretMovimenti {
	idRec: number;
	annullato?: number;
	codRegCv: string;
	magaGest: string;
	dataMov: Date;
	causMov: string;
	segnoMov: string;
	tipoMov: string;
	codArt: string;
	quantita: number;
	batch: string;
	prezzoAcq?: number;
	valoreMov?: number;
	datIns?: Date;
	bgm220: string;
	dtm137: string;
	flusso: string;
	cdCliFat: string;
	cdCliSped: string;
	cauBollaCv: string;
	cdmBollaCv: string;
	grbBollaCv: string;
	nrBollaCv?: number;
	dtBollaCv?: number;
	kNrresCv?: number;
	kDtresCv?: number;
	kNrrgsCv?: number;
	idOrdWebCv?: number;
	idRigaOrCv?: number;
	idOrdAsCv?: number;
	dtOrdAsCv?: number;
	cdmBollaFt: string;
	grbBollaFt: string;
	nrBollaFt?: number;
	dataBollaFt?: number;
	kNrresFt?: number;
	kDtresFt?: number;
	kNrrgsFt?: number;
	idOrdWebFt?: number;
	idRigaOrFt?: number;
	idOrdAsFt?: number;
	dtOrdAsFt?: number;
	causOrdFt: string;
	rgIvaFat: string;
	nrFattura?: number;
	dataFattura?: number;
}
/** RegCVRET_STO_GiacenzaSaldi */
export interface regCvretStoGiacenzaSaldi {
	idRec: number;
	annullato: string;
	dataRif?: Date;
	codRegCv: string;
	magaGest: string;
	codArt: string;
	qtaGiac: number;
	valGiac?: number;
	qtProgCar?: number;
	valProgCar?: number;
	qtProgScar?: number;
	valProgScar?: number;
	dataIns: Date;
	dataUpd?: Date;
}
/** RegCVRET_Tab_CausaliCarico */
export interface regCvretTabCausaliCarico {
	annullato?: number;
	codCauVen: string;
	cauMov: string;
}
/** RegCVRET_Tab_CausaliMov */
export interface regCvretTabCausaliMov {
	annullato?: number;
	codCausale: string;
	desCausale: string;
	segno: string;
	tipoMov: string;
}
/** RegCVRET_Tab_CausaliScarico */
export interface regCvretTabCausaliScarico {
	annullato?: number;
	codCauVen: string;
	cauMov: string;
}
/** VW_RegCVRET_Chiusure */
export interface vwRegCvretChiusure {
	codRegCv: string;
	cvName: string;
	anno: number;
	mese: number;
	okDdt?: boolean;
	okValorizzata?: boolean;
	okMesiPrec?: boolean;
	dataChiusuraGiacenza: string;
	dataChiusuraValorizzata: string;
	opevar?: number;
	opeDesc: string;
	datvar?: Date;
	dt_DataChiusuraGiacenza?: Date;
	dt_DataChiusuraValorizzata?: Date;
}
/** VW_RegCVRET_Giacenza */
export interface vwRegCvretGiacenza {
	idRec: number;
	annullato: string;
	codRegCv: string;
	regCvDesc: string;
	cdCliFat: string;
	cdCliSped: string;
	magaGest: string;
	magaGestDesc: string;
	codArt: string;
	qtaGiac: number;
	valGiac?: number;
	dataIns: Date;
	dataUpd?: Date;
}
/** VW_RegCVRET_Movimenti */
export interface vwRegCvretMovimenti {
	idRec: number;
	annullato?: number;
	codRegCv: string;
	regCvDesc: string;
	magaGest: string;
	magaGestDesc: string;
	dataMov: Date;
	causMov: string;
	desCausaleMov: string;
	segnoMov: string;
	tipoMov: string;
	codArt: string;
	quantita: number;
	batch: string;
	prezzoAcq?: number;
	valoreMov?: number;
	datIns?: Date;
	bgm220: string;
	dtm137: string;
	flusso: string;
	cdCliFat: string;
	cdCliSped: string;
	cauBollaCv: string;
	cdmBollaCv: string;
	grbBollaCv: string;
	nrBollaCv?: number;
	dtBollaCv?: number;
	kNrresCv?: number;
	kDtresCv?: number;
	kNrrgsCv?: number;
	idOrdWebCv?: number;
	idRigaOrCv?: number;
	idOrdAsCv?: number;
	dtOrdAsCv?: number;
	cdmBollaFt: string;
	grbBollaFt: string;
	nrBollaFt?: number;
	dataBollaFt?: number;
	kNrresFt?: number;
	kDtresFt?: number;
	kNrrgsFt?: number;
	idOrdWebFt?: number;
	idRigaOrFt?: number;
	idOrdAsFt?: number;
	dtOrdAsFt?: number;
	causOrdFt: string;
	rgIvaFat: string;
	nrFattura?: number;
	dataFattura?: number;
	selected?: boolean;
}

export interface prcRegCvretMGetKitValorizzataReturnModel {
	registroCV: string;
	dataRiferimento: string;
	articolo: string;
	giacenza?: number;
	costoMedio?: number;
	valCostoMedio?: number;
	valore?: number;
	descrizione: string;
	colore: string;
	styleGroup: string;
	styleDescription: string;
	brand: string;
	category: string;
	gender: string;
	eAN: string;
	cod19: string;
	listinoRetail?: number;
}