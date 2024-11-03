const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceType: String,
    serialNumber: String,
    condition: String,
    purchaseDate: Date,
    assignedTo: {
        employeeName: String,
        assignmentDate: Date,
        expectedReturnDate: Date
    },
    status: String,
    notes: String,
    imageUrl: String
});

module.exports = mongoose.model('Device', deviceSchema); 