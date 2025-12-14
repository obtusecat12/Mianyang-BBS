
import React from 'react';
import { ThreadPost } from '../../types';

// Helper to generate a generic user with random avatars
const mockUser = (name: string, rank: string, posts: number, sig?: string, avatarType: 'pixel' | 'bot' | 'cat' | 'human' = 'pixel') => {
  let avatarUrl = '';
  switch(avatarType) {
    case 'bot':
      avatarUrl = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${name}`;
      break;
    case 'cat':
      // Using RoboHash set 4 for cats
      avatarUrl = `https://robohash.org/${name}.png?set=set4&size=150x150`;
      break;
    case 'human':
      avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`;
      break;
    case 'pixel':
    default:
      avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`;
      break;
  }

  return {
    username: name,
    rank,
    posts,
    joinDate: "1999-12-01",
    signature: sig || "上网不聊OICQ，就像走路不穿鞋！",
    avatar: avatarUrl
  };
};

export const THREAD_CONTENT_MAP: Record<string, ThreadPost[]> = {
  // --- 1. Walmart Rumor ---
  "t1": [
    {
      id: 1,
      floor: 1,
      author: mockUser("消息灵通", "论坛元老", 1502, "由于该用户违规，签名已被屏蔽", 'human'),
      date: "2000-05-20 14:30:00",
      content: (
        <div>
           听我舅舅在市政府的朋友说，世界500强的沃尔玛（Wal-Mart）要来我们仙桃开店了！<br/>
           就在那个老百货大楼对面，说是要建个很大的超市。<br/>
           如果是真的，以后我们买东西就方便了，听说里面的东西比小卖部还便宜！<br/>
           大家有内幕消息吗？
        </div>
      )
    },
    {
      id: 2,
      floor: 2,
      author: mockUser("爱吃鱼", "初级会员", 52, undefined, 'cat'),
      date: "2000-05-20 14:35:12",
      content: <div>沙发！楼主好人，一生平安。沃尔玛是什么？卖饲料的吗？</div>
    },
    {
      id: 3,
      floor: 3,
      author: mockUser("北京人在纽约", "高级会员", 888, "My heart will go on...", 'human'),
      date: "2000-05-20 14:48:00",
      content: <div>楼上的真老土，沃尔玛是美国最大的超市！我在北京见过，里面还有空调吹，夏天进去可爽了。不过仙桃这消费水平，悬！</div>
    },
    {
      id: 4,
      floor: 4,
      author: mockUser("理性分析", "中级会员", 300, undefined, 'pixel'),
      date: "2000-05-20 15:10:00",
      content: <div>不信谣，不传谣。那个位置不是说要建游戏厅吗？</div>
    }
  ],

  // --- 2. Slow Internet ---
  "t2": [
    {
      id: 1,
      floor: 1,
      author: mockUser("CS高手", "网吧常客", 405, "AK47点射无敌", 'human'),
      date: "2000-05-21 09:15:00",
      content: (
        <div>
           今天极速网吧的网速也太慢了吧！<br/>
           我打开新浪主页都要半分钟，刚才打CS卡得要死，被人用刀捅死了好几次。<br/>
           网管说是因为有人在下电影，是不是真的啊？<br/>
           有没有懂行的兄弟支个招，怎么抢网速？
        </div>
      )
    },
    {
      id: 2,
      floor: 2,
      author: mockUser("网管", "版主", 9999, "重启试试", 'bot'),
      date: "2000-05-21 09:18:00",
      content: <div>你自己看看是不是中毒了？刚才有人在局域网放毒，我已经把6号机的那个小学生赶走了。</div>
    },
    {
      id: 3,
      floor: 3,
      author: mockUser("冲浪小子", "新进会员", 12, undefined, 'pixel'),
      date: "2000-05-21 09:22:00",
      content: <div>我在下周杰伦的《龙卷风》MP3，不好意思啊各位大哥，马上就好，还有5分钟。</div>
    }
  ],

  // --- 3. Red Figure Ghost Story (Existing) ---
  "t3": [
    {
      id: 1,
      floor: 1,
      author: mockUser("夜钓者", "潜水员", 88, undefined, 'human'),
      date: "2000-05-19 23:45:00",
      content: (
        <div>
           昨天半夜去汉江边夜钓，大概两点多的时候，我听到芦苇荡那边有哭声。<br/>
           我拿手电筒一照，妈呀，看见一个穿红衣服的人站在水里，只有上半身露在外面。<br/>
           当时吓得我鱼竿都不要了，骑上车就跑。<br/>
           回到家一直发烧到现在，以后再也不敢去夜钓了。<br/>
           有谁知道那边以前出过什么事吗？
        </div>
      )
    },
    {
      id: 2,
      floor: 2,
      author: mockUser("捉鬼大师", "版主", 2200, "信则有，不信则无", 'pixel'),
      date: "2000-05-20 00:12:00",
      content: <div>楼主，你看到的可能不是人...那个位置去年淹死过一个穿红裙子的女的。建议你去庙里烧柱香。</div>
    },
    {
      id: 3,
      floor: 3,
      author: mockUser("科学怪人", "高级会员", 560, undefined, 'bot'),
      date: "2000-05-20 08:30:00",
      content: <div>肯定是看错了，那是漂在水上的塑料袋或者是红色的浮漂吧。人在恐惧的时候容易产生幻觉。</div>
    }
  ],

  // --- 4. Antivirus Help ---
  "t4": [
    {
      id: 1,
      floor: 1,
      author: mockUser("电脑小白", "新进会员", 5, undefined, 'cat'),
      date: "2000-05-21 10:00:00",
      content: (
        <div>
           求助各位大侠！<br/>
           我家刚买的联想电脑，装了瑞星杀毒软件。<br/>
           但是那个小狮子一直在睡觉，怎么叫都叫不醒。<br/>
           我想升级病毒库，但是拨号连接总是失败。<br/>
           听说有个叫CIH的病毒很厉害，会烧主板，我好怕啊！在线等，挺急的！
        </div>
      )
    },
    {
      id: 2,
      floor: 2,
      author: mockUser("黑客帝国", "版主", 3100, "只有偏执狂才能生存", 'pixel'),
      date: "2000-05-21 10:15:00",
      content: <div>去买张最新的盗版盘吧，上面一般都有离线升级包。或者你把电脑搬来我家，我帮你弄。</div>
    },
    {
      id: 3,
      floor: 3,
      author: mockUser("KV3000", "中级会员", 200, undefined, 'bot'),
      date: "2000-05-21 10:30:00",
      content: <div>瑞星不行，占内存太大。推荐你用KV3000或者金山毒霸。记得把软驱锁上，防止引导区病毒。</div>
    }
  ],

  // --- 5. Walkman Trade ---
  "t5": [
    {
      id: 1,
      floor: 1,
      author: mockUser("音乐男孩", "中级会员", 120, "爱生活，爱音乐", 'human'),
      date: "2000-05-20 16:20:00",
      content: (
        <div>
           转让自用松下（Panasonic）随身听一部，型号SX-500。<br/>
           超薄机身，全金属外壳，音质超棒，带线控。<br/>
           买了不到半年，9成新，因为想换MD所以忍痛割爱。<br/>
           送两盘正版杰伦磁带（Jay同名专辑），还有索尼耳机。<br/>
           一口价400元，当面交易。
        </div>
      )
    },
    {
      id: 2,
      floor: 2,
      author: mockUser("穷学生", "新进会员", 20, undefined, 'pixel'),
      date: "2000-05-20 17:00:00",
      content: <div>200卖不卖？学生党没钱。</div>
    },
    {
      id: 3,
      floor: 3,
      author: mockUser("索尼大法好", "高级会员", 600, undefined, 'bot'),
      date: "2000-05-20 18:30:00",
      content: <div>松下的音染太重，还是索尼的好。帮顶了。</div>
    }
  ],

  // --- 6. First Intimate Contact ---
  "t6": [
    {
      id: 1,
      floor: 1,
      author: mockUser("痞子蔡(仿)", "文学青年", 330, "如果把整个太平洋的水倒出...", 'pixel'),
      date: "2000-05-18 20:20:00",
      content: (
        <div>
           看完了《第一次亲密接触》，哭得稀里哗啦的。<br/>
           轻舞飞扬走得太早了，为什么相爱的人不能在一起？<br/>
           我现在只要看到咖啡色的东西，就会想起她。<br/>
           网路上的爱情，真的可以变成现实吗？<br/>
           以此贴纪念永远的轻舞飞扬。
        </div>
      )
    },
    {
      id: 2,
      floor: 2,
      author: mockUser("轻舞飞扬", "版主", 5600, "fly with wind", 'human'),
      date: "2000-05-18 20:25:00",
      content: <div>楼主ID跟我很配哦 ^_^ 不过小说终究是小说，现实中大家还是要珍惜眼前人。</div>
    },
    {
      id: 3,
      floor: 3,
      author: mockUser("恐龙猎人", "大虾", 1200, undefined, 'cat'),
      date: "2000-05-18 21:00:00",
      content: <div>网恋？见光死！上次我去见网友，说是张曼玉，结果是个张飞！吓得我连夜买站票回来的。</div>
    }
  ]
};
