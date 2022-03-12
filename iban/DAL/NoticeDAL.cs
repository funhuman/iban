using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public class NoticeDAL
    {
        /// <summary>
        /// 读取新闻
        /// </summary>
        /// <returns>List&lt新闻&gt</returns>
        public static List<Notice> getNoticeNotDelete(int num = 0, string queryString = "", bool isLike = false)
        {
            string sql = "select notice_id, notice_title, notice_time, notice_editor from notice";
            if (num > 0)
            {
                sql = "select top " + num + " notice_id, notice_title, notice_time, notice_editor from notice";
            }
            sql += " where is_deleted = 0";
            if (queryString != "")
            {
                if (!isLike)
                {
                    sql += " and notice_title = '" + queryString + "'";
                }
                else
                {
                    sql += " and notice_title like '%" + queryString + "%'";
                }
            }
            sql += " order by notice_time desc";

            DataTable dt = DBHelper.executeReader(sql);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            List<Notice> noticeList = new List<Notice>(dt.Rows.Count);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Notice notice = new Notice();
                notice.notice_id = Convert.ToInt32(dt.Rows[i]["notice_id"]);
                notice.notice_title = dt.Rows[i]["notice_title"].ToString();
                notice.notice_time = Convert.ToDateTime(dt.Rows[i]["notice_time"]);
                notice.notice_editor = Convert.ToInt32(dt.Rows[i]["notice_editor"]);
                notice.is_deleted = false;
                noticeList.Add(notice);
            }
            return noticeList;
        }

        /// <summary>
        /// 获取所有新闻
        /// </summary>
        /// <returns>List&lt新闻&gt</returns>
        public static List<Notice> getNotice()
        {
            string sql = "select notice_id, notice_title, notice_time, is_deleted from notice";
            DataTable dt = DBHelper.executeReader(sql);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            List<Notice> noticeList = new List<Notice>(dt.Rows.Count);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Notice notice = new Notice();
                notice.notice_id = Convert.ToInt32(dt.Rows[i]["notice_id"]);
                notice.notice_title = dt.Rows[i]["notice_title"].ToString();
                notice.notice_time = Convert.ToDateTime(dt.Rows[i]["notice_time"]);
                notice.is_deleted = Convert.ToBoolean(dt.Rows[i]["is_deleted"]);
                noticeList.Add(notice);
            }
            return noticeList;
        }


        /// <summary>
        /// 获取单条新闻
        /// </summary>
        /// <returns>List&lt新闻&gt</returns>
        public static Notice getNoticeById(int id)
        {
            string sql = "select notice_id, notice_title, notice_time, notice_text, notice_creater, notice_editor, nickname, n.is_deleted from notice n, user_info where notice_id = @notice_id and notice_editor = uid";
            SqlParameter[] ps = { new SqlParameter("@notice_id", id) };
            DataTable dt = DBHelper.executeReader(sql, ps);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            Notice notice = new Notice();
            notice.notice_id = Convert.ToInt32(dt.Rows[0]["notice_id"]);
            notice.notice_title = dt.Rows[0]["notice_title"].ToString();
            notice.notice_time = Convert.ToDateTime(dt.Rows[0]["notice_time"]);
            notice.notice_text = dt.Rows[0]["notice_text"].ToString();
            notice.notice_creater = Convert.ToInt32(dt.Rows[0]["notice_creater"]);
            notice.notice_editor = Convert.ToInt32(dt.Rows[0]["notice_editor"]);
            notice.notice_editor_nikename = (dt.Rows[0]["nickname"].ToString() != "" ? dt.Rows[0]["nickname"].ToString() : notice.notice_editor.ToString());
            notice.is_deleted = Convert.ToBoolean(dt.Rows[0]["is_deleted"]);
            return notice;
        }

        /// <summary>
        /// 添加新闻
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        public static bool addNotice(Notice notice)
        {
            string sql = "insert into notice(notice_title, notice_time, notice_text, notice_creater, notice_editor, is_deleted) values(@notice_title, @notice_time, @notice_text, @notice_creater, @notice_editor, 0)";
            SqlParameter[] ps = {
                                    new SqlParameter("@notice_title", notice.notice_title),
                                    new SqlParameter("@notice_time", notice.notice_time),
                                    new SqlParameter("@notice_text", notice.notice_text),
                                    new SqlParameter("@notice_creater", notice.notice_creater),
                                    new SqlParameter("@notice_editor", notice.notice_creater)
                                };
            return (DBHelper.executeQuery(sql, ps) > 0);
        }

        /// <summary>
        /// 修改新闻
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        public static bool UpdateNotice(Notice notice)
        {
            string sql = "update notice set notice_title = @notice_title, notice_text = @notice_text, notice_time = @notice_time where notice_id = @notice_id";
            SqlParameter[] ps = {
                                    new SqlParameter("@notice_id", notice.notice_id),
                                    new SqlParameter("@notice_title", notice.notice_title),
                                    new SqlParameter("@notice_text", notice.notice_text),
                                    new SqlParameter("@notice_time", notice.notice_time)
                                };
            return (DBHelper.executeQuery(sql, ps) > 0);
        }

        /// <summary>
        /// 删除新闻
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static bool DeleteNoticeByID(int id)
        {
            string sql = "update notice set is_deleted = 1 where notice_id = @notice_id";
            SqlParameter[] ps = { new SqlParameter("@notice_id", id) };
            return (DBHelper.executeQuery(sql, ps) > 0);
        }
    }
}
