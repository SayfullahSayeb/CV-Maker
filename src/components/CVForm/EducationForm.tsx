import React, { useState } from 'react';
import type { Education } from '../../types/cv';
import { Input } from '../ui/Input';

interface EducationFormProps {
  onAdd: (education: Education) => void;
  onRemove: (id: string) => void;
  items: Education[];
}

export function EducationForm({ onAdd, onRemove, items }: EducationFormProps) {
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    grade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      grade: '',
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Education</h2>
      
      {items.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded-md">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold">{item.degree} in {item.field}</h3>
              <p className="text-sm text-muted-foreground">{item.institution}</p>
              <p className="text-sm text-muted-foreground">
                {item.startDate} - {item.endDate}
              </p>
              {item.grade && <p className="text-sm">Grade: {item.grade}</p>}
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-destructive hover:text-destructive/90"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          required
        />
        <Input
          label="Degree"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          required
        />
        <Input
          label="Field of Study"
          name="field"
          value={formData.field}
          onChange={handleChange}
          required
        />
        <Input
          label="Grade/GPA (Optional)"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
        />
        <Input
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <Input
          label="End Date"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Add Education
          </button>
        </div>
      </form>
    </div>
  );
}