"use client"
import { Loader2Icon, LogInIcon } from "lucide-react"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"

export function UserButton() {
  const { data: session, isPending } = authClient.useSession()

  async function handleSigIn() {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" })
  }

  async function handleSignOut() {
    await authClient.signOut()
  }
  return (
    <>
      {" "}
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
    </>
  )
}
