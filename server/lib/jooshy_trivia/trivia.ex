defmodule JooshyTrivia.Trivia do
  @moduledoc """
  The Trivia context.
  """

  import Ecto.Query, warn: false
  alias JooshyTrivia.Repo

  alias JooshyTrivia.Trivia.{Game, Session, Team, User}

  def data, do: Dataloader.Ecto.new(Repo, query: &query/2)

  def query(queryable, _params), do: queryable

  #############################################################################
  # Below is auto generated by mix phx.gen.json
  #############################################################################

  @doc """
  Returns the list of games.

  ## Examples

      iex> list_games()
      [%Game{}, ...]

  """
  def list_games do
    Repo.all(Game)
  end

  def get_game(id), do: Repo.get(Game, id)

  @doc """
  Gets a single game.

  Raises `Ecto.NoResultsError` if the Game does not exist.

  ## Examples

      iex> get_game!(123)
      %Game{}

      iex> get_game!(456)
      ** (Ecto.NoResultsError)

  """
  def get_game!(id), do: Repo.get!(Game, id)

  def get_game_by_code(code), do: Repo.get_by(Game, code: code)

  def get_game_by_code!(code), do: Repo.get_by!(Game, code: code)

  def get_game_by_session(%Session{} = session) do
    if Ecto.assoc_loaded?(session.game) do
      session.game
    else
      session
      |> Ecto.assoc(:game)
      |> Repo.one()
    end
  end

  defp stringify_key({key, value}) when is_atom(key), do: {Atom.to_string(key), value}
  defp stringify_key({key, value}) when is_binary(key), do: {key, value}

  @doc """
  Creates a game.

  ## Examples

      iex> create_game(%{field: value})
      {:ok, %Game{}}

      iex> create_game(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_game(attrs \\ %{}) do
    attrs =
      attrs
      |> Map.put(:code, Game.generate_code())
      |> Enum.map(&stringify_key/1)
      |> Map.new()

    %Game{}
    |> Game.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a game.

  ## Examples

      iex> update_game(game, %{field: new_value})
      {:ok, %Game{}}

      iex> update_game(game, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_game(%Game{} = game, attrs) do
    game
    |> Game.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a game.

  ## Examples

      iex> delete_game(game)
      {:ok, %Game{}}

      iex> delete_game(game)
      {:error, %Ecto.Changeset{}}

  """
  def delete_game(%Game{} = game) do
    Repo.delete(game)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking game changes.

  ## Examples

      iex> change_game(game)
      %Ecto.Changeset{data: %Game{}}

  """
  def change_game(%Game{} = game, attrs \\ %{}) do
    Game.changeset(game, attrs)
  end

  def join_game(%Game{} = game, name) do
    with {:ok, %User{} = user} <- Repo.insert(User.changeset(%User{}, %{name: name})) do
      %Session{}
      |> Session.changeset(%{game: game, user: user})
      |> Repo.insert()
    end
  end

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by_session(%Session{} = session) do
    if Ecto.assoc_loaded?(session.user) do
      session.user
    else
      session
      |> Ecto.assoc(:user)
      |> Repo.one()
    end
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  def create_session(attrs \\ %{})

  def create_session(%{game: %Game{} = game, user: %User{} = user}) do
    %Session{}
    |> Session.changeset(%{game_id: game.id, user_id: user.id})
    |> Repo.insert()
  end

  def create_session(attrs) do
    %Session{}
    |> Session.changeset(attrs)
    |> Repo.insert()
  end

  def get_team_by_session(%Session{} = session) do
    if Ecto.assoc_loaded?(session.team) do
      session.team
    else
      session
      |> Ecto.assoc(:team)
      |> Repo.one()
    end
  end

  def get_game_by_team(%Team{} = team) do
    if Ecto.assoc_loaded?(team.game) do
      team.game
    else
      team
      |> Ecto.assoc(:game)
      |> Repo.one()
    end
  end

  def team_join_link(%Team{} = team) do
    with %Game{} = game <- get_game_by_team(team) do
      [game.id, team.id]
      |> Enum.join("|")
      |> Base.url_encode64()
      |> String.replace_prefix("", "/join/")
    end
  end
end
