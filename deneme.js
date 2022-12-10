const nameList = [
  {
    name: "Jane",
    age: 20,
  },
  {
    name: "John",
    age: 21,
  },
  {
    name: "Cem",
    age: 22,
  },
];

const names = [];

for (item in nameList) {
  names.push(item.name);
}
