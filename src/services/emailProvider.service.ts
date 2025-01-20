const emailProviders = {
    provider1: {api:'http://localhost:8091/api/email/provider1',name:'provider1'},
    provider2: {api:'http://localhost:8092/api/email/provider2',name:'provider2'},
    provider3: {api:'http://localhost:8093/api/email/provider3',name:'provider3'}, 
};

function configureEmailSender(provider: { api: string; name: string }) {
    function emailSender(subject: string, body: string, recipients: string[]) {
        const name = provider.name;
        const endpoint = provider.api;
        return fetch(endpoint, {
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
    }
    return emailSender;
}

function getEmailProvider(lastProvider: string | null) {
    for (let provider of Object.values(emailProviders)) {
        if (lastProvider && lastProvider === provider.name) {
            continue;
        }
        return configureEmailSender(provider);
    }
}

export { getEmailProvider };