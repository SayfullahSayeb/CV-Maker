import { useState, useCallback } from 'react';
import type { 
  CVData, 
  PersonalInfo, 
  Education,
  Experience,
  Skill,
  Certification,
  Project,
  Language,
  Reference 
} from '../types/cv';

const initialData: CVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    maritalStatus: '',
    religion: '',
    gender: '',
    professionalSummary: '',
  },
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  projects: [],
  languages: [],
  references: [],
  hobbies: [],
  activities: [],
};

export function useCV() {
  const [data, setData] = useState<CVData>(() => {
    const saved = localStorage.getItem('cv-data');
    return saved ? JSON.parse(saved) : initialData;
  });

  const updatePersonalInfo = useCallback((info: PersonalInfo) => {
    setData(prev => {
      const newData = { ...prev, personalInfo: info };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const addEducation = useCallback((education: Education) => {
    setData(prev => {
      const newData = {
        ...prev,
        education: [...prev.education, { ...education, id: crypto.randomUUID() }],
      };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const addExperience = useCallback((experience: Experience) => {
    setData(prev => {
      const newData = {
        ...prev,
        experience: [...prev.experience, { ...experience, id: crypto.randomUUID() }],
      };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const addSkill = useCallback((skill: Skill) => {
    setData(prev => {
      const newData = {
        ...prev,
        skills: [...prev.skills, { ...skill, id: crypto.randomUUID() }],
      };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const addCertification = useCallback((certification: Certification) => {
    setData(prev => {
      const newData = {
        ...prev,
        certifications: [...prev.certifications, { ...certification, id: crypto.randomUUID() }],
      };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const addProject = useCallback((project: Project) => {
    setData(prev => {
      const newData = {
        ...prev,
        projects: [...prev.projects, { ...project, id: crypto.randomUUID() }],
      };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const addLanguage = useCallback((language: Language) => {
    setData(prev => {
      const newData = {
        ...prev,
        languages: [...prev.languages, { ...language, id: crypto.randomUUID() }],
      };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const addReference = useCallback((reference: Reference) => {
    setData(prev => {
      const newData = {
        ...prev,
        references: [...prev.references, { ...reference, id: crypto.randomUUID() }],
      };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const updateHobbies = useCallback((hobbies: string[]) => {
    setData(prev => {
      const newData = { ...prev, hobbies };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const updateActivities = useCallback((activities: string[]) => {
    setData(prev => {
      const newData = { ...prev, activities };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const removeItem = useCallback((section: keyof CVData, id: string) => {
    setData(prev => {
      const newData = {
        ...prev,
        [section]: Array.isArray(prev[section]) 
          ? prev[section].filter((item: any) => item.id !== id)
          : prev[section],
      };
      localStorage.setItem('cv-data', JSON.stringify(newData));
      return newData;
    });
  }, []);

  return {
    data,
    updatePersonalInfo,
    addEducation,
    addExperience,
    addSkill,
    addCertification,
    addProject,
    addLanguage,
    addReference,
    updateHobbies,
    updateActivities,
    removeItem,
  };
}