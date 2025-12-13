import React from 'react';

// --- High Fidelity IE 5/6 Icons (Vector approximations of the bitmaps) ---

const IEIcons = {
  // The Windows Flag throbber
  Throbber: () => (
    <svg width="22" height="22" viewBox="0 0 22 22">
       <rect x="0" y="0" width="22" height="22" fill="black" />
       <path d="M2 2h8v8H2z" fill="#E14900" /> {/* Red */}
       <path d="M12 2h8v8h-8z" fill="#67B626" /> {/* Green */}
       <path d="M2 12h8v8H2z" fill="#2D89D6" /> {/* Blue */}
       <path d="M12 12h8v8h-8z" fill="#FFC705" /> {/* Yellow */}
       {/* Highlight/Shadow for 3D effect */}
       <path d="M0 0h22v1H0z" fill="#808080" />
       <path d="M0 0h1v22H0z" fill="#808080" />
       <path d="M21 0h1v22h-1z" fill="white" />
       <path d="M0 21h22v1H0z" fill="white" />
    </svg>
  ),
  Back: () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <defs>
         <linearGradient id="greenBtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#85E785" />
            <stop offset="100%" stopColor="#259C25" />
         </linearGradient>
         <filter id="dropShadow" x="0" y="0" width="150%" height="150%">
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
         </filter>
      </defs>
      <circle cx="15" cy="15" r="13" fill="url(#greenBtn)" stroke="#186F18" strokeWidth="1" />
      <path d="M16 8 L8 15 L16 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#dropShadow)" />
      <path d="M22 15 L10 15" stroke="white" strokeWidth="3" strokeLinecap="round" filter="url(#dropShadow)" />
    </svg>
  ),
  Forward: () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" fill="url(#greenBtn)" stroke="#186F18" strokeWidth="1" />
      <path d="M14 8 L22 15 L14 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#dropShadow)" />
      <path d="M8 15 L20 15" stroke="white" strokeWidth="3" strokeLinecap="round" filter="url(#dropShadow)" />
    </svg>
  ),
  Stop: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <rect x="4" y="2" width="14" height="18" fill="white" stroke="#666" strokeWidth="1" />
       <path d="M13 2 L18 7 L18 20" fill="#eee" />
       <path d="M13 2 L13 7 L18 7" fill="#ccc" stroke="#999" strokeWidth="0.5" />
       {/* Red X circle */}
       <circle cx="11" cy="12" r="6" fill="#D32F2F" stroke="#900" />
       <path d="M8 9 L14 15 M14 9 L8 15" stroke="white" strokeWidth="2" />
    </svg>
  ),
  Refresh: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <rect x="3" y="2" width="16" height="19" fill="white" stroke="#666" strokeWidth="1" />
       <path d="M19 2 L19 21 L3 21" fill="none" stroke="#666" opacity="0.5" />
       <path d="M13 2 L19 8 L19 21" fill="#fff" fillOpacity="0" />
       <path d="M13 2 L13 8 L19 8" fill="#e0e0e0" stroke="#999" />
       
       <path d="M8 12 L11 9 L14 12" fill="none" stroke="#008000" strokeWidth="1.5" />
       <path d="M11 9 L11 15" fill="none" stroke="#008000" strokeWidth="1.5" />
       <path d="M14 13 L11 16 L8 13" fill="none" stroke="#008000" strokeWidth="1.5" />
    </svg>
  ),
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <path d="M12 2 L2 11 L4 11 L4 21 L9 21 L9 15 L15 15 L15 21 L20 21 L20 11 L22 11 Z" fill="#D4D0C8" stroke="#555" />
       <path d="M12 3 L3.5 10.5 L20.5 10.5 Z" fill="#E14900" />
       <rect x="5" y="11" width="14" height="9" fill="#F0F0E0" />
       <rect x="9" y="15" width="6" height="6" fill="#6699CC" stroke="#336699" />
       <rect x="9" y="15" width="6" height="1" fill="#AACCFF" />
    </svg>
  ),
  Search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       {/* Globe */}
       <circle cx="10" cy="10" r="7" fill="#4A90E2" stroke="#21578A" />
       <path d="M10 3 A7 7 0 0 1 10 17" fill="#75B6FF" />
       <path d="M3 10 Q10 14 17 10" fill="none" stroke="#21578A" strokeWidth="0.5" opacity="0.6"/>
       <path d="M6 5 Q10 9 14 5" fill="none" stroke="#21578A" strokeWidth="0.5" opacity="0.6"/>
       {/* Magnifying Glass */}
       <line x1="14" y1="14" x2="20" y2="20" stroke="black" strokeWidth="3" />
       <circle cx="13" cy="13" r="5" fill="#EEF" stroke="#333" strokeWidth="1.5" fillOpacity="0.6" />
    </svg>
  ),
  Favorites: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <path d="M2 5 L9 5 L11 7 L20 7 L20 19 L2 19 Z" fill="#F8D775" stroke="#B8860B" />
       <path d="M3 8 L19 8 L19 18 L3 18 Z" fill="#FFE082" />
       {/* Star */}
       <path d="M14 6 L15 9 L18 9 L15.5 11 L16.5 14 L14 12 L11.5 14 L12.5 11 L10 9 L13 9 Z" fill="#FFFF00" stroke="#B8860B" strokeWidth="0.5" />
    </svg>
  ),
  History: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <circle cx="12" cy="12" r="9" fill="#F0F0F0" stroke="#666" strokeWidth="1" />
       <circle cx="12" cy="12" r="7" fill="#FFF" stroke="#CCC" />
       <path d="M12 6 L12 12 L16 12" stroke="#000" strokeWidth="1.5" />
       <path d="M5 12 A7 7 0 0 0 12 19" fill="none" stroke="#008000" strokeWidth="2" markerEnd="url(#arrow)" />
       <defs>
         <marker id="arrow" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto">
           <path d="M0,0 L4,2 L0,4" fill="#008000" />
         </marker>
       </defs>
    </svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <rect x="2" y="5" width="20" height="14" fill="#F0F0F0" stroke="#666" />
       <path d="M2 5 L12 13 L22 5" fill="#E0E0E0" stroke="#666" />
       {/* Stamp */}
       <rect x="16" y="6" width="4" height="5" fill="#FF9999" stroke="#CC0000" strokeWidth="0.5" />
    </svg>
  ),
  Print: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <path d="M5 6 L19 6 L19 18 L5 18 Z" fill="#CCC" stroke="#666" />
       <rect x="7" y="3" width="10" height="4" fill="white" stroke="#666" />
       <rect x="7" y="14" width="10" height="6" fill="white" stroke="#666" />
       <rect x="8" y="16" width="8" height="1" fill="#999" />
       <rect x="8" y="18" width="8" height="1" fill="#999" />
    </svg>
  ),
  Edit: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <path d="M5 4 H19 V20 H5 Z" fill="white" stroke="#666" />
       <path d="M15 4 V8 H19" fill="#E0E0E0" stroke="#999" />
       <path d="M14 12 L18 8" stroke="#D32F2F" strokeWidth="2" />
       <path d="M13 13 L17 9" stroke="#D32F2F" strokeWidth="5" opacity="0.3" />
    </svg>
  ),
  Discuss: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <path d="M3 4 h16 v12 h-4 l-4 4 v-4 h-8 z" fill="#FFFFE0" stroke="#000" />
       <line x1="5" y1="7" x2="17" y2="7" stroke="#666" />
       <line x1="5" y1="10" x2="15" y2="10" stroke="#666" />
       <line x1="5" y1="13" x2="12" y2="13" stroke="#666" />
    </svg>
  ),
  Messenger: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M5 5 H19 V19 H5 Z" fill="#87CEEB" stroke="#000080" />
        <path d="M8 8 A4 4 0 0 1 16 8" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="9" cy="8" r="1" fill="white" />
        <circle cx="15" cy="8" r="1" fill="white" />
    </svg>
  ),
  IE: () => (
    <svg width="14" height="14" viewBox="0 0 100 100">
       <path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z" fill="#2D89D6" />
       <path d="M15 65 L85 35" stroke="#FFFFFF" strokeWidth="8" strokeOpacity="0.8" transform="rotate(-15 50 50)" />
       <text x="50" y="80" fontSize="70" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="serif">e</text>
    </svg>
  ),
  PageIcon: () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <rect x="2" y="1" width="10" height="12" fill="white" stroke="#666" strokeWidth="0.5" />
        <path d="M7 4 L9 6 M6 8 h2" stroke="#666" />
        <rect x="8" y="1" width="4" height="4" fill="#eee" />
        <text x="7" y="11" fontSize="9" fill="#2D89D6" textAnchor="middle" fontWeight="bold">e</text>
    </svg>
  ),
  Dropdown: () => (
    <svg width="12" height="6" viewBox="0 0 12 6">
        <path d="M0 0 L12 0 L6 6 Z" fill="black" />
    </svg>
  )
};

