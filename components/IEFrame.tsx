
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';

// --- authentic Assets ---
const ASSETS = {
    LOGO: "https://win98icons.alexmeub.com/icons/png/msie1-2.png",
    WINDOWS: "https://win98icons.alexmeub.com/icons/png/windows-0.png",
    NET: "https://win98icons.alexmeub.com/icons/png/html-5.png",
    NOTEPAD: "https://win98icons.alexmeub.com/icons/png/notepad-0.png"
};

// --- User Provided Context Icons (JPGs with black background) ---
const CONTEXT_ICONS = {
    Back: "https://i.ibb.co/5W1sR4Dc/Back.jpg",
    Forward: "https://i.ibb.co/FqmdbrsL/Forward.jpg",
    Cut: "https://i.ibb.co/3yhyQt5m/Cut.jpg",
    Copy: "https://i.ibb.co/0jv5MFZC/Copy.jpg",
    Paste: "https://i.ibb.co/h1W1f3kH/Paste.jpg",
    Properties: "https://i.ibb.co/Dgvdy9G3/Properties.jpg",
};

// --- User Provided Toolbar Icons ---
const TOOLBAR_ICONS = {
    Back: "https://i.ibb.co/5W1sR4Dc/Back.jpg",
    Forward: "https://i.ibb.co/FqmdbrsL/Forward.jpg",
    Up: "https://i.ibb.co/Sws0G04Q/Up.jpg",
    Stop: "https://i.ibb.co/8DK1hd2N/Stop.jpg",
    Refresh: "https://i.ibb.co/840Rm6ns/Refresh.jpg",
    Home: "https://i.ibb.co/8D6RW3LQ/Home.jpg",
    Search: "https://i.ibb.co/nJhBBkc/Search.jpg",
    Favorites: "https://i.ibb.co/35JdPF21/Favorites.jpg",
    History: "https://i.ibb.co/tMVsKGZQ/History.jpg",
    Folders: "https://i.ibb.co/gLPgchRq/Folders.jpg",
};

// --- Hooks ---
function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (target.closest('[data-dropdown-trigger]')) {
                return;
            }

            if (ref.current && !ref.current.contains(target as Node)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

// --- Helper Components ---

const ToolbarHandle = () => (
    <div className="flex flex-row items-center h-full px-[2px] cursor-ew-resize mr-[2px] border-l border-white shrink-0" style={{ display: 'flex' }}>
        <div className="w-[3px] h-[calc(100%-4px)] border-t border-l border-white border-b border-r border-[#808080] bg-[#d4d0c8]"></div>
    </div>
);

const ToolbarSeparator = () => (
    <div className="h-[36px] w-[2px] border-l border-[#808080] border-r border-white mx-1 my-auto shrink-0"></div>
);

const ProcessedIcon: React.FC<{ src: string, alt: string, className?: string }> = ({ src, alt, className }) => {
    const [imgUrl, setImgUrl] = useState<string>(src);
    
    useEffect(() => {
        let active = true;
        const img = new Image();
        img.crossOrigin = "Anonymous"; 
        img.src = src;
        
        img.onload = () => {
             if(!active) return;
             const canvas = document.createElement('canvas');
             canvas.width = img.width;
             canvas.height = img.height;
             const ctx = canvas.getContext('2d', { willReadFrequently: true });
             if(!ctx) return;
             
             ctx.drawImage(img, 0, 0);
             
             try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const width = canvas.width;
                const height = canvas.height;
                
                const bgR = data[0];
                const bgG = data[1];
                const bgB = data[2];
                const tolerance = 40; 
                
                const match = (i: number) => {
                    return Math.abs(data[i] - bgR) < tolerance &&
                           Math.abs(data[i+1] - bgG) < tolerance &&
                           Math.abs(data[i+2] - bgB) < tolerance;
                };

                const stack: number[] = [];
                const visited = new Uint8Array(width * height);
                
                const add = (x: number, y: number) => {
                    if (x < 0 || x >= width || y < 0 || y >= height) return;
                    const idx = y * width + x;
                    if (visited[idx]) return;
                    
                    const pixelIdx = idx * 4;
                    if (match(pixelIdx)) {
                        visited[idx] = 1;
                        stack.push(x, y);
                        data[pixelIdx + 3] = 0;
                    }
                };
                
                add(0, 0);
                add(width - 1, 0);
                add(0, height - 1);
                add(width - 1, height - 1);
                
                while (stack.length > 0) {
                    const y = stack.pop()!;
                    const x = stack.pop()!;
                    add(x + 1, y);
                    add(x - 1, y);
                    add(x, y + 1);
                    add(x, y - 1);
                }
                
                ctx.putImageData(imageData, 0, 0);
                setImgUrl(canvas.toDataURL());
             } catch (e) {
                 console.warn("Could not process image transparency", e);
             }
        };
        
        return () => { active = false; };
    }, [src]);

    return <img src={imgUrl} alt={alt} className={className} style={{ display: 'block' }} />;
};

