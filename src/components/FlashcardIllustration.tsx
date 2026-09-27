import React from 'react';

interface FlashcardIllustrationProps {
  iconKey: string;
  word?: string;
  className?: string;
}

export const FlashcardIllustration: React.FC<FlashcardIllustrationProps> = ({
  iconKey,
  word = '',
  className = 'w-14 h-14',
}) => {
  const key = (iconKey || '').toLowerCase().trim();
  const wordLower = word.toLowerCase();

  const resolvedKey = (() => {
    if (key.includes('water') || wordLower.includes('paani') || wordLower.includes('daag')) return 'water';
    if (key.includes('river') || wordLower.includes('nadi') || wordLower.includes('gada')) return 'river';
    if (key.includes('tree') || wordLower.includes('ped') || wordLower.includes('dare') || wordLower.includes('daru')) return 'tree';
    if (key.includes('sun') || wordLower.includes('aaj') || wordLower.includes('suraj') || wordLower.includes('tehenj')) return 'sun';
    if (key.includes('book') || wordLower.includes('padh') || wordLower.includes('kitaab') || wordLower.includes('parhao')) return 'book';
    if (key.includes('bird') || wordLower.includes('chidiya') || wordLower.includes('chene')) return 'bird';
    if (key.includes('hand') || wordLower.includes('haath') || wordLower.includes('ti')) return 'hand';
    if (key.includes('house') || wordLower.includes('ghar') || wordLower.includes('orak')) return 'house';
    if (key.includes('number') || wordLower.includes('ginti')) return 'number';
    if (key.includes('food') || wordLower.includes('khana') || wordLower.includes('daka')) return 'food';
    if (key.includes('flower') || wordLower.includes('baarish') || wordLower.includes('baha')) return 'flower';
    return key || 'star';
  })();

  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/15 text-[#9C4A3C] shrink-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Subtle Sohrai folk corner motif */}
      <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {resolvedKey === 'water' && (
          <>
            <path d="M24 6C24 6 11 21 11 30C11 37.1797 16.8203 43 24 43C31.1797 43 37 37.1797 37 30C37 21 24 6 24 6Z" fill="#355E3B" fillOpacity="0.12" stroke="#355E3B" />
            <path d="M17 31C18.5 34 21.5 35.5 25 35" stroke="#355E3B" />
            <path d="M8 44H40" stroke="#9C4A3C" strokeDasharray="2 3" />
          </>
        )}
        {resolvedKey === 'river' && (
          <>
            <path d="M6 16C12 12 18 20 24 16C30 12 36 20 42 16" stroke="#355E3B" />
            <path d="M6 25C12 21 18 29 24 25C30 21 36 29 42 25" stroke="#9C4A3C" />
            <path d="M6 34C12 30 18 38 24 34C30 30 36 38 42 34" stroke="#355E3B" />
            <circle cx="35" cy="9" r="3" fill="#E0A458" stroke="#9C4A3C" />
          </>
        )}
        {resolvedKey === 'tree' && (
          <>
            <path d="M24 8C16 8 11 14 11 21C11 26.5 15 31 21 32V42H27V32C33 31 37 26.5 37 21C37 14 32 8 24 8Z" fill="#355E3B" fillOpacity="0.15" stroke="#355E3B" />
            <path d="M24 16V32" stroke="#2A1A15" />
            <path d="M24 23L19 19" stroke="#2A1A15" />
            <path d="M24 25L29 20" stroke="#2A1A15" />
            <path d="M14 42H34" stroke="#9C4A3C" />
          </>
        )}
        {resolvedKey === 'sun' && (
          <>
            <circle cx="24" cy="24" r="9" fill="#E0A458" fillOpacity="0.28" stroke="#9C4A3C" />
            <path d="M24 7V11M24 37V41M7 24H11M37 24H41M12 12L15 15M33 33L36 36M36 12L33 15M15 33L12 36" stroke="#9C4A3C" />
          </>
        )}
        {resolvedKey === 'book' && (
          <>
            <path d="M8 12C13 10 19 10 24 13C29 10 35 10 40 12V36C35 34 29 34 24 37C19 34 13 34 8 36V12Z" fill="#E0A458" fillOpacity="0.18" stroke="#9C4A3C" />
            <path d="M24 13V37" stroke="#2A1A15" />
            <path d="M13 19H19M13 25H19M29 19H35M29 25H35" stroke="#355E3B" />
          </>
        )}
        {resolvedKey === 'bird' && (
          <>
            <path d="M10 28C13 18 22 14 31 17C35 18 38 15 40 13C39 20 36 25 31 28C25 32 16 32 10 28Z" fill="#E0A458" fillOpacity="0.22" stroke="#9C4A3C" />
            <circle cx="31" cy="20" r="1.5" fill="#2A1A15" />
            <path d="M22 31L19 39M27 30L26 39" stroke="#2A1A15" />
            <path d="M38 17L43 18" stroke="#9C4A3C" />
          </>
        )}
        {resolvedKey === 'hand' && (
          <>
            <path d="M16 25V13C16 11.5 17.2 10.5 18.5 10.5C19.8 10.5 21 11.5 21 13V21" stroke="#9C4A3C" />
            <path d="M21 20V10C21 8.5 22.2 7.5 23.5 7.5C24.8 7.5 26 8.5 26 10V20" stroke="#9C4A3C" />
            <path d="M26 20V12C26 10.5 27.2 9.5 28.5 9.5C29.8 9.5 31 10.5 31 12V24" stroke="#9C4A3C" />
            <path d="M16 24L13 21C11.8 20 10 21 10.5 22.8L15 34C16.5 38 20 40 24.5 40C30 40 34 36 34 29V18" fill="#E0A458" fillOpacity="0.18" stroke="#9C4A3C" />
          </>
        )}
        {resolvedKey === 'house' && (
          <>
            <path d="M8 23L24 10L40 23" stroke="#9C4A3C" />
            <path d="M13 20V38H35V20" fill="#E0A458" fillOpacity="0.16" stroke="#2A1A15" />
            <rect x="21" y="27" width="6" height="11" stroke="#355E3B" />
            <path d="M17 17L24 11L31 17" stroke="#355E3B" strokeDasharray="2 2" />
          </>
        )}
        {resolvedKey === 'number' && (
          <>
            <circle cx="15" cy="16" r="5" fill="#355E3B" fillOpacity="0.15" stroke="#355E3B" />
            <circle cx="33" cy="16" r="5" fill="#E0A458" fillOpacity="0.25" stroke="#9C4A3C" />
            <circle cx="24" cy="32" r="5" fill="#9C4A3C" fillOpacity="0.15" stroke="#2A1A15" />
            <path d="M19 19L22 27M29 19L26 27" stroke="#2A1A15" strokeDasharray="2 2" />
          </>
        )}
        {resolvedKey === 'food' && (
          <>
            <path d="M10 24H38C38 32 32 38 24 38C16 38 10 32 10 24Z" fill="#E0A458" fillOpacity="0.22" stroke="#9C4A3C" />
            <path d="M18 18C18 15 20 13 20 10M24 18C24 15 26 13 26 10M30 18C30 15 32 13 32 10" stroke="#355E3B" />
          </>
        )}
        {resolvedKey === 'flower' && (
          <>
            <path d="M14 22C14 17 18 13 24 13C30 13 34 17 34 22H14Z" fill="#355E3B" fillOpacity="0.15" stroke="#355E3B" />
            <path d="M16 28L13 36M24 28L21 38M32 28L29 36" stroke="#9C4A3C" />
          </>
        )}
        {!['water', 'river', 'tree', 'sun', 'book', 'bird', 'hand', 'house', 'number', 'food', 'flower'].includes(
          resolvedKey
        ) && (
          <>
            <polygon
              points="24,8 28,18 39,19 31,26 33,37 24,31 15,37 17,26 9,19 20,18"
              fill="#E0A458"
              fillOpacity="0.22"
              stroke="#9C4A3C"
            />
          </>
        )}
      </svg>
    </div>
  );
};
