defmodule JooshyTrivia.Repo.Migrations.AddGameToTeam do
  use Ecto.Migration

  def change do
    alter table(:teams) do
      add :game_id, references(:games, on_delete: :nothing, type: :binary_id), null: false
    end
  end
end
