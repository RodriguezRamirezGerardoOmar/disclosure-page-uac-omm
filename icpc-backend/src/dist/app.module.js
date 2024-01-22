"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var users_module_1 = require("./users/users.module");
var typeorm_1 = require("@nestjs/typeorm");
var auth_module_1 = require("./auth/auth.module");
var roles_module_1 = require("./roles/roles.module");
var shopping_cart_module_1 = require("./shopping-cart/shopping-cart.module");
var products_module_1 = require("./products/products.module");
var comments_module_1 = require("./comments/comments.module");
var orders_module_1 = require("./orders/orders.module");
var cart_items_module_1 = require("./cart-items/cart-items.module");
var categories_module_1 = require("./categories/categories.module");
var AppModule = /** @class */ (function () {
    function AppModule(dataSource) {
        this.dataSource = dataSource;
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: 'root',
                    database: 'e-commerce',
                    synchronize: true,
                    autoLoadEntities: true
                }),
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                roles_module_1.RolesModule,
                shopping_cart_module_1.ShoppingCartModule,
                products_module_1.ProductsModule,
                comments_module_1.CommentsModule,
                orders_module_1.OrdersModule,
                cart_items_module_1.CartItemsModule,
                categories_module_1.CategoriesModule
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
