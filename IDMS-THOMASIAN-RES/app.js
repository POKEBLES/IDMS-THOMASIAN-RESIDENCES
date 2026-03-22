// Mock Data
const db = {
    tenants: [
        { id: 'T001', name: 'Maria Santos', course: 'BS Architecture', contact: '0917-123-4567', emergName: 'Jose Santos', emergContact: '0918-765-4321', status: 'Active' },
        { id: 'T002', name: 'Juan Cruz', course: 'BS Civil Engineering', contact: '0917-234-5678', emergName: 'Rosa Cruz', emergContact: '0918-876-5432', status: 'Active' },
        { id: 'T003', name: 'Ana Reyes', course: 'BS Nursing', contact: '0917-345-6789', emergName: 'Pedro Reyes', emergContact: '0918-987-6543', status: 'Inactive' },
        { id: 'T004', name: 'Mark Garcia', course: 'BS Accountancy', contact: '0917-456-7890', emergName: 'Luis Garcia', emergContact: '0918-098-7654', status: 'Active' }
    ],
    payments: [
        { ref: 'TR-2023-001', tenantId: 'T001', amount: '₱15,000.00', date: 'Oct 01, 2026', status: 'Verified' },
        { ref: 'TR-2023-002', tenantId: 'T002', amount: '₱12,500.00', date: 'Oct 03, 2026', status: 'Pending' },
        { ref: 'TR-2023-003', tenantId: 'T004', amount: '₱15,000.00', date: 'Oct 05, 2026', status: 'Verified' }
    ],
    inventory: [
        { roomNo: '201A', type: 'Quad Sharing', maxBeds: 4, acStatus: 'Functional', bathStatus: 'Functional', deskAvail: 4 },
        { roomNo: '201B', type: 'Double Sharing', maxBeds: 2, acStatus: 'Requires Maintenance', bathStatus: 'Functional', deskAvail: 2 },
        { roomNo: '305', type: 'Single Premium', maxBeds: 1, acStatus: 'Functional', bathStatus: 'Functional', deskAvail: 1 },
        { roomNo: '410', type: 'Quad Sharing', maxBeds: 4, acStatus: 'Functional', bathStatus: 'Repair Scheduled', deskAvail: 4 }
    ],
    rooms: [
        { roomNo: '201A', status: 'Active', occFraction: '4/4', vacancy: 'Full', dictPrice: '₱7,500/head', tenants: ['Maria Santos', 'Ana Reyes', 'Bea Alonzo', 'Liza Soberano'] },
        { roomNo: '201B', status: 'Active', occFraction: '1/2', vacancy: '1 Bed Avail.', dictPrice: '₱12,500/head', tenants: ['Juan Cruz'] },
        { roomNo: '305', status: 'Inactive', occFraction: '0/1', vacancy: 'Vacant (Cleaning)', dictPrice: '₱25,000/room', tenants: [] },
        { roomNo: '410', status: 'Active', occFraction: '2/4', vacancy: '2 Beds Avail.', dictPrice: '₱7,500/head', tenants: ['Mark Garcia', 'Leo Valdes'] }
    ],
    maintenance: [
        { id: 'M-001', location: 'Room 201B', issue: 'AC weak cooling', urgency: 'Medium', dateLogged: 'Oct 10, 2026', status: 'Pending' },
        { id: 'M-002', location: 'Room 410', issue: 'Showerhead leaking', urgency: 'Low', dateLogged: 'Oct 12, 2026', status: 'Scheduled' },
        { id: 'M-003', location: 'Main Lobby', issue: 'Broken main glass door', urgency: 'Critical', dateLogged: 'Oct 15, 2026', status: 'Resolved' }
    ]
};

