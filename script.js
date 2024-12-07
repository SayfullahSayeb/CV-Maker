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

function addExperience() {
    const experienceList = document.getElementById('experience-list');
    const newEntry = createEntry('experience-list');
    if (newEntry) {
        experienceList.appendChild(newEntry);
    }
}

function addEducation() {
    const educationList = document.getElementById('education-list');
    const newEntry = createEntry('education-list');
    if (newEntry) {
        educationList.appendChild(newEntry);
    }
}

function addSkills() {
    const skillsList = document.getElementById('skills-list');
    const newEntry = createEntry('skills-list');
    if (newEntry) {
        skillsList.appendChild(newEntry);
    }
}

function addLanguages() {
    const languagesList = document.getElementById('languages-list');
    const newEntry = createEntry('languages-list');
    if (newEntry) {
        languagesList.appendChild(newEntry);
    }
}

function addCertifications() {
    const certificationsList = document.getElementById('certifications-list');
    const newEntry = createEntry('certifications-list');
    if (newEntry) {
        certificationsList.appendChild(newEntry);
    }
}

function addProjects() {
    const projectsList = document.getElementById('projects-list');
    const newEntry = createEntry('projects-list');
    if (newEntry) {
        projectsList.appendChild(newEntry);
    }
}

// Function to create new entry
function createEntry(listId) {
    const templateMap = {
        'experience-list': `
            <div class="entry">
                <div class="entry-grid">
                    <div class="form-group w-60">
                        <label>Company Name <span class="asterisk">*</span></label>
                        <input type="text" class="company" required>
                    </div>
                    <div class="form-group w-60">
                        <label>Position <span class="asterisk">*</span></label>
                        <input type="text" class="position" required>
                    </div>
                    <div class="form-group w-50">
                        <label>Location</label>
                        <input type="text" class="location">
                    </div>
                    <div class="form-group w-40">
                        <label>Start Date <span class="asterisk">*</span></label>
                        <input type="text" class="start-date" required placeholder="MM/YYYY">
                    </div>
                    <div class="form-group w-40">
                        <label>End Date</label>
                        <input type="text" class="end-date" placeholder="MM/YYYY or Present">
                    </div>
                    <div class="form-group full-width">
                        <label>Description <span class="asterisk">*</span></label>
                        <textarea class="description" rows="3" required placeholder="• Use bullet points to describe your achievements&#10;• Focus on quantifiable results&#10;• Start with action verbs"></textarea>
                    </div>
                </div>
            </div>
        `,
        'education-list': `
            <div class="entry">
                <div class="entry-grid">
                    <div class="form-group w-60">
                        <label>Institution <span class="asterisk">*</span></label>
                        <input type="text" class="institution" required>
                    </div>
                    <div class="form-group w-60">
                        <label>Degree <span class="asterisk">*</span></label>
                        <input type="text" class="degree" required>
                    </div>
                    <div class="form-group w-50">
                        <label>Field of Study <span class="asterisk">*</span></label>
                        <input type="text" class="field" required>
                    </div>
                    <div class="form-group w-40">
                        <label>Grade/GPA</label>
                        <input type="text" class="grade">
                    </div>
                    <div class="form-group w-40">
                        <label>Start Date <span class="asterisk">*</span></label>
                        <input type="text" class="start-date" required placeholder="MM/YYYY">
                    </div>
                    <div class="form-group w-40">
                        <label>End Date</label>
                        <input type="text" class="end-date" placeholder="MM/YYYY or Present">
                    </div>
                </div>
            </div>
        `,
        'skills-list': `
            <div class="entry">
                <div class="entry-grid">
                    <div class="form-group w-60">
                        <label>Skill Category <span class="asterisk">*</span></label>
                        <input type="text" class="skill-category" required placeholder="e.g., Programming Languages, Tools, Soft Skills">
                    </div>
                    <div class="form-group full-width">
                        <label>Skills <span class="asterisk">*</span></label>
                        <textarea class="skills" rows="2" required placeholder="List skills separated by commas"></textarea>
                    </div>
                </div>
            </div>
        `,
        'languages-list': `
            <div class="entry">
                <div class="entry-grid">
                    <div class="form-group w-50">
                        <label>Language <span class="asterisk">*</span></label>
                        <input type="text" class="language" required>
                    </div>
                    <div class="form-group w-50">
                        <label>Proficiency <span class="asterisk">*</span></label>
                        <select class="proficiency" required>
                            <option value="">Select Proficiency</option>
                            <option value="Native">Native</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Basic">Basic</option>
                        </select>
                    </div>
                </div>
            </div>
        `,
        'certifications-list': `
            <div class="entry">
                <div class="entry-grid">
                    <div class="form-group w-60">
                        <label>Certificate Name <span class="asterisk">*</span></label>
                        <input type="text" class="certificate-name" required>
                    </div>
                    <div class="form-group w-50">
                        <label>Issuing Organization <span class="asterisk">*</span></label>
                        <input type="text" class="issuing-organization" required>
                    </div>
                    <div class="form-group w-40">
                        <label>Date Obtained</label>
                        <input type="text" class="date-obtained" placeholder="MM/YYYY">
                    </div>
                </div>
            </div>
        `,
        'projects-list': `
            <div class="entry">
                <div class="entry-grid">
                    <div class="form-group w-60">
                        <label>Project Name <span class="asterisk">*</span></label>
                        <input type="text" class="project-name" required>
                    </div>
                    <div class="form-group w-50">
                        <label>Technologies Used</label>
                        <input type="text" class="technologies" placeholder="e.g., React, Node.js, MongoDB">
                    </div>
                    <div class="form-group full-width">
                        <label>Description <span class="asterisk">*</span></label>
                        <textarea class="description" rows="3" required placeholder="Describe your project, its purpose, and your role"></textarea>
                    </div>
                </div>
            </div>
        `
    };

    // Create a temporary container to parse the HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = templateMap[listId].trim();
    
    // Return the first child (the entry div)
    return tempContainer.firstChild;
}

