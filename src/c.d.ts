type Person = "A" | "B";

interface PersonType {
  test: {
    [K in Person]: {
      items: [];
      lastEvaluatedKey: {};
    };
  };
}

type HumanType = {
  [K in Person]: {
    items: [];
    lastEvaluatedKey: {};
  };
};
