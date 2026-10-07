/**
 * ElderCare - Admin Portal Interactive Controller (admin.js)
 * Powers all interactive workflows, data rendering, modals, and CRUD actions across all 16 Admin Pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCurrentAdminPage();
});

/**
 * Dispatches page initialization based on current HTML filename
 */
function initCurrentAdminPage() {
  const path = window.location.pathname.replace(/\\/g, '/');
  const page = path.substring(path.lastIndexOf('/') + 1) || 'dashboard.html';

  switch (page) {
    case 'dashboard.html':
    case 'index.html':
    case '':
      initAdminDashboardHome();
      break;
    case 'users.html':
      initAdminUsersPage();
      break;
    case 'seniors.html':
      initAdminSeniorsPage();
      break;
    case 'enrollments.html':
      initAdminEnrollmentsPage();
      break;
    case 'enrollment-details.html':
      initAdminEnrollmentDetailsPage();
      break;
    case 'services.html':
      initAdminServicesPage();
      break;
    case 'service-details.html':
      initAdminServiceDetailsPage();
      break;
    case 'schedules.html':
      initAdminSchedulesPage();
      break;
    case 'attendance.html':
      initAdminAttendancePage();
      break;
    case 'activities.html':
      initAdminActivitiesPage();
      break;
    case 'wellness.html':
      initAdminWellnessPage();
      break;
    case 'reports.html':
      initAdminReportsPage();
      break;
    case 'billing.html':
      initAdminBillingPage();
      break;
    case 'messages.html':
      initAdminMessagesPage();
      break;
    case 'notifications.html':
      initAdminNotificationsPage();
      break;
    case 'settings.html':
      initAdminSettingsPage();
      break;
    default:
      break;
  }
}

/* ==========================================================================
   1. DASHBOARD HOME PAGE (dashboard.html)
   ========================================================================== */
function initAdminDashboardHome() {
  const data = getAdminData();
  
  // Set current date
  const dateEl = document.getElementById('adminTodayDate');
  if (dateEl) {
    dateEl.textContent = formatCurrentDate();
  }

  // Set greeting based on time of day
  const greetingEl = document.getElementById('adminGreetingTime');
  if (greetingEl) {
    const hours = new Date().getHours();
    if (hours < 12) greetingEl.textContent = "Good Morning";
    else if (hours < 17) greetingEl.textContent = "Good Afternoon";
    else greetingEl.textContent = "Good Evening";
  }

  // Render weekly attendance chart
  renderAttendanceChart(data.weeklyAttendance);

  // Render recent enrollments table
  renderRecentEnrollmentsTable(data.enrollments.slice(0, 5));

  // Render quick actions
  setupDashboardQuickActions();
}

function renderAttendanceChart(weeklyData) {
  const chartEl = document.getElementById('adminAttendanceBarChart');
  if (!chartEl || !weeklyData) return;

  chartEl.innerHTML = weeklyData.map(item => `
    <div class="admin-chart-col">
      <div class="admin-chart-tooltip">${item.present} Present / ${item.total} Total (${item.percent}%)</div>
      <div class="admin-chart-bar-track">
        <div class="admin-chart-bar-fill" style="--bar-height: ${item.percent}%;"></div>
      </div>
      <span class="admin-chart-label">${item.day}</span>
    </div>
  `).join('');
}

function renderRecentEnrollmentsTable(enrollments) {
  const tbody = document.getElementById('recentEnrollmentsTableBody');
  if (!tbody || !enrollments) return;

  tbody.innerHTML = enrollments.map(en => `
    <tr>
      <td data-label="Enrollment ID"><strong>${en.id}</strong></td>
      <td data-label="Family">
        <span class="admin-cell-name">${escapeHtml(en.familyName)}</span>
        <span class="admin-cell-sub">${escapeHtml(en.familyPhone)}</span>
      </td>
      <td data-label="Senior">
        <span class="admin-cell-name">${escapeHtml(en.seniorName)}</span>
        <span class="admin-cell-sub">Age ${en.seniorAge}</span>
      </td>
      <td data-label="Service">${escapeHtml(en.serviceName)}</td>
      <td data-label="Date">${escapeHtml(en.submittedDate)}</td>
      <td data-label="Payment">
        <span class="admin-badge ${en.paymentStatus === 'Paid' ? 'success' : (en.paymentStatus === 'Pending' ? 'warning' : 'danger')}">
          ${en.paymentStatus}
        </span>
      </td>
      <td data-label="Status">
        <span class="admin-badge ${getEnrollmentStatusBadgeClass(en.status)}">
          ${en.status}
        </span>
      </td>
      <td data-label="Action">
        <a href="enrollment-details.html?id=${en.id}" class="btn-admin btn-admin-secondary sm">
          View
        </a>
      </td>
    </tr>
  `).join('');
}

function getEnrollmentStatusBadgeClass(status) {
  switch (status) {
    case 'Approved':
    case 'Active':
      return 'success';
    case 'Pending Review':
      return 'purple';
    case 'More Information Required':
      return 'warning';
    case 'Rejected':
      return 'danger';
    default:
      return 'info';
  }
}

function setupDashboardQuickActions() {
  document.querySelectorAll('[data-quick-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-quick-action');
      handleQuickAction(action);
    });
  });
}

function handleQuickAction(action) {
  switch (action) {
    case 'add-senior':
      openAdminModal('modalAddSenior');
      break;
    case 'add-user':
      openAdminModal('modalAddUser');
      break;
    case 'create-enrollment':
      window.location.href = 'enrollments.html?action=new';
      break;
    case 'add-service':
      openAdminModal('modalAddService');
      break;
    case 'record-attendance':
      window.location.href = 'attendance.html';
      break;
    case 'add-activity':
      openAdminModal('modalAddActivity');
      break;
    case 'create-report':
      window.location.href = 'reports.html?action=generate';
      break;
    case 'send-update':
      openAdminModal('modalSendFamilyUpdate');
      break;
    default:
      break;
  }
}

/* ==========================================================================
   2. USERS PAGE (users.html)
   ========================================================================== */
