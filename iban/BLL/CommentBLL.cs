using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using DAL;

namespace BLL
{
    public static class CommentBLL
    {
        /// <summary>
        /// 获取未删除评论
        /// </summary>
        /// <param name="notice_id">新闻编号（看什么评论）</param>
        /// <param name="uid">用户编号（删谁）</param>
        /// <param name="num">查看的评论数量（看多少评论）</param>
        /// <returns></returns>
        public static string getCommentByNoticeIdNotDelete(int notice_id, int uid, int num)
        {
            string CommentString = "";

            // <div class='media'>
            //   <div class='media-left'>
            //     <a href='#'>
            //       <img class='media-object' src='{头像}' alt='{用户昵称}'>
            //     </a>
            //   </div>
            //   <div class='media-body'>
            //     <div class='media-heading'><h4>{用户昵称}</h4></div>
            //     <span class='pull-right comment-time'>{评论时间}</span>
            //     {评论内容}
            //   </div>
            // </div>

            // <div class="row">
            //   <span class="col-xs-12">uid</span>
            // </div>
            // <div class="row">
            //   <span class="col-xs-12">评论内容</span>
            // </div>
            // <div class="row">
            //   <span class="col-xs-12">评论时间</span>
            // </div>
            // <br />
            try
            {
                var commentList = CommentDAL.getCommentByNoticeIdNotDelete(notice_id, num);
                foreach (var comment in commentList)
                {
                    CommentString += string.Format("<div class='media'><div class='media-left'><a href='#'><img class='media-object' src='{0}' alt='{1}'></a></div><div class='media-body'><div class='media-heading'><h4>{1}&nbsp;{4}</h4></div>{2}<br><span class='comment-time'>{3}</span>", comment.profile_url, comment.nickname, comment.comment_text, comment.comment_time.ToString("yyyy-MM-dd HH:mm"), comment.usertype == "管理员" ? "<span class='badge'>管理员</span>" : "");
                    if (uid != 0 && comment.uid == uid)
                    {
                        CommentString += string.Format(" <a href='/CommentModular/CommentDelete.aspx?cid={0}'>删除</a></div></div><hr>", comment.comment_id);
                    }
                    else
                    {
                        CommentString += "</div></div><hr>";
                    }
                }
            }
            catch (NullReferenceException)
            {
                CommentString = "暂无评论！<hr>";

            }
            return CommentString;
        }

        public static bool deleteCommentById(int cid, int uid)
        {
            return CommentDAL.deleteCommentById(cid, uid);
        }

        public static bool addComment(CommentModel comment)
        {
            return CommentDAL.addComment(comment);
        }
    }
}
