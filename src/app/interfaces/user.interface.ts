export interface UserData {
  idUser: number;
  cc: number;
  name: string;
  email: string;
  password: string;
  role: number;
  calification: Calification;
}

export interface Calification {
  idUser: number;
  score: number;
}
