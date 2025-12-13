import React, { useState, useEffect, useRef } from 'react';

// --- Assets & Icons ---

const Icons = {
  Male: () => <span className="text-blue-600 font-bold font-sans text-[10px]">(♂)</span>,
  Female: () => <span className="text-[#ff0066] font-bold font-sans text-[10px]">(♀)</span>,
  Admin: () => <span className="text-red-600 font-bold text-[10px]">[管]</span>,
};

// Mock Data
const USERS = [
  { name: '轻舞飞扬', gender: 'F', status: 'admin' },
  { name: '痞子蔡', gender: 'M', status: 'guest' },
  { name: '水晶之恋', gender: 'F', status: 'guest' },
  { name: '快乐风男', gender: 'M', status: 'guest' },
  { name: '往事随风', gender: 'M', status: 'guest' },
  { name: '蓝色妖姬', gender: 'F', status: 'guest' },
  { name: 'E网情深', gender: 'M', status: 'guest' },
  { name: '宁静致远', gender: 'F', status: 'guest' },
  { name: '追风少年', gender: 'M', status: 'guest' },
  { name: '紫信笺', gender: 'F', status: 'guest' },
  { name: '网事如烟', gender: 'M', status: 'guest' },
  { name: '小龙女', gender: 'F', status: 'guest' },
  { name: '杨过', gender: 'M', status: 'guest' },
  { name: '一帘幽梦', gender: 'F', status: 'guest' },
  { name: '流星雨', gender: 'M', status: 'guest' },
];

const INITIAL_MESSAGES = [
  { id: 1, type: 'sys', content: '欢迎光临【缘分天空】聊天室，当前在线人数 1314 人。' },
  { id: 2, type: 'sys', content: '请注意文明用语，严禁发布违法信息。' },
  { id: 3, type: 'msg', from: '轻舞飞扬', to: '大家', action: '微笑着说', color: '#ff00ff', content: '大家早上好呀！有没有人想听歌？' },
  { id: 4, type: 'msg', from: '痞子蔡', to: '轻舞飞扬', action: '深情地说', color: '#000080', content: '我想听《也就是吻别》，可以吗？' },
  { id: 5, type: 'msg', from: '快乐风男', to: '大家', action: '大声喊道', color: '#800000', content: '谁有最新的传奇私服IP？私聊我！' },
];

const ACTIONS = ['对', '微笑着对', '深情地对', '愤怒地对', '悄悄地对', '依依不舍地对'];
const COLORS = [
  { name: '黑色', value: '#000000' },
  { name: '红色', value: '#FF0000' },
  { name: '蓝色', value: '#0000FF' },
  { name: '紫色', value: '#800080' },
  { name: '绿色', value: '#008000' },
  { name: '粉色', value: '#FF00FF' },
];

