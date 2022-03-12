using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 任务模型
    /// </summary>
    public class TaskModel
    {
        public int task_id { get; set; }
        public string task_name { get; set; }
        public string task_text { get; set; }
        public DateTime create_time { get; set; }
        public DateTime start_time { get; set; }
        public DateTime expiration_time { get; set; }
        public bool is_deleted { get; set; }
    }

    /// <summary>
    /// 任务完成模型
    /// </summary>
    public class TaskStateModel
    {
        public int task_id { get; set; }
        public int uid { get; set; }
        public bool is_click { get; set; }
        public DateTime click_time { get; set; }
        public bool is_read { get; set; }
        public DateTime read_time { get; set; }
    }
}
