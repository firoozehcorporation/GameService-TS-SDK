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
    label: string
    tags: string
    extra: string
    user: User
    online: boolean
}

export class MemberInfo {
    Id: string | undefined
    Logo: string | undefined
    Name: string | undefined
    Label: string | undefined
    Tags: string | undefined
    Extra: string | undefined
    Email: string | undefined
    PhoneNumber: string | undefined

    Parse = (inputJ: any) => {
        this.Id = inputJ["_id"]
        this.Logo = inputJ["logo"]
        this.Name = inputJ["name"]
        this.Label = inputJ["label"]
        this.Tags = inputJ["tags"]
        this.Extra = inputJ["extra"]
        this.Email = inputJ["email"]
        this.PhoneNumber = inputJ["phonenumber"]
    }
}

export class Profile {
    Name: string | undefined
    Label: string | undefined
    Tags: string[] | undefined
    Extra: string | undefined
    Options: string | undefined
    Email: string | undefined
    Mobile: string | undefined

    Export() {
        return {
            "name": this.Name,
            "label": this.Label,
            "tags": this.Tags,
            "extra": this.Extra,
            "options": this.Options,
            "email": this.Email,
            "mobile": this.Mobile,
        }
    }
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