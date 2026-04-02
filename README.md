# SmartPark EPMS (Employee Payroll Management System)

SmartPark EPMS is a modern, full-stack enterprise web application designed to simplify workforce management and streamline payroll reporting. The platform offers a seamless experience for administrators to track employees across departments, standardize salary processing, and visualize monthly payroll expenses.

![EPMS Dashboard Screenshot](./screenshot.png)

## 🚀 Features

- **Authentication & Security:** Robust JWT-based authentication flow with protected routes via React Router.
- **Dark Mode Support:** A sleek, fully-integrated dark mode toggled easily from the navigation bar, preserving user preferences locally.
- **Employee Management:** Create, list, edit, and safely search employee directories. Employees are auto-assigned smart identification numbers (e.g., `EMP0001`).
- **Department Controls:** Define corporate departments and configure standardized base gross salaries for seamless assignment.
- **Salary Processing:** Track net payroll by easily defining gross salaries and individual total deductions. Calculates real-time net salary statistics.
- **Reporting Analytics:** Generate and filter monthly comprehensive payroll snapshots mapping out exact department allocations vs expenditures.

## 🛠 Tech Stack

### Frontend

- **Framework:** React.js + Vite
- **Styling:** Tailwind CSS v4 (with native custom configuration & advanced theming via CSS variables)
- **Icons:** `lucide-react`
- **Routing:** React Router v6
- **Notifications:** `react-hot-toast`
- **HTTP Client:** Axios (configured with intercepts for JWT injection)

### Backend

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MySQL relational DB accessed via `mysql2` driver
- **Authentication:** Local strategy paired with `jsonwebtoken` for stateless auth via bearer tokens, and `bcryptjs` for secure password hashing.
- **Validation:** `express-validator` middleware
- **Logging/Utilities:** `morgan` for automated endpoint logging, `dotenv` for configuration injection.

## 🔗 Core Endpoints

The backend Express REST API operates predominantly around the following architectural sub-routers:

### `auth.routes.js`

- `POST /api/login` - Validates administrator hash payloads and returns a session-bearing Bearer token.
- `POST /api/register` - Optional utility to securely mint new administrator credentials.

### `employees.routes.js`

- `GET /api/employees` - Returns a joined array of all employees and their respective department titles.
- `POST /api/employees` - Ingests payload (`firstName`, `lastName`, `departmentCode`, `position`, `gender`, etc.) to create a new personnel record.
- _(Includes matching Put/Delete parameter actions)_

### `departments.routes.js`

- `GET /api/departments` - Returns list of operational departments and designated `grossSalary` templates.
- `POST /api/departments` - Creates a new department tag (e.g. `departmentCode: ENG`, `departmentName: Engineering`)

### `salaries.routes.js`

- `GET /api/salaries` - Collects joined payroll records, linking exact employees to net compensation models for rendering in dashboard tables.
- `POST /api/salaries` - Executes a payroll instance defined by `grossSalary`, `totalDeduction`, calculable `netSalary`, and `month` period.
- `PUT /api/salaries/:id` - Re-evaluates an inaccurate salary dispatch.
- `DELETE /api/salaries/:id` - Wipes a specified historical payroll record.

### `report.routes.js`

- `GET /api/reports/monthly-payroll` - A complex aggregated aggregation endpoint matching employee salary payouts with their department data explicitly for table rendering and calculating sum thresholds.

## 🏃‍♂️ Running Locally

1. **Clone the repository.**
2. **Setup the Database:**
   Import `/backend-project/EPMS.sql` into your local MySQL host.
3. **Configure Environment:**
   Navigate to the backend and define `.env` (matching `PORT=5000` and `DB_USER` variables as required).
4. **Boot Up Services:**
   In Terminal tab 1 (Backend):
   ```bash
   cd backend-project
   npm install
   npm run dev
   ```
   In Terminal tab 2 (Frontend):
   ```bash
   cd frontend-project
   npm install
   npm run dev
   ```
5. Navigate to `http://localhost:5173` to experience the EPMS Dashboard.

   **Default Admin Credentials:**
   - **Username:** `admin`
   - **Password:** `admin123`