// DOM Elements
const sidebarNav = document.getElementById('sidebarNav');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const contentArea = document.getElementById('contentArea');
const formModal = document.getElementById('formModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// View Configurations
const views = {
    dashboard: {
        title: 'Dashboard Overview',
        subtitle: 'Welcome back, here\'s what\'s happening today.',
        render: renderDashboard
    },
    tenant: {
        title: 'Tenant Profile Management',
        subtitle: 'Manage primary demographic and state data of the residents.',
        render: renderTenant
    },
    payment: {
        title: 'Payment Processing',
        subtitle: 'Transform raw payment inputs into verified financial records.',
        render: renderPayment
    },
    inventory: {
        title: 'Inventory Tracking',
        subtitle: 'Manage dormitory physical capacity and amenity statuses.',
        render: renderInventory
    },
    room: {
        title: 'Room Management',
        subtitle: 'Track active state, vacancy, occupancy, and dictacted pricing.',
        render: renderRoom
    },
    maintenance: {
        title: 'Maintenance Logging',
        subtitle: 'Record facility issues, locations, and assign urgency levels.',
        render: renderMaintenance
    }
};

// Event Listeners
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        
        // Load view
        const targetView = item.getAttribute('data-view');
        loadView(targetView);
    });
});

closeModalBtn.addEventListener('click', closeModal);
formModal.addEventListener('click', (e) => {
    if (e.target === formModal) closeModal();
});

// Functions
function loadView(viewName) {
    const view = views[viewName];
    if (!view) return;
    
    pageTitle.textContent = view.title;
    pageSubtitle.textContent = view.subtitle;
    contentArea.innerHTML = ''; // Clear prev content
    
    // Animate transition
    contentArea.style.animation = 'none';
    contentArea.offsetHeight; /* trigger reflow */
    contentArea.style.animation = null; 
    
    view.render();
}

function openModal(title, htmlContent) {
    modalTitle.textContent = title;
    modalBody.innerHTML = htmlContent;
    formModal.style.visibility = 'visible';
    formModal.classList.add('open');
}

function closeModal() {
    formModal.classList.remove('open');
    setTimeout(() => {
        formModal.style.visibility = 'hidden';
    }, 200);
}

