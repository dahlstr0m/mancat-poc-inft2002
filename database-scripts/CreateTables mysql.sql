--Use script below to drop all the tables
/************************************************

DROP TABLE Thumbnails;

DROP TABLE Posters;

DROP TABLE Projects;

DROP TABLE ProjectCategories;

DROP TABLE Employers;

************************************************/

CREATE TABLE ProjectCategories
	(
		CategoryId int  UNSIGNED AUTO_INCREMENT PRIMARY KEY
		,CategoryName varchar(50) NOT NULL
	);

CREATE TABLE Employers
	(
		EmployerId int  UNSIGNED AUTO_INCREMENT PRIMARY KEY
		,EmployerName varchar(50) NOT NULL
	);


CREATE TABLE Projects
(
	ProjectId int UNSIGNED AUTO_INCREMENT  PRIMARY KEY
	,ProjectTitle       varchar(50) NOT NULL
	,ProjectDescription varchar(500) NOT NULL
	,ProjectDate date NOT NULL
	,CategoryId  int UNSIGNED
	,EmployerId  int UNSIGNED
	,Active      boolean
	,Ranking     int UNSIGNED
	,CONSTRAINT FK_CategoryProject 
		FOREIGN KEY (CategoryId) 
		REFERENCES ProjectCategories(CategoryId)
	,CONSTRAINT FK_EmployerProject 
		FOREIGN KEY (EmployerId) 
		REFERENCES Employers(EmployerId)
);

CREATE TABLE Posters
(
	PosterId    int UNSIGNED AUTO_INCREMENT  PRIMARY KEY
	,ProjectId   int UNSIGNED NOT NULL
	,PosterDescription varchar(100)
	,PosterUrl         varchar(100) 
	,CONSTRAINT FK_PosterProject 
		FOREIGN KEY(ProjectId) 
		REFERENCES Projects(ProjectId)
);


CREATE TABLE Thumbnails
	(
	ThumbnailId int UNSIGNED AUTO_INCREMENT  PRIMARY KEY
	,PosterId    int UNSIGNED NOT NULL
	,ThumbnailUrl   varchar(100) 
	,CONSTRAINT FK_ThumbnailProject
		FOREIGN KEY(PosterId) 
		REFERENCES Posters(PosterId)
);