// --- Menu System ---

const MenuSeparator = () => (
    <div className="border-b border-white border-t border-[#808080] my-[2px] mx-[2px]"></div>
);

const MenuItem: React.FC<{ 
    label: string, 
    shortcut?: string, 
    icon?: string, 
    disabled?: boolean, 
    hasSubmenu?: boolean,
    onClick?: () => void 
}> = ({ label, shortcut, icon, disabled, hasSubmenu, onClick }) => (
    <div 
        onClick={!disabled ? onClick : undefined}
        className={`
            flex items-center px-4 py-[3px] text-[11px] font-retro cursor-default select-none relative
            ${disabled ? 'text-[#808080] text-shadow-white pointer-events-none' : 'text-black hover:bg-[#000080] hover:text-white group'}
        `}
    >
        <div className="w-[16px] mr-2 flex justify-center items-center">
            {icon && (
                <ProcessedIcon 
                    src={icon} 
                    className={`w-4 h-4 object-contain ${disabled ? 'opacity-50 grayscale' : ''}`} 
                    alt="" 
                />
            )}
        </div>
        
        <span className="flex-1 whitespace-nowrap">{label}</span>
        
        {shortcut && <span className="ml-6">{shortcut}</span>}
        {hasSubmenu && <span className="ml-4 font-sans text-[9px]">▶</span>}
    </div>
);

const DropdownContainer: React.FC<{ 
    children: React.ReactNode, 
    isOpen: boolean, 
    position: { top: number, left: number },
    onClose: () => void,
    zIndex?: number
}> = ({ children, isOpen, position, onClose, zIndex = 50 }) => {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, onClose);

    if (!isOpen) return null;

    return (
        <div 
            ref={ref}
            className="absolute bg-[#d4d0c8] py-[1px] min-w-[150px]"
            style={{ 
                top: position.top, 
                left: position.left, 
                zIndex: zIndex,
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid #fff',
                borderTop: '1px solid #fff',
                borderRight: '1px solid #404040',
                borderBottom: '1px solid #404040',
                boxShadow: '1px 1px 0 #000', 
            }}
        >
            <div className="border-t border-l border-[#dfdfdf] border-b border-r border-[#808080]">
                {children}
            </div>
        </div>
    );
};

