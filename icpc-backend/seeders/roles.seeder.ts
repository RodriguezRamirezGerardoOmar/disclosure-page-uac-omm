import { DataSource } from 'typeorm';
import { Role } from '../src/roles/entities/role.entity';
import { RoleEnum } from '../src/common/enums/role.enum';

export const seedRole = async (dataSource: DataSource) => {
  const roleRepository = dataSource.getRepository(Role);

  const roles = [
    { role: RoleEnum.ADMIN },
    { role: RoleEnum.USER },
  ];

  for (const roleData of roles) {
    const existingRole = await roleRepository.findOne({ where: { role: roleData.role } });
    if (!existingRole) {
      const role = roleRepository.create(roleData);
      await roleRepository.save(role);
    }
  }

  console.log('Roles agregados correctamente');
};