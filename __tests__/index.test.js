import buildRouter from '../src/index.js';

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'root!',
  },
  {
    path: '/courses',
    handler: () => 'courses!',
    method: 'GET',
  },
  {
    path: '/courses/basics',
    handler: () => 'basics',
    method: 'GET',
  },
  {
    path: '/courses/:id',
    handler: () => 'course!',
    method: 'GET',
    constraints: { id: (id) => id.startsWith('php') },
  },
  {
    path: '/courses/:course_id/exercises/:id',
    handler: () => 'exercise!',
    method: 'GET',
    constraints: { id: /\d+/, course_id: (courseId) => courseId.startsWith('php') },
  },

  {
    path: '/courses/:course_id/exercises/:exercise_id/tests/:id',
    handler: () => 'tests!',
    method: 'POST',
  },
];

describe('router', () => {
  let router;

  beforeAll(() => {
    router = buildRouter(routes);
  });

  test('root searching', () => {
    const route = router.serve({ path: '/' });
    expect(route.handler()).toBe('root!');
  });

  test('static routes', () => {
    const request = { path: '/courses', method: 'GET' };
    const route = router.serve(request);

    expect(route.handler()).toBe('courses!');
  });

  test('dynamic routes', () => {
    const request = { path: '/courses/php_trees', method: 'GET' };
    const route = router.serve(request);

    expect(route.handler(route.params)).toEqual('course!');
    expect(route.params).toEqual({ id: 'php_trees' });

    const request2 = { path: '/courses/php_test/exercises/4', method: 'GET' };
    const route2 = router.serve(request2);

    expect(route2.handler(route2.params)).toEqual('exercise!');
    expect(route2.params).toEqual({ course_id: 'php_test', id: '4' });

    const request3 = { path: '/courses/php_test/exercises/4/tests/26', method: 'POST' };
    const route3 = router.serve(request3);

    expect(route3.handler(route3.params)).toEqual('tests!');
    expect(route3.params).toEqual({ course_id: 'php_test', exercise_id: '4', id: '26' });
  });

  test('errors', () => {
    expect(() => router.serve({ path: '/no_such_way' })).toThrow('No such path - /no_such_way');
    expect(() => router.serve({ path: '/courses/invalid' })).toThrow(
      'No such path - /courses/invalid',
    );
    expect(() => router.serve({ path: '/courses/22', method: 'PUT' })).toThrow('No such path - ');
    expect(() => router.serve({ path: '' })).toThrow('No such path - ');

    expect(() => buildRouter([{ path: '/courses/:id', handler: () => 'course!', constraints: { id: {} } }])).toThrow('Unknown constraint type');
  });
});
