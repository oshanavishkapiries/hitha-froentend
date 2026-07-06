"use client";

import React, { useState, useEffect } from 'react';
import { IconX, IconSearch, IconChevronDown } from '@tabler/icons-react';
import { FilterParams, Specialization } from '../types';
import { navigateTo, updateUrlQueryParams } from '../utils/navigation';

interface DoctorSearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters?: FilterParams;
  onApplyFilters?: (updates: Partial<FilterParams>) => void;
}

export default function DoctorSearchPopup({ 
  isOpen, 
  onClose, 
  initialFilters, 
  onApplyFilters 
}: DoctorSearchPopupProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [gender, setGender] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [date, setDate] = useState('');

  // Sync initial filters when opened
  useEffect(() => {
    if (initialFilters) {
      setName(initialFilters.name || '');
      setCategory(initialFilters.category || '');
      setLanguage(initialFilters.language || '');
      setGender(initialFilters.gender || '');
      setMinPrice(initialFilters.minPrice);
      setMaxPrice(initialFilters.maxPrice);
      setDate(initialFilters.date || '');
    }
  }, [initialFilters, isOpen]);

  if (!isOpen) return null;

  const specializations: Specialization[] = [
    'Counselor',
    'Clinical Counselor',
    'Psychologist',
    'Clinical Psychologist',
    'Medical Officer (Psychiatry Diploma)',
    'Consultant Psychiatrist',
  ];

  const languages = ['Sinhala', 'Tamil', 'English'];
  const genders = ['Male', 'Female'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updates: Partial<FilterParams> = {
      name,
      category,
      language,
      gender,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      date,
      page: 1,
    };

    if (onApplyFilters) {
      onApplyFilters(updates);
    } else {
      // Build query params and navigate to the search directory
      const params = new URLSearchParams();
      if (name) params.set('name', name);
      if (category) params.set('category', category);
      if (language) params.set('language', language);
      if (gender) params.set('gender', gender);
      if (minPrice) params.set('minPrice', minPrice.toString());
      if (maxPrice) params.set('maxPrice', maxPrice.toString());
      if (date) params.set('date', date);
      navigateTo(`/search?${params.toString()}`);
    }
    onClose();
  };

  const handleClear = () => {
    setName('');
    setCategory('');
    setLanguage('');
    setGender('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setDate('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/40 backdrop-blur-xs animate-fade-in" id="doctor-search-popup-overlay">
      <div className="bg-white rounded-3xl w-full max-w-lg border border-hairline shadow-elevated overflow-hidden" id="doctor-search-popup-card">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-forest to-forest-light text-white px-6 py-5 flex items-center justify-between border-b border-hairline">
          <div className="flex items-center space-x-2">
            <IconSearch className="w-5 h-5 text-mint" />
            <h3 className="font-display font-bold text-base tracking-tight">Refine Clinician Search</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-forest-light/50 p-1.5 rounded-full transition-all cursor-pointer focus:outline-none"
            id="search-popup-close-btn"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" id="doctor-search-popup-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name Input */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-[10px] font-sans font-bold text-forest uppercase tracking-wider mb-1">Doctor Name</label>
              <div className="relative">
                <IconSearch className="w-4 h-4 text-ink-soft absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Dr. Alwis"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#EBE8DF] text-xs text-[#0B1E17] font-semibold rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-forest focus:bg-white transition-all shadow-inner"
                  id="search-popup-name-input"
                />
              </div>
            </div>

            {/* Category / Specialization Selector */}
            <div>
              <label className="block text-[10px] font-sans font-bold text-forest uppercase tracking-wider mb-1">Specialization</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#EBE8DF] text-xs text-[#0B1E17] font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-forest focus:bg-white transition-all cursor-pointer appearance-none"
                  id="search-popup-category-select"
                >
                  <option value="">All Specialities</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                <IconChevronDown className="w-4 h-4 text-ink-soft absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-[10px] font-sans font-bold text-forest uppercase tracking-wider mb-1">Language</label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#EBE8DF] text-xs text-[#0B1E17] font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-forest focus:bg-white transition-all cursor-pointer appearance-none"
                  id="search-popup-language-select"
                >
                  <option value="">Any Language</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <IconChevronDown className="w-4 h-4 text-ink-soft absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Gender Selector */}
            <div>
              <label className="block text-[10px] font-sans font-bold text-forest uppercase tracking-wider mb-1">Gender</label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#EBE8DF] text-xs text-[#0B1E17] font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-forest focus:bg-white transition-all cursor-pointer appearance-none"
                  id="search-popup-gender-select"
                >
                  <option value="">Any Gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <IconChevronDown className="w-4 h-4 text-ink-soft absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Session Date */}
            <div>
              <label className="block text-[10px] font-sans font-bold text-forest uppercase tracking-wider mb-1">Consultation Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#EBE8DF] text-xs text-[#0B1E17] font-semibold rounded-xl px-3.5 py-2 outline-none focus:border-forest focus:bg-white transition-all shadow-inner"
                id="search-popup-date-input"
              />
            </div>

            {/* Price Ranges */}
            <div>
              <label className="block text-[10px] font-sans font-bold text-forest uppercase tracking-wider mb-1">Min Price (LKR)</label>
              <input
                type="number"
                placeholder="0"
                value={minPrice || ''}
                onChange={(e) => setMinPrice(Number(e.target.value) || undefined)}
                className="w-full bg-[#FAF9F5] border border-[#EBE8DF] text-xs text-[#0B1E17] font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-forest focus:bg-white transition-all shadow-inner"
                id="search-popup-minprice"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-bold text-forest uppercase tracking-wider mb-1">Max Price (LKR)</label>
              <input
                type="number"
                placeholder="10,000"
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(Number(e.target.value) || undefined)}
                className="w-full bg-[#FAF9F5] border border-[#EBE8DF] text-xs text-[#0B1E17] font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-forest focus:bg-white transition-all shadow-inner"
                id="search-popup-maxprice"
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center space-x-3 pt-4 border-t border-hairline">
            <button
              type="button"
              onClick={handleClear}
              className="text-ink-soft hover:text-forest text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer focus:outline-none hover:bg-[#FAF9F5]"
              id="search-popup-clear-btn"
            >
              Reset Filters
            </button>
            <button
              type="submit"
              className="bg-forest hover:bg-forest-light text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-resting flex items-center space-x-1.5 cursor-pointer focus:outline-none"
              id="search-popup-submit-btn"
            >
              <IconSearch className="w-4 h-4 text-mint" />
              <span>{onApplyFilters ? 'Apply Filters' : 'Search Directory'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
