module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      headers: '*',
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body', {
    name: 'strapi::upload',
    config: {
      path: '/tmp/uploads',
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
