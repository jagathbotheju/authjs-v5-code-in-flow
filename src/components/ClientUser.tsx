"use client";

import { useSession } from "next-auth/react";

const ClientUser = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-xl">Client User</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};

export default ClientUser;
