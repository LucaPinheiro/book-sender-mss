import { Request, Response } from "express";
import { GetAllEmailsByTeamViewmodel } from "./get_all_emails_by_team_viewmodel";
import { NoItemsFound } from "../../../shared/helpers/errors/usecase_errors";
import {
  BadRequest,
  Forbidden,
  InternalServerError,
  ParameterError,
} from "../../../shared/helpers/http/http_codes";
import {
  InvalidParameter,
  InvalidRequest,
} from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { GetAllEmailsByTeamUsecase } from "./get_all_emails_by_team_usecase";

export class GetAllEmailsByTeamController {
  constructor(private usecase: GetAllEmailsByTeamUsecase) {}

  async handle(req: Request, res: Response) {
    try {
      const team = req.params.team as string;

      if (!team) {
        throw new InvalidParameter("Team", "Team is required");
      }

      if (team === "TODOS") {
        const emails = await this.usecase.execute(team);
        const emailsViewModel = emails.map(
          (email) => new GetAllEmailsByTeamViewmodel(email)
        );
        res.status(200).json(emailsViewModel);
      }

      const emails = await this.usecase.execute(team);
      const emailStrings = emails.map((email) => email.email);
      res.status(200).json(emailStrings);
    } catch (error: any) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message).send(res);
      }
      if (error instanceof InvalidParameter) {
        return new ParameterError(error.message).send(res);
      }
      if (error instanceof EntityError) {
        return new ParameterError(error.message).send(res);
      }
      if (error instanceof Forbidden) {
        return new Forbidden(error.getMessage()).send(res);
      }
      if (error instanceof NoItemsFound) {
        return new Forbidden(error.message).send(res);
      }
      return new InternalServerError("Internal Server Error").send(res);
    }
  }
}
