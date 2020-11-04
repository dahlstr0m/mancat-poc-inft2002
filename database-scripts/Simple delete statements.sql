/*
SIMPLE DELETE STATEMENTS
*/

--Delete a project category
DELETE FROM dbo.ProjectCategories 
WHERE CategoryId = 1

--Delete an employer 
DELETE FROM dbo.Employers    
WHERE EmployerId = 1

--Delete a specific thumbnail 
DELETE FROM dbo.Thumbnails    
WHERE ThumbnailId = 1

--Delete a specific poster 
DELETE FROM dbo.Posters    
WHERE PosterId = 1

