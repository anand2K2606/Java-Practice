// Customer Data Management Module
const CustomerManager = {
    // Initialize customers from localStorage
    customers: JSON.parse(localStorage.getItem('goldShopCustomers')) || [],
    
    // Save customers to localStorage
    save: function() {
        localStorage.setItem('goldShopCustomers', JSON.stringify(this.customers));
        return this.customers;
    },
    
    // Add a new customer
    add: function(customerData) {
        const newCustomer = {
            id: Utils.generateId(),
            ...customerData,
            date: Utils.formatDate()
        };
        
        this.customers.push(newCustomer);
        this.save();
        return newCustomer;
    },
    
    // Update an existing customer
    update: function(id, customerData) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index === -1) return null;
        
        this.customers[index] = {
            ...this.customers[index],
            ...customerData
        };
        
        this.save();
        return this.customers[index];
    },
    
    // Delete a customer
    delete: function(id) {
        const customer = this.customers.find(c => c.id === id);
        if (!customer) return null;
        
        this.customers = this.customers.filter(c => c.id !== id);
        this.save();
        return customer;
    },
    
    // Find customer by ID
    findById: function(id) {
        return this.customers.find(c => c.id === id);
    },
    
    // Search customers by name
    search: function(query) {
        if (!query) return this.customers;
        
        return this.customers.filter(customer => 
            customer.name.toLowerCase().includes(query.toLowerCase())
        );
    },
    
    // Filter customers by status
    filterByStatus: function(type, value) {
        if (type === 'all') return this.customers;
        if (type === 'item') return this.customers.filter(c => c.itemStatus === value);
        if (type === 'payment') return this.customers.filter(c => c.paymentStatus === value);
        return this.customers;
    },
    
    // Toggle item status
    toggleItemStatus: function(id) {
        const customer = this.findById(id);
        if (!customer) return null;
        
        customer.itemStatus = customer.itemStatus === 'given' ? 'pending' : 'given';
        this.save();
        return customer;
    },
    
    // Toggle payment status
    togglePaymentStatus: function(id) {
        const customer = this.findById(id);
        if (!customer) return null;
        
        customer.paymentStatus = customer.paymentStatus === 'paid' ? 'balance' : 'paid';
        this.save();
        return customer;
    },
    
    // Get dashboard statistics
    getStats: function() {
        const totalCustomers = this.customers.length;
        const totalAmount = this.customers.reduce((sum, c) => sum + parseFloat(c.totalAmount || 0), 0);
        
        const paidAmount = this.customers.reduce((sum, customer) => {
            if (customer.paymentStatus === 'paid') {
                return sum + parseFloat(customer.totalAmount || 0);
            } else {
                return sum + parseFloat(customer.depositAmount || 0);
            }
        }, 0);
        
        const pendingAmount = totalAmount - paidAmount;
        
        return {
            totalCustomers,
            totalAmount,
            paidAmount,
            pendingAmount
        };
    },
    
    // Get sample data for initial setup
    getSampleData: function() {
        return [
            {
                id: Utils.generateId(),
                name: 'Rajesh Kumar',
                phone: '9876543210',
                itemDescription: '22k Gold Chain - 15g',
                depositAmount: 5000,
                totalAmount: 75000,
                itemStatus: 'given',
                paymentStatus: 'balance',
                notes: 'To be delivered after full payment',
                date: '15/06/2023'
            },
            {
                id: Utils.generateId(),
                name: 'Priya Sharma',
                phone: '8765432109',
                itemDescription: '24k Gold Bangles - 30g',
                depositAmount: 20000,
                totalAmount: 150000,
                itemStatus: 'pending',
                paymentStatus: 'paid',
                notes: 'Customer will collect next week',
                date: '20/06/2023'
            },
            {
                id: Utils.generateId(),
                name: 'Amit Patel',
                phone: '7654321098',
                itemDescription: '18k Gold Ring - 8g',
                depositAmount: 3000,
                totalAmount: 32000,
                itemStatus: 'given',
                paymentStatus: 'paid',
                notes: '',
                date: '25/06/2023'
            }
        ];
    },
    
    // Initialize with sample data if empty
    initializeWithSampleData: function() {
        if (this.customers.length === 0) {
            this.customers = this.getSampleData();
            this.save();
        }
    }
};