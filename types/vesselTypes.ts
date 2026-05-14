export type VesselData = {
    imoNumber: number;
    mmsiNumber?: number | null;
    vesselName?: string | null;
    flag?: string | null;
    callSign?: string | null;
    vesselType?: string | null;
    grossTonnage?: number | null;
    dwt?: number | null;
    yearBuilt?: number | null;
    status?: string | null;
    statusDate?: Date | null;
    lastUpdate?: Date | null;
    hasDnvEntry: boolean;
    hasEquasisEntry: boolean;

    dnvData?:
        | {
              identification?: Identification | null;
              owner?: Owner | null;
              classification?: Classification | null;
              certificates?: Certificate[] | null;
              surveys?: Survey[] | null;
              conditions?: Condition[] | null;
              yard?: Yard | null;
              dimensions?: Dimensions | null;
              hull?: Hull | null;
              machinery?: Machinery | null;
          }
        | null
        | undefined;

    equasisData?:
        | {
              basicInfo?: VesselBasicInfo | null;

              management?: CompanyInfo[] | null;
              classification?: ClassificationInfo[] | null;
              inspections?: InspectionInfo[] | null;

              historicalNames?: HistoricalName[] | null;
              historicalFlags?: HistoricalFlag[] | null;
              historicalCompanies?: HistoricalCompany[] | null;
          }
        | null
        | undefined;
};

export type Identification = {
    vesselName: string | null;
    vesselId: string | null;
    imoNumber: string | null;
    officialNumber: string | null;
    nonClassRelationString: string | null;
    classStatusString: string | null;
    operationalStatusString: string | null;
    signalLetters: string | null;
    homePort: string | null;
    typeFormatted: string | null;
    register: string | null;
    flagName: string | null;
    flagCode: string | null;
    purposes: Purpose[] | null;
};

export type Purpose = {
    oid: string;
    purpose: string;
    description: string;
    isMainPurpose: boolean;
};

export type Owner = {
    ownerName: string | null;
    ownerImoNumber: string | null;
    ownerDnvId: string | null;
    managerName: string | null;
    managerImoNumber: string | null;
    managerDnvId: string | null;
    docHolderName: string | null;
    docHolderImoNumber: string | null;
    docHolderDnvId: string | null;
};

export type Classification = {
    mainClass: string;
    mainClassMachinery: string;
    classNotationString: string;
    classNotationStringInOperation: string;
    constructionSymbol: string;
    constructionSymbolMachinery: string;
    classNotationStringMachinery: string;
    constructionSymbolRefrigeration: string;
    classNotationStringStructuralDesign: string;
    classNotationStringModular: string;
    classNotationStringVesselType: string;
    classNotationStringDesign: string;
    classNotationStringDescriptive: string;
    classNotationStringServiceArea: string;
    mainClassRefrigeration: string;
    classNotationStringRefrigeration: string;
    classNotationStringMain: string;
    classNotationStringMainMachinery: string;
    registerNotationString: string | null;
    converted: Converted | null;
    lastClassificationSociety: string | null | "";
    classEntryDate: string | null;
    dualClass: string | null | "";
    equipmentNumber: string | null | "";
    classRequestDate: string | null;
    classAssignmentDate: string | null;
    commissioningDate: string | null;
};

export type Converted = {
    date: string | null;
    comment: string | null;
};

export type Certificate = {
    oid: string;
    code: string;
    certificate: string;
    type: string;
    term: string;
    issued: string | null;
    expires: string | null;
    extUntil: string | null;
};

export type Survey = {
    oid: string;
    survey: string;
    category: string;
    location: string;
    lastDate: string | null;
    dueFrom: string | null;
    dueTo: string | null;
    postponed: string | null;
};

export type Yard = {
    hullYardName: string;
    hullYardBuilderNo?: string | null;
    hullYardBuildNo?: string | null;
    contractedBuilder: string;
    contractedBuilderNo?: string | null;
    contractedBuilderBuildNo?: string | null;
    keelDate: string | null;
    dateOfBuild: string | null;
};

export type Dimensions = {
    lengthOverall: number | null;
    lbp: number | null;
    bm: number | null;
    dm: number | null;
    draught: number | null;
    dwt: number | null;
    grossTon69: number | null;
    netTon69: number | null;
};

export type Hull = {
    decksNumber: number | "" | null;
};

export type Machinery = {
    mainPropulsion: string | null;
};

export type Condition = Record<string, unknown>;

export type DnvData = {
    identification: Identification | null;
    owner: Owner | null;
    classification: Classification | null;
    certificates: Certificate[];
    surveys: Survey[];
    conditions: Condition[] | null;
    yard: Yard | null;
    dimensions: Dimensions | null;
    hull: Hull | null;
    machinery: Machinery | null;
};

export type VesselBasicInfo = {
    imo: string;
    name: string;
    flag: string;
    flag_code?: string;
    call_sign?: string;
    mmsi?: string;
    gross_tonnage?: number;
    dwt?: number;
    vessel_type?: string;
    year_built?: number;
    status?: string;
    status_date?: Date;
    last_update?: Date;
};

export type CompanyInfo = {
    imo?: string;
    name: string;
    role: string;
    address?: string;
    date_effect?: Date;
};

export type ClassificationInfo = {
    society: string;
    status: string;
    date_effect?: Date;
};

export type InspectionInfo = {
    authority?: string;
    port?: string;
    date: Date;
    detention: string;
    psc_organization: string;
    inspection_type?: string;
    duration?: string;
    deficiencies?: string;
    inspection_id?: string;
};

export type HistoricalName = {
    name: string;
    date_effect: Date;
    source: string;
};

export type HistoricalFlag = {
    flag: string;
    date_effect: Date;
    source: string;
};

export type HistoricalCompany = {
    company: string;
    role: string;
    date_effect: Date;
    source: string;
};

export type EquasisVesselData = {
    basic_info: VesselBasicInfo;

    management: CompanyInfo[];
    classification: ClassificationInfo[];
    inspections: InspectionInfo[];

    historical_names: HistoricalName[];
    historical_flags: HistoricalFlag[];
    historical_companies: HistoricalCompany[];
};
