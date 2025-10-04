import { useState } from 'react';
import { CheckCircle, Plus, Trash2 } from 'react-feather';

// import '../styles/ApprovalRules.css';

// export default function ApprovalRules() {
//   const [users] = useState([
//     { id: 1, name: 'John Doe', role: 'Admin' },
//     { id: 2, name: 'Jane Smith', role: 'Manager' },
//     { id: 3, name: 'Bob Johnson', role: 'Employee' },
//     { id: 4, name: 'Alice Williams', role: 'Employee' },
//     { id: 5, name: 'Charlie Brown', role: 'Manager' }
//   ]);

//   const employees = users.filter(u => u.role === 'Employee');
//   const managers = users.filter(u => u.role === 'Manager' || u.role === 'Admin');

//   const [formData, setFormData] = useState({
//     userId: '',
//     description: '',
//     managerId: '',
//     isManagerApprover: false,
//     isSequential: false,
//     minApprovalPercentage: 50
//   });

//   const [approvers, setApprovers] = useState([
//     { id: 1, userId: '', isRequired: false }
//   ]);

//   const addApprover = () => {
//     setApprovers([
//       ...approvers,
//       { id: Date.now(), userId: '', isRequired: false }
//     ]);
//   };

//   const removeApprover = (id) => {
//     if (approvers.length > 1) {
//       setApprovers(approvers.filter(a => a.id !== id));
//     }
//   };

//   const updateApprover = (id, field, value) => {
//     setApprovers(approvers.map(a =>
//       a.id === id ? { ...a, [field]: value } : a
//     ));
//   };

//   const handleSaveRule = () => {
//     console.log('Saving approval rule:', { ...formData, approvers });
//     alert('Approval rule saved successfully!');
//   };

//   return (
//     <div className="approval-rules">
//       <div className="section-header">
//         <div>
//           <h2>Approval Rules</h2>
//           <p className="section-description">Configure approval workflows and requirements</p>
//         </div>
//       </div>

//       <div className="form-card">
//         <h3 className="form-card-title">Rule Configuration</h3>
//         <div className="form-grid">
//           <div className="form-group">
//             <label htmlFor="user">User</label>
//             <select
//               id="user"
//               className="select-field"
//               value={formData.userId}
//               onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
//             >
//               <option value="">Select employee</option>
//               {employees.map(emp => (
//                 <option key={emp.id} value={emp.id}>{emp.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <input
//               id="description"
//               type="text"
//               className="input-field"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               placeholder="Enter rule description"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="manager">Manager</label>
//             <select
//               id="manager"
//               className="select-field"
//               value={formData.managerId}
//               onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
//             >
//               <option value="">Select manager</option>
//               {managers.map(manager => (
//                 <option key={manager.id} value={manager.id}>{manager.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group checkbox-group">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 checked={formData.isManagerApprover}
//                 onChange={(e) => setFormData({ ...formData, isManagerApprover: e.target.checked })}
//               />
//               <span>Is Manager an Approver?</span>
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="form-card">
//         <div className="form-card-header">
//           <h3 className="form-card-title">Approvers</h3>
//           <button className="btn btn-primary btn-sm" onClick={addApprover}>
//             + Add Approver
//           </button>
//         </div>

//         <div className="approvers-list">
//           {approvers.map((approver, index) => (
//             <div key={approver.id} className="approver-item">
//               <div className="approver-number">{index + 1}</div>
//               <div className="approver-content">
//                 <div className="form-group">
//                   <label>Approver Name</label>
//                   <select
//                     className="select-field"
//                     value={approver.userId}
//                     onChange={(e) => updateApprover(approver.id, 'userId', e.target.value)}
//                   >
//                     <option value="">Select approver</option>
//                     {users.map(user => (
//                       <option key={user.id} value={user.id}>{user.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group checkbox-group">
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       checked={approver.isRequired}
//                       onChange={(e) => updateApprover(approver.id, 'isRequired', e.target.checked)}
//                     />
//                     <span>Required</span>
//                   </label>
//                 </div>
//               </div>
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => removeApprover(approver.id)}
//                 disabled={approvers.length === 1}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="approval-options">
//           <div className="form-group checkbox-group">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 checked={formData.isSequential}
//                 onChange={(e) => setFormData({ ...formData, isSequential: e.target.checked })}
//               />
//               <span>Approver Sequence (Sequential vs Parallel)</span>
//             </label>
//           </div>

