import sanityClient from "./sanity";
let sanityQuery = (query, params) => sanityClient.fetch(query, params);

export const getHelpData = () => {
  return sanityQuery(`
        *[_type == 'help']
    `);
};

export const getAdoptionsData = () => {
  return sanityQuery(`
        *[_type == 'adoption']{
            ...,
            help[]->{
                ...
            }
        }
    `);
};

export const getHelpDataById = (id) => {
  return sanityQuery(
    `
        *[_type == 'help' && _id == $id]
    `,
    { id }
  );
};

export const getAdoptionsDataById = (id) => {
  return sanityQuery(
    `
        *[_type == 'adoption' && _id == $id]
    `,
    { id }
  );
};