// --- Sub-components for IE UI ---

const ToolbarHandle = () => (
    <div className="flex flex-row items-center h-full px-[2px] cursor-ew-resize mr-[2px] border-l border-white">
        <div className="w-[3px] h-[calc(100%-4px)] border-t border-l border-white border-b border-r border-[#808080] bg-[#d4d0c8]"></div>
    </div>
);

const ToolbarSeparator = () => (
    <div className="h-[24px] w-[2px] border-l border-[#808080] border-r border-white mx-1 my-auto"></div>
);

const ToolbarButton: React.FC<{ 
    icon: keyof typeof IEIcons, 
    label: string, 
    disabled?: boolean, 
    active?: boolean,
    onClick?: () => void
}> = ({ icon, label, disabled, active, onClick }) => {
    const Icon = IEIcons[icon];
    return (
        <div 
            onClick={!disabled ? onClick : undefined}
            className={`
                flex flex-row items-center justify-center px-1 h-[36px] min-w-[36px] 
                cursor-default group gap-1
                ${disabled ? 'opacity-50 grayscale' : 'hover:border-[#fff] hover:border-l-[#fff] hover:border-t-[#fff] hover:border-r-[#808080] hover:border-b-[#808080] active:border-[#808080] active:border-l-[#808080] active:border-t-[#808080] active:border-r-[#fff] active:border-b-[#fff] active:translate-y-[1px]'}
                ${!disabled && !active ? 'border border-transparent' : ''}
            `}
        >
            <div className={`flex flex-col items-center ${disabled ? '' : 'group-active:translate-x-[1px] group-active:translate-y-[1px]'}`}>
                <Icon />
                <span className="text-[10px] text-black leading-none mt-[2px]">{label}</span>
            </div>
            {/* Optional drop arrow for some buttons like mail/print if we wanted full fidelity */}
            {['Mail', 'Print'].includes(label) && (
                 <div className="text-[8px] ml-[-2px]">▼</div>
            )}
        </div>
    );
};

