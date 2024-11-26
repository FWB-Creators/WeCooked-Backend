export class PostCourseVideoRequestBody {
  courseId: number;
}

export class PostTutorialRequestBody {
  title: string;
  details: string;
  tutorialVideo: string;
  tutorialImage: string;
}
