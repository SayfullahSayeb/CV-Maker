import React, { useState } from 'react';
import type { Certification } from '../../types/cv';
import { Input } from '../ui/Input';

interface CertificationsFormProps {
  onAdd: (certification: Certification) => void;
  onRemove: (id: string) => void;
  items: Certification[];
}

export function CertificationsForm({ onAdd, onRemove, items }: CertificationsFormProps) {
  const [formData, setFormData] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: '',
      issuer: '',
      date: '',
      url: '',
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Certifications</h2>
      
      {items.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                {item.issuer} - {item.date}
              </p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Certificate
                </a>
              )}
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
          label="Certificate Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Issuing Organization"
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          required
        />
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <Input
          label="Certificate URL (Optional)"
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Add Certification
          </button>
        </div>
      </form>
    </div>
  );
}