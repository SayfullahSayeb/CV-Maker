import React from 'react';
import type { PersonalInfo } from '../../types/cv';

interface CVHeaderProps {
  personalInfo: PersonalInfo;
}

export function CVHeader({ personalInfo }: CVHeaderProps) {
  return (
    <div className="grid grid-cols-[2fr,1fr] gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-8">CV</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="font-bold">Name</h2>
            <p>{personalInfo.firstName} {personalInfo.lastName}</p>
          </div>
          
          <div>
            <h2 className="font-bold">Address</h2>
            <p>{personalInfo.address}</p>
          </div>
          
          <div>
            <h2 className="font-bold">Email</h2>
            <p>{personalInfo.email}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h2 className="font-bold">Birthday</h2>
          <p>{new Date(personalInfo.dateOfBirth).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })} in {personalInfo.nationality}</p>
        </div>
        
        <div>
          <h2 className="font-bold">Phone</h2>
          <p>{personalInfo.phone}</p>
        </div>
        
        {personalInfo.profileImage && (
          <img 
            src={personalInfo.profileImage} 
            alt="Profile"
            className="w-32 h-32 object-cover rounded-sm"
          />
        )}
      </div>
    </div>
  );
}