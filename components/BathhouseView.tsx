
import React, { useState, useEffect } from 'react';

// Sub-component for the Lotus Pond Details (Blog Style)
const LotusPoolDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const pools = [
    {
      name: "蓬莱大池",
      img: "https://i.ibb.co/gb8YG9HR/big-pool.jpg"
    },
    {
      name: "玉清中池",
      img: "https://i.ibb.co/dw5hN5fk/middle-pool-old.jpg"
    },
    {
      name: "凝脂小池",
      img: "https://i.ibb.co/vx4f3hs7/small-pool-old.jpg"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#fffaf0] animate-fadeIn font-simsun text-[#333]">
        {/* Blog Header / Breadcrumb */}
        <div className="p-2 border-b border-[#d2b48c] bg-[#faebd7] flex justify-between items-center shrink-0 shadow-sm z-10">
             <div className="flex items-center gap-2">
                 <span onClick={onBack} className="cursor-pointer text-[#8b4513] text-xs hover:text-red-600 hover:underline font-bold">[ 返回上级 ]</span>
                 <span className="text-[#8b4513] text-xs">当前位置: 荷花池 &gt; 设施一览</span>
             </div>
             <div className="text-[10px] text-[#8b4513]">2000-05-21 更新</div>
        </div>
        
        {/* Blog Content Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-retro bg-[#fffaf0]">
             {/* Paper Sheet Effect */}
             <div className="max-w-[700px] mx-auto bg-white border border-[#999] p-6 shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                 
                 {/* Article Title */}
                 <h1 className="text-xl md:text-2xl font-black text-center text-[#800000] mb-2 font-serif tracking-widest">
                     碧海蓝天 · 荷花池 · 雅间介绍
                 </h1>
                 
                 <div className="text-center text-[10px] text-gray-500 mb-6 border-b border-gray-300 pb-2">
                     来源: 本站原创 | 摄影: 刘波 | 编辑: WebMaster
                 </div>

                 {/* Article Body */}
                 {pools.map((pool, idx) => (
                    <div key={idx} className="mb-8">
                        {/* Image Container (Uncropped, Styled) */}
                        <div className="mb-3 text-center bg-[#f5f5f5] p-2 border border-[#ddd]">
                             <img 
                                src={pool.img} 
                                alt={pool.name}
                                className="max-w-full h-auto mx-auto border-2 border-white shadow-sm"
                                style={{ display: 'block' }}
                             />
                             <div className="text-[10px] text-gray-500 mt-1 italic font-sans">
                                 (图{idx+1}: {pool.name} 实景拍摄)
                             </div>
                        </div>

                        {/* Separator */}
                        {idx < pools.length - 1 && (
                            <div className="my-6 border-b border-dashed border-[#bbb]"></div>
                        )}
                    </div>
                 ))}

                 {/* Article Footer */}
                 <div className="bg-[#fffacd] border border-[#f0e68c] p-2 mt-8 text-center text-xs text-[#d2691e]">
                     (完) 欢迎各界宾客莅临体验，享受帝王般的尊贵服务！
                 </div>
             </div>
             
             {/* Footer Copyright */}
             <div className="text-center mt-6 text-xs text-gray-400 font-sans">
                 Copyright © 2000 Blue Sea Club. All rights reserved.
             </div>
        </div>
    </div>
  );
};

