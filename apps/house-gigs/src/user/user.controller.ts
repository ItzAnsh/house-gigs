import { Body, Controller, HttpCode } from '@nestjs/common';
import { Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { HttpException } from '@nestjs/common';
import { UserCreationDto } from '../DTO/user.dto';
import { sendEmail } from '../utils/sendEmail';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserLoginResponse } from '../types';
// import dotenv from "dotenv";
// dotenv.config();

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Find all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Find Id
  @Get('/id/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  // Create a user
  @Post('create')
  async create(@Body() user: User): Promise<void> {
    await this.userService.create(user);
  }

  // Remove all users
  @Get('deleteAll')
  async removeAll(): Promise<void> {
    await this.userService.removeAll();
    console.log('removed all');
    throw new HttpException('Deleted all users', 200);
  }

  // Remove a user
  @Get('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
    console.log('removed');
    throw new HttpException('Deleted user', 200);
  }

  // Register Functions
  @Post('register')
  async register(@Body() user: User): Promise<void> {
    try {
      const foundUser = await this.userService.findEmail(user.email);
      console.log(foundUser);

      try {
        UserCreationDto.parse(user);
      } catch (e) {}

      if (foundUser) {
        throw new HttpErrorByCode[400]('User already exists');
      }

      const createdUser: User = await this.userService.create(user);
      console.log(createdUser);

      const generateHashToken = jwt.sign(
        { id: createdUser.id },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        },
      );

      sendEmail(user.email, 'Welcome to House Gigs', generateHashToken);
      return;

    } catch (e) {
      console.log('error creating user:\n', e);
      throw new HttpErrorByCode[400]('Bad request');
    }
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() user: { email: string; password: string },
  ): Promise<UserLoginResponse> {
    const foundUser = await this.userService.findEmail(user.email);

    if (!foundUser) {
      throw new HttpErrorByCode[404]('User not found');
    }

    if (!foundUser.isVerified) {
      throw new HttpErrorByCode[401]('User not verified');
    }

    // console.log(await bcrypt.compare(user.password, foundUser.password))
    if (!await bcrypt.compare(user.password, foundUser.password)) {
      throw new HttpErrorByCode[401]('Password incorrect');
    }

    return {
      email: foundUser.email,
      token: jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1w',
      }),
      name: foundUser.name,
      role: foundUser.role == "gigster" ? 200 : 203,
    };
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const foundUser = await this.userService.findOne(decoded.id);

    if (!foundUser) {
      throw new HttpErrorByCode[404]('User not found');
    }

    // foundUser.isVerified = true;
    // await this.userService.(foundUser);
    await this.userService.verify(foundUser.id);
    return { message: 'User verified' };
  }

  // Bad Response Test
  @Get('badResponse')
  async badResponse() {
    // console.log('gor');
    throw new HttpErrorByCode[404]('Bad response');
  }
}
