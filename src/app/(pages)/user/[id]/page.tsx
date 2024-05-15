import prisma from "@/lib/prisma";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

const UserDetailsPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  // if (!user) return null;
  console.log("user id ", params.id);

  return (
    <div className="container mx-auto items-center justify-center flex">
      <div className="mt-10">
        {user && user.image && (
          <div>
            <div className="relative rounded-md">
              <Image
                src={user.image}
                alt="profile image"
                width={300}
                height={300}
              />
            </div>

            <h1 className="text-2xl font-bold">{user?.name}</h1>

            <p className="text-muted-foreground">
              user since : {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
