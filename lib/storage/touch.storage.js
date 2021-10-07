var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { SecureStorage } from "@ionic-native/secure-storage/ngx";
import { TOUCH_ANDROID_ERRORS, TOUCH_CONSTANTS } from "../constants/touch.constants";
var TouchSecureStorage = /** @class */ (function () {
    function TouchSecureStorage(storage) {
        this.storage = storage;
    }
    TouchSecureStorage.prototype.init = function () {
        return this.storage.create(TOUCH_CONSTANTS.storageKey);
    };
    TouchSecureStorage.prototype.saveCredentials = function (encryptedCredentials) {
        return this.init()
            .then(function (storageInstance) { return storageInstance.set(TOUCH_CONSTANTS.storedKey, encryptedCredentials.toString()); });
    };
    TouchSecureStorage.prototype.saveAndroidKey = function (key) {
        return this.init()
            .then(function (storageInstance) { return storageInstance.set(TOUCH_CONSTANTS.androidTokenKey, key.toString()); });
    };
    TouchSecureStorage.prototype.getCredentials = function () {
        return this.init()
            .then(function (storageInstance) { return storageInstance.get(TOUCH_CONSTANTS.storedKey); })
            .then(function (encryptedCredentials) { return encryptedCredentials; });
    };
    TouchSecureStorage.prototype.getAndroidKey = function () {
        return this.init()
            .then(function (storageInstance) { return storageInstance.get(TOUCH_CONSTANTS.androidTokenKey); })
            .then(function (encryptedToken) { return encryptedToken; })
            .catch(function () {
            throw TOUCH_ANDROID_ERRORS.ANDROID_KEY_NOT_FOUND.key;
        });
    };
    TouchSecureStorage = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SecureStorage])
    ], TouchSecureStorage);
    return TouchSecureStorage;
}());
export { TouchSecureStorage };
//# sourceMappingURL=touch.storage.js.map