import { EntityError } from "../../helpers/errors/domain_errors";
import { TEAM } from "../enums/team_enum";

export interface UserProps {
  emailId?: string;
  email: string;
  team: TEAM;
}

export class User {
  constructor(public props: UserProps) {
    this.validateProps(props);
  }

  private validateProps(props: UserProps) {
    if (!User.isValidEmail(props.email)) {
      throw new EntityError("Invalid email");
    }

    if (!User.isValidTeam(props.team)) {
      throw new EntityError("Invalid team");
    }
  }

  get emailId(): string | undefined {
    return this.props.emailId;
  }

  get email(): string {
    return this.props.email;
  }

  setEmail(email: string): void {
    if (!User.isValidEmail(email)) {
      throw new EntityError("Invalid email");
    }
    this.props.email = email;
  }

  static isValidTeam(team: TEAM): boolean {
    return Object.values(TEAM).includes(team);
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /\S+@santander\S+\.\S+/;
    return emailRegex.test(email);
  }
}
