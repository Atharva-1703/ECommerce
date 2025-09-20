import { useUserStore } from "@/stores/useUserStore";


export async function fetcher(url: string,method:string,body?:any) {
    const res = await fetch(url,{
        method,
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify(body)
    });
    if(res.status===401){
        useUserStore.getState().clearStore();
        if(typeof window!=="undefined"){
            window.location.href="/login";
        }
    }
    return res;
}