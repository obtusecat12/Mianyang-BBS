import React, { useState } from 'react';
import { BevelBox, RetroButton, PixelIcon } from './RetroUI';

export const PersonalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex gap-2 min-h-[400px]">
        {/* Sidebar Menu */}
        <div className="w-[140px] shrink-0 flex flex-col gap-2">
            <div className="border-2 border-white border-r-gray-500 border-b-gray-500 bg-[#dfdfdf] p-1 text-center">
                 <div className="w-[100px] h-[100px] bg-white border border-gray-400 mx-auto mb-2 flex items-center justify-center">
                     {/* Placeholder Avatar */}
                     <PixelIcon type="user" className="scale-[3]" />
                 </div>
                 <div className="font-bold text-xs mb-1">Guest_007</div>
                 <div className="text-[10px] text-gray-600">等级: 游客</div>
                 <div className="text-[10px] text-gray-600">积分: 0</div>
            </div>
            
            <BevelBox title="控制面板" icon="tech">
                <div className="flex flex-col text-xs bg-white">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`text-left px-2 py-1 hover:bg-[#000080] hover:text-white ${activeTab === 'profile' ? 'bg-[#000080] text-white font-bold' : ''}`}
                    >
                        个人资料
                    </button>
                    <button 
                        onClick={() => setActiveTab('inbox')}
                        className={`text-left px-2 py-1 hover:bg-[#000080] hover:text-white ${activeTab === 'inbox' ? 'bg-[#000080] text-white font-bold' : ''}`}
                    >
                        我的收件箱 (0)
                    </button>
                    <button 
                        onClick={() => setActiveTab('friends')}
                        className={`text-left px-2 py-1 hover:bg-[#000080] hover:text-white ${activeTab === 'friends' ? 'bg-[#000080] text-white font-bold' : ''}`}
                    >
                        好友列表
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`text-left px-2 py-1 hover:bg-[#000080] hover:text-white ${activeTab === 'settings' ? 'bg-[#000080] text-white font-bold' : ''}`}
                    >
                        论坛设置
                    </button>
                </div>
            </BevelBox>
        </div>

        {/* Main Content */}
        <div className="flex-1">
            <BevelBox title={
                activeTab === 'profile' ? '编辑个人资料' : 
                activeTab === 'inbox' ? '短消息中心' :
                activeTab === 'friends' ? '我的好友' : '论坛参数设置'
            } icon="edit" className="h-full">
                <div className="bg-white p-4 h-full text-xs">
                    
                    {activeTab === 'profile' && (
                        <div className="flex flex-col gap-3 max-w-[400px]">
                             <div className="flex items-center">
                                 <label className="w-20 text-right mr-2">昵称:</label>
                                 <input type="text" value="Guest_007" disabled className="bg-gray-200 border border-gray-400 px-1 w-40 text-gray-500" />
                                 <span className="ml-2 text-gray-500">(不可修改)</span>
                             </div>
                             <div className="flex items-center">
                                 <label className="w-20 text-right mr-2">Email:</label>
                                 <input type="text" className="bg-white border border-gray-600 px-1 w-40" />
                                 <span className="ml-2 text-red-600">*</span>
                             </div>
                             <div className="flex items-center">
                                 <label className="w-20 text-right mr-2">QQ号码:</label>
                                 <input type="text" className="bg-white border border-gray-600 px-1 w-40" />
                             </div>
                             <div className="flex items-center">
                                 <label className="w-20 text-right mr-2">来自:</label>
                                 <input type="text" className="bg-white border border-gray-600 px-1 w-40" />
                             </div>
                             <div className="flex items-start">
                                 <label className="w-20 text-right mr-2 mt-1">个人签名:</label>
                                 <textarea className="bg-white border border-gray-600 px-1 w-full h-20" placeholder="在这个喧嚣的网海，寻找一份宁静..."></textarea>
                             </div>
                             <div className="pl-20 mt-2">
                                 <RetroButton className="px-4 py-1">保存修改</RetroButton>
                             </div>
                        </div>
                    )}

                    {activeTab === 'inbox' && (
                        <div>
                            <div className="flex justify-between mb-2">
                                <div className="space-x-1">
                                    <RetroButton>写新消息</RetroButton>
                                    <RetroButton>删除选中</RetroButton>
                                </div>
                                <span>容量: 0 / 50</span>
                            </div>
                            <table className="w-full border-collapse border border-gray-400">
                                <thead className="bg-[#f0f0f0]">
                                    <tr>
                                        <th className="border border-gray-400 w-6"></th>
                                        <th className="border border-gray-400 w-10">状态</th>
                                        <th className="border border-gray-400">标题</th>
                                        <th className="border border-gray-400 w-24">发件人</th>
                                        <th className="border border-gray-400 w-24">时间</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-gray-500">
                                            暂无短消息
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'friends' && (
                        <div className="text-center p-8 text-gray-500">
                            您还没有添加任何好友。<br/>
                            在看贴时点击用户头像下方的 [加为好友] 即可添加。
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="flex flex-col gap-2">
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="checkbox" defaultChecked />
                                 显示用户头像
                             </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="checkbox" defaultChecked />
                                 显示用户签名
                             </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="checkbox" defaultChecked />
                                 有新消息时弹出提示
                             </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="checkbox" />
                                 隐身登录
                             </label>
                             <div className="mt-4">
                                 <RetroButton className="px-4">保存设置</RetroButton>
                             </div>
                        </div>
                    )}

                </div>
            </BevelBox>
        </div>
    </div>
  );
};