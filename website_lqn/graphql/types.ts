export interface Person {
  id: string;
  name: string;
}

export interface GetPeopleData {
  allPeople: {
    people: Person[];
  };
}
