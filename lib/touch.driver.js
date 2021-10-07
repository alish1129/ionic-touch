var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IosTouch } from "./devices/ios/ios.touch";
import { AndroidTouch } from "./devices/android/android.touch";
import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import { TOUCH_CONSTANTS } from "./constants/touch.constants";
import * as CryptoJS from "crypto-js";
import { TouchSecureStorage } from "./storage/touch.storage";
import { ErrorHandler } from "./handlers/error.handler";
var TouchDriver = /** @class */ (function () {
    function TouchDriver(iosTouch, androidTouch, platform, storage) {
        this.iosTouch = iosTouch;
        this.androidTouch = androidTouch;
        this.storage = storage;
        this.isIOS = platform.is('ios');
    }
    TouchDriver.prototype.isAvailable = function () {
        return this.isIOS ? this.iosTouch.isAvailable() : this.androidTouch.isAvailable();
    };
    TouchDriver.prototype.save = function (username, password) {
        var _this = this;
        if (this.isIOS) {
            return this.iosTouch.setTouchSetting(TOUCH_CONSTANTS.iosVerifyMessage)
                .then(function () { return _this.encryptCredentialsAndSave({ user: username, pass: password }); })
                .catch(function (error) {
                throw ErrorHandler.iosErrorHandler(error);
            });
        }
        else {
            return this.androidTouch.setTouchSetting(TOUCH_CONSTANTS.androidClientId)
                .then(function (response) { return _this.encryptTokenAndSave(response.token); })
                .then(function () { return _this.encryptCredentialsAndSave({ user: username, pass: password }); })
                .catch(function (error) {
                throw ErrorHandler.androidErrorHandler(error);
            });
        }
    };
    TouchDriver.prototype.retrieve = function () {
        var _this = this;
        if (this.isIOS) {
            return this.iosTouch.getTouchSetting(TOUCH_CONSTANTS.iosVerifyMessage)
                .then(function () { return _this.storage.getCredentials(); })
                .then(function (encryptedCredentials) { return _this.decryptObject(encryptedCredentials, TOUCH_CONSTANTS.passKey); })
                .catch(function (error) {
                throw ErrorHandler.iosErrorHandler(error);
            });
        }
        else {
            return this.storage.getAndroidKey()
                .then(function (encryptedToken) { return _this.decryptString(encryptedToken, TOUCH_CONSTANTS.androidTokenKey); })
                .then(function (token) { return _this.androidTouch.getTouchSetting(TOUCH_CONSTANTS.androidClientId, token); })
                .then(function () { return _this.storage.getCredentials(); })
                .then(function (encryptedCredentials) { return _this.decryptObject(encryptedCredentials, TOUCH_CONSTANTS.passKey); })
                .catch(function (error) {
                throw ErrorHandler.androidErrorHandler(error);
            });
        }
    };
    TouchDriver.prototype.encryptCredentialsAndSave = function (credentials) {
        var encryptedString = this.encryptObject(credentials);
        return this.storage.saveCredentials(encryptedString);
    };
    TouchDriver.prototype.encryptTokenAndSave = function (token) {
        var encryptedString = this.encryptString(token);
        return this.storage.saveAndroidKey(encryptedString);
    };
    TouchDriver.prototype.encryptString = function (stringToEncrypt) {
        return CryptoJS.AES.encrypt(stringToEncrypt, TOUCH_CONSTANTS.androidTokenKey);
    };
    TouchDriver.prototype.encryptObject = function (objToEncrypt) {
        return CryptoJS.AES.encrypt(JSON.stringify(objToEncrypt), TOUCH_CONSTANTS.passKey);
    };
    TouchDriver.prototype.decryptString = function (toDecrypt, passkey) {
        return CryptoJS.AES.decrypt(toDecrypt.toString(), passkey).toString(CryptoJS.enc.Utf8);
    };
    TouchDriver.prototype.decryptObject = function (toDecrypt, passkey) {
        var bytes = CryptoJS.AES.decrypt(toDecrypt.toString(), passkey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(bytes);
    };
    TouchDriver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [IosTouch, AndroidTouch, Platform, TouchSecureStorage])
    ], TouchDriver);
    return TouchDriver;
}());
export { TouchDriver };
//# sourceMappingURL=touch.driver.js.map