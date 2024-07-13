import { Email } from "../../../shared/domain/entities/email";
import { IEmailRepository } from "../../../shared/domain/repositories/email_repository_interface";

export class GetAllEmailsByTeamUsecase {
  constructor(private repo: IEmailRepository) {}

  async execute(team: string): Promise<Email[]> {
    return this.repo.getAllEmailsByTeam(team);
  }
}
