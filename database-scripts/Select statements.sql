/********************
SELECT STATEMENTS (GET)
********************/

--Get all employers
SELECT 
	  [EmployerId]
	 ,[EmployerName]
FROM   
	[dbo].[Employers];

--Get one specific employer
SELECT 
	  [EmployerId]
	 ,[EmployerName]
FROM   
	[dbo].[Employers]
WHERE  [EmployerId] = 1;

--Get all project categories
SELECT 
	  [CategoryId]
	 ,[CategoryName]
FROM   
	[dbo].[ProjectCategories];

--Get one specific project category
SELECT 
	  [CategoryId]
	 ,[CategoryName]
FROM   
	[dbo].[ProjectCategories]
WHERE  [CategoryId] = 1;

--Get all projects
SELECT 
	  [ProjectId]
	 ,[Title]
	 ,[Description]
	 ,[ProjectDate]
	 ,[CategoryId]
	 ,[EmployerId]
	 ,[Active]
	 ,[Ranking]
FROM   
	[dbo].[projects];

--Get all active projects
SELECT 
	  [ProjectId]
	 ,[Title]
	 ,[Description]
	 ,[ProjectDate]
	 ,[CategoryId]
	 ,[EmployerId]
	 ,[Active]
	 ,[Ranking]
FROM   
	[dbo].[projects]
WHERE  [Active] = 1;

--Get one specific project
SELECT 
	  [ProjectId]
	 ,[Title]
	 ,[Description]
	 ,[ProjectDate]
	 ,[CategoryId]
	 ,[EmployerId]
	 ,[Active]
	 ,[Ranking]
FROM   
	[dbo].[projects]
WHERE  [ProjectId] = 1;

--Get all posters for active projects
SELECT 
	  [PosterId]
	 ,po.[ProjectId]
	 ,po.[Description]
	 ,[Url]
FROM   
	[dbo].[posters] [po]
	INNER JOIN [dbo].[Projects] [pr]
	   ON [po].[ProjectId] = [pr].[ProjectId]
WHERE  [pr].[Active] = 1;

--Get all posters for specific project
SELECT 
	  [PosterId]
	 ,[ProjectId]
	 ,[Description]
	 ,[Url]
FROM   
	[dbo].[posters]
WHERE  [ProjectId] = 1;

--Get all thumbnails for active projects
SELECT 
	  t.[PosterId]
	 ,t.[Url]
FROM   
	[dbo].[Thumbnails] [t]
	INNER JOIN [posters] [po]
	   ON [t].[PosterId] = [po].[PosterId]
	INNER JOIN [dbo].[Projects] [pr]
	   ON [po].[ProjectId] = [pr].[ProjectId]
WHERE  [pr].[Active] = 1;

--Get all thumbnails for specific poster
SELECT 
	  [PosterId]
	 ,[Url]
FROM   
	[dbo].[Thumbnails] [t]
WHERE  [PosterId] = 1;