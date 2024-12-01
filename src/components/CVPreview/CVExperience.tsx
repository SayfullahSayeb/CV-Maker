import React from 'react';
import type { Experience } from '../../types/cv';
import { CVSection } from './CVSection';

interface CVExperienceProps {
  experiences: Experience[];
}

export function CVExperience({ experiences }: CVExperienceProps) {
  if (experiences.length === 0) return null;

  return (
    <CVSection title="Career" className="mb-8">
      {experiences.map((exp) => (
        <div key={exp.id} className="grid grid-cols-[1fr,3fr] gap-4 mb-6">
          <div className="text-sm">
            {exp.startDate} - {exp.endDate}
          </div>
          <div>
            <h3 className="font-bold">{exp.company}</h3>
            <p className="font-semibold">{exp.position}</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>{exp.description}</li>
            </ul>
          </div>
        </div>
      ))}
    </CVSection>
  );
}