export const BASE_URL = 'http://dev.trainee.dex-it.ru';

interface IBaseRequest{
    url:string;
    method:'POST' | 'GET' | 'PUSH' | 'DELETE';
    headers?:{
        "Content-Type"?:string;
        Authorization?: string;
    },
    body?:string;
}

// "application/json" | "multipart/form-data" | "multipart/form-data; boundary=something"

export const baseRequest = async ({url,...props}:IBaseRequest) =>{
    return await fetch(BASE_URL + url, {...props});
}


const request = async (url: string, data: any, token:any) => {
    const headersToken = token ? {Authorization: `Bearer ${token}`} : {}
    const headersMultiPart = typeof data.body === 'string' ? {"Content-type": "application/json;charset=utf-8"} : {}

    const response = await fetch(url, {
        ...data,
        headers: {
            ...headersToken,
            ...headersMultiPart,
        },
    });
    if (response.ok) {
        if (response.headers.get('Content-Length') === '0') {
            return true
        }
        const typeResponse = response.headers.get("Content-type");
        let result;
        if (typeResponse === 'aplication/text') {
            result = await response.text()
            return result
        }
        result = await response.json()
        return result;
    } else {
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("user");
            throw new Error("Unauthorized user");
        }
        if (response.status === 409) throw new Error('Already exists');
       else  throw {response: response}
    }

}

export const get = (url: string, token?: string) => request(`${BASE_URL}${url}`, {method: "GET"}, token)

export const post = (url: string, body: string | FormData, token?: string | null) => {
    return request(`${BASE_URL}${url}`, {method: "POST", body}, token)
}
export const put = (url: string, body: string, token: string) => {
    return request(`${BASE_URL}${url}`, {method: "PUT", body}, token)
}
export const remove = (url: string, token: string) => request(`${BASE_URL}${url}`, {method: "DELETE"}, token)