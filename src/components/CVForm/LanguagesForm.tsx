import React, { useState } from 'react';
import type { Language } from '../../types/cv';
import { Input } from '../ui/Input';

interface LanguagesFormProps {
  onAdd: (language: Language) => void;
  onRemove: (id: string) => void;
  items: Language[];
}

export function LanguagesForm({ onAdd, onRemove, items }: LanguagesFormProps) {
  const [formData, setFormData] = useState<Omit<Language, 'id'>>({
    name: '',
    proficiency: 'Intermediate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', proficiency: 'Intermediate' });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Languages</h2>
      
      {items.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Proficiency: {item.proficiency}
              </p>
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
          label="Language"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Proficiency Level
          </label>
          <select
            name="proficiency"
            value={formData.proficiency}
            onChange={(e) => setFormData(prev => ({ ...prev, proficiency: e.target.value as Language['proficiency'] }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
            required
          >
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Fluent">Fluent</option>
            <option value="Native">Native</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Language
        </button>
      </form>
    </div>
  );
}