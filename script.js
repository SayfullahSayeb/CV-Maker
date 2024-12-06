// Theme Management
const initTheme = () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.getElementById('theme-toggle').textContent = darkMode ? '☀️' : '🌙';
};

const toggleDarkMode = () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('theme-toggle').textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('darkMode', !isDark);
};

// Form Data Management
const saveFormData = () => {
    const formData = {};
    document.querySelectorAll('input, select, textarea').forEach(element => {
        if (element.id) {
            formData[element.id] = element.value;
        }
    });
    localStorage.setItem('cvFormData', JSON.stringify(formData));
};

const loadFormData = () => {
    const savedData = localStorage.getItem('cvFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        Object.entries(formData).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = value;
            }
        });
    }
};

// Form Validation
const validateForm = () => {
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('invalid');
            isValid = false;
        } else {
            field.classList.remove('invalid');
        }
    });

    // Email validation
    const emailField = document.getElementById('email');
    if (emailField && emailField.value) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailField.value)) {
            emailField.classList.add('invalid');
            isValid = false;
        }
    }

    // Phone validation
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value) {
        const phonePattern = /^\+?[\d\s-]{10,}$/;
        if (!phonePattern.test(phoneField.value)) {
            phoneField.classList.add('invalid');
            isValid = false;
        }
    }

    return isValid;
};

// Dynamic Entry Management
const createEntry = (templateId) => {
    const template = document.querySelector(`#${templateId} .entry`);
    if (!template) return null;
    
    const newEntry = template.cloneNode(true);
    newEntry.querySelectorAll('input, select, textarea').forEach(input => {
        input.value = '';
    });
    return newEntry;
};

const addExperience = () => {
    const container = document.getElementById('experience-list');
    const newEntry = createEntry('experience-list');
    if (newEntry) container.appendChild(newEntry);
};

const addEducation = () => {
    const container = document.getElementById('education-list');
    const newEntry = createEntry('education-list');
    if (newEntry) container.appendChild(newEntry);
};

const addSkill = () => {
    const container = document.getElementById('skills-list');
    const newEntry = createEntry('skills-list');
    if (newEntry) container.appendChild(newEntry);
};

const addLanguage = () => {
    const container = document.getElementById('languages-list');
    const newEntry = createEntry('languages-list');
    if (newEntry) container.appendChild(newEntry);
};

const addCertification = () => {
    const container = document.getElementById('certifications-list');
    const newEntry = createEntry('certifications-list');
    if (newEntry) container.appendChild(newEntry);
};

const addProject = () => {
    const container = document.getElementById('projects-list');
    const newEntry = createEntry('projects-list');
    if (newEntry) container.appendChild(newEntry);
};

