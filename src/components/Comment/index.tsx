import { Button, Div, Gradient, Spinner, Text } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { useGetCommentByIdQuery } from '../../store/services/hacker-news';
import { isDeletedComment } from '../../utils/types';

export const Comment = ({ id, update }: { id: number; update: boolean }) => {
  const [showChildren, setShowChildren] = useState(false);
  const {
    data: comment,
    isSuccess,
    refetch,
    isLoading,
  } = useGetCommentByIdQuery(id);

  const toggleChildren = () => {
    setShowChildren((prev) => !prev);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch, update]);

  useEffect(() => {
    if (isSuccess && !comment) {
      refetch();
    }
  }, [comment, isSuccess, refetch]);

  return isLoading ? (
    <Div
      style={{
        maxWidth: 'min-content',
      }}
    >
      <Spinner />
    </Div>
  ) : isSuccess && comment ? (
    <Gradient
      mode="tint"
      to="top"
      style={{
        borderLeft: '2px solid #f0f0f0',
        padding: 10,
        marginBlock: 5,
        borderRadius: 8,
      }}
    >
      {isDeletedComment(comment) ? (
        <Text>The comment has been deleted</Text>
      ) : (
        <>
          <Text weight="2">{comment.by}</Text>
          <Text dangerouslySetInnerHTML={{ __html: comment.text }} />
          {comment.kids && comment.kids.length && (
            <>
              <Button size="s" onClick={toggleChildren}>
                {showChildren
                  ? 'Hide comments'
                  : `Show comments: ${comment.kids.length}`}
              </Button>
              {showChildren &&
                comment.kids.map((kidId) => (
                  <Comment key={kidId} id={kidId} update={update} />
                ))}
            </>
          )}
        </>
      )}
    </Gradient>
  ) : null;
};
