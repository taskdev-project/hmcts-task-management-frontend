import axios from 'axios';
import { app } from '../../main/app';
import request from 'supertest';

jest.mock('axios');

describe('Home page', () => {
  test('should display tasks retrieved from the API', async () => {
    jest.mocked(axios.get).mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Test task',
          description: 'Check the frontend',
          status: 'TODO',
          dueDate: '2026-10-30T17:00:00',
        },
      ],
    });

    const response = await request(app).get('/').expect(200);

    expect(response.text).toContain('Test task');
    expect(response.text).toContain('Check the frontend');
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:4000/api/tasks',
    );
  });

  test('should display the create task page', async () => {
    const response = await request(app).get('/tasks/new').expect(200);

    expect(response.text).toContain('Create a task');
    expect(response.text).toContain('name="title"');
    expect(response.text).toContain('name="status"');
    expect(response.text).toContain('name="dueDate"');
  });

  test('should submit a new task and redirect home', async () => {
    jest.mocked(axios.post).mockResolvedValue({ data: { id: 2 } });

    await request(app)
      .post('/tasks')
      .send({
        title: 'New test task',
        description: 'Created by a route test',
        status: 'TODO',
        dueDate: '2026-10-30T17:00',
      })
      .expect(302)
      .expect('Location', '/');

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:4000/api/tasks',
      {
        title: 'New test task',
        description: 'Created by a route test',
        status: 'TODO',
        dueDate: '2026-10-30T17:00',
      },
    );
  });

  test('should update a task status and redirect home', async () => {
    jest.mocked(axios.patch).mockResolvedValue({ data: {} });

    await request(app)
      .post('/tasks/1/status')
      .send({ status: 'IN_PROGRESS' })
      .expect(302)
      .expect('Location', '/');

    expect(axios.patch).toHaveBeenCalledWith(
      'http://localhost:4000/api/tasks/1/status',
      null,
      { params: { status: 'IN_PROGRESS' } },
    );
  });

  test('should delete a task and redirect home', async () => {
    jest.mocked(axios.delete).mockResolvedValue({ data: {} });

    await request(app)
      .post('/tasks/1/delete')
      .expect(302)
      .expect('Location', '/');

    expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:4000/api/tasks/1',
    );
  });
});
