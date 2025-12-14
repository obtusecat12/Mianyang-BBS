import React, { useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

// --- authentic Assets ---
const ASSETS = {
    LOGO: "https://win98icons.alexmeub.com/icons/png/msie1-2.png",
    SEARCH: "https://win98icons.alexmeub.com/icons/png/search_web-0.png",
    WINDOWS: "https://win98icons.alexmeub.com/icons/png/windows-0.png",
    STOP: "https://win98icons.alexmeub.com/icons/png/msg_error-0.png",
    NET: "https://win98icons.alexmeub.com/icons/png/html-5.png"
};

// --- Vector Icons (Preserved) ---
const VectorIcons = {
  Back: ({ disabled }: { disabled?: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 30 30" fill="none" style={{ filter: disabled ? 'grayscale(100%) opacity(0.5)' : 'none' }}>
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
  Forward: ({ disabled }: { disabled?: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 30 30" fill="none" style={{ filter: disabled ? 'grayscale(100%) opacity(0.5)' : 'none' }}>
      <circle cx="15" cy="15" r="13" fill="url(#greenBtn)" stroke="#186F18" strokeWidth="1" />
      <path d="M14 8 L22 15 L14 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#dropShadow)" />
      <path d="M8 15 L20 15" stroke="white" strokeWidth="3" strokeLinecap="round" filter="url(#dropShadow)" />
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
  Favorites: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <path d="M2 5 L9 5 L11 7 L20 7 L20 19 L2 19 Z" fill="#F8D775" stroke="#B8860B" />
       <path d="M3 8 L19 8 L19 18 L3 18 Z" fill="#FFE082" />
       <path d="M14 6 L15 9 L18 9 L15.5 11 L16.5 14 L14 12 L11.5 14 L12.5 11 L10 9 L13 9 Z" fill="#FFFF00" stroke="#B8860B" strokeWidth="0.5" />
    </svg>
  ),
  History: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <circle cx="12" cy="12" r="9" fill="#F0F0F0" stroke="#666" strokeWidth="1" />
       <circle cx="12" cy="12" r="7" fill="#FFF" stroke="#CCC" />
       <path d="M12 6 L12 12 L16 12" stroke="#000" strokeWidth="1.5" />
       <path d="M5 12 A7 7 0 0 0 12 19" fill="none" stroke="#008000" strokeWidth="2" />
       <path d="M5 12 L2 10 L5 8" fill="#008000" />
    </svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
       <rect x="2" y="5" width="20" height="14" fill="#F0F0F0" stroke="#666" />
       <path d="M2 5 L12 13 L22 5" fill="#E0E0E0" stroke="#666" />
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
};

// --- Helper Components ---

const ToolbarHandle = () => (
    <div className="flex flex-row items-center h-full px-[2px] cursor-ew-resize mr-[2px] border-l border-white">
        <div className="w-[3px] h-[calc(100%-4px)] border-t border-l border-white border-b border-r border-[#808080] bg-[#d4d0c8]"></div>
    </div>
);

const ToolbarSeparator = () => (
    <div className="h-[24px] w-[2px] border-l border-[#808080] border-r border-white mx-1 my-auto"></div>
);

const ToolbarButton: React.FC<{ 
    icon: React.ReactNode, 
    label: string, 
    disabled?: boolean, 
    active?: boolean,
    onClick?: () => void
}> = ({ icon, label, disabled, active, onClick }) => {
    return (
        <div 
            onClick={!disabled ? onClick : undefined}
            className={`
                flex flex-row items-center justify-center px-1 h-[36px] min-w-[42px] 
                cursor-default group gap-1 font-retro
                ${disabled ? 'opacity-50 grayscale' : 'hover:border-[#fff] hover:border-l-[#fff] hover:border-t-[#fff] hover:border-r-[#808080] hover:border-b-[#808080] active:border-[#808080] active:border-l-[#808080] active:border-t-[#808080] active:border-r-[#fff] active:border-b-[#fff] active:translate-y-[1px]'}
                ${!disabled && !active ? 'border border-transparent' : ''}
            `}
        >
            <div className={`flex flex-col items-center justify-center ${disabled ? '' : 'group-active:translate-x-[1px] group-active:translate-y-[1px]'}`}>
                {/* Enforce 24px container for icons to ensure uniformity */}
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                    {icon}
                </div>
                <span className="text-[11px] text-black leading-none mt-[2px] font-retro">{label}</span>
            </div>
            {['Mail', 'Print'].includes(label) && (
                 <div className="text-[8px] ml-[-2px] self-center">▼</div>
            )}
        </div>
    );
};

const MenuString = ({ label, underlineIndex = 0 }: { label: string, underlineIndex?: number }) => (
    <div className="px-2 py-[2px] hover:bg-[#000080] hover:text-white cursor-default select-none flex h-full items-center font-retro text-[12px] tracking-wide">
        <span>
            {label.split('').map((char, i) => (
                <span key={i} className={i === underlineIndex ? 'underline' : ''}>{char}</span>
            ))}
        </span>
    </div>
);

const PngIcon = ({ src }: { src: string }) => (
    <img src={src} className="w-[24px] h-[24px] object-contain" alt="icon" />
);

// --- Shadow DOM Scope Component ---
const Shadow98: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  const node = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<ShadowRoot | null>(null);

  useLayoutEffect(() => {
    if (node.current && !root) {
      const shadow = node.current.attachShadow({ mode: 'open' });
      setRoot(shadow);
    }
  }, []);

  return (
    <div ref={node} className={className}>
      {root && createPortal(
        <>
          <link rel="stylesheet" href="https://unpkg.com/98.css" />
          {/* Inject fonts directly into Shadow DOM to ensure title bar picks it up */}
          <style>{`
            @font-face {
              font-family: "Pixelated MS Sans Serif";
              src: url("https://unpkg.com/98.css/dist/ms_sans_serif.woff") format("woff");
              font-weight: 400;
              font-style: normal;
            }
            @font-face {
              font-family: "Pixelated MS Sans Serif";
              src: url("https://unpkg.com/98.css/dist/ms_sans_serif_bold.woff") format("woff");
              font-weight: bold;
              font-style: normal;
            }
            :host { 
                display: block; 
                all: initial; 
                width: 100%;
                height: 100%;
                font-family: "Pixelated MS Sans Serif", "SimSun", "宋体", sans-serif;
                -webkit-font-smoothing: none;
                -moz-osx-font-smoothing: grayscale;
            }
            * {
                font-family: inherit !important;
                -webkit-font-smoothing: none;
            }
            .title-bar {
                margin: 0;
                overflow: hidden;
            }
            .title-bar-text {
                font-size: 11px;
                font-weight: bold; 
                letter-spacing: 0px;
                display: flex;
                align-items: center;
                padding-left: 2px;
                /* Authentic font stack for Title Bar */
                font-family: "Pixelated MS Sans Serif", "SimSun", "宋体", sans-serif !important;
            }
            .status-bar {
                margin: 0;
                height: 100%;
                font-size: 11px;
            }
          `}</style>
          {children}
        </>,
        root as any
      )}
    </div>
  );
};

// --- Main IEFrame Component ---

export const IEFrame: React.FC<{ 
    url: string, 
    children: React.ReactNode,
    onGoHome?: () => void 
}> = ({ url, children, onGoHome }) => {
  return (
    <>
      {/* Global Font Face Injection for Pixelated MS Sans Serif */}
      {/* USING THE CORRECT 98.css URLS NOW */}
      <style>{`
        @font-face {
          font-family: "Pixelated MS Sans Serif";
          src: url("https://unpkg.com/98.css/dist/ms_sans_serif.woff") format("woff");
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: "Pixelated MS Sans Serif";
          src: url("https://unpkg.com/98.css/dist/ms_sans_serif_bold.woff") format("woff");
          font-weight: bold;
          font-style: normal;
        }
        
        /* Custom Retro Font Class */
        .font-retro, .ie-window-frame {
             font-family: "Pixelated MS Sans Serif", "SimSun", "宋体", sans-serif;
             -webkit-font-smoothing: none;
             -moz-osx-font-smoothing: grayscale;
             image-rendering: pixelated;
        }
        
        /* Apply to inputs/buttons as they don't inherit by default sometimes */
        input, button, select, textarea {
             font-family: "Pixelated MS Sans Serif", "SimSun", "宋体", sans-serif !important;
             -webkit-font-smoothing: none;
        }
      `}</style>
      
      <div className="ie-window-frame h-screen w-screen flex flex-col font-retro overflow-hidden select-none p-0 bg-[#d4d0c8] text-black">
        
        {/* 1. Title Bar (ISOLATED via Shadow DOM) */}
        <Shadow98 className="shrink-0 h-[19px] m-[2px] mb-[0px]">
          <div className="title-bar">
            <div className="title-bar-text">
                <img src={ASSETS.LOGO} width="16" height="16" alt="IE" style={{ marginRight: '3px' }} />
                Microsoft Internet Explorer
            </div>
            <div className="title-bar-controls">
                <button aria-label="Minimize"></button>
                <button aria-label="Maximize"></button>
                <button aria-label="Close"></button>
            </div>
          </div>
        </Shadow98>

        {/* 2. Menu Bar */}
        <div className="h-[20px] bg-[#d4d0c8] border-b border-white flex items-center px-1 text-black shrink-0 shadow-[0_-1px_0_#808080_inset] relative z-20 font-retro">
          <ToolbarHandle />
          <MenuString label="File" underlineIndex={0} />
          <MenuString label="Edit" underlineIndex={0} />
          <MenuString label="View" underlineIndex={0} />
          <MenuString label="Favorites" underlineIndex={1} />
          <MenuString label="Tools" underlineIndex={0} />
          <MenuString label="Help" underlineIndex={0} />
          
          <div className="ml-auto">
              <img src={ASSETS.WINDOWS} width="22" height="22" alt="Windows" className="block" />
          </div>
        </div>

        {/* 3. Standard Buttons Toolbar */}
        <div className="bg-[#d4d0c8] border-b border-[#808080] shadow-[0_1px_0_#fff] flex items-center p-[2px] shrink-0 h-[40px] relative z-10 font-retro">
          <ToolbarHandle />
          <ToolbarButton icon={<VectorIcons.Back />} label="Back" onClick={() => window.history.back()} />
          <ToolbarButton icon={<VectorIcons.Forward disabled />} label="Forward" disabled />
          
          <ToolbarButton icon={<PngIcon src={ASSETS.STOP} />} label="Stop" />
          
          <ToolbarButton icon={<VectorIcons.Refresh />} label="Refresh" onClick={() => window.location.reload()} />
          <ToolbarButton icon={<VectorIcons.Home />} label="Home" onClick={onGoHome} />
          
          <ToolbarSeparator />
          
          <ToolbarButton icon={<PngIcon src={ASSETS.SEARCH} />} label="Search" />
          
          <ToolbarButton icon={<VectorIcons.Favorites />} label="Favorites" />
          <ToolbarButton icon={<VectorIcons.History />} label="History" />
          
          <ToolbarSeparator />
          
          <ToolbarButton icon={<VectorIcons.Mail />} label="Mail" />
          <ToolbarButton icon={<VectorIcons.Print />} label="Print" />
        </div>

        {/* 4. Address Bar */}
        <div className="bg-[#d4d0c8] border-b border-[#808080] shadow-[0_1px_0_#fff] flex items-center p-[3px] gap-2 shrink-0 h-[24px] relative z-10 font-retro">
          <ToolbarHandle />
          <span className="text-[11px] text-[#444] px-1 font-retro">Address</span>
          <div className="flex-1 h-[20px] bg-white border border-[#7f9db9] shadow-[inset_1px_1px_1px_#ccc] flex items-center relative">
              <div className="flex items-center justify-center w-[18px] h-[16px] border-r border-[#ccc] bg-[#f7f7f7] mr-1 select-none">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                      <rect x="2" y="1" width="10" height="12" fill="white" stroke="#666" strokeWidth="0.5" />
                      <path d="M7 4 L9 6 M6 8 h2" stroke="#666" />
                      <rect x="8" y="1" width="4" height="4" fill="#eee" />
                      <text x="7" y="11" fontSize="9" fill="#2D89D6" textAnchor="middle" fontWeight="bold">e</text>
                  </svg>
              </div>
              <div className="flex-1 text-[11px] text-black font-retro leading-none overflow-hidden whitespace-nowrap pt-[2px]">
                  {url}
              </div>
              <div className="w-[16px] h-full bg-[#f0f0f0] border-l border-[#ccc] flex items-center justify-center hover:bg-[#e0e0e0]">
                  <svg width="12" height="6" viewBox="0 0 12 6"><path d="M0 0 L12 0 L6 6 Z" fill="black" /></svg>
              </div>
          </div>
          <div className="flex items-center gap-1">
              <button className="h-[20px] px-2 flex items-center gap-1 bg-[#d4d0c8] border border-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-retro">
                  <div className="w-3 h-3 bg-[#008000] rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 10 10" width="8" height="8"><path d="M2 5 L5 8 L8 2" fill="none" stroke="white" strokeWidth="1.5"/></svg>
                  </div>
                  <span className="text-[11px]">Go</span>
              </button>
              <span className="text-[11px] text-[#444] font-retro">Links &gt;&gt;</span>
          </div>
        </div>

        {/* 5. Main Content Area */}
        <div className="flex-1 relative overflow-auto bg-[#808080] border-t-2 border-l-2 border-[#404040] border-b border-r border-white scrollbar-classic">
            <div className="w-full min-h-full bg-white relative isolate">
              {children}
            </div>
        </div>

        {/* 6. Status Bar (ISOLATED via Shadow DOM) */}
        <Shadow98 className="shrink-0 h-[19px] m-[2px] mt-0">
            <div className="status-bar" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <div className="status-bar-field" style={{ width: '24px', flexGrow: 0, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                    <img src="https://win98icons.alexmeub.com/icons/png/document-0.png" width="16" height="16" alt="doc" />
                </div>
                
                <div className="status-bar-field" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', paddingLeft: '4px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    Done
                </div>
                
                <div className="status-bar-field" style={{ width: '100px', flexGrow: 0, flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{ height: '12px', width: '60%', background: 'linear-gradient(90deg, #000080, #1084d0)' }}></div>
                </div>
                
                <div className="status-bar-field" style={{ width: '120px', flexGrow: 0, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <img src={ASSETS.NET} width="16" height="16" alt="net" />
                    Internet
                </div>
            </div>
        </Shadow98>
        
        {/* Styles: Manual window border and Scrollbar */}
        <style>{`
          .ie-window-frame {
              /* Manual replication of 'window' class border to avoid global pollution */
              box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
          }
          
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
          .scrollbar-classic::-webkit-scrollbar-button:vertical:decrement {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 5 L4 10 L12 10 Z' fill='black'/%3E%3C/svg%3E");
          }
          .scrollbar-classic::-webkit-scrollbar-button:vertical:increment {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 11 L4 6 L12 6 Z' fill='black'/%3E%3C/svg%3E");
          }
        `}</style>
      </div>
    </>
  );
};