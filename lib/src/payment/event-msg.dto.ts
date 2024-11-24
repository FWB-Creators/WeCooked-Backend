export class BasicResponse {
    status: number;
    message: string;
}

export class CreatePaymentForCourseEventMsg {
    courseId: number;
    isWithIngredient: boolean;
    userId: number;
}

export class CreatePaymentForCourseEventResponse {
    status: number;
    message: string;
    checkoutUrl: string;
}

export class CreatePaymentForWorkshopEventMsg {
    workshopId: number;
    isWithIngredient: boolean;
    userId: number;
}

export class CreatePaymentForWorkshopEventResponse {
    status: number;
    message: string;
    checkoutUrl: string;
}
