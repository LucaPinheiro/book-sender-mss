import { Email } from "../../../shared/domain/entities/email";
import { ROLE } from "../../../shared/domain/enums/role_enum";
import { TEAM } from "../../../shared/domain/enums/team_enum";

export class GetAllEmailsViewmodel {
  email: string;
  role: ROLE;
  team: TEAM;

  constructor(email: Email) {
    this.email = email.email;
    this.team = email.team;
    this.role = email.role;
  }
}
