using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public static class TaskDAL
    {
        ///// 获取所有任务（查所有）
        ///// </summary>
        ///// <returns>任务列表</returns>
        //public static List<TaskModel> getTaskNoDel();

        ///// <summary>
        ///// 获取一条任务（查一条）
        ///// </summary>
        ///// <returns>任务</returns>
        //public static TaskModel getTaskNoDelById(int tid);

        ///// <summary>
        ///// 新增一条任务（增）
        ///// </summary>
        ///// <returns>任务</returns>
        //public static bool insertTask(TaskModel task);

        ///// <summary>
        ///// 修改一条任务（改）
        ///// </summary>
        ///// <returns>任务</returns>
        //public static bool updateTask(TaskModel task);

        ///// <summary>
        ///// 删除一条任务（删）
        ///// </summary>
        ///// <returns>任务</returns>
        //public static bool deleteTask(int tid);

        /// <summary>
        /// 获取所有任务（查所有）
        /// </summary>
        /// <returns>任务列表</returns>
        public static List<TaskModel> getTaskNoDel()
        {
            string sql = "select task_id, task_name, create_time, start_time, expiration_time, is_deleted from task_card";
            DataTable dt = DBHelper.executeReader(sql);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            List<TaskModel> taskList = new List<TaskModel>(dt.Rows.Count);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                TaskModel task = new TaskModel();
                task.task_id = Convert.ToInt32(dt.Rows[i]["task_id"]);
                task.task_name = dt.Rows[i]["task_name"].ToString();
                task.create_time = Convert.ToDateTime(dt.Rows[i]["create_time"]);
                task.start_time = Convert.ToDateTime(dt.Rows[i]["start_time"]);
                task.expiration_time = Convert.ToDateTime(dt.Rows[i]["expiration_time"]);
                task.is_deleted = Convert.ToBoolean(dt.Rows[i]["is_deleted"]);
                taskList.Add(task);
            }
            return taskList;
        }

        /// <summary>
        /// 获取一条任务（查一条）
        /// </summary>
        /// <returns>任务</returns>
        public static TaskModel getTaskNoDelById(int tid)
        {
            string sql = "select task_name, task_text, create_time, start_time, expiration_time, is_deleted from task_card where task_id = @task_id";
            SqlParameter[] ps = { new SqlParameter("@task_id", tid) };
            DataTable dt = DBHelper.executeReader(sql, ps);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            TaskModel task = new TaskModel();
            task.task_id = tid;
            task.task_name = dt.Rows[0]["task_name"].ToString();
            task.task_text = dt.Rows[0]["task_text"].ToString();
            task.create_time = Convert.ToDateTime(dt.Rows[0]["create_time"]);
            task.start_time = Convert.ToDateTime(dt.Rows[0]["start_time"]);
            task.expiration_time = Convert.ToDateTime(dt.Rows[0]["expiration_time"]);
            task.is_deleted = Convert.ToBoolean(dt.Rows[0]["is_deleted"]);
            return task;
        }

        /// <summary>
        /// 新增一条任务（增）
        /// </summary>
        /// <returns>任务</returns>
        public static bool insertTask(TaskModel task)
        {
            string sql = "insert into task_card(task_name, task_text, create_time, start_time, expiration_time, is_deleted) values(@task_name, @task_text, @create_time, @start_time, @expiration_time, 0)";
            SqlParameter[] ps = {
                     new SqlParameter("@task_name", task.task_name),
                     new SqlParameter("@task_text", task.task_text),
                     new SqlParameter("@create_time", task.create_time),
                     new SqlParameter("@start_time", task.start_time),
                     new SqlParameter("@expiration_time", task.expiration_time)
            };
            return DBHelper.executeQuery(sql, ps) > 0;
        }

        /// <summary>
        /// 修改一条任务（改）
        /// </summary>
        /// <returns>任务</returns>
        public static bool updateTask(TaskModel task)
        {
            string sql = "update task_card set task_name = @task_name, task_text = @task_text, create_time = @create_time, start_time = @start_time, expiration_time = @expiration_time where task_id = @task_id";
            SqlParameter[] ps = {
                     new SqlParameter("@task_id", task.task_id), 
                     new SqlParameter("@task_name", task.task_name),
                     new SqlParameter("@task_text", task.task_text),
                     new SqlParameter("@create_time", task.create_time),
                     new SqlParameter("@start_time", task.start_time),
                     new SqlParameter("@expiration_time", task.expiration_time)
            };
            return DBHelper.executeQuery(sql, ps) > 0;
        }

        /// <summary>
        /// 删除一条任务（删）
        /// </summary>
        /// <returns>任务</returns>
        public static bool deleteTask(int tid)
        {
            string sql = "update task_card set is_deleted = 1 where task_id = @task_id";
            SqlParameter[] ps = { new SqlParameter("@task_id", tid) };
            return DBHelper.executeQuery(sql, ps) > 0;
        }

        /// <summary>
        /// 获取任务情况
        /// </summary>
        /// <param name="tid"></param>
        /// <param name="uid"></param>
        /// <returns></returns>
        public static TaskStateModel getTaskState(int tid, int uid)
        {
            string sql = "select is_click, is_read, click_time, read_time from task_state where task_id = @task_id and uid = @uid";
            SqlParameter[] ps = {
                     new SqlParameter("@task_id", tid),
                     new SqlParameter("@uid", uid)
            };
            DataTable dt = DBHelper.executeReader(sql, ps);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            TaskStateModel taskState = new TaskStateModel();
            taskState.task_id = tid;
            taskState.uid = uid;
            taskState.read_time = Convert.ToDateTime(dt.Rows[0]["read_time"]);
            taskState.click_time = Convert.ToDateTime(dt.Rows[0]["click_time"]);
            taskState.is_read = Convert.ToBoolean(dt.Rows[0]["is_read"]);
            taskState.is_click = Convert.ToBoolean(dt.Rows[0]["is_click"]);
            return taskState;
        }

        /// <summary>
        /// 阅读任务
        /// </summary>
        /// <param name="taskState"></param>
        /// <returns></returns>
        public static bool readTask(TaskStateModel taskState)
        {
            string sql = "insert into task_state(task_id, uid, is_click, is_read, read_time, click_time) values(@task_id, @uid, 0, 1, @read_time, @click_time)";
            SqlParameter[] ps = {
                     new SqlParameter("@task_id", taskState.task_id),
                     new SqlParameter("@uid", taskState.uid),
                     new SqlParameter("@read_time", DateTime.Now),
                     new SqlParameter("@click_time", DateTime.Now)
            };
            return DBHelper.executeQuery(sql, ps) > 0;
        }

        /// <summary>
        /// 完成任务
        /// </summary>
        /// <param name="taskState"></param>
        /// <returns></returns>
        public static bool finishTask(TaskStateModel taskState)
        {
            string sql = "update task_state set is_click = 1, click_time = @click_time where task_id = @task_id and uid = @uid";
            SqlParameter[] ps = {
                     new SqlParameter("@task_id", taskState.task_id),
                     new SqlParameter("@uid", taskState.uid),
                     new SqlParameter("@click_time", DateTime.Now)
            };
            return DBHelper.executeQuery(sql, ps) > 0;
        }
    }
}
