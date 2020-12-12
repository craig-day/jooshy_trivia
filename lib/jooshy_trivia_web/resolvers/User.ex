defmodule JooshyTriviaWeb.Resolvers.User do
  alias JooshyTrivia.Repo
  alias JooshyTrivia.Trivia.{User, Session}

  def get_user(%Session{} = session, _args, _context) do
    if Ecto.assoc_loaded?(session.user) do
      {:ok, session.user}
    else
      with %User{} = user <- Repo.one(Ecto.assoc(session, :user)) do
        {:ok, user}
      else
        _err -> {:error, "User not found"}
      end
    end
  end

  def get_user(_parent, _args, _context) do
    {:error, "User not found"}
  end
end
