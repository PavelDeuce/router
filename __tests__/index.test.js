import buildRouter from '../src/index.js';

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

    const router = buildRouter(routes);
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

      {
        path: '/courses/:course_id/exercises/:exercise_id/tests/:id',
        handler: () => 'tests!',
      },
    ];

    const router = buildRouter(routes);

    const path = '/courses/php_trees';
    const route = router.serve(path);

    expect(route.handler(route.params)).toEqual('course!');
    expect(route.params).toEqual({ id: 'php_trees' });

    const path2 = '/courses/test/exercises/4';
    const route2 = router.serve(path2);

    expect(route2.handler(route2.params)).toEqual('exercise!');
    expect(route2.params).toEqual({ course_id: 'test', id: '4' });

    const path3 = '/courses/test/exercises/4/tests/26';
    const route3 = router.serve(path3);

    expect(route3.handler(route3.params)).toEqual('tests!');
    expect(route3.params).toEqual({ course_id: 'test', exercise_id: '4', id: '26' });
  });
});
