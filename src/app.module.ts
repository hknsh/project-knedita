import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { PostModule } from "./post/post.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
