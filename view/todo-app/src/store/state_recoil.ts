import { atom, selector } from "recoil";
interface Todo {
  title: string;
  description: string;
  done: boolean;
  userId: string;
  _id: string;
}
export const user = atom({
  key: "user",
  default: {
    username: "",
    password: "",
    lastname: "",
    firstname: "",
    image: "",
  },
});

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: false,
});
export const fetchTodoState = atom({
  key: "FetchTodo",
  default: false,
});
export const authState = atom({
  key: "authState",
  default: { token: "", username: "" },
});

export const TodoListState = atom<Todo[]>({
  key: "TodoList",
  default: [],
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
