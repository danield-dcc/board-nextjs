"use client"
import { useQuery } from "@tanstack/react-query"
import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react"
import { useMemo } from "react"
import type z from "zod"
import type { IssuesListResponseSchema } from "@/api/routes/list-issues"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { LikeButton } from "@/components/like-button"
import { Section } from "@/components/section"
import { getIssueInteractions } from "@/http/get-issue-interactions"

interface BoardContentProps {
  issues: z.infer<typeof IssuesListResponseSchema>
}

export function BoardContent({ issues }: BoardContentProps) {
  const allIssuesIds = [
    ...issues.backlog.map((issue) => issue.id),
    ...issues.todo.map((issue) => issue.id),
    ...issues.in_progress.map((issue) => issue.id),
    ...issues.done.map((issue) => issue.id),
  ]

  const { data: interactionsData, isLoading: isLoadingInteractions } = useQuery(
    {
      queryKey: ["issue-like", allIssuesIds.sort().join(",")],
      queryFn: () => getIssueInteractions({ issuesIds: allIssuesIds }),
    },
  )

  const interactions = useMemo(() => {
    if (!interactionsData) {
      return new Map<string, { isLiked: boolean; likesCount: number }>()
    }

    return new Map<string, { isLiked: boolean; likesCount: number }>(
      interactionsData.interactions.map((interaction) => [
        interaction.issueId,
        {
          isLiked: interaction.isLiked,
          likesCount: interaction.likesCount,
        },
      ]),
    )
  }, [interactionsData])
  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <Section.Root>
        {/* header */}
        <Section.Header>
          <Section.Title>
            <ArchiveIcon />
            Backlog
          </Section.Title>
          <Section.IssueCount>{issues.backlog.length}</Section.IssueCount>
        </Section.Header>

        {/* Conteudo */}
        <Section.Content>
          {issues.backlog.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">
                No issues matching your filter{" "}
              </p>
            </div>
          ) : (
            issues.backlog.map((issue) => {
              const interaction = interactions.get(issue.id)

              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikes={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />

                    <Button>
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        {/* header */}
        <Section.Header>
          <Section.Title>
            <ArchiveIcon />
            To-do
          </Section.Title>
          <Section.IssueCount>{issues.todo.length}</Section.IssueCount>
        </Section.Header>

        {/* Conteudo */}
        <Section.Content>
          {issues.backlog.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">
                No issues matching your filter{" "}
              </p>
            </div>
          ) : (
            issues.todo.map((issue) => {
              const interaction = interactions.get(issue.id)

              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikes={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />

                    <Button>
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        {/* header */}
        <Section.Header>
          <Section.Title>
            <ArchiveIcon />
            In Progress
          </Section.Title>
          <Section.IssueCount>{issues.in_progress.length}</Section.IssueCount>
        </Section.Header>

        {/* Conteudo */}
        <Section.Content>
          {issues.backlog.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">
                No issues matching your filter{" "}
              </p>
            </div>
          ) : (
            issues.in_progress.map((issue) => {
              const interaction = interactions.get(issue.id)

              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikes={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />

                    <Button>
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        {/* header */}
        <Section.Header>
          <Section.Title>
            <ArchiveIcon />
            Done
          </Section.Title>
          <Section.IssueCount>{issues.done.length}</Section.IssueCount>
        </Section.Header>

        {/* Conteudo */}
        <Section.Content>
          {issues.backlog.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">
                No issues matching your filter{" "}
              </p>
            </div>
          ) : (
            issues.done.map((issue) => {
              const interaction = interactions.get(issue.id)

              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikes={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />

                    <Button>
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              )
            })
          )}
        </Section.Content>
      </Section.Root>
    </main>
  )
}
