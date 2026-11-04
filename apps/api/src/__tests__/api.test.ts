import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';

describe('FrameCraft Studio API', () => {
  it('GET /api/v1/health returns status ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('framecraft-api');
  });

  it('GET /api/v1/templates returns list of templates', async () => {
    const res = await request(app).get('/api/v1/templates');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(60);
  });

  it('GET /api/v1/templates/categories returns template categories', async () => {
    const res = await request(app).get('/api/v1/templates/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(20);
  });

  it('GET /api/v1/templates/:slug returns template details', async () => {
    const res = await request(app).get('/api/v1/templates/golden-sparkle-birthday');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe('birthday-single-portrait');
    expect(res.body.data.photoSlots.length).toBe(3);
  });

  it('supports user registration and login', async () => {
    const testEmail = `testuser_${Date.now()}@example.com`;
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: testEmail,
        password: 'Password123!',
        name: 'Alex Rivera',
      });

    expect(regRes.status).toBe(201);
    expect(regRes.body.success).toBe(true);
    expect(regRes.body.user.email).toBe(testEmail);
    expect(regRes.body.token).toBeDefined();

    // Login
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testEmail,
        password: 'Password123!',
      });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);
    expect(loginRes.body.token).toBeDefined();
  });
});
