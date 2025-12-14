
import React, { useState } from 'react';

// Workaround for missing marquee type definition in JSX.IntrinsicElements
const MarqueeElement = 'marquee' as any;

const Separator = () => <div className="border-b border-dotted border-[#ccc] my-1 w-full"></div>;

// Animated 'New' icon simulating a GIF
const GifNew = () => (
  <span className="inline-block ml-1 text-[9px] text-white bg-red-600 px-[1px] animate-pulse font-bold">NEW</span>
);

const GifHot = () => (
  <img src="data:image/gif;base64,R0lGODlhCwALAIAAAAAAAP///yH5BAEAAAEALAAAAAALAAsAAAIUjI+py+0Po5y02ouz3rz7D4biUQAAOw==" className="inline-block w-3 h-3 ml-1" alt="HOT" style={{ background: 'red' }} /> // Placeholder for a red dot/hot gif
);

// Sidebar Box Component
const SideBox = ({ title, children, color = "orange" }: { title: string, children?: React.ReactNode, color?: "orange" | "blue" | "gray" }) => {
    const borderColor = color === 'orange' ? 'border-[#ff9900]' : color === 'blue' ? 'border-[#003399]' : 'border-[#ccc]';
    const headerBg = color === 'orange' ? 'bg-[#ff9900]' : color === 'blue' ? 'bg-[#003399]' : 'bg-[#e0e0e0]';
    const headerText = color === 'gray' ? 'text-black' : 'text-white';
    
    return (
        <div className={`mb-2 border ${borderColor} w-full bg-white`}>
            <div className={`${headerBg} ${headerText} px-2 py-1 font-bold text-xs flex justify-between items-center`}>
                <span>{title}</span>
            </div>
            <div className="p-1 bg-white">
                {children}
            </div>
        </div>
    )
}

const Comment = ({ user, date, content, score }: { user: string, date: string, content: string, score: number }) => (
    <div className="border-b border-dotted border-[#ccc] py-2 bg-white">
        <div className="flex justify-between bg-[#f0f0f0] px-1 text-[#666]">
            <span>网友：<span className="text-blue-800">{user}</span></span>
            <span>发表于：{date}</span>
        </div>
        <div className="my-1 text-[#333]">
            评分：<span className="text-red-600">{"★".repeat(score)}{"☆".repeat(5-score)}</span>
        </div>
        <div className="indent-4 mb-1">{content}</div>
        <div className="text-right text-[10px] text-blue-800 cursor-pointer">[支持(3)] [反对(0)] [引用]</div>
    </div>
)

// Retro Popup Component
interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  icon?: 'error' | 'info' | 'none';
}

const RetroModal: React.FC<ModalState & { onClose: () => void }> = ({ isOpen, title, content, icon = 'none', onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]" onClick={(e) => { if(e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black shadow-2xl min-w-[300px] max-w-[90vw]">
        {/* Title Bar */}
        <div className="bg-[#000080] text-white px-2 py-1 font-bold text-xs flex justify-between items-center select-none">
            <span>{title}</span>
            <button 
              onClick={onClose} 
              className="bg-[#d4d0c8] text-black w-4 h-4 flex items-center justify-center border border-white border-b-black border-r-black text-[10px] leading-3 active:border-t-black active:border-l-black focus:outline-none"
            >
              ×
            </button>
        </div>
        {/* Content */}
        <div className="p-4 flex gap-3 bg-[#d4d0c8]">
            {icon === 'error' && (
              <div className="w-8 h-8 shrink-0 bg-white border border-gray-500 rounded-full flex items-center justify-center text-red-600 font-bold text-xl select-none">!</div>
            )}
            {icon === 'info' && (
              <div className="w-8 h-8 shrink-0 bg-white border border-gray-500 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl select-none italic">i</div>
            )}
            <div className="text-black text-sm leading-5 break-words flex-1 flex items-center">
               {content}
            </div>
        </div>
        {/* Footer Buttons */}
        <div className="flex justify-center pb-3 px-4 bg-[#d4d0c8]">
            <button 
              onClick={onClose} 
              className="px-6 py-1 text-xs border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-t-black active:border-l-black bg-[#d4d0c8] min-w-[80px] focus:outline-dotted text-black"
            >
              确定
            </button>
        </div>
      </div>
    </div>
  );
};

