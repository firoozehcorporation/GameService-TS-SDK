export class Message {
    constructor() { }

    private IsPrivate: boolean | undefined
    GetIsPrivate(): boolean | undefined {
        return this.IsPrivate;
    }
    SetIsPrivate(IsPrivate: boolean) {
        this.IsPrivate = IsPrivate;
    }

    private To: string | undefined
    GetTo(): string | undefined {
        return this.To;
    }
    SetTo(To: string) {
        this.To = To;
    }

    private From: object | undefined
    GetFrom(): object | undefined {
        return this.From;
    }
    SetFrom(From: object) {
        this.From = From;
    }


    private Text: string | undefined
    GetText(): string | undefined {
        return this.Text;
    }
    SetText(Text: string) {
        this.Text = Text;
    }

    private Time: number | undefined
    GetTime(): number | undefined {
        return this.Time;
    }
    SetTime(Time: number) {
        this.Time = Time;
    }

    private Channel: string | undefined
    GetChannel(): string | undefined {
        return this.Channel;
    }
    SetChannel(Channel: string) {
        this.Channel = Channel;
    }

    private ID: string | undefined;
    GetID(): string | undefined {
        return this.ID;
    }
    SetID(ID: string) {
        this.ID = ID;
    }
    private Property: string | undefined
    GetProperty(): string | undefined {
        return this.Property;
    }
    SetProperty(Property: string) {
        this.Property = Property;
    }

    private Cast() {
        return {
            "0": this.IsPrivate,
            "1": this.To,
            "2": this.From,
            "3": this.Text,
            "4": this.Time,
            "5": this.Channel,
            "6": this.ID,
            "7": this.Property
        }
    }

    public Parse(input: any) {
        let inputJ = JSON.parse(input)
        this.RawParse(inputJ)
    }

    public RawParse(inputJ:any){
        this.SetIsPrivate(inputJ["0"]);
        this.SetTo(inputJ["1"]);
        this.SetFrom(inputJ["2"]);
        this.SetText(inputJ["3"]);
        this.SetTime(inputJ["4"]);
        this.SetChannel(inputJ["5"]);
        this.SetID(inputJ["6"]);
        this.SetProperty(inputJ["7"]);
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }
}