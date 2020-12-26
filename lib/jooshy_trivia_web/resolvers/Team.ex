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

  def join_link(%Team{} = team, _args, _context) do
    case Trivia.team_join_link(team) do
      url_path when is_binary(url_path) -> {:ok, url_path}
      _ -> {:error, "Failed to compute join link for team"}
    end
  end

  def join_link(_parent, _args, _context) do
  end
end
