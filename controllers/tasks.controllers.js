import { response } from "express";
import { pool } from "../db/config.js";


export async function deleteAllTaskAndResetIdSequence (req, res = response) {

  const resp1 = await pool.query('DELETE FROM tasks');
  const resp2 = await pool.query('ALTER SEQUENCE tasks_id_seq RESTART WITH 1');

  res.json({
    resp1,
    resp2
  })
} 

export async function getAllTasks (req, res = response) {

  const resp = await pool.query('SELECT * FROM tasks');

  res.json({
    message: 'GET All Tasks',
    result: resp.rows ? resp.rows : []
  })

}

export async function getTask(req, res = response) {

  const { id } = req.params;

  const resp = await pool.query('SELECT * FROM tasks WHERE tasks.id = $1', [id]);


  res.json({
    message: 'GET Task',
    result: resp.rows[0] ? resp.rows[0] : []
  })
}

export async function postTask(req, res = response) {

  const { title, description } = req.body;
  const trimedTitle = title.trim();
  const trimedDescription = description.trim();
  
  const resp = await pool.query('INSERT INTO tasks(title, description) VALUES($1, $2) RETURNING *', [trimedTitle, trimedDescription]);
  const result = resp.rows[0];
  
  res.json({
    message: 'POST Task',
    result
  })
}

export async function putTask(req, res = response) {

  const { id } = req.params;
  const title = req.body.title.trim();
  const description = req.body.description.trim();

  try {
    const resp = await pool.query('UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);

    res.json({
      message: 'PUT Task',
      result: resp.rows ? resp.rows : []
    })
  } catch (err) {
    return res.status(400).json({
      message: 'ERROR updating task',
      err: err.message
    })
  }

}

export async function deleteTask(req, res = response) {

  const { id } = req.params

  const response = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

  res.json({
    message: 'DELETE Task',
    response: response.rowCount ? 'Tasks deleted' : 'No task with gived id'
  })
}