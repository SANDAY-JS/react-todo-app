import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

const AuthProvider = createContext();
const DateProvider = createContext();
const PaymentProvider = createContext();

export const useAuth = () => {
  return useContext(AuthProvider);
};
export const useDate = () => {
  return useContext(DateProvider);
};
export const usePayment = () => {
  return useContext(PaymentProvider);
};

export default function StateProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [openAddPaymentMenu, setOpenAddPaymentMenu] = useState(false);
  const [dayTotal, setDayTotal] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPaymentsData();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setPayments(data.map((item) => item.amount));
    console.log(db.collection("payments").doc("data").data);
    if (db.collection("payments").doc("data").data === undefined)
      return initializeDatabase();
    updateDatabase();
  }, [data]);

  // Auth Methods
  const signup = async (email, password, name) => {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      return await result.user.updateProfile({ displayName: name });
    } catch (e) {
      return console.error(e);
    }
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateName = (name) => {
    return currentUser.updateName(name);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  // Firebase Methods
  const getPaymentsData = () => {
    const docRef = db.collection("payments").doc("current");

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const initializeDatabase = () => {
    db.collection("payments")
      .add({
        data: data,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    console.log("in initializeDatabase()");
  };

  const updateDatabase = () => {
    console.log("in updateDatabase()");
    db.collection("payments").doc("data").set({ data: data });
  };

  // Payment Methods
  const addPayment = (newPayment, type, details) => {
    setOpenAddPaymentMenu(!openAddPaymentMenu);

    if (newPayment < 0 || isNaN(newPayment)) return;

    const updatedTotal = [newPayment, ...payments];
    calcTotalAmount(updatedTotal);
    storeData(newPayment, type, details);
  };

  const filterPayment = (showCheckboxes) => {
    const filteredData = data.filter((item) => !item.checked);
    setData(filteredData);
    calcTotalAmount(filteredData.map((item) => item.amount));
    showCheckboxes(false);
  };

  const calcTotalAmount = (updatedTotal) => {
    calcDayTotal(updatedTotal);
    calcWeekTotal(updatedTotal);
    // calcMonthTotal(updatedTotal);
  };

  const calcDayTotal = (updatedTotal) => {
    if (updatedTotal.length === 0) {
      return setDayTotal(0);
    }

    const newTotal = updatedTotal?.reduce((total, current) => {
      return current + total;
    }, 0);

    updatedTotal.length > 1 ? setDayTotal(newTotal) : setDayTotal(updatedTotal);
  };

  const calcWeekTotal = (updatedTotal) => {
    const currentWeekDates = getCurrentWeekDates();

    const currentTotalArr = getCurrentWeekTotal(currentWeekDates, updatedTotal);

    if (updatedTotal.length === 0) {
      // return setWeekTotal(currentTotalArr);
      return setWeekTotal(0);
    }
    if (updatedTotal.length <= 1) {
      // const newTotal = currentTotalArr.concat(updatedTotal);
      return setWeekTotal(currentTotalArr);
    }

    const newTotal = currentTotalArr.reduce(
      (total, current) => total + current
    );

    setWeekTotal(newTotal);
  };

  const getCurrentWeekDates = () => {
    let currentWeekDates = [];
    const today = month + "" + date;

    for (let i = 0; i < 7; i++) {
      const date = (today - i).toString();
      if (date.length < 4) {
        const newDate = "0" + date;
        currentWeekDates.push(newDate);
        continue;
      }
      currentWeekDates.push(date);
    }
    return currentWeekDates;
  };

  const getCurrentWeekTotal = (dates, currentData) => {
    let filteredData = [currentData[0]];

    dates.forEach((date) => {
      for (let i = 0; i < data.length; i++) {
        date === data[i].id.slice(0, 4).toString() &&
          filteredData.push(data[i].amount);
      }
    });
    return filteredData;
  };

  // const calcMonthTotal = (updatedTotal) => {
  // if (updatedTotal.length === 0) {
  //   return setMonthTotal(0);
  // }

  //   updatedTotal.reduce((total, current) => {
  //     return setDayTotal(total + current);
  //   });
  // };

  const storeData = (amount, type, details) => {
    setData([
      { amount: amount, type: type, details: details, checked: false, id: now },
      ...data,
    ]);
  };

  const d = new Date();

  // const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const month = d.getMonth() + 1;
  const date = d.getDate().toString().padStart(2, "0");
  const week = date - 7;
  const now = month + "" + date + "" + Math.random();

  // const monthsData = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const currentMonth = monthsData[d.getMonth()]; // <- i can do number instead.

  const authValue = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateName,
    updateEmail,
    updatePassword,
  };
  const dateValue = {
    month,
    date,
    week,
  };
  const paymentValue = {
    data,
    setData,
    payments,
    setPayments,
    openAddPaymentMenu,
    setOpenAddPaymentMenu,
    addPayment,
    filterPayment,
    dayTotal,
    weekTotal,
    monthTotal,
    setDayTotal,
    setWeekTotal,
    setMonthTotal,
  };

  return (
    <AuthProvider.Provider value={authValue}>
      <DateProvider.Provider value={dateValue}>
        <PaymentProvider.Provider value={paymentValue}>
          {!loading && children}
        </PaymentProvider.Provider>
      </DateProvider.Provider>
    </AuthProvider.Provider>
  );
}
