--Use script below to drop all the tables
/************************************************

DROP TABLE Posters;

DROP TABLE Projects;

DROP TABLE ProjectCategories;

DROP TABLE Employers;

DROP TABLE Users;

************************************************/

CREATE TABLE ProjectCategories
	(
		categoryId int  UNSIGNED AUTO_INCREMENT PRIMARY KEY
		,categoryName varchar(100) NOT NULL
	);

CREATE TABLE Employers
	(
		employerId int  UNSIGNED AUTO_INCREMENT PRIMARY KEY
		,employerName varchar(100) NOT NULL
	);


CREATE TABLE Projects
(
	projectId int UNSIGNED AUTO_INCREMENT  PRIMARY KEY
	,title       varchar(200) NOT NULL
	,projectDescription varchar(1000) NOT NULL
	,projectDate date NOT NULL
	,categoryId  int UNSIGNED
	,employerId  int UNSIGNED
	,active      boolean
	,ranking     int UNSIGNED
	,CONSTRAINT FK_CategoryProject 
		FOREIGN KEY (CategoryId) 
		REFERENCES ProjectCategories(CategoryId)
	,CONSTRAINT FK_EmployerProject 
		FOREIGN KEY (EmployerId) 
		REFERENCES Employers(EmployerId)
);

CREATE TABLE Posters
(
	posterId    int UNSIGNED AUTO_INCREMENT  PRIMARY KEY
	,projectId   int UNSIGNED NOT NULL
	,posterDescription varchar(200)
	,posterUrl         varchar(200)
	,thumbnailUrl   varchar(200)
	,CONSTRAINT FK_PosterProject 
		FOREIGN KEY(ProjectId) 
		REFERENCES Projects(ProjectId)
);

CREATE TABLE Users
(
	userId    int UNSIGNED AUTO_INCREMENT  PRIMARY KEY
	,username varchar(100)
	,password         varchar(100)
);
