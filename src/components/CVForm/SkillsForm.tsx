import React, { useState } from 'react';
import type { Skill } from '../../types/cv';
import { Input } from '../ui/Input';

interface SkillsFormProps {
  onAdd: (skill: Skill) => void;
  onRemove: (id: string) => void;
  items: Skill[];
}

export function SkillsForm({ onAdd, onRemove, items }: SkillsFormProps) {
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'Intermediate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', level: 'Intermediate' });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Skills</h2>
      
      {items.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">Level: {item.level}</p>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Skill Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Skill Level
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as Skill['level'] }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
}