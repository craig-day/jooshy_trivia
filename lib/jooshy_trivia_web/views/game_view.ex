defmodule JooshyTriviaWeb.GameView do
  use JooshyTriviaWeb, :view
  alias JooshyTriviaWeb.GameView

  def render("index.json", %{games: games}) do
    %{data: render_many(games, GameView, "game.json")}
  end

  def render("show.json", %{game: game}) do
    %{data: render_one(game, GameView, "game.json")}
  end

  def render("game.json", %{game: game}) do
    %{id: game.id,
      code: game.code,
      title: game.title,
      starts_at: game.starts_at,
      max_players: game.max_players}
  end
end
