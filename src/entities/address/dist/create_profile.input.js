"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateProfileInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var CreateProfileInput = /** @class */ (function () {
    function CreateProfileInput() {
    }
    __decorate([
        graphql_1.Field()
    ], CreateProfileInput.prototype, "Email");
    __decorate([
        graphql_1.Field()
    ], CreateProfileInput.prototype, "firstname");
    __decorate([
        graphql_1.Field()
    ], CreateProfileInput.prototype, "lastname");
    __decorate([
        graphql_1.Field()
    ], CreateProfileInput.prototype, "phonenumber");
    CreateProfileInput = __decorate([
        graphql_1.InputType()
    ], CreateProfileInput);
    return CreateProfileInput;
}());
exports.CreateProfileInput = CreateProfileInput;
