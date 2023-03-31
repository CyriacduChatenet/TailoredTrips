import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiLimitResourceQuery } from '@travel-tailor/types'
import { Repository } from 'typeorm'

import { CreateAdvertiserDto } from './dto/create-advertiser.dto'
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto'
import { Advertiser } from './entities/advertiser.entity'

@Injectable()
export class AdvertiserService {
  constructor(
    @InjectRepository(Advertiser)
    private advertiserRepository: Repository<Advertiser>,
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto) {
    try {
      const advertiser = this.advertiserRepository.create(createAdvertiserDto)

      return await this.advertiserRepository.save(advertiser)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries?: ApiLimitResourceQuery) {
    try {
      let { page, limit } = queries
      page = page ? +page : 1
      limit = limit ? +limit : 10

      return await this.advertiserRepository
        .createQueryBuilder('advertiser')
        .leftJoinAndSelect('advertiser.activities', 'activities')
        .leftJoinAndSelect('advertiser.user', 'user')
        .orderBy('advertiser.createdAt', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.advertiserRepository
        .createQueryBuilder('advertiser')
        .where('advertiser.id = :id', { id })
        .leftJoinAndSelect('advertiser.activities', 'activities')
        .leftJoinAndSelect('advertiser.user', 'user')
        .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    try {
      return await this.advertiserRepository.update(id, updateAdvertiserDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.advertiserRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