// Render Functions
function renderDashboard() {
    contentArea.innerHTML = `
        <div class="grid-cards">
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Total Active Tenants</span>
                    <div class="card-icon yellow"><i class="ph-fill ph-users"></i></div>
                </div>
                <div class="card-value">248</div>
                <div class="card-trend trend-up">
                    <i class="ph-bold ph-arrow-up-right"></i>
                    <span>12 since last month</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Overall Occupancy</span>
                    <div class="card-icon"><i class="ph-fill ph-bed"></i></div>
                </div>
                <div class="card-value">85%</div>
                <div style="margin-top: 12px;">
                    <div class="progress-bar-bg">
                        <div class="progress-bar" style="width: 85%"></div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Pending Payments</span>
                    <div class="card-icon yellow"><i class="ph-fill ph-coin"></i></div>
                </div>
                <div class="card-value">₱142,500</div>
                <div class="card-trend trend-down">
                    <i class="ph-bold ph-warning-circle"></i>
                    <span>18 unverified records</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Active Maintenance</span>
                    <div class="card-icon"><i class="ph-fill ph-wrench"></i></div>
                </div>
                <div class="card-value">7</div>
                <div class="card-trend trend-up" style="color: var(--danger)">
                    <i class="ph-bold ph-warning"></i>
                    <span>2 Critical Issues</span>
                </div>
            </div>
        </div>
        
        <div class="table-container">
            <div class="table-header">
                <span class="table-title">Recent System Activity</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Module</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Payment TR-2023-001 Verified</td>
                        <td>Payment Processing</td>
                        <td>10 mins ago</td>
                        <td><span class="status active">Success</span></td>
                    </tr>
                    <tr>
                        <td>New Tenant Profile: M. Garcia</td>
                        <td>Tenant Profile</td>
                        <td>1 hour ago</td>
                        <td><span class="status active">Added</span></td>
                    </tr>
                    <tr>
                        <td>Issue Logged: Rm 201B AC</td>
                        <td>Maintenance</td>
                        <td>2 hours ago</td>
                        <td><span class="status pending">Medium Alert</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderTenant() {
    let rows = db.tenants.map(t => `
        <tr>
            <td style="font-weight: 500">${t.name}<br><span class="text-muted" style="font-size: 12px; font-weight: normal">${t.id}</span></td>
            <td>${t.course}</td>
            <td>${t.contact}</td>
            <td>${t.emergName} <br><span class="text-muted" style="font-size: 12px">${t.emergContact}</span></td>
            <td><span class="status ${t.status.toLowerCase()}">${t.status}</span></td>
            <td>
                <button class="icon-btn" style="width: 32px; height: 32px"><i class="ph ph-pencil-simple"></i></button>
            </td>
        </tr>
    `).join('');

    contentArea.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <span class="table-title">Tenant Directory</span>
                <div class="table-actions">
                    <div class="form-control" style="width: 250px; display: flex; align-items: center; padding: 0; position: relative;">
                        <i class="ph ph-magnifying-glass" style="position: absolute; left: 12px; color: var(--text-muted)"></i>
                        <input type="text" placeholder="Search tenants..." style="border:none; outline:none; background:transparent; padding: 8px 12px 8px 36px; width:100%; font-family:inherit; font-size:14px;">
                    </div>
                    <button class="btn btn-primary" id="addTenantBtn">
                        <i class="ph-bold ph-plus"></i> New Tenant
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Resident Name</th>
                        <th>Course/Program</th>
                        <th>Contact No.</th>
                        <th>Emergency Contact</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;

    document.getElementById('addTenantBtn').addEventListener('click', () => {
        openModal('Add New Tenant Profile', `
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control" placeholder="Last Name, First Name M.I.">
            </div>
            <div class="form-group">
                <label>Program / Course</label>
                <input type="text" class="form-control" placeholder="e.g. BS Architecture">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label>Personal Contact</label>
                    <input type="text" class="form-control" placeholder="09XX-XXX-XXXX">
                </div>
                <div class="form-group">
                    <label>State</label>
                    <select class="form-control">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending Intake</option>
                    </select>
                </div>
            </div>
            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 16px 0;">
            <div class="form-group">
                <label>Emergency Contact Name</label>
                <input type="text" class="form-control" placeholder="Guardian's Full Name">
            </div>
            <div class="form-group">
                <label>Emergency Contact No.</label>
                <input type="text" class="form-control" placeholder="09XX-XXX-XXXX">
            </div>
            <div class="form-actions">
                <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="closeModal()">Save Profile</button>
            </div>
        `);
    });
}

function renderPayment() {
    let rows = db.payments.map(p => `
        <tr>
            <td style="font-family: monospace; font-weight: 600; font-size: 13px;">${p.ref}</td>
            <td>${p.tenantId}</td>
            <td style="font-weight: 600; color: var(--primary-blue)">${p.amount}</td>
            <td>${p.date}</td>
            <td><span class="status ${p.status === 'Verified' ? 'active' : 'pending'}">${p.status}</span></td>
            <td>
                <button class="icon-btn" style="width: 32px; height: 32px"><i class="ph ph-check-circle"></i></button>
            </td>
        </tr>
    `).join('');

    contentArea.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <span class="table-title">Financial Records</span>
                <div class="table-actions">
                    <button class="btn btn-outline">
                        <i class="ph ph-download-simple"></i> Export
                    </button>
                    <button class="btn btn-primary" id="addPaymentBtn">
                        <i class="ph-bold ph-receipt"></i> Record Transaction
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Reference Number</th>
                        <th>Tenant ID</th>
                        <th>Amount Paid</th>
                        <th>Transaction Date</th>
                        <th>Verification Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;

    document.getElementById('addPaymentBtn').addEventListener('click', () => {
        openModal('Record Payment Input', `
            <div class="form-group">
                <label>Transaction Reference No.</label>
                <input type="text" class="form-control" placeholder="e.g. TR-2023-XYZ">
            </div>
            <div class="form-group">
                <label>Tenant ID (Payer)</label>
                <input type="text" class="form-control" placeholder="Search by ID or Name">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label>Amount (PHP)</label>
                    <input type="number" class="form-control" placeholder="0.00">
                </div>
                <div class="form-group">
                    <label>Date of Payment</label>
                    <input type="date" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label>Verification Status</label>
                <select class="form-control">
                    <option>Pending Verification</option>
                    <option>Verified Record</option>
                    <option>Invalidated</option>
                </select>
            </div>
            <div class="form-actions">
                <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="closeModal()">Transform & Record</button>
            </div>
        `);
    });
}

function renderInventory() {
    let rows = db.inventory.map(i => {
        const isAcWarning = i.acStatus !== 'Functional';
        const isBathWarning = i.bathStatus !== 'Functional';
        
        return `
        <tr>
            <td style="font-weight: 600;">${i.roomNo}</td>
            <td>${i.type}</td>
            <td>${i.maxBeds} Beds Built-in</td>
            <td>
                <span style="display:flex; align-items:center; gap:6px;">
                    <i class="ph-fill ph-snowflake" style="color: ${isAcWarning ? 'var(--danger)' : 'var(--success)'}"></i>
                    ${i.acStatus}
                </span>
            </td>
            <td>
                <span style="display:flex; align-items:center; gap:6px;">
                    <i class="ph-fill ph-shower" style="color: ${isBathWarning ? 'var(--warning)' : 'var(--success)'}"></i>
                    ${i.bathStatus}
                </span>
            </td>
            <td>${i.deskAvail} Desks provided</td>
        </tr>
    `}).join('');

    contentArea.innerHTML = `
        <div class="grid-cards" style="grid-template-columns: repeat(3, 1fr);">
            <div class="card" style="border-left: 4px solid var(--primary-yellow)">
                <div class="card-title">Total Bed Capacity</div>
                <div class="card-value">280</div>
            </div>
            <div class="card" style="border-left: 4px solid var(--primary-blue)">
                <div class="card-title">Functional AC Units</div>
                <div class="card-value">138 / 142</div>
            </div>
            <div class="card" style="border-left: 4px solid var(--success)">
                <div class="card-title">Study Desks Allocated</div>
                <div class="card-value">280</div>
            </div>
        </div>

        <div class="table-container">
            <div class="table-header">
                <span class="table-title">Physical Assets & Capacity</span>
                <div class="table-actions">
                    <button class="btn btn-primary" id="updateInvBtn">
                        <i class="ph-bold ph-arrows-clockwise"></i> Update Asset Status
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Room No.</th>
                        <th>Blueprint Type</th>
                        <th>Bed Capacity Setup</th>
                        <th>AC Asset Status</th>
                        <th>Bath Asset Status</th>
                        <th>Furniture Allocation</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;

    document.getElementById('updateInvBtn').addEventListener('click', () => {
        openModal('Update Amenity & Capacity', `
            <div class="form-group">
                <label>Select Room ID</label>
                <select class="form-control">
                    <option>Room 201A</option>
                    <option>Room 201B</option>
                    <option>Room 305</option>
                    <option>Room 410</option>
                </select>
            </div>
            <div class="form-group">
                <label>Adjust Bed Setup (Capacity Mod)</label>
                <input type="number" class="form-control" value="4">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label>AC Hardware Status</label>
                    <select class="form-control">
                        <option>Functional</option>
                        <option>Requires Maintenance</option>
                        <option>Offline</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Bath Hardware Status</label>
                    <select class="form-control">
                        <option>Functional</option>
                        <option>Repair Scheduled</option>
                        <option>Offline</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="closeModal()">Dynamically Update</button>
            </div>
        `);
    });
}

