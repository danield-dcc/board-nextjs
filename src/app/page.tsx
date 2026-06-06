import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react"
import { Card } from "@/components/card"
import { Section } from "@/components/section"

export default function Home() {
  return (
    <div className={`max-w-405 w-full mx-auto p-10 flex flex-col gap-8 h-dvh`}>
      <div />

      <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
        <Section.Root>
          {/* header */}
          <Section.Header>
            <Section.Title>
              <ArchiveIcon />
              Backlog
            </Section.Title>
            <Section.IssueCount>16</Section.IssueCount>
          </Section.Header>

          {/* Conteudo */}
          <Section.Content>
            <Card.Root>
              <Card.Header>
                <Card.Number>ECO-001</Card.Number>
                <Card.Title>Implementar cartão de crédito</Card.Title>
              </Card.Header>
              <Card.Footer>
                <button
                  type="button"
                  className="text-navy-100 flex items-center gap-2 rounded-lg px-2.5 py-1 bg-navy-600"
                >
                  <ThumbsUpIcon className="size-3" />
                  <span className="text-sm">12</span>
                </button>

                <button
                  type="button"
                  className="text-navy-100 flex items-center gap-2 rounded-lg px-2.5 py-1 bg-navy-600"
                >
                  <MessageCircleIcon className="size-3" />
                  <span className="text-sm">6</span>
                </button>
              </Card.Footer>
            </Card.Root>
          </Section.Content>
        </Section.Root>
      </main>
    </div>
  )
}
