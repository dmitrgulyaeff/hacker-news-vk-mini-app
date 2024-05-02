/**
 * Тип для истории (story)
 * @property {number} id - Уникальный идентификатор истории.
 * @property {string} by - Автор истории.
 * @property {number} descendants - Количество комментариев к истории.
 * @property {number[]} kids - Идентификаторы комментариев истории.
 * @property {number} score - Рейтинг истории.
 * @property {number} time - Время создания истории в формате Unix time.
 * @property {string} title - Заголовок истории.
 * @property {'story'} type - Тип элемента, в данном случае 'story'.
 * @property {string} [url] - Необязательный URL внешней статьи.
 */
export type TStory = {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: 'story';
  url?: string;
};

/**
 * Тип для комментария
 * @property {number} id - Уникальный идентификатор комментария.
 * @property {string} by - Автор комментария.
 * @property {number[]} kids - Идентификаторы дочерних комментариев.
 * @property {number} parent - Идентификатор родительского элемента.
 * @property {string} text - HTML текст комментария.
 * @property {number} time - Время создания комментария в формате Unix time.
 * @property {'comment'} type - Тип элемента, в данном случае 'comment'.
 */
type TExistComment = {
  id: number;
  by: string;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: 'comment';
};

/**
 * Тип для удалённого комментария
 * @property {boolean} deleted - Флаг, что комментарий был удалён.
 * @property {number} id - Уникальный идентификатор комментария.
 * @property {number} parent - Идентификатор родительского элемента.
 * @property {number} time - Время создания комментария в формате Unix time.
 * @property {'comment'} type - Тип элемента, в данном случае 'comment'.
 */
type TDeletedComment = {
  deleted: true;
  id: number;
  parent: number;
  time: number;
  type: 'comment';
};

export type TComment = TExistComment | TDeletedComment;

export const isDeletedComment = (
  comment: TComment
): comment is TDeletedComment =>
  Object.prototype.hasOwnProperty.call(comment, 'deleted');
