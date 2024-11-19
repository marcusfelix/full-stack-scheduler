declare namespace Express {
  interface Request {
    user: User
  }
}

interface User {
  id: string;
  email: string;
  password: string;
  type: "USER" | "ADMIN";
  created: string;
  iat: number;
  exp: number;
}