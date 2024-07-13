import { Request, Response } from "express";
import {
  InvalidParameter,
  InvalidRequest,
  MissingParameters,
} from "../../../shared/helpers/errors/controller_errors";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import {
  BadRequest,
  Conflict,
  Forbidden,
  InternalServerError,
  ParameterError,
} from "../../../shared/helpers/http/http_codes";
import { CreateEmailUsecase } from "./create_email_usecase";
import { EmailProps } from "../../../shared/domain/entities/email";
import { CreateEmailViewModel } from "./create_email_viewmodel";
import { DuplicatedItem } from "../../../shared/helpers/errors/usecase_errors";

export class CreateEmailController {
  constructor(private createUserUsecase: CreateEmailUsecase) {}

  async createEmail(req: Request, res: Response) {
    try {
      console.log("TENTANDO CRIAR USUÁRIO");
      const { email, team, role } = req.body;

      const errors: MissingParameters[] = [];

      if (!email) {
        errors.push(new MissingParameters("Email"));
      }

      if (!team) {
        errors.push(new MissingParameters("Team"));
      }

      if (!team) {
        errors.push(new MissingParameters("Role"));
      }

      if (errors.length > 0) {
        throw res.status(400).json(errors);
      }

      const userProps: EmailProps = {
        email,
        team,
        role,
      };

      await this.createUserUsecase.execute(userProps);

      const viewModel = new CreateEmailViewModel(
        "Email cadastrado com sucesso!"
      );
      res.status(201).json(viewModel);
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
      if (error instanceof DuplicatedItem) {
        return new Conflict(error.message).send(res);
      }
      if (error instanceof BadRequest) {
        return new BadRequest(error.getMessage()).send(res);
      }
      return new InternalServerError("Internal Server Error").send(res);
    }
  }
}
