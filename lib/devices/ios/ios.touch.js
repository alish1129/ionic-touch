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
import { TouchID } from "@ionic-native/touch-id/ngx";
import { TOUCH_CONSTANTS, TOUCH_ERROR_RESPONSE } from "../../constants/touch.constants";
import { TouchError } from '../../models/touch.error';
var IosTouch = /** @class */ (function () {
    function IosTouch(touchAuth) {
        this.touchAuth = touchAuth;
    }
    IosTouch.prototype.isAvailable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.touchAuth.isAvailable()
                .then(function () {
                resolve(TOUCH_CONSTANTS.touchAvailable);
            })
                .catch(function () {
                reject(new TouchError(TOUCH_ERROR_RESPONSE.TOUCH_UNAVAILABLE));
            });
        });
    };
    IosTouch.prototype.setTouchSetting = function (message) {
        return this.touchAuth.verifyFingerprint(message);
    };
    IosTouch.prototype.getTouchSetting = function (message) {
        return this.touchAuth.verifyFingerprint(message);
    };
    IosTouch = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TouchID])
    ], IosTouch);
    return IosTouch;
}());
export { IosTouch };
//# sourceMappingURL=ios.touch.js.map