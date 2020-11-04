

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* ======================================================================================================================================
   Author:		Bjarne Johansen
   Create date:	04.11.2020
   Description:	Deletes project and all associated posters and thumbnails
   To execute: EXEC [dbo].[Procedure_DeleteProject] @ProjectId = X
   ======================================================================================================================================*/
CREATE PROCEDURE [dbo].[Procedure_DeleteProject]
    (@ProjectId int)
AS
    BEGIN

	   --Deleting thumbnails
	   DELETE FROM dbo.Thumbnails  
	   WHERE PosterId IN (SELECT PosterId FROM Posters WHERE ProjectId = @ProjectId)

	   --Deleting posters
	   DELETE FROM dbo.Posters  
	   WHERE ProjectId = @ProjectId

	   --Deleting projects
	   DELETE FROM dbo.projects  
	   WHERE ProjectId = @ProjectId

    END

EXEC [dbo].[Procedure_DeleteProject] @ProjectId = 1