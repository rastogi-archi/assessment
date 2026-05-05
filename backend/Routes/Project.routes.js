import express from 'express';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../Controllers/Project.controllers.js';

const router = express.Router();

router.post('/create', createProject);
router.get('/getAll', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
