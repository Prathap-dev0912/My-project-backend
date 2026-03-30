import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UsersModule } from "../users/users.module";
import { ProfileController } from "./profile.controller";

@Module({
  imports: [UsersModule], // 👈 instead of forFeature
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}