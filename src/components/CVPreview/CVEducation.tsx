import React from 'react';
import type { Education } from '../../types/cv';
import { CVSection } from './CVSection';

interface CVEducationProps {
  education: Education[];
}

export function CVEducation({ education }: CVEducationProps) {
  if (education.length === 0) return null;

  return (
    <CVSection title="Education" className="mb-8">
      {education.map((edu) => (
        <div key={edu.id} className="grid grid-cols-[1fr,3fr] gap-4 mb-6">
          <div className="text-sm">
            {edu.startDate} - {edu.endDate}
          </div>
          <div>
            <h3 className="font-bold">{edu.institution}</h3>
            <p>{edu.degree} in {edu.field}</p>
            {edu.grade && (
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>Grade: {edu.grade}</li>
              </ul>
            )}
          </div>
        </div>
      ))}
    </CVSection>
  );
}