using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;

namespace BLL
{
    public static class TaskBLL
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

        /// 获取所有任务（查所有）
        /// </summary>
        /// <returns>任务列表</returns>
        public static List<TaskModel> getTaskNoDel()
        {
            return TaskDAL.getTaskNoDel();
        }

        /// <summary>
        /// 获取一条任务（查一条）
        /// </summary>
        /// <returns>任务</returns>
        public static TaskModel getTaskNoDelById(int tid)
        {
            return TaskDAL.getTaskNoDelById(tid);
        }

        /// <summary>
        /// 新增一条任务（增）
        /// </summary>
        /// <returns>任务</returns>
        public static bool insertTask(TaskModel task)
        {
            return TaskDAL.insertTask(task);
        }

        /// <summary>
        /// 修改一条任务（改）
        /// </summary>
        /// <returns>任务</returns>
        public static bool updateTask(TaskModel task)
        {
            return TaskDAL.updateTask(task);
        }

        /// <summary>
        /// 删除一条任务（删）
        /// </summary>
        /// <returns>任务</returns>
        public static bool deleteTask(int tid)
        {
            return TaskDAL.deleteTask(tid);
        }


        public static TaskStateModel getTaskState(int tid, int uid)
        {
            return TaskDAL.getTaskState(tid, uid);
        }
        public static bool readTask(TaskStateModel taskState)
        {
            return TaskDAL.readTask(taskState);
        }
        public static bool finishTask(TaskStateModel taskState)
        {
            return getTaskState(taskState.task_id, taskState.uid) == null ? false : TaskDAL.finishTask(taskState);
        }
    }
}
