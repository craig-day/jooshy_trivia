defmodule JooshyTrivia.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :title, :string
      add :code, :string
      add :max_players, :integer
      add :starts_at, :utc_datetime

      timestamps()
    end
  end
end
