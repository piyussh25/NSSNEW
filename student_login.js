document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentId = document.getElementById('student-id').value;
    const password = document.getElementById('password').value;

    const url = 'https://nss-attendance-proxy-server.onrender.com/loginstudent';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid student ID or password');
        }
    })
    .then(data => {
        console.log('Data received in frontend:', data);
        if (data.userRecord) {
            console.log('User record found, redirecting...');
            sessionStorage.setItem('userRecord', JSON.stringify(data.userRecord));
            window.location.href = 'attendance_display.html';
        } else {
            console.log('No user record found in data.');
            alert('Login successful, but no user record found.');
        }
    })
    .catch(error => {
        alert(error.message);
    });
});
