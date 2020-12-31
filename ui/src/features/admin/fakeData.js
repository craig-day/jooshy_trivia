export const SAMPLE_GAME = {
  game: {
    name: '💩🤬',
    registeredPlayerCount: 18,
    startsAt: '2020-12-23T19:00:00-08:00',
    rounds: [
      {
        __typename: 'PickOne',
        number: 1,
        name: 'Pick One',
        description:
          'Select the item in the pair better associated with each question.',
        questionCount: 10,
        points: 20,
        isActive: true,
        isStarted: false,
        startsAt: new Date(+new Date() + 30 * 1000).toISOString(), // 3 minutes from now
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
        name: 'Multiple Choice',
        description: 'Pick the right answer.',
        questionCount: 20,
        points: 20,
        isActive: false,
        isStarted: false,
        startsIn: null,
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
      {
        __typename: 'Music',
        number: 3,
        name: 'Muzac!',
        description: 'Identify the song name and artist.',
        questionCount: 10,
        points: 20,
        isActive: false,
        isStarted: false,
        startsIn: null,
        questions: [],
      },
      {
        __typename: 'Image',
        number: 4,
        name: 'Noods!',
        description: 'Find the similarity within all of the pictures.',
        questionCount: 8,
        points: 16,
        isActive: false,
        isStarted: false,
        startsIn: null,
        questions: [],
      },
      {
        __typename: 'Sequence',
        number: 5,
        name: 'Connections',
        description: 'Identify the next item in the sequence.',
        questionCount: 20,
        points: 40,
        isActive: false,
        isStarted: false,
        startsIn: null,
        questions: [],
      },
      {
        __typename: 'Sequence',
        number: 6,
        name: 'Order Matters',
        description: 'Identify the next item in the sequence.',
        questionCount: 10,
        points: 30,
        isActive: false,
        isStarted: false,
        startsIn: null,
        questions: [],
      },
    ],
    teams: [
      {
        name: 'Team Charmander',
        joinLink: '/join/qowiuebf',
        members: [{ name: 'Craig' }, { name: 'Adam' }, { name: 'Ana' }],
      },
      {
        name: 'Pikachu',
        joinLink: '/join/qpwibuv',
        members: [
          { name: 'Brock' },
          { name: 'Ash' },
          { name: 'Misty' },
          { name: 'Professor Oak' },
        ],
      },
      {
        name: 'Squirttle',
        joinLink: '/join/piuqbervq',
        members: [{ name: 'Blue' }],
      },
      {
        name: 'Eevee',
        joinLink: '/join/aoviwn',
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