//           <div className="form-group">
//             <label htmlFor="minPercentage">Minimum Approval Percentage</label>
//             <input
//               id="minPercentage"
//               type="number"
//               className="input-field"
//               min="0"
//               max="100"
//               value={formData.minApprovalPercentage}
//               onChange={(e) => setFormData({ ...formData, minApprovalPercentage: parseInt(e.target.value) })}
//               style={{ maxWidth: '200px' }}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="form-actions">
//         <button className="btn btn-primary btn-lg" onClick={handleSaveRule}>
//           Save Rule
//         </button>
//       </div>
//     </div>
//   );
// }

export default function ApprovalRules()  {
  const [users] = useState([
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'Manager' },
    { id: 3, name: 'Bob Johnson', role: 'Employee' },
    { id: 4, name: 'Alice Williams', role: 'Employee' },
    { id: 5, name: 'Charlie Brown', role: 'Manager' }
  ]);

  const employees = users.filter(u => u.role === 'Employee');
  const managers = users.filter(u => u.role === 'Manager' || u.role === 'Admin');

  const [formData, setFormData] = useState({
    userId: '',
    description: '',
    managerId: '',
    isManagerApprover: false,
    isSequential: false,
    minApprovalPercentage: 50
  });

  const [approvers, setApprovers] = useState([
    { id: 1, userId: '', isRequired: false }
  ]);

  const addApprover = () => {
    setApprovers([
      ...approvers,
      { id: Date.now(), userId: '', isRequired: false }
    ]);
  };

  const removeApprover = (id) => {
    if (approvers.length > 1) {
      setApprovers(approvers.filter(a => a.id !== id));
    }
  };

  const updateApprover = (id, field, value) => {
    setApprovers(approvers.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const handleSaveRule = () => {
    console.log('Saving approval rule:', { ...formData, approvers });
    alert('Approval rule saved successfully!');
  };

  return (
    <div className="section-content">
      <div className="section-header">
        <div className="header-content">
          <div className="header-icon">
            <CheckCircle size={28} />
          </div>
          <div>
            <h2>Approval Rules</h2>
            <p className="section-description">Configure approval workflows and requirements</p>
          </div>
        </div>
      </div>

      <div className="form-card">
        <h3 className="card-title">Rule Configuration</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="user">User</label>
            <select
              id="user"
              className="select-field"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            >
              <option value="">Select employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              className="input-field"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter rule description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="manager">Manager</label>
            <select
              id="manager"
              className="select-field"
              value={formData.managerId}
              onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
            >
              <option value="">Select manager</option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>{manager.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isManagerApprover}
                onChange={(e) => setFormData({ ...formData, isManagerApprover: e.target.checked })}
              />
              <span>Is Manager an Approver?</span>
            </label>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="card-header">
          <h3 className="card-title">Approvers</h3>
          <button className="btn btn-primary btn-sm" onClick={addApprover}>
            <Plus size={16} />
            Add Approver
          </button>
        </div>

        <div className="approvers-list">
          {approvers.map((approver, index) => (
            <div key={approver.id} className="approver-item">
              <div className="approver-badge">{index + 1}</div>
              <div className="approver-content">
                <div className="form-group">
                  <label>Approver Name</label>
                  <select
                    className="select-field"
                    value={approver.userId}
                    onChange={(e) => updateApprover(approver.id, 'userId', e.target.value)}
                  >
                    <option value="">Select approver</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={approver.isRequired}
                      onChange={(e) => updateApprover(approver.id, 'isRequired', e.target.checked)}
                    />
                    <span>Required</span>
                  </label>
                </div>
              </div>
              <button
                className="btn btn-danger btn-icon"
                onClick={() => removeApprover(approver.id)}
                disabled={approvers.length === 1}
                title="Remove Approver"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="approval-options">
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isSequential}
                onChange={(e) => setFormData({ ...formData, isSequential: e.target.checked })}
              />
              <span>Approver Sequence (Sequential vs Parallel)</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="minPercentage">Minimum Approval Percentage</label>
            <input
              id="minPercentage"
              type="number"
              className="input-field"
              min="0"
              max="100"
              value={formData.minApprovalPercentage}
              onChange={(e) => setFormData({ ...formData, minApprovalPercentage: parseInt(e.target.value) })}
              style={{ maxWidth: '200px' }}
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary btn-lg" onClick={handleSaveRule}>
          <CheckCircle size={20} />
          Save Rule
        </button>
      </div>
    </div>
  );
}

