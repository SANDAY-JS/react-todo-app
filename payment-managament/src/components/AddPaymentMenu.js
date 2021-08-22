import React, { useEffect, useState } from "react";
import { usePayment } from "../StateProvider";
import "./css/AddPaymentMenu.css";

export default function AddPaymentMenu() {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("train");
  const [details, setDetails] = useState("");
  const types = ["train", "shopping", "coffee", "other"];

  useEffect(() => {
    console.table(type);
  }, [type]);

  const {
    openAddPaymentMenu,
    setOpenAddPaymentMenu,
    addPayment,
  } = usePayment();

  const handleAddPaymentMenu = () => {
    setOpenAddPaymentMenu(!openAddPaymentMenu);
  };

  const handleAddPayment = () => {
    addPayment(amount, type, details);
    setAmount(0);
    setType("train");
    setDetails("");
  };

  return (
    openAddPaymentMenu && (
      <div className="addPaymentMenu">
        <form onSubmit={handleAddPayment}>
          <div className="addPaymentMenu__amount">
            <p>Amount</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="addPaymentMenu__select">
            <p>Type</p>
            <select onChange={(e) => setType(e.target.value)}>
              {types.map((type) => {
                return (
                  <option value={type} key={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="addPaymentMenu__amount">
            <p>Details</p>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="addPaymentMenu__btnContainer">
            <button type="submit" onClick={handleAddPayment}>
              Add
            </button>
            <button onClick={handleAddPaymentMenu}>Cancel</button>
          </div>
        </form>
      </div>
    )
  );
}
