export enum TEAM {
  MARKETSHARE = "MARKET-SHARE",
  SEGUROSAUTO = "SEGUROS-AUTO",
  CONVERSAO = "CONVERSAO",
  TODOS = "TODOS",
}

export function toEnum(value: string): TEAM {
  switch (value) {
    case "MS":
      return TEAM.MARKETSHARE;
    case "SA":
      return TEAM.SEGUROSAUTO;
    case "CVS":
      return TEAM.CONVERSAO;
    case "TODOS":
      return TEAM.TODOS;
    default:
      throw new Error("Invalid value");
  }
}
