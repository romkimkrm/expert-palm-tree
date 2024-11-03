class DataService {
    constructor() {
        // Initialize storage if empty
        if (!localStorage.getItem('devices')) {
            localStorage.setItem('devices', JSON.stringify([]));
        }
        if (!localStorage.getItem('assignments')) {
            localStorage.setItem('assignments', JSON.stringify([]));
        }
    }

    // Device methods
    getAllDevices() {
        return JSON.parse(localStorage.getItem('devices'));
    }

    addDevice(device) {
        const devices = this.getAllDevices();
        device.id = Date.now().toString(); // Simple unique ID
        devices.push(device);
        localStorage.setItem('devices', JSON.stringify(devices));
        return device;
    }

    updateDevice(id, updatedDevice) {
        const devices = this.getAllDevices();
        const index = devices.findIndex(d => d.id === id);
        if (index !== -1) {
            devices[index] = { ...devices[index], ...updatedDevice };
            localStorage.setItem('devices', JSON.stringify(devices));
            return devices[index];
        }
        return null;
    }

    deleteDevice(id) {
        const devices = this.getAllDevices();
        const filteredDevices = devices.filter(d => d.id !== id);
        localStorage.setItem('devices', JSON.stringify(filteredDevices));
    }
}

const dataService = new DataService();
