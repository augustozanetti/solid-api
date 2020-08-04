import { MailTrapMailProvider } from "../../providers/implentations/MailTrapMailProvider";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const mailTrapMailProvider = new MailTrapMailProvider();
const postgresUserRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserUseCase(
  postgresUserRepository,
  mailTrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
