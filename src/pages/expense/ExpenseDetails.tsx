import { Link, useNavigate, useParams } from "react-router-dom";
import CurrencyUtils from "../../utils/CurrencyUtils";
import DateUtils from "../../utils/DateUtils";
import useExpenseByExpenseId from "../../hooks/useExpenseByExpenseId";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useState } from "react";
import { deleteExpenseByExpenseId } from "../../services/expense-service";

const ExpenseDetails = () => {
  const { expenseId } = useParams<{ expenseId: string }>();
  const { expense, errors, setErrors, isLoading, setLoading } = useExpenseByExpenseId(expenseId!);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowDialog(false);
  }

  const handleConfirm = () => {
    setLoading(true);
    deleteExpenseByExpenseId(expenseId!)
      .catch((error) => setErrors(error.message))
      .finally(() => {
        setShowDialog(false);
        setLoading(false);
        navigate("/");
      })
  }
  return (
    <div className="container mt-2">
      {isLoading && <p>Loading...</p>}
      {errors && <p className="text-danger">{errors}</p>}
      <div className="d-flex flex-row-reverse mb-2">
        <button className="btn btn-sm btn-danger" onClick={() => setShowDialog(true)}>Delete</button>
        <button className="btn btn-sm btn-warning mx-2" onClick={() => navigate(`/edit/${expenseId}`)}>Edit</button>
        <Link className="btn btn-sm btn-secondary" to='/'>Back</Link>
      </div>
      <div className="card">
        <div className="card-body p-3">
          <table className="table table-borderless table-responsive">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{expense ? expense.name : "N/A"}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{expense ? expense.category : "N/A"}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>{expense ? CurrencyUtils.formatToMG(expense.amount) : "N/A"}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{expense ? DateUtils.formatDateString(expense.date) : "N/A"}</td>
              </tr>
              <tr>
                <th>Note</th>
                <td>{expense ? expense.note : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog title="Confirm" message="Want you to delete this?" show={showDialog} onConfirm={handleConfirm} onClose={handleClose}/>
    </div>
  )
}

export default ExpenseDetails;