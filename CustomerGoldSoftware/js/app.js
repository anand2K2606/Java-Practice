// Main Application Module
const App = {
    // Current application state
    state: {
        currentFilter: 'all',
        currentSearch: ''
    },
    
    // Initialize the application
    initialize: function() {
        console.log('Initializing Gold Shop Management System...');
        
        // Initialize managers
        CustomerManager.initializeWithSampleData();
        UIManager.initialize();
        ExportManager.initialize();
        ImportManager.initialize();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial render
        this.updateUI();
        
        console.log('Application initialized successfully');
    },
    
    // Setup all event listeners
    setupEventListeners: function() {
        // Customer form submission
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'customerForm') {
                e.preventDefault();
                this.handleAddCustomer();
            }
            
            if (e.target.id === 'editForm') {
                e.preventDefault();
                this.handleUpdateCustomer();
            }
        });
        
        // Clear form button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'clearForm' || e.target.closest('#clearForm')) {
                this.clearCustomerForm();
            }
        });
        
        // Search functionality
        document.addEventListener('click', (e) => {
            if (e.target.id === 'searchBtn' || e.target.closest('#searchBtn')) {
                this.handleSearch();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.target.id === 'searchInput' && e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Filter functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilter(e.target);
            }
        });
        
        // Customer actions (edit, delete, toggle status)
        document.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.action-btn');
            if (!actionBtn) return;
            
            const action = actionBtn.dataset.action;
            const id = actionBtn.dataset.id;
            
            if (!action || !id) return;
            
            switch(action) {
                case 'edit':
                    this.handleEditCustomer(id);
                    break;
                case 'delete':
                    this.handleDeleteCustomer(id);
                    break;
                case 'toggle-payment':
                    this.handleTogglePaymentStatus(id);
                    break;
                case 'toggle-item':
                    this.handleToggleItemStatus(id);
                    break;
            }
        });
        
        // Export buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'exportExcelBtn' || e.target.closest('#exportExcelBtn')) {
                ExportManager.exportToExcel();
            }
            
            if (e.target.id === 'exportPDFBtn' || e.target.closest('#exportPDFBtn')) {
                ExportManager.exportToPDF();
            }
        });
        
        // CSV file upload
        document.addEventListener('change', (e) => {
            if (e.target.id === 'csvFile') {
                this.handleCSVUpload(e.target.files[0]);
            }
        });
        
        // Confirm CSV import
        document.addEventListener('click', (e) => {
            if (e.target.id === 'confirmImportBtn' || e.target.closest('#confirmImportBtn')) {
                this.handleConfirmImport();
            }
        });
        
        // Modal close buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal')) {
                this.closeModal();
            }
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('editModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    },
    
    // Handle adding a new customer
    handleAddCustomer: function() {
        const customerData = {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('phone').value,
            itemDescription: document.getElementById('itemDescription').value,
            depositAmount: document.getElementById('depositAmount').value || 0,
            totalAmount: document.getElementById('totalAmountInput').value,
            itemStatus: document.getElementById('itemStatus').value,
            paymentStatus: document.getElementById('paymentStatus').value,
            notes: document.getElementById('notes').value
        };
        
        // Validate required fields
        const validation = Utils.validateRequiredFields({
            name: customerData.name,
            totalAmount: customerData.totalAmount
        });
        
        if (!validation.isValid) {
            Utils.showNotification(`Please fill in the ${validation.field} field`, true);
            return;
        }
        
        // Add customer
        const newCustomer = CustomerManager.add(customerData);
        
        // Update UI
        this.updateUI();
        
        // Show notification
        Utils.showNotification(`Customer "${newCustomer.name}" added successfully!`);
        
        // Reset form
        this.clearCustomerForm();
    },
    
    // Clear customer form
    clearCustomerForm: function() {
        const form = document.getElementById('customerForm');
        if (form) form.reset();
        
        // Set default values
        if (document.getElementById('itemStatus')) {
            document.getElementById('itemStatus').value = 'pending';
        }
        
        if (document.getElementById('paymentStatus')) {
            document.getElementById('paymentStatus').value = 'balance';
        }
    },
    
    // Handle search
    handleSearch: function() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        this.state.currentSearch = searchInput.value;
        this.updateCustomerList();
    },
    
    // Handle filter selection
    handleFilter: function(filterButton) {
        // Remove active class from all filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        filterButton.classList.add('active');
        
        // Update current filter
        this.state.currentFilter = filterButton.dataset.filter;
        
        // Update customer list
        this.updateCustomerList();
    },
    
    // Handle editing a customer
    handleEditCustomer: function(id) {
        const customer = CustomerManager.findById(id);
        if (!customer) return;
        
        // Populate edit form
        document.getElementById('editId').value = customer.id;
        document.getElementById('editCustomerName').value = customer.name;
        document.getElementById('editPhone').value = customer.phone;
        document.getElementById('editItemDescription').value = customer.itemDescription;
        document.getElementById('editDepositAmount').value = customer.depositAmount;
        document.getElementById('editTotalAmount').value = customer.totalAmount;
        document.getElementById('editItemStatus').value = customer.itemStatus;
        document.getElementById('editPaymentStatus').value = customer.paymentStatus;
        document.getElementById('editNotes').value = customer.notes;
        
        // Show modal
        document.getElementById('editModal').style.display = 'flex';
    },
    
    // Handle updating a customer
    handleUpdateCustomer: function() {
        const id = document.getElementById('editId').value;
        const customerData = {
            name: document.getElementById('editCustomerName').value,
            phone: document.getElementById('editPhone').value,
            itemDescription: document.getElementById('editItemDescription').value,
            depositAmount: document.getElementById('editDepositAmount').value || 0,
            totalAmount: document.getElementById('editTotalAmount').value,
            itemStatus: document.getElementById('editItemStatus').value,
            paymentStatus: document.getElementById('editPaymentStatus').value,
            notes: document.getElementById('editNotes').value
        };
        
        // Validate required fields
        const validation = Utils.validateRequiredFields({
            name: customerData.name,
            totalAmount: customerData.totalAmount
        });
        
        if (!validation.isValid) {
            Utils.showNotification(`Please fill in the ${validation.field} field`, true);
            return;
        }
        
        // Update customer
        const updatedCustomer = CustomerManager.update(id, customerData);
        
        if (updatedCustomer) {
            // Update UI
            this.updateUI();
            
            // Close modal
            this.closeModal();
            
            // Show notification
            Utils.showNotification(`Customer "${updatedCustomer.name}" updated successfully!`);
        }
    },
    
    // Handle deleting a customer
    handleDeleteCustomer: function(id) {
        const customer = CustomerManager.findById(id);
        if (!customer) return;
        
        if (confirm(`Are you sure you want to delete "${customer.name}"? This action cannot be undone.`)) {
            CustomerManager.delete(id);
            this.updateUI();
            Utils.showNotification(`Customer "${customer.name}" deleted successfully!`, true);
        }
    },
    
    // Handle toggling payment status
    handleTogglePaymentStatus: function(id) {
        const customer = CustomerManager.togglePaymentStatus(id);
        if (customer) {
            this.updateUI();
            const status = customer.paymentStatus === 'paid' ? 'Paid' : 'Balance';
            Utils.showNotification(`Payment status updated to "${status}" for ${customer.name}`);
        }
    },
    
    // Handle toggling item status
    handleToggleItemStatus: function(id) {
        const customer = CustomerManager.toggleItemStatus(id);
        if (customer) {
            this.updateUI();
            const status = customer.itemStatus === 'given' ? 'Given' : 'Pending';
            Utils.showNotification(`Item status updated to "${status}" for ${customer.name}`);
        }
    },
    
    // Handle CSV file upload
    handleCSVUpload: function(file) {
        ImportManager.handleFileUpload(file)
            .then(() => {
                // Preview is shown automatically
            })
            .catch(error => {
                Utils.showNotification(error.message, true);
            });
    },
    
    // Handle confirming CSV import
    handleConfirmImport: function() {
        if (!ImportManager.csvData) {
            Utils.showNotification('No CSV data to import', true);
            return;
        }
        
        const importedCustomers = ImportManager.importCSV(ImportManager.csvData);
        
        if (importedCustomers) {
            // Hide preview
            const preview = document.getElementById('csvPreview');
            if (preview) preview.style.display = 'none';
            
            // Clear file input
            const fileInput = document.getElementById('csvFile');
            if (fileInput) fileInput.value = '';
            
            // Clear CSV data
            ImportManager.csvData = null;
            
            // Update UI
            this.updateUI();
        }
    },
    
    // Close modal
    closeModal: function() {
        document.getElementById('editModal').style.display = 'none';
    },
    
    // Update customer list based on current filter and search
    updateCustomerList: function() {
        let filteredCustomers = CustomerManager.customers;
        
        // Apply search filter
        if (this.state.currentSearch) {
            filteredCustomers = CustomerManager.search(this.state.currentSearch);
        }
        
        // Apply status filter
        switch(this.state.currentFilter) {
            case 'item-pending':
                filteredCustomers = filteredCustomers.filter(c => c.itemStatus === 'pending');
                break;
            case 'item-given':
                filteredCustomers = filteredCustomers.filter(c => c.itemStatus === 'given');
                break;
            case 'payment-paid':
                filteredCustomers = filteredCustomers.filter(c => c.paymentStatus === 'paid');
                break;
            case 'payment-balance':
                filteredCustomers = filteredCustomers.filter(c => c.paymentStatus === 'balance');
                break;
            case 'all':
            default:
                // No additional filtering needed
                break;
        }
        
        // Render the filtered list
        UIManager.renderCustomerList(filteredCustomers);
    },
    
    // Update all UI components
    updateUI: function() {
        this.updateCustomerList();
        UIManager.updateDashboard();
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.initialize();
});