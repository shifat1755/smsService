export const sendSmsToGP= async (message:string,number:string):Promise<any>=>{
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
    return await response   

}

export const sendSmsToBL= async (message:string,number:string):Promise<any>=>{
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
    return await response;
}

export const sendSmsToRobi= async (message:string,number:string):Promise<any>=>{
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
        return await response   
}

export const getProvider=()=>{
    return sendSmsToBL
}