declare namespace Express {
  export interface Request {
    client: {
      id: string;
      phone: string;
    };

    id_deliveryman: string;
    username_deliveryman: string;
  }
}
