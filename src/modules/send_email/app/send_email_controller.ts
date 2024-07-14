import { Request, Response } from "express";
import { SendEmailUsecase } from "./send_email_usecase";
import {
  InvalidParameter,
  InvalidRequest,
} from "../../../shared/helpers/errors/controller_errors";
import {
  BadRequest,
  Conflict,
  Forbidden,
  InternalServerError,
  ParameterError,
} from "../../../shared/helpers/http/http_codes";
import { EntityError } from "../../../shared/helpers/errors/domain_errors";
import { DuplicatedItem } from "../../../shared/helpers/errors/usecase_errors";
import { SendEmailViewModel } from "./send_email_viewmodel";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises"; 

export class SendEmailController {
  constructor(private usecase: SendEmailUsecase) {}

  async handle(req: Request, res: Response) {
    try {
      const { subject, text } = req.body;
      let { team } = req.body;
      const pdfPath = req.file?.path;

      if (!pdfPath) {
        throw new InvalidRequest("PDF file is required.");
      }
      if (!team) {
        throw new InvalidRequest("Team are required.");
      }
      if (!subject) {
        throw new InvalidRequest("Subject is required.");
      }
      if (!text) {
        throw new InvalidRequest("Text is required.");
      }

      // if (!Array.isArray(recipients)) {
      //   recipients = [recipients];
      // }

      const resolvedPdfPath = path.resolve(pdfPath);
      
      const success = await this.usecase.execute(
        team,
        subject,
        text,
        resolvedPdfPath
      );

      if (success) {
        const uploadDir = path.resolve('uploads'); 
        await fsPromises.rm(uploadDir, { recursive: true, force: true });
        console.log(`Pasta ${uploadDir} removida com sucesso!`);
      }

      const viewmodel = new SendEmailViewModel("E-mails enviados com sucesso!");
      return res.status(200).send(viewmodel);
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
