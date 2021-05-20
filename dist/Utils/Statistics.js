"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const uuid_1 = require("uuid");
function get() {
    let statis = {
        // PackageName:,
        // SDKVersion:,
        // VersionName:,
        // VersionCode:,
        // OSAPILevel:,
        // Device:,
        DeviceID: uuid_1.v4(),
        // From:,
        // Model:,
        // Product:,
        // CarrierName:,
        // Manufacturer:,
        // OtherTAGS:,
        // ScreenWidth:,
        // ScreenHeight:,
        // SDCardState:,
        // GameOrientation:,
        // NetworkType:,
        // MACAddress:,
        // IPAddress:,
        // DeviceName:,
        // DeviceModel:,
        // DeviceType:,
        // OperatingSystem:,
        // ProcessorType:,
        // ProcessorCount:,
        // ProcessorFrequency:,
        // GraphicsDeviceName:,
        // GraphicsDeviceVendor:,
        // GraphicsMemorySize:
    };
    return JSON.stringify(statis);
}
exports.get = get;
