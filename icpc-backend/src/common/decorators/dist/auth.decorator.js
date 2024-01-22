"use strict";
exports.__esModule = true;
exports.Auth = void 0;
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("src/auth/guard/auth.guard");
var roles_guard_1 = require("src/auth/guard/roles/roles.guard");
var roles_decorator_1 = require("./roles.decorator");
function Auth(role) {
    return common_1.applyDecorators(roles_decorator_1.Roles(role), common_1.UseGuards(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard));
}
exports.Auth = Auth;
