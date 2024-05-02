import { RichCell } from '@vkontakte/vkui';
import { Caption } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Skeleton from '../Skeleton';

export function ViewStorySkeleton() {
  return (
    <RichCell
      before={<Skeleton style={{ width: '24px', height: '24px' }} />}
      after={<Skeleton style={{ width: '70px', height: '20px' }} />}
      text={<Skeleton style={{ width: '100px', height: '15px' }} />}
      caption={
        <Caption level="1" weight="1" style={{ display: 'block' }}>
          <Skeleton style={{ width: '150px', height: '15px' }} />
        </Caption>
      }
    >
      <Skeleton
        style={{
          width: '100%',
          height: '22px',
          marginTop: '5px',
        }}
      />
    </RichCell>
  );
}
