import { PrismaClient } from "@prisma/client";
import { Email, EmailProps } from "../../domain/entities/email";
import { IEmailRepository } from "../../domain/repositories/email_repository_interface";
import { TEAM } from "../../domain/enums/team_enum";
import { ROLE } from "../../domain/enums/role_enum";
import { DuplicatedItem } from "../../helpers/errors/usecase_errors";

const prisma = new PrismaClient();

export class EmailRepositoryPrisma implements IEmailRepository {
  async createEmail(emailProps: EmailProps): Promise<Email> {
    try {
      const existingEmail = await prisma.email.findUnique({
        where: {
          email: emailProps.email,
        },
      });

      if (existingEmail)
        throw new DuplicatedItem("Email already exists in the database.");

      const createdEmailFromPrisma = await prisma.email.create({
        data: {
          email: emailProps.email,
          team: emailProps.team,
          role: emailProps.role,
        },
      });

      const createdEmail = new Email({
        email: createdEmailFromPrisma.email,
        team: createdEmailFromPrisma.team as TEAM,
        role: createdEmailFromPrisma.role as ROLE,
      });

      return createdEmail;
    } catch (error: any) {
      console.error("Erro ao criar email:", error);
      if (error instanceof DuplicatedItem) {
        throw error;
      }
      throw new Error("Erro ao criar email no banco de dados.");
    }
  }
}
