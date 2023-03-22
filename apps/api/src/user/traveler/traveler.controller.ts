import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

import { TravelerService } from './traveler.service';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDTO } from './dto/update-traveler.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/decorators/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

@Controller('traveler')
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}

  @Post()
  async create(@Body() createTravelerDto: CreateTravelerDto) {
    return await this.travelerService.create(createTravelerDto);
  }

  @Get()
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.travelerService.findAll(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelerService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateTravelerDto: UpdateTravelerDTO,
  ) {
    return await this.travelerService.update(id, updateTravelerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.travelerService.remove(id);
  }
}
