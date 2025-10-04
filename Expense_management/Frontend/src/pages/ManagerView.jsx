import React, { useState } from 'react';
import ManagerApprovalTable from './ManagerApprovalTable';
import '../styles/ManagerView.css';

export default function ManagerView() {
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      description: 'Client dinner',
      employee: 'John Doe',
      category: 'Food',
      status: 'Waiting Approval',
      amount: 150.00,
      currency: 'USD'
    },
    {
      id: 2,
      description: 'Flight to NYC',
      employee: 'John Doe',
      category: 'Travel',
      status: 'Waiting Approval',
      amount: 450.00,
      currency: 'USD'
    },
    {
      id: 3,
      description: 'Office supplies',
      employee: 'Jane Smith',
      category: 'Office Supplies',
      status: 'Waiting Approval',
      amount: 85.50,
      currency: 'USD'
    },
    {
      id: 4,
      description: 'Conference hotel',
      employee: 'Bob Johnson',
      category: 'Accommodation',
      status: 'Approved',
      amount: 320.00,
      currency: 'EUR'
    }
  ]);

  const handleApprove = (approvalId) => {
    setApprovals(approvals.map(approval =>
      approval.id === approvalId
        ? { ...approval, status: 'Approved' }
        : approval
    ));
  };

  const handleReject = (approvalId) => {
    setApprovals(approvals.map(approval =>
      approval.id === approvalId
        ? { ...approval, status: 'Rejected' }
        : approval
    ));
  };

  const pendingCount = approvals.filter(a => a.status === 'Waiting Approval').length;
  const approvedCount = approvals.filter(a => a.status === 'Approved').length;
  const rejectedCount = approvals.filter(a => a.status === 'Rejected').length;

  return (
    <div className="manager-view">
      <div className="page-header">
        <div>
          <h1>Approvals Dashboard</h1>
          {/* <p className="page-description">Review and approve expense requests</p> */}
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card pending-card">
          <div className="summary-label">Pending Approvals</div>
          <div className="summary-value">{pendingCount}</div>
        </div>
        <div className="summary-card approved-card">
          <div className="summary-label">Approved</div>
          <div className="summary-value">{approvedCount}</div>
        </div>
        <div className="summary-card rejected-card">
          <div className="summary-label">Rejected</div>
          <div className="summary-value">{rejectedCount}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Pending Approvals</h2>
        </div>
        <ManagerApprovalTable
          approvals={approvals}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}