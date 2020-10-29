// @flow

const { poolPromise, sql } = require('./mssql-pool');

class PortfolioService {
  async getProjects() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM dbo.Projects');

      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  async getProject(id: number) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('project_id', sql.Int, id)
        .query('SELECT * FROM dbo.Projects WHERE ProjectId = @project_id');

      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

const portfolioService = new PortfolioService();
export default portfolioService;
