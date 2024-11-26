export class CourseUpdateEventMsg {
  courseId?: number
  courseTitle?: string
  courseDetail?: string
  coursePrice?: number
  courseCategory?: string
  courseVideoId?: number
  courseChefId?: number
  coursePackId?: string
  courseVideoPath?: string
  courseIngredientPrice?: number
  courseIngredientDetail?: string
  courseImage?: string
}

export class CourseVideoEventMsg {
  courseId: number
}

export class BasicResponse {
  status: number
  message: string
}

export class SignUpChefResponse extends BasicResponse {
  data: Array<{
    courseId: number
    courseTitle: string
    courseDetail: string
    coursePrice: number
    courseCategory: string
    courseChefId: number
    courseIngredientPrice: number
    courseImage: string
    courseChefImage: string
    courseIngredientDetail: string
    isCourseCompleted: boolean
  }>
}

export class UserCourseVideoEventMsg {
  courseId: number
  userId: number
}
