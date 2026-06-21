import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ThumbsUpIcon } from "lucide-react"
import type { ComponentProps } from "react"
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

  const { mutate: handleToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueryData<IssueInteractionResponse>([
        "issue-like",
        issueId,
      ])

      queryClient.setQueryData<IssueInteractionResponse>(
        ["issue-like", issueId],
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
        queryClient.setQueryData<IssueInteractionResponse>(
          ["issue-like", issueId],
          context.previousData,
        )
      }
    },
  })

  const liked = initialLiked

  return (
    <Button
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500 cursor-pointer"
      aria-label={liked ? "Unlike" : "Like"}
      disabled={isPending}
      onClick={() => handleToggleLike()}
      {...props}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  )
}
