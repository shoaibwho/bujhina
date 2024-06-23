document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('teacherProfile')) {
        loadTeacherProfile();
    }

    if (document.getElementById('editTeacherForm')) {
        document.getElementById('editTeacherForm').addEventListener('submit', saveTeacherProfile);
    }
});

async function loadTeacherProfile() {
    const response = await fetch('/teacher/profile');
    const teacher = await response.json();
    document.getElementById('teacherProfile').innerHTML = `
        <p><strong>Full Name:</strong> ${teacher.cv.fullName}</p>
        <p><strong>Age:</strong> ${teacher.cv.age}</p>
        <p><strong>Experience:</strong> ${teacher.cv.experience}</p>
        <p><strong>Education:</strong> ${teacher.cv.education}</p>
        <p><strong>Skills:</strong> ${teacher.cv.skills}</p>
        <p><strong>Account Created:</strong> ${new Date(teacher.createdAt).toLocaleDateString()}</p>
        <p><strong>Average Rating:</strong> ${teacher.averageRating || 'No ratings yet'}</p>
    `;
}

async function saveTeacherProfile(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;

    const response = await fetch('/teacher/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv: { fullName, age, experience, education, skills } })
    });

    const result = await response.json();
    alert(result.message || 'Profile updated successfully');
}
