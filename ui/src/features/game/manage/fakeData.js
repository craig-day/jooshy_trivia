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
            answer: 'c',
          },
        ],
      },
    ],
  },
}
