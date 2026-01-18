// Utility Functions Module
const Utils = {
    // Format currency in Indian Rupees
    formatCurrency: (amount) => {
        return '₹' + parseFloat(amount).toLocaleString('en-IN');
    },
    
    // Generate unique ID
    generateId: () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    },
    
    // Show notification message
    showNotification: (message, isError = false) => {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.className = 'notification' + (isError ? ' error' : '');
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    },
    
    // Format date
    formatDate: (date = new Date()) => {
        return date.toLocaleDateString('en-IN');
    },
    
    // Calculate balance amount
    calculateBalance: (total, deposit) => {
        return parseFloat(total) - parseFloat(deposit || 0);
    },
    
    // Validate required fields
    validateRequiredFields: (fields) => {
        for (const [key, value] of Object.entries(fields)) {
            if (!value || value.toString().trim() === '') {
                return { isValid: false, field: key };
            }
        }
        return { isValid: true };
    }
};