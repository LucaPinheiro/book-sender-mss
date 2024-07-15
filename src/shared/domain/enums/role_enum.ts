export enum ROLE {
  CHEFE_FINANCEIRA = "1",
  DIRETOR = "2",
  HEAD_FINANCAS = "3",
  GESTOR = "4",
  TIME = "5",
}

export function toEnum(value: string): ROLE {
  switch (value) {
    case "1":
      return ROLE.CHEFE_FINANCEIRA;
    case "2":
      return ROLE.DIRETOR;
    case "3":
      return ROLE.HEAD_FINANCAS;
    case "4":
      return ROLE.GESTOR;
    case "5":
      return ROLE.TIME;
    default:
      throw new Error("Invalid value");
  }
}
