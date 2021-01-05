defmodule JooshyTriviaWeb.Resolvers.User do
  alias JooshyTrivia.Trivia
  alias JooshyTrivia.Trivia.{User, Session}

  def get_user(%Session{} = session, _args, _context) do
    with %User{} = user <- Trivia.get_user_by_session(session) do
      {:ok, user}
    else
      _err -> {:error, "User not found"}
    end
  end

  def get_user(_parent, _args, _context) do
    {:error, "User not found"}
  end
end
