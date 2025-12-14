
import { Board, Thread } from './types';

export const SITE_NAME = "沔阳论坛网";
export const SITE_URL = "www.mianyangbbs.cn";

export const BOARDS: Board[] = [
  {
    id: "city-chat",
    title: "【沔阳茶馆】",
    description: "聊聊仙桃的大事小情，沔阳话，沔阳事。",
    moderators: ["水乡浪子", "沔阳一哥"],
    postCount: 12450,
    icon: "chat"
  },
  {
    id: "ghost-stories",
    title: "【都市传说】",
    description: "三蒸路深夜的脚步声...胆小慎入！",
    moderators: ["捉鬼大师", "午夜凶铃"],
    postCount: 444,
    icon: "ghost"
  },
  {
    id: "flea-market",
    title: "【跳蚤市场】",
    description: "二手买卖，房屋出租，求购诺基亚3310。",
    moderators: ["诚信是金"],
    postCount: 890,
    icon: "market"
  },
  {
    id: "internet-tech",
    title: "【网海冲浪】",
    description: "OICQ交流，Windows 98优化，传奇私服。",
    moderators: ["黑客帝国", "网管"],
    postCount: 3200,
    icon: "tech"
  },
  {
    id: "music-feeling",
    title: "【心情音乐】",
    description: "点歌台，心情日记，以文会友。",
    moderators: ["轻舞飞扬"],
    postCount: 5600,
    icon: "music"
  }
];

export const MOCK_THREADS: Thread[] = [
  {
    id: "t1",
    boardId: "city-chat",
    title: "听说沃尔玛要来我们仙桃了？真的假的？",
    author: "消息灵通",
    date: "2000-05-20 14:30",
    views: 1203,
    replies: 45,
    isHot: true
  },
  {
    id: "t2",
    boardId: "city-chat",
    title: "【灌水】今天网吧网速好慢啊，打开网页要半分钟",
    author: "CS高手",
    date: "2000-05-21 09:15",
    views: 56,
    replies: 12
  },
  {
    id: "t3",
    boardId: "ghost-stories",
    title: "昨晚在汉江边看到一个穿红衣服的人影...",
    author: "夜钓者",
    date: "2000-05-19 23:45",
    views: 8990,
    replies: 666,
    isHot: true,
  },
  {
    id: "t4",
    boardId: "internet-tech",
    title: "求助：我的瑞星杀毒软件怎么升级不到最新版本？",
    author: "电脑小白",
    date: "2000-05-21 10:00",
    views: 34,
    replies: 2,
    isNew: true
  },
  {
    id: "t5",
    boardId: "flea-market",
    title: "转让九成新松下随身听，送两盘杰伦磁带",
    author: "音乐男孩",
    date: "2000-05-20 16:20",
    views: 230,
    replies: 8
  },
  {
    id: "t6",
    boardId: "music-feeling",
    title: "第一次亲密接触...我的轻舞飞扬在哪里",
    author: "痞子蔡(仿)",
    date: "2000-05-18 20:20",
    views: 4500,
    replies: 120,
    isHot: true
  }
];
