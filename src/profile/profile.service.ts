// import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model, Types } from "mongoose";
// import { User } from "src/users/schema/userschema";
// import { UpdateProfileDto } from "./dto/update-profile";

// @Injectable()
// export class ProfileService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<User>
//   ) {}

//   // ✅ CREATE
//   async createProfile(dto: UpdateProfileDto) {
//     try {
//       const newUser = await this.userModel.create(dto);

//       return {
//         message: "Profile created successfully",
//         user: newUser,
//       };
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

//   // ✅ GET
//   async getProfile(userId: string) {
//     // 🔥 Prevent crash
//     if (!Types.ObjectId.isValid(userId)) {
//       throw new BadRequestException("Invalid user ID");
//     }

//     const user = await this.userModel
//       .findById(userId)
//       .select("-password");

//     if (!user) throw new NotFoundException("User not found");

//     return user;
//   }

//   // ✅ UPDATE
//   async updateProfile(userId: string, dto: UpdateProfileDto) {
//     if (!Types.ObjectId.isValid(userId)) {
//       throw new BadRequestException("Invalid user ID");
//     }

//     const user = await this.userModel.findByIdAndUpdate(
//       userId,
//       { $set: dto },
//       { new: true }
//     );

//     if (!user) throw new NotFoundException("User not found");

//     return {
//       message: "Profile updated",
//       user,
//     };
//   }
// }

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/userschema';
import { UpdateProfileDto } from './dto/update-profile';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async upsertAccount(userId: string, dto: UpdateProfileDto) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // 🔥 UPSERT (update existing user profile fields)
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
          },
        },
        { new: true, runValidators: true },
      );

      return {
        message: 'Profile updated successfully',
        user: updatedUser,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
