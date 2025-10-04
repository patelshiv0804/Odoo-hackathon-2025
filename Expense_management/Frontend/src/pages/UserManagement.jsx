// import React, { useState } from 'react';
// import '../styles/UserManagement.css';

// export default function UserManagement() {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: 'John Doe',
//       role: 'Admin',
//       managerId: null,
//       email: 'john@example.com'
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       role: 'Manager',
//       managerId: 1,
//       email: 'jane@example.com'
//     },
//     {
//       id: 3,
//       name: 'Bob Johnson',
//       role: 'Employee',
//       managerId: 2,
//       email: 'bob@example.com'
//     }
//   ]);

//   const managers = users.filter(u => u.role === 'Manager' || u.role === 'Admin');

//   const addNewUser = () => {
//     const newUser = {
//       id: Date.now(),
//       name: '',
//       role: 'Employee',
//       managerId: null,
//       email: ''
//     };
//     setUsers([...users, newUser]);
//   };

//   const updateUser = (id, field, value) => {
//     setUsers(users.map(user =>
//       user.id === id ? { ...user, [field]: value } : user
//     ));
//   };

//   const handleSendPassword = (email) => {
//     alert(`Password sent to: ${email}`);
//   };

//   return (
//     <div className="user-management">
//       <div className="section-header">
//         <div>
//           <h2>User Management</h2>
//           <p className="section-description">Manage users, roles, and permissions</p>
//         </div>
//         <button className="btn btn-primary" onClick={addNewUser}>
//           + New User
//         </button>
//       </div>

//       <div className="table-card">
//         <div className="table-container">
//           <table className="user-table">
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Role</th>
//                 <th>Manager</th>
//                 <th>Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user.id}>
//                   <td>
//                     <input
//                       type="text"
//                       className="input-field"
//                       value={user.name}
//                       onChange={(e) => updateUser(user.id, 'name', e.target.value)}
//                       placeholder="Enter name"
//                     />
//                   </td>
//                   <td>
//                     <select
//                       className="select-field"
//                       value={user.role}
//                       onChange={(e) => updateUser(user.id, 'role', e.target.value)}
//                     >
//                       {/* <option value="Admin">Admin</option> */}
//                       <option value="Manager">Manager</option>
//                       <option value="Employee">Employee</option>
//                     </select>
//                   </td>
//                   <td>
//                     <select
//                       className="select-field"
//                       value={user.managerId || ''}
//                       onChange={(e) => updateUser(user.id, 'managerId', e.target.value ? parseInt(e.target.value) : null)}
//                     >
//                       <option value="">No Manager</option>
//                       {managers
//                         .filter(m => m.id !== user.id)
//                         .map(manager => (
//                           <option key={manager.id} value={manager.id}>
//                             {manager.name || 'Unnamed'}
//                           </option>
//                         ))}
//                     </select>
//                   </td>
//                   <td>
//                     <input
//                       type="email"
//                       className="input-field"
//                       value={user.email}
//                       onChange={(e) => updateUser(user.id, 'email', e.target.value)}
//                       placeholder="email@example.com"
//                     />
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-secondary"
//                       onClick={() => handleSendPassword(user.email)}
//                     >
//                       Send Password
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { User, Users, CheckCircle, Shield, Mail, Plus, Trash2, Settings } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Manager',
      managerId: null,
      email: 'john@example.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Manager',
      managerId: 1,
      email: 'jane@example.com'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      role: 'Employee',
      managerId: 2,
      email: 'bob@example.com'
    }
  ]);

  const managers = users.filter(u => u.role === 'Manager' || u.role === 'Admin');

  const addNewUser = () => {
    const newUser = {
      id: Date.now(),
      name: '',
      role: 'Employee',
      managerId: null,
      email: ''
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id, field, value) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, [field]: value } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSendPassword = (email) => {
    alert(`Password sent to: ${email}`);
  };

  return (
    <div className="section-content">
      <div className="section-header">
        <div className="header-content">
          <div className="header-icon">
            <Users size={28} />
          </div>
          <div>
            <h2>User Management</h2>
            <p className="section-description">Manage users, roles, and permissions</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={addNewUser}>
          <Plus size={18} />
          New User
        </button>
      </div>

      <div className="table-card">
        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>
                  <div className="th-content">
                    <User size={16} />
                    User
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <Shield size={16} />
                    Role
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <Users size={16} />
                    Manager
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <Mail size={16} />
                    Email
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <Settings size={16} />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="text"
                      className="input-field"
                      value={user.name}
                      onChange={(e) => updateUser(user.id, 'name', e.target.value)}
                      placeholder="Enter name"
                    />
                  </td>
                  <td>
                    <select
                      className="select-field"
                      value={user.role}
                      onChange={(e) => updateUser(user.id, 'role', e.target.value)}
                    >
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="select-field"
                      value={user.managerId || ''}
                      onChange={(e) => updateUser(user.id, 'managerId', e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">No Manager</option>
                      {managers
                        .filter(m => m.id !== user.id)
                        .map(manager => (
                          <option key={manager.id} value={manager.id}>
                            {manager.name || 'Unnamed'}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="email"
                      className="input-field"
                      value={user.email}
                      onChange={(e) => updateUser(user.id, 'email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-secondary btn-icon"
                        onClick={() => handleSendPassword(user.email)}
                        title="Send Password"
                      >
                        <Mail size={16} />
                      </button>
                      <button
                        className="btn btn-danger btn-icon"
                        onClick={() => deleteUser(user.id)}
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}