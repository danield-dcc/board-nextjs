"use client"

import { Loader2Icon, LogInIcon, SearchIcon } from "lucide-react"
import Image from "next/image"
import { debounce, parseAsString, useQueryState } from "nuqs"
import type { ChangeEvent } from "react"
import { Input } from "@/components/input"
import { authClient } from "@/lib/auth-client"

export function Header() {
  const { data: session, isPending } = authClient.useSession()
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: false,
    }),
  )

  function handleSearchUpdate(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== "" ? debounce(500) : undefined,
    })
  }

  async function handleSigIn() {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" })
  }

  async function handleSignOut() {
    await authClient.signOut()
  }

  return (
    <div className="max-w-225 mx-auto w-full flex items0center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the development progress of our entire platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className=" absolute size-4 text-nav-200 left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="text"
            placeholder="search for features..."
            className="w-67.5 pl-8"
            value={search}
            onChange={handleSearchUpdate}
          />
        </div>

        {isPending ? (
          <div className="size-8 rounded-full bg-navy-700 border border-navy-500 cursor-pointer flex items-center justify-center">
            {" "}
            <Loader2Icon className="size-3.5 text-navy-200 animate-spin" />
          </div>
        ) : session?.user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="size-8 rounded-full overflow-hidden cursor-pointer"
          >
            <Image
              src={session.user.image ?? ""}
              alt={session.user.name}
              className="size-8 rounded-full"
              width={32}
              height={32}
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSigIn}
            className="size-8 rounded-full bg-navy-700 border border-navy-500 cursor-pointer flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 "
          >
            <LogInIcon className="size-3.5 text-navy-200" />
          </button>
        )}
      </div>
    </div>
  )
}
