
import React from 'react';
import { Thread } from '../../types';
import { THREAD_CONTENT_MAP } from './threadData';
import { PixelIcon, RetroButton } from '../RetroUI';

export const ThreadDetail: React.FC<{ thread: Thread }> = ({ thread }) => {
  const posts = THREAD_CONTENT_MAP[thread.id] || [];

  return (
    <div className="flex flex-col gap-2">
      {/* Thread Title Header */}
      <div className="bg-gradient-to-r from-[#000080] to-[#5086b9] text-white p-2 border border-black shadow-md">
        <h1 className="text-sm font-bold tracking-wide flex items-center gap-2">
          <PixelIcon type="file" />
          主题：{thread.title}
        </h1>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center bg-[#dfdfdf] p-1 border border-gray-400">
         <div className="text-xs text-black">
             <RetroButton>回复本贴</RetroButton>
             <RetroButton className="ml-1">发新话题</RetroButton>
         </div>
         <div className="text-xs text-black">
             <span className="mr-2">点击: {thread.views}</span>
             <span>回复: {thread.replies}</span>
         </div>
      </div>

      {/* Posts List */}
      <div className="flex flex-col gap-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border border-gray-600 bg-[#f7f7f7] text-black">
               {/* Post Header */}
               <div className="bg-[#e0e0e0] border-b border-gray-400 px-2 py-1 flex justify-between text-xs text-gray-700">
                  <div className="font-bold">
                    {post.floor === 1 ? '楼主' : `${post.floor}楼`}
                    <span className="mx-2 font-normal text-[10px]">{post.date}</span>
                  </div>
                  <div className="text-[10px]">
                      <span className="cursor-pointer hover:underline">[引用]</span>
                      <span className="cursor-pointer hover:underline ml-1">[举报]</span>
                  </div>
               </div>

               <div className="flex">
                  {/* Left: User Info Side */}
                  <div className="w-[140px] bg-[#f0f0f0] border-r border-gray-400 p-2 text-center shrink-0 flex flex-col items-center">
                      <div className="font-bold text-[#000080] mb-1 truncate w-full">{post.author.username}</div>
                      <div className="w-[60px] h-[60px] bg-white border border-gray-500 mb-1 flex items-center justify-center overflow-hidden">
                          {post.author.avatar ? (
                             <img 
                                src={post.author.avatar} 
                                alt="avatar" 
                                style={{ filter: 'url(#retro-decay)' }}
                                className="w-full h-full object-cover"
                             />
                          ) : (
                             <PixelIcon type="user" className="scale-[2] opacity-50" />
                          )}
                      </div>
                      <div className="text-[10px] text-gray-600">{post.author.rank}</div>
                      <div className="text-[10px] mt-2 text-left w-full pl-2">
                          <div>文章: {post.author.posts}</div>
                          <div>注册: {post.author.joinDate}</div>
                      </div>
                  </div>

                  {/* Right: Content Side */}
                  <div className="flex-1 p-2 flex flex-col min-h-[160px]">
                      <div className="flex-1 text-sm leading-6 font-simsun break-words">
                          {post.content}
                      </div>
                      
                      {/* Signature */}
                      {post.author.signature && (
                          <div className="mt-8 pt-2 border-t border-dashed border-gray-400 text-xs text-gray-500 font-mono">
                              --------------------------------------------------<br/>
                              {post.author.signature}
                          </div>
                      )}
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 text-center border border-gray-400">
              <p className="text-red-600 font-bold">错误：该贴子内容正在从服务器恢复中...</p>
              <p className="text-xs text-gray-500 mt-2">Error Code: 404_DATA_NOT_FOUND_IN_DB</p>
          </div>
        )}
      </div>

      {/* Bottom Pagination & Reply */}
      <div className="bg-[#dfdfdf] p-1 border border-gray-400 text-xs text-black">
          <div className="mb-2">
             <span className="font-bold">快速回复：</span>
          </div>
          <textarea className="w-full h-20 border border-gray-600 p-1 mb-1 text-black bg-white"></textarea>
          <div className="flex gap-2">
              <RetroButton>发表回复</RetroButton>
              <RetroButton>预览</RetroButton>
          </div>
      </div>
    </div>
  );
};