// CV Preview and Download
const generateCV = () => {
    if (!validateForm()) {
        alert('Please fill in all required fields correctly.');
        return null;
    }

    const cv = document.createElement('div');
    cv.className = 'cv-preview';

    // Personal Information
    const personalInfo = document.createElement('section');
    personalInfo.innerHTML = `
        <h1>${document.getElementById('fullName').value}</h1>
        <h2>${document.getElementById('jobTitle').value}</h2>
        <div class="contact-info">
            <p>📧 ${document.getElementById('email').value}</p>
            <p>📱 ${document.getElementById('phone').value}</p>
            <p>📍 ${document.getElementById('location').value}</p>
            ${document.getElementById('portfolio').value ? `<p>🌐 <a href="${document.getElementById('portfolio').value}" target="_blank">Portfolio</a></p>` : ''}
            ${document.getElementById('linkedin').value ? `<p>💼 <a href="${document.getElementById('linkedin').value}" target="_blank">LinkedIn</a></p>` : ''}
            ${document.getElementById('github').value ? `<p>💻 <a href="${document.getElementById('github').value}" target="_blank">GitHub</a></p>` : ''}
        </div>
        <div class="summary">
            <p>${document.getElementById('summary').value}</p>
        </div>
    `;
    cv.appendChild(personalInfo);

    // Work Experience
    const experience = document.createElement('section');
    experience.innerHTML = '<h3>Work Experience</h3>';
    document.querySelectorAll('#experience-list .entry').forEach(entry => {
        experience.innerHTML += `
            <div class="experience-item">
                <h4>${entry.querySelector('.position').value} at ${entry.querySelector('.company').value}</h4>
                <p class="date">${entry.querySelector('.start-date').value} - ${entry.querySelector('.end-date').value}</p>
                <p class="location">${entry.querySelector('.location').value}</p>
                <div class="description">${entry.querySelector('.description').value}</div>
            </div>
        `;
    });
    cv.appendChild(experience);

    // Education
    const education = document.createElement('section');
    education.innerHTML = '<h3>Education</h3>';
    document.querySelectorAll('#education-list .entry').forEach(entry => {
        education.innerHTML += `
            <div class="education-item">
                <h4>${entry.querySelector('.degree').value} in ${entry.querySelector('.field').value}</h4>
                <p>${entry.querySelector('.institution').value}</p>
                <p class="date">${entry.querySelector('.start-date').value} - ${entry.querySelector('.end-date').value}</p>
                ${entry.querySelector('.grade').value ? `<p>Grade: ${entry.querySelector('.grade').value}</p>` : ''}
            </div>
        `;
    });
    cv.appendChild(education);

    // Skills
    const skills = document.createElement('section');
    skills.innerHTML = '<h3>Skills</h3>';
    document.querySelectorAll('#skills-list .entry').forEach(entry => {
        skills.innerHTML += `
            <div class="skill-item">
                <h4>${entry.querySelector('.skill-category').value}</h4>
                <p>${entry.querySelector('.skill-list').value}</p>
            </div>
        `;
    });
    cv.appendChild(skills);

    // Languages
    const languages = document.createElement('section');
    languages.innerHTML = '<h3>Languages</h3>';
    document.querySelectorAll('#languages-list .entry').forEach(entry => {
        languages.innerHTML += `
            <div class="language-item">
                <p><strong>${entry.querySelector('.language').value}</strong> - ${entry.querySelector('.proficiency').value}</p>
            </div>
        `;
    });
    cv.appendChild(languages);

    // Certifications
    const certifications = document.createElement('section');
    certifications.innerHTML = '<h3>Certifications</h3>';
    document.querySelectorAll('#certifications-list .entry').forEach(entry => {
        certifications.innerHTML += `
            <div class="certification-item">
                <h4>${entry.querySelector('.cert-name').value}</h4>
                <p>${entry.querySelector('.issuer').value} - ${entry.querySelector('.cert-date').value}</p>
                ${entry.querySelector('.cert-url').value ? `<p><a href="${entry.querySelector('.cert-url').value}" target="_blank">View Certificate</a></p>` : ''}
            </div>
        `;
    });
    cv.appendChild(certifications);

    // Projects
    const projects = document.createElement('section');
    projects.innerHTML = '<h3>Projects</h3>';
    document.querySelectorAll('#projects-list .entry').forEach(entry => {
        projects.innerHTML += `
            <div class="project-item">
                <h4>${entry.querySelector('.project-name').value}</h4>
                <p><strong>Technologies:</strong> ${entry.querySelector('.technologies').value}</p>
                ${entry.querySelector('.project-url').value ? `<p><a href="${entry.querySelector('.project-url').value}" target="_blank">View Project</a></p>` : ''}
                <div class="description">${entry.querySelector('.project-description').value}</div>
            </div>
        `;
    });
    cv.appendChild(projects);

    return cv;
};

const previewCV = () => {
    const cv = generateCV();
    if (!cv) return;

    const previewModal = document.getElementById('preview-modal');
    const previewContent = document.getElementById('cv-preview');
    
    previewContent.innerHTML = '';
    previewContent.appendChild(cv);
    previewModal.style.display = 'block';
};

const closePreview = () => {
    document.getElementById('preview-modal').style.display = 'none';
};

const downloadCV = async () => {
    const cv = generateCV();
    if (!cv) return;

    const element = cv.cloneNode(true);
    const opt = {
        margin: 1,
        filename: `${document.getElementById('fullName').value.replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('There was an error generating your PDF. Please try again.');
    }
};

const clearForm = () => {
    if (confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
        document.getElementById('cv-form').reset();
        localStorage.removeItem('cvFormData');
        
        // Clear all dynamic entries except the first one in each section
        ['experience-list', 'education-list', 'skills-list', 'languages-list', 'certifications-list', 'projects-list'].forEach(id => {
            const container = document.getElementById(id);
            const entries = container.querySelectorAll('.entry');
            entries.forEach((entry, index) => {
                if (index > 0) entry.remove();
            });
            // Clear the first entry's fields
            const firstEntry = container.querySelector('.entry');
            if (firstEntry) {
                firstEntry.querySelectorAll('input, select, textarea').forEach(input => {
                    input.value = '';
                });
            }
        });
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadFormData();

    // Auto-save form data
    document.getElementById('cv-form').addEventListener('input', saveFormData);

    // Close modal when clicking outside
    window.onclick = (event) => {
        const modal = document.getElementById('preview-modal');
        if (event.target === modal) {
            closePreview();
        }
    };

    // Add validation listeners
    document.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('input', () => {
            if (element.hasAttribute('required')) {
                if (element.value.trim()) {
                    element.classList.remove('invalid');
                } else {
                    element.classList.add('invalid');
                }
            }
        });
    });
});