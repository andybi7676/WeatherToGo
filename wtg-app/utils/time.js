export const SEGMENT_MINUTES = 3 * 60
export const SEGMENT_MILLISECONDS = 3 * 60 * 60 * 1000

export const getRoundedTimeStamp = () => {
  const now = new Date();
  const currentTimeStamp = Date.parse(now);
  const baseTimeStamp = Date.parse(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  const currentRoundedTimeStamp = Math.floor((currentTimeStamp - baseTimeStamp)/ SEGMENT_MILLISECONDS) * SEGMENT_MILLISECONDS + baseTimeStamp;
  return currentRoundedTimeStamp;
}

export const getSegTime = (currentValue, currentRoundedTimeStamp) => {
  const segDate = new Date(currentRoundedTimeStamp + SEGMENT_MILLISECONDS * currentValue)
  return {
    timeString: segDate.toTimeString(),
    year: segDate.getFullYear(),
    month: segDate.getMonth()+1,
    date: segDate.getDate(),
    hours: segDate.getHours(),
    minutes: segDate.getMinutes(),
  }
}

export const getTime = (milliSecondTimeStamp) => {
  const segDate = new Date(milliSecondTimeStamp)
  return {
    timeString: segDate.toTimeString(),
    year: segDate.getFullYear(),
    month: segDate.getMonth()+1,
    date: segDate.getDate(),
    hours: segDate.getHours(),
    minutes: segDate.getMinutes(),
  }
}