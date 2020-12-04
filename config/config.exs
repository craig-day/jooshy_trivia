# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :jooshy_trivia,
  ecto_repos: [JooshyTrivia.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :jooshy_trivia, JooshyTriviaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "bxhZRrnrZCInud5lojoiFBFJAU/W0cafMtUU4j+r/U5y+mYrV/OM1b+khRnCEOQi",
  render_errors: [view: JooshyTriviaWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: JooshyTrivia.PubSub,
  live_view: [signing_salt: "InBi9l1W"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
