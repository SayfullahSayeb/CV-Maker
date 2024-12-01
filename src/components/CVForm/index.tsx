import React from 'react';
import { toast } from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import { PersonalInfoForm } from './PersonalInfoForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { SkillsForm } from './SkillsForm';
import { CertificationsForm } from './CertificationsForm';
import { LanguagesForm } from './LanguagesForm';
import { HobbiesForm } from './HobbiesForm';
import { CVPreview } from '../CVPreview';
import { useCV } from '../../hooks/useCV';

export function CVForm() {
  const { 
    data, 
    updatePersonalInfo,
    addEducation,
    addExperience,
    addSkill,
    addCertification,
    addLanguage,
    updateHobbies,
    removeItem,
  } = useCV();

  const handleDownloadPDF = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `${data.personalInfo.firstName}-${data.personalInfo.lastName}-CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
      }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.success('CV downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download CV. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Your CV</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <PersonalInfoForm 
            data={data.personalInfo} 
            onUpdate={updatePersonalInfo} 
          />
          <EducationForm
            items={data.education}
            onAdd={addEducation}
            onRemove={(id) => removeItem('education', id)}
          />
          <ExperienceForm
            items={data.experience}
            onAdd={addExperience}
            onRemove={(id) => removeItem('experience', id)}
          />
          <SkillsForm
            items={data.skills}
            onAdd={addSkill}
            onRemove={(id) => removeItem('skills', id)}
          />
          <CertificationsForm
            items={data.certifications}
            onAdd={addCertification}
            onRemove={(id) => removeItem('certifications', id)}
          />
          <LanguagesForm
            items={data.languages}
            onAdd={addLanguage}
            onRemove={(id) => removeItem('languages', id)}
          />
          <HobbiesForm
            hobbies={data.hobbies}
            onUpdate={updateHobbies}
          />
        </div>
        
        <div className="sticky top-20">
          <CVPreview 
            data={data} 
            onDownload={handleDownloadPDF}
          />
        </div>
      </div>
    </div>
  );
}