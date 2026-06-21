import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ThumbsUpIcon } from "lucide-react"
import type { ComponentProps, MouseEvent } from "react"
import type z from "zod"
import type { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions"
import { toggleLike } from "@/http/toggle-like"
import { Button } from "./button"

interface LikeButtonProps extends ComponentProps<"button"> {
  issueId: string
  initialLikes: number
  initialLiked?: boolean
}

type IssueInteractionResponse = z.infer<typeof IssueInteractionsResponseSchema>

export function LikeButton({
  initialLikes,
  issueId,
  initialLiked = false,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient()

  const { mutate: onToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueriesData<IssueInteractionResponse>(
        {
          queryKey: ["issue-like"],
        },
      )

      queryClient.setQueriesData<IssueInteractionResponse>(
        { queryKey: ["issue-like"] },
        (oldValue) => {
          if (!oldValue) {
            return undefined
          }

          return {
            ...oldValue,
            interactions: oldValue?.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                }
              }

              return interaction
            }),
          }
        },
      )

      return { previousData }
    },
    onError: async (_error, _params, context) => {
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData<IssueInteractionResponse>(queryKey, data)
        }
      }
    },
  })

  const liked = initialLiked

  function handleToggleLike(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation() //isso evita que o click no botão se propague pelo card que esta por trás deste botão

    onToggleLike()
    return
  }

  return (
    <Button
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500 cursor-pointer"
      aria-label={liked ? "Unlike" : "Like"}
      disabled={isPending}
      onClick={handleToggleLike}
      {...props}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  )
}
