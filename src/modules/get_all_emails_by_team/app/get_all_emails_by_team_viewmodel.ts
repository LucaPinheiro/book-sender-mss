import { Email } from "../../../shared/domain/entities/email";

export class GetAllEmailsByTeamViewmodel {
  email: string;

  constructor(email: Email) {
    this.email = email.email;
  }
}
