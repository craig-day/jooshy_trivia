defmodule JooshyTriviaWeb.Resolvers.Sample do
  def say_hello(_parent, _args, _context) do
    {:ok, "Hello, world!"}
  end

  def flip_a_coin(_parent, _args, _context) do
    if :rand.uniform() < 0.5 do
      {:ok, "heads"}
    else
      {:ok, "tails"}
    end
  end
end
