import React from 'react';

type Props = {
  createdAt: string;
};

function RecordTime({ createdAt }: Props) {
  const toPrettyStr = (when: string | number, createdDate: Date) => (
    `${when}, ${createdDate.toLocaleTimeString()}, i-GMT${createdDate.getTimezoneOffset() / 60}`
  );

  const ONE_DAY = 24 * 60 * 60 * 1000;

  const created = () => {
    const createdDate = new Date(createdAt);
    const createdMilliseconds = createdDate.getTime();
    const currentMilliseconds = new Date().setHours(23, 59, 59);
    const diffDays = (currentMilliseconds - createdMilliseconds) / ONE_DAY;
    if (diffDays <= 1) return toPrettyStr('Сегодня', createdDate);

    if (diffDays <= 2) return toPrettyStr('Вчера', createdDate);

    const count = Math.ceil(diffDays);
    if (count === 1) return toPrettyStr('1 день назад', createdDate);
    if (count > 1 && count < 5) return toPrettyStr(`${count} дня назад`, createdDate);
    return toPrettyStr(`${count} дней назад`, createdDate);
  };

  return <time className="text text_type_main-default text_color_inactive">{created()}</time>;
}

export default RecordTime;
