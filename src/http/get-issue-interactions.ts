import { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions"
import { clientEnv } from "@/env"

interface GetIssueInteractionsParams {
  issuesIds: string[]
}

export async function getIssueInteractions({
  issuesIds,
}: GetIssueInteractionsParams) {
  const url = new URL(`/api/issues/interactions`, clientEnv.NEXT_PUBLIC_API_URL)

  url.searchParams.set("issueIds", issuesIds.join(","))

  const response = await fetch(url, {
    credentials: "include", //envia todos os header para a api - incluindo os cooks - para saber qual usuário esta fazendo a requisição
  })
  const data = await response.json()

  return IssueInteractionsResponseSchema.parse(data)
}
