import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Caption, RichCell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { DEFAULT_VIEW_PANELS } from '../../routes';
import { TStory } from '../../utils/types';

export function ViewStoryCard({
  story: { id, title, score, by, time},
  listNumber
}: {
  story: TStory;
  listNumber: number
}) {
  const routeNavigator = useRouteNavigator();

  const handleClick = () => {
    routeNavigator.push(`/${DEFAULT_VIEW_PANELS.NEWS}/${id}`);
  };

  return (
    <RichCell
      before={`${listNumber}.`}
      key={id}
      after={`Rating: ${score}`}
      text={`${by}`}
      caption={
        <Caption level="1" weight="1" style={{ display: 'block' }}>
          {new Date(time * 1000).toLocaleString('ru-RU')}
        </Caption>
      }
      onClick={handleClick}
    >
      {title}
    </RichCell>
  );
}
