# Joosh Trivia

## Development

The project is setup to use [`asdf-vm`](https://asdf-vm.com/#/) to manage the tool versions. You can
use any runtime version manager you like, but make sure you check [`.tool-versions`](./tool-versions)
to ensure you install the correct version.

### Client

The client is a React app bootstraped using [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html)
using `yarn`.

See [`client/README.md`](./client/README.md) for instructions.

### Server

The server is a [Phoenix Framework](https://www.phoenixframework.org/) application using
[Absinthe GraphQL](http://absinthe-graphql.org/) for the API.

See [`server/README.md`](./server/README.md) for instructions.
