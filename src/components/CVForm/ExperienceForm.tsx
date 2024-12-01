import React, { useState } from 'react';
import type { Experience } from '../../types/cv';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';

interface ExperienceFormProps {
  onAdd: (experience: Experience) => void;
  onRemove: (id: string) => void;
  items: Experience[];
}

export function ExperienceForm({ onAdd, onRemove, items }: ExperienceFormProps) {
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Work Experience</h2>
      
      {items.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded-md">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold">{item.position}</h3>
              <p className="text-sm text-muted-foreground">{item.company}</p>
              <p className="text-sm text-muted-foreground">
                {item.startDate} - {item.endDate}
              </p>
              <p className="text-sm mt-2">{item.description}</p>
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
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <Input
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
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
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Add Experience
          </button>
        </div>
      </form>
    </div>
  );
}