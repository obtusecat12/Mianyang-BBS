import React from 'react';

// A retro container simulating a table cell or windows frame
export const BevelBox: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  inset?: boolean;
  title?: string;
  icon?: string;
}> = ({ children, className = "", inset = false, title, icon }) => {
  // If title is provided, it renders like a Windows 98 window
  if (title) {
    return (
      <div className={`bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-600 p-[2px] ${className}`}>
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-1 py-[1px] font-bold text-xs flex justify-between items-center select-none mb-1">
          <div className="flex items-center gap-1">
            {icon && <PixelIcon type={icon} />}
            <span>{title}</span>
          </div>
          <div className="flex gap-[2px]">
            <button className="w-[14px] h-[12px] bg-[#c0c0c0] border border-white border-b-gray-600 border-r-gray-600 leading-[8px] text-[8px] text-black shadow-[inset_1px_1px_0_#fff]">_</button>
            <button className="w-[14px] h-[12px] bg-[#c0c0c0] border border-white border-b-gray-600 border-r-gray-600 leading-[8px] text-[8px] text-black shadow-[inset_1px_1px_0_#fff]">×</button>
          </div>
        </div>
        <div className="border border-gray-400 p-1 bg-[#dfdfdf] text-black">
          {children}
        </div>
      </div>
    );
  }

  // Standard Bevel
  return (
    <div className={`
      ${inset 
        ? 'border-t-[#808080] border-l-[#808080] border-b-white border-r-white border-2' 
        : 'border-t-white border-l-white border-b-[#808080] border-r-[#808080] border-2 bg-[#c0c0c0]'}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const RetroButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = "", ...props }) => {
  return (
    <button 
      className={`
        px-2 py-0
        border-t-2 border-l-2 border-t-white border-l-white 
        border-r-2 border-b-2 border-r-[#404040] border-b-[#404040]
        bg-[#c0c0c0] 
        active:border-t-[#404040] active:border-l-[#404040] active:border-r-white active:border-b-white 
        text-xs font-simsun select-none active:translate-y-[1px]
        text-black
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

// CSS-based Pixel Art Icons to replace Emojis
export const PixelIcon: React.FC<{ type: string, className?: string }> = ({ type, className = "" }) => {
  const commonStyle = "inline-block align-middle select-none";
  
  // Folder icon
  if (type === 'folder' || type === 'chat' || type === 'ghost' || type === 'market' || type === 'tech' || type === 'music') {
    return (
      <svg width="15" height="13" viewBox="0 0 15 13" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
        <path d="M0 2 h4 l2 2 h9 v9 h-15 z" fill="#ffd700" stroke="#8b4513" strokeWidth="1" />
        <rect x="1" y="3" width="13" height="1" fill="#fff" fillOpacity="0.5" />
      </svg>
    );
  }

  if (type === 'new') {
    return (
        <span className="inline-flex px-1 h-[12px] bg-red-600 text-white text-[9px] font-bold items-center justify-center border border-white blink shadow-sm">
            NEW
        </span>
    );
  }
  
  if (type === 'hot') {
    return (
       <svg width="12" height="12" viewBox="0 0 10 10" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
           <path d="M5 0 L2 4 L4 4 L3 7 L8 3 L6 3 L7 0 Z" fill="red" stroke="yellow" strokeWidth="0.5" />
       </svg>
    );
  }

  if (type === 'fire') {
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
            <path d="M2 9 h6 v-1 h1 v-2 h-1 v-1 h-1 v-1 h-1 v-2 h-1 v2 h-1 v1 h-1 v1 h-1 v2 h1 z" fill="red" />
            <path d="M4 9 h2 v-1 h1 v-2 h-1 v1 h-1 v-2 h-1 v2 h-1 v-1 h-1 v2 h1 z" fill="yellow" />
        </svg>
      );
  }

  if (type === 'sticky') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
         <rect x="3" y="2" width="6" height="8" fill="#fff" stroke="blue" strokeWidth="1" />
         <path d="M2 2 h8" stroke="red" strokeWidth="1" />
         <path d="M4 1 v2" stroke="red" strokeWidth="1" />
         <path d="M8 1 v2" stroke="red" strokeWidth="1" />
      </svg>
    );
  }

  if (type === 'file') {
     return (
        <svg width="11" height="13" viewBox="0 0 11 13" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
          <path d="M1 1 h6 l3 3 v8 h-9 z" fill="white" stroke="#555" strokeWidth="1"/>
          <path d="M7 1 v3 h3" fill="none" stroke="#555" strokeWidth="1"/>
          <line x1="3" y1="5" x2="8" y2="5" stroke="#ccc" />
          <line x1="3" y1="7" x2="8" y2="7" stroke="#ccc" />
          <line x1="3" y1="9" x2="6" y2="9" stroke="#ccc" />
        </svg>
     );
  }
  
  // Weirdcore Eye Icon
  if (type === 'eye') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
        <path d="M2 8 C2 8 5 4 8 4 C11 4 14 8 14 8 C14 8 11 12 8 12 C5 12 2 8 2 8 Z" fill="white" stroke="black" strokeWidth="1"/>
        <circle cx="8" cy="8" r="3" fill="black" />
        <circle cx="9" cy="7" r="1" fill="white" />
      </svg>
    );
  }

  // --- New Icons ---

  if (type === 'user') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
        <path d="M4 1 h4 v3 h-4 z M2 5 h8 v7 h-8 z" fill="#fff" />
        <rect x="3" y="2" width="6" height="5" fill="#fff" fillOpacity="0.5" /> 
        {/* Simple face features */}
        <rect x="5" y="3" width="1" height="1" fill="#000" />
        <rect x="7" y="3" width="1" height="1" fill="#000" />
        <rect x="5" y="5" width="3" height="1" fill="#000" />
      </svg>
    );
  }

  if (type === 'chart') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
         <rect x="1" y="6" width="2" height="5" fill="#fff" />
         <rect x="5" y="3" width="2" height="8" fill="#fff" />
         <rect x="9" y="1" width="2" height="10" fill="#ffff00" />
      </svg>
    );
  }

  if (type === 'calendar') {
     return (
       <svg width="13" height="13" viewBox="0 0 13 13" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
         <path d="M2 2 h9 v10 h-9 z" fill="white" />
         <rect x="2" y="2" width="9" height="3" fill="#800000" />
         <rect x="3" y="1" width="1" height="2" fill="#fff" />
         <rect x="9" y="1" width="1" height="2" fill="#fff" />
         <g fill="#000">
            <rect x="4" y="7" width="1" height="1" />
            <rect x="6" y="7" width="1" height="1" />
            <rect x="8" y="7" width="1" height="1" />
            <rect x="4" y="9" width="1" height="1" />
            <rect x="6" y="9" width="1" height="1" />
         </g>
       </svg>
     );
  }

  if (type === 'link') {
      return (
        <svg width="14" height="12" viewBox="0 0 14 12" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
            <path d="M2 6 a4 4 0 0 1 4 -4 h2" fill="none" stroke="#666" strokeWidth="2" />
            <path d="M12 6 a4 4 0 0 1 -4 4 h-2" fill="none" stroke="#666" strokeWidth="2" />
            <line x1="4" y1="6" x2="10" y2="6" stroke="#666" strokeWidth="2" />
        </svg>
      );
  }

  if (type === 'speaker') {
     return (
        <svg width="12" height="12" viewBox="0 0 12 12" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
           <path d="M1 4 h3 l3 -3 v10 l-3 -3 h-3 z" fill="#000080" />
           <path d="M9 4 q2 2 0 4" stroke="#000080" fill="none" />
        </svg>
     );
  }

  if (type === 'heart') {
     return (
        <svg width="12" height="12" viewBox="0 0 12 11" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
           <path d="M2 0 h3 l1 1 l1 -1 h3 v3 l-1 1 l-1 1 l-2 2 l-1 1 l-1 -1 l-2 -2 l-1 -1 l-1 -1 v-3 z" fill="#ff0000" stroke="#800000" strokeWidth="0.5" />
           <rect x="3" y="1" width="1" height="1" fill="white" fillOpacity="0.7" />
        </svg>
     );
  }

  // --- Brand Icons ---
  if (type === 'netease') {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
        <rect width="13" height="13" fill="#d32f2f" rx="1" />
        <path d="M3 3 v7 l7 -7 v7" stroke="white" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  if (type === 'sina') {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
         <circle cx="6.5" cy="6.5" r="5.5" fill="white" />
         <path d="M2 6.5 Q 6.5 1 11 6.5 Q 6.5 12 2 6.5" fill="black" />
         <circle cx="6.5" cy="6.5" r="2.5" fill="white" />
         <circle cx="7.5" cy="6" r="1" fill="black" />
      </svg>
    );
  }

  if (type === 'chinaren') {
     return (
        <svg width="13" height="13" viewBox="0 0 13 13" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
            <rect width="13" height="13" fill="#4caf50" rx="1" />
            <path d="M9 4 h-4 v2 h3 v2 h-3 v2 h4" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M3 4 v6" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
     );
  }

  if (type === 'bhys') {
     return (
        <svg width="13" height="13" viewBox="0 0 13 13" className={`${commonStyle} ${className}`} shapeRendering="crispEdges">
           <rect width="13" height="13" fill="#1e88e5" rx="1" />
           <path d="M2 10 q 2 -3 4 0 t 5 0" stroke="white" strokeWidth="1.5" fill="none" />
           <path d="M2 7 q 2 -3 4 0 t 5 0" stroke="white" strokeWidth="1.5" fill="none" />
           <circle cx="9" cy="4" r="2" fill="#fff59d" />
        </svg>
     );
  }

  return <span className="w-4 h-4 bg-gray-400 inline-block"></span>;
};

