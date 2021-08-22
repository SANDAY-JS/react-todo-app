import React, { useEffect, useState } from "react";
import { usePayment } from "../StateProvider";

export default function TableLine({
  amount,
  type,
  details,
  showChecks,
  singleData,
}) {
  const [clicked, setClicked] = useState(false);
  const { data } = usePayment();

  useEffect(() => {
    const updatedChecked = { checked: clicked };
    Object.assign(singleData, updatedChecked);
    console.log(data);
  }, [clicked]);

  const checkData = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <tr>
        <td>
          {showChecks && <input type="checkbox" onChange={checkData}></input>}¥
          {amount}
        </td>
        <td>{type}</td>
        <td>{details}</td>
      </tr>
    </>
  );
}
