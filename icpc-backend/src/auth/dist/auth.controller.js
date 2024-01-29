"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var role_enum_1 = require("../common/enums/role.enum");
var create_user_dto_1 = require("../users/dto/create-user.dto");
var auth_decorator_1 = require("src/common/decorators/auth.decorator");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
    }
    AuthController.prototype.login = function (loginDto) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.login(loginDto)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.OK,
                                message: 'Login successful',
                                data: {
                                    user: response.user,
                                    token: response.token
                                }
                            }];
                }
            });
        });
    };
    AuthController.prototype.register = function (registerDto) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(registerDto);
                        return [4 /*yield*/, this.authService.register(registerDto)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.CREATED,
                                message: 'User has been successfully created',
                                data: {
                                    id: response.id,
                                    username: response.username,
                                    email: response.email,
                                    role: {
                                        id: response.role.id,
                                        name: response.role.name
                                    }
                                }
                            }];
                }
            });
        });
    };
    AuthController.prototype.profile = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.profile(req.user)];
                    case 1:
                        userData = _a.sent();
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.OK,
                                message: 'User profile',
                                data: {
                                    id: userData.id,
                                    username: userData.username,
                                    email: userData.email,
                                    role: userData.role.role
                                }
                            }];
                }
            });
        });
    };
    __decorate([
        common_1.Post('login'),
        swagger_1.ApiResponse({
            status: 200,
            description: 'Login successful'
        }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "login");
    __decorate([
        common_1.Post('register'),
        swagger_1.ApiCreatedResponse({
            status: common_1.HttpStatus.CREATED,
            description: 'The user has been successfully created.',
            type: create_user_dto_1.CreateUserResponseDto
        }),
        swagger_1.ApiResponse({ status: 400, description: 'Bad request' }),
        swagger_1.ApiResponse({ status: 409, description: 'User already exists' }),
        swagger_1.ApiResponse({
            status: 500,
            description: 'Internal server error',
            type: Error
        }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "register");
    __decorate([
        common_1.Get('profile'),
        auth_decorator_1.Auth(role_enum_1.RoleEnum.USER),
        swagger_1.ApiResponse({
            status: 200,
            description: 'User profile',
            type: create_user_dto_1.CreateUserResponseDto
        }),
        swagger_1.ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        __param(0, common_1.Req())
    ], AuthController.prototype, "profile");
    AuthController = __decorate([
        common_1.Controller('auth'),
        swagger_1.ApiTags('Auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
