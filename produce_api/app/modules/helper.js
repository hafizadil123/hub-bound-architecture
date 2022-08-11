const strtotime = (dateStr) => {
  // var datum = Date.parse(dateStr);
  // console.log('datum', datum)
  // return datum/1000;

  const date = new Date(dateStr);

  // milliseconds timestamp
  const timestamp = date.getTime();

  // If you need to convert milliseconds to seconds divide by 1000
  return Math.floor(date.getTime() / 1000);
};

const helper = {
	strtotime:strtotime
};
module.exports = helper;