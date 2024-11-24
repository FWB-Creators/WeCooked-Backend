export class BasicResponse {
    status: number;
    message: string;
}

export class UpcomingResponse {
    status: number;
    message: string;
    data: Array<any>;
}

export class GetWorkshopByIdEventMsg {
    id: number;
}

export class GetWorkshopByIdResponse {
    status: number;
    message: string;
    data: any;
}

export class CreateWorkshopEventMsg {
    workshopTitle: string;
    workshopDetail: string;
    workshopLinkZoom: string;
    workshopPicture: string;
    workshopChefId: number;
    workshopPrice: number;
    workshopCategory: string;
    workshopIngredientPrice: number;
    workshopDate: Date;
    workshopNumberofparticipants: number;
    workshopIngredientDetail: string;
    workshopDescription: string;
}