export const SohuMall: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'comments'>('desc');
  const [pollVoted, setPollVoted] = useState(false);
  const [modal, setModal] = useState<ModalState>({ isOpen: false, title: '', content: null });

  const showBusy = () => {
    setModal({
      isOpen: true,
      title: '提示信息',
      content: '服务器繁忙 (Error 503)\n当前访问人数过多，请稍后再试。',
      icon: 'error'
    });
  };

  const showBuyError = () => {
     setModal({
      isOpen: true,
      title: '交易失败',
      content: (
        <div>
          <p className="font-bold mb-2">订单提交失败！</p>
          <p>支付网关无响应或余额不足。</p>
          <p className="text-[#666] mt-2">错误代码: 0x80004005</p>
        </div>
      ),
      icon: 'error'
    });
  };

  const showZoom = () => {
    setModal({
      isOpen: true,
      title: '图片预览 - 诺基亚 8210',
      content: (
        <div className="flex justify-center items-center bg-white border border-gray-500 p-2">
            <img src="https://i.ibb.co/nNfWqFnf/image.png" alt="Zoom" className="max-w-full max-h-[400px]" />
        </div>
      ),
      icon: 'none'
    });
  };

  return (
    <div className="min-h-full bg-white font-simsun text-xs text-[#000] leading-[1.4] cursor-default">
      <RetroModal {...modal} onClose={() => setModal({ ...modal, isOpen: false })} />

      {/* 1. Top Portal Bar */}
      <div className="bg-[#dcdcdc] border-b border-[#999] py-[2px] px-2 text-[#333]">
        <div className="max-w-[800px] mx-auto flex justify-between">
           <div className="flex gap-2">
              <span className="cursor-pointer hover:text-red-600 hover:underline" onClick={onExit}>&lt;&lt; 返回搜狐首页</span>
              <span>|</span>
              <span className="cursor-pointer hover:text-red-600 hover:underline" onClick={showBusy}>注册新用户</span>
              <span>|</span>
              <span className="cursor-pointer hover:text-red-600 hover:underline" onClick={showBusy}>会员登录</span>
           </div>
           <div className="flex gap-2">
              <span className="cursor-pointer hover:text-red-600 hover:underline">帮助中心</span>
              <span>|</span>
              <span className="cursor-pointer hover:text-red-600 hover:underline">提货查询</span>
              <span>|</span>
              <span className="cursor-pointer hover:text-red-600 hover:underline text-red-600 font-bold">购物车(0)</span>
           </div>
        </div>
      </div>

      {/* 2. Brand Header & Ad Banner */}
      <div className="max-w-[800px] mx-auto py-2 bg-white">
          {/* Top Banner Ad 468x60 - Updated from bg-black to gradient blue */}
          <div className="flex justify-center mb-2">
             <div className="w-[468px] h-[60px] bg-gradient-to-r from-[#000080] to-[#104E8B] text-white flex flex-col items-center justify-center border-2 border-white outline outline-1 outline-[#999] cursor-pointer shadow-sm relative overflow-hidden group">
                {/* Scanline pattern overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100% 2px' }}></div>
                <div className="relative z-10 flex flex-col items-center">
                    <span className="font-bold text-xl text-[#ffff00] italic tracking-widest drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] font-serif group-hover:scale-105 transition-transform">商务通呼机</span>
                    <span className="text-sm font-bold bg-[#cc0000] px-3 mt-1 shadow-sm border border-white/50 tracking-wider">呼机中的战斗机!</span>
                </div>
                {/* Ad badge */}
                <div className="absolute bottom-0 right-0 bg-white/80 text-[#333] text-[9px] px-1">AD</div>
             </div>
          </div>

          <div className="flex items-end justify-between px-2 pb-2">
             <div className="flex items-end gap-1">
                <div className="text-5xl font-black italic text-[#ff9900] tracking-tighter" style={{ fontFamily: 'Times New Roman' }}>SOHU</div>
                <div className="text-3xl font-bold text-black mb-1">商城</div>
                <div className="text-xs text-[#666] mb-2 ml-2 pb-1 border-l pl-2 border-[#999]">
                    <div className="text-red-600 font-bold">足不出户，网上购物！</div>
                    <div>store.sohu.com</div>
                </div>
             </div>
             
             {/* Search Box */}
             <div className="bg-[#ffffe0] border border-[#ff9900] p-1 flex flex-col gap-1 items-end shadow-sm">
                 <div className="flex items-center gap-1">
                    <select className="border border-[#999] text-xs h-[18px] bg-white text-black">
                        <option>所有分类</option>
                        <option>手机通讯</option>
                        <option>IT数码</option>
                    </select>
                    <input type="text" className="border border-[#999] h-[18px] w-32 bg-white text-black" />
                    <button className="bg-[#ff9900] text-white border border-[#cc7a00] px-2 text-xs font-bold h-[20px]">搜 索</button>
                 </div>
                 <div className="text-[10px] text-[#666]">
                    热门: <span className="underline cursor-pointer text-blue-800">诺基亚</span> <span className="underline cursor-pointer text-blue-800">MP3</span> <span className="underline cursor-pointer text-blue-800">Windows 2000</span>
                 </div>
             </div>
          </div>
      </div>

      {/* 3. Orange Navigation Bar */}
      <div className="bg-[#ff9900] border-t border-[#ffcc00] border-b-2 border-[#cc7a00] text-white">
         <div className="max-w-[800px] mx-auto flex items-center h-[24px]">
            {['首页', '手机通讯', '电脑硬件', '数码影音', '软件图书', '鲜花礼品', '拍卖场', '特价区'].map((item, i) => (
               <div key={i} className={`px-3 h-full flex items-center cursor-pointer hover:bg-[#e68a00] border-r border-[#ffad33] font-bold ${i===1 ? 'bg-[#e68a00]' : ''}`}>
                  {item}
               </div>
            ))}
         </div>
      </div>

      {/* 4. Marquee Announcement */}
      <div className="bg-[#ffffcc] border-b border-[#ebdcb2] py-1 text-[#333] overflow-hidden whitespace-nowrap text-xs">
          <div className="max-w-[800px] mx-auto flex items-center px-2">
             <span className="font-bold text-red-600 mr-2">[公告]</span>
             <MarqueeElement scrollamount="3" className="w-full">
                庆祝搜狐商城全新改版！全场免邮费！诺基亚8210现货热销中... 严正打击假冒伪劣商品，承诺假一赔十！本站支持招商银行一网通支付。
             </MarqueeElement>
          </div>
      </div>

      {/* 5. Main Content Area - Table Layout Simulation */}
      <div className="max-w-[800px] mx-auto mt-2 flex gap-2 px-2 pb-8 bg-white">
         
         {/* --- LEFT SIDEBAR (160px) --- */}
         <div className="w-[160px] shrink-0 flex flex-col gap-2">
            
            {/* Login Box */}
            <SideBox title="会员登录" color="blue">
               <div className="flex flex-col gap-1 text-[11px]">
                  <div className="flex items-center justify-between">
                     <span>帐号:</span>
                     <input type="text" className="w-[100px] border border-[#ccc] h-[16px] bg-white text-black" />
                  </div>
                  <div className="flex items-center justify-between">
                     <span>密码:</span>
                     <input type="password" className="w-[100px] border border-[#ccc] h-[16px] bg-white text-black" />
                  </div>
                  <div className="flex justify-center gap-2 mt-1">
                     <button className="bg-[#ddd] border border-[#999] px-2 shadow-sm active:translate-y-[1px] text-black" onClick={showBusy}>登录</button>
                     <button className="bg-[#ddd] border border-[#999] px-2 shadow-sm active:translate-y-[1px] text-black" onClick={showBusy}>注册</button>
                  </div>
                  <div className="text-center mt-1 text-blue-800 underline cursor-pointer" onClick={showBusy}>忘记密码?</div>
               </div>
            </SideBox>

            {/* Categories */}
            <SideBox title="商品分类">
               <ul className="leading-5 pl-1">
                  {['手机 / 配件', '呼机 / 对讲机', '笔记本电脑', '台式机 / 服务器', '电脑外设', '数码相机', '随身听 / MD', 'VCD / DVD', '软件 / 游戏', '办公耗材'].map(c => (
                     <li key={c} className="border-b border-dotted border-[#eee] cursor-pointer hover:text-red-600 hover:bg-[#f9f9f9]">· {c}</li>
                  ))}
               </ul>
            </SideBox>

            {/* Poll */}
            <SideBox title="调查问卷" color="gray">
               <div className="p-1">
                  <div className="font-bold mb-1">您最喜欢的手机品牌?</div>
                  {!pollVoted ? (
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-1 cursor-pointer hover:bg-[#eee]"><input type="radio" name="poll" className="bg-white" /> 诺基亚 (Nokia)</label>
                        <label className="flex items-center gap-1 cursor-pointer hover:bg-[#eee]"><input type="radio" name="poll" className="bg-white" /> 摩托罗拉</label>
                        <label className="flex items-center gap-1 cursor-pointer hover:bg-[#eee]"><input type="radio" name="poll" className="bg-white" /> 爱立信</label>
                        <label className="flex items-center gap-1 cursor-pointer hover:bg-[#eee]"><input type="radio" name="poll" className="bg-white" /> 西门子</label>
                        <div className="text-center mt-1">
                            <button onClick={() => setPollVoted(true)} className="border border-gray-500 bg-white px-2 text-[10px] text-black">投票</button>
                        </div>
                      </div>
                  ) : (
                      <div className="text-center py-2">
                          <div className="text-red-600">感谢您的参与!</div>
                          <div className="text-blue-800 underline cursor-pointer" onClick={() => setPollVoted(false)}>查看结果</div>
                      </div>
                  )}
               </div>
            </SideBox>

            {/* Hot Sales List */}
            <SideBox title="热销排行榜">
                <ol className="list-decimal pl-6 leading-5">
                    <li className="text-red-600 font-bold">诺基亚 8210</li>
                    <li className="text-red-600">摩托罗拉 V998</li>
                    <li className="text-[#333]">Win 98 SE</li>
                    <li className="text-[#333]">商务通</li>
                    <li className="text-[#333]">快译通</li>
                    <li className="text-[#333]">瑞星杀毒2000</li>
                </ol>
            </SideBox>

            <div className="text-center mt-2">
                <img src="https://i.ibb.co/bgsJ9X3/ad-vertical.png" alt="ad" className="border border-[#ccc]" />
            </div>

         </div>

         {/* --- CENTER CONTENT (Main) --- */}
         <div className="flex-1 min-w-0 bg-white">
            
            {/* Breadcrumb */}
            <div className="mb-2 text-[#666]">
                当前位置: <a href="#" className="text-blue-800 underline">商城首页</a> &gt; <a href="#" className="text-blue-800 underline">通讯器材</a> &gt; <a href="#" className="text-blue-800 underline">GSM手机</a> &gt; <span className="text-black font-bold">诺基亚 8210</span>
            </div>

            {/* Product Summary Table */}
            <div className="border border-[#ccc] p-1 bg-white mb-4">
               <div className="bg-[#f7f7f7] border-b border-[#ccc] p-2 font-bold text-sm text-black flex justify-between items-center">
                   <span>诺基亚 (NOKIA) 8210 蓝色 经典款 GSM手机</span>
                   <span className="text-[10px] font-normal text-red-600 bg-yellow-100 border border-red-200 px-1">本周推荐</span>
               </div>
               
               <div className="flex p-2 gap-4">
                   {/* Product Image */}
                   <div className="w-[200px] shrink-0 flex flex-col items-center">
                       <div className="w-[180px] h-[180px] border border-[#eee] flex items-center justify-center p-2 mb-2 bg-white relative">
                          <img src="https://i.ibb.co/nNfWqFnf/image.png" alt="Nokia 8210" className="max-w-full max-h-full object-contain cursor-zoom-in" onClick={showZoom} />
                          <div className="absolute top-1 right-1"><GifHot /></div>
                       </div>
                       <div className="flex gap-2 text-[10px] text-blue-800 underline cursor-pointer">
                          <span onClick={showZoom}>[放大图片]</span>
                          <span onClick={() => alert('已添加到浏览器收藏夹！')}>[推荐给朋友]</span>
                       </div>
                   </div>

                   {/* Pricing & Actions */}
                   <div className="flex-1 flex flex-col gap-2">
                       <div className="text-[#666] leading-5 border-b border-dotted border-[#ccc] pb-2">
                          <li>产地：北京首信</li>
                          <li>上市时间：1999年12月</li>
                          <li>网络类型：GSM 900/1800</li>
                          <li>可选颜色：红色 / 蓝色 / 银色</li>
                       </div>

                       <div className="bg-[#fff9e6] border border-[#ffe0b2] p-2 mt-1">
                          <div className="flex items-baseline gap-2 mb-1">
                             <span className="text-[#666] w-16">市场价格:</span>
                             <span className="line-through">￥3580.00</span>
                          </div>
                          <div className="flex items-baseline gap-2 mb-1">
                             <span className="text-[#666] w-16 font-bold">搜狐特价:</span>
                             <span className="text-2xl font-black text-red-600 font-mono">￥2999.00</span>
                             <GifNew />
                          </div>
                          <div className="flex items-baseline gap-2">
                             <span className="text-[#666] w-16">为您节省:</span>
                             <span className="text-black font-bold">￥581.00</span>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-2 mt-2">
                          <span className="text-[#666]">购买数量:</span>
                          <input type="text" defaultValue="1" className="w-8 border border-[#999] text-center bg-white text-black" />
                          <span className="text-[#666] text-[10px]">(库存: 充足)</span>
                       </div>

                       <div className="flex gap-2 mt-2">
                           <button 
                                onClick={showBuyError}
                                className="bg-[#ff3300] bg-gradient-to-b from-[#ff6600] to-[#cc0000] text-white font-bold px-4 py-1 border-2 border-[#fff] shadow-[2px_2px_0_#999] active:border-[#999] active:shadow-none active:translate-y-[2px]"
                            >
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDRsMi42OCAxMy4zOWEyIDIgMCAwIDAgMiAxLjYxaDkuNzJhMiAyIDAgMCAwIDItMS42MUwyMyA2SDZNMTAgMjFhMiAyIDAgMSAwIDQtNCAyIDIgMiAwIDAgMC00IDQiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==" className="inline-block align-bottom mr-1" />
                                立即购买
                           </button>
                           <button 
                                onClick={() => alert('收藏成功！\n请按 Ctrl+D 添加到书签。')}
                                className="bg-[#eee] text-black border-2 border-[#fff] shadow-[2px_2px_0_#999] px-2 py-1 active:translate-y-[1px]"
                           >
                                加入收藏夹
                           </button>
                       </div>
                       
                       <div className="mt-2 text-[10px] text-[#999]">
                          <p>支付方式: 邮局汇款 / 银行电汇 / 货到付款(北京五环内)</p>
                          <p>配送方式: 中国邮政EMS / 本地快递</p>
                       </div>
                   </div>
               </div>
            </div>

            {/* Content Tabs */}
            <div className="mt-4">
                <div className="flex border-b border-[#ff9900]">
                    <div 
                        className={`px-4 py-1 cursor-pointer border-t-2 border-r border-l ${activeTab === 'desc' ? 'bg-[#ff9900] text-white border-[#ff9900] font-bold' : 'bg-[#f0f0f0] border-[#ccc] text-[#333]'}`}
                        onClick={() => setActiveTab('desc')}
                    >
                        商品介绍
                    </div>
                    <div 
                        className={`px-4 py-1 cursor-pointer border-t-2 border-r ${activeTab === 'specs' ? 'bg-[#ff9900] text-white border-[#ff9900] font-bold' : 'bg-[#f0f0f0] border-[#ccc] text-[#333]'}`}
                        onClick={() => setActiveTab('specs')}
                    >
                        规格参数
                    </div>
                    <div 
                        className={`px-4 py-1 cursor-pointer border-t-2 border-r ${activeTab === 'comments' ? 'bg-[#ff9900] text-white border-[#ff9900] font-bold' : 'bg-[#f0f0f0] border-[#ccc] text-[#333]'}`}
                        onClick={() => setActiveTab('comments')}
                    >
                        网友评论(3)
                    </div>
                </div>
                
                <div className="border border-[#ccc] border-t-0 p-4 min-h-[300px] bg-white">
                    {activeTab === 'desc' && (
                        <div className="leading-6">
                            <h3 className="font-bold text-sm text-[#ff9900] border-b border-[#ccc] mb-2">诺基亚 8210 - 彰显个性，在此刻。</h3>
                            <p className="indent-8 mb-2">
                                诺基亚 8210 是诺基亚公司于1999年推出的一款时尚型手机。它是目前市场上最轻、最小的手机之一，重量仅为79克。
                                凭借其流线型的设计和可更换的Xpress-on™彩壳，8210迅速成为时尚人士的首选。
                            </p>
                            <p className="indent-8 mb-2">
                                无论您身在何处，8210都能让您保持联系。内置的红外接口允许您与兼容的手机或PC无线传输电话簿条目。
                                此外，它还内置了四款精彩的游戏，让您在闲暇时光尽享乐趣。
                            </p>
                            <div className="text-center my-4">
                                <img src="https://i.ibb.co/nNfWqFnf/image.png" className="inline-block border border-black cursor-zoom-in" width="120" onClick={showZoom} />
                                <div className="text-[10px] text-gray-500 mt-1">实物拍摄</div>
                            </div>
                            <div className="bg-[#ffffcc] border border-[#e6db55] p-2 mt-4 text-[#333]">
                                <span className="font-bold">特别提示：</span> 本机支持中文短信输入，不用再受全拼输入的痛苦了！T9输入法让打字如飞！
                            </div>
                        </div>
                    )}

                    {activeTab === 'specs' && (
                        <table className="w-full border-collapse border border-[#ccc]">
                           <tbody>
                              {[
                                  ['品牌', '诺基亚 Nokia'],
                                  ['型号', '8210'],
                                  ['网络频率', 'GSM 900/1800 Mhz'],
                                  ['尺寸', '101.5 × 44.5 × 17.4 mm'],
                                  ['重量', '79 克'],
                                  ['屏幕', '单色液晶屏，绿色背光'],
                                  ['电话簿', '250条'],
                                  ['待机时间', '50 - 150 小时'],
                                  ['通话时间', '2 - 3 小时'],
                                  ['颜色', '红、蓝、黄、绿、白 (可换壳)']
                              ].map(([k, v], i) => (
                                  <tr key={k} className={i % 2 === 0 ? 'bg-[#f0f0f0]' : 'bg-white'}>
                                      <td className="border border-[#ccc] p-1 w-[30%] font-bold text-[#666]">{k}</td>
                                      <td className="border border-[#ccc] p-1">{v}</td>
                                  </tr>
                              ))}
                           </tbody>
                        </table>
                    )}

                    {activeTab === 'comments' && (
                        <div>
                            <div className="bg-[#f9f9f9] p-2 border border-[#eee] mb-4 text-center">
                                <span className="font-bold">综合评分:</span> 
                                <span className="text-red-600 text-lg mx-2">★★★★☆</span> 
                                <span className="text-[#666]">4.5/5.0</span>
                                <button className="ml-4 border border-[#999] bg-white px-2 text-[10px] text-black">我要评论</button>
                            </div>
                            <Comment 
                                user="北京网友" 
                                date="2000-05-18 10:23:45" 
                                score={5}
                                content="太酷了！换了个红色的壳，回头率百分百！就是按键有点小，手大的人按着费劲。" 
                            />
                            <Comment 
                                user="上海小资" 
                                date="2000-05-12 14:20:00" 
                                score={4}
                                content="样子没得说，就是信号有时候不如爱立信好。贪吃蛇很好玩。" 
                            />
                            <Comment 
                                user="广州数码通" 
                                date="2000-04-30 09:15:30" 
                                score={5}
                                content="搜狐发货挺快的，3天就到了。是正品行货，有进网许可证。比商场里便宜了500多块钱，值！" 
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Associated Recommendations */}
            <div className="mt-4 border border-[#ccc]">
                <div className="bg-[#e0e0e0] px-2 py-1 font-bold text-[#333]">看过该商品的人还买了</div>
                <div className="grid grid-cols-4 gap-2 p-2 bg-white">
                    {[
                        {n: '爱立信T28', p: '￥2680', i: 'https://i.ibb.co/TBxVKjyh/Gemini-Generated-Image-aed4t4aed4t4aed4.png'},
                        {n: '摩托罗拉V998', p: '￥3200', i: 'https://i.ibb.co/cSLV81pf/Gemini-Generated-Image-2nr1g62nr1g62nr1.png'},
                        {n: '手机挂绳', p: '￥15', i: 'https://i.ibb.co/ZcW1M2h/bp.png'}, // Placeholder img
                        {n: '充电器', p: '￥80', i: 'https://i.ibb.co/c1m5g1w/cd.png'}, // Placeholder img
                    ].map((item, idx) => (
                        <div key={idx} className="text-center group cursor-pointer">
                            <div className="border border-[#eee] p-1 mb-1 hover:border-[#ff9900]">
                                <img src={item.i} className="h-20 w-full object-contain" />
                            </div>
                            <div className="text-blue-800 underline text-[11px] h-8 overflow-hidden group-hover:text-red-600">{item.n}</div>
                            <div className="text-red-600 font-bold">{item.p}</div>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </div>

      {/* 6. Dense Footer Link Farm */}
      <div className="bg-[#f0f0f0] border-t border-[#ccc] py-4 text-center leading-5 text-[11px] text-[#666]">
         <div className="mb-2 w-[800px] mx-auto grid grid-cols-5 gap-4 text-left">
             <div>
                 <div className="font-bold text-black mb-1">新手指南</div>
                 <div>注册新用户</div>
                 <div>订购流程</div>
                 <div>交易须知</div>
             </div>
             <div>
                 <div className="font-bold text-black mb-1">付款方式</div>
                 <div>邮局汇款</div>
                 <div>银行转账</div>
                 <div>货到付款</div>
             </div>
             <div>
                 <div className="font-bold text-black mb-1">配送方式</div>
                 <div>EMS特快专递</div>
                 <div>普通邮寄</div>
                 <div>上门自提</div>
             </div>
             <div>
                 <div className="font-bold text-black mb-1">售后服务</div>
                 <div>退换货政策</div>
                 <div>保修条款</div>
                 <div>投诉建议</div>
             </div>
             <div>
                 <div className="font-bold text-black mb-1">关于搜狐</div>
                 <div>公司简介</div>
                 <div>加入我们</div>
                 <div>联系方式</div>
             </div>
         </div>
         <Separator />
         <div className="mt-2">
            Copyright © 2000 Sohu.com Inc. All rights reserved. 搜狐公司 版权所有
         </div>
         <div>
            电信与信息服务业务经营许可证：京ICP证000000号
         </div>
         <div className="mt-2 flex justify-center gap-2 grayscale opacity-80">
             <div className="border border-[#999] px-1 bg-white flex items-center gap-1">
                 <div className="w-3 h-3 bg-red-600 rounded-full"></div> 工商网监
             </div>
             <div className="border border-[#999] px-1 bg-white">
                 网上交易保障中心
             </div>
         </div>
      </div>
    </div>
  );
};