function initAdminUsersPage() {
  let data = getAdminData();
  const searchInput = document.getElementById('userSearchInput');
  const statusFilter = document.getElementById('userStatusFilter');
  const tableBody = document.getElementById('usersTableBody');
  const formAddUser = document.getElementById('formAddUser');

  function renderUsers() {
    if (!tableBody) return;
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const status = statusFilter ? statusFilter.value : 'all';

    const filtered = data.users.filter(u => {
      const matchQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.seniorName.toLowerCase().includes(q);
      const matchStatus = status === 'all' || u.status.toLowerCase() === status.toLowerCase();
      return matchQuery && matchStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8">
            <div class="admin-empty-state">
              <div class="admin-empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h4 class="admin-empty-title">No Family Accounts Found</h4>
              <p class="admin-empty-desc">No users matched your current search or filter criteria.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(u => `
      <tr>
        <td data-label="Name">
          <div class="admin-user-cell">
            <img src="${u.avatar || '../assets/images/testimonial_avatar.jpg'}" alt="${escapeHtml(u.name)}" class="admin-table-avatar">
            <div>
              <span class="admin-cell-name">${escapeHtml(u.name)}</span>
              <span class="admin-cell-sub">${escapeHtml(u.relationship || 'Family')}</span>
            </div>
          </div>
        </td>
        <td data-label="Email">${escapeHtml(u.email)}</td>
        <td data-label="Phone">${escapeHtml(u.phone)}</td>
        <td data-label="Senior">
          <strong>${escapeHtml(u.seniorName)}</strong>
        </td>
        <td data-label="Service">${escapeHtml(u.serviceName)}</td>
        <td data-label="Status">
          <span class="admin-badge ${u.status === 'Active' ? 'success' : 'warning'}">${u.status}</span>
        </td>
        <td data-label="Joined">${escapeHtml(u.joinedDate)}</td>
        <td data-label="Action">
          <div style="display: flex; gap: 6px; justify-content: flex-end;">
            <button class="btn-admin btn-admin-secondary sm" onclick="openEditUserModal('${u.id}')">Edit</button>
            <button class="btn-admin btn-admin-danger sm" onclick="confirmDeactivateUser('${u.id}')">
              ${u.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('input', renderUsers);
  if (statusFilter) statusFilter.addEventListener('change', renderUsers);

  // Check URL search param
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search');
  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
  }

  renderUsers();

  // Add User Form
  if (formAddUser) {
    formAddUser.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('addUserName').value.trim();
      const email = document.getElementById('addUserEmail').value.trim();
      const phone = document.getElementById('addUserPhone').value.trim();
      const seniorName = document.getElementById('addUserSenior').value.trim();
      const relationship = document.getElementById('addUserRelationship').value;
      const serviceName = document.getElementById('addUserService').value;

      if (!name || !email) {
        showAdminToast('Please fill in required fields', 'error');
        return;
      }

      const newUser = {
        id: 'USR-' + (data.users.length + 1).toString().padStart(3, '0'),
        name,
        email,
        phone: phone || '+91 98765 00000',
        relationship: relationship || 'Daughter/Son',
        seniorId: 'SEN-001',
        seniorName: seniorName || 'Family Senior',
        serviceName: serviceName || 'Day Care & Companionship',
        status: 'Active',
        joinedDate: formatCurrentDate(),
        avatar: '../assets/images/testimonial_avatar.jpg'
      };

      data.users.unshift(newUser);
      saveAdminData(data);
      renderUsers();
      closeAdminModal('modalAddUser');
      formAddUser.reset();
      showAdminToast(`Account created for ${name}`);
    });
  }
}

window.openEditUserModal = function(userId) {
  const data = getAdminData();
  const user = data.users.find(u => u.id === userId);
  if (!user) return;

  document.getElementById('editUserId').value = user.id;
  document.getElementById('editUserName').value = user.name;
  document.getElementById('editUserEmail').value = user.email;
  document.getElementById('editUserPhone').value = user.phone;
  document.getElementById('editUserSenior').value = user.seniorName;
  document.getElementById('editUserStatus').value = user.status;

  openAdminModal('modalEditUser');
};

window.saveEditUser = function(e) {
  if (e) e.preventDefault();
  const data = getAdminData();
  const userId = document.getElementById('editUserId').value;
  const user = data.users.find(u => u.id === userId);
  if (!user) return;

  user.name = document.getElementById('editUserName').value.trim();
  user.email = document.getElementById('editUserEmail').value.trim();
  user.phone = document.getElementById('editUserPhone').value.trim();
  user.seniorName = document.getElementById('editUserSenior').value.trim();
  user.status = document.getElementById('editUserStatus').value;

  saveAdminData(data);
  initAdminUsersPage();
  closeAdminModal('modalEditUser');
  showAdminToast(`User ${user.name} updated successfully`);
};

window.confirmDeactivateUser = function(userId) {
  const data = getAdminData();
  const user = data.users.find(u => u.id === userId);
  if (!user) return;

  const nextStatus = user.status === 'Active' ? 'Inactive' : 'Active';
  if (confirm(`Are you sure you want to change status of ${user.name} to ${nextStatus}?`)) {
    user.status = nextStatus;
    saveAdminData(data);
    initAdminUsersPage();
    showAdminToast(`Account status set to ${nextStatus}`);
  }
};

/* ==========================================================================
   3. SENIORS PAGE (seniors.html)
   ========================================================================== */
function initAdminSeniorsPage() {
  let data = getAdminData();
  const searchInput = document.getElementById('seniorSearchInput');
  const serviceFilter = document.getElementById('seniorServiceFilter');
  const statusFilter = document.getElementById('seniorStatusFilter');
  const tableBody = document.getElementById('seniorsTableBody');
  const formAddSenior = document.getElementById('formAddSenior');

  function renderSeniors() {
    if (!tableBody) return;
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const service = serviceFilter ? serviceFilter.value : 'all';
    const status = statusFilter ? statusFilter.value : 'all';

    const filtered = data.seniors.filter(s => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.familyName.toLowerCase().includes(q) || s.serviceName.toLowerCase().includes(q);
      const matchSrv = service === 'all' || s.serviceId === service;
      const matchSt = status === 'all' || s.status.toLowerCase() === status.toLowerCase();
      return matchQ && matchSrv && matchSt;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="admin-empty-state">
              <div class="admin-empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
              </div>
              <h4 class="admin-empty-title">No Seniors Found</h4>
              <p class="admin-empty-desc">No seniors match your filter selections.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(s => `
      <tr>
        <td data-label="Senior">
          <div class="admin-user-cell">
            <img src="${s.photo || '../assets/images/commitment_couple.jpg'}" alt="${escapeHtml(s.name)}" class="admin-table-avatar">
            <div>
              <span class="admin-cell-name">${escapeHtml(s.name)}</span>
              <span class="admin-cell-sub">Known as: ${escapeHtml(s.preferredName || s.name)}</span>
            </div>
          </div>
        </td>
        <td data-label="Age / Gender">${s.age} yrs • ${s.gender}</td>
        <td data-label="Family Contact">
          <span class="admin-cell-name">${escapeHtml(s.familyName)}</span>
          <span class="admin-cell-sub">${escapeHtml(s.familyPhone)}</span>
        </td>
        <td data-label="Service">${escapeHtml(s.serviceName)}</td>
        <td data-label="Today Attendance">
          <span class="admin-badge ${s.attendanceToday === 'Present' ? 'success' : (s.attendanceToday === 'Late' ? 'warning' : 'danger')}">
            ${s.attendanceToday} ${s.checkInTime !== '—' ? '(' + s.checkInTime + ')' : ''}
          </span>
        </td>
        <td data-label="Status">
          <span class="admin-badge ${s.status === 'Active' ? 'success' : 'warning'}">${s.status}</span>
        </td>
        <td data-label="Action">
          <div style="display: flex; gap: 6px; justify-content: flex-end;">
            <button class="btn-admin btn-admin-secondary sm" onclick="openEditSeniorModal('${s.id}')">Edit</button>
            <a href="enrollment-details.html?id=${s.enrollmentId}" class="btn-admin btn-admin-outline sm">Details</a>
          </div>
        </td>
      </tr>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('input', renderSeniors);
  if (serviceFilter) serviceFilter.addEventListener('change', renderSeniors);
  if (statusFilter) statusFilter.addEventListener('change', renderSeniors);

  // Check query param
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search');
  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
  }

  renderSeniors();

  // Form Add Senior
  if (formAddSenior) {
    formAddSenior.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('addSeniorName').value.trim();
      const age = parseInt(document.getElementById('addSeniorAge').value, 10) || 70;
      const gender = document.getElementById('addSeniorGender').value;
      const familyName = document.getElementById('addSeniorFamily').value.trim();
      const familyPhone = document.getElementById('addSeniorPhone').value.trim();
      const serviceId = document.getElementById('addSeniorService').value;
      const serviceName = document.getElementById('addSeniorService').selectedOptions[0].text;
      const dietary = document.getElementById('addSeniorDiet').value.trim();

      if (!name || !familyName) {
        showAdminToast('Please fill all required fields', 'error');
        return;
      }

      const newSenior = {
        id: 'SEN-' + (data.seniors.length + 1).toString().padStart(3, '0'),
        name,
        preferredName: name.split(' ')[0],
        age,
        gender,
        dob: '1955-01-01',
        photo: '../assets/images/commitment_couple.jpg',
        familyId: 'USR-001',
        familyName,
        familyEmail: 'family@example.com',
        familyPhone: familyPhone || '+91 98765 00000',
        relationship: 'Family Member',
        serviceId,
        serviceName,
        enrollmentId: 'EC-' + (125 + data.seniors.length),
        status: 'Active',
        schedule: 'Monday – Saturday (8:00 AM – 5:00 PM)',
        attendanceToday: 'Not Checked In',
        checkInTime: '—',
        checkOutTime: '—',
        interests: 'Music, Walking, Creative Crafts',
        dietary: dietary || 'Standard vegetarian',
        mobility: 'Independent',
        emergencyContact: `${familyName} • ${familyPhone}`,
        careNotes: 'Newly onboarded senior.'
      };

      data.seniors.unshift(newSenior);
      data.stats.totalSeniors += 1;
      saveAdminData(data);
      renderSeniors();
      closeAdminModal('modalAddSenior');
      formAddSenior.reset();
      showAdminToast(`Senior ${name} added successfully`);
    });
  }
}

window.openEditSeniorModal = function(seniorId) {
  const data = getAdminData();
  const senior = data.seniors.find(s => s.id === seniorId);
  if (!senior) return;

  document.getElementById('editSeniorId').value = senior.id;
  document.getElementById('editSeniorName').value = senior.name;
  document.getElementById('editSeniorAge').value = senior.age;
  document.getElementById('editSeniorFamily').value = senior.familyName;
  document.getElementById('editSeniorPhone').value = senior.familyPhone;
  document.getElementById('editSeniorDiet').value = senior.dietary;
  document.getElementById('editSeniorNotes').value = senior.careNotes;
  document.getElementById('editSeniorStatus').value = senior.status;

  openAdminModal('modalEditSenior');
};

window.saveEditSenior = function(e) {
  if (e) e.preventDefault();
  const data = getAdminData();
  const seniorId = document.getElementById('editSeniorId').value;
  const senior = data.seniors.find(s => s.id === seniorId);
  if (!senior) return;

  senior.name = document.getElementById('editSeniorName').value.trim();
  senior.age = parseInt(document.getElementById('editSeniorAge').value, 10) || senior.age;
  senior.familyName = document.getElementById('editSeniorFamily').value.trim();
  senior.familyPhone = document.getElementById('editSeniorPhone').value.trim();
  senior.dietary = document.getElementById('editSeniorDiet').value.trim();
  senior.careNotes = document.getElementById('editSeniorNotes').value.trim();
  senior.status = document.getElementById('editSeniorStatus').value;

  saveAdminData(data);
  initAdminSeniorsPage();
  closeAdminModal('modalEditSenior');
  showAdminToast(`Senior profile updated for ${senior.name}`);
};

/* ==========================================================================
   4. ENROLLMENTS PAGE (enrollments.html)
   ========================================================================== */
function initAdminEnrollmentsPage() {
  let data = getAdminData();
  const searchInput = document.getElementById('enrollmentSearchInput');
  const tabBtns = document.querySelectorAll('.admin-filter-tab');
  const tableBody = document.getElementById('enrollmentsTableBody');
  let currentStatusTab = 'all';

  function renderEnrollments() {
    if (!tableBody) return;
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();

    const filtered = data.enrollments.filter(en => {
      const matchQ = !q || en.id.toLowerCase().includes(q) || en.seniorName.toLowerCase().includes(q) || en.familyName.toLowerCase().includes(q) || en.serviceName.toLowerCase().includes(q);
      const matchTab = currentStatusTab === 'all' || en.status.toLowerCase() === currentStatusTab.toLowerCase();
      return matchQ && matchTab;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8">
            <div class="admin-empty-state">
              <div class="admin-empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h4 class="admin-empty-title">No Enrollments Found</h4>
              <p class="admin-empty-desc">No enrollments match this status filter or search term.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(en => `
      <tr>
        <td data-label="Enrollment ID"><strong>${en.id}</strong></td>
        <td data-label="Family">
          <span class="admin-cell-name">${escapeHtml(en.familyName)}</span>
          <span class="admin-cell-sub">${escapeHtml(en.familyPhone)}</span>
        </td>
        <td data-label="Senior">
          <span class="admin-cell-name">${escapeHtml(en.seniorName)}</span>
          <span class="admin-cell-sub">Age ${en.seniorAge}</span>
        </td>
        <td data-label="Service">${escapeHtml(en.serviceName)}</td>
        <td data-label="Date">${escapeHtml(en.submittedDate)}</td>
        <td data-label="Payment">
          <span class="admin-badge ${en.paymentStatus === 'Paid' ? 'success' : 'warning'}">
            ${en.paymentStatus}
          </span>
        </td>
        <td data-label="Status">
          <span class="admin-badge ${getEnrollmentStatusBadgeClass(en.status)}">
            ${en.status}
          </span>
        </td>
        <td data-label="Action">
          <a href="enrollment-details.html?id=${en.id}" class="btn-admin btn-admin-secondary sm">
            Review Details
          </a>
        </td>
      </tr>
    `).join('');
  }

  tabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      tabBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentStatusTab = tab.getAttribute('data-status-tab');
      renderEnrollments();
    });
  });

  if (searchInput) searchInput.addEventListener('input', renderEnrollments);
  renderEnrollments();
}

