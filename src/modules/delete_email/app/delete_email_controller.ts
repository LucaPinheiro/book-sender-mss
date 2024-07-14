import { Request, Response } from "express";
import { DeleteEmailUsecase } from "./delete_email_usecase";
import { DeleteEmailViewModel } from "./delete_email_viewmodel";
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

export class DeleteEmailController {
  constructor(private deleteEmailUsecase: DeleteEmailUsecase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const email = req.params.email;
    try {
      if (!email) {
        throw new BadRequest("Email is required");
      }
      await this.deleteEmailUsecase.execute(email);
      return res
        .status(200)
        .json(new DeleteEmailViewModel("Email deleted successfully"));
    } catch (error: any) {
      if (error instanceof InvalidRequest) {
        new BadRequest(error.message).send(res);
        return res;
      }
      if (error instanceof InvalidParameter) {
        new ParameterError(error.message).send(res);
        return res;
      }
      if (error instanceof EntityError) {
        new ParameterError(error.message).send(res);
        return res;
      }
      if (error instanceof Forbidden) {
        new Forbidden(error.getMessage()).send(res);
        return res;
      }
      if (error instanceof BadRequest) {
        new BadRequest(error.getMessage()).send(res);
        return res;
      }
      new InternalServerError("Internal Server Error").send(res);
      return res;
    }
  }
}
