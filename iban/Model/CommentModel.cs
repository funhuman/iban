using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 评论模型
    /// </summary>
    public class CommentModel
    {
        public int comment_id { get; set; }
        public int comment_father { get; set; }
        public int uid { get; set; }
        public string comment_text { get; set; }
        public string nickname { get; set; }
        public string profile_url { get; set; }
        public string usertype { get; set; }
        public DateTime comment_time { get; set; }
        public bool is_deleted { get; set; }
    }
}
