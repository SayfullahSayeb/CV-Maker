import React, { useState, useRef, useEffect } from 'react';
import type { CVData } from '../../types/cv';
import { PreviewControls } from './PreviewControls';
import { CVHeader } from './CVHeader';
import { CVExperience } from './CVExperience';
import { CVEducation } from './CVEducation';
import { CVSkills } from './CVSkills';

interface CVPreviewProps {
  data: CVData;
  onDownload: () => void;
}

export function CVPreview({ data, onDownload }: CVPreviewProps) {
  const [zoom, setZoom] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      const height = previewRef.current.scrollHeight;
      const pageHeight = 1123; // A4 height in pixels at 96 DPI
      setTotalPages(Math.ceil(height / pageHeight));
    }
  }, [data]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-card rounded-lg shadow-lg">
      <PreviewControls
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={onDownload}
        totalPages={totalPages}
      />
      
      <div className="overflow-auto max-h-[calc(100vh-12rem)] p-4">
        <div
          ref={previewRef}
          id="cv-preview"
          className="bg-white text-black p-12 rounded-lg shadow-sm transition-transform origin-top"
          style={{
            transform: `scale(${zoom})`,
            width: '210mm',
            minHeight: '297mm',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <CVHeader personalInfo={data.personalInfo} />
          <CVExperience experiences={data.experience} />
          <CVEducation education={data.education} />
          <CVSkills 
            skills={data.skills}
            languages={data.languages}
            hobbies={data.hobbies}
          />
          
          <div className="mt-12">
            <p className="mb-8">
              {data.personalInfo.address.split(',')[0]}, {currentDate}
            </p>
            <div className="w-48 h-16 border-b border-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}