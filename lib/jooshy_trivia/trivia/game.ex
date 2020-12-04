defmodule JooshyTrivia.Trivia.Game do
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

  def generate_code() do
    UUID.uuid4()
    |> String.slice(0, 8)
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:code, :title, :starts_at, :max_players])
    |> validate_required([:title])
  end
end
