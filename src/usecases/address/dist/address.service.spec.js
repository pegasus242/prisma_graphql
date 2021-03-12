"use strict";
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
var uuid_1 = require("uuid");
var client_1 = require("@prisma/client");
var user_service_1 = require("../user/user.service");
var address_service_1 = require("./address.service");
var dotenv = require("dotenv");
dotenv.config();
var test_username = uuid_1.v4() + "@test.username";
var test_password = uuid_1.v4() + "@test.password";
function createuserifnotexists() {
    return __awaiter(this, void 0, Promise, function () {
        var found, new_user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            username: test_username
                        }
                    })];
                case 1:
                    found = _a.sent();
                    if (!found) return [3 /*break*/, 2];
                    return [2 /*return*/, found];
                case 2:
                    if (!!found) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                username: test_username,
                                password: test_password
                            }
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: {
                                username: test_username
                            }
                        })];
                case 4:
                    new_user = _a.sent();
                    return [2 /*return*/, new_user];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.TEST_DATABASE_URL
        }
    }
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var created_user, test_user, config, data, addressservice, new_address, updated_address;
        var _this = this;
        return __generator(this, function (_a) {
            beforeAll(function (done) {
                done();
            });
            afterAll(function (done) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prisma.$disconnect()];
                        case 1:
                            _a.sent();
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
            data = new user_service_1.UserService(config);
            addressservice = new address_service_1.AddressService(data);
            new_address = {
                addressLine1: uuid_1.v4() + "@test.line1address",
                addressLine2: uuid_1.v4() + "@test.line2address"
            };
            updated_address = {
                addressLine1: uuid_1.v4() + "@test.line1address",
                addressLine2: uuid_1.v4() + "@test.line2address"
            };
            describe("createAddressAction() - unit", function () {
                it("creates new address correctly", function () { return __awaiter(_this, void 0, void 0, function () {
                    var err_1, savedAddress;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, createuserifnotexists()];
                            case 1:
                                created_user = _a.sent();
                                test_user = {
                                    id: created_user.id,
                                    username: test_username,
                                    password: test_password
                                };
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                console.log(err_1.message);
                                return [3 /*break*/, 3];
                            case 3: return [4 /*yield*/, addressservice.createAddress(test_user, new_address)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, prisma.address.findMany({
                                        where: { addressLine1: new_address.addressLine1 },
                                        take: 1
                                    })];
                            case 5:
                                savedAddress = (_a.sent())[0];
                                expect(savedAddress.addressLine1).toBe(new_address.addressLine1);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("fails if tries to create records with the same user twice", function () { return __awaiter(_this, void 0, void 0, function () {
                    var err_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, createuserifnotexists()];
                            case 1:
                                created_user = _a.sent();
                                test_user = {
                                    id: created_user.id,
                                    username: test_username,
                                    password: test_password
                                };
                                return [3 /*break*/, 3];
                            case 2:
                                err_2 = _a.sent();
                                console.log(err_2.message);
                                return [3 /*break*/, 3];
                            case 3:
                                expect(function () { return addressservice.createAddress(test_user, new_address); }).rejects.toThrow("Address already exists!");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("gets the address correctly", function () { return __awaiter(_this, void 0, void 0, function () {
                    var err_3, received_address;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, createuserifnotexists()];
                            case 1:
                                created_user = _a.sent();
                                test_user = {
                                    id: created_user.id,
                                    username: test_username,
                                    password: test_password
                                };
                                return [3 /*break*/, 3];
                            case 2:
                                err_3 = _a.sent();
                                console.log(err_3.message);
                                return [3 /*break*/, 3];
                            case 3: return [4 /*yield*/, addressservice.getAddress(test_user)];
                            case 4:
                                received_address = _a.sent();
                                expect(received_address.addressLine1).toBe(new_address.addressLine1);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("updates new address correctly", function () { return __awaiter(_this, void 0, void 0, function () {
                    var err_4, updatedAddress;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, createuserifnotexists()];
                            case 1:
                                created_user = _a.sent();
                                test_user = {
                                    id: created_user.id,
                                    username: test_username,
                                    password: test_password
                                };
                                return [3 /*break*/, 3];
                            case 2:
                                err_4 = _a.sent();
                                console.log(err_4.message);
                                return [3 /*break*/, 3];
                            case 3: return [4 /*yield*/, addressservice.updateAddress(test_user, updated_address)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, prisma.address.findMany({
                                        where: { addressLine1: updated_address.addressLine1 },
                                        take: 1
                                    })];
                            case 5:
                                updatedAddress = (_a.sent())[0];
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deletes address correctly", function () { return __awaiter(_this, void 0, void 0, function () {
                    var err_5, deleted;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, createuserifnotexists()];
                            case 1:
                                created_user = _a.sent();
                                test_user = {
                                    id: created_user.id,
                                    username: test_username,
                                    password: test_password
                                };
                                return [3 /*break*/, 3];
                            case 2:
                                err_5 = _a.sent();
                                console.log(err_5.message);
                                return [3 /*break*/, 3];
                            case 3: return [4 /*yield*/, addressservice.deleteAddress(test_user)];
                            case 4:
                                deleted = _a.sent();
                                expect(deleted).toBe(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            return [2 /*return*/];
        });
    });
}
main()["catch"](function (e) {
    throw e;
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
