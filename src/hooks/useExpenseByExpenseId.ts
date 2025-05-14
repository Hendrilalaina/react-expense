import { useEffect, useState } from "react"
import { Expense } from "../model/Expense"
import { getExpenseByExpenseId } from "../services/expense-service";

const useExpenseByExpenseId = (expenseId: string) => {
  const [expense, setExpense] = useState<Expense | undefined>();
  const [errors, setErrors] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (expenseId) {
      setLoading(true);
      getExpenseByExpenseId(expenseId)
        .then((response) => setExpense(response.data))
        .catch((error) => {
          setErrors(error.message);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return {expense, errors, setErrors, isLoading, setLoading};
 }

 export default useExpenseByExpenseId;