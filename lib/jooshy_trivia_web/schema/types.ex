defmodule JooshyTriviaWeb.Schema.Types do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  alias JooshyTrivia.Trivia

  object :game do
    field :id, non_null(:id)
    field :code, non_null(:string)
    field :title, non_null(:string)
    field :max_players, :integer

    field :teams, non_null(list_of(non_null(:team))), resolve: dataloader(Trivia)
    field :players, non_null(list_of(non_null(:user))), resolve: dataloader(Trivia)
  end

  object :user do
    field :name, non_null(:string)
  end

  object :team do
    field :name, non_null(:string)

    field :members, non_null(list_of(non_null(:user))), resolve: dataloader(Trivia)
  end

  object :session do
    field :id, non_null(:id)

    field :game, non_null(:game), resolve: dataloader(Trivia)
    field :user, non_null(:user), resolve: dataloader(Trivia)
    field :team, :team, resolve: dataloader(Trivia)
  end
end