/* ==========================================================================
   5. ENROLLMENT DETAILS PAGE (enrollment-details.html)
   ========================================================================== */
function initAdminEnrollmentDetailsPage() {
  const data = getAdminData();
  const urlParams = new URLSearchParams(window.location.search);
  const enrollmentId = urlParams.get('id') || 'EC-00124';

  const en = data.enrollments.find(item => item.id === enrollmentId) || data.enrollments[0];
  if (!en) return;

  // Populate Details
  const bindText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  bindText('detailEnrollmentId', en.id);
  bindText('detailSubmittedDate', en.submittedDate);
  bindText('detailStatusBadge', en.status);
  bindText('detailFamilyName', en.familyName);
  bindText('detailFamilyEmail', en.familyEmail);
  bindText('detailFamilyPhone', en.familyPhone);
  bindText('detailSeniorName', en.seniorName);
  bindText('detailSeniorAge', en.seniorAge + ' Years');
  bindText('detailServiceName', en.serviceName);
  bindText('detailServiceSchedule', en.schedule);
  bindText('detailServiceFee', formatCurrency(en.servicePrice));
  bindText('detailRegFee', formatCurrency(en.registrationFee));
  bindText('detailTotalAmount', formatCurrency(en.totalAmount));
  bindText('detailPaymentStatus', en.paymentStatus);
  bindText('detailPaymentMethod', en.paymentMethod || 'UPI Transfer');
  bindText('detailDietary', en.dietary || 'Standard');
  bindText('detailMobility', en.mobility || 'Independent');
  bindText('detailEmergency', en.emergencyContact || 'Family Contact');
  bindText('detailNotes', en.notes || 'No special notes recorded.');

  const badgeEl = document.getElementById('detailStatusBadge');
  if (badgeEl) {
    badgeEl.className = 'admin-badge ' + getEnrollmentStatusBadgeClass(en.status);
  }

  // Action Buttons
  const btnApprove = document.getElementById('btnApproveEnrollment');
  const btnRequestInfo = document.getElementById('btnRequestInfoEnrollment');
  const btnReject = document.getElementById('btnRejectEnrollment');

  if (btnApprove) {
    btnApprove.addEventListener('click', () => {
      en.status = 'Approved';
      saveAdminData(data);
      bindText('detailStatusBadge', 'Approved');
      badgeEl.className = 'admin-badge success';
      showAdminToast(`Enrollment ${en.id} Approved successfully`);
    });
  }

  if (btnRequestInfo) {
    btnRequestInfo.addEventListener('click', () => {
      const reason = prompt("Enter the information or document required from family:", "Please provide updated medical summary & physician clearance.");
      if (reason) {
        en.status = 'More Information Required';
        en.notes = (en.notes ? en.notes + ' | ' : '') + 'Admin Request: ' + reason;
        saveAdminData(data);
        bindText('detailStatusBadge', 'More Information Required');
        bindText('detailNotes', en.notes);
        badgeEl.className = 'admin-badge warning';
        showAdminToast(`Information request sent to ${en.familyName}`);
      }
    });
  }

  if (btnReject) {
    btnReject.addEventListener('click', () => {
      if (confirm(`Are you sure you want to reject enrollment ${en.id}?`)) {
        en.status = 'Rejected';
        saveAdminData(data);
        bindText('detailStatusBadge', 'Rejected');
        badgeEl.className = 'admin-badge danger';
        showAdminToast(`Enrollment ${en.id} set to Rejected`, 'error');
      }
    });
  }
}

