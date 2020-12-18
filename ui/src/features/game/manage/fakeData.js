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
        __typename: 'StandaloneQuestions',
        number: 2,
        name: 'Sequences',
        description: 'Find the next item in the sequence.',
        questions: [{ title: 'NFL Quarterbacks' }],
      },
    ],
  },
}
