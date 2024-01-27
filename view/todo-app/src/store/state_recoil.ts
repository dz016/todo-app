import { atom, selector } from "recoil";
interface Todo {
  title: string;
  description: string;
  done: boolean;
  userId: string;
}

export const authState = atom({
  key: "authState",
  default: { token: "", username: "" },
});

export const TodoListState = atom<Todo[]>({
  key: "TodoList",
  default: [
    {
      title: "Buy Groceries",
      description: "Get milk, eggs, and vegetables from the supermarket.",
      done: false,
      userId: "user123",
    },
    {
      title: "Complete Homework",
      description: "Finish math and science assignments.",
      done: true,
      userId: "user456",
    },
    {
      title: "Plan Weekend Trip",
      description: "Research and plan a weekend getaway.",
      done: false,
      userId: "user789",
    },
    {
      title: "Read Book",
      description: "Start reading 'The Great Gatsby.'",
      done: false,
      userId: "user123",
    },
    {
      title: "Exercise Routine",
      description: "Follow the 30-minute workout routine.",
      done: true,
      userId: "user456",
    },
    {
      title: "Write Blog Post",
      description: "Draft a new blog post on React best practices.",
      done: false,
      userId: "user789",
    },
    // Add more Todo items as needed
  ],
});

export const SearchBarTextState = atom({
  key: "SearchBarText",
  default: "",
});

export const FilterTodoListState = selector({
  key: "FilterTodoList",
  get: ({ get }) => {
    const searchBarVal = get(SearchBarTextState);
    const list = get(TodoListState);

    // Return the filtered array
    return list.filter((item) =>
      item.title
        .toLocaleLowerCase()
        .startsWith(searchBarVal.toLocaleLowerCase())
    );
  },
});
