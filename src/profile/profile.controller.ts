// import {
//   Controller,
//   Get,
//   Patch,
//   Body,
//   UseGuards,
//   Req,
//   Post,
//   Param,
// } from '@nestjs/common';
// import { ProfileService } from './profile.service';
// import { UpdateProfileDto } from './dto/update-profile';

// @Controller('profile')
// export class ProfileController {
//   constructor(private readonly profileService: ProfileService) {}

//   @Post()
//   createProfile(@Body() dto: UpdateProfileDto) {
//     return this.profileService.createProfile(dto);
//   }

//   // ✅ GET PROFILE BY ID
//   @Get(':id')
//   getProfile(@Param('id') id: string) {
//     return this.profileService.getProfile(id);
//   }

//   // ✅ UPDATE PROFILE BY ID
//   @Patch(':id')
//   updateProfile(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
//     return this.profileService.updateProfile(id, dto);
//   }
// }

import {
  Controller,
  Put,
  Body,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateProfileDto } from "./dto/update-profile";
import { JwtAuthGuard } from "src/users/guards/jwt-auth.guard";

@Controller("profile")
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly accountService: ProfileService) {}

  @Put()
  updateAccount(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.accountService.upsertAccount(req.user.userId, dto);
  }
}