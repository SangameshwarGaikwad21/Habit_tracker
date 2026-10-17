import { Resend } from "resend";

if(!process.env.RESEND_API_KEY){
    throw new Error("Api key is missing")
}

export const resend = new Resend(
    process.env.RESEND_API_KEY
)