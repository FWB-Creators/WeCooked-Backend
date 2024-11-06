export class ChefModel {
  chefId: number;
  chefName: string;
  chefSurname: string;
  chefBio?: string;
  chefSpecialty?: string;
  chefExperience?: string;
  chefPicture?: string;
  chefEmail?: string;
  chefPayment?: number;
  chefPhone?: number;
  chefUsername: string;
  chefPassword: string;
  payment?: Payment;
  courses: Course[];
  groups: GroupID[];
  users: User[];
}

interface Course {
  courseId: number;
  courseTitle: string;
  courseDetail: string;
  coursePrice: number;
  courseCategory: string;
  courseVideoId?: number;
  courseChefId?: number;
  coursePackId?: string;
  packName?: PackName;
  video?: Video;
  chef?: ChefModel;
  review: Review[];
  order: Order[];
}

interface GroupID {
  groupId: number;
  groupTitle: string;
  groupDetail: string;
  groupPrice: number;
  groupNumberofparticipants: number;
  groupDate: Date;
  groupCategory: string;
  groupLinkZoom?: string;
  groupPicture?: string;
  groupChefId?: number;
  groupPackId?: string;
  pack?: PackName;
  chef?: ChefModel;
}

interface IngredientPack {
  id: number;
  ingredientId: number;
  quantity: number;
  packCode: string;
  ingredient?: Ingredient;
  packName?: PackName;
}

interface PackName {
  packId: string;
  menuName: string;
  course: Course[];
  ingredientPack: IngredientPack[];
  group: GroupID[];
}

interface Payment {
  paymentId: number;
  cardNo: number;
  cardHolder: string;
  users: User[];
  chef: ChefModel[];
  order: Order[];
}

interface User {
  userId: number;
  name?: string;
  surname?: string;
  userAddress?: string;
  userProfile?: string;
  favouriteChefId?: number;
  sex?: string;
  userPhone?: number;
  userEmail?: string;
  userPayment?: number;
  username: string;
  password: string;
  favChef?: ChefModel;
  payment?: Payment;
  review: Review[];
  order: Order[];
}

interface Video {
  videoID: number;
  videoPath: string;
  videoTitle: string;
  course: Course[];
}

interface Ingredient {
  ingredientId: number;
  ingredientName?: string;
  ingredientPrice?: number;
  ingredientpack: IngredientPack[];
}

interface Review {
  reviewId: number;
  reviewUserId: number;
  reviewRating: number;
  reviewDetail?: string;
  reviewTimestamp: Date;
  reviewCourseId: number;
  userId?: User;
  coursId?: Course;
}

interface Order {
  orderId: number;
  orderUserId: number;
  orderCourseId: number;
  orderPaymentId: number;
  orderDate: Date;
  orderFormat: string;
  orderWithIngredient: boolean;
  orderPrice: number;
  coursId?: Course;
  userId?: User;
  paymentId?: Payment;
}
