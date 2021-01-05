defmodule JooshyTrivia.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :game_id, references(:games, on_delete: :nothing, type: :binary_id)
      add :user_id, references(:users, on_delete: :nothing, type: :binary_id)
      add :team_id, references(:teams, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:sessions, [:game_id])
    create index(:sessions, [:user_id])
    create index(:sessions, [:team_id])
  end
end
