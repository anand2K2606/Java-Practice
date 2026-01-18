// Import Module (CSV Import)
const ImportManager = {
    csvData: null,
    
    // Parse CSV data
    parseCSV: function(csvText) {
        try {
            const rows = csvText.split('\n');
            if (rows.length < 2) throw new Error('CSV file is empty or has only headers');
            
            const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
            const parsedData = [];
            
            for (let i = 1; i < rows.length; i++) {
                if (rows[i].trim()) {
                    const values = rows[i].split(',');
                    const row = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index] ? values[index].trim() : '';
                    });
                    parsedData.push(row);
                }
            }
            
            return { headers, data: parsedData };
        } catch (error) {
            console.error('CSV parsing error:', error);
            throw new Error('Error parsing CSV file');
        }
    },
    
    // Show CSV preview
    showPreview: function(headers, data) {
        const preview = document.getElementById('csvPreview');
        const table = document.getElementById('previewTable');
        
        if (!preview || !table) return;
        
        // Clear table
        table.innerHTML = '';
        
        // Create header row
        let headerRow = '<tr>';
        headers.forEach(header => {
            headerRow += `<th>${header}</th>`;
        });
        headerRow += '</tr>';
        table.innerHTML = headerRow;
        
        // Create data rows (first 5 only for preview)
        const previewData = data.slice(0, 5);
        previewData.forEach(row => {
            let dataRow = '<tr>';
            headers.forEach(header => {
                dataRow += `<td>${row[header] || ''}</td>`;
            });
            dataRow += '</tr>';
            table.innerHTML += dataRow;
        });
        
        preview.style.display = 'block';
    },
    
    // Convert CSV data to customer objects
    convertToCustomers: function(headers, csvData) {
        const customers = [];
        
        // Check if required headers exist
        const requiredHeaders = ['name', 'total amount'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        
        if (missingHeaders.length > 0) {
            throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
        }
        
        csvData.forEach((row, index) => {
            const customer = {
                id: Utils.generateId(),
                date: Utils.formatDate()
            };
            
            headers.forEach(header => {
                const value = row[header] || '';
                
                switch(header) {
                    case 'name':
                        customer.name = value;
                        break;
                    case 'phone':
                    case 'phone number':
                        customer.phone = value;
                        break;
                    case 'item description':
                    case 'description':
                        customer.itemDescription = value;
                        break;
                    case 'deposit amount':
                    case 'deposit':
                        customer.depositAmount = value || 0;
                        break;
                    case 'total amount':
                    case 'total':
                        customer.totalAmount = value;
                        break;
                    case 'item status':
                        customer.itemStatus = value.toLowerCase().includes('given') ? 'given' : 'pending';
                        break;
                    case 'payment status':
                        customer.paymentStatus = value.toLowerCase().includes('paid') ? 'paid' : 'balance';
                        break;
                    case 'notes':
                    case 'note':
                        customer.notes = value;
                        break;
                }
            });
            
            // Set defaults if not provided
            if (!customer.itemStatus) customer.itemStatus = 'pending';
            if (!customer.paymentStatus) customer.paymentStatus = 'balance';
            if (!customer.depositAmount) customer.depositAmount = 0;
            
            customers.push(customer);
        });
        
        return customers;
    },
    
    // Import CSV data
    importCSV: function(csvText) {
        try {
            const { headers, data } = this.parseCSV(csvText);
            
            if (data.length === 0) {
                throw new Error('No valid data found in CSV');
            }
            
            const customers = this.convertToCustomers(headers, data);
            
            // Ask for confirmation
            if (confirm(`Import ${customers.length} customers? This will replace all existing data.`)) {
                CustomerManager.customers = customers;
                CustomerManager.save();
                
                Utils.showNotification(`Successfully imported ${customers.length} customers from CSV!`);
                return customers;
            }
            
            return null;
        } catch (error) {
            Utils.showNotification(error.message, true);
            return null;
        }
    },
    
    // Handle file upload
    handleFileUpload: function(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file selected'));
                return;
            }
            
            if (!file.name.endsWith('.csv')) {
                reject(new Error('Please select a CSV file'));
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const csvText = event.target.result;
                    this.csvData = csvText;
                    
                    const { headers, data } = this.parseCSV(csvText);
                    this.showPreview(headers, data);
                    
                    resolve({ headers, data });
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            
            reader.readAsText(file);
        });
    },
    
    // Initialize import functionality
    initialize: function() {
        // Event listeners will be added in app.js
    }
};