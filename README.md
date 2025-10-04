# 💰 Expense Management System  

### 👥 Team Members

| Name  | Email |
|:------|:------|
| **Shiv Patel**  | patelshiv0804@gmail.com |
| **Kartik Jaju**  | kartikjaju0@gmail.com |
| **Jagrat Pandya**  | vivekgokhale23@gmail.com |
| **Vivek Gokhale**  | jagratpandya36@gmail.com |

---
## 🎥 Project Demo  

📽️ **Watch the full demo video here:**  
👉 [**Google Drive Video Link**](https://drive.google.com/your-demo-video-link-here)  

---

> 🔹 *A full-stack role-based system designed to simplify expense submission, multi-level approvals, and financial tracking for organizations.*

---

## 🚀 Project Overview  

Managing company expenses manually is tedious, error-prone, and non-transparent.  
Our **Expense Management System** automates the process — from **submission to approval**, integrating **multi-role access**, **currency conversion**, and **approval workflows** for a modern enterprise experience.  

---

## 🧩 Core Features  

### 👑 Admin Panel  
- Create and manage **company profiles** (auto-fetch currency based on country).  
- Add employees and assign **roles** (Admin, Manager, Employee).  
- Define **approval rules**: sequential or percentage-based approvals.  

### 👨‍💼 Manager Dashboard  
- View and act on **pending approvals**.  
- Approve or reject requests with comments.  
- Track approvals in both **local and converted currency**.  

### 👩‍💻 Employee Portal  
- Submit expense requests with **OCR-based receipt upload**.  
- Auto currency conversion using real-time exchange API.  
- Track expense progress through all approval stages.  

---

## ⚙️ Tech Stack  

<table>
  <tr>
    <th align="left">💡 Frontend</th>
    <td>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="40" title="JavaScript"/>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="40" title="CSS3"/>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="40" title="React"/>
      <img src="https://vitejs.dev/logo.svg" width="40" title="Vite"/>
    </td>
  </tr>

  <!-- Backend -->
  <tr>
    <th align="left">🧠 Backend</th>
    <td>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="40" title="Node.js"/>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="40" title="Express.js"/>
    </td>
  </tr>

  <!-- Databases -->
  <tr>
    <th align="left">🗃️ Databases</th>
    <td>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" width="40" title="MySQL"/>
    </td>
  </tr>

  <tr>
    <th align="left">🔐 Authentication</th>
    <td>
      <img src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" width="40" title="JWT"/>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="40" title="Node.js Auth"/>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodemon/nodemon-original.svg" width="40" title="Nodemon"/>
    </td>
  </tr>
  
  <!-- Tools -->
  <tr>
    <th align="left">⚒ Tools & Platforms</th>
    <td>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" width="40" title="Git"/>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" width="40" title="GitHub"/>
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" width="40" title="VS Code"/>
      <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" width="40" title="Postman"/>
    </td>
  </tr>

</table>


---

## 🔐 Authentication Flow  

| Action | Description |
|:--------|:-------------|
| **Register** | First user creates a company (Admin by default). |
| **Login** | Role-based redirection (Admin → Manager → Employee). |
| **JWT Token** | Secures all API calls and user sessions. |

---

## 🧭 Approval Workflow  

1. **Employee** submits expense request.  
2. **Manager** reviews → Approve / Reject.  
3. **System** auto-updates status and logs approval timestamp.  
4. **Admin** can view all company-wide expenses & analytics.  

---

## ⚙️ Installation & Setup 
```bash
# Clone repository
git clone https://github.com/patelshiv0804/Odoo-hackathon-2025.git
cd expense-management

# Install dependencies
npm install

# Start backend
npm run server

# Start frontend
npm run dev
```

<p align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=0:FDAF39,100:FF5733&height=200&section=footer&text=Thanks+for+visiting!+💛&fontSize=30&fontColor=ffffff" /> </p>  