/* ==========================================================================
   6. SERVICES PAGE (services.html)
   ========================================================================== */
function initAdminServicesPage() {
  const data = getAdminData();
  const gridEl = document.getElementById('adminServicesGrid');
  const formAddService = document.getElementById('formAddService');

  function renderServices() {
    if (!gridEl) return;
    gridEl.innerHTML = data.services.map(srv => `
      <div class="admin-section-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
            <div>
              <span class="admin-welcome-eyebrow" style="font-size: 0.7rem;">${srv.category}</span>
              <h3 class="admin-card-title" style="font-size: 1.15rem; margin-top: 2px;">${escapeHtml(srv.title)}</h3>
            </div>
            <span class="admin-badge ${srv.status === 'Active' ? 'success' : 'warning'}">${srv.status}</span>
          </div>
          <p style="font-size: 0.86rem; color: var(--admin-text-muted); margin-bottom: 16px;">
            ${escapeHtml(srv.shortDescription)}
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 12px; background: var(--admin-surface-alt); border-radius: 12px; margin-bottom: 16px;">
            <div>
              <span style="font-size: 0.72rem; color: var(--admin-text-subtle); display: block;">MONTHLY FEE</span>
              <strong style="font-size: 1.1rem; color: var(--admin-text-main);">${formatCurrency(srv.price)}</strong>
            </div>
            <div>
              <span style="font-size: 0.72rem; color: var(--admin-text-subtle); display: block;">ENROLLED</span>
              <strong style="font-size: 1.1rem; color: var(--ec-primary-purple);">${srv.activeEnrollments} Seniors</strong>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid var(--admin-border); padding-top: 14px;">
          <button class="btn-admin btn-admin-outline sm" onclick="toggleServiceStatus('${srv.id}')">
            ${srv.status === 'Active' ? 'Disable' : 'Enable'}
          </button>
          <button class="btn-admin btn-admin-secondary sm" onclick="openEditServiceModal('${srv.id}')">
            Edit
          </button>
          <a href="service-details.html?id=${srv.id}" class="btn-admin btn-admin-primary sm">
            Details
          </a>
        </div>
      </div>
    `).join('');
  }

  renderServices();

  if (formAddService) {
    formAddService.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('addServiceTitle').value.trim();
      const category = document.getElementById('addServiceCategory').value;
      const price = parseInt(document.getElementById('addServicePrice').value, 10) || 5000;
      const desc = document.getElementById('addServiceDesc').value.trim();

      if (!title) {
        showAdminToast('Please enter a service title', 'error');
        return;
      }

      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newService = {
        id,
        title,
        category,
        eyebrow: category.toUpperCase(),
        shortDescription: desc || 'Tailored senior day care and holistic enrichment support.',
        price,
        registrationFee: 500,
        duration: 'Monthly Enrollment',
        schedule: 'Monday – Saturday',
        activeEnrollments: 0,
        capacity: 30,
        status: 'Active',
        image: '../assets/images/service_daycare.jpg'
      };

      data.services.push(newService);
      saveAdminData(data);
      renderServices();
      closeAdminModal('modalAddService');
      formAddService.reset();
      showAdminToast(`Service "${title}" added successfully`);
    });
  }
}

window.toggleServiceStatus = function(serviceId) {
  const data = getAdminData();
  const srv = data.services.find(s => s.id === serviceId);
  if (!srv) return;

  srv.status = srv.status === 'Active' ? 'Disabled' : 'Active';
  saveAdminData(data);
  initAdminServicesPage();
  showAdminToast(`Service status updated to ${srv.status}`);
};

window.openEditServiceModal = function(serviceId) {
  const data = getAdminData();
  const srv = data.services.find(s => s.id === serviceId);
  if (!srv) return;

  document.getElementById('editServiceId').value = srv.id;
  document.getElementById('editServiceTitle').value = srv.title;
  document.getElementById('editServicePrice').value = srv.price;
  document.getElementById('editServiceDesc').value = srv.shortDescription;

  openAdminModal('modalEditService');
};

window.saveEditService = function(e) {
  if (e) e.preventDefault();
  const data = getAdminData();
  const serviceId = document.getElementById('editServiceId').value;
  const srv = data.services.find(s => s.id === serviceId);
  if (!srv) return;

  srv.title = document.getElementById('editServiceTitle').value.trim();
  srv.price = parseInt(document.getElementById('editServicePrice').value, 10) || srv.price;
  srv.shortDescription = document.getElementById('editServiceDesc').value.trim();

  saveAdminData(data);
  initAdminServicesPage();
  closeAdminModal('modalEditService');
  showAdminToast(`Service "${srv.title}" updated successfully`);
};