const Notepad: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    content: string;
    title: string;
}> = ({ isOpen, onClose, content, title }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 }); 

    useEffect(() => {
        if (isOpen) {
            const width = 600;
            const height = 400;
            const x = (window.innerWidth - width) / 2;
            const y = (window.innerHeight - height) / 2;
            setPosition({ 
                x: Math.max(0, x), 
                y: Math.max(0, y) 
            });
        }
    }, [isOpen]);

    const onMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; 
        setIsDragging(true);
        setRel({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - rel.x,
            y: e.clientY - rel.y
        });
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        } else {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
             <div 
                className="absolute w-[600px] h-[400px] bg-[#c0c0c0] flex flex-col border-t border-l border-[#fff] border-b border-r border-[#000] border-2 shadow-2xl pointer-events-auto"
                style={{ left: position.x, top: position.y }}
             >
                 <div 
                    className="bg-[#000080] text-white px-2 py-[2px] flex justify-between items-center select-none font-bold text-xs cursor-default"
                    onMouseDown={onMouseDown}
                 >
                     <div className="flex items-center gap-1 pointer-events-none">
                         <img src={ASSETS.NOTEPAD} width="14" height="14" alt="" />
                         <span>{title} - Notepad</span>
                     </div>
                     <button onClick={onClose} className="w-[14px] h-[14px] bg-[#c0c0c0] border border-white border-b-[#404040] border-r-[#404040] flex items-center justify-center text-black leading-3 active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white">×</button>
                 </div>
                 <div className="flex text-black text-xs px-1 py-[1px] bg-[#c0c0c0]">
                     <span className="px-1 underline">F</span>ile
                     <span className="px-1 underline">E</span>dit
                     <span className="px-1 underline">S</span>earch
                     <span className="px-1 underline">H</span>elp
                 </div>
                 <textarea 
                    className="flex-1 resize-none bg-white text-black text-xs p-1 outline-none border border-[#808080] border-b-white border-r-white m-[2px] overflow-scroll whitespace-pre scrollbar-classic"
                    style={{ fontFamily: '"Courier New", Courier, monospace' }}
                    value={content}
                    readOnly
                 />
             </div>
        </div>
    );
};

const ToolbarButton: React.FC<{ 
    imgSrc: string, 
    label: string, 
    disabled?: boolean, 
    active?: boolean, 
    onClick?: () => void,
    hasDropdown?: boolean,
    onDropdownClick?: (e: React.MouseEvent) => void,
    dropdownOpen?: boolean
}> = ({ imgSrc, label, disabled, active, onClick, hasDropdown, onDropdownClick, dropdownOpen }) => {
    return (
        <div className="flex flex-row h-[38px] items-stretch shrink-0 font-retro relative group/wrapper px-[1px]">
            <div 
                onClick={!disabled ? onClick : undefined}
                className={`
                    flex flex-col items-center justify-center px-[2px] min-w-[32px]
                    cursor-default
                    ${disabled ? 'opacity-50 grayscale' : 'hover:border-t hover:border-l hover:border-white hover:border-b hover:border-r hover:border-[#808080] active:border-[#808080] active:border-l-[#808080] active:border-t-[#808080] active:border-r-white active:border-b-white active:translate-y-[1px]'}
                    ${!disabled && !active ? 'border border-transparent' : ''}
                `}
            >
                <div className={`flex flex-col items-center justify-center gap-0 pointer-events-none`}>
                    <ProcessedIcon 
                        src={imgSrc} 
                        alt={label}
                        className="w-[20px] h-[20px] object-contain"
                    />
                    <div className="flex items-center mt-[1px]">
                        <span className="text-[11px] text-black leading-none whitespace-nowrap">{label}</span>
                    </div>
                </div>
            </div>

            {hasDropdown && (
                <div 
                    onClick={!disabled ? onDropdownClick : undefined}
                    data-dropdown-trigger
                    className={`
                        flex items-center justify-center w-[12px] h-full
                        cursor-default
                        ${dropdownOpen ? 'border-2 border-[#808080] border-l-[#808080] border-t-[#808080] border-r-white border-b-white bg-[#d4d0c8] translate-y-[1px]' : ''}
                        ${!disabled && !dropdownOpen ? 'hover:border-t hover:border-l hover:border-white hover:border-b hover:border-r hover:border-[#808080] active:border-[#808080] active:border-l-[#808080] active:border-t-[#808080] active:border-r-white active:border-b-white active:translate-y-[1px]' : ''}
                        ${!dropdownOpen ? 'border border-transparent' : ''}
                    `}
                >
                    <span className={`text-[7px] leading-none mb-2 ${disabled ? 'text-gray-400' : 'text-black'}`}>▼</span>
                </div>
            )}
        </div>
    );
};

