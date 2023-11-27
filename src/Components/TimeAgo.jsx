import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const date = new Date(timestamp);
      const currentTime = new Date();
      const timeDifference = currentTime - date;
      const secondsDifference = Math.floor(timeDifference / 1000);

      let interval = Math.floor(secondsDifference / 31536000);

      if (interval >= 1) {
        setTimeAgo(`${interval} year${interval === 1 ? '' : 's'} ago`);
        return;
      }
      interval = Math.floor(secondsDifference / 2592000);
      if (interval >= 1) {
        setTimeAgo(`${interval} month${interval === 1 ? '' : 's'} ago`);
        return;
      }
      interval = Math.floor(secondsDifference / 86400);
      if (interval >= 1) {
        setTimeAgo(`${interval} day${interval === 1 ? '' : 's'} ago`);
        return;
      }
      interval = Math.floor(secondsDifference / 3600);
      if (interval >= 1) {
        setTimeAgo(`${interval} hour${interval === 1 ? '' : 's'} ago`);
        return;
      }
      interval = Math.floor(secondsDifference / 60);
      if (interval >= 1) {
        setTimeAgo(`${interval} minute${interval === 1 ? '' : 's'} ago`);
        return;
      }
      setTimeAgo(`${Math.floor(secondsDifference)} second${Math.floor(secondsDifference) === 1 ? '' : 's'} ago`);
    };

    calculateTimeAgo();
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};


TimeAgo.propTypes = {
  timestamp: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
};
export default TimeAgo;
