export class BasicResponse {
    status: number;
    message: string;
}

export class UpcomingResponse {
    status: number;
    message: string;
    data: Array<any>;
}

export class GetGroupByIdEventMsg {
    id: number;
}

export class GetGroupByIdResponse {
    status: number;
    message: string;
    data: any;
}

export class CreateGroupEventMsg {
    groupTitle: string;
    groupDetail: string;
    groupLinkZoom: string;
    groupPicture: string;
    groupChefId: number;
    groupPrice: number;
    groupCategory: string;
    groupIngredientPrice: number;
    groupDate: Date;
    groupNumberOfParticipants: number;
}