/* ==========================================================================
   7. SERVICE DETAILS PAGE (service-details.html)
   ========================================================================== */
function initAdminServiceDetailsPage() {
  const data = getAdminData();
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id') || 'day-care';

  const srv = data.services.find(s => s.id === serviceId) || data.services[0];
  if (!srv) return;

  const bindText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  bindText('srvDetailTitle', srv.title);
  bindText('srvDetailCategory', srv.category);
  bindText('srvDetailPrice', formatCurrency(srv.price) + ' / month');
  bindText('srvDetailEnrollments', srv.activeEnrollments + ' Active Enrollments');
  bindText('srvDetailDesc', srv.shortDescription);
  bindText('srvDetailSchedule', srv.schedule);
  bindText('srvDetailStatus', srv.status);

  // Render list of enrolled seniors in this service
  const enrolledSeniors = data.seniors.filter(s => s.serviceId === srv.id);
  const tableBody = document.getElementById('srvEnrolledSeniorsTable');
  if (tableBody) {
    if (enrolledSeniors.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="admin-dropdown-empty">No seniors actively enrolled in this service.</td></tr>`;
    } else {
      tableBody.innerHTML = enrolledSeniors.map(s => `
        <tr>
          <td data-label="Senior">
            <div class="admin-user-cell">
              <img src="${s.photo}" alt="${escapeHtml(s.name)}" class="admin-table-avatar">
              <div>
                <span class="admin-cell-name">${escapeHtml(s.name)}</span>
                <span class="admin-cell-sub">Age ${s.age}</span>
              </div>
            </div>
          </td>
          <td data-label="Family">${escapeHtml(s.familyName)}</td>
          <td data-label="Schedule">${escapeHtml(s.schedule)}</td>
          <td data-label="Status"><span class="admin-badge success">${s.status}</span></td>
          <td data-label="Action">
            <a href="enrollment-details.html?id=${s.enrollmentId}" class="btn-admin btn-admin-secondary sm">View</a>
          </td>
        </tr>
      `).join('');
    }
  }
}

/* ==========================================================================
   8. SCHEDULES PAGE (schedules.html)
   ========================================================================== */
function initAdminSchedulesPage() {
  const data = getAdminData();
  const timelineEl = document.getElementById('adminScheduleTimeline');
  const formAddSchedule = document.getElementById('formAddSchedule');

  function renderTimeline() {
    if (!timelineEl) return;
    timelineEl.innerHTML = data.todaySchedule.map(item => `
      <div class="admin-timeline-item ${item.status === 'completed' ? 'completed' : ''}">
        <div class="admin-timeline-dot"></div>
        <div class="admin-timeline-content">
          <div class="admin-timeline-header">
            <span class="admin-timeline-time">${item.time}</span>
            <span class="admin-badge ${item.status === 'completed' ? 'success' : 'purple'}">${item.status === 'completed' ? 'Completed' : 'Upcoming'}</span>
          </div>
          <h4 class="admin-timeline-title">${escapeHtml(item.title)}</h4>
          <p class="admin-timeline-desc">${escapeHtml(item.desc)}</p>
        </div>
      </div>
    `).join('');
  }

  renderTimeline();

  if (formAddSchedule) {
    formAddSchedule.addEventListener('submit', (e) => {
      e.preventDefault();
      const time = document.getElementById('addScheduleTime').value.trim();
      const title = document.getElementById('addScheduleTitle').value.trim();
      const desc = document.getElementById('addScheduleDesc').value.trim();

      if (!time || !title) {
        showAdminToast('Please fill all fields', 'error');
        return;
      }

      data.todaySchedule.push({
        time,
        title,
        desc: desc || 'Scheduled care activity.',
        status: 'upcoming',
        type: 'Activity'
      });

      saveAdminData(data);
      renderTimeline();
      closeAdminModal('modalAddSchedule');
      formAddSchedule.reset();
      showAdminToast(`Schedule item added for ${time}`);
    });
  }
}

/* ==========================================================================
   9. ATTENDANCE PAGE (attendance.html)
   ========================================================================== */
function initAdminAttendancePage() {
  let data = getAdminData();
  const tableBody = document.getElementById('adminAttendanceTableBody');
  const searchInput = document.getElementById('attendanceSearchInput');
  const statusFilter = document.getElementById('attendanceStatusFilter');

  function renderAttendance() {
    if (!tableBody) return;
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const status = statusFilter ? statusFilter.value : 'all';

    const filtered = data.seniors.filter(s => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.serviceName.toLowerCase().includes(q);
      const matchSt = status === 'all' || s.attendanceToday.toLowerCase() === status.toLowerCase();
      return matchQ && matchSt;
    });

    // Update Summary Counters
    const presentCount = data.seniors.filter(s => s.attendanceToday === 'Present').length;
    const absentCount = data.seniors.filter(s => s.attendanceToday === 'Absent').length;
    const lateCount = data.seniors.filter(s => s.attendanceToday === 'Late').length;

    const bindNum = (id, n) => {
      const el = document.getElementById(id);
      if (el) el.textContent = n;
    };
    bindNum('attSummaryPresent', presentCount);
    bindNum('attSummaryAbsent', absentCount);
    bindNum('attSummaryLate', lateCount);
    bindNum('attSummaryTotal', data.seniors.length);

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="admin-dropdown-empty">No attendance records found.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(s => `
      <tr>
        <td data-label="Senior">
          <div class="admin-user-cell">
            <img src="${s.photo}" alt="${escapeHtml(s.name)}" class="admin-table-avatar">
            <div>
              <span class="admin-cell-name">${escapeHtml(s.name)}</span>
              <span class="admin-cell-sub">${escapeHtml(s.emergencyContact)}</span>
            </div>
          </div>
        </td>
        <td data-label="Service">${escapeHtml(s.serviceName)}</td>
        <td data-label="Check-In Time"><strong>${s.checkInTime}</strong></td>
        <td data-label="Check-Out Time">${s.checkOutTime}</td>
        <td data-label="Status">
          <span class="admin-badge ${s.attendanceToday === 'Present' ? 'success' : (s.attendanceToday === 'Late' ? 'warning' : (s.attendanceToday === 'Absent' ? 'danger' : 'info'))}">
            ${s.attendanceToday}
          </span>
        </td>
        <td data-label="Actions">
          <div style="display: flex; gap: 6px; justify-content: flex-end;">
            <button class="btn-admin btn-admin-success sm" onclick="recordSeniorCheckIn('${s.id}')">Check In</button>
            <button class="btn-admin btn-admin-outline sm" onclick="recordSeniorCheckOut('${s.id}')">Check Out</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('input', renderAttendance);
  if (statusFilter) statusFilter.addEventListener('change', renderAttendance);

  renderAttendance();
}

window.recordSeniorCheckIn = function(seniorId) {
  const data = getAdminData();
  const senior = data.seniors.find(s => s.id === seniorId);
  if (!senior) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  senior.attendanceToday = 'Present';
  senior.checkInTime = timeStr;
  senior.checkOutTime = '—';

  saveAdminData(data);
  initAdminAttendancePage();
  showAdminToast(`Checked in ${senior.name} at ${timeStr}`);
};

window.recordSeniorCheckOut = function(seniorId) {
  const data = getAdminData();
  const senior = data.seniors.find(s => s.id === seniorId);
  if (!senior) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  senior.checkOutTime = timeStr;

  saveAdminData(data);
  initAdminAttendancePage();
  showAdminToast(`Checked out ${senior.name} at ${timeStr}`);
};

/* ==========================================================================
   10. ACTIVITIES PAGE (activities.html)
   ========================================================================== */
function initAdminActivitiesPage() {
  const data = getAdminData();
  const listEl = document.getElementById('adminActivitiesGrid');
  const catFilter = document.getElementById('activityCategoryFilter');
  const formAddActivity = document.getElementById('formAddActivity');

  function renderActivities() {
    if (!listEl) return;
    const cat = catFilter ? catFilter.value : 'all';

    const filtered = data.activities.filter(act => {
      return cat === 'all' || act.category.toLowerCase() === cat.toLowerCase();
    });

    listEl.innerHTML = filtered.map(act => `
      <div class="admin-section-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px;">
            <span class="admin-badge purple">${act.category}</span>
            <span class="admin-badge ${act.status === 'Completed' ? 'success' : 'warning'}">${act.status}</span>
          </div>
          <h3 class="admin-card-title" style="font-size: 1.15rem; margin-bottom: 6px;">${escapeHtml(act.name)}</h3>
          <p style="font-size: 0.85rem; color: var(--admin-text-muted); margin-bottom: 14px;">${escapeHtml(act.description)}</p>
          
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; color: var(--admin-text-subtle); padding: 10px; background: var(--admin-surface-alt); border-radius: 10px; margin-bottom: 14px;">
            <div><strong>Time:</strong> ${act.date} • ${act.time}</div>
            <div><strong>Location:</strong> ${act.location}</div>
            <div><strong>Facilitator:</strong> ${act.facilitator}</div>
            <div><strong>Participants:</strong> ${act.participants} / ${act.maxParticipants} Seniors</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid var(--admin-border); padding-top: 12px;">
          ${act.status !== 'Completed' ? `
            <button class="btn-admin btn-admin-success sm" onclick="markActivityComplete('${act.id}')">
              Mark Completed
            </button>
          ` : ''}
          <button class="btn-admin btn-admin-secondary sm" onclick="openEditActivityModal('${act.id}')">
            Edit
          </button>
        </div>
      </div>
    `).join('');
  }

  if (catFilter) catFilter.addEventListener('change', renderActivities);
  renderActivities();

  if (formAddActivity) {
    formAddActivity.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('addActName').value.trim();
      const category = document.getElementById('addActCategory').value;
      const time = document.getElementById('addActTime').value.trim();
      const location = document.getElementById('addActLocation').value.trim();
      const facilitator = document.getElementById('addActFacilitator').value.trim();
      const desc = document.getElementById('addActDesc').value.trim();

      if (!name || !time) {
        showAdminToast('Please fill all required fields', 'error');
        return;
      }

      const newAct = {
        id: 'ACT-' + (data.activities.length + 1).toString().padStart(3, '0'),
        name,
        category,
        date: 'Today',
        time,
        participants: 10,
        maxParticipants: 25,
        status: 'Upcoming',
        facilitator: facilitator || 'Care Team ElderCare',
        location: location || 'Main Activity Hall',
        description: desc || 'Senior group activity.'
      };

      data.activities.unshift(newAct);
      saveAdminData(data);
      renderActivities();
      closeAdminModal('modalAddActivity');
      formAddActivity.reset();
      showAdminToast(`Activity "${name}" created successfully`);
    });
  }
}

