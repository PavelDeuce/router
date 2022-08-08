import buildRouter from '../src/index.js';

describe('router', () => {
  test('static routes', () => {
    const routes = [
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
    ];

    const router = buildRouter(routes);
    const request = { path: '/courses', method: 'GET' };
    const route = router.serve(request);

    expect(route.handler()).toBe('courses!');
    expect(() => router.serve({ path: '/no_such_way' })).toThrow('Unknown path - /no_such_way');
  });

  test('dynamic routes', () => {
    const routes = [
      {
        path: '/courses/:id',
        handler: () => 'course!',
        method: 'GET',
      },
      {
        path: '/courses/:course_id/exercises/:id',
        handler: () => 'exercise!',
        method: 'GET',
      },

      {
        path: '/courses/:course_id/exercises/:exercise_id/tests/:id',
        handler: () => 'tests!',
        method: 'POST',
      },
    ];

    const router = buildRouter(routes);

    const request = { path: '/courses/php_trees', method: 'GET' };
    const route = router.serve(request);

    expect(route.handler(route.params)).toEqual('course!');
    expect(route.params).toEqual({ id: 'php_trees' });

    const request2 = { path: '/courses/test/exercises/4', method: 'GET' };
    const route2 = router.serve(request2);

    expect(route2.handler(route2.params)).toEqual('exercise!');
    expect(route2.params).toEqual({ course_id: 'test', id: '4' });

    const request3 = { path: '/courses/test/exercises/4/tests/26', method: 'POST' };
    const route3 = router.serve(request3);

    expect(route3.handler(route3.params)).toEqual('tests!');
    expect(route3.params).toEqual({ course_id: 'test', exercise_id: '4', id: '26' });
  });
});
