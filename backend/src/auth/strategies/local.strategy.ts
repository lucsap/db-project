import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "senha",
    }); //config
  }

  async validate(email: string, senha: string): Promise<any> {
    const user = await this.authService.validateUser(email, senha);

    if (!user) {
      throw new UnauthorizedException("Usuário ou senha inválidos");
    }

    try {
      return user;
    } catch (error) {
      console.error("Erro ao validar usuário", error);
      throw new UnauthorizedException("Usuário ou senha inválidos");
    }
  }
}
