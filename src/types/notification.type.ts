export type Sms = {
    text: string;
    number: string;
    lastProvider: number | null;
};

export type Email={
    subject:string;
    body:string;
    recipients:string;
    lastProvider:number | null;
}
