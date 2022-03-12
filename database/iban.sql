USE [master]
GO
/****** Object:  Database [iban]    Script Date: 06/10/2021 08:34:19 ******/
CREATE DATABASE [iban] ON  PRIMARY
( NAME = N'test', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\iban.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON
( NAME = N'test_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\iban_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [iban] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [iban].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [iban] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [iban] SET ANSI_NULLS OFF
GO
ALTER DATABASE [iban] SET ANSI_PADDING OFF
GO
ALTER DATABASE [iban] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [iban] SET ARITHABORT OFF
GO
ALTER DATABASE [iban] SET AUTO_CLOSE ON
GO
ALTER DATABASE [iban] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [iban] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [iban] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [iban] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [iban] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [iban] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [iban] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [iban] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [iban] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [iban] SET  DISABLE_BROKER
GO
ALTER DATABASE [iban] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [iban] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [iban] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [iban] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [iban] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [iban] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [iban] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [iban] SET  READ_WRITE
GO
ALTER DATABASE [iban] SET RECOVERY SIMPLE
GO
ALTER DATABASE [iban] SET  MULTI_USER
GO
ALTER DATABASE [iban] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [iban] SET DB_CHAINING OFF
GO
USE [iban]
GO
/****** Object:  User [sqler]    Script Date: 06/10/2021 08:34:19 ******/
CREATE USER [sqler] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[carousel]    Script Date: 06/10/2021 08:34:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[carousel](
	[carousel_id] [int] IDENTITY(1,1) NOT NULL,
	[image_url] [varchar](max) NULL,
	[link_url] [varchar](max) NULL,
	[input_date] [datetime] NULL,
	[title] [varchar](max) NULL,
	[sub_title] [varchar](max) NULL,
	[description] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轮播图编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'carousel', @level2type=N'COLUMN',@level2name=N'carousel_id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轮播图地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'carousel', @level2type=N'COLUMN',@level2name=N'image_url'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'上传时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'carousel', @level2type=N'COLUMN',@level2name=N'input_date'
GO
SET IDENTITY_INSERT [dbo].[carousel] ON
INSERT [dbo].[carousel] ([carousel_id], [image_url], [link_url], [input_date], [title], [sub_title], [description]) VALUES (1, N'/images/C1.jpg', N'/NoticeModular/ReadNotice.aspx?nid=1', CAST(0x0000AD45010928A3 AS DateTime), N'期末加油', NULL, NULL)
INSERT [dbo].[carousel] ([carousel_id], [image_url], [link_url], [input_date], [title], [sub_title], [description]) VALUES (2, N'/uploads/20210618195300.jpg', N'/NoticeModular/ReadNotice.aspx?nid=44', CAST(0x0000AD4B0147C2E1 AS DateTime), N'Bootstrap 介绍', NULL, NULL)
INSERT [dbo].[carousel] ([carousel_id], [image_url], [link_url], [input_date], [title], [sub_title], [description]) VALUES (3, N'/uploads/20210618195533.jpg', N'/NoticeModular/ReadNotice.aspx?nid=1', CAST(0x0000AD4B014879FD AS DateTime), N'学校火烧云 点击看详情', NULL, NULL)
SET IDENTITY_INSERT [dbo].[carousel] OFF
/****** Object:  Table [dbo].[calendar]    Script Date: 06/10/2021 08:34:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendar](
	[did] [int] NOT NULL,
	[ddate] [date] NOT NULL
) ON [PRIMARY]
GO
INSERT [dbo].[calendar] ([did], [ddate]) VALUES (1, CAST(0xEF420B00 AS Date))
/****** Object:  Table [dbo].[user_info]    Script Date: 06/10/2021 08:34:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[user_info](
	[uid] [int] IDENTITY(1,1) NOT NULL,
	[username] [char](16) NOT NULL,
	[password] [char](32) NOT NULL,
	[usertype] [char](10) NOT NULL,
	[is_deleted] [tinyint] NOT NULL,
	[nickname] [nchar](20) NULL,
	[profile_url] [varchar](max) NULL,
	[create_time] [datetime] NOT NULL,
	[update_time] [datetime] NOT NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED
(
	[uid] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否删除' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'user_info', @level2type=N'COLUMN',@level2name=N'is_deleted'
GO
SET IDENTITY_INSERT [dbo].[user_info] ON
INSERT [dbo].[user_info] ([uid], [username], [password], [usertype], [is_deleted], [nickname], [profile_url], [create_time], [update_time]) VALUES (5, N'admin           ', N'889785904BF5E23943D2FCC5B1FBA527', N'管理员    ', 0, N'管理员admin            ', N'/images/eight_logo.png', CAST(0x0000AD3A014ECEF0 AS DateTime), CAST(0x0000AD4B00E6BD90 AS DateTime))
INSERT [dbo].[user_info] ([uid], [username], [password], [usertype], [is_deleted], [nickname], [profile_url], [create_time], [update_time]) VALUES (7, N'123             ', N'53B15C5719B8AC47DB99336E2052C05C', N'用户      ', 0, N'用户123               ', N'/images/eight_logo.png', CAST(0x0000AD4A015E2588 AS DateTime), CAST(0x0000AD4B00E525C0 AS DateTime))
SET IDENTITY_INSERT [dbo].[user_info] OFF
/****** Object:  Table [dbo].[task_state]    Script Date: 06/10/2021 08:34:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[task_state](
	[task_id] [int] NOT NULL,
	[uid] [int] NOT NULL,
	[is_click] [bit] NOT NULL,
	[click_time] [datetime] NULL,
	[is_read] [bit] NOT NULL,
	[read_time] [datetime] NULL,
 CONSTRAINT [PK_notice_read] PRIMARY KEY CLUSTERED
(
	[task_id] ASC,
	[uid] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'通知编号（外码）' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_state', @level2type=N'COLUMN',@level2name=N'task_id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'用户编号（外码）' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_state', @level2type=N'COLUMN',@level2name=N'uid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'阅读状态' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_state', @level2type=N'COLUMN',@level2name=N'is_read'
GO
INSERT [dbo].[task_state] ([task_id], [uid], [is_click], [click_time], [is_read], [read_time]) VALUES (1, 5, 1, CAST(0x0000AD4C0097CBD3 AS DateTime), 1, CAST(0x0000AD4C0091E931 AS DateTime))
INSERT [dbo].[task_state] ([task_id], [uid], [is_click], [click_time], [is_read], [read_time]) VALUES (1, 7, 0, CAST(0x0000AD4C008B8569 AS DateTime), 1, CAST(0x0000AD4C0089402B AS DateTime))
/****** Object:  Table [dbo].[task_card]    Script Date: 06/10/2021 08:34:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[task_card](
	[task_id] [int] IDENTITY(1,1) NOT NULL,
	[task_name] [varchar](42) NOT NULL,
	[task_text] [text] NULL,
	[create_time] [datetime] NOT NULL,
	[start_time] [datetime] NULL,
	[expiration_time] [datetime] NULL,
	[end_time] [datetime] NULL,
	[end_state] [char](4) NULL,
	[is_deleted] [bit] NULL,
 CONSTRAINT [PK_task_card] PRIMARY KEY CLUSTERED
(
	[task_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'任务编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_card', @level2type=N'COLUMN',@level2name=N'task_id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'任务名称' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_card', @level2type=N'COLUMN',@level2name=N'task_name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_card', @level2type=N'COLUMN',@level2name=N'create_time'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'开始时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_card', @level2type=N'COLUMN',@level2name=N'start_time'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'过期时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_card', @level2type=N'COLUMN',@level2name=N'expiration_time'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'结束时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_card', @level2type=N'COLUMN',@level2name=N'end_time'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'结束状态(完成,取消,暂停)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_card', @level2type=N'COLUMN',@level2name=N'end_state'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否删除' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'task_card', @level2type=N'COLUMN',@level2name=N'is_deleted'
GO
SET IDENTITY_INSERT [dbo].[task_card] ON
INSERT [dbo].[task_card] ([task_id], [task_name], [task_text], [create_time], [start_time], [expiration_time], [end_time], [end_state], [is_deleted]) VALUES (1, N'Web大作业`', N'请按时提交', CAST(0x0000AD4700A9BD20 AS DateTime), CAST(0x0000AD4700A9BD20 AS DateTime), CAST(0x0000AD4C00D63BC0 AS DateTime), CAST(0x0000AD4C0004F1A0 AS DateTime), N'    ', 0)
SET IDENTITY_INSERT [dbo].[task_card] OFF
/****** Object:  Table [dbo].[notice]    Script Date: 06/10/2021 08:34:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[notice](
	[notice_id] [int] IDENTITY(1,1) NOT NULL,
	[notice_title] [varchar](100) NULL,
	[notice_time] [datetime] NOT NULL,
	[notice_text] [text] NULL,
	[notice_creater] [int] NOT NULL,
	[notice_editor] [int] NOT NULL,
	[is_deleted] [bit] NOT NULL,
 CONSTRAINT [PK_news] PRIMARY KEY CLUSTERED
(
	[notice_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'新闻编号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'notice', @level2type=N'COLUMN',@level2name=N'notice_id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'新闻标题' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'notice', @level2type=N'COLUMN',@level2name=N'notice_title'
GO
SET IDENTITY_INSERT [dbo].[notice] ON
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (1, N'期末考试安排', CAST(0x0000AD3700D63BC0 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (2, N'假期安排', CAST(0x0000AD3800F73140 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (10, N'课程安排', CAST(0x0000AD3601121BE0 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (11, N'请大家关注近期天气情况', CAST(0x0000AD3C00F5D1B0 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (34, N'疫苗接种二针通知', CAST(0x0000AD400107AC00 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (36, N'学生证、火车优惠卡申（补）办', CAST(0x0000AD400107AC00 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (40, N'2021-2022学年校历', CAST(0x0000AD4B00E6B680 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (41, N'Web应用程序设计大作业补充通知', CAST(0x0000AD4B01090275 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (42, N'期末考试加油', CAST(0x0000AD4B011EBE40 AS DateTime), NULL, 5, 5, 0)
INSERT [dbo].[notice] ([notice_id], [notice_title], [notice_time], [notice_text], [notice_creater], [notice_editor], [is_deleted]) VALUES (43, N'疫情防控 四六级考试带好口罩', CAST(0x0000AD4B011E77F0 AS DateTime), N'大家注意四六级考试戴好口罩', 5, 5, 0)
SET IDENTITY_INSERT [dbo].[notice] OFF
/****** Object:  Table [dbo].[comment]    Script Date: 06/10/2021 08:34:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comment](
	[comment_id] [int] IDENTITY(1,1) NOT NULL,
	[comment_father] [int] NOT NULL,
	[uid] [int] NOT NULL,
	[comment_text] [text] NOT NULL,
	[comment_time] [datetime] NOT NULL,
	[is_deleted] [bit] NOT NULL,
 CONSTRAINT [PK_comment] PRIMARY KEY CLUSTERED
(
	[comment_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[comment] ON
INSERT [dbo].[comment] ([comment_id], [comment_father], [uid], [comment_text], [comment_time], [is_deleted]) VALUES (4, 1, 5, N'加油', CAST(0x0000AD4100970FE0 AS DateTime), 0)
INSERT [dbo].[comment] ([comment_id], [comment_father], [uid], [comment_text], [comment_time], [is_deleted]) VALUES (5, 1, 6, N'好！', CAST(0x0000AD4100A55820 AS DateTime), 0)
INSERT [dbo].[comment] ([comment_id], [comment_father], [uid], [comment_text], [comment_time], [is_deleted]) VALUES (7, 1, 6, N'我是其他人的评论', CAST(0x0000AD4300000000 AS DateTime), 1)
INSERT [dbo].[comment] ([comment_id], [comment_father], [uid], [comment_text], [comment_time], [is_deleted]) VALUES (59, 40, 7, N'收到', CAST(0x0000AD4B00F6DC28 AS DateTime), 0)
INSERT [dbo].[comment] ([comment_id], [comment_father], [uid], [comment_text], [comment_time], [is_deleted]) VALUES (60, 1, 7, N'加油', CAST(0x0000AD4B013D2E05 AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[comment] OFF
/****** Object:  Default [DF_carousel_carousel_time]    Script Date: 06/10/2021 08:34:19 ******/
ALTER TABLE [dbo].[carousel] ADD  CONSTRAINT [DF_carousel_carousel_time]  DEFAULT (getdate()) FOR [input_date]
GO
/****** Object:  Default [DF_task_card_is_deleted]    Script Date: 06/10/2021 08:34:19 ******/
ALTER TABLE [dbo].[task_card] ADD  CONSTRAINT [DF_task_card_is_deleted]  DEFAULT ((0)) FOR [is_deleted]
GO
/****** Object:  Default [DF_news_times]    Script Date: 06/10/2021 08:34:19 ******/
ALTER TABLE [dbo].[notice] ADD  CONSTRAINT [DF_news_times]  DEFAULT (getdate()) FOR [notice_time]
GO
/****** Object:  Default [DF_news_is_deleted]    Script Date: 06/10/2021 08:34:19 ******/
ALTER TABLE [dbo].[notice] ADD  CONSTRAINT [DF_news_is_deleted]  DEFAULT ((0)) FOR [is_deleted]
GO
/****** Object:  ForeignKey [FK_notice_creater_uid]    Script Date: 06/10/2021 08:34:19 ******/
ALTER TABLE [dbo].[notice]  WITH CHECK ADD  CONSTRAINT [FK_notice_creater_uid] FOREIGN KEY([notice_creater])
REFERENCES [dbo].[user_info] ([uid])
GO
ALTER TABLE [dbo].[notice] CHECK CONSTRAINT [FK_notice_creater_uid]
GO
/****** Object:  ForeignKey [FK_notice_editor_uid]    Script Date: 06/10/2021 08:34:19 ******/
ALTER TABLE [dbo].[notice]  WITH CHECK ADD  CONSTRAINT [FK_notice_editor_uid] FOREIGN KEY([notice_editor])
REFERENCES [dbo].[user_info] ([uid])
GO
ALTER TABLE [dbo].[notice] CHECK CONSTRAINT [FK_notice_editor_uid]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'alter table notice add constraint FK_notice_editor_uid foreign key(notice_editor) references user_info(uid)
通知表(编辑者列) 参照 用户表(用户编号列)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'notice', @level2type=N'CONSTRAINT',@level2name=N'FK_notice_editor_uid'
GO
/****** Object:  ForeignKey [FK_comment_comment_father_notice_notice_id]    Script Date: 06/10/2021 08:34:19 ******/
ALTER TABLE [dbo].[comment]  WITH CHECK ADD  CONSTRAINT [FK_comment_comment_father_notice_notice_id] FOREIGN KEY([comment_father])
REFERENCES [dbo].[notice] ([notice_id])
GO
ALTER TABLE [dbo].[comment] CHECK CONSTRAINT [FK_comment_comment_father_notice_notice_id]
GO
/****** Object:  ForeignKey [FK_comment_uid_user_info_uid]    Script Date: 06/10/2021 08:34:19 ******/
ALTER TABLE [dbo].[comment]  WITH CHECK ADD  CONSTRAINT [FK_comment_uid_user_info_uid] FOREIGN KEY([comment_father])
REFERENCES [dbo].[notice] ([notice_id])
GO
ALTER TABLE [dbo].[comment] CHECK CONSTRAINT [FK_comment_uid_user_info_uid]
GO
