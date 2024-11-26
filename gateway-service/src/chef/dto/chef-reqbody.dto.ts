export class ChefSignUpRequestBody {
  chefName: string;
  chefSurname: string;
  chefEmail: string;
  chefPassword: string;
  chefBio: string;
  chefExperience: string;
  chefSpecialty: string;
  chefPhone: string;
  chefSex: string;
  chefImage: string;
}
export class ChefLoginRequestBody {
  chefEmail: string;
  chefPassword: string;
}
export class ChefProfileUpdateRequestBody {
  chefName?: string;
  chefSurname?: string;
  chefEmail?: string;
  chefPassword?: string;
  chefBio?: string;
  chefExperience?: string;
  chefSpecialty?: string;
  chefPhone?: string;
  chefSex?: string;
  chefImage?: string;
}
export class CourseUploadRequestBody {
  courseTitle: string;
  courseDetail: string;
  coursePrice: number;
  courseCategory: string;
  courseVideoId: number;
  courseChefId: number;
  coursePackId: string;
  courseVideoPath: string;
  courseIngredientPrice: number;
  courseIngredientDetail: string;
  courseImage: string;
}

export class CourseUpdateRequestBody {
  courseTitle?: string;
  courseDetail?: string;
  coursePrice?: number;
  courseCategory?: string;
  courseVideoId?: number;
  courseChefId?: number;
  coursePackId?: string;
  courseVideoPath?: string;
  courseIngredientPrice?: number;
  courseIngredientDetail?: string;
  courseImage?: string;
}
