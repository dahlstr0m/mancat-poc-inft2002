--Uncomment below to drop tables
/************************************************
IF OBJECT_ID('dbo.Employers') IS NOT NULL
    BEGIN 
	   DROP TABLE [dbo].Thumbnails
END;

IF OBJECT_ID('dbo.Thumbnails') IS NOT NULL
    BEGIN 
	   DROP TABLE [dbo].Thumbnails
END;

IF OBJECT_ID('dbo.Posters') IS NOT NULL
    BEGIN 
	   DROP TABLE [dbo].Posters
END;

IF OBJECT_ID('dbo.[Projects]') IS NOT NULL
    BEGIN 
	   DROP TABLE [dbo].[Projects]
END;

IF OBJECT_ID('dbo.ProjectCategories') IS NOT NULL
    BEGIN 
	   DROP TABLE [dbo].[ProjectCategories]
END;
************************************************/

IF NOT EXISTS
(
    SELECT 
		*
    FROM   
	    [sysobjects]
    WHERE  [name] = 'ProjectCategories'
)
    BEGIN
	   CREATE TABLE [ProjectCategories]
	   (
				 [CategoryId]   int IDENTITY(1,1) PRIMARY KEY
				,[CategoryName] nvarchar(50) NOT NULL
	   );
END;

IF NOT EXISTS
(
    SELECT 
		 *
    FROM   
	    [sysobjects]
    WHERE  [name] = 'Employers'
)
    BEGIN
	   CREATE TABLE [Employers]
	   (
				 [EmployerId]   int IDENTITY(1,1) PRIMARY KEY
				,[EmployerName] nvarchar(50) NOT NULL
	   );
END;

IF NOT EXISTS
(
    SELECT 
		 *
    FROM   
	    [sysobjects]
    WHERE  [name] = 'Projects'
)
    BEGIN
	   CREATE TABLE [Projects]
	   (
				 [ProjectId]   int IDENTITY(1,1) PRIMARY KEY
				,[Title]       nvarchar(50) NOT NULL
				,[Description] nvarchar(500) NOT NULL
				,[ProjectDate] datetime NOT NULL
				,[CategoryId]  int
				,[EmployerId]  int
				,[Active]      bit
				,[Ranking]     int 
				CONSTRAINT [FK_CategoryProject] FOREIGN KEY([CategoryId]) REFERENCES [ProjectCategories]([CategoryId])
				,CONSTRAINT [FK_EmployerProject] FOREIGN KEY([EmployerId]) REFERENCES [Employers]([EmployerId])
	   );
END;

IF NOT EXISTS
(
    SELECT 
		 *
    FROM   
	    [sysobjects]
    WHERE  [name] = 'Posters'
)
    BEGIN
	   CREATE TABLE [Posters]
	   (
				 [PosterId]    int IDENTITY(1,1) PRIMARY KEY
				,[ProjectId]   int NOT NULL
				,[Description] nvarchar(100)
				,[Url]         nvarchar(100) CONSTRAINT [FK_PosterProject] FOREIGN KEY([ProjectId]) REFERENCES [Projects]([ProjectId])
	   );
END;

IF NOT EXISTS
(
    SELECT 
		 *
    FROM   
	    [sysobjects]
    WHERE  [name] = 'Thumbnails'
)
    BEGIN
	   CREATE TABLE [Thumbnails]
	   (
				 [ThumbnailId] int IDENTITY(1,1) PRIMARY KEY
				,[PosterId]    int NOT NULL
				,[Url]         nvarchar(100) CONSTRAINT [FK_ThumbnailProject] FOREIGN KEY([PosterId]) REFERENCES [Posters]([PosterId])
	   );
END;