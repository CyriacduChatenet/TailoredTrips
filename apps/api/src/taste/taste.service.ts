import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { Taste } from './entities/taste.entity';

@Injectable()
export class TasteService {
  constructor(
    @InjectRepository(Taste) private tasteRepository: Repository<Taste>,
  ) {}

  async create(createTasteDto: CreateTasteDto) {
    return this.tasteRepository.save(createTasteDto);
  }

  async findAll() {
    return this.tasteRepository.find({
      relations: {
        traveler: true,
      },
    });
  }

  async findOne(id: string) {
    return this.tasteRepository.findOne({
      where: { id },
      relations: {
        traveler: true,
      },
    });
  }

  async update(id: string, updateTasteDto: UpdateTasteDto) {
    return this.tasteRepository.update(id, updateTasteDto);
  }

  async remove(id: string) {
    return this.tasteRepository.softDelete(id);
  }
}
