import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  findAll(query: PaginateQuery): Promise<Paginated<Patient>> {
    return paginate(query, this.patientRepository, {
      sortableColumns: [
        'id',
        'name',
        'email',
        'dob',
        'phone',
        'gender',
        'status',
      ],
      searchableColumns: ['name', 'email', 'dob', 'phone'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        dob: [FilterOperator.GTE, FilterOperator.LTE, FilterOperator.BTW],
        name: [FilterOperator.EQ],
        email: [FilterOperator.EQ],
        phone: [FilterOperator.EQ],
        gender: [FilterOperator.EQ, FilterOperator.IN],
        status: [FilterOperator.EQ, FilterOperator.IN],
      },
    });
  }

  async findOne(id: number) {
    const patient = await this.patientRepository.findOne({ where: { id } });

    if (!patient) {
      throw new NotFoundException(`Patient with ID "${id}" not found`);
    }
    return patient;
  }

  create(createPatientDto: CreatePatientDto) {
    const patient = this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(patient);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepository.preload({
      id,
      ...updatePatientDto,
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID "${id}" not found`);
    }
    return this.patientRepository.save(patient);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    return this.patientRepository.remove(patient);
  }
}
