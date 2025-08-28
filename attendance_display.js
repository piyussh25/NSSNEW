document.addEventListener('DOMContentLoaded', () => {
    const studentDetailsDiv = document.getElementById('student-details');
    const eventsListDiv = document.getElementById('events-list');
    const displayNameSpan = document.getElementById('display-name');
    const displayStudentIdSpan = document.getElementById('display-student-id');
    const displayBranchSpan = document.getElementById('display-branch');
    const eventsContainerUl = document.getElementById('events-container');
    const noEventsMessage = document.getElementById('no-events-message');

    const userRecordString = sessionStorage.getItem('userRecord');

    if (userRecordString) {
        const userRecord = JSON.parse(userRecordString);

        // Display student details
        if (userRecord.student) {
            displayNameSpan.textContent = userRecord.student.name;
            displayStudentIdSpan.textContent = userRecord.student.studentId;
            displayBranchSpan.textContent = userRecord.student.branch;
        } else {
            studentDetailsDiv.innerHTML = '<p>Student details not available.</p>';
        }

        // Display events
        if (userRecord.events && userRecord.events.length > 0) {
            userRecord.events.forEach(event => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Name:</strong> ${event.name}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                `;
                eventsContainerUl.appendChild(listItem);
            });
        } else {
            eventsContainerUl.style.display = 'none';
            noEventsMessage.style.display = 'block';
        }
    } else {
        // Handle case where no data is found (e.g., user directly navigated to this page)
        studentDetailsDiv.innerHTML = '<p>No attendance data found. Please log in.</p>';
        eventsListDiv.style.display = 'none';
    }
});
