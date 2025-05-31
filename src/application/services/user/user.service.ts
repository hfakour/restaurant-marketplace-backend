import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from 'src/domain/repository/user.repository.interface';
import { User } from 'src/domain/entities/user.entity';
import { UserRole } from 'src/domain/entities/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  // 👤 Create a new user account
  async create(dto: CreateUserDto): Promise<User> {
    const emailTaken = await this.userRepo.existsByEmail(dto.email);
    if (emailTaken) throw new Error('Email is already in use');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new User(dto.email, hashedPassword, dto.role); // Assumes dto.role is already typed as UserRole

    // ✅ Optional fields assignment
    user.fullName = dto.fullName;
    user.phone = dto.phone;
    user.imageUrl = dto.imageUrl;

    await this.userRepo.create(user);
    return user;
  }

  // 🔍 Find a user by ID
  async getById(id: User['id']): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  // 📬 Find a user by email
  async getByEmail(email: User['email']): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  // 📃 Get all users
  async getAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  // 🎯 Get users by role
  async getByRole(role: UserRole): Promise<User[]> {
    return this.userRepo.findByRole(role);
  }

  // 🛠️ Update an existing user
  async update(id: User['id'], dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error('User not found');

    // ✅ Conditionally patch properties
    if (dto.fullName !== undefined) user.fullName = dto.fullName;
    if (dto.phone !== undefined) user.phone = dto.phone;
    if (dto.imageUrl !== undefined) user.imageUrl = dto.imageUrl;

    // ✅ Secure password update
    if (dto.password !== undefined) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    await this.userRepo.update(user);
    return user;
  }

  // ❌ Delete a user by ID
  async delete(id: User['id']): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error('User not found');

    await this.userRepo.delete(id);
  }
}
