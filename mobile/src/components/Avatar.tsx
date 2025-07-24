import { Avatar as LibAvatar } from "@kolking/react-native-avatar";
import { useMemo } from "react";

const Avatar = ({ name }: { name: string }) => {
  const color = useMemo(() => {
    return stringToColor(name);
  }, [name]);

  return <LibAvatar name={name} size={52} color={color} />;
};

const stringToColor = (str: string) => {
  let hash = 0;

  // Генерируем хэш из строки
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Преобразуем хэш в RGB
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  // Нормализуем значения, чтобы избежать слишком тёмных цветов
  const normalizedR = Math.max(50, r); // Минимум 50 для R, G, B
  const normalizedG = Math.max(50, g);
  const normalizedB = Math.max(50, b);

  return `rgb(${normalizedR}, ${normalizedG}, ${normalizedB})`;
};

export default Avatar;
