defmodule JooshyTriviaWeb.Resolvers.Team do
  alias JooshyTrivia.Trivia
  alias JooshyTrivia.Trivia.{Session, Team}

  def get_team(%Session{} = session, _args, _context) do
    with %Team{} = team <- Trivia.get_team_by_session(session) do
      {:ok, team}
    else
      _err -> {:error, "Team not found"}
    end
  end

  def get_team(_parent, _args, _context) do
    {:error, "Team not found"}
  end

  def join_team(_parent, _args, _context) do
  end
end