export const Marquee: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="bg-[#000080] text-[#ffff00] font-simsun text-xs py-1 px-2 border-2 border-inset border-gray-400 overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-[marquee_15s_linear_infinite] min-w-full pl-[100%]">
        {text}
      </div>
    </div>
  );
};

export const Separator = () => (
    <div className="border-t border-[#808080] border-b border-white h-[2px] w-full my-2"></div>
);

// New Retro Ad Component
interface AdProps {
  type: 'banner' | 'sidebar' | 'button' | 'grid' | 'ranking';
  variant: 1 | 2 | 3;
  onClick?: () => void;
  onChatEnter?: () => void;
}

export const RetroAd: React.FC<AdProps> = ({ type, variant, onClick, onChatEnter }) => {
  const borderStyle = "border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black";
  
  if (type === 'banner') {
    // 468x60 Banner
    if (variant === 1) {
      // Legend of Mir style ad - Updated with image and better styling
      return (
        <div className={`w-full h-[60px] relative flex items-center justify-between px-2 cursor-pointer overflow-hidden group border-2 border-[#5a5a5a] bg-black`}>
          {/* Background Image */}
          <img 
            src="https://i.ibb.co/sdJqLLv7/image.png" 
            alt="Legend Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          
          {/* Vignette/Gradient to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-0"></div>

          <div className="z-10 flex-1 flex flex-col items-center justify-center pl-4">
             <div className="flex items-end gap-2 leading-none transform skew-x-[-5deg]">
                <span className="text-xl font-black text-[#f1c40f] tracking-tighter drop-shadow-[2px_2px_0_#000]" style={{ fontFamily: "serif" }}>
                  热血传奇
                </span>
                <span className="text-3xl font-black text-[#e74c3c] tracking-widest" style={{ textShadow: "2px 2px 0 #000, 0 0 10px #ff0000", fontFamily: "serif" }}>
                  屠龙宝刀
                </span>
             </div>
             <div className="text-white text-[10px] font-bold mt-1 tracking-wider bg-black/60 px-2 rounded-full border border-gray-600 backdrop-blur-sm">
                <span className="text-[#00ff00] animate-pulse">●</span> <span className="text-white">点击就送</span> <span className="text-yellow-300">麻痹戒指</span> + <span className="text-cyan-300">裁决</span>
             </div>
          </div>
          
          <div className="z-10 ml-2">
             <button 
                onClick={onClick}
                className="bg-gradient-to-b from-[#fcd275] to-[#b78824] border-t-2 border-l-2 border-[#ffeebb] border-b-2 border-r-2 border-[#684606] text-[#421C02] text-xs font-black px-3 py-1 shadow-lg hover:brightness-110 active:border-t-[#684606] active:border-l-[#684606] active:border-b-[#ffeebb] active:border-r-[#ffeebb] active:translate-y-[1px]"
             >
                进入游戏 &gt;&gt;
             </button>
          </div>
        </div>
      );
    }
    // Computer Training Ad - Updated with user image
    return (
       <div className={`w-full h-[160px] bg-[#001030] ${borderStyle} flex items-center justify-between px-4 cursor-pointer overflow-hidden relative group`}>
          {/* Background Image - Scaled using object-cover to handle 1278x527 source */}
          <img 
             src="https://i.ibb.co/zHrDS3LB/3.png" 
             alt="Computer Training Background" 
             className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
          {/* Tech Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000080]/80 via-[#000080]/40 to-transparent z-0"></div>

          {/* Left Content */}
          <div className="z-10 flex flex-col justify-center h-full drop-shadow-md">
             <div className="flex items-baseline gap-2">
                <span className="text-[#ffff00] font-black text-2xl italic tracking-tighter" style={{ textShadow: "2px 2px 0 #000" }}>
                   仙桃电脑培训
                </span>
             </div>
             <div className="text-white text-sm font-bold mt-2 flex gap-2 items-center">
                <div className="bg-blue-900/80 px-2 py-1 border border-white/30 text-cyan-200 shadow-md">五笔</div>
                <div className="w-[2px] h-4 bg-gray-400"></div>
                <div className="bg-blue-900/80 px-2 py-1 border border-white/30 text-cyan-200 shadow-md">办公</div>
                <div className="w-[2px] h-4 bg-gray-400"></div>
                <div className="bg-blue-900/80 px-2 py-1 border border-white/30 text-cyan-200 shadow-md">网页三剑客</div>
             </div>
          </div>
          
          {/* Right Button */}
          <div className="z-10 flex items-center gap-2 mt-8 md:mt-0">
             <button className="bg-red-600 text-white border-2 border-white shadow-[2px_2px_0_#000] px-4 py-2 text-sm font-bold blink hover:bg-red-500 active:translate-y-[1px]">
                包教包会
             </button>
          </div>
       </div>
    );
  }

  if (type === 'grid') {
      const ads = [
        { title: "老中医", sub: "根治疑难", img: "https://i.ibb.co/tMwtHg6H/laozy.png", color: "text-blue-900", badge: "祖传" },
        { title: "挖掘机", sub: "蓝翔技校", img: "https://i.ibb.co/JWdjtNP0/wajj.png", color: "text-red-600", badge: "强" },
        { title: "增高药", sub: "无效退款", img: "https://i.ibb.co/Ndb9y4cm/zengy.png", color: "text-green-800", badge: "热销" },
        { title: "办证刻章", sub: "货到付款", img: "https://i.ibb.co/gF7T0B6X/banzk.png", color: "text-purple-800", badge: "急" },
        { title: "不孕不育", sub: "送子观音", img: "https://i.ibb.co/QFwG0Sv2/buyb.png", color: "text-pink-800", badge: "名医" },
        { title: "金牌月嫂", sub: "专业护理", img: "https://i.ibb.co/qMTfxFVP/yues.png", color: "text-orange-800", badge: "推荐" }
      ];

      return (
          <div className="border border-gray-500 bg-[#fff5ee] mb-2 text-xs font-simsun text-black">
             <div className="bg-[#cc0000] text-white text-center font-bold py-[2px] border-b border-gray-500 flex justify-between px-2 items-center">
                <span className="tracking-widest">商家推荐</span>
                <span className="font-normal text-[10px] text-yellow-200 animate-pulse">广告招租</span>
             </div>
             <div className="grid grid-cols-2 gap-[1px] bg-gray-400 border border-gray-400">
                {ads.map((item, i) => (
                  <div key={i} className={`bg-white p-1 flex flex-col items-center gap-1 cursor-pointer hover:bg-[#ffffe0] hover:ring-2 hover:ring-red-500 hover:z-10 transition-all duration-75 relative group`}>
                      {/* 64x64 Box */}
                      <div className="w-[64px] h-[64px] border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 relative">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                          {/* Fake 'Hot' or overlay */}
                          {item.badge && <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] px-1 leading-3 border-l border-b border-white shadow-sm z-10">{item.badge}</div>}
                      </div>
                      
                      <div className="flex flex-col items-center leading-3 w-full">
                         <span className={`font-bold ${item.color} text-center w-full truncate border-b border-dashed border-gray-300 pb-[1px] mb-[1px]`}>{item.title}</span>
                         <span className="text-gray-500 text-[9px] scale-90 origin-center truncate">{item.sub}</span>
                         {/* Fake button/phone */}
                         <div className="mt-1 bg-blue-50 text-blue-800 border border-blue-200 px-1 text-[9px] rounded-sm hover:bg-blue-600 hover:text-white w-full text-center">
                            点击咨询
                         </div>
                      </div>
                  </div>
                ))}
             </div>
             <div className="bg-[#fff5ee] border-t border-gray-300 text-center text-[9px] text-gray-400 py-[1px]">
                虚假信息举报热线: 110
             </div>
          </div>
      )
  }

  if (type === 'ranking') {
      // Search Ranking Ad
      return (
          <div className="bg-white border border-gray-400 mb-2">
             <div className="bg-[#e0e0e0] border-b border-white px-2 py-1 text-xs text-black shadow-[inset_1px_1px_0_#fff]">
                <div className="flex items-center gap-1 font-bold">
                  <PixelIcon type="fire" />
                  <span>热门搜索榜</span>
                </div>
             </div>
             <ul className="text-xs leading-4 bg-white border-l border-gray-400 border-r border-white border-b border-white text-black">
                {[
                    {text: "流星花园全集", count: 9822, hot: true},
                    {text: "传奇私服外挂", count: 8541, hot: true},
                    {text: "Flash动画下载", count: 6203},
                    {text: "免费个人主页", count: 5122},
                    {text: "周杰伦 龙卷风", count: 4331},
                    {text: "OICQ 聊天室", count: 3201},
                    {text: "windows优化大师", count: 2100},
                    {text: "瑞星杀毒", count: 1899}
                ].map((item, idx) => (
                    <li key={idx} className="cursor-pointer hover:bg-[#000080] hover:text-white group flex justify-between items-center px-1 py-[2px] border-b border-dotted border-gray-200">
                        <div className="truncate w-[100px]">
                            <span className={`inline-block w-3 text-center mr-1 font-mono ${idx < 3 ? 'text-red-600 font-bold group-hover:text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{idx + 1}.</span>
                            <span className={idx < 2 ? 'text-red-600 group-hover:text-white' : 'text-blue-900 group-hover:text-white'}>{item.text}</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono group-hover:text-yellow-200">{item.count}</span>
                    </li>
                ))}
             </ul>
          </div>
      )
  }

  if (type === 'sidebar') {
     // Vertical sidebar ads
     if (variant === 1) {
        return (
           <div 
             className={`w-full ${borderStyle} mb-2 cursor-pointer relative group aspect-[1086/998]`}
             onClick={onClick}
           >
              {/* Full Background Image */}
              <img 
                src="https://i.ibb.co/nNfWqFnf/image.png" 
                alt="Mobile Ad" 
                className="w-full h-full object-fill"
              />
              
              {/* Rogue Ads: Diverse Close Buttons */}
              
              {/* Top-Right: Classic Win95 gray box */}
              <div className="absolute top-[2px] right-[2px] w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black flex items-center justify-center text-black font-bold text-[10px] leading-none z-20 select-none active:border-t-black active:border-l-black active:border-b-white active:border-r-white shadow-sm" onClick={(e) => { e.stopPropagation(); }}>×</div>
              
              {/* Top-Left: Text based "关闭" */}
              <div className="absolute top-0 left-0 bg-white/90 border border-gray-500 px-1 h-4 flex items-center text-[10px] text-black z-20 hover:text-red-600 font-simsun cursor-pointer" onClick={(e) => { e.stopPropagation(); }}>
                 关闭
              </div>

              {/* Bottom-Right: Fake Red Warning Close */}
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-red-600 border border-white text-white font-bold flex items-center justify-center text-xs z-20 hover:bg-red-700" onClick={(e) => { e.stopPropagation(); }}>
                 X
              </div>

              {/* Bottom-Left: Round Circle Black */}
              <div className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-black/80 border border-white flex items-center justify-center text-white text-[9px] z-20 hover:bg-black" onClick={(e) => { e.stopPropagation(); }}>
                 x
              </div>

              {/* Ad Label - adjusted position */}
              <div className="absolute bottom-1 left-5 bg-black/40 text-white text-[9px] px-1 backdrop-blur-[1px] select-none z-10 pointer-events-none">
                广告
              </div>
           </div>
        );
     }
     
     // Dating Club Ad - Revamped for high contrast Y2K look
     if (variant === 2) {
        return (
           <div className={`w-full bg-gradient-to-b from-[#d5006d] to-[#800080] ${borderStyle} p-1 mb-2 text-center cursor-pointer relative overflow-hidden group`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
              
              <div className="relative z-10">
                  <div className="bg-white/20 backdrop-blur-[1px] border border-white/50 mx-2 mt-1 mb-1 p-1 shadow-md">
                      <div className="text-[#ffff00] font-black text-sm blink drop-shadow-[1px_1px_0_#000]">
                         ★ 交友俱乐部 ★
                      </div>
                  </div>
                  
                  <div className="text-xs text-white font-bold leading-4 drop-shadow-md my-2">
                     <span className="text-cyan-200">缘分</span>天空<br/>
                     寻找你的 <span className="text-[#ffff00] border-b border-[#ffff00]">轻舞飞扬</span>
                  </div>
                  
                  <div className="flex justify-center gap-2 mt-1 mb-2">
                     <div className="animate-bounce">
                        <PixelIcon type="heart" />
                     </div>
                     <div className="text-[10px] text-white bg-red-600 px-1 border border-white rotate-[-5deg] shadow-lg flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-400 inline-block animate-pulse"></span>
                        100% 真实
                     </div>
                     <div className="animate-bounce" style={{ animationDelay: '0.1s' }}>
                        <PixelIcon type="heart" />
                     </div>
                  </div>

                  <div className="mt-1 text-[10px] grid grid-cols-2 gap-2 px-1">
                     <button onClick={onChatEnter} className="bg-gradient-to-b from-pink-200 to-pink-400 border-t border-l border-white border-b border-r border-pink-800 text-pink-900 font-bold py-1 shadow active:translate-y-[1px] active:border-t-pink-800">
                        我是MM
                     </button>
                     <button onClick={onChatEnter} className="bg-gradient-to-b from-cyan-200 to-cyan-400 border-t border-l border-white border-b border-r border-cyan-800 text-cyan-900 font-bold py-1 shadow active:translate-y-[1px] active:border-t-cyan-800">
                        我是GG
                     </button>
                  </div>
              </div>
           </div>
        );
     }
  }

  // 88x31 Button
  return (
      <div className={`w-[88px] h-[31px] ${borderStyle} flex flex-col items-center justify-center text-[9px] cursor-pointer leading-none ${variant === 1 ? 'bg-[#ff9900]' : 'bg-[#003399]'}`}>
          {variant === 1 ? (
             <>
               <span className="text-white font-bold tracking-widest text-xs">XML</span>
               <span className="text-yellow-100 scale-75">VALID</span>
             </>
          ) : (
             <>
               <span className="text-white">Get</span>
               <span className="text-yellow-300 font-bold text-xs italic">IE 5.0</span>
             </>
          )}
      </div>
  );
};