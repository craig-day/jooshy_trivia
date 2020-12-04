defmodule JooshyTrivia.TriviaTest do
  use JooshyTrivia.DataCase

  alias JooshyTrivia.Trivia

  describe "games" do
    alias JooshyTrivia.Trivia.Game

    @valid_attrs %{code: "some code", max_players: 42, starts_at: "2010-04-17T14:00:00Z", title: "some title"}
    @update_attrs %{code: "some updated code", max_players: 43, starts_at: "2011-05-18T15:01:01Z", title: "some updated title"}
    @invalid_attrs %{code: nil, max_players: nil, starts_at: nil, title: nil}

    def game_fixture(attrs \\ %{}) do
      {:ok, game} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Trivia.create_game()

      game
    end

    test "list_games/0 returns all games" do
      game = game_fixture()
      assert Trivia.list_games() == [game]
    end

    test "get_game!/1 returns the game with given id" do
      game = game_fixture()
      assert Trivia.get_game!(game.id) == game
    end

    test "create_game/1 with valid data creates a game" do
      assert {:ok, %Game{} = game} = Trivia.create_game(@valid_attrs)
      assert game.code == "some code"
      assert game.max_players == 42
      assert game.starts_at == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert game.title == "some title"
    end

    test "create_game/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Trivia.create_game(@invalid_attrs)
    end

    test "update_game/2 with valid data updates the game" do
      game = game_fixture()
      assert {:ok, %Game{} = game} = Trivia.update_game(game, @update_attrs)
      assert game.code == "some updated code"
      assert game.max_players == 43
      assert game.starts_at == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert game.title == "some updated title"
    end

    test "update_game/2 with invalid data returns error changeset" do
      game = game_fixture()
      assert {:error, %Ecto.Changeset{}} = Trivia.update_game(game, @invalid_attrs)
      assert game == Trivia.get_game!(game.id)
    end

    test "delete_game/1 deletes the game" do
      game = game_fixture()
      assert {:ok, %Game{}} = Trivia.delete_game(game)
      assert_raise Ecto.NoResultsError, fn -> Trivia.get_game!(game.id) end
    end

    test "change_game/1 returns a game changeset" do
      game = game_fixture()
      assert %Ecto.Changeset{} = Trivia.change_game(game)
    end
  end
end
