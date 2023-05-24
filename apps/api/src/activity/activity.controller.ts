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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ActivityQuery } from '@travel-tailor/types'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Role } from '../config/enum/role.enum'
import { Roles } from '../config/decorators/roles.decorator'
import { ActivityService } from './activity.service'
import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { User } from '../config/decorators/user.decorator'

@Controller('activity')
@UseGuards(ThrottlerGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @Throttle(10, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @UseInterceptors(FilesInterceptor('image'))
  create(@Body() createActivityDto: CreateActivityDto, @User() user, @UploadedFiles() files) {
    return this.activityService.create(createActivityDto, user, files)
  }

  @Get()
  @Throttle(10, 60)
  findAll(@Query() queries: ActivityQuery) {
    return this.activityService.findAll(queries)
  }

  @Get(':id')
  @Throttle(10, 60)
  findOneByName(@Param('id') id: string) {
    return this.activityService.findOne(id)
  }

  @Get('name/:slug')
  @Throttle(10, 60)
  findOne(@Param('slug') slug: string) {
    return this.activityService.findOneByName(slug)
  }

  @Get('/advertiser/:id')
  @Throttle(10, 60)
  async findAllByTraveler(@Param('id') advertiserId: string, @Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.activityService.findAllByAdvertiserId(advertiserId, page, limit);
  };

  @Patch(':id')
  @Throttle(10, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto
  ) {
    return this.activityService.update(id, updateActivityDto)
  }

  @Delete(':id')
  @Throttle(10, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityService.remove(id)
  }
}