function renderRoom() {
    let rows = db.rooms.map(r => {
        let occRatio = parseInt(r.occFraction.split('/')[0]) / parseInt(r.occFraction.split('/')[1]);
        let occPercent = Math.round(occRatio * 100);
        
        let tenantList = r.tenants.length > 0 
            ? '<ul style="margin-left: 16px; font-size: 13px; color: var(--text-muted);">' + r.tenants.map(t=>`<li>${t}</li>`).join('') + '</ul>'
            : '<span class="text-muted" style="font-size: 13px; font-style: italic;">No tenants mapped</span>';

        return `
        <tr>
            <td style="font-weight: 600;">
                ${r.roomNo}<br>
                <span class="status ${r.status !== 'Active' ? 'inactive' : 'active'}" style="margin-top:4px;">${r.status}</span>
            </td>
            <td>
                <div style="font-weight: 500">${r.occFraction} (${occPercent}%)</div>
                <div class="progress-bar-bg" style="margin-top: 6px; height: 4px;">
                    <div class="progress-bar ${occPercent >= 100 ? 'danger' : ''}" style="width: ${occPercent}%"></div>
                </div>
            </td>
            <td><span style="font-weight:500; color: ${r.vacancy.includes('Vacant') ? 'var(--success)' : (r.vacancy === 'Full' ? 'var(--danger)' : 'var(--warning)')}">${r.vacancy}</span></td>
            <td><div style="font-weight: 600; color: var(--primary-blue)">${r.dictPrice}</div></td>
            <td>${tenantList}</td>
            <td>
                <button class="icon-btn" style="width: 32px; height: 32px"><i class="ph ph-sliders"></i></button>
            </td>
        </tr>
    `}).join('');

    contentArea.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <span class="table-title">Operational Unit Matrix</span>
                <div class="table-actions">
                    <button class="btn btn-primary" id="manageUnitBtn">
                        <i class="ph-bold ph-faders"></i> Manage Unit Operation
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Unit ID & State</th>
                        <th>Occupancy Fraction</th>
                        <th>Vacancy Status</th>
                        <th>Dictated Pricing Structure</th>
                        <th>Tenant Mapping</th>
                        <th>Controls</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;

    document.getElementById('manageUnitBtn').addEventListener('click', () => {
        openModal('Configure Unit Ops Rule', `
            <div class="form-group">
                <label>Select Unit ID</label>
                <select class="form-control">
                    <option>Room 201A</option>
                    <option>Room 201B</option>
                    <option>Room 305</option>
                    <option>Room 410</option>
                </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label>Active State</label>
                    <select class="form-control">
                        <option>Active (Clear)</option>
                        <option>Inactive (Hold/Clean)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Dictated Pricing Per Unit Limit</label>
                    <input type="text" class="form-control" value="₱7,500/head">
                </div>
            </div>
            <div class="form-group">
                <label>Tenant Association (Map IDs)</label>
                <input type="text" class="form-control" placeholder="T001, T002...">
                <p class="text-muted" style="font-size:12px; margin-top:4px;">Occupancy fraction computed automatically upon mapping.</p>
            </div>
            <div class="form-actions">
                <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="closeModal()">Compute & Apply Stats</button>
            </div>
        `);
    });
}

