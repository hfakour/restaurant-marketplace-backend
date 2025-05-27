import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../../domain/user/entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/user/repository/user.repository.interface';

@Injectable()
export class UserService {
  // ✅ Inject IUserRepository with a DI token
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepository,
  ) {}

  // ✅ Create a new user instance and persist it
  async create(data: CreateUserDto): Promise<User> {
    const newUser = new User(data.email, data.password, data.role); // 👈 Class-safe constructor
    const createdUser = await this.userRepo.create(newUser); // 👈 Await result
    return createdUser; // ✅ Cast to User to satisfy return type
  }

  // ✅ Get all users
  async findAll(): Promise<User[]> {
    const users = await this.userRepo.findAll();
    return users; // ✅ Ensure array type
  }

  // ✅ Find a user by ID or return null
  async findById(id: string): Promise<User | null> {
    const user = await this.userRepo.findById(id);
    return user; // ✅ Cast explicitly
  }

  // ✅ Update user fields only if present in DTO
  async update(id: string, data: UpdateUserDto): Promise<User> {
    const found = await this.userRepo.findById(id);
    if (!found) throw new NotFoundException('User not found'); // ✅ Better error type

    const user = found; // ✅ Ensure user is typed

    // Only update if values exist
    if (data.password) user.password = data.password;
    if (data.role) user.role = data.role;

    const updated = await this.userRepo.update(user);
    return updated; // ✅ Cast to User
  }

  // ✅ Delete user by ID
  async delete(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
