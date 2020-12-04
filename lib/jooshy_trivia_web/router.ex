defmodule JooshyTriviaWeb.Router do
  use JooshyTriviaWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", JooshyTriviaWeb do
    pipe_through :api
  end
end
