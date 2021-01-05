defmodule JooshyTriviaWeb.Schema.Mutations.Game do
  use Absinthe.Schema.Notation
  alias JooshyTriviaWeb.Resolvers

  object :game_mutations do
    field :create_game, type: :game do
      arg(:name, non_null(:string))
      arg(:starts_at, :string)
      arg(:max_players, :integer)

      resolve(&Resolvers.Game.create_game/3)
    end
  end
end
