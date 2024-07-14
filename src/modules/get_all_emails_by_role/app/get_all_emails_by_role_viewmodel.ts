import { Email } from "../../../shared/domain/entities/email";

export class GetAllEmailsByRoleViewmodel {
  email: string;

  constructor(email: Email) {
    this.email = email.email;
  }
}
