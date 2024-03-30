import { pool } from '../db/config.js'

export async function taskNameExist(title) {
  try {
    const resp = await pool.query('SELECT * FROM tasks WHERE tasks.title = $1', [title])
    if(resp.rowCount === 1) {
      throw new Error('ERROR: Task title duplicated')
    }
    console.log('AQUI');
    
  } catch (err) {
    throw new Error(err.message)
  }
}
