import React, { useState } from 'react';
import { Input } from '../ui/Input';

interface HobbiesFormProps {
  hobbies: string[];
  onUpdate: (hobbies: string[]) => void;
}

export function HobbiesForm({ hobbies, onUpdate }: HobbiesFormProps) {
  const [newHobby, setNewHobby] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHobby.trim()) {
      onUpdate([...hobbies, newHobby.trim()]);
      setNewHobby('');
    }
  };

  const handleRemove = (index: number) => {
    onUpdate(hobbies.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Hobbies & Interests</h2>
      
      {hobbies.map((hobby, index) => (
        <div key={index} className="mb-4 p-4 border rounded-md">
          <div className="flex justify-between items-center">
            <p>{hobby}</p>
            <button
              onClick={() => handleRemove(index)}
              className="text-destructive hover:text-destructive/90"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Add Hobby or Interest"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
          required
        />
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Hobby
        </button>
      </form>
    </div>
  );
}