import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";


export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中获取token
      ignoreExpiration: false, // 不忽略过期时间
      secretOrKey: process.env.JWT_SECRET, // 密钥
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email }
  }
}
