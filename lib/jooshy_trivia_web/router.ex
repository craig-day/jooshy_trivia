defmodule JooshyTriviaWeb.Router do
  use JooshyTriviaWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api" do
    pipe_through :api

    forward "/graphql", Absinthe.Plug, schema: JooshyTriviaWeb.Schema

    scope "/", JooshyTriviaWeb do
      resources "/games", GameController, except: [:new, :edit] do
        post "/join", GameController, :join
      end
    end
  end
end
