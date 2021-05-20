export interface User {
    _id: string
    logo: string
    name: string
    email: string
    phoneNumber: string
    point: number
    isMe: boolean
    guest: boolean
}

export interface Member {
    _id: string
    logo: string
    name: string
    extra: string
    user: User
    online: boolean
}

export interface MemberInfo {
    Id: string
    Logo: string
    Name: string
    Email: string
    PhoneNumber: string
}

export interface Profile {

}

export interface ActiveDevice {
    DeviceId: string
    method: string,
    DeviceModel: string
    DeviceName: string
    GraphicsDeviceName: string
    OperatingSystem: string
    is_current: boolean
    last_login: Date
    first_login: Date
}