export enum TEAM {
  MARKETSHARE = "MARKET-SHARE",
  SEGUROSAUTO = "SEGUROS-AUTO",
  CONVERSAO = "CONVERSAO",
  TODOS = "TODOS",
}

export function toEnum(value: string): TEAM {
  switch (value) {
    case "MARKET-SHARE":
      return TEAM.MARKETSHARE;
    case "SEGUROS-AUTO":
      return TEAM.SEGUROSAUTO;
    case "CONVERSAO":
      return TEAM.CONVERSAO;
    case "TODOS":
      return TEAM.TODOS;
    default:
      throw new Error("Invalid value");
  }
}
