export class BasicResponse {
    status: number;
    message: string;
}

export class CreatePaymentForCourseEventMsg {
    courseId: number;
    userId: number;
}

export class CreatePaymentForCourseEventResponse {
    status: number;
    message: string;
    checkoutUrl: string;
}