window.markActivityComplete = function(actId) {
  const data = getAdminData();
  const act = data.activities.find(a => a.id === actId);
  if (!act) return;

  act.status = 'Completed';
  saveAdminData(data);
  initAdminActivitiesPage();
  showAdminToast(`Activity "${act.name}" marked as completed`);
};

window.openEditActivityModal = function(actId) {
  const data = getAdminData();
  const act = data.activities.find(a => a.id === actId);
  if (!act) return;

  document.getElementById('editActId').value = act.id;
  document.getElementById('editActName').value = act.name;
  document.getElementById('editActTime').value = act.time;
  document.getElementById('editActLocation').value = act.location;
  document.getElementById('editActDesc').value = act.description;

  openAdminModal('modalEditActivity');
};

window.saveEditActivity = function(e) {
  if (e) e.preventDefault();
  const data = getAdminData();
  const actId = document.getElementById('editActId').value;
  const act = data.activities.find(a => a.id === actId);
  if (!act) return;

  act.name = document.getElementById('editActName').value.trim();
  act.time = document.getElementById('editActTime').value.trim();
  act.location = document.getElementById('editActLocation').value.trim();
  act.description = document.getElementById('editActDesc').value.trim();

  saveAdminData(data);
  initAdminActivitiesPage();
  closeAdminModal('modalEditActivity');
  showAdminToast(`Activity "${act.name}" updated successfully`);
};

/* ==========================================================================
   11. WELLNESS PAGE (wellness.html)
   ========================================================================== */
function initAdminWellnessPage() {
  const data = getAdminData();
  const listEl = document.getElementById('adminWellnessList');
  const formAddWellness = document.getElementById('formAddWellness');

  function renderWellness() {
    if (!listEl) return;
    listEl.innerHTML = data.wellnessObservations.map(w => `
      <div class="admin-section-card">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 class="admin-card-title" style="font-size: 1.15rem;">${escapeHtml(w.seniorName)}</h3>
            <span class="admin-cell-sub">Recorded on ${w.date} at ${w.time} by ${escapeHtml(w.recordedBy)}</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <span class="admin-badge success">${escapeHtml(w.mood)}</span>
            <span class="admin-badge purple">Energy: ${escapeHtml(w.energy)}</span>
          </div>
        </div>

        <div style="padding: 12px; background: var(--admin-surface-alt); border-radius: 12px; font-size: 0.9rem; color: var(--admin-text-main);">
          "${escapeHtml(w.generalObservation)}"
        </div>

        <div style="display: flex; gap: 20px; font-size: 0.82rem; color: var(--admin-text-subtle);">
          <span><strong>Participation:</strong> ${escapeHtml(w.participation)}</span>
          <span><strong>Hydration:</strong> ${escapeHtml(w.hydration || 'Adequate')}</span>
        </div>
      </div>
    `).join('');
  }

  renderWellness();

  if (formAddWellness) {
    formAddWellness.addEventListener('submit', (e) => {
      e.preventDefault();
      const seniorId = document.getElementById('addWelSenior').value;
      const seniorObj = data.seniors.find(s => s.id === seniorId) || data.seniors[0];
      const mood = document.getElementById('addWelMood').value;
      const energy = document.getElementById('addWelEnergy').value;
      const participation = document.getElementById('addWelParticipation').value;
      const notes = document.getElementById('addWelNotes').value.trim();

      if (!notes) {
        showAdminToast('Please enter an observation note', 'error');
        return;
      }

      const newLog = {
        id: 'WEL-' + (data.wellnessObservations.length + 1).toString().padStart(3, '0'),
        seniorId: seniorObj.id,
        seniorName: seniorObj.name,
        date: '07 Oct 2026',
        time: '12:30 PM',
        mood,
        energy,
        participation,
        hydration: 'Good',
        generalObservation: notes,
        recordedBy: 'Care Team ElderCare'
      };

      data.wellnessObservations.unshift(newLog);
      data.stats.wellnessReports += 1;
      saveAdminData(data);
      renderWellness();
      closeAdminModal('modalAddWellness');
      formAddWellness.reset();
      showAdminToast(`Wellness observation recorded for ${seniorObj.name}`);
    });
  }
}

