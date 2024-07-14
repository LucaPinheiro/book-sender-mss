import { Express, Request, Response } from "express";
import CreateUserPresenter from "../modules/create_user/app/create_user_presenter";
import AuthUserPresenter from "../modules/auth_user/app/auth_user_presenter";
import GetUserByIdPresenter from "../modules/get_user_by_id/app/get_user_by_id_presenter";
import createEmailPresenter from "../modules/create_email/app/create_email_presenter";
import getAllEmailsPresenter from "../modules/get_all_emails/app/get_all_emails_presenter";
import getAllEmailsByTeamPresenter from "../modules/get_all_emails_by_team/app/get_all_emails_by_team_presenter";
import getAllEmailsByRolePresenter from "../modules/get_all_emails_by_role/app/get_all_emails_by_role_presenter";
import sendEmailPresenter from "../modules/send_email/app/send_email_presenter";
import deleteEmailPresenter from "../modules/delete_email/app/delete_email_presenter";

import app from "../app";

const routes = (app: Express) => {
  app
    .route("/")
    .get((req: Request, res: Response) =>
      res.status(200).send("Api Book Sender")
    );

  // user routes
  app.use("/api", CreateUserPresenter);
  app.use("/api", AuthUserPresenter);
  app.use("/api", GetUserByIdPresenter);

  // email routes
  app.use("/api", createEmailPresenter);
  app.use("/api", getAllEmailsPresenter);
  app.use("/api", getAllEmailsByTeamPresenter);
  app.use("/api", getAllEmailsByRolePresenter);
  app.use("/api", sendEmailPresenter);
  app.use("/api", deleteEmailPresenter);
};

export default routes;
