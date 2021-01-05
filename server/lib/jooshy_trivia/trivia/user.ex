defmodule JooshyTrivia.Trivia.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias JooshyTrivia.Trivia.Session

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "users" do
    field :name, :string

    timestamps()

    has_many :sessions, Session
    has_many :games, through: [:sessions, :game]
    has_many :teams, through: [:sessions, :team]
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