/* ==========================================================================
   12. REPORTS PAGE (reports.html)
   ========================================================================== */
function initAdminReportsPage() {
  const data = getAdminData();
  const listEl = document.getElementById('adminReportsGrid');
  const typeFilter = document.getElementById('reportTypeFilter');

  function renderReports() {
    if (!listEl) return;
    const t = typeFilter ? typeFilter.value : 'all';

    const filtered = data.reports.filter(r => {
      return t === 'all' || r.type.toLowerCase().includes(t.toLowerCase());
    });

    listEl.innerHTML = filtered.map(r => `
      <div class="admin-section-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px;">
            <span class="admin-badge purple">${r.type}</span>
            <span style="font-size: 0.75rem; color: var(--admin-text-subtle);">${r.date}</span>
          </div>
          <h3 class="admin-card-title" style="font-size: 1.15rem; margin-bottom: 6px;">${escapeHtml(r.title)}</h3>
          <p style="font-size: 0.85rem; color: var(--admin-text-muted); margin-bottom: 12px;">${escapeHtml(r.summary)}</p>
          
          <div style="font-size: 0.78rem; color: var(--admin-text-subtle); margin-bottom: 14px;">
            <span>${r.recordsCount}</span> • <span>${r.fileSize}</span>
          </div>
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid var(--admin-border); padding-top: 12px;">
          <button class="btn-admin btn-admin-secondary sm" onclick="simulatedViewReport('${r.id}')">
            View
          </button>
          <button class="btn-admin btn-admin-primary sm" onclick="simulatedDownloadReport('${r.id}')">
            Download PDF
          </button>
        </div>
      </div>
    `).join('');
  }

  if (typeFilter) typeFilter.addEventListener('change', renderReports);
  renderReports();
}

window.simulatedDownloadReport = function(repId) {
  const data = getAdminData();
  const rep = data.reports.find(r => r.id === repId);
  const title = rep ? rep.title : 'ElderCare_Report';
  showAdminToast(`Preparing download for "${title}.pdf"...`, 'info');
  setTimeout(() => {
    showAdminToast(`Downloaded "${title}.pdf" successfully!`);
  }, 800);
};

window.simulatedViewReport = function(repId) {
  const data = getAdminData();
  const rep = data.reports.find(r => r.id === repId);
  if (!rep) return;

  alert(`Report: ${rep.title}\nPeriod: ${rep.period}\nSummary: ${rep.summary}\nTotal Records: ${rep.recordsCount}`);
};

/* ==========================================================================
   13. BILLING PAGE (billing.html)
   ========================================================================== */
function initAdminBillingPage() {
  let data = getAdminData();
  const tableBody = document.getElementById('adminBillingTableBody');
  const statusFilter = document.getElementById('billingStatusFilter');

  function renderBilling() {
    if (!tableBody) return;
    const status = statusFilter ? statusFilter.value : 'all';

    const filtered = data.billing.transactions.filter(tx => {
      return status === 'all' || tx.status.toLowerCase() === status.toLowerCase();
    });

    tableBody.innerHTML = filtered.map(tx => `
      <tr>
        <td data-label="Txn ID"><strong>${tx.id}</strong></td>
        <td data-label="Family">${escapeHtml(tx.familyName)}</td>
        <td data-label="Senior">${escapeHtml(tx.seniorName)}</td>
        <td data-label="Service">${escapeHtml(tx.serviceName)}</td>
        <td data-label="Amount"><strong>${tx.amount}</strong></td>
        <td data-label="Date">${tx.date}</td>
        <td data-label="Status">
          <span class="admin-badge ${tx.status === 'Paid' ? 'success' : 'warning'}">${tx.status}</span>
        </td>
        <td data-label="Action">
          <div style="display: flex; gap: 6px; justify-content: flex-end;">
            ${tx.status !== 'Paid' ? `
              <button class="btn-admin btn-admin-success sm" onclick="markTransactionPaid('${tx.id}')">
                Mark Paid
              </button>
            ` : ''}
            <button class="btn-admin btn-admin-secondary sm" onclick="viewInvoiceModal('${tx.id}')">
              Invoice
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  if (statusFilter) statusFilter.addEventListener('change', renderBilling);
  renderBilling();
}

window.markTransactionPaid = function(txnId) {
  const data = getAdminData();
  const tx = data.billing.transactions.find(t => t.id === txnId);
  if (!tx) return;

  tx.status = 'Paid';
  data.billing.paidAmount += 5500;
  data.billing.pendingAmount -= 5500;
  data.billing.formattedPaidAmount = formatCurrency(data.billing.paidAmount);
  data.billing.formattedPendingAmount = formatCurrency(data.billing.pendingAmount);

  saveAdminData(data);
  initAdminBillingPage();
  showAdminToast(`Transaction ${txnId} marked as Paid`);
};

window.viewInvoiceModal = function(txnId) {
  const data = getAdminData();
  const tx = data.billing.transactions.find(t => t.id === txnId);
  if (!tx) return;

  alert(`ElderCare Official Invoice\nTransaction: ${tx.id}\nFamily: ${tx.familyName}\nSenior: ${tx.seniorName}\nService: ${tx.serviceName}\nAmount: ${tx.amount}\nStatus: ${tx.status}`);
};

/* ==========================================================================
   14. MESSAGES PAGE (messages.html)
   ========================================================================== */
function initAdminMessagesPage() {
  const data = getAdminData();
  const listEl = document.getElementById('adminMessagesList');
  const threadHeader = document.getElementById('adminMessageThreadHeader');
  const threadBody = document.getElementById('adminMessageThreadBody');
  const formReply = document.getElementById('formAdminMessageReply');

  let activeMsgId = data.messages[0] ? data.messages[0].id : null;

  function renderMessagesList() {
    if (!listEl) return;
    listEl.innerHTML = data.messages.map(m => `
      <div class="admin-attention-item ${m.id === activeMsgId ? 'active' : ''}" style="cursor: pointer; ${m.id === activeMsgId ? 'border-color: var(--ec-primary-purple); background: var(--admin-surface);' : ''}" onclick="selectMessageThread('${m.id}')">
        <div class="admin-attention-main">
          <div class="admin-user-avatar" style="width: 36px; height: 36px;">${m.familyName[0]}</div>
          <div class="admin-attention-details">
            <span class="admin-attention-title">${escapeHtml(m.familyName)} <small style="font-weight: normal; color: var(--admin-text-subtle);">(${escapeHtml(m.seniorName)})</small></span>
            <span class="admin-attention-desc" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">${escapeHtml(m.preview)}</span>
          </div>
        </div>
        <div style="text-align: end;">
          <span style="font-size: 0.72rem; color: var(--admin-text-subtle); display: block;">${m.time}</span>
          ${m.unread ? '<span class="admin-badge purple" style="margin-top: 4px;">New</span>' : ''}
        </div>
      </div>
    `).join('');
  }

  function renderActiveThread() {
    const activeMsg = data.messages.find(m => m.id === activeMsgId);
    if (!activeMsg || !threadBody) return;

    // Mark as read
    activeMsg.unread = false;
    saveAdminData(data);
    renderMessagesList();
    renderNotifBadge();

    if (threadHeader) {
      threadHeader.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="admin-user-avatar">${activeMsg.familyName[0]}</div>
          <div>
            <h3 class="admin-card-title" style="font-size: 1.1rem;">${escapeHtml(activeMsg.familyName)}</h3>
            <span class="admin-cell-sub">Senior: ${escapeHtml(activeMsg.seniorName)}</span>
          </div>
        </div>
      `;
    }

    threadBody.innerHTML = activeMsg.thread.map(t => `
      <div style="display: flex; flex-direction: column; align-items: ${t.sender === 'Admin' ? 'flex-end' : 'flex-start'}; margin-bottom: 14px;">
        <div style="max-width: 80%; padding: 12px 16px; border-radius: 14px; background: ${t.sender === 'Admin' ? 'var(--ec-primary-purple)' : 'var(--admin-surface-alt)'}; color: ${t.sender === 'Admin' ? '#FFFFFF' : 'var(--admin-text-main)'}; font-size: 0.9rem;">
          ${escapeHtml(t.text)}
        </div>
        <span style="font-size: 0.7rem; color: var(--admin-text-subtle); margin-top: 3px;">${t.sender} • ${t.time}</span>
      </div>
    `).join('');

    threadBody.scrollTop = threadBody.scrollHeight;
  }

  window.selectMessageThread = function(msgId) {
    activeMsgId = msgId;
    renderMessagesList();
    renderActiveThread();
  };

  renderMessagesList();
  renderActiveThread();

  if (formReply) {
    formReply.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('adminReplyInput');
      const text = input ? input.value.trim() : '';
      if (!text) return;

      const activeMsg = data.messages.find(m => m.id === activeMsgId);
      if (!activeMsg) return;

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      activeMsg.thread.push({
        sender: 'Admin',
        time: timeStr,
        text
      });
      activeMsg.preview = text;
      activeMsg.time = timeStr;

      saveAdminData(data);
      input.value = '';
      renderActiveThread();
      renderMessagesList();
      showAdminToast("Reply sent to family");
    });
  }
}

