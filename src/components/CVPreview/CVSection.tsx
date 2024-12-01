import React from 'react';

interface CVSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CVSection({ title, children, className = '' }: CVSectionProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-bold bg-neutral-300 px-4 py-1 mb-4">{title}</h2>
      {children}
    </div>
  );
}