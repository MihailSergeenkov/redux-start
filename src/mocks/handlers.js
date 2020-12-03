import { rest } from 'msw';

export const handlers = [
  rest.get('https://chapters-ac63.restdb.io/rest/chapters', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { _id: 'qwer1', title: '1 ch', completed: false, sections: [{ title: 'sdf', completed: false }]},
        { _id: 'qwer2', title: '2 chapter', completed: false, sections: [] },
      ]),
    );
  }),
  rest.post('https://chapters-ac63.restdb.io/rest/chapters', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        ...JSON.parse(req.body),
        completed: false, 
        sections: [],
        _id: 'qwer3',
      }),
    );
  }),
];
