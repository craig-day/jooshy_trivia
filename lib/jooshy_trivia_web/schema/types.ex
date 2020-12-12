defmodule JooshyTriviaWeb.Schema.Types do
  use Absinthe.Schema.Notation

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
    field :game, non_null(:game)
    field :user, non_null(:user)
    field :team, :team
  end
end
