import ExpenseList from "../../components/ExpenseList";
import useExpenses from "../../hooks/useExpenses";
import { Expense } from "../../model/Expense";
import DashboardStatus from "./DashboardStatus";

const Dashboard = () => {
  const { email } = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedUser = email;
  const { expenses, error, isLoading } = useExpenses();
  const totalExpenses = expenses.reduce((acc: number, expense: Expense) => acc + expense.amount, 0) 
  
  return (
    <div className="container">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <DashboardStatus user={loggedUser} total={totalExpenses}/>
      <ExpenseList expenses={expenses}/>
    </div>
  )
}
export default Dashboard;