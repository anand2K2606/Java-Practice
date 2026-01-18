// Customer Data Management Module
const CustomerManager = {
    // Initialize customers from localStorage (starts empty)
    customers: JSON.parse(localStorage.getItem('goldShopCustomers')) || [],
    
    // Save customers to localStorage
    save: function() {
        localStorage.setItem('goldShopCustomers', JSON.stringify(this.customers));
        return this.customers;
    },
    
    // Add a new customer
    add: function(customerData) {
        // Validate required fields
        if (!customerData.name || customerData.name.trim() === '') {
            throw new Error('Customer name is required');
        }
        
        if (!customerData.totalAmount || customerData.totalAmount <= 0) {
            throw new Error('Valid total amount is required');
        }
        
        const newCustomer = {
            id: Utils.generateId(),
            ...customerData,
            date: Utils.formatDate(),
            // Ensure default values
            depositAmount: customerData.depositAmount || 0,
            itemStatus: customerData.itemStatus || 'pending',
            paymentStatus: customerData.paymentStatus || 'balance',
            phone: customerData.phone || '',
            itemDescription: customerData.itemDescription || '',
            notes: customerData.notes || ''
        };
        
        this.customers.push(newCustomer);
        this.save();
        return newCustomer;
    },
    
    // Update an existing customer
    update: function(id, customerData) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Customer not found');
        }
        
        // Validate required fields
        if (!customerData.name || customerData.name.trim() === '') {
            throw new Error('Customer name is required');
        }
        
        if (!customerData.totalAmount || customerData.totalAmount <= 0) {
            throw new Error('Valid total amount is required');
        }
        
        this.customers[index] = {
            ...this.customers[index],
            ...customerData
        };
        
        this.save();
        return this.customers[index];
    },
    
    // Delete a customer
    delete: function(id) {
        const customerIndex = this.customers.findIndex(c => c.id === id);
        if (customerIndex === -1) {
            throw new Error('Customer not found');
        }
        
        const deletedCustomer = this.customers[customerIndex];
        this.customers.splice(customerIndex, 1);
        this.save();
        return deletedCustomer;
    },
    
    // Find customer by ID
    findById: function(id) {
        return this.customers.find(c => c.id === id);
    },
    
    // Search customers by name or phone
    search: function(query) {
        if (!query || query.trim() === '') return this.customers;
        
        const searchTerm = query.toLowerCase().trim();
        return this.customers.filter(customer => 
            customer.name.toLowerCase().includes(searchTerm) ||
            (customer.phone && customer.phone.includes(searchTerm)) ||
            (customer.itemDescription && customer.itemDescription.toLowerCase().includes(searchTerm))
        );
    },
    
    // Filter customers by various criteria
    filterByStatus: function(filterType, filterValue) {
        if (filterType === 'all') return this.customers;
        
        switch(filterType) {
            case 'item-pending':
                return this.customers.filter(c => c.itemStatus === 'pending');
            case 'item-given':
                return this.customers.filter(c => c.itemStatus === 'given');
            case 'payment-paid':
                return this.customers.filter(c => c.paymentStatus === 'paid');
            case 'payment-balance':
                return this.customers.filter(c => c.paymentStatus === 'balance');
            default:
                return this.customers;
        }
    },
    
    // Toggle item status
    toggleItemStatus: function(id) {
        const customer = this.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        
        customer.itemStatus = customer.itemStatus === 'given' ? 'pending' : 'given';
        this.save();
        return customer;
    },
    
    // Toggle payment status
    togglePaymentStatus: function(id) {
        const customer = this.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        
        customer.paymentStatus = customer.paymentStatus === 'paid' ? 'balance' : 'paid';
        this.save();
        return customer;
    },
    
    // Calculate customer balance
    getCustomerBalance: function(customer) {
        const total = parseFloat(customer.totalAmount || 0);
        const deposit = parseFloat(customer.depositAmount || 0);
        return total - deposit;
    },
    
    // Get dashboard statistics
    getStats: function() {
        const totalCustomers = this.customers.length;
        
        // Calculate total amount from all customers
        const totalAmount = this.customers.reduce((sum, customer) => {
            return sum + parseFloat(customer.totalAmount || 0);
        }, 0);
        
        // Calculate paid amount
        const paidAmount = this.customers.reduce((sum, customer) => {
            if (customer.paymentStatus === 'paid') {
                // If fully paid, add entire total amount
                return sum + parseFloat(customer.totalAmount || 0);
            } else {
                // If balance, add only deposit amount
                return sum + parseFloat(customer.depositAmount || 0);
            }
        }, 0);
        
        // Calculate pending amount
        const pendingAmount = totalAmount - paidAmount;
        
        // Calculate item statistics
        const pendingItems = this.customers.filter(c => c.itemStatus === 'pending').length;
        const givenItems = this.customers.filter(c => c.itemStatus === 'given').length;
        
        return {
            totalCustomers,
            totalAmount,
            paidAmount,
            pendingAmount,
            pendingItems,
            givenItems
        };
    },
    
    // Get customers with pending payments
    getCustomersWithPendingPayments: function() {
        return this.customers.filter(customer => 
            customer.paymentStatus === 'balance' && 
            this.getCustomerBalance(customer) > 0
        );
    },
    
    // Get customers with pending items
    getCustomersWithPendingItems: function() {
        return this.customers.filter(customer => customer.itemStatus === 'pending');
    },
    
    // Export all customer data for download
    exportData: function() {
        return {
            customers: this.customers,
            stats: this.getStats(),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    },
    
    // Import customer data
    importData: function(data) {
        if (!data || !Array.isArray(data.customers)) {
            throw new Error('Invalid data format');
        }
        
        // Validate each customer in the data
        const validCustomers = data.customers.filter(customer => 
            customer.id && 
            customer.name && 
            customer.totalAmount
        );
        
        this.customers = validCustomers;
        this.save();
        return this.customers.length;
    },
    
    // Clear all customers
    clearAll: function() {
        this.customers = [];
        this.save();
        return true;
    },
    
    // Get summary for a specific customer
    getCustomerSummary: function(id) {
        const customer = this.findById(id);
        if (!customer) return null;
        
        const balance = this.getCustomerBalance(customer);
        const paidAmount = customer.paymentStatus === 'paid' ? 
            parseFloat(customer.totalAmount) : parseFloat(customer.depositAmount || 0);
        
        return {
            ...customer,
            balance,
            paidAmount,
            isFullyPaid: customer.paymentStatus === 'paid',
            isItemGiven: customer.itemStatus === 'given'
        };
    }
};