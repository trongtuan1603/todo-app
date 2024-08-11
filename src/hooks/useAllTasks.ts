import moment, {Moment} from 'moment';
import {useState} from 'react';
import {DateData} from 'react-native-calendars';

const useAllTasks = () => {
  const [date, setDate] = useState<Moment>(moment());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleSelectDate = (val: Date) => {
    setShowDatePicker(false);
    setDate(moment(val));
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleHideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handlePrevDate = () => {
    const prevDate = date.clone().add(-1, 'days');
    setDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = date.clone().add(1, 'days');
    setDate(nextDate);
  };

  return {
    date,
    showDatePicker,
    handleSelectDate,
    handleShowDatePicker,
    handleHideDatePicker,
    handlePrevDate,
    handleNextDate,
  };
};

export default useAllTasks;
