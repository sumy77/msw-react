import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://dummyjson.com/todosr" requests...
  http.get("https://dummyjson.com/todos", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(
      {
        todos: [
          {
            id: 1,
            todo: "Do something nice for someone you care about",
            completed: false,
            userId: 152,
          },
        ],
      },
      { status: 200 }
    );
  }),
  http.get("https://jsonplaceholder.typicode.com/todos/1", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(
      {
        userId: 1,
        id: 1,
        title: "Test todo",
        completed: false,
      },
      { status: 200 }
    );
  }),
];
