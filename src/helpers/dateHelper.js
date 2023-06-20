const timeDifference = targetTime => {
  const currentTime = new Date();
  const difference = currentTime - targetTime;

  const millisecondsPerMinute = 60000;
  const millisecondsPerHour = 3600000;
  const millisecondsPerDay = 86400000;

  const days = Math.floor(difference / millisecondsPerDay);
  const hours = Math.floor(
    (difference % millisecondsPerDay) / millisecondsPerHour,
  );
  const minutes = Math.floor(
    (difference % millisecondsPerHour) / millisecondsPerMinute,
  );

  if (days > 0) {
    return `${days} d. ago`;
  } else if (hours > 0) {
    return `${hours} h. ago`;
  } else {
    return `${minutes} min ago`;
  }
};

export default timeDifference;
