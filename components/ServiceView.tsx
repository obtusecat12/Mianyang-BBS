import React from 'react';
import { BevelBox, PixelIcon, RetroButton } from './RetroUI';

export const ServiceView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="bg-[#000080] text-white px-2 py-1 font-bold flex justify-between items-center">
         <div className="flex items-center gap-2">
            <PixelIcon type="tech" />
            <span>社区服务中心 (Service Center)</span>
         </div>
         <span className="text-xs font-normal">当前时间: 2000-05-21</span>
      </div>

      <div className="flex gap-2">
         {/* Left Sidebar */}
         <div className="w-[200px] shrink-0 flex flex-col gap-2">
             <BevelBox title="服务导航" icon="folder">
                 <ul className="text-xs leading-6 pl-2">
                     <li className="cursor-pointer hover:text-red-600 hover:underline list-disc ml-4 font-bold text-blue-800">新手上路</li>
                     <li className="cursor-pointer hover:text-red-600 hover:underline list-disc ml-4">论坛版规</li>
                     <li className="cursor-pointer hover:text-red-600 hover:underline list-disc ml-4">申请版主</li>
                     <li className="cursor-pointer hover:text-red-600 hover:underline list-disc ml-4">投诉建议</li>
                     <li className="cursor-pointer hover:text-red-600 hover:underline list-disc ml-4">密码找回</li>
                     <li className="cursor-pointer hover:text-red-600 hover:underline list-disc ml-4">友情链接申请</li>
                 </ul>
             </BevelBox>

             <BevelBox title="联系方式" icon="user">
                 <div className="p-2 text-xs">
                     <p>站长QQ: 123456</p>
                     <p>Email: admin@bbs.cn</p>
                     <p>传真: 0728-1234567</p>
                 </div>
             </BevelBox>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col gap-2">
             <BevelBox title="最新公告" icon="speaker">
                 <div className="p-2 text-xs leading-5 bg-white h-full">
                     <p className="font-bold text-red-600 border-b border-gray-300 mb-1">【置顶】关于严厉打击发布不良信息的公告</p>
                     <p className="indent-8">为了维护本站良好的网络环境，请各位网友严格遵守国家相关法律法规，不得发布色情、暴力、反动等违法信息。违者一律封号处理，并保留移交公安机关的权利。</p>
                     <p className="text-right mt-2 text-gray-500">2000年5月1日 站务组</p>
                 </div>
             </BevelBox>

             <div className="grid grid-cols-2 gap-2">
                <BevelBox title="版主申请条件" icon="file">
                    <div className="p-2 text-xs bg-white h-32 overflow-y-auto">
                        1. 注册时间满3个月。<br/>
                        2. 发贴量超过500。<br/>
                        3. 热爱本版块，有责任心。<br/>
                        4. 每天在线时间不少于2小时。<br/>
                        <div className="text-center mt-2">
                           <RetroButton>下载申请表.doc</RetroButton>
                        </div>
                    </div>
                </BevelBox>
                <BevelBox title="软件下载" icon="file">
                    <div className="p-2 text-xs bg-white h-32">
                        <ul className="list-square pl-4">
                            <li className="cursor-pointer hover:underline text-blue-800">Internet Explorer 5.5</li>
                            <li className="cursor-pointer hover:underline text-blue-800">Foxmail 3.1 正式版</li>
                            <li className="cursor-pointer hover:underline text-blue-800">OICQ 2000 build 0228</li>
                            <li className="cursor-pointer hover:underline text-blue-800">WinZip 8.0 汉化版</li>
                        </ul>
                    </div>
                </BevelBox>
             </div>
             
             {/* FAQ */}
             <BevelBox title="常见问题 (FAQ)" icon="info">
                 <div className="p-2 text-xs bg-white">
                     <p className="font-bold text-blue-800">Q: 为什么我无法发贴？</p>
                     <p className="mb-2 text-gray-600">A: 新注册用户需要等待24小时验证期，或者您的积分不足。</p>
                     
                     <p className="font-bold text-blue-800">Q: 如何修改头像？</p>
                     <p className="mb-2 text-gray-600">A: 请进入“个人服务” -> “控制面板” -> “编辑个人资料”中修改。</p>

                     <p className="font-bold text-blue-800">Q: 什么是威望值？</p>
                     <p className="text-gray-600">A: 威望值代表您在论坛的贡献度，精华贴会增加威望。</p>
                 </div>
             </BevelBox>
         </div>
      </div>
    </div>
  );
};