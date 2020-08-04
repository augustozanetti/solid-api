import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute({ email, name, password }: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error(`User ${email} already exists`);
    }

    const user = new User({ name, email, password });

    await this.userRepository.save(user);
    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      from: {
        name: "SOLID API",
        email: "solidapi@app.com.br",
      },
      subject: "Seja bem-vindo a plataforma",
      body: `<p>Olá ${user.name}, seu acesso ao app já está liberado!!</p>`,
    });
  }
}
