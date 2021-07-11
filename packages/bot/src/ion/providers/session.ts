import { Users } from "../../models/users";
export interface Session {
  userId: number;
  apiId: number;
  apiHash: string;
  session: string;
}

export const save = async (userSession: Session) => {
  const user = await Users.findOne({ userId: userSession.userId });
  if (!user) {
    await Users.create({
      ...userSession,
    });
  }
};

export const load = async (userId?: number): Promise<Session> => {
  // note: future proof (if we need to add more accounts)

  const user = await Users.findOne({});

  if (user) {
    return user;
  }

  return {
    userId: 0,
    apiId: 0,
    apiHash: "",
    session: "",
  };
};
