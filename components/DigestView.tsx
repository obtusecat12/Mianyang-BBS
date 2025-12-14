
import React, { useState } from 'react';
import { PixelIcon, RetroButton } from './RetroUI';
import { DIGEST_DATA, DigestArticle } from './digestData';

const ITEMS_PER_PAGE = 10;

export const DigestView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [readingArticle, setReadingArticle] = useState<DigestArticle | null>(null);
  const [filterYear, setFilterYear] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Filter Logic
  const filteredData = DIGEST_DATA.filter(item => {
      const year = item.date.split('-')[0];
      if (filterYear !== 'all' && year !== filterYear) return false;
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      return true;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Handlers
  const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
          // Scroll to top of list
          document.getElementById('digest-list-top')?.scrollIntoView({ behavior: 'auto' });
      }
  };

  const openArticle = (article: DigestArticle) => {
      setReadingArticle(article);
      // Reset view to top
      window.scrollTo(0, 0);
  };

  const closeArticle = () => {
      setReadingArticle(null);
  };

  // --- Article Reader View ---
  if (readingArticle) {
      return (
          <div className="flex flex-col gap-2 min-h-full">
              {/* Toolbar */}
              <div className="bg-[#dfdfdf] border border-gray-400 p-1 flex justify-between items-center mb-2">
                  <RetroButton onClick={closeArticle}>&lt; 返回列表</RetroButton>
                  <div className="text-xs text-gray-600">
                      精华区存档 / {readingArticle.date.split('-')[0]}年 / {readingArticle.category}
                  </div>
              </div>

              {/* Article Content Box */}
              <div className="border-2 border-white border-r-gray-600 border-b-gray-600 bg-[#fff] p-[2px] shadow-lg">
                  {/* Title Bar */}
                  <div className="bg-[#000080] text-white px-2 py-2 text-center">
                      <h1 className="text-lg font-bold font-simsun tracking-wide">{readingArticle.title}</h1>
                      <div className="text-xs mt-1 opacity-80 flex justify-center gap-4">
                          <span>作者: {readingArticle.author}</span>
                          <span>日期: {readingArticle.date}</span>
                          <span>点击: {Math.floor(Math.random() * 5000) + 1000}</span>
                      </div>
                  </div>

                  {/* Body */}
                  <div className="p-8 text-black font-simsun text-sm leading-7 min-h-[400px] bg-[#fffaf0]">
                      {readingArticle.content}
                      
                      <div className="mt-12 pt-4 border-t border-dashed border-gray-400 text-right text-xs text-gray-500">
                          (本文由系统自动归档，原始内容版权归原作者所有)
                      </div>
                  </div>
              </div>

              {/* Comments Section Simulation */}
              <div className="mt-4 border border-gray-400 bg-[#f0f0f0] p-2">
                  <div className="font-bold text-xs mb-2 border-b border-gray-400 pb-1 text-black">网友评论</div>
                  <div className="text-center text-gray-500 text-xs py-4">
                      该文章年代久远，评论功能已关闭。
                  </div>
              </div>
          </div>
      );
  }

  // --- List View ---
  return (
    <div className="flex flex-col gap-2" id="digest-list-top">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#800000] to-[#ff0000] text-white p-2 border-2 border-white shadow-md mb-2">
            <h1 className="text-2xl font-black italic tracking-widest text-center shadow-black drop-shadow-md font-serif">★ 论坛精华区 ★</h1>
            <p className="text-center text-xs mt-1 text-yellow-200">收录本站 1998 - 2000 年间最精彩的原创文章，见证网络时代的变迁。</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#dfdfdf] border border-gray-400 p-1 flex gap-2 text-xs items-center text-black flex-wrap">
            <div className="flex items-center gap-1">
                <span>按分类:</span>
                <select 
                    className="border border-gray-600 text-xs h-[20px] bg-white text-black"
                    value={filterCategory}
                    onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
                >
                    <option value="all">全部文章</option>
                    <option value="技术专区">技术专区</option>
                    <option value="时事新闻">时事新闻</option>
                    <option value="影音评论">影音评论</option>
                    <option value="网络文学">网络文学</option>
                    <option value="游戏攻略">游戏攻略</option>
                    <option value="情感天地">情感天地</option>
                </select>
            </div>
            <div className="flex items-center gap-1">
                <span>按年份:</span>
                <select 
                    className="border border-gray-600 text-xs h-[20px] bg-white text-black"
                    value={filterYear}
                    onChange={(e) => { setFilterYear(e.target.value); setCurrentPage(1); }}
                >
                    <option value="all">全部年份</option>
                    <option value="2000">2000年 (新世纪)</option>
                    <option value="1999">1999年 (世纪末)</option>
                    <option value="1998">1998年 (启蒙)</option>
                </select>
            </div>
            <div className="ml-auto text-gray-600 hidden md:block">
                共找到 {filteredData.length} 篇存档
            </div>
        </div>

        {/* List */}
        <div className="bg-white border-2 border-gray-400 p-[2px] min-h-[300px]">
            <div className="bg-[#000080] text-white grid grid-cols-[30px_1fr_60px_70px_80px] text-xs py-1 text-center font-bold">
                <div></div>
                <div>文章标题</div>
                <div>分类</div>
                <div>作者</div>
                <div>归档日期</div>
            </div>
            
            <div className="bg-[#f0f0f0] text-black">
                {currentData.length > 0 ? currentData.map((article, idx) => (
                    <div 
                        key={article.id} 
                        className="grid grid-cols-[30px_1fr_60px_70px_80px] text-xs py-1 items-center border-b border-dotted border-gray-400 hover:bg-[#ffffe0] group cursor-pointer"
                        onClick={() => openArticle(article)}
                    >
                        <div className="text-center group-hover:animate-pulse"><PixelIcon type="file" /></div>
                        <div className="text-blue-800 font-bold truncate pl-1 text-left group-hover:text-red-600 group-hover:underline font-simsun">
                            {article.title}
                        </div>
                        <div className="text-center text-gray-600 scale-90">[{article.category}]</div>
                        <div className="text-center truncate px-1">{article.author}</div>
                        <div className="text-center text-gray-500 font-mono">{article.date}</div>
                    </div>
                )) : (
                    <div className="p-8 text-center text-gray-500 text-xs">没有找到符合条件的文章...</div>
                )}
            </div>
        </div>

        {/* Bottom Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-center mt-2 gap-1 text-xs text-black items-center select-none">
                <span className="mr-2 text-gray-600">页次: {currentPage}/{totalPages}</span>
                
                <span 
                    className={`cursor-pointer hover:underline text-blue-800 ${currentPage === 1 ? 'opacity-50 pointer-events-none text-gray-400' : ''}`}
                    onClick={() => handlePageChange(1)}
                >
                    [首页]
                </span>
                
                <span 
                    className={`cursor-pointer hover:underline text-blue-800 ${currentPage === 1 ? 'opacity-50 pointer-events-none text-gray-400' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    [上一页]
                </span>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <span 
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`px-1 cursor-pointer ${currentPage === p ? 'font-bold text-red-600' : 'text-blue-800 hover:underline'}`}
                    >
                        {p}
                    </span>
                ))}

                <span 
                    className={`cursor-pointer hover:underline text-blue-800 ${currentPage === totalPages ? 'opacity-50 pointer-events-none text-gray-400' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    [下一页]
                </span>
                
                <span 
                    className={`cursor-pointer hover:underline text-blue-800 ${currentPage === totalPages ? 'opacity-50 pointer-events-none text-gray-400' : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    [尾页]
                </span>
            </div>
        )}
    </div>
  );
};
