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
  courseImage?: string
}

export class BasicResponse {
  status: number
  message: string
}
