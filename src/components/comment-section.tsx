import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { commentsOfVideoOptions } from "@/utils/comments";
import { formatYouTubeViewCount, getYouTubePublishedDate } from "@/lib/utils";

interface CommentSectionProps {
  videoId: string;
  // channelImageUrl: string;
}

export function CommentSection({ videoId }: CommentSectionProps) {
  const { data: comments } = useSuspenseQuery(commentsOfVideoOptions(videoId));

  // const [commentText, setCommentText] = useState("");
  // // ?
  // const [isCommentFocused, setIsCommentFocused] = useState(false);

  const commentCount = comments.items?.[0]?.snippet?.totalReplyCount;

  return (
    <div className="mt-6">
      <h2 className="font-medium text-xl mb-4">{commentCount || 0} Comments</h2>

      <div className="space-y-4">
        {comments &&
          comments?.items?.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  // alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
                />
                <AvatarFallback>
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {getYouTubePublishedDate(
                      comment.snippet.topLevelComment.snippet.publishedAt
                    )}
                  </span>
                </div>
                <p className="text-sm mt-1">
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {formatYouTubeViewCount(
                        comment.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  {/* <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Reply
                </Button> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    // <p>Hello World</p>
  );
}
