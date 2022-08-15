# router

[![Actions Status](https://github.com/PavelDeuce/js-algorithms-trees-project-lvl1/workflows/hexlet-check/badge.svg)](https://github.com/PavelDeuce/js-algorithms-trees-project-lvl1/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/cf29babbd64a5ec941bc/maintainability)](https://codeclimate.com/github/PavelDeuce/router/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cf29babbd64a5ec941bc/test_coverage)](https://codeclimate.com/github/PavelDeuce/router/test_coverage)

## About

Lightweight library to provide an API for handling routes

## Example

```
import buildRouter from '@hexlet/code';

const routes = [
  {
    path: '/courses/:course_id/exercises/:id',
    constraints: { id: /\d+/, course_id: (courseId) => courseId.startsWith('js') },
    handler: () => 'exercise!',
  },
];

const router = makeRouter(routes);
const result = router.serve({ path: '/courses/1/exercises/js' });
// { handler: [Function handler] , path: '/courses/1/exercises/js', params: { id: '1', course_id: 'js' }, method: 'GET' }
result.handler(result.params); // exercise!

router.serve('/courses/noop/exercises/noop'); // Error: No such path
```
