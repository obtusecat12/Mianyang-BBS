
import React from 'react';
import { RetroButton, Marquee, PixelIcon } from './RetroUI';

// --- Authentic Assets ---
// Simulated "New" GIF
const GifNew = () => <span className="text-[9px] bg-red-600 text-white px-1 ml-1 animate-pulse">NEW</span>;
const GifHot = () => <span className="text-[9px] bg-yellow-300 text-red-600 border border-red-600 px-1 ml-1 font-bold">HOT</span>;

// A reusable section header component with the classic "Blue Bar" look
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-gradient-to-r from-[#003399] to-[#3366cc] text-white px-2 py-1 text-xs font-bold flex items-center gap-1 border border-[#003399]">
        <div className="w-2 h-2 bg-white rotate-45"></div>
        {title}
        <div className="ml-auto text-[10px] font-normal cursor-pointer hover:underline">MORE &gt;&gt;</div>
    </div>
);

// Course Table adapted for the new style
const CourseTable = () => (
    <table className="w-full border-collapse border border-[#99ccff] text-xs font-simsun text-black bg-white mb-2">
        <thead>
            <tr className="bg-[#e6f2ff] text-[#003399]">
                <th className="border border-[#99ccff] p-1 text-left">招生专业</th>
                <th className="border border-[#99ccff] p-1 text-center w-12">学期</th>
                <th className="border border-[#99ccff] p-1 text-center w-16">学费(元)</th>
                <th className="border border-[#99ccff] p-1 text-left">结业待遇</th>
            </tr>
        </thead>
        <tbody>
            <tr className="hover:bg-[#ffffe0]">
                <td className="border border-[#99ccff] p-1 font-bold text-red-700">办公文秘金牌班 <GifHot/></td>
                <td className="border border-[#99ccff] p-1 text-center">1个月</td>
                <td className="border border-[#99ccff] p-1 text-center font-bold">380</td>
                <td className="border border-[#99ccff] p-1">推荐进写字楼/打字社</td>
            </tr>
            <tr className="hover:bg-[#ffffe0]">
                <td className="border border-[#99ccff] p-1 font-bold text-blue-900">平面广告设计专家班</td>
                <td className="border border-[#99ccff] p-1 text-center">2个月</td>
                <td className="border border-[#99ccff] p-1 text-center font-bold">680</td>
                <td className="border border-[#99ccff] p-1">广告公司任职</td>
            </tr>
            <tr className="hover:bg-[#ffffe0]">
                <td className="border border-[#99ccff] p-1 font-bold text-blue-900">国际互联网(Internet)班</td>
                <td className="border border-[#99ccff] p-1 text-center">1周</td>
                <td className="border border-[#99ccff] p-1 text-center font-bold">150</td>
                <td className="border border-[#99ccff] p-1">学会冲浪/发伊妹儿</td>
            </tr>
            <tr className="hover:bg-[#ffffe0]">
                <td className="border border-[#99ccff] p-1 font-bold text-blue-900">电脑组装维修(硬件)</td>
                <td className="border border-[#99ccff] p-1 text-center">1个月</td>
                <td className="border border-[#99ccff] p-1 text-center font-bold">580</td>
                <td className="border border-[#99ccff] p-1">电脑城技术员</td>
            </tr>
             <tr className="hover:bg-[#ffffe0]">
                <td className="border border-[#99ccff] p-1 font-bold text-purple-800">网页制作三剑客 <GifNew/></td>
                <td className="border border-[#99ccff] p-1 text-center">3个月</td>
                <td className="border border-[#99ccff] p-1 text-center font-bold">980</td>
                <td className="border border-[#99ccff] p-1">深圳/东莞高薪白领</td>
            </tr>
        </tbody>
    </table>
);

