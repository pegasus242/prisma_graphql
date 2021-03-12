"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Address = void 0;
//import { User } from '@beehive/auth'
var graphql_1 = require("@nestjs/graphql");
var Address = /** @class */ (function () {
    function Address() {
    }
    __decorate([
        graphql_1.Field({ nullable: true })
    ], Address.prototype, "id");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], Address.prototype, "addressLine1");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], Address.prototype, "addressLine2");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], Address.prototype, "user");
    Address = __decorate([
        graphql_1.ObjectType()
    ], Address);
    return Address;
}());
exports.Address = Address;
