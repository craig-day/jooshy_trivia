export const ROUND_STATE = {
  NOT_STARTED: 'NOT_STARTED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
}

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
        score: 16,
        state: ROUND_STATE.COMPLETED,
        startsAt: new Date(+new Date() + 3 * 1000).toISOString(), // 3 minutes from now
        duration: 720,
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
        score: 19,
        state: ROUND_STATE.COMPLETED,
        startsIn: null,
        duration: 720,
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
        score: 13,
        state: ROUND_STATE.COMPLETED,
        startsIn: null,
        duration: 720,
        questions: [
          {
            fileSource:
              'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
          },
          {
            fileSource:
              'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
          },
          {
            fileSource:
              'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
          },
        ],
      },
      {
        __typename: 'Image',
        number: 4,
        name: 'Noods!',
        description: 'Find the similarity within all of the pictures.',
        questionCount: 8,
        points: 16,
        score: 15,
        state: ROUND_STATE.ACTIVE,
        startsIn: null,
        duration: 720,
        questions: [
          {
            fileSource: 'https://i.imgur.com/oQR0ZuX.png',
          },
          {
            fileSource: 'https://i.imgur.com/Y1NnYwN.png',
          },
          {
            fileSource: 'https://i.imgur.com/0sU02or.png',
          },
          {
            fileSource: 'https://i.imgur.com/DBM8Rdz.png',
          },
          {
            fileSource: 'https://i.imgur.com/qYhS4q3.png',
          },
          {
            fileSource: 'https://i.imgur.com/Pge7VQk.png',
          },
        ],
      },
      {
        __typename: 'Sequence',
        number: 5,
        name: 'Connections',
        description: 'Identify the next item in the sequence.',
        questionCount: 20,
        points: 40,
        score: 32,
        state: ROUND_STATE.NOT_STARTED,
        startsIn: null,
        duration: 720,
        questions: [
          {
            items: ['Hello', 'World', 'This'],
          },
          {
            items: ['One', 'One', 'Two'],
          },
        ],
      },
      {
        __typename: 'Sequence',
        number: 6,
        name: 'Order Matters',
        description: 'Identify the next item in the sequence.',
        questionCount: 10,
        points: 30,
        score: 25,
        state: ROUND_STATE.NOT_STARTED,
        startsIn: null,
        duration: 720,
        questions: [],
      },
    ],
    currentTeam: {
      name: 'Team Charmander',
      joinLink: '/join/qowiuebf',
      members: [{ name: 'Craig' }, { name: 'Adam' }, { name: 'Ana' }],
      score: 69,
    },
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