const MenuString: React.FC<{ 
    label: string, 
    underlineIndex?: number, 
    isOpen?: boolean,
    onClick?: (e: React.MouseEvent) => void 
}> = ({ label, underlineIndex = 0, isOpen, onClick }) => (
    <div 
        onClick={onClick}
        data-dropdown-trigger
        className={`
            px-2 py-[2px] cursor-default select-none flex h-full items-center font-retro text-[12px] tracking-wide relative
            ${isOpen ? 'bg-[#000080] text-white shadow-none' : 'hover:bg-[#000080] hover:text-white text-black'}
        `}
    >
        <span>
            {label.split('').map((char, i) => (
                <span key={i} className={i === underlineIndex ? 'underline' : ''}>{char}</span>
            ))}
        </span>
    </div>
);

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

export const IEFrame: React.FC<{ 
    url: string, 
    children: React.ReactNode,
    onGoHome?: () => void,
    onVisitBathhouse?: () => void,
    currentSourceCode?: string
}> = ({ url, children, onGoHome, onVisitBathhouse, currentSourceCode }) => {
    
  const frameRef = useRef<HTMLDivElement>(null);

  // --- States for Dropdowns ---
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const [activeToolbarDropdown, setActiveToolbarDropdown] = useState<string | null>(null);
  const [toolbarDropdownPos, setToolbarDropdownPos] = useState({ top: 0, left: 0 });

  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ top: 0, left: 0 });

  const [notepadOpen, setNotepadOpen] = useState(false);

  // Helper to get coordinates relative to the IEFrame container
  const getRelativeCoords = (target: HTMLElement | { clientX: number, clientY: number }) => {
      if (!frameRef.current) return { top: 0, left: 0 };
      const frameRect = frameRef.current.getBoundingClientRect();
      
      if ('clientX' in target) {
          return {
              top: target.clientY - frameRect.top,
              left: target.clientX - frameRect.left
          };
      } else {
          const targetRect = target.getBoundingClientRect();
          return {
              top: targetRect.bottom - frameRect.top,
              left: targetRect.left - frameRect.left
          };
      }
  };

  const handleMenuClick = (e: React.MouseEvent, menuName: string) => {
      e.stopPropagation();
      setContextMenuOpen(false);
      const target = e.currentTarget as HTMLElement;
      
      if (activeMenu === menuName) {
          setActiveMenu(null);
      } else {
          setActiveMenu(menuName);
          const pos = getRelativeCoords(target);
          setMenuPos(pos);
      }
      setActiveToolbarDropdown(null);
  };

  const handleToolbarDropdownClick = (e: React.MouseEvent, name: string) => {
      e.stopPropagation();
      setContextMenuOpen(false);
      const target = e.currentTarget as HTMLElement; 
      
      if (activeToolbarDropdown === name) {
          setActiveToolbarDropdown(null);
      } else {
          setActiveToolbarDropdown(name);
          const pos = getRelativeCoords(target);
          setToolbarDropdownPos(pos);
      }
      setActiveMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      closeAllMenus();
      const pos = getRelativeCoords({ clientX: e.clientX, clientY: e.clientY });
      setContextMenuPos(pos);
      setContextMenuOpen(true);
  };

  const closeAllMenus = () => {
      setActiveMenu(null);
      setActiveToolbarDropdown(null);
      setContextMenuOpen(false);
  };
  
  const handleViewSource = () => {
      setContextMenuOpen(false);
      if (currentSourceCode) {
          setNotepadOpen(true);
      }
  };

  const canViewSource = !!currentSourceCode;

  return (
    <>
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
        
        .font-retro, .ie-window-frame {
             font-family: "Pixelated MS Sans Serif", "SimSun", "宋体", sans-serif;
             -webkit-font-smoothing: none;
             -moz-osx-font-smoothing: grayscale;
             image-rendering: pixelated;
        }
        
        .text-shadow-white {
            text-shadow: 1px 1px 0 #fff;
        }
        
        input, button, select, textarea {
             font-family: "Pixelated MS Sans Serif", "SimSun", "宋体", sans-serif !important;
             -webkit-font-smoothing: none;
        }
      `}</style>
      
      <div 
        ref={frameRef}
        className="ie-window-frame h-screen w-screen flex flex-col font-retro overflow-hidden select-none p-0 bg-[#d4d0c8] text-black relative"
        style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#d4d0c8', color: 'black', position: 'relative' }}
        onClick={closeAllMenus}
        onContextMenu={(e) => {
             e.preventDefault(); 
        }}
      >
        
        {/* 1. Title Bar */}
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
        <div 
            className="h-[20px] bg-[#d4d0c8] border-b border-white flex items-center px-1 text-black shrink-0 shadow-[0_-1px_0_#808080_inset] relative z-20 font-retro"
            style={{ display: 'flex', alignItems: 'center', height: '20px', backgroundColor: '#d4d0c8' }}
        >
          <ToolbarHandle />
          <div className="relative h-full flex items-center">
              <MenuString label="File" underlineIndex={0} onClick={(e) => handleMenuClick(e, 'File')} isOpen={activeMenu === 'File'} />
              <MenuString label="Edit" underlineIndex={0} onClick={(e) => handleMenuClick(e, 'Edit')} isOpen={activeMenu === 'Edit'} />
              <MenuString label="View" underlineIndex={0} onClick={(e) => handleMenuClick(e, 'View')} isOpen={activeMenu === 'View'} />
              <MenuString label="Favorites" underlineIndex={1} onClick={(e) => handleMenuClick(e, 'Favorites')} isOpen={activeMenu === 'Favorites'} />
              <MenuString label="Tools" underlineIndex={0} />
              <MenuString label="Help" underlineIndex={0} />
          </div>
          
          <div className="ml-auto" style={{ marginLeft: 'auto' }}>
              <img src={ASSETS.WINDOWS} width="22" height="22" alt="Windows" className="block" />
          </div>
        </div>

        {/* 3. Standard Buttons Toolbar */}
        <div 
            className="bg-[#d4d0c8] border-b border-[#808080] shadow-[0_1px_0_#fff] flex items-center p-[2px] shrink-0 h-[44px] relative z-10 font-retro overflow-x-auto scrollbar-none"
            style={{ display: 'flex', alignItems: 'center', height: '44px', backgroundColor: '#d4d0c8', overflowX: 'auto' }}
        >
          <ToolbarHandle />
          
          <ToolbarButton 
            imgSrc={TOOLBAR_ICONS.Back} 
            label="Back" 
            onClick={() => window.history.back()} 
            hasDropdown 
            dropdownOpen={activeToolbarDropdown === 'Back'}
            onDropdownClick={(e) => handleToolbarDropdownClick(e, 'Back')}
          />
          <ToolbarButton 
            imgSrc={TOOLBAR_ICONS.Forward} 
            label="Forward" 
            disabled 
            hasDropdown
            dropdownOpen={activeToolbarDropdown === 'Forward'}
            onDropdownClick={(e) => handleToolbarDropdownClick(e, 'Forward')}
          />
          
          <ToolbarButton imgSrc={TOOLBAR_ICONS.Stop} label="Stop" />
          <ToolbarButton imgSrc={TOOLBAR_ICONS.Refresh} label="Refresh" onClick={() => window.location.reload()} />
          <ToolbarButton imgSrc={TOOLBAR_ICONS.Home} label="Home" onClick={onGoHome} />
          
          <ToolbarSeparator />
          
          <ToolbarButton imgSrc={TOOLBAR_ICONS.Search} label="Search" />
          <ToolbarButton imgSrc={TOOLBAR_ICONS.Favorites} label="Favorites" />
          <ToolbarButton imgSrc={TOOLBAR_ICONS.History} label="History" />

        </div>

        {/* 4. Address Bar */}
        <div 
            className="bg-[#d4d0c8] border-b border-[#808080] shadow-[0_1px_0_#fff] flex items-center p-[3px] gap-2 shrink-0 h-[26px] relative z-10 font-retro"
            style={{ display: 'flex', alignItems: 'center', height: '26px', backgroundColor: '#d4d0c8' }}
        >
          <ToolbarHandle />
          <span className="text-[11px] text-[#444] px-1 font-retro">Address</span>
          <div className="flex-1 h-[20px] bg-white border border-[#7f9db9] shadow-[inset_1px_1px_1px_#ccc] flex items-center relative" style={{ flex: 1, display: 'flex' }}>
              <div className="flex items-center justify-center w-[18px] h-[16px] border-r border-[#ccc] bg-[#f7f7f7] mr-1 select-none" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14">
                      <rect x="2" y="1" width="10" height="12" fill="white" stroke="#666" strokeWidth="0.5" />
                      <path d="M7 4 L9 6 M6 8 h2" stroke="#666" />
                      <rect x="8" y="1" width="4" height="4" fill="#eee" />
                      <text x="7" y="11" fontSize="9" fill="#2D89D6" textAnchor="middle" fontWeight="bold">e</text>
                  </svg>
              </div>
              <div className="flex-1 text-[11px] text-black font-retro leading-none overflow-hidden whitespace-nowrap pt-[2px]" style={{ flex: 1 }}>
                  {url}
              </div>
              <div className="w-[16px] h-full bg-[#f0f0f0] border-l border-[#ccc] flex items-center justify-center hover:bg-[#e0e0e0]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="6" viewBox="0 0 12 6"><path d="M0 0 L12 0 L6 6 Z" fill="black" /></svg>
              </div>
          </div>
          <div className="flex items-center gap-1" style={{ display: 'flex', alignItems: 'center' }}>
              <button className="h-[20px] px-2 flex items-center gap-1 bg-[#d4d0c8] border border-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-retro" style={{ display: 'flex' }}>
                  <div className="w-3 h-3 bg-[#008000] rounded-full flex items-center justify-center" style={{ display: 'flex' }}>
                      <svg viewBox="0 0 10 10" width="8" height="8"><path d="M2 5 L5 8 L8 2" fill="none" stroke="white" strokeWidth="1.5"/></svg>
                  </div>
                  <span className="text-[11px]">Go</span>
              </button>
              <span className="text-[11px] text-[#444] font-retro">Links &gt;&gt;</span>
          </div>
        </div>

        {/* 5. Main Content Area */}
        <div 
            className="flex-1 relative overflow-auto bg-[#808080] border-t-2 border-l-2 border-[#404040] border-b border-r border-white scrollbar-classic" 
            style={{ flex: 1, position: 'relative' }}
            onContextMenu={handleContextMenu}
        >
            <div className="w-full min-h-full bg-white relative isolate">
              {children}
            </div>
        </div>

        {/* 6. Status Bar */}
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

        {/* Dropdowns are now absolute relative to this container */}
        <DropdownContainer 
            isOpen={activeMenu === 'File'} 
            position={menuPos} 
            onClose={() => setActiveMenu(null)}
        >
            <MenuItem label="New" shortcut="Ctrl+N" hasSubmenu />
            <MenuItem label="Open..." shortcut="Ctrl+O" onClick={() => alert('Open Dialog (Mock)')} />
            <MenuItem label="Edit with Notepad" disabled />
            <MenuItem label="Save" shortcut="Ctrl+S" />
            <MenuItem label="Save As..." />
            <MenuSeparator />
            <MenuItem label="Page Setup..." />
            <MenuItem label="Print..." shortcut="Ctrl+P" onClick={() => window.print()} />
            <MenuSeparator />
            <MenuItem label="Send" hasSubmenu />
            <MenuItem label="Import and Export..." />
            <MenuSeparator />
            <MenuItem label="Properties" icon={CONTEXT_ICONS.Properties} />
            <MenuItem label="Work Offline" />
            <MenuItem label="Close" onClick={() => window.close()} />
        </DropdownContainer>

        <DropdownContainer 
            isOpen={activeMenu === 'Edit'} 
            position={menuPos} 
            onClose={() => setActiveMenu(null)}
        >
            <MenuItem label="Cut" shortcut="Ctrl+X" icon={CONTEXT_ICONS.Cut} disabled />
            <MenuItem label="Copy" shortcut="Ctrl+C" icon={CONTEXT_ICONS.Copy} />
            <MenuItem label="Paste" shortcut="Ctrl+V" icon={CONTEXT_ICONS.Paste} />
            <MenuSeparator />
            <MenuItem label="Select All" shortcut="Ctrl+A" />
            <MenuItem label="Find (on This Page)..." shortcut="Ctrl+F" />
        </DropdownContainer>

        <DropdownContainer 
            isOpen={activeMenu === 'View'} 
            position={menuPos} 
            onClose={() => setActiveMenu(null)}
        >
            <MenuItem label="Toolbars" hasSubmenu />
            <MenuItem label="Status Bar" />
            <MenuItem label="Explorer Bar" hasSubmenu />
            <MenuSeparator />
            <MenuItem label="Go To" hasSubmenu />
            <MenuItem label="Stop" shortcut="Esc" />
            <MenuItem label="Refresh" shortcut="F5" onClick={() => window.location.reload()} />
            <MenuSeparator />
            <MenuItem label="Text Size" hasSubmenu />
            <MenuItem label="Encoding" hasSubmenu />
            <MenuSeparator />
            <MenuItem label="Source" onClick={handleViewSource} disabled={!canViewSource} />
            <MenuItem label="Full Screen" shortcut="F11" />
        </DropdownContainer>
            
        <DropdownContainer 
            isOpen={activeMenu === 'Favorites'} 
            position={menuPos} 
            onClose={() => setActiveMenu(null)}
        >
            <MenuItem label="Add to Favorites..." />
            <MenuItem label="Organize Favorites..." />
            <MenuSeparator />
            <MenuItem label="Mianyang BBS" />
            <MenuItem label="Sohu Mall" />
            <MenuItem label="Legend of Mir" />
        </DropdownContainer>

        <DropdownContainer
            isOpen={activeToolbarDropdown === 'Back' || activeToolbarDropdown === 'Forward'}
            position={toolbarDropdownPos}
            onClose={() => setActiveToolbarDropdown(null)}
        >
            <div className="bg-[#d4d0c8] text-[10px] p-1 text-[#404040] select-none cursor-default">
                Select a page to go back to:
            </div>
            <MenuItem label="Mianyang BBS - Home" onClick={() => onGoHome && onGoHome()} />
            <MenuItem label="Welcome to Sohu.com" />
            <MenuItem label="Legend of Mir - Server Select" />
            <MenuItem label="about:blank" />
            <div className="border-t border-[#808080] my-[1px]"></div>
            <MenuItem label="碧海蓝天休闲会所 - 首页" onClick={() => onVisitBathhouse && onVisitBathhouse()} />
        </DropdownContainer>
        
        <DropdownContainer
            isOpen={contextMenuOpen}
            position={contextMenuPos}
            onClose={() => setContextMenuOpen(false)}
        >
             <MenuItem label="Back" disabled icon={CONTEXT_ICONS.Back} />
             <MenuItem label="Forward" disabled icon={CONTEXT_ICONS.Forward} />
             <MenuSeparator />
             <MenuItem label="Save Background As..." />
             <MenuItem label="Set as Wallpaper" />
             <MenuItem label="Copy Background" />
             <MenuSeparator />
             <MenuItem label="Select All" />
             <MenuItem label="Paste" icon={CONTEXT_ICONS.Paste} disabled />
             <MenuSeparator />
             <MenuItem label="Create Shortcut" />
             <MenuItem label="Add to Favorites..." />
             <MenuItem label="View Source" onClick={handleViewSource} disabled={!canViewSource} />
             <MenuSeparator />
             <MenuItem label="Encoding" hasSubmenu />
             <MenuItem label="Print" />
             <MenuSeparator />
             <MenuItem label="Properties" icon={CONTEXT_ICONS.Properties} />
        </DropdownContainer>

        <Notepad 
            isOpen={notepadOpen} 
            onClose={() => setNotepadOpen(false)}
            title="Original Source"
            content={currentSourceCode || "<html><body><p>Source not available.</p></body></html>"}
        />
        
        <style>{`
          .ie-window-frame {
              box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
          }
          .scrollbar-none::-webkit-scrollbar {
              display: none; 
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
