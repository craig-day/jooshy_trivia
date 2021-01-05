defmodule JooshyTrivia.Trivia.Game do
  use Ecto.Schema
  import Ecto.Changeset
  alias JooshyTrivia.Trivia.{Session, Team}

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @code_charset "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  schema "games" do
    field :code, :string
    field :max_players, :integer
    field :starts_at, :utc_datetime
    field :name, :string

    timestamps()

    has_many :sessions, Session
    has_many :teams, Team
    # has_many :teams, through: [:sessions, :team]
    has_many :players, through: [:sessions, :user]
  end

  def generate_code() do
    char_count = String.length(@code_charset)

    for(_ <- 1..8, do: :rand.uniform(char_count) - 1)
    |> Enum.map(&(@code_charset |> String.at(&1)))
    |> List.to_string()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:code, :name, :starts_at, :max_players])
    |> validate_required([:code, :name, :starts_at])
    |> unique_constraint(:code)
  end
end
