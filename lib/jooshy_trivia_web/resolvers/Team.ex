defmodule JooshyTriviaWeb.Resolvers.Team do
  alias JooshyTrivia.Repo
  alias JooshyTrivia.Trivia.Session

  def get_team(%Session{} = session, _args, _context) do
    if Ecto.assoc_loaded?(session.team) do
      {:ok, session.team}
    else
      team =
        session
        |> Ecto.assoc(:team)
        |> Repo.one()

      {:ok, team}
    end
  end

  def get_team(_parent, _args, _context) do
    {:error, "Team not found"}
  end

  def join_team(_parent, _args, _context) do
  end
end
