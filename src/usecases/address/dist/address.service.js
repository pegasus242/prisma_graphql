"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.AddressService = void 0;
var common_1 = require("@nestjs/common");
var dotenv = require("dotenv");
dotenv.config();
var AddressService = /** @class */ (function () {
    //Get Addresss 
    function AddressService(data) {
        this.data = data;
        this.addressIncludes = {
            user: true
        };
    }
    AddressService.prototype.addresses = function () {
        return this.data.address.findMany({ include: this.addressIncludes });
    };
    //Get Address by id
    AddressService.prototype.getAddress = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.data.address.findUnique({
                            where: { userId: user.id },
                            include: this.addressIncludes
                        })];
                    case 1:
                        address = _a.sent();
                        console.log(address);
                        //If no address found, return exception
                        if (!address) {
                            throw new common_1.NotFoundException("Address not found!");
                        }
                        return [2 /*return*/, address];
                }
            });
        });
    };
    //Create Address by id
    AddressService.prototype.createAddress = function (user, input) {
        return __awaiter(this, void 0, Promise, function () {
            var found, created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.data.address.findUnique({
                            where: { userId: user.id },
                            include: this.addressIncludes
                        })];
                    case 1:
                        found = _a.sent();
                        if (found) {
                            throw new common_1.BadRequestException("Address already exists!");
                        }
                        created = this.data.address.create({
                            data: __assign(__assign({}, input), { user: { connect: { id: user.id } } })
                        });
                        return [2 /*return*/, created];
                }
            });
        });
    };
    //Update Address by id
    AddressService.prototype.updateAddress = function (user, input) {
        return __awaiter(this, void 0, Promise, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.data.address.findUnique({
                            where: { userId: user.id },
                            include: this.addressIncludes
                        })];
                    case 1:
                        address = _a.sent();
                        return [2 /*return*/, this.data.address.update({
                                where: { id: address.id },
                                data: __assign({}, input)
                            })];
                }
            });
        });
    };
    //Delete Address
    AddressService.prototype.deleteAddress = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var address, deleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.data.address.findUnique({
                            where: { userId: user.id },
                            include: this.addressIncludes
                        })];
                    case 1:
                        address = _a.sent();
                        return [4 /*yield*/, this.data.address["delete"]({
                                where: {
                                    id: address.id
                                }
                            })];
                    case 2:
                        deleted = _a.sent();
                        return [2 /*return*/, !!deleted];
                }
            });
        });
    };
    AddressService = __decorate([
        common_1.Injectable()
    ], AddressService);
    return AddressService;
}());
exports.AddressService = AddressService;
