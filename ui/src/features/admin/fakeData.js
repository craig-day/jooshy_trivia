export const SAMPLE_GAME = {
  game: {
    rounds: [
      {
        __typename: 'PickOne',
        number: 1,
        name: 'Pick One',
        description:
          'Select the item in the pair better associated with each question.',
        categories: [
          {
            title: 'RED or BLUE',
            options: ['RED', 'BLUE'],
            questions: [
              {
                question: 'Longer wavelength',
                answer: 'RED',
              },
              {
                question: 'Vermillion',
                answer: 'RED',
              },
              {
                question: 'Computer that defeated Garry Kasparov',
                answer: 'BLUE',
              },
            ],
          },
          {
            title: 'GOLD or SILVER',
            options: ['GOLD', 'SILVER'],
            questions: [
              {
                question: 'State mineral of california',
                answer: 'GOLD',
              },
              {
                question: 'Famed polling analyst',
                answer: 'SILVER',
              },
            ],
          },
        ],
      },
      {
        __typename: 'MultipleChoice',
        number: 2,
        name: 'Some Multiple Choice Thing',
        description: 'Pick the right answer.',
        questions: [
          {
            prompt: 'Which string is the most common first program',
            choices: {
              a: 'Hello, world',
              b: 'Hello, world.',
              c: 'Hello, world!',
              d: 'Hello, World!',
            },
            answer: 'Hello, world!',
          },
          {
            prompt: 'Who is the tallest?',
            choices: {
              a: 'Josh',
              b: 'Avin',
              c: 'Craig',
              d: 'Michael',
            },
            answer: 'Josh',
          },
        ],
      },
    ],
    teams: [
      {
        name: 'Team Charmander',
        members: [{ name: 'Craig' }, { name: 'Adam' }, { name: 'Ana' }],
      },
      {
        name: 'Pikachu',
        members: [
          { name: 'Brock' },
          { name: 'Ash' },
          { name: 'Misty' },
          { name: 'Professor Oak' },
        ],
      },
      {
        name: 'Squirttle',
        members: [{ name: 'Blue' }],
      },
      {
        name: 'Eevee',
        members: [
          { name: 'Jolteon' },
          { name: 'Flareon' },
          { name: 'Vaporeon' },
        ],
      },
    ],
    playersWithoutTeam: [
      { name: 'Need Team' },
      { name: 'So Lonely' },
      { name: 'Forever Alone' },
    ],
  },
}

export const SAMPLE_ROUND_TYPES = [
  {
    name: 'PickOne',
    description:
      'Select the item in the pair better associated with each question.',
  },
  { name: 'MultipleChoice', description: 'Select the most accurate answer.' },
  { name: 'Music', description: 'Identify the artist and song title.' },
  { name: 'Sequence', description: 'Identify the next item in the sequence.' },
  {
    name: 'Image',
    description: 'Find the connection in each group.',
  },
]
