import { Email } from "../../../shared/domain/entities/email";
import { ROLE } from "../../../shared/domain/enums/role_enum";
import { IEmailRepository } from "../../../shared/domain/repositories/email_repository_interface";
import { InvalidParameter } from "../../../shared/helpers/errors/controller_errors";

export class GetAllEmailsByRoleUsecase {
  constructor(private repo: IEmailRepository) {}

  async execute(role: string): Promise<Email[]> {
    if (!Email.isValidRole(role as ROLE)) {
      throw new InvalidParameter("role", "Invalid role name");
    }

    return this.repo.getAllEmailsByRole(role);
  }
}
