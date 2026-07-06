"use client";

import React, { useState, useEffect, useRef } from 'react';
import AppShell from '../../../components/AppShell';
import { navigateTo } from '../../../utils/navigation';
import { ShieldAlert, Stethoscope, Plus, X, UserCircle2, Camera } from 'lucide-react';
import { useCompleteDoctorProfile, useUpdateDoctorProfilePicture } from '../../../lib/service/query/useDoctor';
import { useUploadFile } from '../../../lib/service/query/useUpload';
import { getApiErrorMessage } from '../../../utils/errors';
import Dropdown from '../../../components/Dropdown';

const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const LANGUAGE_OPTIONS = ['Sinhala', 'Tamil', 'English'];
const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

export default function CompleteDoctorProfilePage() {
  const [professionalBio, setProfessionalBio] = useState('');
  const [gender, setGender] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [customLanguage, setCustomLanguage] = useState('');
  const [qualifications, setQualifications] = useState<string[]>(['']);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const completeProfileMutation = useCompleteDoctorProfile();
  const uploadFileMutation = useUploadFile();
  const updateProfilePictureMutation = useUpdateDoctorProfilePicture();

  useEffect(() => {
    return () => {
      if (profileImagePreviewUrl) {
        URL.revokeObjectURL(profileImagePreviewUrl);
      }
    };
  }, [profileImagePreviewUrl]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > MAX_PROFILE_IMAGE_SIZE_BYTES) {
      setError(`${file.name} exceeds the 5MB size limit.`);
      return;
    }
    setProfileImageFile(file);
    setProfileImagePreviewUrl(URL.createObjectURL(file));
  };

  const removeProfileImage = () => {
    setProfileImageFile(null);
    setProfileImagePreviewUrl(null);
  };

  const toggleLanguage = (lang: string) => {
    setLanguages((prev) => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const addCustomLanguage = () => {
    const trimmed = customLanguage.trim();
    if (trimmed && !languages.includes(trimmed)) {
      setLanguages((prev) => [...prev, trimmed]);
    }
    setCustomLanguage('');
  };

  const updateQualification = (index: number, value: string) => {
    setQualifications((prev) => prev.map((q, i) => i === index ? value : q));
  };

  const addQualificationField = () => {
    setQualifications((prev) => [...prev, '']);
  };

  const removeQualificationField = (index: number) => {
    setQualifications((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanedQualifications = qualifications.map(q => q.trim()).filter(Boolean);

    if (!professionalBio.trim()) {
      setError('Please provide a short professional bio.');
      return;
    }
    if (!gender) {
      setError('Please select your gender.');
      return;
    }
    if (languages.length === 0) {
      setError('Please select at least one language you consult in.');
      return;
    }
    if (cleanedQualifications.length === 0) {
      setError('Please add at least one qualification.');
      return;
    }

    try {
      if (profileImageFile) {
        setIsUploadingImage(true);
        try {
          const imageUrl = await uploadFileMutation.mutateAsync({ file: profileImageFile, folder: 'doctor-profile-pictures' });
          await updateProfilePictureMutation.mutateAsync(imageUrl);
        } catch (uploadErr: any) {
          setError(getApiErrorMessage(uploadErr, 'Failed to upload profile picture.'));
          return;
        } finally {
          setIsUploadingImage(false);
        }
      }

      const response = await completeProfileMutation.mutateAsync({
        professionalBio: professionalBio.trim(),
        gender,
        languages,
        qualifications: cleanedQualifications,
      });

      if (response.success) {
        navigateTo('/doctor/dashboard');
      } else {
        setError(response.message || 'Failed to complete profile. Please try again.');
      }
    } catch (err: any) {
      setError(getApiErrorMessage(err, 'Failed to complete profile. Please check your connection and try again.'));
    }
  };

  return (
    <AppShell>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-3xl border border-hairline shadow-resting relative overflow-hidden">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-mint/10 flex items-center justify-center text-forest mb-4">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-forest">
              Complete Your Profile
            </h2>
            <p className="mt-2 text-xs text-ink-soft max-w-sm mx-auto">
              Just a few more details before you can access your dashboard and start accepting patients.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} id="complete-profile-form">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col items-center gap-2">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-cream border border-hairline overflow-hidden flex items-center justify-center">
                  {profileImagePreviewUrl ? (
                    <img src={profileImagePreviewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle2 className="w-14 h-14 text-ink-soft/40" />
                  )}
                </div>
                <label
                  htmlFor="complete-profile-picture"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-forest hover:bg-forest/90 text-white flex items-center justify-center cursor-pointer transition-all shadow-resting"
                  title="Upload profile photo"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleProfileImageChange}
                  className="hidden"
                  id="complete-profile-picture"
                />
              </div>
              {profileImageFile && (
                <button
                  type="button"
                  onClick={removeProfileImage}
                  className="text-[11px] text-ink-soft hover:text-red-600 cursor-pointer"
                  id="complete-profile-remove-picture"
                >
                  Remove photo
                </button>
              )}
              <p className="text-[11px] text-ink-soft">Profile photo (optional)</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5">Professional Bio</label>
              <textarea
                required
                value={professionalBio}
                onChange={(e) => setProfessionalBio(e.target.value)}
                rows={4}
                className="w-full bg-cream border border-hairline focus:border-forest/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-ink outline-none transition-all resize-none"
                placeholder="Share your experience, approach to counseling, and areas of focus..."
                id="complete-profile-bio"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5">Gender</label>
              <Dropdown
                id="complete-profile-gender"
                options={GENDER_OPTIONS}
                value={gender}
                placeholder="Select gender"
                onChange={setGender}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5">Languages You Consult In</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {LANGUAGE_OPTIONS.map(lang => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      languages.includes(lang)
                        ? 'bg-forest text-white border-forest'
                        : 'bg-cream text-ink-soft border-hairline hover:border-forest/40'
                    }`}
                    id={`complete-profile-lang-${lang.toLowerCase()}`}
                  >
                    {lang}
                  </button>
                ))}
                {languages.filter(l => !LANGUAGE_OPTIONS.includes(l)).map(lang => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-forest text-white border border-forest flex items-center gap-1.5"
                  >
                    {lang}
                    <button type="button" onClick={() => toggleLanguage(lang)} className="cursor-pointer" id={`complete-profile-remove-lang-${lang}`}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomLanguage(); } }}
                  className="flex-1 bg-cream border border-hairline focus:border-forest/50 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-ink outline-none transition-all"
                  placeholder="Add another language"
                  id="complete-profile-custom-lang"
                />
                <button
                  type="button"
                  onClick={addCustomLanguage}
                  className="px-4 py-2.5 rounded-xl bg-mint/20 hover:bg-mint/40 text-forest text-sm font-semibold cursor-pointer transition-all"
                  id="complete-profile-add-lang"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5">Qualifications</label>
              <div className="space-y-2">
                {qualifications.map((q, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => updateQualification(index, e.target.value)}
                      className="flex-1 bg-cream border border-hairline focus:border-forest/50 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-ink outline-none transition-all"
                      placeholder="e.g. MBBS, University of Colombo"
                      id={`complete-profile-qualification-${index}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeQualificationField(index)}
                      disabled={qualifications.length === 1}
                      className="px-3 rounded-xl border border-hairline text-ink-soft hover:text-red-600 hover:border-red-200 cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      id={`complete-profile-remove-qualification-${index}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addQualificationField}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:underline cursor-pointer"
                id="complete-profile-add-qualification"
              >
                <Plus className="w-3.5 h-3.5" />
                Add another qualification
              </button>
            </div>

            <button
              type="submit"
              disabled={completeProfileMutation.isPending || isUploadingImage}
              className="w-full bg-forest hover:bg-forest/90 text-white font-sans font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-resting hover:shadow-elevated active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              id="complete-profile-submit"
            >
              {isUploadingImage ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading Photo...</span>
                </>
              ) : completeProfileMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <span>Complete Profile & Continue</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
