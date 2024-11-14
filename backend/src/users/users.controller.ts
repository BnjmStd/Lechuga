import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';
import { Response } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  /*
  
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MzE1OTE3NDEsImV4cCI6MTczMTY3ODE0MX0.hyQrj7BS2ZWQhRUafGTqvLYsD41grvCfpIG7Z5Kga8k

  */

  /* Crear Usuario */

  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {

      const userCreated = await this.usersService.create(createUserDto);

      if (!userCreated.success) return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: userCreated.message,
      });

      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'User created successfully',
        data: userCreated,
      });

    } catch (error) {

      console.log('Error al crear el usuario', error);
      
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An error occurred while trying to login.',
      });

    }
  }

  @Get()
  @UseGuards(
    JwtAuthGuard
  )
  async findAll(@Req() req: AuthenticatedRequest) {
    req.user
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userId = parseInt(id);
    console.log(userId)
    return this.usersService.findOne(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
