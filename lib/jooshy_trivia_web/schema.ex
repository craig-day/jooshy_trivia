defmodule JooshyTriviaWeb.Schema do
  use Absinthe.Schema

  query do
    field :hello, :string do
      resolve(fn _a, _b, _c -> {:ok, "Hello, world"} end)
    end
  end
end
