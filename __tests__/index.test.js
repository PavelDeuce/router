import makeRouter from '../src/router.js';

describe('router', () => {
  test('static routes', () => {
    const routes = [
      {
        path: '/courses',
        handler: () => 'courses!',
      },
      {
        path: '/courses/basics',
        handler: () => 'basics',
      },
    ];

    const router = makeRouter(routes);
    const path = '/courses';
    const route = router.serve(path);

    expect(route.handler()).toBe('courses!');
    expect(() => router.serve('/no_such_way')).toThrow('Unknown path - /no_such_way');
  });

  test('dynamic routes', () => {
    const routes = [
      {
        path: '/courses/:id',
        handler: () => 'course!',
      },
      {
        path: '/courses/:course_id/exercises/:id',
        handler: () => 'exercise!',
      },
    ];

    const router = makeRouter(routes);
    const path = '/courses/php_trees';
    const route = router.serve(path);

    expect(route.handler(route.params)).toEqual('course!');
    expect(route.params).toEqual({ id: 'php_trees' });
  });
});
