defmodule JooshyTriviaWeb.Router do
  use JooshyTriviaWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", JooshyTriviaWeb do
    pipe_through :api

    resources "/games", GameController, except: [:new, :edit] do
      post "/join", GameController, :join
    end
  end
end
