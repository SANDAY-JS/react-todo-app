import React, { useEffect, useRef, useState } from "react";
import { usePayment } from "../StateProvider";
import "./css/Table.css";
import TableLine from "./TableLine";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTrash } from "react-icons/bi";

export default function Table() {
  // Variables
  const {
    data,
    filterPayment,
    payments,
    dayTotal,
    weekTotal,
    monthTotal,
    openAddPaymentMenu,
    setOpenAddPaymentMenu,
  } = usePayment();

  const [selected, setSelected] = useState(0);
  const [showChecks, setShowChecks] = useState(false);
  const typeOfTime = useRef(new Array());
  const timeArray = ["Today", "Week", "Month"];

  // useEffects
  useEffect(() => {
    // console.log("selected changed>>>", selected);
    changeSelectedStyles(selected);
  }, [selected]);

  // useEffect(() => {
  //   console.log("payments changed>>>", payments);
  //   console.log("daytotal changed>>>", dayTotal);
  // }, [payments, dayTotal]);

  // Methods
  const changeSelectedStyles = (num) => {
    removeAllStylesFromSelected();
    addStylesToSelected(num);
  };

  const addStylesToSelected = (num) => {
    typeOfTime.current[num].classList.add("selected");
  };
  const removeAllStylesFromSelected = () => {
    typeOfTime.current.forEach((type) => type.classList.remove("selected"));
  };

  const showTotalAmount = () => {
    if (selected === 0) return dayTotal;
    if (selected === 1) return weekTotal;
    if (selected === 2) return monthTotal;
  };

  const showAddPaymentMenu = () => {
    setOpenAddPaymentMenu(!openAddPaymentMenu);
  };

  return (
    <div className="table">
      <table>
        <tbody>
          <tr>
            {timeArray.map((time, i) => (
              <th
                ref={(element) =>
                  typeOfTime.current.length < 3 &&
                  typeOfTime.current.push(element)
                }
                onClick={() => setSelected(i)}
                key={time}
              >
                {time}
              </th>
            ))}
          </tr>
          <tr>
            <th>amount</th>
            <th>type</th>
            <th>details</th>
          </tr>
          <tr>
            <th>¥{showTotalAmount()}</th>
            <th></th>
            <th></th>
          </tr>
          {data.map((item, i) => (
            <TableLine
              amount={item.amount}
              type={item.type}
              details={item.details}
              showChecks={showChecks}
              singleData={item}
              key={i}
            />
          ))}
          <tr className="table__initial-line">
            <td>
              <BiDotsHorizontalRounded
                className="dots"
                onClick={() => setShowChecks(!showChecks)}
              />
              {showChecks && (
                <BiTrash onClick={() => filterPayment(setShowChecks)} />
              )}
            </td>
            <td></td>
            <td>
              <AiFillPlusCircle className="add" onClick={showAddPaymentMenu} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
