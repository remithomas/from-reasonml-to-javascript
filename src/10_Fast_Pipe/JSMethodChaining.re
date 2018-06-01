[@bs.send] external map : (array('a), 'a => 'b) => array('b) = "";
[@bs.send] external filter : (array('a), 'a => 'b) => array('b) = "";

type request;
external asyncRequest: unit => request = "";
[@bs.send] external setWaitDuration: (request, int) => request = "";
[@bs.send] external send: request => unit = "";

/* Use like this */
let result = filter(map([|1, 2, 3|], a => a + 1), a => a mod 2 == 0);
send(setWaitDuration(asyncRequest(), 4000));
