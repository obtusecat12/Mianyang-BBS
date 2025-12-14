import React from 'react';
import { BevelBox, PixelIcon, RetroButton } from './RetroUI';

const TRADE_ITEMS = [
    { type: 'sell', title: "转让9成新诺基亚5110一部", price: "800元", location: "市中心", user: "手机狂人", date: "05-21" },
    { type: 'buy', title: "求购二手台式机内存条64M", price: "面议", location: "电脑城", user: "DIY高手", date: "05-21" },
    { type: 'sell', title: "出售闲置捷安特山地车", price: "300元", location: "沔阳中学", user: "追风少年", date: "05-20" },
    { type: 'sell', title: "低价处理一批正版VCD碟片", price: "5元/张", location: "文化宫", user: "影音店", date: "05-20" },
    { type: 'buy', title: "诚心求购传奇战士账号，带裁决", price: "高价", location: "网吧", user: "屠龙刀", date: "05-19" },
    { type: 'sell', title: "搬家转让双人床、衣柜", price: "自叫价", location: "建设街", user: "居家男", date: "05-18" },
];

export const TradeView: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 text-black">
        {/* Header */}
        <div className="bg-[#ffcc00] border-2 border-[#cc9900] p-2 flex justify-between items-end">
             <div>
                <h1 className="text-xl font-bold text-[#993300] drop-shadow-sm">沔阳同城交易市场</h1>
                <p className="text-xs text-[#663300]">二手买卖 · 房屋租赁 · 求职招聘 · 方便快捷</p>
             </div>
             <div className="flex gap-2">
                 <RetroButton className="font-bold text-red-600">免费发布信息</RetroButton>
                 <RetroButton>我的发布</RetroButton>
             </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-2 text-xs text-center">
            {['手机通讯', '电脑配件', '家用电器', '交通工具', '房屋信息', '求职招聘', '书籍音像', '其他闲置'].map(cat => (
                <BevelBox key={cat} className="bg-white hover:bg-yellow-50 cursor-pointer text-black">
                    <div className="p-2 font-bold text-blue-800">{cat}</div>
                </BevelBox>
            ))}
        </div>

        {/* Main List */}
        <div className="border border-gray-500 bg-white">
            <div className="bg-[#e0e0e0] border-b border-gray-500 p-1 flex justify-between items-center text-xs">
                <span className="font-bold">最新发布信息</span>
                <div className="flex gap-1">
                    <span className="bg-white border border-gray-400 px-1 cursor-pointer">只看转让</span>
                    <span className="bg-white border border-gray-400 px-1 cursor-pointer">只看求购</span>
                </div>
            </div>
            
            <div className="p-1 text-black">
                <table className="w-full text-xs border-collapse">
                    <thead className="bg-[#f0f0f0] text-[#333]">
                        <tr>
                            <th className="border border-gray-300 py-1 w-10">类型</th>
                            <th className="border border-gray-300 py-1">信息标题</th>
                            <th className="border border-gray-300 py-1 w-20">价格</th>
                            <th className="border border-gray-300 py-1 w-20">地点</th>
                            <th className="border border-gray-300 py-1 w-20">联系人</th>
                            <th className="border border-gray-300 py-1 w-12">时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TRADE_ITEMS.map((item, i) => (
                            <tr key={i} className="hover:bg-[#ffffe0]">
                                <td className="border border-gray-300 text-center py-1">
                                    <span className={item.type === 'sell' ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                                        {item.type === 'sell' ? '[转让]' : '[求购]'}
                                    </span>
                                </td>
                                <td className="border border-gray-300 px-2 py-1 cursor-pointer text-blue-800 hover:underline">
                                    {item.title} {i < 2 && <PixelIcon type="new" />}
                                </td>
                                <td className="border border-gray-300 text-center text-red-600 font-bold">{item.price}</td>
                                <td className="border border-gray-300 text-center text-gray-600">{item.location}</td>
                                <td className="border border-gray-300 text-center">{item.user}</td>
                                <td className="border border-gray-300 text-center text-gray-500 font-mono">{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="bg-[#fff5e6] border border-[#ffcc99] p-2 text-xs text-[#cc6600]">
            <span className="font-bold">交易提醒：</span> 本站仅提供信息发布平台，不介入具体交易。交易时请务必当面查验货物，切勿提前汇款，谨防诈骗！
        </div>
    </div>
  );
};