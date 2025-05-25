import React from 'react';

interface GroupDropdownProps {
    onSelect?: (group: string) => void;
}

const GroupDropdown: React.FC<GroupDropdownProps> = ({ onSelect }) => {
    return (
        <details className="dropdown">
            <summary className="btn btn-sm btn-secondary border-none text-primary rounded rounded-b-xl flex items-center gap-2">
                Group
                {/* Chevron Down Icon (Heroicons outline) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <ul className="menu dropdown-content text-white rounded-box z-10 w-40 p-2 ">
                <li><a onClick={() => onSelect?.('Friends')}>Friends</a></li>
                <li><a onClick={() => onSelect?.('Family')}>Family</a></li>
                <li><a onClick={() => onSelect?.('Work')}>Work</a></li>
            </ul>
        </details>
    );
};

export default GroupDropdown; 