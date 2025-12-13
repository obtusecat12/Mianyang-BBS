import React, { useState, useEffect } from 'react';
import { SITE_NAME, BOARDS, MOCK_THREADS, SITE_URL } from './constants';
import { Board } from './types';
import { BevelBox, RetroButton, Marquee, PixelIcon, Separator, RetroAd } from './components/RetroUI';
import { LegendOfMirLogin } from './components/LegendOfMirLogin';
import { SohuMall } from './components/SohuMall';
import { LoveChatRoom } from './components/LoveChatRoom';
import { IEFrame } from './components/IEFrame';
import { ServiceView } from './components/ServiceView';
import { DigestView } from './components/DigestView';
import { TradeView } from './components/TradeView';
import { PersonalView } from './components/PersonalView';

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleString());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <BevelBox title="日历 / 时间" icon="calendar" className="text-center text-xs">
        <div className="bg-white p-1 border border-gray-400 inset-shadow font-mono text-black">
           {time.split(' ')[0]}<br/>
           {time.split(' ')[1]}
        </div>
    </BevelBox>
  );
};

const Sidebar = ({ onEnterShop, onEnterChat }: { onEnterShop: () => void, onEnterChat: () => void }) => (
    <div className="w-full md:w-[180px] flex flex-col gap-2 shrink-0">
      
      {/* Login */}
      <BevelBox title="用户登录" icon="user">
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center">
            <span className="w-8">ID:</span>
            <input type="text" className="border border-gray-500 shadow-inner w-full h-5 text-xs px-1 font-simsun bg-white text-black" />
          </div>
          <div className="flex items-center">
            <span className="w-8">PW:</span>
            <input type="password" className="border border-gray-500 shadow-inner w-full h-5 text-xs px-1 bg-white text-black" />
          </div>
          <div className="flex justify-center gap-2 mt-1">
            <RetroButton>登录</RetroButton>
            <RetroButton>注册</RetroButton>
          </div>
        </div>
      </BevelBox>

      {/* Weirdcore Detail: A watching eye in the stats area */}
      {/* Stats */}
      <BevelBox title="站点统计" icon="chart" className="text-xs leading-4 relative overflow-hidden">
        <ul className="list-square pl-4 text-gray-800 relative z-10">
           <li>在线: 128人</li>
           <li>最高: 543人</li>
           <li>会员: 4502位</li>
           <li>新进: <span className="text-blue-800">kk_boy</span></li>
        </ul>
        {/* Hidden Eye */}
        <div className="absolute bottom-1 right-1 opacity-20 hover:opacity-100 transition-opacity">
           <PixelIcon type="eye" />
        </div>
      </BevelBox>
      
      {/* Search Ranking Ad - High CTR area */}
      <RetroAd type="ranking" variant={1} />

      {/* Weirdcore Detail: Void Block */}
      <div className="border border-gray-500 bg-black p-[1px] h-8 flex items-center justify-center cursor-help" title="nodata">
          <span className="text-[10px] text-gray-800 font-mono">...</span>
      </div>

      {/* Grid Ads - The "Yellow Page" look */}
      <RetroAd type="grid" variant={1} />

      {/* Sidebar Ads */}
      <div className="flex flex-col gap-1">
         {/* Nokia Ad - Click to Enter Shop */}
         <RetroAd type="sidebar" variant={1} onClick={onEnterShop} />
         <RetroAd type="sidebar" variant={2} onChatEnter={onEnterChat} />
      </div>

      {/* Calendar */}
      <Clock />
      
      {/* Contact */}
      <div className="border border-black bg-gray-200 p-2 text-xs text-gray-500 text-center relative">
         站长QQ:<br/>
         <span className="text-blue-800 font-bold">123456</span>
         {/* Decoration */}
         <div className="absolute top-1 left-1 opacity-10 pointer-events-none">
            <PixelIcon type="eye" />
         </div>
      </div>

    </div>
);

const TopBanner = ({ onEnterGame }: { onEnterGame: () => void }) => (
    <div className="mb-2 relative">
      <div className="flex justify-between items-end mb-1 px-1">
        {/* Retro Logo Text Art */}
        <div className="flex items-center gap-2">
            <div className="font-black text-4xl text-[#000080] tracking-tighter italic" style={{ textShadow: "2px 2px 0px #fff, 4px 4px 0px #aaa", fontFamily: "'Times New Roman', serif" }}>
            {SITE_NAME}
            </div>
            {/* Weirdcore Detail: Eye next to logo */}
            <div className="animate-pulse opacity-50">
               <PixelIcon type="eye" className="w-6 h-6" />
            </div>
        </div>

        <div className="text-xs font-simsun text-right pb-1">
           <span className="text-red-600 cursor-pointer hover:underline">[设为首页]</span> | 
           <span className="text-blue-600 cursor-pointer hover:underline">[加入收藏]</span> | 
           <span className="text-blue-600 cursor-pointer hover:underline">[联系站长]</span>
        </div>
      </div>
      
      {/* Banner Ad */}
      <div className="mb-2">
         <RetroAd type="banner" variant={1} onClick={onEnterGame} />
      </div>

      <Marquee text="[公告] 系统将于本周五凌晨进行升级维护，请各位网友注意保存文章。文明上网，自律守法。祝大家千禧年快乐！本站招募各版块版主，有意者请联系管理员。" />
    </div>
);

