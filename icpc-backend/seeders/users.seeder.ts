import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { Role } from '../src/roles/entities/role.entity';
import { RoleEnum } from '../src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';

export const seedUser = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);

  // Find the admin role
  const adminRole = await roleRepository.findOne({ where: { role: RoleEnum.ADMIN } });
  if (!adminRole) {
    console.error('Admin role not found. Please seed roles first.');
    return;
  }

  const users = [
    {
      name: 'Academia',
      lastName: 'ITS',
      userName: 'AcademiaITS',
      email: 'pendiente@consultar.com',
      password: 'pendiente',
      passwordVerify: 'pendiente',
      isAdmin: true,
      role: adminRole,
    },
  ];

  for (const userData of users) {
    const existingUser = await userRepository.findOne({ where: { userName: userData.userName } });
    if (!existingUser) {
      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      await userRepository.save(user);
    }
  }

  console.log('Usuarios agregados correctamente');
};