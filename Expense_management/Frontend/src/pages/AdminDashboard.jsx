import React, { useState } from 'react';
import UserManagement from './UserManagement';
import ApprovalRules from './ApprovalRules';
import '../styles/AdminDashboard.css';

// export default function AdminDashboard() {
//   const [currentTab, setCurrentTab] = useState('users');

//   return (
//     <div className="admin-dashboard">
//       <div className="page-header">
//         <div>
//           <h1>Admin Dashboard</h1>
//           <p className="page-description">Manage users and configure approval workflows</p>
//         </div>
//       </div>

//       <div className="tabs">
//         <button
//           className={`tab-button ${currentTab === 'users' ? 'active' : ''}`}
//           onClick={() => setCurrentTab('users')}
//         >
//           User Management
//         </button>
//         <button
//           className={`tab-button ${currentTab === 'rules' ? 'active' : ''}`}
//           onClick={() => setCurrentTab('rules')}
//         >
//           Approval Rules
//         </button>
//       </div>

//       <div className="tab-content">
//         {currentTab === 'users' ? <UserManagement /> : <ApprovalRules />}
//       </div>
//     </div>
//   );
// }


export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState('users');

  return (
    <div className="admin-dashboard">
     

      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p className="page-description">Manage users and configure approval workflows</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${currentTab === 'users' ? 'active' : ''}`}
          onClick={() => setCurrentTab('users')}
        >
          User Management
        </button>
        <button
          className={`tab-button ${currentTab === 'rules' ? 'active' : ''}`}
          onClick={() => setCurrentTab('rules')}
        >
          Approval Rules
        </button>
      </div>

      <div className="tab-content">
        {currentTab === 'users' ? <UserManagement /> : <ApprovalRules />}
      </div>
    </div>
  );
}