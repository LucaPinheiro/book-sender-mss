import { Request, Response } from "express";
import { GetAllEmailsViewmodel } from "./get_all_emails_viewmodel";
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
import { GetAllEmailsUsecase } from "./get_all_emails_usecase";

export class GetAllEmailsController {
  constructor(private usecase: GetAllEmailsUsecase) {}

  async handle(req: Request, res: Response) {
    try {
      const emails = await this.usecase.execute();
      const emailsViewModel = emails.map(
        (email) => new GetAllEmailsViewmodel(email)
      );
      res.status(200).json(emailsViewModel);
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
