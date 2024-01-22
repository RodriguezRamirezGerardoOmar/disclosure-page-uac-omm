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
exports.__esModule = true;
exports.CategoriesController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var CategoriesController = /** @class */ (function () {
    function CategoriesController(categoriesService) {
        this.categoriesService = categoriesService;
    }
    CategoriesController.prototype.create = function (createCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    };
    CategoriesController.prototype.findAll = function () {
        return this.categoriesService.findAll();
    };
    CategoriesController.prototype.findOne = function (id) {
        return this.categoriesService.findOne(+id);
    };
    CategoriesController.prototype.update = function (id, updateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
    };
    CategoriesController.prototype.remove = function (id) {
        return this.categoriesService.remove(+id);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], CategoriesController.prototype, "create");
    __decorate([
        common_1.Get()
    ], CategoriesController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], CategoriesController.prototype, "findOne");
    __decorate([
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body())
    ], CategoriesController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], CategoriesController.prototype, "remove");
    CategoriesController = __decorate([
        common_1.Controller('categories'),
        swagger_1.ApiTags('Categories')
    ], CategoriesController);
    return CategoriesController;
}());
exports.CategoriesController = CategoriesController;
