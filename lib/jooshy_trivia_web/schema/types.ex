defmodule JooshyTriviaWeb.Schema.Types do
  use Absinthe.Schema.Notation
  alias JooshyTriviaWeb.Resolvers

  object :game do
    field :id, non_null(:id)
    field :code, non_null(:string)
    field :title, non_null(:string)
    field :max_players, :integer

    field :teams, non_null(list_of(non_null(:team)))
    field :players, non_null(list_of(non_null(:user)))
  end

  object :user do
    field :name, non_null(:string)
  end

  object :team do
    field :name, non_null(:string)

    field :members, non_null(list_of(non_null(:user)))
  end

  object :session do
    field :id, non_null(:id)

    field :game, non_null(:game) do
      resolve(&Resolvers.Game.get_game/3)
    end

    field :user, non_null(:user) do
      resolve(&Resolvers.User.get_user/3)
    end

    field :team, :team do
      resolve(&Resolvers.Team.get_team/3)
    end
  end
end
