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
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { TOUCH_CONSTANTS, TOUCH_ERROR_RESPONSE } from "../../constants/touch.constants";
import { TouchError } from '../../models/touch.error';
var AndroidTouch = /** @class */ (function () {
    function AndroidTouch(fingerprintAuth) {
        this.fingerprintAuth = fingerprintAuth;
    }
    AndroidTouch.prototype.isAvailable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fingerprintAuth.isAvailable()
                .then(function (response) {
                if (response.isAvailable && response.hasEnrolledFingerprints && response.isHardwareDetected) {
                    resolve(TOUCH_CONSTANTS.touchAvailable);
                }
                else if (!response.hasEnrolledFingerprints) {
                    reject(new TouchError(TOUCH_ERROR_RESPONSE.NO_ENROLLED_FINGERPRINTS));
                }
            })
                .catch(function () {
                reject(new TouchError(TOUCH_ERROR_RESPONSE.TOUCH_UNAVAILABLE));
            });
        });
    };
    AndroidTouch.prototype.setTouchSetting = function (clientString) {
        return this.fingerprintAuth.encrypt({ clientId: clientString });
    };
    AndroidTouch.prototype.getTouchSetting = function (clientId, token) {
        return this.fingerprintAuth.decrypt({ clientId: clientId, token: token });
    };
    AndroidTouch = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AndroidFingerprintAuth])
    ], AndroidTouch);
    return AndroidTouch;
}());
export { AndroidTouch };
//# sourceMappingURL=android.touch.js.map