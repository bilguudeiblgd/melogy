import React, { useState } from 'react';

interface GroupDropdownProps {
    groups: string[];
    onSelect?: (group: string) => void;
    onAddGroup?: (group: string) => void;
}

const GroupDropdown: React.FC<GroupDropdownProps> = ({ groups, onSelect, onAddGroup }) => {
    const [adding, setAdding] = useState(false);
    const [newGroup, setNewGroup] = useState("");

    const handleAdd = () => {
        if (newGroup.trim()) {
            onAddGroup?.(newGroup.trim());
            setNewGroup("");
            setAdding(false);
        }
    };

    return (
        <details className="dropdown">
            <summary className="btn btn-sm btn-secondary border-none text-primary rounded rounded-b-xl flex items-center gap-2">
                Group
                {/* Chevron Down Icon (Heroicons outline) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <ul className="menu dropdown-content text-white rounded-box z-10 w-48 p-2 bg-secondary">
                {groups.map((group) => (
                    <li key={group}><a onClick={() => onSelect?.(group)}>{group}</a></li>
                ))}
                <li>
                    {adding ? (
                        <div className="flex flex-row gap-1 items-center">
                            <input
                                className="input input-sm input-bordered w-24 text-black"
                                value={newGroup}
                                onChange={e => setNewGroup(e.target.value)}
                                placeholder="New group"
                                onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
                            />
                            <button className="btn btn-xs btn-primary" onClick={handleAdd}>Add</button>
                            <button className="btn btn-xs btn-ghost" onClick={() => setAdding(false)}>✕</button>
                        </div>
                    ) : (
                        <a onClick={() => setAdding(true)} className="text-accent">+ Add group</a>
                    )}
                </li>
            </ul>
        </details>
    );
};

export default GroupDropdown; 