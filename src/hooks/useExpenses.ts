import { useState, useEffect } from "react";
import { Expense } from "../model/Expense";
import { getExpenses } from "../services/expense-service";

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getExpenses()
      .then((response) => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));            
  },[]);

  return {expenses, error, isLoading}
}

export default useExpenses;