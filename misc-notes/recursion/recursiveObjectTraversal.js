const tree = {
  name: 'john and kashvi',
  children: [
    {
      name: 'tbaOne',
      children: [],
    },
    {
      name: 'tbaTwo',
      children: [
        { name: 'tbaThree', children: [] },
        { name: 'tbaFour', children: [] },
      ],
    },
  ],
};

function printChildren(tree) {
  if (tree.children.length === 0) return;
  tree.children.forEach((child) => {
    console.log(child.name);
    printChildren(child);
  });
}

printChildren(tree);
