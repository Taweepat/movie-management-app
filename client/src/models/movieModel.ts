import { types } from "mobx-state-tree";

const RatingEnum = types.enumeration("Rating", ["G", "PG", "M", "MA", "R"]);

export const MovieModel = types
  .model("Movie", {
    id: types.identifierNumber,
    title: types.string,
    year: types.number,
    rating: RatingEnum,
    createdAt: types.maybe(types.string),
  })
  .views((self) => ({
    get displayYear() {
      return `(${self.year})`;
    },
  }));

export type Movie = typeof MovieModel.Type;
