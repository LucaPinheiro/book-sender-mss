import { Email } from "../../../shared/domain/entities/email";
import { TEAM } from "../../../shared/domain/enums/team_enum";
import { IEmailRepository } from "../../../shared/domain/repositories/email_repository_interface";
import { InvalidParameter } from "../../../shared/helpers/errors/controller_errors";

export class GetAllEmailsByTeamUsecase {
  constructor(private repo: IEmailRepository) {}

  async execute(team: string): Promise<Email[]> {
    if (!Email.isValidTeam(team as TEAM)) {
      throw new InvalidParameter("team", "Invalid team name");
    }
    
    return this.repo.getAllEmailsByTeam(team);
  }
}
