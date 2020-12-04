defmodule JooshyTrivia.Game do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "games" do
    field :code, :string
    field :max_players, :integer
    field :starts_at, :utc_datetime
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:title, :code, :max_players, :starts_at])
    |> validate_required([:title, :code, :max_players, :starts_at])
  end
end
