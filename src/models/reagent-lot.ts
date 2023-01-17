export interface ReagentLotFormModel {
  id: string;
  productName: string;
  companyName: string;
  serialName: string;
  serialNumber: number;
  dates: Date[] | null;
  status: string;
}

export const emptyReagentLotForm: ReagentLotFormModel = {
  id: "",
  productName: "",
  companyName: "",
  serialName: "",
  serialNumber: 0,
  dates: null,
  status: "",
};

export interface ReagentLot {
  id: string;
  productName: string;
  companyName: string;
  serialName: string;
  serialNumber: number;
  productionDate?: Date | null;
  expirationDate?: Date | null;
  status: string;
}

export const emptyReagentLoT: ReagentLot = {
  id: "",
  productName: "",
  companyName: "",
  serialName: "",
  serialNumber: 0,
  productionDate: null,
  expirationDate: null,
  status: "",
};

export type ReagentLots = ReagentLot[];
