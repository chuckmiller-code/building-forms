import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ExpenseTracker = () => {
  const [expense, setExpense] = useState([
    { id: 1, description: "Bug 1", amount: 4, category: "grocery" },
    { id: 2, description: "Bug 2", amount: 4, category: "home" },
  ]);

  const [filter, setFilter] = useState("default");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id: number) => {
    setExpense(expense.filter((expense) => expense.id !== id));
  };

  const filteredExpenses =
    filter === "default"
      ? expense
      : expense.filter((row) => row.category === filter);

  // copied code

  const schema = z.object({
    name: z.string().min(3, { message: "Description must be at least 3 characters." }),
    age: z
      .number({ invalid_type_error: "Age field is required." })
      .min(18, { message: "Age must be at least 18." }),
  });
  
  type FormData = z.infer<typeof schema>;
  
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<FormData>({ resolver: zodResolver(schema) });
  
    const onSubmit = (data: FieldValues) => {
      console.log(data);
    };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Description
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="number"
            className="form-control"
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <button disabled={!isValid} className="btn btn-primary mb-5" type="submit">
          Submit
        </button>
      </form>
      <select
        className="form-select mb-3"
        aria-label="Default select example"
        value={filter}
        onChange={handleChange}
      >
        <option value="default">Show all categories</option>
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
          {filteredExpenses.map((row) => (
            <tr key={row.id}>
              <td>{row.description}</td>
              <td>{row.amount}</td>
              <td>{row.category}</td>
              <td>
                < button
                  className="btn btn-danger mb-3"
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
