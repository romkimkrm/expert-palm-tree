const mongoose = require('mongoose');
const Device = require('./models/Device');

// Test data
const testDevices = [
    {
        deviceType: "Laptop",
        serialNumber: "LAP123",
        condition: "New",
        status: "Available",
        purchaseDate: new Date(),
        notes: "Test laptop"
    },
    {
        deviceType: "Phone",
        serialNumber: "PHN456",
        condition: "Good",
        status: "Assigned",
        purchaseDate: new Date(),
        assignedTo: {
            employeeName: "John Doe",
            assignmentDate: new Date(),
            expectedReturnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        }
    }
];

// Test database connection and CRUD operations
async function runTests() {
    try {
        // Connect to test database
        await mongoose.connect('mongodb://localhost/it_inventory_test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to test database');

        // Clear existing data
        await Device.deleteMany({});
        console.log('Cleared existing devices');

        // Test creation
        const devices = await Device.insertMany(testDevices);
        console.log('Test devices created:', devices);

        // Test reading
        const foundDevices = await Device.find();
        console.log('Found devices:', foundDevices);

        // Test updating
        const updatedDevice = await Device.findOneAndUpdate(
            { serialNumber: "LAP123" },
            { condition: "Good" },
            { new: true }
        );
        console.log('Updated device:', updatedDevice);

        // Test deletion
        const deletedDevice = await Device.findOneAndDelete({ serialNumber: "PHN456" });
        console.log('Deleted device:', deletedDevice);

        console.log('All tests completed successfully');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

runTests();
