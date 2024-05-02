import { FC, useEffect } from 'react';
import { useOnScreen } from '../../hooks/useOnScreen';
import { useGetStoryByIdQuery } from '../../store/services/hacker-news';
import { ViewStorySkeleton } from './ViewStorySkeleton';
import { ViewStoryCard } from './ViewStory';

export const StoryCard: FC<{
  id: number;
  listNumber: number;
}> = ({ id, listNumber }) => {
  const { ref, isVisible } = useOnScreen({ rootMargin: '30%' });

  const {
    data: story,
    isSuccess,
    refetch,
  } = useGetStoryByIdQuery(id, {
    skip: !isVisible,
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (isSuccess && !story) {
      refetch();
    }
  }, [isSuccess, refetch, story]);

  return (
    <div ref={ref}>
      {story ? (
        <ViewStoryCard story={story} listNumber={listNumber} />
      ) : (
        <ViewStorySkeleton />
      )}
    </div>
  );
};
