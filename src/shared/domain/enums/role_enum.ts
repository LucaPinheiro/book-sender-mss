export enum ROLE {
  CHEFE_FINANCEIRA = "FINANCAS",
  DIRETOR = "DIRETOR",
  HEAD_FINANCAS = "HEAD",
  GESTOR = "GESTOR",
  TIME = "TIME",
}

export function toEnum(value: string): ROLE {
  switch (value) {
    case "FINANCAS":
      return ROLE.CHEFE_FINANCEIRA;
    case "DIRETOR":
      return ROLE.DIRETOR;
    case "HEAD":
      return ROLE.HEAD_FINANCAS;
    case "GESTOR":
      return ROLE.GESTOR;
    case "TIME":
      return ROLE.TIME;
    default:
      throw new Error("Invalid value");
  }
}
