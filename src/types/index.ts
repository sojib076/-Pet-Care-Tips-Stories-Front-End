export interface IInput {
    variant?: "flat" | "bordered" | "faded" | "underlined";
    size?: "sm" | "md" | "lg";
    required?: boolean;
    type?: string;
    label: string;
    name: string;
    disabled?: boolean;
  }


  export interface Post {
    _id: string;
    author: {
      _id: string;
      name: string;
      username: string;
      img: string;
    };
    premiumContent: boolean;
    content: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    comments: {
      _id: string;
      userId: {
        _id: string; 
        name: string;
      };
      content: string;
      createdAt: string;
    }[];
  }
  