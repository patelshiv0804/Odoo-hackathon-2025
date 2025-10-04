import React, { useState } from 'react';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import '../styles/EmployeeView.css';

export default function EmployeeView() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      employee: 'John Doe',
      description: 'Client dinner',
      date: '2025-10-01',
      category: 'Food',
      paidBy: 'Personal Card',
      remarks: 'Met with ABC Corp',
      amount: 150.00,
      currency: 'USD',
      status: 'Draft'
    },
    {
      id: 2,
      employee: 'John Doe',
      description: 'Flight to NYC',
      date: '2025-09-28',
      category: 'Travel',
      paidBy: 'Company Card',
      remarks: 'Business trip',
      amount: 450.00,
      currency: 'USD',
      status: 'Waiting Approval'
    },
    {
      id: 3,
      employee: 'John Doe',
      description: 'Hotel stay',
      date: '2025-09-25',
      category: 'Accommodation',
      paidBy: 'Company Card',
      remarks: 'Conference in Boston',
      amount: 320.00,
      currency: 'USD',
      status: 'Approved'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const calculateTotals = () => {
    const toSubmit = expenses
      .filter(e => e.status === 'Draft')
      .reduce((sum, e) => sum + e.amount, 0);

    const waitingApproval = expenses
      .filter(e => e.status === 'Waiting Approval' || e.status === 'Submitted')
      .reduce((sum, e) => sum + e.amount, 0);

    const approved = expenses
      .filter(e => e.status === 'Approved')
      .reduce((sum, e) => sum + e.amount, 0);

    return { toSubmit, waitingApproval, approved };
  };

  const totals = calculateTotals();

  const handleNewExpense = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleSaveExpense = (formData) => {
    if (editingExpense) {
      setExpenses(expenses.map(exp =>
        exp.id === editingExpense.id
          ? { ...exp, ...formData }
          : exp
      ));
    } else {
      const newExpense = {
        id: Date.now(),
        employee: 'John Doe',
        ...formData,
        amount: parseFloat(formData.amount),
        status: 'Draft'
      };
      setExpenses([...expenses, newExpense]);
    }
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleSubmitExpense = (expenseId) => {
    setExpenses(expenses.map(exp =>
      exp.id === expenseId
        ? { ...exp, status: 'Waiting Approval' }
        : exp
    ));
  };

  const handleUploadReceipt = () => {
    alert('Upload receipt functionality');
  };

  return (
    <div className="employee-view">
      <div className="page-header">
        <div>
          <h1>My Expenses</h1>
          <p className="page-description">Manage and track your expense submissions</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleUploadReceipt}>
            Upload Receipt
          </button>
          <button className="btn btn-primary" onClick={handleNewExpense}>
            + New Expense
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-label">To Submit</div>
          <div className="summary-value">${totals.toSubmit.toFixed(2)}</div>
          <div className="summary-status status-draft">Draft</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Waiting Approval</div>
          <div className="summary-value">${totals.waitingApproval.toFixed(2)}</div>
          <div className="summary-status status-waiting">Pending</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Approved</div>
          <div className="summary-value">${totals.approved.toFixed(2)}</div>
          <div className="summary-status status-approved">Completed</div>
        </div>
      </div>

      <div className="card">
        <ExpenseTable
          expenses={expenses}
          onEdit={handleEditExpense}
          onSubmit={handleSubmitExpense}
        />
      </div>

      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onSave={handleSaveExpense}
          onCancel={() => {
            setShowForm(false);
            setEditingExpense(null);
          }}
        />
      )}
    </div>
  );
}
