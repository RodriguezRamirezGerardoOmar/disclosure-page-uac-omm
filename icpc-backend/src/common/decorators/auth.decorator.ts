import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles/roles.guard';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Roles } from './roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(role: RoleEnum) {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth()
  );
}
