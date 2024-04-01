export interface LikedCategory {
  id: number;
  name: string;
}

export interface LikeProps {
  liked: number[];
  setLiked: React.Dispatch<React.SetStateAction<number[]>>;
}
