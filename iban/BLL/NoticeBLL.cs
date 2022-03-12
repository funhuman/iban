using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using DAL;
namespace BLL
{
    public class NoticeBLL
    {
        /// <summary>
        /// 模糊查询读取新闻
        /// </summary>
        /// <param name="title"></param>
        /// <returns></returns>
        public static List<Notice> LikeGetNoticeNotDelete(string title)
        {
            List<Notice> notice = NoticeDAL.getNoticeNotDelete(0,title,true);
            return notice;
        }

        /// <summary>
        /// 模糊查询读取新闻
        /// </summary>
        /// <param name="title"></param>
        /// <returns></returns>
        public static List<Notice> NotLikeGetNoticeNotDelete(string title)
        {
            List<Notice> notice = NoticeDAL.getNoticeNotDelete(0, title);
            return notice;
        }

        /// <summary>
        /// 读取新闻
        /// </summary>
        /// <returns></returns>
        public static List<Notice> getNoticeNotDelete(int num = 0)
        {
            List<Notice> notice = NoticeDAL.getNoticeNotDelete(num);
            return notice;
        }

        /// <summary>
        /// 获取新闻
        /// </summary>
        /// <returns></returns>
        public static List<Notice> getNoticeList()
        {
            List<Notice> notice = NoticeDAL.getNotice();
            return notice;
        }

        /// <summary>
        /// 获取一条新闻
        /// </summary>
        /// <returns></returns>
        public static Notice getNoticeById(int id)
        {
            return NoticeDAL.getNoticeById(id);;
        }

        /// <summary>
        /// 添加新闻
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        public static bool addNotice(Notice notice)
        {
            return NoticeDAL.addNotice(notice);
        }

        /// <summary>
        /// 修改新闻
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        public static bool UpdateNotice(Notice notice)
        {
            return NoticeDAL.UpdateNotice(notice);
        }

        /// <summary>
        /// 删除新闻
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static bool DeleteNoticeByID(int id)
        {
            return NoticeDAL.DeleteNoticeByID(id);
        }
    }
}
