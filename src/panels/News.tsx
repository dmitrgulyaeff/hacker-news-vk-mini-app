import { Icon28SyncOutline } from '@vkontakte/icons';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  Group,
  Header,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  Placeholder,
  Spacing,
  Spinner,
  Text,
} from '@vkontakte/vkui';
import React, { useState } from 'react';
import { Comment } from '../components/Comment';
import { useGetStoryByIdQuery } from '../store/services/hacker-news';

export const News: React.FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<'id'>();
  const [update, setUpdate] = useState(false);
  const {
    data: story,
    isSuccess,
    refetch,
    isLoading,
    isFetching,
  } = useGetStoryByIdQuery(Number(params?.id), {
    pollingInterval: 60000,
    skip: Number.isNaN(Number(params?.id)),
  });

  const handleRefresh = () => {
    refetch();
    setUpdate((prev) => !prev);
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <>
            <PanelHeaderBack onClick={() => routeNavigator.back()} />
            <PanelHeaderButton
              onClick={handleRefresh}
              aria-label="update"
              disabled={isFetching}
            >
              {isFetching ? <Spinner /> : <Icon28SyncOutline />}
            </PanelHeaderButton>
          </>
        }
      >
        {story?.title || ''}
      </PanelHeader>

      {isLoading ? (
        <Spinner size="large" />
      ) : story ? (
        <Group>
          <Header mode="secondary">
            NEWS DETAILS
            <Link href={story.url} target="_blank">
              <Text weight="2">{story.title}</Text>
            </Link>
            <Spacing size={16} />
            <Text>Author: {story.by}</Text>
            <Text>
              Date: {new Date(story.time * 1000).toLocaleDateString()}
            </Text>
            <Text>Rating: {story.score}</Text>
            <Text>Comments Count: {story.descendants}</Text>
          </Header>

          {story.kids &&
            story.kids.map((kidId) => (
              <Comment key={kidId} id={kidId} update={update} />
            ))}
        </Group>
      ) : (
        isSuccess && <Placeholder>Новость не найдена.</Placeholder>
      )}
    </Panel>
  );
};
