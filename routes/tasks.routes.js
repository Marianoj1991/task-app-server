import { Router } from 'express'
import {
  deleteAllTaskAndResetIdSequence,
  deleteTask,
  getAllTasks,
  getTask,
  postTask,
  putTask
} from '../controllers/tasks.controllers.js'
import { check } from 'express-validator'
import { reqFieldsValidator } from '../middlewares/req-fields-validator.js'
import { taskNameExist } from '../helpers/taskNameExist.js'

const router = Router()

// Reset the id sequence en Postgre
router.get('/restart-database', deleteAllTaskAndResetIdSequence);

router.get('/', getAllTasks);

router.get('/:id', getTask);

router.post(
  '/',
  [
    check('title', 'ERROR: Please insert a title').not().isEmpty(),
    check('title').custom((title) => taskNameExist(title)),
    check('description', 'ERROR: Please insert a description').not().isEmpty(),
    reqFieldsValidator
  ],
  postTask
)

router.put('/:id', putTask);

router.delete('/:id', deleteTask)

export default router
