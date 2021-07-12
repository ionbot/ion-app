import { Users } from "../../models/users";
export interface Session {
  userId: number;
  apiId: number;
  apiHash: string;
  session: string;
}

export const save = async (userSession: Session) => {
  const user = await Users.findOne({});
  if (!user) {
    await Users.create({
      ...userSession,
    });
  } else {
    await Users.findOneAndUpdate(
      {},
      {
        ...userSession,
      }
    );
  }
};

export const deleteUser = async (session: string) => {
  await Users.deleteOne({ session });
  return;
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
