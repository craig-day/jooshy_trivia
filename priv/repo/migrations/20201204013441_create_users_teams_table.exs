defmodule JooshyTrivia.Repo.Migrations.CreateUsersTeamsTable do
  use Ecto.Migration

  def change do
    create table(:users_teams, primary_key: false) do
      add :game_id, references(:games, type: :binary_id)
      add :user_id, references(:users, type: :binary_id)
      add :team_id, references(:teams, type: :binary_id)
    end
  end
end
