// Current Date and Time
function updateDateTime() {
    const now = new Date();
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');

    // Format date (e.g., "Monday, March 15, 2024")
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);

    // Format time (e.g., "11:45 AM")
    timeElement.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Update every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

// Navigation
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).style.display = 'block';

        // Update active nav item
        document.querySelectorAll('.nav-menu li').forEach(item => {
            item.classList.remove('active');
        });

        this.parentElement.classList.add('active');
    });
});

// Modal Functions
function showAddTeacherModal() {
    document.getElementById('addTeacherModal').style.display = 'flex';
}

function showUploadNoticeModal() {
    document.getElementById('uploadNoticeModal').style.display = 'flex';
}

function showUpdateSlidesModal() {
    // Implementation for slides modal
    alert('Functionality to be implemented');
}

function showAttendanceReportModal() {
    // Implementation for report modal
    alert('Functionality to be implemented');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Form Submissions
document.getElementById('teacherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Teacher added successfully!');
    closeModal('addTeacherModal');
    // Here you would typically send data to server
});

document.getElementById('noticeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Notice published successfully!');
    closeModal('uploadNoticeModal');
    // Here you would typically send data to server
});

// Initialize dashboard to show the dashboard section by default
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.nav-menu li.active a').click();
});