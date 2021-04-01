
export class CreateSponDto{
    owner:number;
    sponsorImgName: string;
    contact1: string;
    contact2: string;
    address: string;
    homepage: string;
    title: string;
    type: string;
}

export class CreateSupportDto{
    owner:number;
    support: string;
    supportMoney: string;
    supportDay: string;
    type: string;
}