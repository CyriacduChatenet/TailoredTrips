import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ActivityTagQuery } from '@travel-tailor/types';

import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';
import { ActivityTagService } from './activity-tag.service';
import { CreateActivityTagDto } from './dto/create-activity-tag.dto';
import { UpdateActivityTagDto } from './dto/update-activity-tag.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('activity-tag')
@UseGuards(ThrottlerGuard)
@ApiTags('Activity Tag')
export class ActivityTagController {
  constructor(private readonly activityTagService: ActivityTagService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an activity tag' })
  @ApiCreatedResponse({ description: 'Activity tag created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to create activity tag' })
  async create(@Body() createActivityTagDto: CreateActivityTagDto) {
    return this.activityTagService.create(createActivityTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity tags' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'List of activity tags not found' })
  async findAll(@Query() queries: ActivityTagQuery) {
    return this.activityTagService.findAll(queries);
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get an activity tag by name' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'Activity tag not found' })
  async findOne(@Param('name') name: string) {
    return this.activityTagService.findOne(name);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an activity tag' })
  @ApiOkResponse({ description: 'Activity tag updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update activity tag' })
  async update(@Param('id') id: string, @Body() updateActivityTagDto: UpdateActivityTagDto) {
    return this.activityTagService.update(id, updateActivityTagDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an activity tag' })
  @ApiOkResponse({ description: 'Activity tag deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete activity tag' })
  async remove(@Param('id') id: string) {
    return this.activityTagService.remove(id);
  }
}
