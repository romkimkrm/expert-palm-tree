document.addEventListener('DOMContentLoaded', function() {
    loadDevices();
    setupEventListeners();
});

function loadDevices() {
    const devices = dataService.getAllDevices();
    const tableBody = document.getElementById('device-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = devices.map(device => `
        <tr>
            <td>${device.deviceType}</td>
            <td>${device.serialNumber}</td>
            <td>${device.condition}</td>
            <td>${device.status}</td>
            <td>
                <button onclick="editDevice('${device.id}')">Edit</button>
                <button onclick="deleteDevice('${device.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function setupEventListeners() {
    const deviceForm = document.getElementById('deviceForm');
    if (deviceForm) {
        deviceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newDevice = {
                deviceType: document.getElementById('deviceType').value,
                serialNumber: document.getElementById('serialNumber').value,
                condition: document.getElementById('condition').value,
                status: 'Available'
            };

            dataService.addDevice(newDevice);
            loadDevices();
            deviceForm.reset();
        });
    }
}

function deleteDevice(id) {
    if (confirm('Are you sure you want to delete this device?')) {
        dataService.deleteDevice(id);
        loadDevices();
    }
}

function editDevice(id) {
    const devices = dataService.getAllDevices();
    const device = devices.find(d => d.id === id);
    
    if (device) {
        // Populate form for editing
        document.getElementById('deviceType').value = device.deviceType;
        document.getElementById('serialNumber').value = device.serialNumber;
        document.getElementById('condition').value = device.condition;
        
        // Change form submit button
        const form = document.getElementById('deviceForm');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Update Device';
        
        // Add data-editing attribute to form
        form.setAttribute('data-editing', id);
    }
}