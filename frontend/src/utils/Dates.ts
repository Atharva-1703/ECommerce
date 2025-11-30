import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

export function getExpectedDeliveryDate(): {
  date: string;
  label: string;
} {
  const randomDays = Math.floor(Math.random() * (7 - 3 + 1)) + 3;

  const delivery = dayjs().add(randomDays, "day");

  return {
    date: delivery.toISOString(),
    label: `Expected delivery by ${delivery.format("MMM D")}`,
  };
}

export const getFormattedDate = (UTCDate: string) => {
  return dayjs(UTCDate).format("D MMM,ddd");
};

export const getAge=(UTCDate: string) => {
  return dayjs(UTCDate).fromNow();
}