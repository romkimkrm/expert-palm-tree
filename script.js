// script.js

// Sample notification data (to be replaced with real data in a full implementation)
const notifications = [
    { id: 123, message: "Device #123 needs a refresh by next month.", read: false },
    { id: 456, message: "Device #456 is overdue for return.", read: false },
    { id: 789, message: "Device #789 requires immediate maintenance.", read: false },
];

// Function to display notifications
function displayNotifications() {
    const notificationList = document.getElementById("notification-list");
    notificationList.innerHTML = notifications
        .filter(n => !n.read)
        .map(n => `<li>${n.message}</li>`)
        .join("");
}

// Function to mark all notifications as read
function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    displayNotifications(); // Refresh the notification display
}

// Function to clear dismissed notifications
function clearDismissedNotifications() {
    const dismissedNotificationList = document.getElementById("dismissed-notification-list");
    dismissedNotificationList.innerHTML = ''; // Clear the dismissed notifications
}

// Initial display of notifications when the script loads
displayNotifications();
// Function to handle device assignment
function handleDeviceAssignment(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const deviceId = document.getElementById("device-id").value;
    const employeeName = document.getElementById("employee-name").value;

    // You can now save this data to a database or perform further actions
    console.log(`Device ${deviceId} assigned to ${employeeName}`);

    // Optionally clear the form after submission
    document.getElementById("device-assignment-form").reset();
}

// Add event listener to the form
const assignmentForm = document.getElementById("device-assignment-form");
if (assignmentForm) {
    assignmentForm.addEventListener("submit", handleDeviceAssignment);
}
