import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Patient } from './entities/patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return {
      data: this.patientsService.create(createPatientDto),
    };
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Patient>> {
    return this.patientsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      data: this.patientsService.findOne(+id),
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return {
      data: this.patientsService.update(+id, updatePatientDto),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      data: this.patientsService.remove(+id),
    };
  }
}
