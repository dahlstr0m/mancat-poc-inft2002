/*
INSERT STATEMENTS (PUT)
*/

--Posters
INSERT INTO [dbo].[ProjectCategories]
	  (
	  --CategoryId - column value is auto-generated
	  [CategoryName]
	  )
VALUES      ('Movie posters' -- CategoryName - nvarchar
);

INSERT INTO [dbo].[Employers]
	  (
	  --EmployerId - column value is auto-generated
	  [EmployerName]
	  )
VALUES      ('Finance Credit' -- EmployerName - nvarchar
);

INSERT INTO [dbo].[Projects]
	  (
	  --ProjectId - column value is auto-generated
	  [Title]
	 ,[Description]
	 ,[ProjectDate]
	 ,[CategoryId]
	 ,[EmployerId]
	 ,[Active]
	 ,[Ranking]
	  )
VALUES
	  ('Test prosjekt' -- Title - nvarchar
	  ,'Dette er et test prosjekt' -- Description - nvarchar
	  ,'2020-11-04' -- ProjectDate - datetime
	  ,1 -- CategoryId - int
	  ,1 -- EmployerId - int
	  ,1 -- Active - bit
	  ,1 -- Ranking - int
	  );

INSERT INTO [dbo].[Posters]
	  (
	  --PosterId - column value is auto-generated
	  [ProjectId]
	 ,[Description]
	 ,[Url]
	  )
VALUES
	  (1 -- ProjectId - int
	  ,'Dette er et test poster 1' -- Description - nvarchar
	  ,'www.hpbastiansen.com/posters/1.jpg' -- Url - nvarchar
	  );

--Thumbnails

INSERT INTO [dbo].[Thumbnails]
	  (
	  --ThumbnailId - column value is auto-generated
	  [PosterId]
	 ,[Url]
	  )
VALUES
	  (1 -- PosterId - int
	  ,'www.hpbastiansen.com/thumbnails/1/2.jpg' -- Url - nvarchar
	  );