export const ROUTES = {
  game_lobby: '/game/:code/lobby',
  game_play: '/game/:code/play',
  game_manage: '/game/:code/manage',
  game_join: '/join/:code',
  game_create: '/create',
}

export const routeTo = (route, variables = {}) => {
  let path = route

  for (const v in variables) {
    path = path.replace(`:${v}`, variables[v])
  }

  return path
}
