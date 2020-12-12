defmodule JooshyTriviaWeb.Schema do
  use Absinthe.Schema
  alias JooshyTrivia.Trivia
  alias JooshyTriviaWeb.Resolvers

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(Trivia, Trivia.data())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  import_types(JooshyTriviaWeb.Schema.Types)
  import_types(JooshyTriviaWeb.Schema.Mutations.Game)

  query do
    field :say_hello, type: :string do
      resolve(&Resolvers.Sample.say_hello/3)
    end

    field :game, type: :game do
      arg(:id, non_null(:id))

      resolve(&Resolvers.Game.get_game/3)
    end
  end

  mutation do
    field :flip_a_coin, type: :string do
      resolve(&Resolvers.Sample.flip_a_coin/3)
    end

    import_fields(:game_mutations)

    field :join_game, type: :session do
      arg(:code, non_null(:string))
      arg(:name, non_null(:string))

      resolve(&Resolvers.Game.join_game/3)
    end

    field :join_team, type: :team do
      arg(:session_id, non_null(:id))
      arg(:team_id, non_null(:id))

      resolve(&Resolvers.Team.join_team/3)
    end
  end
end
