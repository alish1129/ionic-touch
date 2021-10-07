var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AndroidTouch } from "./devices/android/android.touch";
import { TouchDriver } from "./touch.driver";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { SecureStorage } from "@ionic-native/secure-storage";
import { TouchID } from "@ionic-native/touch-id";
import { TouchSecureStorage } from "./storage/touch.storage";
import { IosTouch } from "./devices/ios/ios.touch";
var TouchModule = /** @class */ (function () {
    function TouchModule() {
    }
    TouchModule_1 = TouchModule;
    TouchModule.forRoot = function () {
        return {
            ngModule: TouchModule_1,
            providers: [TouchID, AndroidFingerprintAuth, SecureStorage, IosTouch, AndroidTouch, TouchDriver, TouchSecureStorage]
        };
    };
    var TouchModule_1;
    TouchModule = TouchModule_1 = __decorate([
        NgModule()
    ], TouchModule);
    return TouchModule;
}());
export { TouchModule };
//# sourceMappingURL=touch.module.js.map