function renderMaintenance() {
    let rows = db.maintenance.map(m => {
        let urgClass = m.urgency === 'Critical' ? 'critical' : (m.urgency === 'Medium' ? 'maintenance' : 'active');
        return `
        <tr>
            <td style="font-family: monospace; font-size: 13px;">${m.id}</td>
            <td style="font-weight: 500">${m.location}</td>
            <td>${m.issue}</td>
            <td><span class="status ${urgClass}">${m.urgency}</span></td>
            <td>${m.dateLogged}</td>
            <td><span class="status ${m.status === 'Resolved' ? 'active' : 'pending'}">${m.status}</span></td>
            <td>
                <button class="icon-btn" style="width: 32px; height: 32px"><i class="ph ph-note-pencil"></i></button>
            </td>
        </tr>
    `}).join('');

    contentArea.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <span class="table-title">Facility Issue Pipeline</span>
                <div class="table-actions">
                    <button class="btn btn-primary" id="logIssueBtn">
                        <i class="ph-bold ph-clipboard-text"></i> Log New Issue
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Log ID</th>
                        <th>Specific Structure / Locale</th>
                        <th>Issue Record</th>
                        <th>Urgency Level</th>
                        <th>Date Recorded</th>
                        <th>Action State</th>
                        <th>Resolve</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;

    document.getElementById('logIssueBtn').addEventListener('click', () => {
        openModal('Record Structural/Utility Issue', `
            <div class="form-group">
                <label>Pinpoint Specific Location</label>
                <input type="text" class="form-control" placeholder="e.g. Room 305 Bathroom, 2F Corridor...">
            </div>
            <div class="form-group">
                <label>Issue Description</label>
                <textarea class="form-control" rows="3" placeholder="Describe the structural or utility defect..."></textarea>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label>Assign Urgency Level</label>
                    <select class="form-control">
                        <option>Low (Routine)</option>
                        <option>Medium (Disruptive)</option>
                        <option>Critical (Hazard/Emergency)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Action State</label>
                    <select class="form-control">
                        <option>Pending Assessment</option>
                        <option>Scheduled for Repair</option>
                        <option>Resolved</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="closeModal()">Commit Record</button>
            </div>
        `);
    });
}

// Init
loadView('dashboard');
