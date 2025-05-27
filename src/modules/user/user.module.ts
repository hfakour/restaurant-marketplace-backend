import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserResolver } from './resolvers/user.resolver';
import { MikroUserRepository } from '../../infrastructure/database/user/mikro-user.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../../domain/user/entities/user.entity';
import { USER_REPOSITORY } from 'src/domain/user/repository/user.repository.interface'; // ✅ import the token

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,

    // ✅ Token binding
    {
      provide: USER_REPOSITORY,
      useClass: MikroUserRepository,
    },
  ],
  exports: [USER_REPOSITORY], // Optional: export for use in other modules
})
export class UserModule {}
