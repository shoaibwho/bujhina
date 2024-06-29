document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('studentProfile')) {
        loadStudentProfile();
    }

    if (document.getElementById('editStudentForm')) {
        document.getElementById('editStudentForm').addEventListener('submit', saveStudentProfile);
    }
});

async function loadStudentProfile() {
    const response = await fetch('/student/profile');
    const student = await response.json();
    document.getElementById('studentProfile').innerHTML = `
        <p><strong>Full Name:</strong> ${student.cv.fullName}</p>
        <p><strong>Age:</strong> ${student.cv.age}</p>
        <p><strong>Experience:</strong> ${student.cv.experience}</p>
        <p><strong>Education:</strong> ${student.cv.education}</p>
        <p><strong>Skills:</strong> ${student.cv.skills}</p>
        <p><strong>Account Created:</strong> ${new Date(student.createdAt).toLocaleDateString()}</p>
        <p><strong>Average Rating:</strong> ${student.averageRating || 'No ratings yet'}</p>
    `;
}

async function saveStudentProfile(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;

    const response = await fetch('/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv: { fullName, age, experience, education, skills } })
    });

    const result = await response.json();
    alert(result.message || 'Profile updated successfully');
}
