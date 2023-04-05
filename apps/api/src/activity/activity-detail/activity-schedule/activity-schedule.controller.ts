import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { Role } from '../../../config/enum/role.enum';
import { Roles } from '../../../config/decorators/roles.decorator';
import { ActivityScheduleService } from './activity-schedule.service';
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto';
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto';

@Controller('activity-schedule')
export class ActivityScheduleController {
  constructor(
    private readonly activityScheduleService: ActivityScheduleService,
  ) {}

  @Post()
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  create(@Body() createActivityScheduleDto: CreateActivityScheduleDto) {
    return this.activityScheduleService.create(createActivityScheduleDto);
  }

  @Get()
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityScheduleService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityScheduleService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityScheduleDto: UpdateActivityScheduleDto,
  ) {
    return this.activityScheduleService.update(id, updateActivityScheduleDto);
  }

  @Delete(':id')
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityScheduleService.remove(id);
  }
}
