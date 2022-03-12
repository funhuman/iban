using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using System.Data;
using System.Data.SqlClient;
namespace DAL
{
    public static class CommentDAL
    {
        
        /// <summary>
        /// 读取评论
        /// </summary>
        /// <returns>List&lt新闻&gt</returns>
        /// 删除 单条通知下
        public static List<CommentModel> getCommentByNoticeIdNotDelete(int notice_id, int num)
        {
            string sql = "select ";
            if (num > 0)
            {
                sql = "select top " + num;
            }
            sql += " comment_id, c.uid, comment_text, comment_time, u.nickname, profile_url, u.usertype from comment c, user_info u where comment_father = @comment_father and c.is_deleted = 0 and c.uid = u.uid order by comment_id asc";
            SqlParameter[] ps = new SqlParameter[] { new SqlParameter("@comment_father", notice_id) };
            DataTable dt = DBHelper.executeReader(sql, ps);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }

            List<CommentModel> commentList = new List<CommentModel>(dt.Rows.Count);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                CommentModel comment = new CommentModel();
                comment.comment_id = Convert.ToInt32(dt.Rows[i]["comment_id"]);
                comment.uid = Convert.ToInt32(dt.Rows[i]["uid"]);
                comment.comment_text = dt.Rows[i]["comment_text"].ToString();
                comment.nickname = dt.Rows[i]["nickname"].ToString().Trim();
                comment.profile_url = dt.Rows[i]["profile_url"].ToString().Trim();
                comment.usertype = dt.Rows[i]["usertype"].ToString().Trim();
                comment.comment_time = Convert.ToDateTime(dt.Rows[i]["comment_time"]);
                comment.is_deleted = false;
                commentList.Add(comment);
            }
            return commentList;
        }

        /// <summary>
        /// 添加评论
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        public static bool addComment(CommentModel comment)
        {
            string sql = "insert into comment(comment_father, uid, comment_text, comment_time, is_deleted) values(@comment_father, @uid,  @comment_text, @comment_time, 0)";
            SqlParameter[] ps = {
                                    new SqlParameter("@comment_father"  ,       comment.comment_father  ),
                                    new SqlParameter("@uid"             ,       comment.uid             ),
                                    new SqlParameter("@comment_text"    ,       comment.comment_text    ),
                                    new SqlParameter("@comment_time"    ,       comment.comment_time    )
                                };
            return (DBHelper.executeQuery(sql, ps) > 0);
        }

        /// <summary>
        /// 修改评论
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        /// 系统暂不允许修改评论

        /// <summary>
        /// 删除新闻
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static bool deleteCommentById(int cid, int uid)
        {
            string sql = "update comment set is_deleted = 1 where comment_id = @comment_id and uid = @uid";
            SqlParameter[] ps = { new SqlParameter("@comment_id", cid), new SqlParameter("@uid", uid) };
            return (DBHelper.executeQuery(sql, ps) > 0);
        }

    }
}
