defmodule JooshyTriviaWeb.Schema do
  use Absinthe.Schema
  alias JooshyTriviaWeb.Resolvers

  import_types(JooshyTriviaWeb.Schema.Types)

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

    field :create_game, type: :game do
      arg(:name, non_null(:string))
      arg(:starts_at, :string)
      arg(:max_players, :integer)

      resolve(&Resolvers.Game.create_game/3)
    end

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
