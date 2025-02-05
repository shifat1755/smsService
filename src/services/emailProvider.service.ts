export const sendEmailToProvider1 = async (subject: string, body: string, recipients: string[]): Promise<any> => {
    try{
        const endpoint = 'http://localhost:8091/api/email/provider1';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: subject,
                body: body,
                recipients: recipients,
            }),
        });
        return  response;
    }
    catch(err){
        return err;}
}
export const sendEmailToProvider2 = async (subject: string, body: string, recipients: string[]): Promise<any> => {
    try{
        const endpoint = 'http://localhost:8092/api/email/provider2';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: subject,
                body: body,
                recipients: recipients,
            }),
        });
        return  response;
    }
    catch(err){
        return err;}

}

export const sendEmailToProvider3 = async (subject: string, body: string, recipients: string[]): Promise<any> => {
    try{

    
    const endpoint = 'http://localhost:8093/api/email/provider3';
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subject: subject,
            body: body,
            recipients: recipients,
        }),
    });
    return  response;
}
catch(err){
    return err;}
}

export const getEmailProvider=(lastProviderIndex: number | null)=> {
    const providers=[
        {id:1,fn:sendEmailToProvider1},
        {id:2,fn:sendEmailToProvider2},
        {id:3,fn:sendEmailToProvider3}

    ]
    const index = lastProviderIndex !== null ? (lastProviderIndex + 1) % providers.length : 0;
    return providers[index];
}
