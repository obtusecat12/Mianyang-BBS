
import React, { useState, useEffect } from 'react';

export const BathhouseView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full font-simsun text-xs relative overflow-y-auto scrollbar-retro select-none bg-pattern">
      <style>{`
        .bg-pattern {
            background-image: url('https://i.ibb.co/wNScYfXm/Gemini-Generated-Image-uqiycguqiycguqiy.png');
            background-repeat: repeat;
            background-size: cover;
        }
        .pool-text-shadow {
            text-shadow: 1px 1px 0px #fff, 2px 2px 0px #000080;
        }
        .scrollbar-retro::-webkit-scrollbar {
            width: 12px;
        }
        .scrollbar-retro::-webkit-scrollbar-track {
            background: #FFF8DC;
            border-left: 1px solid #D2B48C;
        }
        .scrollbar-retro::-webkit-scrollbar-thumb {
            background: #00CED1;
            border: 1px solid #008B8B;
            box-shadow: inset 1px 1px 0 #fff;
        }
        .pool-card-title {
            background: linear-gradient(to right, rgba(0,0,0,0.7), transparent);
        }
      `}</style>

      {/* 主容器：居中布局 */}
      <div className="w-full max-w-[800px] mx-auto border-x-2 border-[#8B4513] min-h-full bg-[#FFF8DC] shadow-lg flex flex-col">
          
          {/* Header Area */}
          <div className="bg-gradient-to-b from-[#0099CC] to-[#006699] p-1 border-b-4 border-[#DAA520]">
              <div className="flex justify-between text-white font-bold px-2 py-1 bg-black/10 text-[10px]">
                  <span>欢迎光临碧海蓝天休闲会所！</span>
                  <span className="font-mono text-yellow-200">{time}</span>
                  <span className="cursor-pointer hover:text-yellow-300 hover:underline px-1" onClick={onExit}>[ 关闭窗口 ]</span>
              </div>
              
              {/* Banner */}
              <div className="h-[100px] flex items-center justify-center relative overflow-hidden bg-[url('https://i.ibb.co/wNScYfXm/Gemini-Generated-Image-uqiycguqiycguqiy.png')] border-2 border-white m-1 bg-cover bg-center">
                   {/* 遮罩层 */}
                   <div className="absolute inset-0 bg-gradient-to-r from-[#000080]/50 to-[#00CED1]/50"></div>
                   
                   <div className="relative z-10 text-center">
                       <h1 className="text-4xl font-black italic tracking-widest text-white pool-text-shadow" style={{ fontFamily: 'SimSun' }}>
                           碧海蓝天
                       </h1>
                       <div className="text-yellow-300 text-lg font-bold tracking-widest mt-1" style={{ textShadow: "1px 1px 0 #000" }}>
                           Blue Sea & Sky Club
                       </div>
                   </div>
              </div>
          </div>

          {/* Navigation - 5 Areas */}
          <div className="grid grid-cols-5 gap-0 border-b-2 border-[#DAA520] bg-[#FFDEAD] text-center font-bold text-[#8B4513] text-xs">
              {['会所首页', '洗浴中心', '休闲广场', '豪华客房', '在线预订'].map((item, i) => (
                  <div key={i} className="py-2 border-r border-[#DAA520] hover:bg-[#FFD700] hover:text-[#800000] cursor-pointer transition-colors bg-gradient-to-b from-white/50 to-transparent">
                      {item}
                  </div>
              ))}
          </div>

          {/* Main Content Area - Full Width */}
          <div className="flex-1 p-4 bg-[#FFF8DC]">
              
              {/* English Quote */}
              <div className="text-center mb-6 px-8">
                  <p className="font-serif italic text-xl text-[#8B4513] border-b border-[#DAA520] pb-4 tracking-wide leading-relaxed">
                      "Water is the driving force of all nature."
                  </p>
                  <p className="text-[#DAA520] text-[10px] mt-1 uppercase tracking-[0.2em]">- Leonardo da Vinci -</p>
              </div>

              {/* Big Picture Display Grid */}
              <div className="flex flex-col gap-6">
                  
                  {/* 1. Golden Coast (Renamed from Fake Beach) */}
                  <div className="border-4 border-[#DAA520] bg-white p-1 shadow-xl group cursor-pointer hover:border-[#FF4500] transition-colors">
                      <div className="relative h-[180px] w-full overflow-hidden bg-black">
                          {/* Real Image */}
                          <img 
                              src="https://i.ibb.co/qFWPPWmP/unwatermarked-Gemini-Generated-Image-c35glbc35glbc35g.png" 
                              alt="Golden Coast"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          
                          {/* Title Overlay */}
                          <div className="absolute bottom-0 left-0 w-full p-2 pool-card-title">
                              <h2 className="text-2xl text-white font-black tracking-widest drop-shadow-md">Golden Coast</h2>
                              <span className="text-yellow-200 text-sm font-bold tracking-widest">黄金海岸</span>
                          </div>
                      </div>
                      <div className="p-2 bg-[#fffaf0] text-[#5d4037] text-sm flex justify-between items-center">
                          <span>Indoor Tropical Sunshine & Real Sand</span>
                          <span className="text-[#FF4500] font-bold border border-[#FF4500] px-2 text-xs rounded-full">HOT</span>
                      </div>
                  </div>

                  {/* 2. Baroque Pool */}
                  <div className="border-4 border-[#DAA520] bg-white p-1 shadow-xl group cursor-pointer hover:border-[#800080] transition-colors">
                      <div className="relative h-[180px] w-full overflow-hidden bg-[#483D8B]">
                          {/* Simulated Image Content */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#9370DB_0%,_#483D8B_100%)] group-hover:scale-105 transition-transform duration-700"></div>
                          <div className="absolute inset-0 border-[20px] border-[#DAA520]/20"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-[#FFD700]/50 rounded-full"></div>
                          
                          {/* Title Overlay */}
                          <div className="absolute bottom-0 left-0 w-full p-2 pool-card-title">
                              <h2 className="text-2xl text-white font-black tracking-widest drop-shadow-md font-serif">Baroque Pool</h2>
                              <span className="text-[#E6E6FA] text-sm font-bold tracking-widest">巴洛克池</span>
                          </div>
                      </div>
                      <div className="p-2 bg-[#fffaf0] text-[#5d4037] text-sm flex justify-between items-center">
                          <span>Royal European Hydrotherapy</span>
                          <span className="text-[#800080] font-bold border border-[#800080] px-2 text-xs rounded-full">VIP</span>
                      </div>
                  </div>

                  {/* 3. Lotus Pool */}
                  <div className="border-4 border-[#DAA520] bg-white p-1 shadow-xl group cursor-pointer hover:border-[#228B22] transition-colors">
                      <div className="relative h-[180px] w-full overflow-hidden bg-[#2F4F4F]">
                          {/* Simulated Image Content */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#006400] to-[#20B2AA] group-hover:scale-105 transition-transform duration-700"></div>
                          {/* Lotus shapes */}
                          <div className="absolute bottom-4 left-10 w-12 h-12 bg-pink-400 rounded-tl-3xl rounded-br-3xl opacity-80 rotate-45"></div>
                          <div className="absolute bottom-8 right-20 w-16 h-16 bg-pink-500 rounded-tr-3xl rounded-bl-3xl opacity-80 -rotate-12"></div>
                          <div className="absolute bottom-[-20px] w-full h-10 bg-[#90EE90]/30 blur-md"></div>

                          {/* Title Overlay */}
                          <div className="absolute bottom-0 left-0 w-full p-2 pool-card-title">
                              <h2 className="text-2xl text-white font-black tracking-widest drop-shadow-md">Lotus Pool</h2>
                              <span className="text-[#98FB98] text-sm font-bold tracking-widest">荷花池</span>
                          </div>
                      </div>
                      <div className="p-2 bg-[#fffaf0] text-[#5d4037] text-sm flex justify-between items-center">
                          <span>Oriental Zen & Herbal Bath</span>
                          <span className="text-[#228B22] font-bold border border-[#228B22] px-2 text-xs rounded-full">RELAX</span>
                      </div>
                  </div>

              </div>
          </div>

          {/* Footer Area */}
          <div className="bg-[#D2B48C] border-t-2 border-[#DAA520] p-4 text-center text-[#8B4513] text-xs mt-auto">
              <p className="font-simsun text-[10px] leading-4 opacity-80">
                  ADD: No.88 Binjiang Road, Xiantao City<br/>
                  TEL: 888-9999 | FAX: 888-8888
              </p>
          </div>

      </div>
    </div>
  );
};
