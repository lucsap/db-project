import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Logado com sucesso' })
  @ApiBody({
    schema: {
      example: {
        email: 'fino@email.com',
        senha: 'senha'
      }
    }
  })
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

}
