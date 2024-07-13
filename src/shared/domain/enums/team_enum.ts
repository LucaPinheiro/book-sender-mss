export enum TEAM {
  MARKETSHARE = "MS",
  SEGUROSAUTO = "SA",
  CONVERSAO = "CVS",
}

export function toEnum(value: string): TEAM {
  switch (value) {
    case "MS":
      return TEAM.MARKETSHARE;
    case "SA":
      return TEAM.SEGUROSAUTO;
    case "CVS":
      return TEAM.CONVERSAO;
    default:
      throw new Error("Invalid value");
  }
}