// Check if form has required fields filled
function isFormValid() {
    const requiredFields = [
        'fullName',
        'jobTitle',
        'email',
        'phone',
        'location',
        'summary'
    ];

    let isValid = true;
    let emptyFields = [];

    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            isValid = false;
            emptyFields.push(element.previousElementSibling.textContent.replace(' *', ''));
        }
    });

    return { isValid, emptyFields };
}

// CV Preview and Download
const generateCV = () => {
    const { isValid } = isFormValid();
    if (!isValid) {
        return null;
    }

    const cv = document.createElement('div');
    cv.className = 'cv-document';
    
    // Personal Information Section
    const personalInfo = document.createElement('section');
    personalInfo.className = 'cv-section personal-info';
    personalInfo.innerHTML = `
        <h1>${document.getElementById('fullName').value}</h1>
        <h2>${document.getElementById('jobTitle').value}</h2>
        <div class="contact-info">
            <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
            <p><strong>Phone:</strong> ${document.getElementById('phone').value}</p>
            <p><strong>Location:</strong> ${document.getElementById('location').value}</p>
            ${document.getElementById('portfolio').value ? `<p><strong>Portfolio:</strong> ${document.getElementById('portfolio').value}</p>` : ''}
            ${document.getElementById('linkedin').value ? `<p><strong>LinkedIn:</strong> ${document.getElementById('linkedin').value}</p>` : ''}
            ${document.getElementById('github').value ? `<p><strong>GitHub:</strong> ${document.getElementById('github').value}</p>` : ''}
        </div>
        <div class="summary">
            <p>${document.getElementById('summary').value}</p>
        </div>
    `;
    cv.appendChild(personalInfo);

    // Work Experience
    const experience = document.createElement('section');
    experience.className = 'cv-section experience';
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
    education.className = 'cv-section education';
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
    skills.className = 'cv-section skills';
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
    languages.className = 'cv-section languages';
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
    certifications.className = 'cv-section certifications';
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
    projects.className = 'cv-section projects';
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

// Preview CV function
function previewCV() {
    const { isValid, emptyFields } = isFormValid();
    
    if (!isValid) {
        showNotification(
            `Please fill in the required fields: ${emptyFields.join(', ')}`,
            'warning',
            5000
        );
        return;
    }

    try {
        const modal = document.getElementById('preview-modal');
        const preview = document.getElementById('cv-preview');
        
        // Generate CV content
        preview.innerHTML = '';
        preview.appendChild(generateCV());
        modal.style.display = 'block';
        
        showNotification('CV preview generated successfully', 'success');
    } catch (error) {
        showNotification('Error generating CV preview. Please try again.', 'error');
    }
}

// Download CV function
async function downloadCV() {
    const { isValid, emptyFields } = isFormValid();
    
    if (!isValid) {
        showNotification(
            `Please fill in the required fields: ${emptyFields.join(', ')}`,
            'warning',
            5000
        );
        return;
    }

    try {
        showNotification('Preparing your CV for download...', 'info');
        
        const content = document.getElementById('cv-preview');
        content.innerHTML = '';
        content.appendChild(generateCV());
        
        const opt = {
            margin: 10,
            filename: `${document.getElementById('fullName').value.trim()}_CV.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(content).save();
        
        showNotification('CV downloaded successfully!', 'success');
    } catch (error) {
        showNotification('Error downloading CV. Please try again.', 'error');
        console.error(error); // For debugging purposes
    }
}

// Notification System
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create notification content
    let icon = '';
    switch(type) {
        case 'success':
            icon = '✓';
            break;
        case 'error':
            icon = '✕';
            break;
        case 'warning':
            icon = '⚠';
            break;
        default:
            icon = 'ℹ';
    }

    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">✕</button>
        <div class="notification-progress">
            <div class="notification-progress-bar"></div>
        </div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);

    // Animate progress bar
    const progressBar = notification.querySelector('.notification-progress-bar');
    progressBar.style.width = '100%';
    setTimeout(() => {
        progressBar.style.width = '0%';
    }, 10);

    // Remove notification after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

const closePreview = () => {
    const modal = document.getElementById('preview-modal');
    modal.style.display = 'none';
}

// Custom Confirm Dialog
function showConfirmDialog(title, message, onConfirm) {
    // Create dialog element
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    
    dialog.innerHTML = `
        <div class="confirm-dialog-content">
            <div class="confirm-dialog-header">
                <h3 class="confirm-dialog-title">${title}</h3>
            </div>
            <div class="confirm-dialog-message">${message}</div>
            <div class="confirm-dialog-actions">
                <button class="confirm-dialog-btn cancel">Cancel</button>
                <button class="confirm-dialog-btn confirm">Confirm</button>
            </div>
        </div>
    `;

    // Add to document
    document.body.appendChild(dialog);

    // Show dialog with animation
    setTimeout(() => dialog.classList.add('show'), 10);

    // Handle button clicks
    const cancelBtn = dialog.querySelector('.cancel');
    const confirmBtn = dialog.querySelector('.confirm');

    cancelBtn.addEventListener('click', () => {
        dialog.classList.remove('show');
        setTimeout(() => dialog.remove(), 300);
    });

    confirmBtn.addEventListener('click', () => {
        dialog.classList.remove('show');
        setTimeout(() => {
            dialog.remove();
            onConfirm();
        }, 300);
    });
}

function clearForm() {
    showConfirmDialog(
        'Clear Form',
        'Are you sure you want to clear all form data? This action cannot be undone.',
        () => {
            try {
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
                
                showNotification('Form cleared successfully', 'success');
            } catch (error) {
                showNotification('Error clearing form: ' + error.message, 'error');
            }
        }
    );
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
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