import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react"
import type { Metadata } from "next"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { Section } from "@/components/section"
import { listIssues } from "@/http/list-issues"

export const metadata: Metadata = {
  title: "Board",
}

interface BoardProps {
  searchParams: Promise<{ q?: string }>
}

export default async function Board({ searchParams }: BoardProps) {
  const { q } = await searchParams

  const issues = await listIssues({ search: q })

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
            issues.backlog.map((issue) => (
              <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">12</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">6</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))
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
            issues.todo.map((issue) => (
              <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">12</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">6</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))
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
            issues.in_progress.map((issue) => (
              <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">12</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">6</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))
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
            issues.done.map((issue) => (
              <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">12</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">6</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))
          )}
        </Section.Content>
      </Section.Root>
    </main>
  )
}
