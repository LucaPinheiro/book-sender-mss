import { Email } from "../../../shared/domain/entities/email";

export class GetAllEmailsByTeamViewmodel {
  email: string;
  role: string;

  constructor(email: Email) {
    this.email = email.email;
    this.role = email.role;
  }
}
