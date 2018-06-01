exception UnhandledPromise;

let handlePromiseFailure =
  [@bs.open]
  (
    fun
    | Not_found => {
        Js.log("Not found");
        Js.Promise.resolve()
      }
  );

Js.Promise.reject(Not_found)
  |> Js.Promise.catch(
     (error) =>
       switch (handlePromiseFailure(error)) {
       | Some(x) => x
       | None => raise(UnhandledPromise)
       }
   );
