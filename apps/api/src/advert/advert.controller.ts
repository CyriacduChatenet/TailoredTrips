import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';

@Controller('advert')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @Post()
  @Roles(Role.Advertiser)
  create(@Body() createAdvertDto: CreateAdvertDto) {
    return this.advertService.create(createAdvertDto);
  }

  @Get()
  findAll() {
    return this.advertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.Advertiser)
  update(@Param('id') id: string, @Body() updateAdvertDto: UpdateAdvertDto) {
    return this.advertService.update(id, updateAdvertDto);
  }

  @Delete(':id')
  @Roles(Role.Advertiser)
  remove(@Param('id') id: string) {
    return this.advertService.remove(id);
  }
}
