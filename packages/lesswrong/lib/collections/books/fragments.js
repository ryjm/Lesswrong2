import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment BookPageFragment on Book {
    _id
    createdAt
    title
    number
    subtitle
    description
    htmlDescription
    plaintextDescription
    sequenceIds
    sequences {
      ...SequencesPageFragment
    }
    postIds
    posts {
      ...LWPostsList
    }
    collectionId
  }
`);
