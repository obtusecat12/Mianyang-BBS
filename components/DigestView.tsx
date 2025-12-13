import React from 'react';
import { PixelIcon, RetroButton } from './RetroUI';

const DIGEST_ARTICLES = [
    { title: "第一次亲密接触 (全集)", author: "痞子蔡", date: "1999-12-20", category: "网络文学" },
    { title: "Windows 2000 优化指南大全", author: "电脑报", date: "2000-03-15", category: "技术专区" },
    { title: "大话西游经典台词赏析", author: "至尊宝", date: "2000-01-08", category: "影视评论" },
    { title: "论OICQ聊天的艺术", author: "轻舞飞扬", date: "2000-04-01", category: "心情故事" },
    { title: "70后的回忆：我们的小学时光", author: "老男孩", date: "2000-05-04", category: "情感天地" },
    { title: "绝对经典：Photoshop 5.0 滤镜教程", author: "设计大师", date: "2000-02-28", category: "图形设计" },
    { title: "【转】上海宝贝读后感", author: "卫慧迷", date: "2000-03-20", category: "文学书评" },
    { title: "HTML 4.0 基础教程 (适合初学者)", author: "网管", date: "1999-11-11", category: "网页制作" },
];

export const DigestView: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#800000] to-[#ff0000] text-white p-2 border-2 border-white shadow-md mb-2">
            <h1 className="text-2xl font-black italic tracking-widest text-center shadow-black drop-shadow-md">★ 论坛精华区 ★</h1>
            <p className="text-center text-xs mt-1 text-yellow-200">收录本站最精彩的原创文章，转载请注明出处。</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#dfdfdf] border border-gray-400 p-1 flex gap-2 text-xs items-center">
            <span>按分类浏览:</span>
            <select className="border border-gray-600 text-xs h-[18px]">
                <option>全部文章</option>
                <option>网络文学</option>
                <option>技术专区</option>
                <option>情感天地</option>
            </select>
            <span>按时间:</span>
            <select className="border border-gray-600 text-xs h-[18px]">
                <option>2000年</option>
                <option>1999年</option>
            </select>
            <RetroButton>查 询</RetroButton>
        </div>

        {/* List */}
        <div className="bg-white border-2 border-gray-400 p-[2px]">
            <div className="bg-[#000080] text-white grid grid-cols-[40px_1fr_80px_80px_80px] text-xs py-1 text-center font-bold">
                <div></div>
                <div>文章标题</div>
                <div>分类</div>
                <div>作者</div>
                <div>收藏日期</div>
            </div>
            
            <div className="bg-[#f0f0f0]">
                {DIGEST_ARTICLES.map((article, idx) => (
                    <div key={idx} className="grid grid-cols-[40px_1fr_80px_80px_80px] text-xs py-1 items-center border-b border-dotted border-gray-400 hover:bg-[#ffffe0]">
                        <div className="text-center"><PixelIcon type="fire" /></div>
                        <div className="text-blue-800 cursor-pointer hover:underline hover:text-red-600 font-bold truncate pl-2 text-left">
                            {article.title}
                        </div>
                        <div className="text-center text-gray-600">[{article.category}]</div>
                        <div className="text-center">{article.author}</div>
                        <div className="text-center text-gray-500 font-mono">{article.date}</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Bottom Pagination */}
        <div className="flex justify-center mt-2 gap-1 text-xs">
            <span>共 128 篇精华</span>
            <span className="text-blue-800 underline cursor-pointer">[首页]</span>
            <span className="text-blue-800 underline cursor-pointer">[上一页]</span>
            <span className="font-bold text-red-600">1</span>
            <span className="text-blue-800 underline cursor-pointer">[2]</span>
            <span className="text-blue-800 underline cursor-pointer">[3]</span>
            <span className="text-blue-800 underline cursor-pointer">[下一页]</span>
            <span className="text-blue-800 underline cursor-pointer">[尾页]</span>
        </div>
    </div>
  );
};