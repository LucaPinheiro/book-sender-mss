export enum TEAM {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export function toEnum(value: string): TEAM {
  switch (value) {
    case "ACTIVE":
      return TEAM.ACTIVE;
    case "INACTIVE":
      return TEAM.INACTIVE;
    default:
      throw new Error("Invalid value");
  }
}
