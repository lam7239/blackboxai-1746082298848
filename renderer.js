const loginSection = document.getElementById('login-section');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const userRoleDisplay = document.getElementById('user-role-display');
const appMain = document.getElementById('app-main');
const orderFormSection = document.getElementById('order-form-section');
const orderForm = document.getElementById('order-form');
const orderList = document.getElementById('order-list');

let orders = [];
let currentUserRole = null;

// Hardcoded users database
const users = [
  { username: 'admin', password: 'admin123', role: 'manager' },
  { username: 'dieuphoi', password: 'dp123', role: 'coordinator' },
  { username: 'nhanvien', password: 'nv123', role: 'production' }
];

// Load orders from localStorage
function loadOrders() {
  const storedOrders = localStorage.getItem('orders');
  if (storedOrders) {
    orders = JSON.parse(storedOrders);
  } else {
    orders = [];
  }
}

// Save orders to localStorage
function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Render orders in the list
function renderOrders() {
  orderList.innerHTML = '';
  if (orders.length === 0) {
    orderList.innerHTML = '<li class="text-gray-500">Chưa có đơn hàng nào.</li>';
    return;
  }
  orders.forEach((order, index) => {
    const li = document.createElement('li');
    li.className = 'border border-gray-300 rounded p-3 flex flex-col justify-between items-start space-y-2';
    li.innerHTML = `
      <div>
        <p class="font-semibold">${order.customerName}</p>
        <p class="text-gray-600 text-sm">${order.orderDetails}</p>
        <p class="text-gray-500 text-xs">Ngày giờ gửi đơn hàng: ${new Date(order.orderSentDate).toLocaleString()}</p>
        <p class="text-gray-500 text-xs">Ngày giờ giao đơn hàng: ${new Date(order.orderDeliveryDate).toLocaleString()}</p>
      </div>
      ${currentUserRole === 'manager' || currentUserRole === 'coordinator' ? `
      <button class="text-red-500 hover:text-red-700 self-end" aria-label="Xóa đơn hàng" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>` : ''}
    `;
    orderList.appendChild(li);
  });
}

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    alert('Tên đăng nhập hoặc mật khẩu không đúng.');
    return;
  }

  currentUserRole = user.role;
  localStorage.setItem('userRole', currentUserRole);
  userRoleDisplay.textContent = `Vai trò: ${getRoleName(currentUserRole)}`;

  loginSection.classList.add('hidden');
  appMain.classList.remove('hidden');

  updateUIByRole();
  loadOrders();
  renderOrders();
});

// Handle logout (optional)
function logout() {
  currentUserRole = null;
  localStorage.removeItem('userRole');
  userRoleDisplay.textContent = '';
  loginSection.classList.remove('hidden');
  appMain.classList.add('hidden');
}

// Get role display name
function getRoleName(role) {
  switch(role) {
    case 'manager': return 'Quản lý';
    case 'coordinator': return 'Điều phối';
    case 'production': return 'Nhân viên sản xuất';
    default: return '';
  }
}

// Update UI based on role
function updateUIByRole() {
  if (currentUserRole === 'manager' || currentUserRole === 'coordinator') {
    orderFormSection.classList.remove('hidden');
  } else {
    orderFormSection.classList.add('hidden');
  }
}

// Handle order form submission
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const customerName = orderForm.customerName.value.trim();
  const orderDetails = orderForm.orderDetails.value.trim();
  const orderSentDate = orderForm.orderSentDate.value;
  const orderDeliveryDate = orderForm.orderDeliveryDate.value;
  if (!customerName || !orderDetails || !orderSentDate || !orderDeliveryDate) return;

  orders.push({ customerName, orderDetails, orderSentDate, orderDeliveryDate });
  saveOrders();
  renderOrders();
  orderForm.reset();
});

// Handle delete order
orderList.addEventListener('click', (e) => {
  if (e.target.closest('button')) {
    if (currentUserRole !== 'manager' && currentUserRole !== 'coordinator') return;
    const index = e.target.closest('button').getAttribute('data-index');
    if (index !== null) {
      orders.splice(index, 1);
      saveOrders();
      renderOrders();
    }
  }
});

// On page load, check if user role is saved
window.addEventListener('DOMContentLoaded', () => {
  const savedRole = localStorage.getItem('userRole');
  if (savedRole) {
    currentUserRole = savedRole;
    userRoleDisplay.textContent = `Vai trò: ${getRoleName(currentUserRole)}`;
    loginSection.classList.add('hidden');
    appMain.classList.remove('hidden');
    updateUIByRole();
    loadOrders();
    renderOrders();
  }
});