const Navigation = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
    const items = [
        { label: '首页', key: 'home' },
        { label: '社区服务', key: 'service' },
        { label: '精华区', key: 'digest' },
        { label: '同城交易', key: 'trade' },
        { label: '交友中心', key: 'chat' },
        { label: '个人服务', key: 'personal' }
    ];

    return (
        <div className="flex gap-[2px] my-2 bg-[#dfdfdf] p-[2px] border-t border-white border-b border-gray-600">
            {items.map((item) => (
            <RetroButton 
                key={item.key} 
                className="px-2 md:px-3"
                onClick={() => onNavigate(item.key)}
            >
                {item.label}
            </RetroButton>
            ))}
        </div>
    );
};

const BoardList = ({ handleBoardClick }: { handleBoardClick: (board: Board) => void }) => (
    <div className="mb-4">
      {/* Simulated Table Structure */}
      <div className="bg-[#5086b9] text-white px-2 py-1 text-sm font-bold border border-gray-800 flex justify-between items-center bg-gradient-to-r from-[#000080] to-[#5086b9]">
         <span>:: 分类讨论区 ::</span>
         <span className="text-xs font-normal cursor-pointer hover:text-yellow-300">[ - 收起 ]</span>
      </div>
      
      <div className="bg-[#888888] border-l border-r border-b border-gray-800 p-[1px]">
        {/* Simulate <table cellspacing="1"> gap effect */}
        <div className="grid grid-cols-1 gap-[1px] bg-[#888888]">
          <div className="bg-[#dfdfdf] grid grid-cols-[40px_1fr_60px_80px] text-xs text-center py-1 font-bold">
             <div>状态</div>
             <div>版块名称</div>
             <div>文章</div>
             <div>版主</div>
          </div>
          
          {BOARDS.map((board) => (
            <div key={board.id} className="bg-[#f7f7f7] hover:bg-[#ffffe0] grid grid-cols-[40px_1fr_60px_80px] text-xs items-center min-h-[40px]">
              <div className="flex justify-center">
                 <PixelIcon type="folder" />
              </div>
              <div className="p-1 text-left">
                 <div 
                   className="font-bold text-[#000080] text-sm cursor-pointer hover:underline hover:text-red-600"
                   onClick={() => handleBoardClick(board)}
                 >
                   {board.title}
                 </div>
                 <div className="text-gray-600 scale-90 origin-left mt-[2px]">{board.description}</div>
              </div>
              <div className="text-center font-mono">{board.postCount}</div>
              <div className="text-center text-[#000080] p-1 truncate">
                 {board.moderators.map(m => m).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
);

const ThreadList = ({ filterBoardId, activeBoard }: { filterBoardId?: string, activeBoard: Board | null }) => {
    const threads = filterBoardId 
      ? MOCK_THREADS.filter(t => t.boardId === filterBoardId)
      : MOCK_THREADS;
      
    return (
      <div className="mb-4">
        <div className="bg-[#5086b9] text-white px-2 py-1 text-sm font-bold border border-gray-800 flex justify-between bg-gradient-to-r from-[#000080] to-[#5086b9]">
           <span>:: {activeBoard ? activeBoard.title : '最新话题'} ::</span>
           <div className="space-x-2 text-xs text-yellow-200">
              <span className="cursor-pointer hover:text-white hover:underline">[发表新帖]</span>
              <span className="cursor-pointer hover:text-white hover:underline">[刷新]</span>
           </div>
        </div>

        <div className="bg-[#888888] border-l border-r border-b border-gray-800 p-[1px]">
          <div className="grid grid-cols-[1fr] gap-[1px] bg-[#888888]">
             {/* Header */}
             <div className="bg-[#E0F0F9] grid grid-cols-[30px_1fr_80px_40px_40px_80px] text-xs text-center py-1 text-[#000080]">
                <div>状</div>
                <div>主题</div>
                <div>作者</div>
                <div>回</div>
                <div>查</div>
                <div>时间</div>
             </div>

             {/* Rows */}
             {threads.map((thread) => (
               <div key={thread.id} className="bg-[#F7F7F7] hover:bg-[#FFFFE0] grid grid-cols-[30px_1fr_80px_40px_40px_80px] text-xs items-center py-[2px] border-b border-dotted border-gray-300">
                  <div className="text-center">
                     <PixelIcon type={thread.isSticky ? 'sticky' : 'file'} />
                  </div>
                  <div className="px-1 text-left truncate">
                     {thread.isHot && <PixelIcon type="hot" className="mr-1" />}
                     <a href="#" className="text-[#000080] visited:text-[#800080]">
                       {thread.title}
                     </a>
                     {thread.isNew && <PixelIcon type="new" className="ml-1" />}
                  </div>
                  <div className="text-center truncate text-black">{thread.author}</div>
                  <div className="text-center font-mono">{thread.replies}</div>
                  <div className="text-center font-mono text-gray-500">{thread.views}</div>
                  <div className="text-center text-[10px] font-mono text-gray-600">{thread.date.split(' ')[0]}</div>
               </div>
             ))}
             {threads.length === 0 && (
               <div className="bg-[#F7F7F7] p-8 text-center text-gray-500 text-xs">
                 本版块暂无内容
               </div>
             )}
          </div>
        </div>
        
        {/* Pagination simulated */}
        <div className="flex justify-end mt-1 text-xs gap-1 items-center">
           <span>页次: 1/1</span>
           <RetroButton className="px-1">首页</RetroButton>
           <RetroButton className="px-1">上一页</RetroButton>
           <span className="font-bold text-red-600">[1]</span>
           <RetroButton className="px-1">下一页</RetroButton>
           <RetroButton className="px-1">尾页</RetroButton>
        </div>
      </div>
    );
};

const FriendLinks = () => (
     <div className="border border-gray-400 bg-white p-2 mb-4">
        <div className="text-xs font-bold text-gray-700 mb-1 border-b border-gray-300 pb-1 flex items-center gap-1">
          <PixelIcon type="link" />
          友情链接
        </div>
        <div className="flex flex-wrap gap-2">
           <div className="w-[88px] h-[31px] bg-black text-white text-[10px] flex items-center justify-center border border-gray-600 cursor-pointer hover:opacity-80 gap-1">
              <PixelIcon type="netease" />
              网易 163
           </div>
           <div className="w-[88px] h-[31px] bg-[#ff9900] text-white text-[10px] flex items-center justify-center border border-gray-600 cursor-pointer hover:opacity-80 gap-1">
              <PixelIcon type="sina" />
              Sina 新浪
           </div>
           <div className="w-[88px] h-[31px] bg-blue-800 text-white text-[10px] flex items-center justify-center border border-gray-600 cursor-pointer hover:opacity-80 gap-1">
              <PixelIcon type="chinaren" />
              Chinaren
           </div>
           <div className="w-[88px] h-[31px] bg-purple-800 text-white text-[10px] flex items-center justify-center border border-gray-600 cursor-pointer hover:opacity-80 gap-1">
              <PixelIcon type="bhys" />
              碧海银沙
           </div>
           <RetroAd type="button" variant={1} />
           <RetroAd type="button" variant={2} />
        </div>
     </div>
);

const Footer = ({ visitCount }: { visitCount: number }) => (
    <div className="text-center text-xs text-gray-600 mt-6 border-t border-gray-400 pt-2 pb-8 relative">
      <p>免责声明：本站所有内容均来自互联网，版权归原作者所有。</p>
      <p>Copyright &copy; 2000 {SITE_NAME} All Rights Reserved.</p>
      <p>浏览本站请使用 IE5.0 或以上版本，分辨率 800x600 为佳。</p>
      <div className="mt-2 text-gray-400">
         [ 总访问量: {visitCount} ] [ <a href="#" className="text-gray-500">管理入口</a> ]
      </div>
      {/* Weirdcore Detail: Bottom Eye */}
      <div className="absolute right-0 bottom-0 opacity-10">
          <PixelIcon type="eye" />
      </div>
    </div>
);

type ViewState = 'home' | 'board' | 'thread' | 'game' | 'shop' | 'chat' | 'service' | 'digest' | 'trade' | 'personal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const [visitCount] = useState(128848);

  // Derive URL from current state
  const getVirtualUrl = () => {
    switch(currentView) {
      case 'home': return `http://${SITE_URL}/`;
      case 'shop': return 'http://store.sohu.com/';
      case 'game': return 'http://www.mir2.com.cn/index.htm';
      case 'chat': return 'http://chat.mianyangbbs.cn/room.asp?id=love';
      case 'board': return `http://${SITE_URL}/board.asp?id=${activeBoard?.id || 'unknown'}`;
      case 'service': return `http://${SITE_URL}/service.asp`;
      case 'digest': return `http://${SITE_URL}/digest.asp`;
      case 'trade': return `http://${SITE_URL}/trade.asp`;
      case 'personal': return `http://${SITE_URL}/usercp.asp`;
      default: return `http://${SITE_URL}/`;
    }
  };

  const handleBoardClick = (board: Board) => {
    setActiveBoard(board);
    setCurrentView('board');
  };

  const goHome = () => {
    setCurrentView('home');
    setActiveBoard(null);
  };

  const enterGame = () => setCurrentView('game');
  const enterShop = () => setCurrentView('shop');
  const enterChat = () => setCurrentView('chat');
  const exitGameOrShop = () => setCurrentView('home');
  const handleNavNavigate = (view: ViewState) => {
    if (view === 'home') {
        goHome();
    } else {
        setCurrentView(view);
    }
  };

  const renderContent = () => {
    if (currentView === 'game') return <LegendOfMirLogin onExit={exitGameOrShop} />;
    if (currentView === 'shop') return <SohuMall onExit={exitGameOrShop} />;
    if (currentView === 'chat') return <LoveChatRoom onExit={exitGameOrShop} />;

    // Wrap the BBS content in a div that simulates the "Body" of the webpage 
    // to apply the background image and color correctly within the IEFrame.
    return (
      <div className="min-h-full w-full" style={{
          backgroundColor: '#87CEEB',
          backgroundImage: "url('https://i.imgur.com/Qeun7PX.png')",
          backgroundRepeat: 'repeat',
          imageRendering: 'pixelated'
      }}>
        <div className="max-w-[960px] mx-auto p-[4px] bg-[#cccccc] min-h-full shadow-2xl border-l border-r border-white relative">
          <div className="bg-[#eeeeee] p-2 min-h-full border border-gray-500 relative z-10">
            <TopBanner onEnterGame={enterGame} />
            <Navigation onNavigate={handleNavNavigate} />

            {/* Location Breadcrumb */}
            <div className="text-xs my-2 font-simsun flex items-center">
              <PixelIcon type="folder" className="mr-1" />
              当前位置：
              <a href="#" onClick={goHome} className="hover:text-red-600">首页</a> 
              {activeBoard && <span> &gt; {activeBoard.title}</span>}
              {currentView === 'service' && <span> &gt; 社区服务</span>}
              {currentView === 'digest' && <span> &gt; 精华区</span>}
              {currentView === 'trade' && <span> &gt; 同城交易</span>}
              {currentView === 'personal' && <span> &gt; 个人服务</span>}
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                
                {currentView === 'home' && (
                  <>
                    <div className="border border-red-800 bg-[#fff5e6] p-2 text-xs text-red-900 mb-2 leading-5">
                        <div className="flex items-center gap-1">
                          <PixelIcon type="fire" /> 
                          <b>[推荐]</b> 祝贺我市被评为全国文明城市！
                        </div>
                        <div className="flex items-center gap-1">
                          <PixelIcon type="fire" />
                          <b>[热门]</b> 关于举办“新世纪杯”网友征文大赛的通知
                        </div>
                        <div className="flex items-center gap-1">
                          <PixelIcon type="speaker" />
                          <b className="text-blue-800">[广告]</b> <span className="underline cursor-pointer hover:text-red-600">极速网吧新开业，会员充100送50！</span>
                        </div>
                    </div>
                    
                    {/* Mid-page Ad */}
                    <div className="mb-2">
                      <RetroAd type="banner" variant={2} />
                    </div>

                    <BoardList handleBoardClick={handleBoardClick} />
                    <ThreadList filterBoardId={activeBoard?.id} activeBoard={activeBoard} />
                  </>
                )}

                {currentView === 'board' && (
                     <ThreadList filterBoardId={activeBoard?.id} activeBoard={activeBoard} />
                )}

                {/* Sub-Views */}
                {currentView === 'service' && <ServiceView />}
                {currentView === 'digest' && <DigestView />}
                {currentView === 'trade' && <TradeView />}
                {currentView === 'personal' && <PersonalView />}

                {currentView === 'home' && <FriendLinks />}
              </div>

              {/* Right Sidebar */}
              <div className="hidden md:block">
                <Sidebar onEnterShop={enterShop} onEnterChat={enterChat} />
              </div>
              {/* Mobile Sidebar adjustment */}
              <div className="md:hidden">
                <Sidebar onEnterShop={enterShop} onEnterChat={enterChat} />
              </div>
            </div>

            <Footer visitCount={visitCount} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <IEFrame url={getVirtualUrl()} onGoHome={goHome}>
      {renderContent()}
    </IEFrame>
  );
}