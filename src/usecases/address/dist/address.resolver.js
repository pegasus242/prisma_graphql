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
exports.AddressResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var address_1 = require("../../entities/address/address");
var ctx_user_decorator_1 = require("../auth/decorators/ctx-user.decorator");
var gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
var AddressResolver = /** @class */ (function () {
    function AddressResolver(service) {
        this.service = service;
    }
    AddressResolver.prototype.Addresses = function (user) {
        return this.service.addresses();
    };
    AddressResolver.prototype.getAddress = function (user) {
        return this.service.getAddress(user);
    };
    AddressResolver.prototype.createAddress = function (user, input) {
        return this.service.createAddress(user, input);
    };
    AddressResolver.prototype.updateAddress = function (user, input) {
        return this.service.updateAddress(user, input);
    };
    AddressResolver.prototype.deleteAddress = function (user) {
        return this.service.deleteAddress(user);
    };
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
        graphql_1.Query(function () { return [address_1.Address]; }, { nullable: true }),
        __param(0, ctx_user_decorator_1.CtxUser())
    ], AddressResolver.prototype, "Addresses");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
        graphql_1.Query(function () { return address_1.Address; }, { nullable: true }),
        __param(0, ctx_user_decorator_1.CtxUser())
    ], AddressResolver.prototype, "getAddress");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
        graphql_1.Mutation(function () { return address_1.Address; }, { nullable: true }),
        __param(0, ctx_user_decorator_1.CtxUser()), __param(1, graphql_1.Args('input'))
    ], AddressResolver.prototype, "createAddress");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
        graphql_1.Mutation(function () { return address_1.Address; }, { nullable: true }),
        __param(0, ctx_user_decorator_1.CtxUser()), __param(1, graphql_1.Args('input'))
    ], AddressResolver.prototype, "updateAddress");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
        graphql_1.Mutation(function () { return Boolean; }, { nullable: true }),
        __param(0, ctx_user_decorator_1.CtxUser())
    ], AddressResolver.prototype, "deleteAddress");
    AddressResolver = __decorate([
        graphql_1.Resolver()
    ], AddressResolver);
    return AddressResolver;
}());
exports.AddressResolver = AddressResolver;
