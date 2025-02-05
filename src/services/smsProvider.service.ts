import { text } from "express";

export const sendSmsToGP= async (message:string,number:string):Promise<any>=>{
    console.log("sending sms to gp")
    const endpoint = 'http://localhost:8071/api/sms/provider1';
    const response = await fetch(endpoint,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            phone:number,
            text:message
        }),
        })
    return response 

}

export const sendSmsToBL= async (message:string,number:string):Promise<any>=>{
    console.log("sending sms to bl")
    const endpoint = 'http://localhost:8072/api/sms/provider2';
    const response = await fetch(endpoint,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            phone:number,
            text:message
        }),
        })
    return response;
}


export const sendSmsToRobi= async (message:string,number:string):Promise<any>=>{
    console.log("sending sms to robi")
    const endpoint = 'http://localhost:8073/api/sms/provider3';
    const response = await fetch(endpoint,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            phone:number,
            text:message
        }),
        })
        return response  
}

async function getProviderPriorities() {
    // return await ProviderPriority.getAll()
  return [
    {
      id: 1,
      provider_type: "sms",
      provider_name: "GrameenPhone",
      provider_key: "gp",
      priority: 2,
    },
    {
      id: 2,
      provider_type: "sms",
      provider_name: "BanglaLink",
      provider_key: "bl",
      priority: 1,
    },
    {
      id: 3,
      provider_type: "sms",
      provider_name: "Robi",
      provider_key: "robi",
      priority: 3,
    },
  ];
}

export async function totalNumberOfProviders() {
    return 3;
}


export const getSmsProvider = async (lastProvidersIds: [number]):Promise<any> => {
    const providers = [
        { id: 1, fn: sendSmsToGP },
        { id: 2, fn: sendSmsToBL },
        { id: 3, fn: sendSmsToRobi }
    ];
    const providerPriorities = await getProviderPriorities();
    const sortedProviders = providerPriorities.sort((a, b) => a.priority - b.priority);
    for (const provider of sortedProviders) {
        if (!lastProvidersIds.includes(provider.id)) {
            return {id:provider.id, fn: providers.find(p => p.id === provider.id)};
        }
        continue;
    }
};