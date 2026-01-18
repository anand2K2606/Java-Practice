// UI Rendering Module
const UIManager = {
    // Render customer form
    renderCustomerForm: function() {
        const container = document.getElementById('customerFormContainer');
        if (!container) return;
        
        container.innerHTML = `
            <h2 class="section-title"><i class="fas fa-user-plus"></i> Add New Customer</h2>
            <form id="customerForm">
                <div class="form-group">
                    <label for="customerName">Customer Name *</label>
                    <input type="text" id="customerName" class="form-control" placeholder="Enter customer name" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" class="form-control" placeholder="Enter phone number">
                </div>
                
                <div class="form-group">
                    <label for="itemDescription">Item Description</label>
                    <textarea id="itemDescription" class="form-control" rows="3" placeholder="Describe the gold item (e.g., 22k gold chain)"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="depositAmount">Deposit Amount (₹)</label>
                    <input type="number" id="depositAmount" class="form-control" placeholder="Enter deposit amount" min="0">
                </div>
                
                <div class="form-group">
                    <label for="totalAmountInput">Total Amount (₹) *</label>
                    <input type="number" id="totalAmountInput" class="form-control" placeholder="Enter total amount" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="itemStatus">Item Status</label>
                    <select id="itemStatus" class="form-control">
                        <option value="pending">Pending (Not given to customer)</option>
                        <option value="given">Given to Customer</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="paymentStatus">Payment Status</label>
                    <select id="paymentStatus" class="form-control">
                        <option value="balance">Balance (Payment pending)</option>
                        <option value="paid">Fully Paid</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="notes">Additional Notes</label>
                    <textarea id="notes" class="form-control" rows="2" placeholder="Any additional information"></textarea>
                </div>
                
                <button type="submit" class="btn btn-block">
                    <i class="fas fa-save"></i> Save Customer
                </button>
                <button type="button" id="clearForm" class="btn btn-secondary btn-block">
                    <i class="fas fa-times"></i> Clear Form
                </button>
            </form>
        `;
    },
    
    // Render search and filter section
    renderSearchFilter: function() {
        const container = document.getElementById('searchFilterContainer');
        if (!container) return;
        
        container.innerHTML = `
            <div class="search-section">
                <h2 class="section-title"><i class="fas fa-search"></i> Search & Filter</h2>
                <div class="search-box">
                    <input type="text" id="searchInput" class="form-control" placeholder="Search by customer name...">
                    <button id="searchBtn" class="btn"><i class="fas fa-search"></i></button>
                </div>
                
                <div class="filter-section">
                    <div class="filter-btn active" data-filter="all">All</div>
                    <div class="filter-btn" data-filter="item-pending">Item Pending</div>
                    <div class="filter-btn" data-filter="item-given">Item Given</div>
                    <div class="filter-btn" data-filter="payment-paid">Payment Paid</div>
                    <div class="filter-btn" data-filter="payment-balance">Payment Balance</div>
                </div>
            </div>
        `;
    },
    
    // Render export options
    renderExportOptions: function() {
        const container = document.getElementById('exportContainer');
        if (!container) return;
        
        container.innerHTML = `
            <div class="export-options">
                <button id="exportExcelBtn" class="btn btn-success">
                    <i class="fas fa-file-excel"></i> Export Excel
                </button>
                <button id="exportPDFBtn" class="btn btn-danger">
                    <i class="fas fa-file-pdf"></i> Export PDF
                </button>
            </div>
        `;
    },
    
    // Render import CSV section
    renderImportCSV: function() {
        const container = document.getElementById('importContainer');
        if (!container) return;
        
        container.innerHTML = `
            <div class="file-input-container">
                <label for="csvFile" class="file-input-label">
                    <i class="fas fa-file-csv"></i> Import CSV File
                </label>
                <input type="file" id="csvFile" accept=".csv">
            </div>
            
            <div id="csvPreview" class="csv-preview" style="display: none;">
                <h4>CSV Preview (First 5 rows)</h4>
                <table id="previewTable"></table>
                <button id="confirmImportBtn" class="btn btn-block" style="margin-top: 15px;">
                    <i class="fas fa-check"></i> Import CSV Data
                </button>
            </div>
        `;
    },
    
    // Render edit modal
    renderEditModal: function() {
        const container = document.getElementById('editModalContent');
        if (!container) return;
        
        container.innerHTML = `
            <div class="modal-header">
                <h3 class="modal-title">Edit Customer</h3>
                <span class="close-modal">&times;</span>
            </div>
            <form id="editForm">
                <input type="hidden" id="editId">
                <div class="form-group">
                    <label for="editCustomerName">Customer Name *</label>
                    <input type="text" id="editCustomerName" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="editPhone">Phone Number</label>
                    <input type="tel" id="editPhone" class="form-control">
                </div>
                
                <div class="form-group">
                    <label for="editItemDescription">Item Description</label>
                    <textarea id="editItemDescription" class="form-control" rows="2"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="editDepositAmount">Deposit Amount (₹)</label>
                    <input type="number" id="editDepositAmount" class="form-control" min="0">
                </div>
                
                <div class="form-group">
                    <label for="editTotalAmount">Total Amount (₹) *</label>
                    <input type="number" id="editTotalAmount" class="form-control" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="editItemStatus">Item Status</label>
                    <select id="editItemStatus" class="form-control">
                        <option value="pending">Pending (Not given to customer)</option>
                        <option value="given">Given to Customer</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="editPaymentStatus">Payment Status</label>
                    <select id="editPaymentStatus" class="form-control">
                        <option value="balance">Balance (Payment pending)</option>
                        <option value="paid">Fully Paid</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="editNotes">Additional Notes</label>
                    <textarea id="editNotes" class="form-control" rows="2"></textarea>
                </div>
                
                <button type="submit" class="btn btn-block">
                    <i class="fas fa-save"></i> Update Customer
                </button>
            </form>
        `;
    },
    
    // Render customer list
    renderCustomerList: function(customers = CustomerManager.customers) {
        const container = document.getElementById('customerList');
        if (!container) return;
        
        if (customers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>No customers found</h3>
                    <p>Try changing your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = customers.map(customer => {
            const balanceAmount = Utils.calculateBalance(customer.totalAmount, customer.depositAmount);
            
            return `
                <div class="customer-item" data-id="${customer.id}">
                    <div class="customer-header">
                        <div class="customer-name">${customer.name}</div>
                        <div>
                            <span class="customer-status status-${customer.itemStatus}">
                                ${customer.itemStatus === 'pending' ? 'Item Pending' : 'Item Given'}
                            </span>
                            <span class="customer-status status-${customer.paymentStatus}">
                                ${customer.paymentStatus === 'paid' ? 'Paid' : 'Balance'}
                            </span>
                        </div>
                    </div>
                    <div class="customer-details">
                        <div class="detail-item">
                            <span class="detail-label">Phone:</span> ${customer.phone || 'N/A'}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Total:</span> ${Utils.formatCurrency(customer.totalAmount)}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Deposit:</span> ${Utils.formatCurrency(customer.depositAmount || 0)}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Balance:</span> ${Utils.formatCurrency(balanceAmount)}
                        </div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Item:</span> ${customer.itemDescription || 'No description'}
                    </div>
                    ${customer.notes ? `
                    <div class="detail-item">
                        <span class="detail-label">Notes:</span> ${customer.notes}
                    </div>
                    ` : ''}
                    <div class="customer-actions">
                        <button class="action-btn edit" data-action="edit" data-id="${customer.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete" data-action="delete" data-id="${customer.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                        <button class="action-btn" data-action="toggle-payment" data-id="${customer.id}">
                            <i class="fas fa-${customer.paymentStatus === 'paid' ? 'undo' : 'check'}"></i>
                            ${customer.paymentStatus === 'paid' ? 'Mark as Balance' : 'Mark as Paid'}
                        </button>
                        <button class="action-btn" data-action="toggle-item" data-id="${customer.id}">
                            <i class="fas fa-${customer.itemStatus === 'given' ? 'undo' : 'gift'}"></i>
                            ${customer.itemStatus === 'given' ? 'Mark as Pending' : 'Mark as Given'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // Update dashboard statistics
    updateDashboard: function() {
        const stats = CustomerManager.getStats();
        
        document.getElementById('totalCustomers').textContent = stats.totalCustomers;
        document.getElementById('totalAmount').textContent = Utils.formatCurrency(stats.totalAmount);
        document.getElementById('paidAmount').textContent = Utils.formatCurrency(stats.paidAmount);
        document.getElementById('pendingAmount').textContent = Utils.formatCurrency(stats.pendingAmount);
    },
    
    // Initialize all UI components
    initialize: function() {
        this.renderCustomerForm();
        this.renderSearchFilter();
        this.renderExportOptions();
        this.renderImportCSV();
        this.renderEditModal();
        this.renderCustomerList();
        this.updateDashboard();
    }
};