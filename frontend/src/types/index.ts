export interface UserType {
  _id: string;
  email: string;
  age: number;
  userId: number;
  phone: string;
}

export interface boardType {
  _id: string;
  content: string;
  title: string;
  regDate: string;
  regUserEmail: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}
