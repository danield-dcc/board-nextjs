import { setTimeout } from "node:timers/promises"
import { CommentsListResponseSchema } from "@/api/routes/list-issue-comments"
import { clientEnv } from "@/env"

interface ListIssueComments {
  issueId: string
}

export async function listIssueComments({ issueId }: ListIssueComments) {
  await setTimeout(2000)
  const url = new URL(
    `/api/issues/${issueId}/comments`,
    clientEnv.NEXT_PUBLIC_API_URL,
  )

  const response = await fetch(url)
  const data = await response.json()

  return CommentsListResponseSchema.parse(data)
}
