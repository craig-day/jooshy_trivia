defmodule JooshyTriviaWeb.Resolvers.Game do
  alias JooshyTrivia.Trivia
  alias JooshyTrivia.Trivia.{Game, Session, User}

  def all_games(_parent, _args, _context) do
    {:ok, Trivia.list_games()}
  end

  def get_game(_parent, %{id: id}, _context) do
    with %Game{} = game <- Trivia.get_game(id) do
      {:ok, game}
    else
      _err -> {:error, "Game not found"}
    end
  end

  def get_game(%Session{} = session, _args, _context) do
    with %Game{} = game <- Trivia.get_game_by_session(session) do
      {:ok, game}
    else
      _err -> {:error, "Game not found"}
    end
  end

  def get_game(_parent, _args, _context),
    do: {:error, "You must provide an ID to fetch a game"}

  def create_game(_parent, %{name: _name} = args, _context) do
    args
    |> Map.take([:name, :starts_at, :max_players])
    |> Trivia.create_game()
  end

  def create_game(_parent, _args, _context),
    do: {:error, "Failed to create game"}

  def join_game(_parent, %{code: code, name: name}, _context) do
    with %Game{} = game <- Trivia.get_game_by_code(code) do
      with {:ok, %User{} = user} <- Trivia.create_user(%{name: name}) do
        Trivia.create_session(%{game: game, user: user})
      end
    else
      _nil -> {:error, "Game code not found"}
    end
  end

  def join_game(_parent, _args, _context),
    do: {:error, "Failed to join game"}
end
