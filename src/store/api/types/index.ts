type LocalizaitonType = {
  id: string;
  country: string;
  countryCode: string;
};

export type LocalizaitonResponseType = LocalizaitonType[];

export type getPagesRequestType = {
  pagesCount: number;
  countryCode: string;
  seed: number;
  errors: number;
};

export type PersonType = {
  order: number;
  id: string;
  fullName: string;
  address: string;
  phone: string;
};

export type getPagesResponseType = PersonType[];

export type getPageRequestType = {
  pageOrder: number;
  countryCode: string;
  seed: number;
  errors: number;
};
export type getPageResponseType = PersonType[];