export const ComputerTrainingView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    return (
        <div className="min-h-full bg-white font-simsun text-black text-xs leading-[1.5] selection:bg-[#003399] selection:text-white pb-8">
            
            {/* 1. Header Area */}
            <div className="w-full bg-white">
                {/* Top Strip */}
                <div className="bg-[#eeeeee] border-b border-[#cccccc] py-1 px-2 flex justify-between text-[#666666]">
                    <div>您好，欢迎来到仙桃市阳宏电脑职业培训学校！</div>
                    <div className="flex gap-2">
                        <span className="cursor-pointer hover:text-red-600">[设为首页]</span>
                        <span className="cursor-pointer hover:text-red-600">[加入收藏]</span>
                        <span className="cursor-pointer hover:text-red-600 font-bold" onClick={onExit}>[关闭本页]</span>
                    </div>
                </div>

                {/* Banner & Logo Area */}
                <div className="flex items-center gap-4 py-2 px-2 bg-gradient-to-b from-white to-[#f0f8ff]">
                    {/* Retro Logo */}
                    <img 
                        src="https://i.ibb.co/nXFVzMV/biaozhi.png" 
                        alt="Logo" 
                        className="w-24 h-24 object-contain"
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-black text-[#003399] tracking-widest drop-shadow-[1px_1px_0_#ccc]" style={{ fontFamily: 'SimSun' }}>
                            仙桃阳宏电脑培训学校
                        </h1>
                        <div className="text-[#ff0000] font-bold text-sm mt-1 bg-yellow-100 inline-block px-1 border border-yellow-300">
                            市教委批准办学 · 许可证号:0728-001 · 仙桃电脑培训第一品牌
                        </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-[#003399] font-bold">24小时招生热线:</div>
                        <div className="text-2xl font-black text-red-600 font-mono italic">0728-3228888</div>
                        <div className="text-[#666666]">随到随学 · 包教包会 · 推荐工作</div>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="bg-[#003399] border-t-2 border-[#6699ff] border-b-2 border-[#000066] text-white">
                    <div className="flex justify-around items-center h-[28px] font-bold">
                        {['网站首页', '学校简介', '师资力量', '专业设置', '学员作品', '就业明星', '网上报名', '招贤纳士', '校长信箱'].map((item, i) => (
                            <div key={i} className="cursor-pointer hover:bg-[#ff9900] h-full flex items-center px-4 transition-colors">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrolling Marquee */}
                <div className="bg-[#fffacd] border-b border-[#e6db55] text-red-600 py-1 flex items-center">
                    <span className="px-2 font-bold whitespace-nowrap text-black">【最新公告】</span>
                    <Marquee text="热烈祝贺我校第28期学员在全国计算机等级考试中通过率达98%！暑期速成班火热报名中，前50名报名送5张3.5英寸软盘！学电脑，到阳宏，高薪工作不是梦！" />
                </div>
            </div>

            {/* 2. Main Layout (Left Sidebar + Center + Right) */}
            <div className="p-2 flex flex-col md:flex-row gap-2 bg-[#f2f2f2]">
                
                {/* --- Left Sidebar (180px) --- */}
                <div className="w-full md:w-[180px] shrink-0 flex flex-col gap-2">
                    
                    {/* Principal Box */}
                    <div className="border border-[#99ccff] bg-white">
                        <SectionHeader title="校长致辞" />
                        <div className="p-2 text-center">
                             <div className="border border-[#ccc] p-1 mb-2 inline-block shadow-md bg-white">
                                 {/* Pixelated "Official Photo" */}
                                 <img 
                                    src="https://i.ibb.co/KcCnz0ff/Gemini-Generated-Image-4wervo4wervo4wer.png" 
                                    className="w-[100px] h-[120px] object-cover" 
                                    alt="Principal" 
                                 />
                             </div>
                             <div className="font-bold text-[#003399]">张阳宏</div>
                             <p className="text-left text-[#666] mt-2 leading-4 text-[11px] indent-2">
                                走进新世纪，电脑是必备技能。拥有一技之长，走遍天下都不怕。阳宏承诺：让每一个走进校门的人，都能笑着走上工作岗位！
                             </p>
                        </div>
                    </div>

                    {/* Quick Menu */}
                    <div className="border border-[#99ccff] bg-white">
                        <SectionHeader title="快速通道" />
                        <ul className="text-[#003399] leading-6 p-1">
                            <li className="border-b border-dotted border-[#ccc] hover:bg-[#e6f2ff] cursor-pointer flex items-center">
                                <span className="text-orange-500 mr-1">▪</span> 免费试听申请
                            </li>
                            <li className="border-b border-dotted border-[#ccc] hover:bg-[#e6f2ff] cursor-pointer flex items-center">
                                <span className="text-orange-500 mr-1">▪</span> 历届学员查询
                            </li>
                            <li className="border-b border-dotted border-[#ccc] hover:bg-[#e6f2ff] cursor-pointer flex items-center">
                                <span className="text-orange-500 mr-1">▪</span> 职业资格证查询
                            </li>
                            <li className="border-b border-dotted border-[#ccc] hover:bg-[#e6f2ff] cursor-pointer flex items-center">
                                <span className="text-orange-500 mr-1">▪</span> 网上报名优惠
                            </li>
                            <li className="border-b border-dotted border-[#ccc] hover:bg-[#e6f2ff] cursor-pointer flex items-center">
                                <span className="text-orange-500 mr-1">▪</span> 下岗职工再就业
                            </li>
                        </ul>
                    </div>

                    {/* Contact - Vertical */}
                    <div className="border border-[#ffcccc] bg-[#fff5f5]">
                        <div className="bg-[#cc0000] text-white px-2 py-1 font-bold text-xs text-center">
                            联系我们
                        </div>
                        <div className="p-2 text-[#333] leading-5">
                            <p><b>校址:</b> 仙桃市大新路青少年宫4楼(新华书店旁)</p>
                            <p><b>电话:</b> 0728-3228888</p>
                            <p><b>传呼:</b> 191-8866558</p>
                            <p><b>Q Q:</b> 888888</p>
                            <div className="mt-1 border-t border-red-200 pt-1 text-red-600 text-center font-bold animate-pulse">
                                市内乘3路、5路公汽<br/>青少年宫站下车即到
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Center Content (Fluid) --- */}
                <div className="flex-1 flex flex-col gap-2">
                    
                    {/* Welcome / Intro */}
                    <div className="border border-[#99ccff] bg-white p-2 flex gap-3">
                         <div className="w-[120px] shrink-0 border border-[#ccc] p-1 bg-white shadow-sm">
                             {/* School Building Placeholder */}
                             <img 
                                src="https://i.ibb.co/Vc1rqzsM/jifang.png" 
                                alt="机房实景"
                                className="w-full h-[90px] object-cover"
                             />
                             <div className="text-center text-[10px] mt-1 text-[#666]">奔腾III多媒体电脑</div>
                         </div>
                         <div className="flex-1">
                             <h2 className="text-sm font-bold text-[#003399] border-b-2 border-[#ff9900] mb-2 pb-1 inline-block">
                                 学校简介 / About Us
                             </h2>
                             <p className="indent-8 text-[#333] leading-5 text-justify">
                                 <span className="text-red-600 font-bold">仙桃阳宏电脑培训学校</span>是仙桃市成立最早、规模最大的电脑专业培训机构。
                                 学校拥有最新配置的<span className="font-bold">586多媒体电脑</span>80余台，10M光纤专线接入Internet。
                                 特聘武汉高校资深讲师任教，全天候空调开放，一人一机。
                                 <br/>
                                 <span className="bg-yellow-200 text-black px-1">郑重承诺：</span>
                                 一期不会，下期免费重学，学会为止！入学即签订《就业安置协议》，毕业后100%安置到广东、上海或本地工作！
                             </p>
                         </div>
                    </div>

                    {/* Course List Table */}
                    <div className="border border-[#99ccff] bg-white">
                        <SectionHeader title="金牌专业推荐" />
                        <div className="p-2">
                             <CourseTable />
                             <div className="text-right text-red-600 font-bold mt-1">
                                 * 凡网上报名者，学费立减50元！两人同报各减80元！
                             </div>
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="flex flex-col md:flex-row gap-2">
                        {/* School News - Expanded to full width since Student Works is removed */}
                        <div className="flex-1 border border-[#99ccff] bg-white">
                            <SectionHeader title="学校动态" />
                            <ul className="p-2 leading-5 list-none">
                                <li className="truncate flex"><span className="text-[#003399] mr-1">·</span> <a href="#" className="hover:text-red-600 hover:underline">热烈祝贺我校学员张伟通过Adobe认证</a> <span className="text-[#999] ml-auto">05-20</span></li>
                                <li className="truncate flex"><span className="text-[#003399] mr-1">·</span> <a href="#" className="hover:text-red-600 hover:underline">紧急通知：关于防范"爱虫"病毒的公告</a> <span className="text-[#999] ml-auto">05-08</span></li>
                                <li className="truncate flex"><span className="text-[#003399] mr-1">·</span> <a href="#" className="hover:text-red-600 hover:underline">喜报：广东东莞步步高电子厂来校招聘</a> <span className="text-[#999] ml-auto">04-28</span></li>
                                <li className="truncate flex"><span className="text-[#003399] mr-1">·</span> <a href="#" className="hover:text-red-600 hover:underline">我校新增“Flash 4.0动画设计”课程</a> <span className="text-[#999] ml-auto">04-15</span></li>
                                <li className="truncate flex"><span className="text-[#003399] mr-1">·</span> <a href="#" className="hover:text-red-600 hover:underline">关于举办第三届“五笔打字比赛”的通知</a> <span className="text-[#999] ml-auto">04-02</span></li>
                                <li className="truncate flex"><span className="text-[#003399] mr-1">·</span> <a href="#" className="hover:text-red-600 hover:underline">Office 2000办公自动化速成班周末开课</a> <span className="text-[#999] ml-auto">03-25</span></li>
                                <li className="truncate flex"><span className="text-[#003399] mr-1">·</span> <a href="#" className="hover:text-red-600 hover:underline">祝贺我校王校长被评为市十大杰出青年</a> <span className="text-[#999] ml-auto">03-10</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- Right Sidebar (160px) --- */}
                <div className="w-full md:w-[160px] shrink-0 flex flex-col gap-2">
                    
                    {/* Resources */}
                    <div className="border border-[#99ccff] bg-white">
                        <SectionHeader title="常用软件下载" />
                        <ul className="text-[#003399] leading-5 p-1 text-[11px]">
                             <li className="cursor-pointer hover:underline hover:bg-[#e6f2ff]">· 五笔字型86版</li>
                             <li className="cursor-pointer hover:underline hover:bg-[#e6f2ff]">· KV3000杀毒盘</li>
                             <li className="cursor-pointer hover:underline hover:bg-[#e6f2ff]">· WPS 2000 个人版</li>
                             <li className="cursor-pointer hover:underline hover:bg-[#e6f2ff]">· CCE 2000 中文平台</li>
                             <li className="cursor-pointer hover:underline hover:bg-[#e6f2ff]">· 豪杰超级解霸 5.5</li>
                             <li className="cursor-pointer hover:underline hover:bg-[#e6f2ff]">· 网络蚂蚁 NetAnts</li>
                        </ul>
                    </div>
                    
                    {/* Ad Block - Hardware */}
                    <div className="border border-[#ccc] p-1 bg-white text-center">
                        <img src="https://i.ibb.co/3500krqK/computer.png" alt="computer" className="w-full mb-1 border border-gray-300" />
                        <div className="bg-black text-green-500 font-mono text-xs p-2 mb-1 border-2 border-gray-600 inset-shadow">
                            学生兼容机推荐<br/>
                            <span className="text-white">赛扬366 / 64M<br/>昆腾4.3G / 15寸彩显</span>
                        </div>
                        <div className="text-xs text-red-600 font-bold bg-yellow-100 border border-yellow-300 animate-pulse">
                            惊爆价: 3998元!
                        </div>
                        <div className="text-[9px] mt-1 text-[#666]">送14.4k调制解调器</div>
                    </div>

                    {/* Counter */}
                    <div className="text-center mt-2">
                        <div className="text-[10px] text-[#666]">您是第</div>
                        <div className="border border-[#999] bg-black text-red-600 font-mono text-sm inline-block px-1 tracking-widest">
                            034582
                        </div>
                        <div className="text-[10px] text-[#666]">位访问者</div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 border-t-2 border-[#003399] bg-[#eeeeee] text-center text-[#666] py-4 leading-5 text-[11px]">
                <p>版权所有 (C) 1998-2000 仙桃市阳宏电脑职业培训学校</p>
                <p>校址：湖北省仙桃市大新路青少年宫4楼  邮编：433000</p>
                <p>网页制作：阳宏电脑学校网页班三期学员 <span className="text-blue-800 underline cursor-pointer">[后台管理]</span></p>
                <div className="mt-1">
                    建议使用 IE 5.0 以上浏览器，800x600 分辨率浏览本站效果最佳
                </div>
            </div>
        </div>
    );
};
