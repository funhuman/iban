using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 新闻模型
    /// </summary>
    public class Notice
    {
        public int notice_id { get; set; }
        public string notice_title { get; set; }
        public DateTime notice_time { get; set; }
        public int notice_creater { get; set; }
        public int notice_editor { get; set; }
        public string notice_editor_nikename { get; set; }
        public string notice_text { get; set; }
        public bool is_deleted { get; set; }
    }
}
