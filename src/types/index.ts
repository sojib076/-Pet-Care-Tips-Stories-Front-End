export interface IInput {
    variant?: "flat" | "bordered" | "faded" | "underlined";
    size?: "sm" | "md" | "lg";
    required?: boolean;
    type?: string;
    label: string;
    name: string;
    disabled?: boolean;
    userValue?: string;
  }


  export interface Post {
    _id: string;
    author: {
      _id: string;
      name: string;
      username: string;
      img: string;
    };
    category: string;
    premiumContent: boolean;
    content: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    voters?: { userId: string; voteType: 'up' | 'down' }[];
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
  
  export interface Postadimin {
    _id: string;
    title: string;
    author: {
      name: string;
      email: string;
    };
    category: string;
    premiumContent: boolean;
    ispublished: boolean;
  }
  