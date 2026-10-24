import axios from 'axios';
import { Application } from 'express';

export default function (app: Application): void {
  app.get('/tasks/new', (req, res) => {
    res.render('create-task');
  });

  app.post('/tasks/:id/status', async (req, res) => {
    try {
      await axios.patch(`http://localhost:4000/api/tasks/${req.params.id}/status`, null, {
        params: { status: req.body.status },
      });

      res.redirect('/');
    } catch (error) {
      console.error('Error updating task status:', error);
      res.status(400).send('Unable to update task status. Please try again.');
    }
  });

  app.post('/tasks/:id/delete', async (req, res) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${req.params.id}`);

      res.redirect('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(400).send('Unable to delete task. Please try again.');
    }
  });

  app.post('/tasks', async (req, res) => {
    const formData = {
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status,
      dueDate: req.body.dueDate,
    };

    try {
      await axios.post('http://localhost:4000/api/tasks', formData);
      res.redirect('/');
    } catch (error) {
      console.error('Error creating task:', error);

      let message = 'Unable to create task. Please check your details and try again.';

      if (axios.isAxiosError(error) && error.response?.status === 400) {
        message = 'Please check your task details. The title and status must be valid.';
      }

      res.status(400).render('create-task', {
        error: message,
      });
    }
  });

  app.get('/', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:4000/api/tasks');

      const tasks = response.data.map((task: any) => ({
        ...task,
        formattedDueDate: task.dueDate
          ? new Date(task.dueDate).toLocaleString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
          : null,
      }));

      res.render('home', { tasks, error: null });
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      res.render('home', {
        tasks: [],
        error: 'Unable to retrieve tasks. Please try again later.',
      });
    }
  });
}
