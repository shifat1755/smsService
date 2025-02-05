export type Sms = {
    text: string;
    number: string;
    lastProviders: [];
};

export type Email={
    subject:string;
    body:string;
    recipients:string;
    lastProvider:number | null;
}
