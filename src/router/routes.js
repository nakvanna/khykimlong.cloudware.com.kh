const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue'), meta: 'home'},
      {path: '/blog', component: () => import('pages/blog/Blog'), meta: 'blog'},
      {path: '/blog/create', component: () => import('pages/blog/AddBlog'), meta: 'blog'},
      {path: '/blog/:id/edit', component: () => import('pages/blog/EditBlog'), meta: 'blog'},
      {path: '/documents', component: () => import('pages/document/Document'), meta: 'document'},
      {path: '/instructions', component: () => import('pages/document/Instruction'), meta: 'instruction'},
      {path: '/documents/create', component: () => import('pages/document/AddDocument'), meta: 'document'},
      {path: '/documents/:id/edit', component: () => import('pages/document/EditDocument'), meta: 'document'},
      {path: '/staff', component: () => import('pages/staff/Staff'), meta: 'staff'},
      {path: '/staff/create', component: () => import('pages/staff/StaffAdd'), meta: 'staff'},
      {path: '/staff/:id/edit', component: () => import('pages/staff/StaffEdit'), meta: 'staff'},
      {path: '/staff/:id/salary', component: () => import('pages/staff/StaffSalary'), meta: 'staff'},
      {path: '/patient', component: () => import('pages/patient/Patient'), meta: 'patient'},
      {path: '/patient/create', component: () => import('pages/patient/PatientAdd'), meta: 'patient'},
      {path: '/patient/:id/edit', component: () => import('pages/patient/PatientEdit'), meta: 'patient'},
      {path: '/patient/:id/history', component: () => import('pages/patient/PatientHistory'), meta: 'patient'},
      // {path: '/labo', component: () => import('pages/labo/Labo'), meta: 'labo'},
      // {path: '/labo/create', component: () => import('pages/labo/LaboAdd'), meta: 'labo'},
      // {path: '/labo/:id/edit', component: () => import('pages/labo/LaboEdit'), meta: 'labo'},
      // {path: '/labo-setting', component: () => import('pages/labo/LaboSetting'), meta: 'labo'},
      // {path: '/labo-setting/:id/edit', component: () => import('pages/labo/LaboSettingEdit'), meta: 'labo'},
      // {path: '/labo-setting/create', component: () => import('pages/labo/LaboSettingAdd'), meta: 'labo'},
      {path: '/labo', component: () => import('pages/labo-sr/Labo'), meta: 'labo'},
      {path: '/labo/create', component: () => import('pages/labo-sr/LaboAdd'), meta: 'labo'},
      {path: '/labo/:id/edit', component: () => import('pages/labo-sr/LaboEdit'), meta: 'labo'},
      {path: '/labo-setting', component: () => import('pages/labo-sr/LaboSetting'), meta: 'labo'},
      {path: '/labo-setting/:id/edit', component: () => import('pages/labo-sr/LaboSettingEdit'), meta: 'labo'},
      {path: '/labo-setting/create', component: () => import('pages/labo-sr/LaboSettingAdd'), meta: 'labo'},
      {path: '/echo', component: () => import('pages/echo/Echo'), meta: 'echo'},
      {path: '/echo/baby/create', component: () => import('pages/echo/EchoBby'), meta: 'echo'},
      {path: '/echo-note', component: () => import('pages/echo/EchoNote'), meta: 'echo-note'},
      {path: '/echo-note/:id/edit', component: () => import('pages/echo/EchoNoteEdit'), meta: 'echo-note'},
      {path: '/echo-note/create', component: () => import('pages/echo/EchoNoteAdd'), meta: 'echo-note'},
      {path: '/room', component: () => import('pages/room/Room'), meta: 'room'},
      {path: '/room/create', component: () => import('pages/room/RoomAdd'), meta: 'room'},
      {path: '/examine', component: () => import('pages/stay/Examine'), meta: 'examine'},
      {path: '/examine/:id/edit', component: () => import('pages/stay/ExamineEdit'), meta: 'examine'},
      {path: '/examine/create', component: () => import('pages/stay/ExamineAdd'), meta: 'examine'},
      {path: '/examination/:id', component: () => import('pages/stay/Examination'), meta: 'examine'},
      {path: '/product', component: () => import('pages/product/Product'), meta: 'product'},
      {path: '/product/create', component: () => import('pages/product/ProductAdd'), meta: 'product'},
      {path: '/product/:id/edit', component: () => import('pages/product/ProductEdit'), meta: 'product'},
      {path: '/stock', component: () => import('pages/stock/Stock'), meta: 'stock'},
      {path: '/stock/create', component: () => import('pages/stock/StockAdd'), meta: 'stock'},
      {path: '/stock/:id/view', component: () => import('pages/stock/StockView'), meta: 'stock'},
      {path: '/stock/:id/edit', component: () => import('pages/stock/StockEdit'), meta: 'stock'},
      {path: '/pay/:id/back', component: () => import('pages/pay-back/PayBack'), meta: 'stock'},
      {path: '/sale', component: () => import('pages/sale/Sale.vue'), meta: 'sale'},
      {path: '/sale/create', component: () => import('pages/sale/SaleAdd.vue'), meta: 'sale'},
      {path: '/sale/:id/view', component: () => import('pages/sale/SaleView.vue'), meta: 'sale'},
      {path: '/sale/:id/edit', component: () => import('pages/sale/SaleEdit.vue'), meta: 'sale'},
      {path: '/stock-report', component: () => import('pages/report/StockReport'), meta: 'report'},
      {path: '/import-report', component: () => import('pages/report/PurchaseReport'), meta: 'report'},
      {path: '/sale-report', component: () => import('pages/report/SaleReport'), meta: 'report'},
      {path: '/staff-salary-report', component: () => import('pages/report/StaffSalaryReport'), meta: 'report'},
      {path: '/income', component: () => import('pages/income-expanse/Income'), meta: 'inc-exp'},
      {path: '/expanse', component: () => import('pages/income-expanse/Expense'), meta: 'inc-exp'},
      {path: '/income-report', component: () => import('pages/report/IncomeReport'), meta: 'report'},
      {path: '/expense-report', component: () => import('pages/report/ExpenseReport'), meta: 'report'},
      {path: '/profit-and-lose-report', component: () => import('pages/report/ProfitAndLose'), meta: 'report'},
      {path: '/cashiers', component: () => import('pages/sale/Cashier'), meta: 'cashier'},
    ]
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout'),
    children: [
      {path: '/login', component: () => import('pages/auth/Login')},
      {path: '/user/:id/update', component: () => import('pages/auth/ChangePassword')},
      {path: '/user/manager', component: () => import('pages/auth/UserManager')},
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
