"use client";
import { searchUsers } from "@/actions/searchUsers";
import { Input } from "@/components/ui/input";
import UserPaper from "@/components/user-paper";
import UserPaperSkeleton from "@/components/user-paper-skeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import { setUsers } from "@/store/reducers/userSearchReducer";
import { ActionError } from "@/utils/errors/serverAction.error";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Search = () => {
  const searchedUsers = useAppSelector(
    (state) => state.userSearchReducer.users
  );
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(searchedUsers);

  useEffect(() => {
    async function fetchUsers(query: string) {
      try {
        setIsLoading(true);
        const { users, error } = await searchUsers(query);
        if (error) throw new ActionError(error || "Something went wrong");
        dispatch(setUsers(users || []));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!query) return;
    setIsLoading(true);

    const searchTimeout = setTimeout(() => {
      fetchUsers(query);
    }, 1000);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [query, dispatch]);
  return (
    <div className="max-w-lg flex flex-col gap-4 justify-center items-center mx-auto">
      <div className="relative w-full">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for user..."
          className="pl-8 w-full"
        />
        <div className="absolute top-2/4 left-2 -translate-y-2/4 text-muted-foreground">
          <SearchIcon size={16} />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 20 }).map((_, i) => (
            <UserPaperSkeleton key={i} />
          ))
        ) : searchedUsers instanceof Array && searchedUsers.length ? (
          searchedUsers.map((user) => (
            <Link href={`/profile/${user.id}`} key={user.id}>
              <UserPaper user={user} />
            </Link>
          ))
        ) : searchedUsers instanceof Array ? (
          <div className="text-center">No user founded</div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
