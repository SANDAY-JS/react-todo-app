import { useEffect } from "react";
import "./App.css";
import AddPaymentMenu from "./components/AddPaymentMenu";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Table from "./components/Table";
import StateProvider, { useAuth } from "./StateProvider";

function App() {
  return (
    <div className="app">
      <Header />
      <Table />
      <AddPaymentMenu />
      <Footer />
    </div>
  );
}

export default App;
