export interface Book {
  id: number;
  title: string;
  clientId: number;
  genre: string[];
  author: string;
  category: string[];
  userReview: {
    review: string;
    rating: number;
  }[]
}
