export class Event {
    constructor() { }

    private IsTag: boolean | undefined
    GetIsTag(): boolean | undefined {
        return this.IsTag;
    }
    SetIsTag(IsTag: boolean) {
        this.IsTag = IsTag;
    }

    private To: string | undefined
    GetTo(): string | undefined {
        return this.To;
    }
    SetTo(To: string) {
        this.To = To;
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

    private Buffering: boolean | undefined
    GetBuffering(): boolean | undefined {
        return this.Buffering;
    }
    SetBuffering(Buffering: boolean) {
        this.Buffering = Buffering;
    }

    private Cast() {
        return {
            "0": this.IsTag,
            "1": this.To,
            "2": this.Text,
            "3": this.Time,
            "4": this.Buffering
        }
    }

    public Parse(input: any) {
        let inputJ = JSON.parse(input)
        this.RawParse(inputJ)
    }

    public RawParse(inputJ: any) {
        this.SetIsTag(inputJ["0"]);
        this.SetTo(inputJ["1"]);
        this.SetText(inputJ["2"]);
        this.SetTime(inputJ["3"]);
        this.SetBuffering(inputJ["4"]);
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }
}