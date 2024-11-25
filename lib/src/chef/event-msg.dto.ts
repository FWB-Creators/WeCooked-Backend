export class ChefSignUpEventMsg {
  chefName: string
  chefSurname: string
  chefEmail: string
  chefPassword: string
  chefBio: string
  chefExperience: string
  chefSpecialty: string
  chefPhone: string
  chefSex: string
  chefImage: string
}
export class ChefLoginEventMsg {
  chefEmail: string
  chefPassword: string
}
export class ChefProfileUpdateEventMsg {
  chefName?: string
  chefSurname?: string
  chefEmail?: string
  chefPassword?: string
  chefBio?: string
  chefExperience?: string
  chefSpecialty?: string
  chefPhone?: string
  chefSex?: string
  chefImage?: string
  chefId?: number
}
export class CourseUploadEventMsg {
  courseTitle: string
  courseDetail: string
  coursePrice: number
  courseCategory: string
  courseVideoId: number
  courseChefId: number
  coursePackId: string
  courseVideoPath: string
  courseIngredientPrice: number
  courseImage: string
  chefId: number
}
