import ExpensesForm from "../components/ExpensesForm";
import ExpensesList from "../components/ExpensesList";
import Margin from "../components/Margin";
import SelectMonth from "../components/SelectMonth";

const Home = () => {
  return (
    <>
      <ExpensesForm />
      <Margin />
      <SelectMonth />
      <Margin />
      <ExpensesList />
    </>
  );
};

export default Home;
