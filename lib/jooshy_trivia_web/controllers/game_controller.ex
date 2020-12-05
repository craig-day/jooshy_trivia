defmodule JooshyTriviaWeb.GameController do
  use JooshyTriviaWeb, :controller

  alias JooshyTrivia.Trivia
  alias JooshyTrivia.Trivia.Game
  alias JooshyTrivia.Trivia.Session

  action_fallback JooshyTriviaWeb.FallbackController

  def index(conn, _params) do
    games = Trivia.list_games()
    render(conn, "index.json", games: games)
  end

  def create(conn, %{"game" => game_params}) do
    with {:ok, %Game{} = game} <- Trivia.create_game(game_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.game_path(conn, :show, game))
      |> render("show.json", game: game)
    end
  end

  def show(conn, %{"id" => id}) do
    game = Trivia.get_game!(id)
    render(conn, "show.json", game: game)
  end

  def update(conn, %{"id" => id, "game" => game_params}) do
    game = Trivia.get_game!(id)

    with {:ok, %Game{} = game} <- Trivia.update_game(game, game_params) do
      render(conn, "show.json", game: game)
    end
  end

  def delete(conn, %{"id" => id}) do
    game = Trivia.get_game!(id)

    with {:ok, %Game{}} <- Trivia.delete_game(game) do
      send_resp(conn, :no_content, "")
    end
  end

  def join(conn, %{"code" => code, "name" => name}) do
    game = Trivia.get_game_by_code!(code)

    with {:ok, %Session{} = session} <- Trivia.join_game(game, name) do
      render(conn, "show.json", game: game)
    end
  end
end
