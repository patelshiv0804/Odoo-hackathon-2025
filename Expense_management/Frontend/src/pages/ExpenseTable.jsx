import '../styles/ExpenseTable.css';

export default function ExpenseTable({ expenses, onEdit, onSubmit }) {
  const handleEdit = (expense) => {
    if (expense.status === 'Draft') {
      onEdit(expense);
    }
  };

  const handleSubmit = (expenseId) => {
    onSubmit(expenseId);
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Draft': 'status-draft',
      'Submitted': 'status-submitted',
      'Waiting Approval': 'status-waiting',
      'Approved': 'status-approved',
      'Rejected': 'status-rejected'
    };
    return statusMap[status] || '';
  };

  return (
    <div className="expense-table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Description</th>
            <th>Date</th>
            <th>Category</th>
            <th>Paid By</th>
            <th>Remarks</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-data">No expenses found</td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.employee}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.paidBy}</td>
                <td>{expense.remarks}</td>
                <td>{expense.currency} {expense.amount.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(expense.status)}`}>
                    {expense.status}
                  </span>
                </td>
                <td>
                  {expense.status === 'Draft' && (
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEdit(expense)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleSubmit(expense.id)}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
