/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types";
import { getUserProfile } from "@/actions/getUserProfile";
import { ActionError } from "@/utils/errors/serverAction.error";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import PostThumbnail from "@/components/post-thumbnail";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import { setPosts } from "@/store/reducers/postsReducer";

const StatisticNumber = ({
  number,
  label,
}: {
  number: string | number;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div>{label}</div>
      <div>{number}</div>
    </div>
  );
};

const ProfileId = ({params: {id}}: {params: {id:string}}) => {
  const [user, setUser] = useState<UserProfile>();
  const posts = useAppSelector(state => state.postsReducer.posts)
  const dispatch = useAppDispatch()
  const {
    username,
    firstname,
    lastname,
    profilePic,
    followers,
    followings,
  } = user || {};
  const { data } = useSession();
  const { user: currentUser } = data || {};
  const numbers = [
    {
      label: "Posts",
      number: posts?.length,
    },
    {
      label: "Followers",
      number: followers?.length,
    },
    {
      label: "Followings",
      number: followings?.length,
    },
  ];
  const { toast } = useToast();
  useEffect(() => {
    (async () => {
      try {
        const { user, error } = await getUserProfile(id as string);
        if (!user) throw new ActionError(error || "Something went wrong");
        setUser(user);
        if (user.posts) {
          dispatch(setPosts(user.posts))
        }
      } catch (error: unknown) {
        console.log(error)
        toast({
          title:
            error instanceof ActionError
              ? error.actionError
              : "Something went wrong",
          variant: "destructive",
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-center flex-col gap-4">
        <div>
          <Avatar className="w-20 h-20">
            <AvatarImage src={profilePic || ""} />
          </Avatar>
        </div>
        <div className="flex items-start justify-center gap-6 font-bold xs:ml-10 h-[55px]">
          {numbers.map(({ label, number },index,arr) => (
            <>
              <StatisticNumber key={label} number={number || 0} label={label} />
              {index < arr.length - 1 ? <Separator orientation="vertical" /> : null}
            </>
          ))}
        </div>
      </div>
      <div className="w-full grid grid-cols-posts gap-4">
        {posts?.map(post => (
          <PostThumbnail key={post.id} {...post}/>
        ))}
      </div>
    </div>
  );
};

export default ProfileId;
