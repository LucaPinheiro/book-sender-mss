import { PrismaClient } from "@prisma/client";
import { Email, EmailProps } from "../../domain/entities/email";
import { IEmailRepositoryInterface } from "../../domain/repositories/email_repository_interface";
import { TEAM } from "../../domain/enums/team_enum";
import { ROLE } from "../../domain/enums/role_enum";
import { DuplicatedItem } from "../../helpers/errors/usecase_errors";

const prisma = new PrismaClient();

export class EmailRepositoryPrisma implements IEmailRepositoryInterface {
  async create_email(
    email: string,
    team: string,
    role: string
  ): Promise<Email> {
    try {
      const existingEmail = await prisma.email.findUnique({
        where: {
          email: email,
        },
      });

      if (existingEmail)
        throw new DuplicatedItem("Email already exists in the database.");

      const createdEmailFromPrisma = await prisma.email.create({
        data: {
          email: email,
          team: team,
          role: role,
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
