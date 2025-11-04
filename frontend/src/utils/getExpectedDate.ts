export function getExpectedDeliveryDate(): {
  date: string;
  label: string;
} {
  const today = new Date();

  const randomDays = Math.floor(Math.random() * (7 - 3 + 1)) + 3;

  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + randomDays);

  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

  return {
    date: deliveryDate.toISOString(), 
    label: `Expected delivery by ${formattedDate}`,
  };
}
