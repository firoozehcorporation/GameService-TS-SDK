"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.MemberInfo = void 0;
class MemberInfo {
    constructor() {
        this.Parse = (inputJ) => {
            this.Id = inputJ["_id"];
            this.Logo = inputJ["logo"];
            this.Name = inputJ["name"];
            this.Label = inputJ["label"];
            this.Tags = inputJ["tags"];
            this.Extra = inputJ["extra"];
            this.Email = inputJ["email"];
            this.PhoneNumber = inputJ["phonenumber"];
        };
    }
}
exports.MemberInfo = MemberInfo;
class Profile {
    Export() {
        return {
            "name": this.Name,
            "label": this.Label,
            "tags": this.Tags,
            "extra": this.Extra,
            "options": this.Options,
            "email": this.Email,
            "mobile": this.Mobile,
        };
    }
}
exports.Profile = Profile;
//# sourceMappingURL=models.js.map