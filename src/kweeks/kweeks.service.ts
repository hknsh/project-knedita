import { Injectable } from '@nestjs/common';
import { CreateKweekDto } from './dto/create-kweek.dto';
import { UpdateKweekDto } from './dto/update-kweek.dto';

@Injectable()
export class KweeksService {
  create(createKweekDto: CreateKweekDto) {
    return 'This action adds a new kweek';
  }

  findAll() {
    return `This action returns all kweeks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kweek`;
  }

  update(id: number, updateKweekDto: UpdateKweekDto) {
    return `This action updates a #${id} kweek`;
  }

  remove(id: number) {
    return `This action removes a #${id} kweek`;
  }
}
