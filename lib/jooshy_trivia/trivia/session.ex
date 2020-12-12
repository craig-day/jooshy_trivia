defmodule JooshyTrivia.Trivia.Session do
  use Ecto.Schema
  import Ecto.Changeset
  alias JooshyTrivia.Trivia.{Game, User, Team}

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "sessions" do
    belongs_to :game, Game, type: :binary_id
    belongs_to :user, User, type: :binary_id
    belongs_to :team, Team, type: :binary_id

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:game_id, :user_id, :team_id])
    |> validate_required([:game_id, :user_id])
  end
end
