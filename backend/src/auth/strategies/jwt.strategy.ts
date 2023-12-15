import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中获取token
      ignoreExpiration: false, // 不忽略过期时间
      secretOrKey: process.env.JWT_SECRET, // 密钥
    });
  }

  async validate(payload: JwtPayloadDto) {
    return payload;
  }
}
