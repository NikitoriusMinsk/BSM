import React, { forwardRef, ReactNode, RefObject, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
	onChange: (date: Date) => void;
	defaultDate?: number | Date;
	onlyDropdown?: boolean;
}

const DateInput: React.FC<DateInputProps> = (props) => {
	const { onChange, defaultDate, onlyDropdown } = props;
	const [startDate, setStartDate] = useState<Date>(
		defaultDate ? new Date(defaultDate) : new Date()
	);

	function handleChange(date: Date) {
		setStartDate(date);
		onChange(date);
	}

	return (
		<DatePicker
			onChange={handleChange}
			selected={startDate}
			popperClassName={
				onlyDropdown ? "datePickerPopperRelative" : "datePickerPopper"
			}
			enableTabLoop={false}
			wrapperClassName={onlyDropdown ? "dateWrapperHidden" : undefined}
			open={onlyDropdown}
			dateFormat={"dd.MM.yy"}
		/>
	);
};

export default DateInput;
