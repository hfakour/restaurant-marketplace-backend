import { UserEntity } from 'src/domain/entity/user.entity';

export class UserCacheMapper {
  static toCacheModel(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      imageUrl: user.imageUrl,
      role: user.role,
      password: user.password,
    };
  }

  static fromCacheModel(data: ReturnType<typeof this.toCacheModel>): UserEntity {
    const user = new UserEntity(data.email, data.password, data.role);
    user.id = data.id;
    user.fullName = data.fullName;
    user.phone = data.phone;
    user.imageUrl = data.imageUrl;
    return user;
  }
}