// Sub-component for the Golden Coast Details
const GoldenCoastDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const pools = [
    {
      name: "人工海浪区",
      img: "https://i.ibb.co/sJv8LY5b/seabench1.jpg"
    },
    {
      name: "阳光沙滩",
      img: "https://i.ibb.co/fGXvMDkj/seabeach2.jpg"
    },
    {
      name: "儿童戏水乐园",
      img: "https://i.ibb.co/FkGPbDsr/seabeach3.jpg"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#e0f7fa] animate-fadeIn font-simsun text-[#333]">
        {/* Blog Header / Breadcrumb */}
        <div className="p-2 border-b border-[#4dd0e1] bg-[#b2ebf2] flex justify-between items-center shrink-0 shadow-sm z-10">
             <div className="flex items-center gap-2">
                 <span onClick={onBack} className="cursor-pointer text-[#006064] text-xs hover:text-red-600 hover:underline font-bold">[ 返回上级 ]</span>
                 <span className="text-[#006064] text-xs">当前位置: 黄金海岸 &gt; 设施一览</span>
             </div>
             <div className="text-[10px] text-[#006064]">2000-05-18 更新</div>
        </div>
        
        {/* Blog Content Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-retro bg-[#e0f7fa]">
             {/* Paper Sheet Effect */}
             <div className="max-w-[700px] mx-auto bg-white border border-[#999] p-6 shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                 
                 {/* Article Title */}
                 <h1 className="text-xl md:text-2xl font-black text-center text-[#006064] mb-2 font-serif tracking-widest">
                     碧海蓝天 · 黄金海岸 · 盛夏体验
                 </h1>
                 
                 <div className="text-center text-[10px] text-gray-500 mb-6 border-b border-gray-300 pb-2">
                     来源: 本站原创 | 摄影: 王建国 | 编辑: WebMaster
                 </div>

                 {/* Article Body */}
                 {pools.map((pool, idx) => (
                    <div key={idx} className="mb-8">
                        {/* Image Container (Uncropped, Styled) */}
                        <div className="mb-3 text-center bg-[#f5f5f5] p-2 border border-[#ddd]">
                             <img 
                                src={pool.img} 
                                alt={pool.name}
                                className="max-w-full h-auto mx-auto border-2 border-white shadow-sm"
                                style={{ display: 'block' }}
                             />
                             <div className="text-[10px] text-gray-500 mt-1 italic font-sans">
                                 (图{idx+1}: {pool.name} 实景拍摄)
                             </div>
                        </div>

                        {/* Separator */}
                        {idx < pools.length - 1 && (
                            <div className="my-6 border-b border-dashed border-[#bbb]"></div>
                        )}
                    </div>
                 ))}

                 {/* Article Footer */}
                 <div className="bg-[#e0f2f1] border border-[#80cbc4] p-2 mt-8 text-center text-xs text-[#00695c]">
                     (完) 仿佛置身夏威夷，足不出户享海滨风情！
                 </div>
             </div>
             
             {/* Footer Copyright */}
             <div className="text-center mt-6 text-xs text-gray-400 font-sans">
                 Copyright © 2000 Blue Sea Club. All rights reserved.
             </div>
        </div>
    </div>
  );
};

