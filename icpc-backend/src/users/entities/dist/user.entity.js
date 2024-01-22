"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../../entities/base.entity");
var role_entity_1 = require("../../roles/entities/role.entity");
var shopping_cart_entity_1 = require("../../shopping-cart/entities/shopping-cart.entity");
var order_entity_1 = require("src/orders/entities/order.entity");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "name");
    __decorate([
        typeorm_1.Column({ unique: true, nullable: false })
    ], User.prototype, "username");
    __decorate([
        typeorm_1.Column({ unique: true, nullable: false })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ nullable: false })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.ManyToOne(function () { return role_entity_1.Role; }, function (role) { return role.users; })
    ], User.prototype, "role");
    __decorate([
        typeorm_1.OneToMany(function () { return shopping_cart_entity_1.ShoppingCart; }, function (shoppingCart) { return shoppingCart.user; })
    ], User.prototype, "shoppingCart");
    __decorate([
        typeorm_1.OneToMany(function () { return order_entity_1.Order; }, function (order) { return order.user; })
    ], User.prototype, "order");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(base_entity_1.BaseEntity));
exports.User = User;
