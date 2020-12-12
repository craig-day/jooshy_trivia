defmodule JooshyTrivia.Trivia.Team do
  use Ecto.Schema
  import Ecto.Changeset
  alias JooshyTrivia.Trivia.Session

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "teams" do
    field :name, :string

    timestamps()

    has_many :sessions, Session
    has_many :members, through: [:sessions, :user]
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
