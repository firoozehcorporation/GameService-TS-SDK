"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(superThis) {
        this.superThis = superThis;
    }
    GetIsPrivate() {
        return this.IsPrivate;
    }
    SetIsPrivate(IsPrivate) {
        this.IsPrivate = IsPrivate;
    }
    GetTo() {
        return this.To;
    }
    SetTo(To) {
        this.To = To;
    }
    GetFrom() {
        return this.From;
    }
    SetFrom(From) {
        this.From = From;
    }
    GetText() {
        return this.Text;
    }
    SetText(Text) {
        this.Text = Text;
    }
    GetTime() {
        return this.Time;
    }
    SetTime(Time) {
        this.Time = Time;
    }
    GetChannel() {
        return this.Channel;
    }
    SetChannel(Channel) {
        this.Channel = Channel;
    }
    Cast() {
        return {
            "0": this.IsPrivate,
            "1": this.To,
            "2": this.From,
            "3": this.Text,
            "4": this.Time,
            "5": this.Channel
        };
    }
    Parse(input) {
        let inputJ = JSON.parse(input);
        this.SetIsPrivate(inputJ["0"]);
        this.SetTo(inputJ["1"]);
        this.SetFrom(inputJ["2"]);
        this.SetText(inputJ["3"]);
        this.SetTime(inputJ["4"]);
        this.SetChannel(inputJ["5"]);
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
}
exports.Message = Message;