export const LoveChatRoom: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState("大家");
  const [selectedAction, setSelectedAction] = useState("对");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isSecret, setIsSecret] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      type: 'msg',
      from: '我',
      to: selectedUser,
      action: selectedAction + (isSecret ? '(悄悄话)' : ''),
      color: selectedColor,
      content: inputValue
    };
    setMessages([...messages, newMsg]);
    setInputValue("");
    
    // Auto reply simulation
    if (Math.random() > 0.5) {
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'msg',
                from: '轻舞飞扬',
                to: '我',
                action: '微笑着对',
                color: '#ff00ff',
                content: '嘻嘻，你也来啦？'
            }]);
        }, 2000);
    }
  };

  return (
    <div className="w-full h-full bg-[#d6d3ce] font-simsun select-none flex flex-col overflow-hidden text-[12px]">
      
      {/* 1. Header Frame (Banner) */}
      <div className="h-[60px] bg-[#ffccdd] border-b-2 border-white flex justify-between items-center px-4 shrink-0 relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ff6699 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          
          <div className="z-10 flex flex-col">
              <div className="text-xl font-bold text-[#ff0066] drop-shadow-[1px_1px_0_#fff] italic font-serif">
                  缘分天空 <span className="text-sm not-italic text-[#cc0055]">Chat Room</span>
              </div>
              <div className="text-[10px] text-[#cc0055]">
                  相遇是缘，相知是分...
              </div>
          </div>

          <div className="z-10 flex gap-2">
               <div className="bg-white border border-[#ff6699] px-2 py-1 text-[#ff0066] text-xs shadow-sm">
                   当前在线: <span className="font-bold">1314</span> 人
               </div>
               <button 
                  onClick={onExit}
                  className="bg-[#d6d3ce] border-t border-l border-white border-b border-r border-[#404040] px-3 active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-black"
               >
                  退出聊天室
               </button>
          </div>
      </div>

      {/* 2. Main Content Area (Frameset Simulation) */}
      <div className="flex-1 flex min-h-0 bg-[#d6d3ce] p-[2px]">
          
          {/* Left: Chat Display */}
          <div className="flex-1 flex flex-col mr-[2px] border-2 border-inset border-[#808080] bg-white">
              {/* Toolbar */}
              <div className="h-[24px] bg-[#f0f0f0] border-b border-[#c0c0c0] flex items-center px-2 gap-2 text-[11px] text-black">
                  <button className="flex items-center gap-1 hover:text-red-600" onClick={() => setMessages([])}>
                      <span className="w-3 h-3 bg-white border border-gray-400 inline-block"></span> 清屏
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="flex items-center gap-1 hover:text-red-600">
                      <span className="w-3 h-3 bg-white border border-gray-400 inline-block"></span> 保存
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="flex items-center gap-1 hover:text-red-600">
                      <span className="w-3 h-3 bg-white border border-gray-400 inline-block"></span> 滚屏
                  </button>
              </div>

              {/* Message Log */}
              <div className="flex-1 overflow-y-auto p-2 scrollbar-windows font-simsun leading-5" ref={scrollRef}>
                  {messages.map((msg, idx) => (
                      <div key={idx} className="mb-[2px]">
                          {msg.type === 'sys' ? (
                              <div className="text-[#ff0000]">【系统】{msg.content}</div>
                          ) : (
                              <div>
                                  <span className="text-[#008000]">{msg.from}</span>
                                  <span className="text-[#000000] mx-1">{msg.action}</span>
                                  <span className="text-[#008000]">{msg.to}</span>
                                  <span className="text-[#000000]"> 说：</span>
                                  <span style={{ color: msg.color }}>{msg.content}</span>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>

          {/* Right: User List (Pure Text Listbox style) */}
          <div className="w-[160px] flex flex-col border-2 border-inset border-[#808080] bg-white text-black">
              <div className="h-[20px] bg-[#000080] text-white flex items-center justify-center font-bold text-xs">
                  网友列表
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-windows bg-white">
                  {USERS.map((u, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedUser(u.name)}
                        className={`px-1 py-[1px] cursor-pointer hover:bg-[#000080] hover:text-white truncate ${selectedUser === u.name ? 'bg-[#000080] text-white' : ''}`}
                        title={u.name}
                      >
                          {u.status === 'admin' && <Icons.Admin />}
                          <span className="ml-[2px]">{u.name}</span>
                          <span className="ml-[2px] opacity-70 scale-90">{u.gender === 'M' ? <Icons.Male /> : <Icons.Female />}</span>
                      </div>
                  ))}
              </div>
              {/* Bottom Search/Filter */}
              <div className="h-[24px] bg-[#d6d3ce] border-t border-[#808080] p-1 flex">
                  <input type="text" placeholder="查找网友" className="w-full text-[10px] h-[16px] border border-[#808080] bg-white text-black" />
              </div>
          </div>

      </div>

      {/* 3. Bottom Control Panel (Form) */}
      <div className="h-[70px] bg-[#d6d3ce] border-t border-white p-1 shrink-0 flex flex-col gap-1 shadow-[inset_0_1px_0_#d6d3ce] text-black">
          
          {/* Row 1: Dropdowns */}
          <div className="flex items-center gap-1 text-[11px]">
              <span>你</span>
              <select 
                className="h-[20px] border border-[#808080] text-[11px] bg-white text-black"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                  {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <select 
                className="h-[20px] border border-[#808080] text-[11px] min-w-[80px] bg-white text-black"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                  <option value="大家">大家</option>
                  {USERS.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
              </select>
              <span>说：</span>
              
              <div className="ml-auto flex items-center gap-2">
                 <label className="flex items-center gap-1 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="w-3 h-3 bg-white"
                        checked={isSecret}
                        onChange={(e) => setIsSecret(e.target.checked)}
                    /> 
                    悄悄话
                 </label>
                 <select 
                    className="h-[20px] border border-[#808080] text-[11px] bg-white text-black"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                 >
                    {COLORS.map(c => <option key={c.value} value={c.value} style={{color: c.value}}>{c.name}</option>)}
                 </select>
              </div>
          </div>

          {/* Row 2: Input & Send */}
          <div className="flex gap-1 h-[26px]">
              <input 
                type="text" 
                className="flex-1 border-2 border-inset border-[#808080] px-1 text-[12px] bg-white text-black"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="px-4 border-t border-l border-white border-b border-r border-[#404040] bg-[#d6d3ce] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-xs text-black"
              >
                  发送!
              </button>
          </div>

      </div>

      <style>{`
        .scrollbar-windows::-webkit-scrollbar {
            width: 16px;
            background: #f0f0f0;
        }
        .scrollbar-windows::-webkit-scrollbar-track {
            background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZTBlMGUwIi8+PHJlY3QgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg==");
        }
        .scrollbar-windows::-webkit-scrollbar-thumb {
            background-color: #d4d0c8;
            border: 1px solid #f0f0f0;
            border-right-color: #404040;
            border-bottom-color: #404040;
        }
        .scrollbar-windows::-webkit-scrollbar-button {
            background-color: #d4d0c8;
            width: 16px;
            height: 16px;
            border: 1px solid #f0f0f0;
            border-right-color: #404040;
            border-bottom-color: #404040;
            display: block;
        }
      `}</style>
    </div>
  );
};