/* ==========================================================================
   15. NOTIFICATIONS PAGE (notifications.html)
   ========================================================================== */
function initAdminNotificationsPage() {
  const data = getAdminData();
  const listEl = document.getElementById('adminNotificationsPageList');
  const btnMarkAll = document.getElementById('btnMarkAllNotifsRead');

  function renderNotifs() {
    if (!listEl) return;
    if (data.notifications.length === 0) {
      listEl.innerHTML = `<div class="admin-empty-state"><h4 class="admin-empty-title">All Caught Up</h4><p class="admin-empty-desc">You have no new alerts.</p></div>`;
      return;
    }

    listEl.innerHTML = data.notifications.map(n => `
      <div class="admin-attention-item ${!n.read ? 'active' : ''}" style="${!n.read ? 'border-color: var(--ec-purple-light); background: var(--admin-surface);' : ''}">
        <div class="admin-attention-main">
          <div class="admin-notif-dot-small" ${n.read ? 'style="opacity:0;"' : ''}></div>
          <div class="admin-attention-details">
            <span class="admin-attention-title">${escapeHtml(n.title)}</span>
            <span class="admin-attention-desc">${escapeHtml(n.message)}</span>
            <span style="font-size: 0.72rem; color: var(--admin-text-subtle); margin-top: 4px;">${n.time}</span>
          </div>
        </div>
        <div>
          <a href="${n.link || '#'}" class="btn-admin btn-admin-secondary sm" onclick="markSingleNotifRead('${n.id}')">View</a>
        </div>
      </div>
    `).join('');
  }

  renderNotifs();

  if (btnMarkAll) {
    btnMarkAll.addEventListener('click', () => {
      data.notifications.forEach(n => n.read = true);
      saveAdminData(data);
      renderNotifs();
      renderNotifBadge();
      showAdminToast("All notifications marked as read");
    });
  }
}

window.markSingleNotifRead = function(notifId) {
  const data = getAdminData();
  const n = data.notifications.find(item => item.id === notifId);
  if (n) {
    n.read = true;
    saveAdminData(data);
  }
};

/* ==========================================================================
   16. SETTINGS PAGE (settings.html)
   ========================================================================== */
function initAdminSettingsPage() {
  const data = getAdminData();
  const formProfile = document.getElementById('formAdminProfileSettings');
  const formPrefs = document.getElementById('formAdminNotificationPrefs');
  const btnResetData = document.getElementById('btnResetAdminData');

  // Fill current settings
  const bindVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  };

  bindVal('settingAdminName', data.settings.adminName);
  bindVal('settingAdminEmail', data.settings.adminEmail);
  bindVal('settingAdminPhone', data.settings.adminPhone);
  bindVal('settingAdminRole', data.settings.adminRole);

  const themeSwitch = document.getElementById('settingsThemeToggle');
  if (themeSwitch) {
    themeSwitch.checked = document.documentElement.getAttribute('data-theme') === 'dark';
    themeSwitch.addEventListener('change', (e) => {
      const isDark = e.target.checked;
      const theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('eldercare-theme', theme);
      showAdminToast(`Theme changed to ${theme.toUpperCase()}`);
    });
  }

  const rtlSwitch = document.getElementById('settingsRtlToggle');
  if (rtlSwitch) {
    rtlSwitch.checked = document.documentElement.getAttribute('dir') === 'rtl';
    rtlSwitch.addEventListener('change', (e) => {
      const isRtl = e.target.checked;
      const dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', dir);
      localStorage.setItem('eldercare-direction', dir);
      showAdminToast(`Layout changed to ${dir.toUpperCase()}`);
    });
  }

  if (formProfile) {
    formProfile.addEventListener('submit', (e) => {
      e.preventDefault();
      data.settings.adminName = document.getElementById('settingAdminName').value.trim();
      data.settings.adminEmail = document.getElementById('settingAdminEmail').value.trim();
      data.settings.adminPhone = document.getElementById('settingAdminPhone').value.trim();
      data.settings.adminRole = document.getElementById('settingAdminRole').value.trim();
      data.admin.name = data.settings.adminName;
      data.admin.email = data.settings.adminEmail;

      saveAdminData(data);
      showAdminToast("Admin profile updated successfully");
    });
  }

  if (formPrefs) {
    formPrefs.addEventListener('submit', (e) => {
      e.preventDefault();
      showAdminToast("Notification preferences updated");
    });
  }

  if (btnResetData) {
    btnResetData.addEventListener('click', () => {
      if (confirm("WARNING: This will reset all admin mock data (users, seniors, enrollments, billing) back to initial demo defaults. Proceed?")) {
        if (confirm("Please confirm one more time: Reset all demo data?")) {
          resetAdminData();
          showAdminToast("Demo data reset to defaults. Refreshing...", "info");
          setTimeout(() => {
            window.location.reload();
          }, 600);
        }
      }
    });
  }
}
