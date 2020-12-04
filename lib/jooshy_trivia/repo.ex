defmodule JooshyTrivia.Repo do
  use Ecto.Repo,
    otp_app: :jooshy_trivia,
    adapter: Ecto.Adapters.Postgres
end
