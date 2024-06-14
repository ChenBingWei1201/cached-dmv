"use client";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { FC } from "react";
import { useQuery } from "@/cache/useQuery";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ params }: { params: { userid: string } }) {
  const dmvTime = useQuery(api.dmv.pickupTime);
  const users = useQuery(api.dmv.users);
  const thisUser = useQuery(
    api.dmv.userWaitTime,
    params.userid ? { user: params.userid[0] as Id<"users"> } : "skip"
  );
  return (
    <main
      className={`flex w-[640px] mx-auto flex-col items-center text-xl ${inter.className}`}
    >
      <div className="m-4 w-full py-4 border-b-2 flex flex-row space-x-4 items-end content-start">
        <Image
          priority
          src="/dmv.webp"
          width="160"
          height="160"
          alt="DMV Web Site"
          className="flex rounded-2xl"
        />
        <div className="grow text-md italic min-w-32">
          &quot;You&apos;ll wait.&quot;
        </div>
        <div className="flex justify-end w-full pr-12">
          {dmvTime ? (
            <LocationClock label="DMV time" time={dmvTime} size={80} />
          ) : (
            <div className="flex">Loading time...</div>
          )}
        </div>
      </div>
      <div className="flex space-x-4 my-8 flex-row w-full">
        <div className="flex min-w-[160px] p-6 flex-col space-y-3 bg-amber-200 rounded">
          <div className="text-2xl">Queue</div>
          {users?.map((u) => {
            return (
              <div
                key={u.id}
                className={thisUser && thisUser.id === u.id ? "font-bold" : ""}
              >
                <Link className="underline" href={`/${u.id}`}>
                  {u.name}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col pt-8 px-5 shrink items-center">
          {thisUser ? (
            <>
              <div className="shrink">
                Thanks for your patience, {thisUser.name}! Please arrive at a
                service window no earlier than:
              </div>
              <LocationClock label={`Arrival time`} time={thisUser.time} />
            </>
          ) : (
            <div>Not yet</div>
          )}
        </div>
      </div>
    </main>
  );
}

const LocationClock: FC<{ label: string; time: number; size?: number }> = ({
  label,
  time,
  size,
}) => {
  const useSize = size ?? 120;
  return (
    <div className="flex-col inline-block shrink items-center p-4 rounded">
      <div className="my-2">
        <Clock value={new Date(time)} size={useSize}></Clock>
      </div>
      <div className="text-center text-sm font-bold">{label}</div>
    </div>
  );
};
