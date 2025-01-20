export type Sms = {
    text: string;
    number: string;
    lastProvider: string | null;
};

export type Email={
    subject:string;
    body:string;
    recipients:string;
    lastProvider:string | null;
}
