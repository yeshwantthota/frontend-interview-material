💡 Rule of thumb for interviews:
If you need to store a mutable value that:

- Must persist between renders, and
-  Should not cause a re-render when changed
-  Use useRef for things like timers, DOM elements, API controllers, and other “mutable but non-UI” data.

→ Use useRef
