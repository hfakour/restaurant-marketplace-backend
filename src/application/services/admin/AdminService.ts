// src/application/admin/admin.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { IAdminRepository } from 'src/domain/repository/admin.repository.interface';
import { Admin } from 'src/domain/entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepo: IAdminRepository,
  ) {}

  async create(dto: CreateAdminDto): Promise<Admin> {
    const existing = await this.adminRepo.findByEmail(dto.email);
    if (existing) throw new Error('Email is already taken');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const admin = new Admin(dto.email, hashedPassword, dto.role);
    admin.fullName = dto.fullName;
    admin.phone = dto.phone;
    admin.imageUrl = dto.imageUrl;

    await this.adminRepo.create(admin);
    return admin;
  }

  async getById(id: Admin['id']): Promise<Admin | null> {
    return this.adminRepo.findById(id);
  }

  async getByEmail(email: Admin['email']): Promise<Admin | null> {
    return this.adminRepo.findByEmail(email);
  }

  async update(id: Admin['id'], dto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminRepo.findById(id);
    if (!admin) throw new Error('Admin not found');

    if (dto.password !== undefined) {
      admin.password = await bcrypt.hash(dto.password, 10);
    }
    if (dto.fullName !== undefined) admin.fullName = dto.fullName;
    if (dto.phone !== undefined) admin.phone = dto.phone;
    if (dto.imageUrl !== undefined) admin.imageUrl = dto.imageUrl;

    await this.adminRepo.update(admin);
    return admin;
  }

  async delete(id: Admin['id']): Promise<void> {
    const admin = await this.adminRepo.findById(id);
    if (!admin) throw new Error('Admin not found');

    await this.adminRepo.delete(id);
  }
}
