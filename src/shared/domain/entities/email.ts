import { EntityError } from "../../helpers/errors/domain_errors";
import { ROLE } from "../enums/role_enum";
import { TEAM } from "../enums/team_enum";

export interface EmailProps {
  emailId?: string;
  email: string;
  team: TEAM;
  role: ROLE;
}

export class Email {
  constructor(public props: EmailProps) {
    this.validateProps(props);
  }

  private validateProps(props: EmailProps) {
    if (!Email.isValidEmail(props.email)) {
      throw new EntityError("Invalid email");
    }

    if (!Email.isValidTeam(props.team)) {
      throw new EntityError("Invalid team");
    }

    if (!Email.isValidRole(props.role)) {
      throw new EntityError("Invalid role");
    }
  }

  get emailId(): string | undefined {
    return this.props.emailId;
  }

  get email(): string {
    return this.props.email;
  }

  get team(): TEAM {
    return this.props.team;
  }

  get role(): ROLE {
    return this.props.role;
  }

  setEmail(email: string): void {
    if (!Email.isValidEmail(email)) {
      throw new EntityError("Invalid email");
    }
    this.props.email = email;
  }

  static isValidTeam(team: TEAM): boolean {
    if (team == null) {
      return false;
    }
    if (Object.values(TEAM).includes(team) == false) {
      return false;
    }
    return true;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  static isValidRole(role: ROLE): boolean {
    if (role == null) {
      return false;
    }
    if (Object.values(ROLE).includes(role) == false) {
      return false;
    }
    return true;
  }
}
