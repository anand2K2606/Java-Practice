// Export Module (PDF and Excel)
const ExportManager = {
    // Export to Excel
    exportToExcel: function() {
        try {
            const customers = CustomerManager.customers;
            
            // Prepare data for Excel
            const excelData = customers.map(customer => {
                const balance = Utils.calculateBalance(customer.totalAmount, customer.depositAmount);
                return {
                    'Customer Name': customer.name,
                    'Phone Number': customer.phone || '',
                    'Item Description': customer.itemDescription || '',
                    'Deposit Amount (₹)': parseFloat(customer.depositAmount || 0),
                    'Total Amount (₹)': parseFloat(customer.totalAmount),
                    'Balance Amount (₹)': balance,
                    'Item Status': customer.itemStatus === 'given' ? 'Given' : 'Pending',
                    'Payment Status': customer.paymentStatus === 'paid' ? 'Paid' : 'Balance',
                    'Notes': customer.notes || '',
                    'Date Added': customer.date || ''
                };
            });
            
            // Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            
            // Create workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Gold Shop Customers');
            
            // Generate Excel file
            XLSX.writeFile(workbook, `Gold_Shop_Customers_${new Date().toISOString().slice(0,10)}.xlsx`);
            
            Utils.showNotification('Data exported to Excel successfully!');
            return true;
        } catch (error) {
            console.error('Excel export error:', error);
            Utils.showNotification('Error exporting to Excel', true);
            return false;
        }
    },
    
    // Export to PDF
    exportToPDF: function() {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const customers = CustomerManager.customers;
            
            // Add title
            doc.setFontSize(18);
            doc.setTextColor(212, 175, 55);
            doc.text('Gold Shop Customers Report', 105, 15, { align: 'center' });
            
            // Add date
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Generated on: ${Utils.formatDate()}`, 105, 22, { align: 'center' });
            
            // Add summary
            const stats = CustomerManager.getStats();
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Total Customers: ${stats.totalCustomers}`, 14, 32);
            doc.text(`Total Amount: ${Utils.formatCurrency(stats.totalAmount)}`, 14, 38);
            doc.text(`Paid Amount: ${Utils.formatCurrency(stats.paidAmount)}`, 14, 44);
            doc.text(`Pending Amount: ${Utils.formatCurrency(stats.pendingAmount)}`, 14, 50);
            
            // Prepare table data
            const tableData = customers.map(customer => {
                const balance = Utils.calculateBalance(customer.totalAmount, customer.depositAmount);
                return [
                    customer.name,
                    customer.phone || 'N/A',
                    Utils.formatCurrency(customer.depositAmount || 0),
                    Utils.formatCurrency(customer.totalAmount),
                    Utils.formatCurrency(balance),
                    customer.itemStatus === 'given' ? 'Given' : 'Pending',
                    customer.paymentStatus === 'paid' ? 'Paid' : 'Balance'
                ];
            });
            
            // Add table
            doc.autoTable({
                head: [['Name', 'Phone', 'Deposit', 'Total', 'Balance', 'Item Status', 'Payment Status']],
                body: tableData,
                startY: 60,
                theme: 'grid',
                headStyles: { fillColor: [212, 175, 55] },
                alternateRowStyles: { fillColor: [245, 245, 245] },
                margin: { top: 60 }
            });
            
            // Save PDF
            doc.save(`Gold_Shop_Customers_${new Date().toISOString().slice(0,10)}.pdf`);
            
            Utils.showNotification('Data exported to PDF successfully!');
            return true;
        } catch (error) {
            console.error('PDF export error:', error);
            Utils.showNotification('Error exporting to PDF', true);
            return false;
        }
    },
    
    // Initialize export functionality
    initialize: function() {
        // Event listeners will be added in app.js
    }
};