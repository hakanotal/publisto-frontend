let obj = [
  {
    id: 1,
    name: "hello",
    items: ["item1", "item2", "item3"],
    is_public: true,
  },
];
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
// Generate array of 10 objects with id, name, items array and is_public field
for (let i = 2; i <= 10; i++) {
  obj.push({
    id: i,
    name: "hello",
    items: ["item1", "item2", "item3"],
    is_public: choose([true, false]),
  });
}
obj.forEach(
  (item) =>
    (item.title = item.is_public == false ? "Private List" : "Shared List")
);
console.log(obj);
