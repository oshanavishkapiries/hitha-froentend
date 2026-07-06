import { useState, useMemo, useEffect, useRef } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HithaDatePickerProps {
  selectedDate: string; // "YYYY-MM-DD"
  onDateChange: (date: string) => void;
  onClose: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const YEARS = Array.from({ length: 15 }, (_, i) => 2023 + i); // 2023 to 2037

export default function HithaDatePicker({ selectedDate, onDateChange, onClose }: HithaDatePickerProps) {
  // Parse initial date
  const initialDate = useMemo(() => {
    if (selectedDate) {
      const d = new Date(selectedDate);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  }, [selectedDate]);

  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState<number | null>(
    selectedDate ? initialDate.getDate() : null
  );

  const monthsRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);

  // Auto scroll active month and year into view
  useEffect(() => {
    setTimeout(() => {
      if (monthsRef.current) {
        const activeMonthEl = monthsRef.current.querySelector('[data-active="true"]');
        if (activeMonthEl) {
          activeMonthEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
      if (yearsRef.current) {
        const activeYearEl = yearsRef.current.querySelector('[data-active="true"]');
        if (activeYearEl) {
          activeYearEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }, 100);
  }, []);

  // Calculate days in the current selected month/year
  const { daysArray, emptyPrefixCount } = useMemo(() => {
    const firstDayInstance = new Date(currentYear, currentMonth, 1);
    const startDayOfWeek = firstDayInstance.getDay(); // 0 is Sunday, 1 is Monday...
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const arr: (number | null)[] = [];
    // Prefix empty slots
    for (let i = 0; i < startDayOfWeek; i++) {
      arr.push(null);
    }
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      arr.push(day);
    }

    return {
      daysArray: arr,
      emptyPrefixCount: startDayOfWeek
    };
  }, [currentYear, currentMonth]);

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    const monthString = String(currentMonth + 1).padStart(2, '0');
    const dayString = String(day).padStart(2, '0');
    const dateFormatted = `${currentYear}-${monthString}-${dayString}`;
    onDateChange(dateFormatted);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      id="hitha-premium-datepicker-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, delay: 0.05 }}
        className="bg-[#0C1E18] border border-[#234438] rounded-[24px] shadow-2xl p-4 sm:p-6 flex flex-col w-full max-w-[650px] relative"
        id="hitha-premium-datepicker"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header block with close */}
        <div className="flex justify-between items-center pb-3 border-b border-[#234438] mb-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-mint" />
            <span className="text-xs font-sans font-bold text-sprout uppercase tracking-wider">
              Premium Telehealth Scheduler
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#152B22] text-sprout/60 hover:text-white transition-all cursor-pointer focus:outline-none"
            id="close-datepicker-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Multi-Column Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          {/* Column 1: Calendar Day Grid (7 cols out of 12) */}
          <div className="sm:col-span-7 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-[#234438] pb-4 sm:pb-0 sm:pr-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <h4 className="text-sm font-display font-bold text-white">
                {MONTHS[currentMonth]} {currentYear}
              </h4>
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 rounded-full hover:bg-[#152B22] text-sprout/80 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded-full hover:bg-[#152B22] text-sprout/80 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 text-center text-[10px] font-sans font-semibold text-sprout/40 mb-2">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Day Cells */}
            <div className="grid grid-cols-7 gap-1 text-center flex-grow">
              {daysArray.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} />;
                }

                const isSelected =
                  selectedDay === day &&
                  initialDate.getMonth() === currentMonth &&
                  initialDate.getFullYear() === currentYear;

                return (
                  <button
                    key={`day-${day}`}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className={`w-full h-8 sm:h-9 rounded-[8px] text-xs font-sans font-medium flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-mint text-[#0C1E18] font-bold shadow-md'
                        : 'text-white hover:bg-[#152B22]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Scrollable Month Selection (3 cols out of 12) */}
          <div className="hidden sm:flex sm:col-span-3 flex-col border-r border-[#234438] pr-3 h-[250px]">
            <span className="text-[10px] font-sans font-bold text-sprout/40 uppercase tracking-wider mb-2 block">
              Select Month
            </span>
            <div
              ref={monthsRef}
              className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin"
            >
              {MONTHS.map((m, idx) => {
                const isSelected = currentMonth === idx;
                return (
                  <button
                    key={m}
                    type="button"
                    data-active={isSelected ? 'true' : 'false'}
                    onClick={() => {
                      setCurrentMonth(idx);
                      setSelectedDay(null);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-[8px] text-[11px] font-sans font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-mint/20 border border-mint/30 text-mint font-semibold'
                        : 'text-sprout/70 hover:bg-[#152B22] hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 3: Scrollable Year Selection (2 cols out of 12) */}
          <div className="hidden sm:flex sm:col-span-2 flex-col h-[250px]">
            <span className="text-[10px] font-sans font-bold text-sprout/40 uppercase tracking-wider mb-2 block">
              Select Year
            </span>
            <div
              ref={yearsRef}
              className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin"
            >
              {YEARS.map((y) => {
                const isSelected = currentYear === y;
                return (
                  <button
                    key={y}
                    type="button"
                    data-active={isSelected ? 'true' : 'false'}
                    onClick={() => {
                      setCurrentYear(y);
                      setSelectedDay(null);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-[8px] text-[11px] font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E4B3A] border border-[#6B8F71] text-white font-semibold'
                        : 'text-sprout/70 hover:bg-[#152B22] hover:text-white'
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Month/Year Selectors (visible only on narrow mobile screens) */}
        <div className="flex sm:hidden gap-2 pt-3 border-t border-[#234438] mt-3">
          <select
            value={currentMonth}
            onChange={(e) => {
              setCurrentMonth(Number(e.target.value));
              setSelectedDay(null);
            }}
            className="flex-1 bg-[#152B22] border border-[#234438] text-white text-xs rounded-[10px] p-2 outline-none"
          >
            {MONTHS.map((m, idx) => (
              <option key={m} value={idx}>{m}</option>
            ))}
          </select>

          <select
            value={currentYear}
            onChange={(e) => {
              setCurrentYear(Number(e.target.value));
              setSelectedDay(null);
            }}
            className="flex-1 bg-[#152B22] border border-[#234438] text-white text-xs rounded-[10px] p-2 outline-none"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Confirmation text helper */}
        <div className="text-center pt-3 border-t border-[#234438] mt-3">
          <p className="text-[10px] text-sprout/40">
            Selecting a day automatically registers and applies the scheduled consult date.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
