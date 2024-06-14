# Cached DMV

Demo project showing off "Magic Caching", from the Convex YouTube video:

https://www.youtube.com/watch?v=ZgxDlSUGpfE

## Getting access to the cache

The initial version of it is in `./cache`.

But check out the [convex-helpers](https://github.com/get-convex/convex-helpers/)
directory for permanent, maintained versions of libraries like the convex query
cache.

## Running this project

Requires a recent version of Node.js.

First, let's install dependencies and get your backend provisioned:

    $ npm i
    $ npx convex dev

Then, in another terminal, load the sample documents and start your Next.js app:

    $ npx convex import --replace initial_dataset.zip
    $ npm run dev

Check out the app at http://localhost:3000/