const MenuString = ({ label, underlineIndex = 0 }: { label: string, underlineIndex?: number }) => (
    <div className="px-2 py-[2px] hover:bg-[#000080] hover:text-white cursor-default select-none flex h-full items-center">
        <span>
            {label.split('').map((char, i) => (
                <span key={i} className={i === underlineIndex ? 'underline' : ''}>{char}</span>
            ))}
        </span>
    </div>
);

// --- Main IEFrame Component ---

export const IEFrame: React.FC<{ 
    url: string, 
    children: React.ReactNode,
    onGoHome?: () => void 
}> = ({ url, children, onGoHome }) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-[#d4d0c8] font-sans overflow-hidden select-none">
      
      {/* 1. Title Bar */}
      <div className="h-[22px] flex justify-between items-center px-[2px] bg-gradient-to-r from-[#000080] to-[#1084d0] border-b border-[#d4d0c8] shrink-0">
         <div className="flex items-center gap-1 text-white font-bold text-[12px] tracking-wide pl-1">
             <IEIcons.IE />
             <span className="drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">Microsoft Internet Explorer</span>
         </div>
         <div className="flex gap-[2px]">
            <button className="w-[16px] h-[14px] bg-[#d4d0c8] border border-white border-b-[#404040] border-r-[#404040] flex items-center justify-center active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white p-0">
                <span className="text-[8px] font-bold mb-[2px]">_</span>
            </button>
            <button className="w-[16px] h-[14px] bg-[#d4d0c8] border border-white border-b-[#404040] border-r-[#404040] flex items-center justify-center active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white p-0">
                <div className="w-[9px] h-[8px] border-t-2 border-l border-r border-b border-black"></div>
            </button>
            <button className="w-[16px] h-[14px] bg-[#d4d0c8] border border-white border-b-[#404040] border-r-[#404040] flex items-center justify-center active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white p-0">
                <span className="text-[10px] font-bold leading-none ml-[1px]">×</span>
            </button>
         </div>
      </div>

      {/* 2. Menu Bar */}
      <div className="h-[22px] bg-[#d4d0c8] border-b border-white flex items-center px-1 text-[11px] text-black shrink-0 shadow-[0_-1px_0_#808080_inset]">
         <ToolbarHandle />
         <MenuString label="File" />
         <MenuString label="Edit" />
         <MenuString label="View" />
         <MenuString label="Favorites" underlineIndex={1} />
         <MenuString label="Tools" />
         <MenuString label="Help" />
         
         <div className="ml-auto mr-1 mt-[2px]">
            <IEIcons.Throbber />
         </div>
      </div>

      {/* 3. Standard Buttons Toolbar */}
      <div className="bg-[#d4d0c8] border-b border-[#808080] shadow-[0_1px_0_#fff] flex items-center p-[2px] shrink-0 h-[42px]">
         <ToolbarHandle />
         <ToolbarButton icon="Back" label="Back" onClick={() => window.history.back()} />
         <ToolbarButton icon="Forward" label="Forward" disabled />
         <ToolbarButton icon="Stop" label="Stop" />
         <ToolbarButton icon="Refresh" label="Refresh" onClick={() => window.location.reload()} />
         <ToolbarButton icon="Home" label="Home" onClick={onGoHome} />
         
         <ToolbarSeparator />
         
         <ToolbarButton icon="Search" label="Search" />
         <ToolbarButton icon="Favorites" label="Favorites" />
         <ToolbarButton icon="History" label="History" />
         
         <ToolbarSeparator />
         
         <ToolbarButton icon="Mail" label="Mail" />
         <ToolbarButton icon="Print" label="Print" />
         {/* Edit is often optional or context dependent, let's include for completeness */}
         {/* <ToolbarButton icon="Edit" label="Edit" /> */}
         {/* <ToolbarButton icon="Discuss" label="Discuss" /> */}
      </div>

      {/* 4. Address Bar */}
      <div className="bg-[#d4d0c8] border-b border-[#808080] shadow-[0_1px_0_#fff] flex items-center p-[3px] gap-2 shrink-0 h-[26px]">
         <ToolbarHandle />
         <span className="text-[11px] text-[#444] px-1">Address</span>
         <div className="flex-1 h-[20px] bg-white border border-[#7f9db9] shadow-[inset_1px_1px_1px_#ccc] flex items-center relative">
             <div className="flex items-center justify-center w-[18px] h-[16px] border-r border-[#ccc] bg-[#f7f7f7] mr-1 select-none">
                <IEIcons.PageIcon />
             </div>
             <div className="flex-1 text-[12px] text-black font-sans leading-none overflow-hidden whitespace-nowrap pt-[2px]">
                {url}
             </div>
             <div className="w-[16px] h-full bg-[#f0f0f0] border-l border-[#ccc] flex items-center justify-center hover:bg-[#e0e0e0]">
                <IEIcons.Dropdown />
             </div>
         </div>
         <div className="flex items-center gap-1">
             <button className="h-[20px] px-2 flex items-center gap-1 bg-[#d4d0c8] border border-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white">
                <div className="w-3 h-3 bg-[#008000] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 10 10" width="8" height="8"><path d="M2 5 L5 8 L8 2" fill="none" stroke="white" strokeWidth="1.5"/></svg>
                </div>
                <span className="text-[11px]">Go</span>
             </button>
             <span className="text-[11px] text-[#444]">Links &gt;&gt;</span>
         </div>
      </div>

      {/* 5. Main Content Area (Viewport) */}
      <div className="flex-1 relative overflow-auto bg-[#808080] border-t-2 border-l-2 border-[#404040] border-b border-r border-white scrollbar-classic">
          <div className="w-full min-h-full bg-white relative isolate">
             {children}
          </div>
      </div>

      {/* 6. Status Bar */}
      <div className="h-[20px] bg-[#d4d0c8] border-t border-[#808080] shadow-[inset_0_1px_0_#fff] flex items-center px-[2px] gap-[2px] shrink-0 text-[11px]">
          <div className="w-[20px] h-full flex items-center justify-center opacity-50">
             <IEIcons.PageIcon />
          </div>
          <div className="flex-1 border border-[#808080] border-b-white border-r-white h-[16px] px-1 flex items-center shadow-[inset_1px_1px_0_#e0e0e0] overflow-hidden whitespace-nowrap">
             Done
          </div>
          <div className="w-[100px] border border-[#808080] border-b-white border-r-white h-[16px] px-1 flex items-center shadow-[inset_1px_1px_0_#e0e0e0] relative">
             <div className="h-[8px] w-full bg-[#ccc] border border-[#808080]"></div>
          </div>
          <div className="w-[120px] border border-[#808080] border-b-white border-r-white h-[16px] px-1 flex items-center gap-1 shadow-[inset_1px_1px_0_#e0e0e0]">
             <IEIcons.IE />
             <span>Internet</span>
          </div>
      </div>
      
      {/* Global Styles for simulated scrollbar inside the content div */}
      <style>{`
        .scrollbar-classic::-webkit-scrollbar {
            width: 16px;
            height: 16px;
        }
        .scrollbar-classic::-webkit-scrollbar-track {
            background: #e0e0e0;
            background-image: linear-gradient(to right, #e0e0e0 0%, #e0e0e0 100%);
        }
        .scrollbar-classic::-webkit-scrollbar-thumb {
            background-color: #d4d0c8;
            border-top: 1px solid #fff;
            border-left: 1px solid #fff;
            border-right: 1px solid #404040;
            border-bottom: 1px solid #404040;
            box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #dfdfdf;
        }
        .scrollbar-classic::-webkit-scrollbar-button {
            background-color: #d4d0c8;
            width: 16px;
            height: 16px;
            border-top: 1px solid #fff;
            border-left: 1px solid #fff;
            border-right: 1px solid #404040;
            border-bottom: 1px solid #404040;
            box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #dfdfdf;
            display: block;
        }
        /* Arrows for scrollbar buttons - approximations via background image usually, but simple colors here */
        .scrollbar-classic::-webkit-scrollbar-button:vertical:decrement {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 5 L4 10 L12 10 Z' fill='black'/%3E%3C/svg%3E");
        }
        .scrollbar-classic::-webkit-scrollbar-button:vertical:increment {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 11 L4 6 L12 6 Z' fill='black'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};