import React, { useState, useEffect, useRef } from 'react';

// User provided images - DO NOT CHANGE
const GATE_IMG = "https://i.ibb.co/DgjZnKB8/Gemini-Generated-Image-rrq48rrrq48rrrq4.png";
const BG_IMG = "https://i.ibb.co/SwkGkmRR/Gemini-Generated-Image-87k5ej87k5ej87k5.png";

interface Server {
  id: number;
  name: string;
  status: 'full' | 'new';
  region: string;
}

export const LegendOfMirLogin: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [gateOpen, setGateOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Generate 200 servers
    const regions = ['雷霆', '光芒', '烈焰', '疾风', '蜀山', '龙腾', '热血', '传奇', '流云', '皓月'];
    const suffix = ['一区', '二区', '三区', '四区', '五区'];
    
    const serverList: Server[] = Array.from({ length: 200 }, (_, i) => {
      const isLast = i === 199;
      const region = regions[Math.floor(i / 20) % regions.length];
      const sub = suffix[i % suffix.length];
      const num = Math.floor(i / 5) + 1;
      
      return {
        id: i,
        name: isLast ? '【千禧】新纪元(新)' : `${region}${sub}·${num}组`,
        status: isLast ? 'new' : 'full',
        region: region
      };
    });
    
    setServers(serverList);
    // Select the last one (New) by default
    setSelectedServer(serverList[serverList.length - 1]);
    
    // Auto scroll to bottom
    if (listRef.current) {
        setTimeout(() => {
            listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
        }, 100);
    }
  }, []);

  const handleLogin = () => {
    if (gateOpen) return;
    
    setGateOpen(true); // Trigger gate animation
    setLoading(true);
    setShowError(false);
    
    // Simulate network delay and failure
    setTimeout(() => {
      setLoading(false);
      setGateOpen(false); // Close gate
      setShowError(true);
      setErrorMsg("连接服务器失败：服务器人数已满。\n请尝试选择其他线路或购买VIP通道。");
    }, 4500);
  };

  const tabs = ['全部', '雷霆', '光芒', '烈焰', 'VIP区'];

  return (
    <div className="relative w-full min-h-[768px] h-full bg-black flex items-center justify-center overflow-hidden font-simsun select-none text-[12px]">
      {/* Aspect Ratio Container - 1024x768 scale */}
      <div 
        className="relative w-full max-w-[1024px] aspect-[4/3] bg-[#000] shadow-2xl overflow-hidden border border-[#333] cursor-default"
      >
        {/* Background Layer (The Cave/Dungeon revealed after opening) */}
        <div 
            className="absolute inset-0 bg-[#000]"
            style={{
               backgroundImage: `url('${BG_IMG}')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
            }}
        >
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        </div>

        {/* --- The Stone Gate (Left/Right Curtains) --- */}
        
        {/* Left Gate Half */}
        <div 
            className={`absolute top-0 left-0 w-1/2 h-full z-20 border-r border-[#000] shadow-[10px_0_50px_rgba(0,0,0,0.8)] transition-transform duration-[3000ms] ease-in-out ${gateOpen ? '-translate-x-[90%]' : 'translate-x-0'}`}
            style={{
                backgroundImage: `url('${GATE_IMG}')`,
                backgroundSize: '200% 100%',
                backgroundPosition: 'left center'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20"></div>
            
            {/* Left Torch Fire Effect */}
            <div className="absolute left-[18%] top-[45%] w-12 h-24 opacity-90 mix-blend-hard-light pointer-events-none filter contrast-125">
                <div className="absolute inset-0 bg-orange-600 blur-[20px] animate-pulse rounded-full opacity-60"></div>
                <div className="absolute bottom-2 left-2 w-8 h-12 bg-yellow-400 blur-[10px] animate-flame rounded-t-full"></div>
                <div className="absolute bottom-4 left-3 w-4 h-6 bg-white blur-[4px] animate-sparkle rounded-full"></div>
            </div>
        </div>
        
        {/* Right Gate Half */}
        <div 
            className={`absolute top-0 right-0 w-1/2 h-full z-20 border-l border-[#000] shadow-[-10px_0_50px_rgba(0,0,0,0.8)] transition-transform duration-[3000ms] ease-in-out ${gateOpen ? 'translate-x-[90%]' : 'translate-x-0'}`}
            style={{
                backgroundImage: `url('${GATE_IMG}')`,
                backgroundSize: '200% 100%',
                backgroundPosition: 'right center'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/20"></div>

             {/* Right Torch Fire Effect */}
             <div className="absolute right-[18%] top-[45%] w-12 h-24 opacity-90 mix-blend-hard-light pointer-events-none filter contrast-125">
                <div className="absolute inset-0 bg-orange-600 blur-[20px] animate-pulse rounded-full opacity-60" style={{ animationDelay: '0.2s'}}></div>
                <div className="absolute bottom-2 right-2 w-8 h-12 bg-yellow-400 blur-[10px] animate-flame rounded-t-full" style={{ animationDelay: '0.1s'}}></div>
                <div className="absolute bottom-4 right-3 w-4 h-6 bg-white blur-[4px] animate-sparkle rounded-full"></div>
            </div>
        </div>

        {/* Content Layer (UI Elements) */}
        <div className={`absolute inset-0 z-30 flex flex-col justify-between transition-opacity duration-1000 ${gateOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            
            {/* Top Logo Area (Invisible Spacer mostly, but adds shadow) */}
            <div className="h-[15%] w-full"></div>

            {/* Middle Section: Server List & Announcements */}
            <div className="flex-1 flex px-10 gap-4 min-h-0 items-start pt-10">
                
                {/* Left: Server List Container - Classic Window Style */}
                <div className="w-[300px] h-[450px] flex flex-col bg-[#111]/90 border border-[#5d4f34] shadow-[0_0_0_1px_#000,0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-sm relative group">
                    {/* Decorative Corners */}
                    <div className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-[#a08050]"></div>
                    <div className="absolute -top-[3px] -right-[3px] w-2 h-2 border-t border-r border-[#a08050]"></div>
                    <div className="absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b border-l border-[#a08050]"></div>
                    <div className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-[#a08050]"></div>

                    {/* Tabs */}
                    <div className="flex bg-[#2b251a] border-b border-[#5d4f34]">
                        {tabs.map(tab => (
                            <div 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 text-center py-1 cursor-pointer border-r border-[#443a25] text-[#a08050] hover:text-[#fff] hover:bg-[#3e3423] ${activeTab === tab ? 'bg-[#3e3423] text-[#fff] font-bold' : ''}`}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {/* Column Headers */}
                    <div className="flex bg-[#1a150c] text-[#807050] border-b border-[#332b1e] py-1 px-2">
                        <span className="w-[160px]">服务器名称</span>
                        <span className="w-[50px] text-center">状态</span>
                        <span className="flex-1 text-center">网络</span>
                    </div>
                    
                    {/* Scrollable List */}
                    <div 
                        ref={listRef}
                        className="flex-1 overflow-y-scroll scrollbar-mir bg-[#0c0a06] p-1"
                    >
                        {servers.map((server) => (
                            <div 
                                key={server.id}
                                onClick={() => setSelectedServer(server)}
                                className={`
                                    cursor-pointer h-[18px] flex items-center px-1 mb-[1px]
                                    ${selectedServer?.id === server.id 
                                        ? 'bg-[#000080] text-[#fff] outline outline-1 outline-[#4444ff]' 
                                        : 'text-[#bfb39b] hover:bg-[#222] hover:text-[#fff]'}
                                `}
                            >
                                {/* Server Icon */}
                                <span className="mr-1 opacity-80">
                                    {selectedServer?.id === server.id ? '▶' : '·'}
                                </span>
                                <span className={`w-[145px] truncate font-simsun tracking-wide ${server.status === 'new' ? 'text-[#00ff00]' : ''}`}>
                                    {server.name}
                                </span>
                                <span className="w-[50px] text-center scale-90">
                                    {server.status === 'full' ? (
                                        <span className="text-[#ff3333]">爆满</span>
                                    ) : (
                                        <span className="text-[#00ff00]">流畅</span>
                                    )}
                                </span>
                                <span className="flex-1 text-center scale-75 text-[#666]">
                                    {server.status === 'full' ? '...' : 'OK'}
                                </span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Bottom Status Bar */}
                    <div className="h-6 bg-[#1a150c] border-t border-[#332b1e] flex items-center px-2 text-[#665544]">
                        当前选择: <span className="text-[#a08050] ml-2">{selectedServer?.name}</span>
                    </div>
                </div>

                {/* Right: Announcement / Web View */}
                <div className="flex-1 h-[450px] flex flex-col bg-[#111]/80 border border-[#5d4f34] relative p-[1px] shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                    {/* Decorative Corners */}
                    <div className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-[#a08050]"></div>
                    <div className="absolute -top-[3px] -right-[3px] w-2 h-2 border-t border-r border-[#a08050]"></div>
                    <div className="absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b border-l border-[#a08050]"></div>
                    <div className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-[#a08050]"></div>

                    <div className="h-6 bg-[#2b251a] border-b border-[#5d4f34] flex items-center justify-between px-2">
                        <span className="text-[#a08050] font-bold">游戏公告</span>
                        <span className="text-[#665544] cursor-pointer hover:text-white">更多 &gt;&gt;</span>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-mir bg-[#0c0a06] p-4 text-[#aaa] leading-5 font-simsun">
                        <p className="text-[#ffff00] font-bold mb-2">【最新活动】庆祝新服“千禧新纪元”开启！</p>
                        <p className="mb-4 text-[#ddd] indent-2">
                            亲爱的玩家，欢迎来到热血传奇！新服务器将于今日14:00准时开放。
                            上线即送布衣(中)、木剑，前100名到达22级的玩家可获得裁决之杖一把！
                        </p>

                        <p className="text-[#ff3333] font-bold mb-2">【重要通知】关于打击外挂的声明</p>
                        <p className="mb-4 text-[#ddd] indent-2">
                            为了维护公平的游戏环境，我们将严厉打击任何形式的辅助软件。一经发现，永久封号！
                            请各位玩家珍惜账号，远离外挂。
                        </p>

                        <p className="text-[#00ff00] font-bold mb-2">【系统更新】版本 1.76 更新内容</p>
                        <ul className="list-disc pl-5 mb-4 space-y-1 text-[#ccc]">
                            <li>新增地图：苍月岛</li>
                            <li>开放新技能：狮子吼、无极真气、灭天火</li>
                            <li>修复了道士神兽卡墙的BUG</li>
                            <li>调整了祖玛教主的掉落列表</li>
                        </ul>
                        
                        <div className="border-t border-[#333] pt-2 mt-4 text-[#666] text-center">
                            健康游戏忠告<br/>
                            抵制不良游戏，拒绝盗版游戏。<br/>
                            注意自我保护，谨防受骗上当。<br/>
                            适度游戏益脑，沉迷游戏伤身。<br/>
                            合理安排时间，享受健康生活。
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Login Control Bar - Spans full width like the classic bar */}
            <div className="w-full h-[120px] bg-[#000] border-t-2 border-[#443a25] relative flex justify-center items-center bg-pattern-stone shadow-[0_-5px_20px_rgba(0,0,0,1)] z-40">
                 {/* Texture Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-b from-[#3e3423]/30 to-[#1a150c]/80 pointer-events-none"></div>
                 
                 <div className="relative w-[800px] flex items-center justify-between px-8 py-4">
                     
                     {/* Decorative Dragon Pattern Left (CSS Shapes) */}
                     <div className="w-16 h-16 border-2 border-[#5d4f34] rotate-45 flex items-center justify-center opacity-50">
                        <div className="w-10 h-10 border border-[#a08050]"></div>
                     </div>

                     {/* Inputs Area */}
                     <div className="flex gap-6 items-center bg-[#111]/50 p-4 border border-[#3e3423] rounded-sm shadow-inner">
                         <div className="flex flex-col gap-3">
                             <div className="flex items-center group">
                                 <label className="text-[#cbb58c] w-14 text-right pr-2 font-bold drop-shadow-md tracking-widest group-hover:text-[#fff]">帐号</label>
                                 <input type="text" className="w-[180px] bg-[#000] border border-[#6b5837] text-[#e8dcc5] px-2 h-[22px] outline-none focus:border-[#ffd700] focus:bg-[#1a150c] shadow-inner font-mono" />
                             </div>
                             <div className="flex items-center group">
                                 <label className="text-[#cbb58c] w-14 text-right pr-2 font-bold drop-shadow-md tracking-widest group-hover:text-[#fff]">密码</label>
                                 <input type="password" className="w-[180px] bg-[#000] border border-[#6b5837] text-[#e8dcc5] px-2 h-[22px] outline-none focus:border-[#ffd700] focus:bg-[#1a150c] shadow-inner font-mono" />
                             </div>
                         </div>
                         
                         {/* Big Stone Button */}
                         <div className="relative group cursor-pointer" onClick={handleLogin}>
                             <div className="absolute inset-0 bg-[#000] translate-y-1 rounded-sm blur-[2px]"></div>
                             <button 
                                 className="w-[90px] h-[60px] relative bg-[#2b2214] border-2 border-[#8c734b] active:translate-y-[2px] active:border-[#5c4a2e] transition-all overflow-hidden"
                             >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#5c4a2e] via-[#3e3423] to-[#1f190f]"></div>
                                {/* Inner Bevel */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#a08050]/50"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#000]/50"></div>
                                
                                <span className="relative z-10 text-[#f1c40f] font-bold text-lg drop-shadow-[1px_1px_0_#000] group-hover:text-[#fff] transition-colors leading-tight block">
                                    进入<br/>游戏
                                </span>
                             </button>
                         </div>
                     </div>

                     {/* Right Actions */}
                     <div className="flex flex-col gap-2 ml-4">
                        <button className="text-[#8c734b] hover:text-[#ffd700] text-xs underline decoration-dotted">修改密码</button>
                        <button className="text-[#8c734b] hover:text-[#ffd700] text-xs underline decoration-dotted">注册帐号</button>
                        <button className="text-[#8c734b] hover:text-[#ffd700] text-xs underline decoration-dotted">官方网站</button>
                     </div>

                     {/* Decorative Dragon Pattern Right */}
                     <div className="w-16 h-16 border-2 border-[#5d4f34] rotate-45 flex items-center justify-center opacity-50">
                        <div className="w-10 h-10 border border-[#a08050]"></div>
                     </div>

                     <button 
                        onClick={onExit}
                        className="absolute -right-12 bottom-0 text-[#666] hover:text-[#f00] font-bold px-2 py-1 border border-[#333] hover:border-[#f00] bg-black"
                     >
                        退出
                     </button>
                 </div>
            </div>
        </div>
        
        {/* Loading/Gate Opening Flash */}
        {gateOpen && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className="w-[2px] h-full bg-white blur-[4px] animate-pulse opacity-80"></div>
            </div>
        )}

        {/* Error Popup - Windows Style but Mir Themed */}
        {showError && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
                <div className="w-[320px] bg-[#c0c0c0] border-t-2 border-l-2 border-[#fff] border-b-2 border-r-2 border-[#000] p-[2px] shadow-2xl animate-bounce-in">
                    <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center select-none">
                        <span className="font-bold">提示信息</span>
                        <button onClick={() => setShowError(false)} className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center border border-[#fff] border-b-[#000] border-r-[#000] text-[10px] active:border-t-[#000] active:border-l-[#000]">×</button>
                    </div>
                    <div className="p-4 flex gap-3 items-center bg-[#d4d0c8]">
                         <div className="w-8 h-8 bg-white border border-gray-500 rounded-full flex items-center justify-center text-red-600 font-bold text-xl select-none">!</div>
                         <div className="text-black leading-4">
                            {errorMsg}
                         </div>
                    </div>
                    <div className="flex justify-center pb-2 bg-[#d4d0c8]">
                        <button 
                            onClick={() => setShowError(false)}
                            className="px-6 py-1 border-t-2 border-l-2 border-[#fff] border-b-2 border-r-2 border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white bg-[#c0c0c0]"
                        >
                            确定
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>

      <style>{`
        @keyframes flame {
          0%, 100% { transform: scale(1) skewX(0deg); opacity: 0.8; }
          50% { transform: scale(1.1) skewX(2deg); opacity: 1; }
        }
        @keyframes sparkle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }
        .animate-flame {
            animation: flame 2s infinite ease-in-out;
            transform-origin: bottom center;
        }
        .animate-sparkle {
            animation: sparkle 1.5s infinite linear;
        }
        .bg-pattern-stone {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="');
            background-repeat: repeat;
        }
        /* Custom Scrollbar for Mir Theme */
        .scrollbar-mir::-webkit-scrollbar {
            width: 14px;
            background: #000;
            border-left: 1px solid #333;
        }
        .scrollbar-mir::-webkit-scrollbar-track {
            background-color: #0c0a06;
        }
        .scrollbar-mir::-webkit-scrollbar-thumb {
            background: #3e3423;
            border: 1px solid #6b5837;
            box-shadow: inset 1px 1px 0 rgba(255,255,255,0.1);
        }
        .scrollbar-mir::-webkit-scrollbar-button {
            height: 14px;
            background: #2b2214;
            border: 1px solid #6b5837;
            color: #a08050;
        }
        @keyframes bounce-in {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
            animation: bounce-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};
