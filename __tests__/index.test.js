import makeRouter from '../src/router.js';

test('router', () => {
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
  const handler = router.serve(path);

  expect(handler()).toBe('courses!');
  expect(() => router.serve('/no_such_way')).toThrow('Unknown path');
});
