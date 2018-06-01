try (
  Js.Exn.raiseError("oops!")
) {
| Js.Exn.Error(e) =>
  switch (Js.Exn.message(e)) {
  | Some(message) => Js.log({j|Error: $message|j})
  | None => Js.log("An unknown error occurred")
  }
};
