"use client";
import {
  Search as SearchIcon,
  UserPaper,
  UserPaperSkeleton,
  api,
  instance,
  toasty,
  useLoading,
} from "@/exports";
import { useEffect, useState } from "react";
export default function Search() {
  const [query, setQuery] = useState("");
  const [usersSearch, setUsersSearch] = useState(null);
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        if (!query) return setUsersSearch(null);
        const response = await instance.get(`${api.searchUsers}?q=${query}`);
        setUsersSearch(response.data.users);
      } catch (error) {
        toasty("error", error, {
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [query]);
  return (
    <div className="flex flex-col items-start gap-4 md:w-2/4 w-full mx-auto h-full">
      <div className="flex items-center gap-2 px-4 py-2 w-full rounded-lg bg-white/10 self-center">
        <div>
          <SearchIcon />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
            className="w-full bg-transparent px-1 py-2 outline-none border-none"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-1 overflow-auto">
        {usersSearch ? (
          usersSearch.length ? (
            usersSearch?.map((user, i) => {
              return <UserPaper key={i} user={user} />;
            })
          ) : (
            <div className="text-center text-xl font-medium">
              {query} not found
            </div>
          )
        ) : (
          query &&
          loading &&
          Array.from({ length: 10 }).map((ele, i) => {
            return <UserPaperSkeleton key={i} />;
          })
        )}
      </div>
    </div>
  );
}
