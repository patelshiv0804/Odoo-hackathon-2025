import '../styles/ManagerApprovalTable.css';

export default function ManagerApprovalTable({ approvals, onApprove, onReject }) {
  const convertCurrency = (amount, fromCurrency) => {
    const rates = {
      'USD': 1,
      'EUR': 1.1,
      'GBP': 1.25,
      'INR': 0.012,
      'JPY': 0.0067
    };
    return (amount * (rates[fromCurrency] || 1)).toFixed(2);
  };

  return (
    <div className="approval-table-container">
      <table className="approval-table">
        <thead>
          <tr>
            <th>Approval Subject</th>
            <th>Request Owner</th>
            <th>Category</th>
            <th>Request Status</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {approvals.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">No pending approvals</td>
            </tr>
          ) : (
            approvals.map((approval) => (
              <tr key={approval.id}>
                <td className="subject-cell">
                  <strong>{approval.description}</strong>
                </td>
                <td>{approval.employee}</td>
                <td>{approval.category}</td>
                <td>
                  <span className={`status-badge status-${approval.status.toLowerCase().replace(' ', '-')}`}>
                    {approval.status}
                  </span>
                </td>
                <td className="amount-cell">
                  <div>{approval.currency} {approval.amount.toFixed(2)}</div>
                  <div className="converted-amount">
                    USD {convertCurrency(approval.amount, approval.currency)}
                  </div>
                </td>
                <td>
                  {approval.status === 'Waiting Approval' && (
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => onApprove(approval.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onReject(approval.id)}
                      >
                        Reject
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