import { v4 } from 'uuid';

export function get() {
    let statis = {
        // PackageName:,
        // SDKVersion:,
        // VersionName:,
        // VersionCode:,
        // OSAPILevel:,
        // Device:,
        DeviceID: v4(),
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