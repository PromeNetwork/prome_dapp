export interface User {
    uid: any;
    email?: any;
    username?: any;
    wallets?: any;
    address:string;
    blockus_sui_wallet?: any;
    avatar?: any;
    social_account_google?: any;
    facebook_user_id?: any;
    account_tag?: any;
    code: string;
    random_string?: any;
}


export interface Question {
     country?: string;
     equipment?: string;
     brand?: string;
     consumption?: string;
}



export interface Coupon{
    id?:number;
    address:string;
    code:string;
    status:number;
    serial:number;
}