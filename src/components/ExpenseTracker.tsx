import { useState } from "react";
//uuid?

const ExpenseTracker = () => {
  const [expense, setExpense] = useState([
    { id: 1, description: "Bug 1", amount: 4, category: "grocery" },
    { id: 2, description: "Bug 2", amount: 4, category: "home" },
  ]);

  const [filter, setFilter] = useState("grocery");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id: number) => {
    setExpense(expense.filter((expense) => expense.id !== id));
  };

  return (
    <>
      <select
        className="form-select mb-3"
        aria-label="Default select example"
        value={filter}
        onChange={handleChange}
      >
        <option selected value="default">Show all categories</option>
        <option value="grocery">Grocery</option>
        <option value="home">Home</option>
      </select>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {expense.map((row) => (
            <tr key={row.id}>
              <td>{row.description}</td>
              <td>{row.amount}</td>
              <td>{row.category}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExpenseTracker;
