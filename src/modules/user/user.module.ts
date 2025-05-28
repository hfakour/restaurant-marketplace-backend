import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/domain/user/entities/user.entity';
import { UserRepository } from 'src/infrastructure/database/user.repository.impl';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository], // Allow other modules to use it
})
export class UserInfrastructureModule {}
