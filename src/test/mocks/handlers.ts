import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../lib/constants';

const mockUsers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    username: 'joaosilva',
    phone: '11-98765-4321',
    website: 'joao.com',
    company: { name: 'Tech Corp' },
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    username: 'mariasantos',
    phone: '11-98765-1234',
    website: 'maria.com',
    company: { name: 'Innovation Inc' },
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    username: 'pedrooliveira',
    phone: '11-98765-5678',
    website: 'pedro.com',
    company: { name: 'Digital Ltd' },
  },
];

export const handlers = [
  // GET /users
  http.get(`${API_BASE_URL}/users`, () => {
    return HttpResponse.json(mockUsers);
  }),

  // GET /users/:id
  http.get(`${API_BASE_URL}/users/:id`, ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === Number(id));

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  // POST /users
  http.post(`${API_BASE_URL}/users`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newUser = {
      id: mockUsers.length + 1,
      ...body,
    };
    return HttpResponse.json(newUser, { status: 201 });
  }),

  // PATCH /users/:id
  http.patch(`${API_BASE_URL}/users/:id`, async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;
    const user = mockUsers.find((u) => u.id === Number(id));

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedUser = { ...user, ...body };
    return HttpResponse.json(updatedUser);
  }),

  // DELETE /users/:id
  http.delete(`${API_BASE_URL}/users/:id`, ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === Number(id));

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return new HttpResponse(null, { status: 200 });
  }),
];
