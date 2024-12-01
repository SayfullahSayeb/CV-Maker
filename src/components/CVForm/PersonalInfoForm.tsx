import React from 'react';
import type { PersonalInfo } from '../../types/cv';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onUpdate }: PersonalInfoFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onUpdate({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
        />
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={data.dateOfBirth}
          onChange={handleChange}
          required
        />
        <Input
          label="Nationality"
          name="nationality"
          value={data.nationality}
          onChange={handleChange}
          required
        />
        <Input
          label="LinkedIn Profile"
          type="url"
          name="linkedIn"
          value={data.linkedIn || ''}
          onChange={handleChange}
        />
        <Input
          label="Portfolio Website"
          type="url"
          name="portfolio"
          value={data.portfolio || ''}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <Input
            label="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
            required
          />
        </div>
        <Input
          label="Marital Status"
          name="maritalStatus"
          value={data.maritalStatus}
          onChange={handleChange}
          required
        />
        <Input
          label="Religion"
          name="religion"
          value={data.religion}
          onChange={handleChange}
          required
        />
        <Input
          label="Gender"
          name="gender"
          value={data.gender}
          onChange={handleChange}
          required
        />
        <div className="md:col-span-2">
          <TextArea
            label="Professional Summary"
            name="professionalSummary"
            value={data.professionalSummary}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}