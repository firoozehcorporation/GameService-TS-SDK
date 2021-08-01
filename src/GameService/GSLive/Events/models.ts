export class Event {
    constructor() { }

    private SendType: number | undefined
    GetSendType(): number | undefined {
        return this.SendType;
    }
    SetSendType(SendType: number) {
        this.SendType = SendType;
    }

    private To: string | undefined
    GetTo(): string | undefined {
        return this.To;
    }
    SetTo(To: string) {
        this.To = To;
    }

    private From: string | undefined
    GetFrom(): string | undefined {
        return this.From;
    }
    SetFrom(From: string) {
        this.From = From;
    }

    private Text: string | undefined
    GetText(): string | undefined {
        return this.Text;
    }
    SetText(Text: string) {
        this.Text = Text;
    }

    private SendAt: number | undefined
    GetSendAt(): number | undefined {
        return this.SendAt;
    }
    SetSendAt(SendAt: number) {
        this.SendAt = SendAt;
    }

    private Buffering: number | undefined
    GetBuffering(): number | undefined {
        return this.Buffering;
    }
    SetBuffering(Buffering: number) {
        this.Buffering = Buffering;
    }

    private CreatedAt: number | undefined
    GetCreatedAt(): number | undefined {
        return this.CreatedAt;
    }
    SetCreatedAt(CreatedAt: number) {
        this.CreatedAt = CreatedAt;
    }

    private Cast() {
        return {
            "0": this.SendType,
            "1": this.To,
            "2": this.Text,
            "3": this.SendAt,
            "4": this.Buffering,
            "5": this.CreatedAt,
            "6": this.From
        }
    }

    public Parse(input: any) {
        let inputJ = JSON.parse(input)
        this.RawParse(inputJ)
    }

    public RawParse(inputJ: any) {
        this.SetSendType(inputJ["0"]);
        this.SetTo(inputJ["1"]);
        this.SetText(inputJ["2"]);
        this.SetSendAt(inputJ["3"]);
        this.SetBuffering(inputJ["4"]);
        this.SetCreatedAt(inputJ["5"]);
        this.SetFrom(inputJ["6"]);
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }
}