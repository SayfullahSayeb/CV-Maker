import React from 'react';
import type { Skill, Language } from '../../types/cv';
import { CVSection } from './CVSection';

interface CVSkillsProps {
  skills: Skill[];
  languages: Language[];
  hobbies: string[];
}

export function CVSkills({ skills, languages, hobbies }: CVSkillsProps) {
  return (
    <CVSection title="Skills and Interests" className="mb-8">
      {languages.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Language skills</h3>
          {languages.map((lang) => (
            <p key={lang.id}>
              {lang.name}: {lang.proficiency.toLowerCase()}
            </p>
          ))}
        </div>
      )}
      
      {skills.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Computer skills</h3>
          {skills.map((skill) => (
            <p key={skill.id}>
              {skill.level === 'Expert' ? 'Working knowledge' : 'Basic knowledge'}: {skill.name}
            </p>
          ))}
        </div>
      )}
      
      {hobbies.length > 0 && (
        <div>
          <h3 className="font-bold mb-2">Interests</h3>
          <p>{hobbies.join(', ')}</p>
        </div>
      )}
    </CVSection>
  );
}