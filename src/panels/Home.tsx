import { Icon28SyncOutline } from '@vkontakte/icons';
import {
  Group,
  List,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Placeholder,
  Spinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { FC, useEffect } from 'react';
import { StoryCard } from '../components/StoryCard';
import { useGetLatestStoriesQuery } from '../store/services/hacker-news';

export const Home: FC<NavIdProps> = ({ id }) => {
  const {
    data: storyIds,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    refetch,
  } = useGetLatestStoriesQuery(undefined, {
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (isSuccess && !storyIds) refetch();
  }, [isSuccess, refetch, storyIds]);

  useEffect(() => {
    if (isSuccess && !storyIds) refetch();
  }, [isSuccess, refetch, storyIds]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderButton
            onClick={refetch}
            aria-label="update"
            disabled={isFetching}
          >
            {isFetching ? <Spinner /> : <Icon28SyncOutline />}
          </PanelHeaderButton>
        }
      >
        LATEST NEWS
      </PanelHeader>

      {isLoading && <Spinner size="large" style={{ marginTop: 20 }} />}
      {isError && <Placeholder>Error loading news.</Placeholder>}
      {isSuccess && storyIds && storyIds.length ? (
        <Group>
          <List>
            {storyIds.slice(0, 100).map((id, listNumber) => (
              <StoryCard key={id} id={id} listNumber={listNumber + 1} />
            ))}
          </List>
        </Group>
      ) : (
        <Placeholder>List is empty.</Placeholder>
      )}
    </Panel>
  );
};
