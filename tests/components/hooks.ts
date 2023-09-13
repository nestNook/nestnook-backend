import { After, Before } from '@cucumber/cucumber';
import { server } from '@test/components/setup';

Before(() => {
  console.log('starting server');
  server.start();
});

After(() => {
  server.stop();
  console.log('stopping server');
});