export const BathhouseView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [view, setView] = useState<'main' | 'lotus' | 'golden'>('main');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
        className="h-full w-full font-simsun text-xs relative overflow-hidden select-none flex justify-center items-center"
        style={{
            backgroundImage: "url('https://i.ibb.co/sv98r9bj/pool.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto'
        }}
    >
      <style>{`
        /* Pool Tile Pattern for internal areas */
        .bg-pool-tile {
            background-color: #f0faff;
            background-image: 
                linear-gradient(rgba(0, 150, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 150, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        
        .pool-text-shadow {
            text-shadow: 1px 1px 0px #fff, 2px 2px 0px #000080;
        }

        .scrollbar-retro::-webkit-scrollbar {
            width: 10px;
        }
        .scrollbar-retro::-webkit-scrollbar-track {
            background: #e0f7fa;
            border-left: 1px solid #b2ebf2;
        }
        .scrollbar-retro::-webkit-scrollbar-thumb {
            background: #4dd0e1;
            border: 1px solid #0097a7;
            box-shadow: inset 1px 1px 0 rgba(255,255,255,0.5);
        }

        /* Water Caustic Animation */
        @keyframes caustic {
            0% { background-position: 0% 0%; opacity: 0.2; }
            50% { background-position: 100% 50%; opacity: 0.4; }
            100% { background-position: 0% 0%; opacity: 0.2; }
        }
        .water-overlay {
            background: 
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 20%),
                radial-gradient(circle at 10% 20%, rgba(255,255,255,0.3) 0%, transparent 20%);
            background-size: 200% 200%;
            animation: caustic 10s ease infinite;
        }
        
        .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Main Window Container */}
      <div className="w-full max-w-[900px] h-full md:h-[95%] border-2 border-[#fff] shadow-[0_0_20px_rgba(0,255,255,0.2)] flex flex-col bg-[#FFF8DC] relative">
          
          {/* Top Bar (Header) */}
          <div className="bg-gradient-to-b from-[#00b4db] to-[#0083b0] p-[2px] border-b-4 border-[#DAA520] shrink-0 relative z-20">
              <div className="flex justify-between text-white font-bold px-2 py-1 bg-black/10 text-[10px] backdrop-blur-sm border border-white/20">
                  <span className="tracking-widest">欢迎光临 碧海蓝天休闲会所</span>
                  <span className="font-mono text-yellow-100">{time}</span>
                  <span className="cursor-pointer hover:text-yellow-300 hover:underline px-1 font-serif" onClick={onExit}>[ 退出 ]</span>
              </div>
              
              {/* Banner Area */}
              <div className="h-[90px] flex items-center justify-center relative overflow-hidden border-2 border-white m-[2px] bg-[#4facfe]">
                   {/* Abstract Backgrounds */}
                   <div className="absolute inset-0 bg-pool-tile opacity-60"></div>
                   <div className="absolute inset-0 water-overlay"></div>
                   
                   <div className="relative z-10 text-center drop-shadow-xl">
                       <h1 className="text-4xl font-black italic tracking-widest text-white pool-text-shadow font-serif">
                           碧海蓝天
                       </h1>
                       <div className="text-white text-[10px] font-bold tracking-[0.6em] mt-1 uppercase opacity-90" style={{ textShadow: "0 0 5px #00FFFF" }}>
                           休闲洗浴中心
                       </div>
                   </div>
              </div>
          </div>

          {/* Navigation Bar */}
          <div className="grid grid-cols-5 gap-0 border-b-2 border-[#DAA520] bg-[#FFDEAD] text-center font-bold text-[#8B4513] text-xs shrink-0 z-10 relative shadow-md">
              {['网站首页', '桑拿中心', '休闲大厅', '贵宾客房', '在线预订'].map((item, i) => (
                  <div key={i} className="py-2 border-r border-[#DAA520]/40 hover:bg-[#fffacd] hover:text-[#008080] cursor-pointer transition-colors bg-gradient-to-b from-white/40 to-transparent">
                      {item}
                  </div>
              ))}
          </div>

          {/* Main Layout Area */}
          <div className="flex flex-1 min-h-0 relative">
              
              {/* --- Left Sidebar --- */}
              <div className="w-[180px] bg-[#fffaf0] border-r-2 border-[#DAA520] flex flex-col p-3 gap-4 shrink-0 relative overflow-hidden shadow-[inset_-2px_0_10px_rgba(0,0,0,0.05)]">
                  {/* Subtle Tile Pattern on Sidebar */}
                  <div className="absolute inset-0 bg-pool-tile opacity-40 pointer-events-none mix-blend-multiply"></div>

                  {/* Drink Image Card */}
                  <div className="relative z-10 bg-white p-1 border border-[#DAA520] shadow-lg group cursor-pointer rotate-1 hover:rotate-0 transition-transform duration-300">
                      <div className="h-[180px] overflow-hidden relative border border-[#eee]">
                          <img 
                            src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80"
                            alt="Signature Drink"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                          />
                          <div className="absolute top-2 right-2 bg-yellow-300 text-red-600 text-[9px] font-bold px-1 border border-red-500 shadow-sm animate-pulse">
                             今日特价
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                             <span className="text-white text-[10px] font-serif tracking-wider">立即点单</span>
                          </div>
                      </div>
                      <div className="mt-2 text-center pb-1">
                          <div className="font-serif font-bold text-[#006699] text-sm">蓝色夏威夷</div>
                          <div className="text-[9px] text-[#DAA520] tracking-widest uppercase border-t border-[#eee] mt-1 pt-1">休闲饮品</div>
                      </div>
                  </div>

                  {/* Sidebar Info / Amenities */}
                  <div className="relative z-10 flex-1 flex flex-col gap-3 font-serif text-[#5d4037]">
                      <div className="border-b border-[#DAA520]/50 pb-1 font-bold text-center text-xs tracking-wide text-[#8B4513]">
                          服务设施
                      </div>
                      <ul className="text-[10px] space-y-2 pl-3 tracking-wide">
                          {['芬兰干蒸', '热带雨林', '泰式推拿', '棋牌麻将'].map((am, i) => (
                              <li key={i} className="flex items-center gap-2 cursor-pointer hover:text-[#008080] group">
                                 <span className="w-1.5 h-1.5 border border-[#40e0d0] group-hover:bg-[#40e0d0] rounded-full transition-colors"></span>
                                 {am}
                              </li>
                          ))}
                      </ul>

                      <div className="mt-auto bg-[#fff] border border-[#eee] p-2 text-center shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                          <div className="text-[9px] text-gray-500 tracking-wider">今日水温</div>
                          <div className="text-xl font-mono text-[#0099CC] drop-shadow-sm">42°C</div>
                      </div>
                  </div>
              </div>

              {/* --- Main Content --- */}
              <div className="flex-1 overflow-y-auto scrollbar-retro bg-pool-tile relative">
                  <div className="absolute inset-0 water-overlay pointer-events-none z-0 mix-blend-soft-light"></div>
                  
                  {/* Conditional Rendering: Main List or Detail View */}
                  {view === 'main' ? (
                      <div className="p-6 relative z-10 flex flex-col gap-6 animate-fadeIn">
                          {/* Quote Block */}
                          <div className="text-center mb-2">
                              <p className="font-serif italic text-lg text-[#006699]/80 border-b border-[#40e0d0]/30 pb-4 inline-block px-10 tracking-wide">
                                  "洗去一身疲惫，享受健康生活。"
                              </p>
                          </div>

                          {/* Content Cards */}
                          
                          {/* Card 1: Golden Coast */}
                          <div 
                                className="bg-white/90 p-2 shadow-lg border border-white backdrop-blur-sm group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                                onClick={() => setView('golden')}
                          >
                               <div className="h-[180px] bg-gray-100 relative overflow-hidden border border-gray-100">
                                   <img 
                                        src="https://i.ibb.co/qFWPPWmP/unwatermarked-Gemini-Generated-Image-c35glbc35glbc35g.png" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                        alt="Pool"
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/90 via-transparent to-transparent flex items-end p-4 opacity-90">
                                       <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                           <h2 className="text-white font-serif text-xl tracking-wider drop-shadow-md">黄金海岸</h2>
                                           <div className="text-[#80cbc4] text-[9px] uppercase tracking-[0.2em] mt-1">人造海浪</div>
                                       </div>
                                   </div>
                               </div>
                               <div className="p-2 pt-3 flex justify-between items-center text-[#555] text-xs font-serif bg-white">
                                   <span className="italic text-[10px]">水深: 1.2米 - 1.8米</span>
                                   <button className="border border-[#0099CC] text-[#0099CC] px-3 py-1 hover:bg-[#0099CC] hover:text-white transition-colors uppercase text-[9px] tracking-wider">查看详情</button>
                               </div>
                          </div>

                           {/* Card 2: Baroque Pool */}
                           <div className="bg-white/90 p-2 shadow-lg border border-white backdrop-blur-sm group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                               <div className="h-[180px] bg-[#2d2d2d] relative overflow-hidden border border-gray-100">
                                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_#7b1fa2_0%,_#311b92_50%,_#000000_100%)] group-hover:opacity-110 transition-opacity"></div>
                                   
                                   {/* Abstract shapes */}
                                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                                   <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033]/90 via-transparent to-transparent flex items-end p-4 opacity-90">
                                       <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                           <h2 className="text-white font-serif text-xl tracking-wider drop-shadow-md">巴洛克浴场</h2>
                                           <div className="text-[#e1bee7] text-[9px] uppercase tracking-[0.2em] mt-1">尊贵享受</div>
                                       </div>
                                   </div>
                               </div>
                               <div className="p-2 pt-3 flex justify-between items-center text-[#555] text-xs font-serif bg-white">
                                   <span className="italic text-[10px]">精油SPA & 按摩</span>
                                   <button className="border border-[#6a1b9a] text-[#6a1b9a] px-3 py-1 hover:bg-[#6a1b9a] hover:text-white transition-colors uppercase text-[9px] tracking-wider">查看详情</button>
                               </div>
                          </div>

                           {/* Card 3: Lotus Pool (Renamed to Lotus Pond) */}
                           <div 
                                className="bg-white/90 p-2 shadow-lg border border-white backdrop-blur-sm group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                                onClick={() => setView('lotus')}
                           >
                               <div className="h-[180px] bg-[#004d40] relative overflow-hidden border border-gray-100">
                                   <img 
                                      src="https://i.ibb.co/DDhYCNDJ/big-pool2.jpg" 
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                      alt="Lotus Pond"
                                   />

                                   <div className="absolute inset-0 bg-gradient-to-t from-[#00251a]/90 via-transparent to-transparent flex items-end p-4 opacity-90">
                                       <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                           <h2 className="text-white font-serif text-xl tracking-wider drop-shadow-md">荷花池</h2>
                                           <div className="text-[#b2dfdb] text-[9px] uppercase tracking-[0.2em] mt-1">中药养生</div>
                                       </div>
                                   </div>
                               </div>
                               <div className="p-2 pt-3 flex justify-between items-center text-[#555] text-xs font-serif bg-white">
                                   <span className="italic text-[10px]">特色药浴 · 三大汤池</span>
                                   <button className="border border-[#00695c] text-[#00695c] px-3 py-1 hover:bg-[#00695c] hover:text-white transition-colors uppercase text-[9px] tracking-wider">查看详情</button>
                               </div>
                          </div>
                      </div>
                  ) : view === 'lotus' ? (
                      <LotusPoolDetail onBack={() => setView('main')} />
                  ) : (
                      <GoldenCoastDetail onBack={() => setView('main')} />
                  )}
                  
                  {/* Decorative End Marker */}
                  {view === 'main' && (
                      <div className="mt-8 mb-4 text-center text-[#008080]/40 text-[9px] font-serif uppercase tracking-[0.3em]">
                          ~~~ 本页结束 ~~~
                      </div>
                  )}
              </div>
          </div>

          {/* Bottom Bar */}
          <div className="bg-[#D2B48C] border-t-2 border-[#DAA520] p-2 text-center text-[#8B4513] text-[9px] shrink-0 z-20 shadow-inner">
              <span className="mr-4 tracking-wider">版权所有 © 2000 碧海蓝天休闲会所</span>
              <span className="opacity-70 tracking-wider">技术支持: POOLCORE STUDIOS</span>
          </div>

      </div>
    </div>
  );
};
