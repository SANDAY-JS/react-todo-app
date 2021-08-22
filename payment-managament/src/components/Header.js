import React, { useEffect, useState } from "react";
import "./css/Header.css";
import { useAuth, useDate, usePayment } from "../StateProvider";
import { GrNext, GrPrevious } from "react-icons/gr";
import Nav from "./Nav";

export default function Header() {
  const { currentUser } = useAuth();
  const { month, date, week } = useDate();
  const { dayTotal, weekTotal, monthTotal } = usePayment();
  const [error, setError] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [mainDate, setMainDate] = useState(month + "/" + date);
  const [checkMonth, setCheckMonth] = useState({ prevDate: date });
  const [updatedMonth, setUpdatedMonth] = useState(month);
  const x = new Date();
  const basisDate = new Date(x);
  // const [dateFromMainDate, setDateFromMainDate] = useState(
  //   mainDate.toString().substr(-2).padStart(2, "0")
  // );

  useEffect(() => {
    console.log(`mainDate>>>`, mainDate.toString());
    // setDateFromMainDate(mainDate.toString().substr(-2).padStart(2, "0"));
  }, [mainDate]);

  const showPrevDay = () => {
    setClickCount(clickCount - 1);

    basisDate.setDate(basisDate.getDate() + (clickCount - 1));

    const stringDate = basisDate.toDateString();
    const prevDateNum = stringDate.slice(8, 11);

    const checkedMonth = checkMonthChange(prevDateNum);

    setMainDate(checkedMonth + "/" + prevDateNum);
  };
  const showNextDay = () => {
    setClickCount(clickCount + 1);

    basisDate.setDate(basisDate.getDate() + (clickCount + 1));

    const stringDate = basisDate.toDateString();
    const nextDateNum = stringDate.slice(8, 11);

    const checkedMonth = checkMonthChange(nextDateNum);

    setMainDate(checkedMonth + "/" + nextDateNum);
  };

  const checkMonthChange = (dateNum) => {
    setCheckMonth({ prevDate: dateNum });

    // If Month does not change...
    if (Math.abs(checkMonth.prevDate - dateNum) === 1) {
      if (parseInt(updatedMonth) === parseInt(month)) return month;
      return updatedMonth;
    }

    // If Month Changes
    // If Month carries-up
    if (parseInt(checkMonth.prevDate) > parseInt(dateNum)) {
      setUpdatedMonth(parseInt(updatedMonth + 1));
      return parseInt(updatedMonth + 1);
    }

    // If Month carries-down
    setUpdatedMonth(parseInt(updatedMonth - 1));
    return parseInt(updatedMonth - 1);
  };

  return (
    <div className="header">
      <Nav setError={setError} />
      {error && <p>{error}</p>}
      <div className="header__payment">
        <div className="date">
          <p>
            <GrPrevious onClick={showPrevDay} />
            {mainDate}
            <GrNext onClick={showNextDay} />
          </p>
          <p>¥{dayTotal}</p>
        </div>
        <div className="week">
          <p>
            {updatedMonth}/{week}~{mainDate}
          </p>
          <p>¥{weekTotal}</p>
        </div>
        <div className="month">
          <p>{updatedMonth}月</p>
          <p>¥{monthTotal}</p>
        </div>
      </div>
    </div>
  );
}
