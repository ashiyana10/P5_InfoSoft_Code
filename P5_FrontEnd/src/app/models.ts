export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  status: boolean;
  todos: [];
}

export interface ITodoTaks {
  id: number,
  userId: number,
  title: string,
  dueDate: string,
  status: boolean
}