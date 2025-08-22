# JavaScript Full Mastery Tracker ✅

> Complete this tracker to master all core + advanced JavaScript concepts for frontend interviews.  
> Format: Main question + 3–4 variants per concept.

---

## 1. Hoisting Surprise (Difficulty: Easy)  
**Concepts:** Hoisting, var/let/const, Temporal Dead Zone (TDZ)

-  Main: `console.log(a); var a = 10;`
- [x] Variant 1: `console.log(a); let a = 5;`
- [x] Variant 2: `test(); function test() { console.log("Hello"); }`
- [x] Variant 3: `console.log(b); const b = 10;`

---

## 2. Closure Counter (Difficulty: Easy–Medium)  
**Concepts:** Closures, lexical scope, persistent state

- [x] Main: Create a counter function that increments on each call.
- [x] Variant 1: Add a decrement method.
- [x] Variant 2: Add a reset method.
- [x] Variant 3: Multiple independent counters.

---

## 3. Once Function (Difficulty: Medium)  
**Concepts:** Closures, higher-order functions, state management

- [x] Main: Implement `once(fn)` so fn runs only once.
- [x] Variant 1: Async-safe version of `once`.
- [x] Variant 2: Reset after N calls.
- [x] Variant 3: Retry on failure.

---

## 4. Private Variables (Difficulty: Medium)  
**Concepts:** Closures, encapsulation, WeakMap, private class fields

- [x] Main: Implement private variables using closures.
- [x] Variant 1: Use WeakMap for private data in classes.
- [x] Variant 2: Module pattern with private state.
- [x] Variant 3: Mixing public & private methods in class.

---

## 5. Lost Context (Difficulty: Medium)  
**Concepts:** `this` binding, call-site, bind/call/apply

- [x] Main: Method loses `this` when assigned to a variable.
- [x] Variant 1: Fix context in event listener via `.bind`.
- [x] Variant 2: Arrow vs normal function in `setTimeout`.
- [x] Variant 3: Binding `this` in class constructor.

---

## 6. Debounce Function (Difficulty: Medium)  
**Concepts:** Closures, timers, async control

- [x] Main: Implement debounce.
- [x] Variant 1: Immediate invoke option.
- [x] Variant 2: Cancel method.
- [x] Variant 3: Leading & trailing calls.

---

## 7. Throttle Function (Difficulty: Medium)  
**Concepts:** Closures, timers, performance optimization

- [x] Main: Implement throttle.
- [x] Variant 1: Leading edge only.
- [x] Variant 2: Trailing edge only.
- [x] Variant 3: Leading & trailing combo.

---

## 8. Deep Clone (Difficulty: Medium–Hard)  
**Concepts:** Recursion, object handling, edge cases

- [ ] Main: Implement deep clone without `structuredClone`.
- [ ] Variant 1: Handle Dates, RegExps.
- [ ] Variant 2: Handle circular references.
- [ ] Variant 3: Clone with prototype preserved.

---

## 9. Array Flatten (Difficulty: Medium)  
**Concepts:** Recursion, array methods

- [ ] Main: Flatten `[1, [2, [3]]]` to `[1, 2, 3]`.
- [ ] Variant 1: Flatten up to given depth.
- [ ] Variant 2: Iterative version.
- [ ] Variant 3: No built-in methods.

---

## 10. Promise All (Difficulty: Medium–Hard)  
**Concepts:** Promises, async iteration

- [ ] Main: Implement `Promise.all`.
- [ ] Variant 1: Implement `Promise.allSettled`.
- [ ] Variant 2: Implement `Promise.race`.
- [ ] Variant 3: Implement `Promise.any`.

---

## 11. Event Emitter (Difficulty: Medium–Hard)  
**Concepts:** Pub/sub, closures, arrays, memory management

- [ ] Main: Implement `on`, `emit`.
- [ ] Variant 1: Implement `once`.
- [ ] Variant 2: Implement `off`.
- [ ] Variant 3: Async event handling.

---

## 12. Currying Function (Difficulty: Medium)  
**Concepts:** Closures, recursion, functional programming
- https://www.greatfrontend.com/questions/javascript/curry
- [ ] Main: Implement `sum(1)(2)(3)()`.
- [ ] Variant 1: Curry any n-argument function.
- [ ] Variant 2: Infinite currying with valueOf.
- [ ] Variant 3: Partial application.

---

## 13. Memoization (Difficulty: Medium)  
**Concepts:** Closures, caching, higher-order functions

- [ ] Main: Implement `memoize(fn)`.
- [ ] Variant 1: Support multiple arguments.
- [ ] Variant 2: Support async functions.
- [ ] Variant 3: Cache expiry.

---

## 14. Call/Apply/Bind Polyfill (Difficulty: Medium–Hard)  
**Concepts:** Prototypes, `this` binding, arguments handling

- [ ] Main: Polyfill `Function.prototype.call`.
- [ ] Variant 1: Polyfill `apply`.
- [ ] Variant 2: Polyfill `bind`.
- [ ] Variant 3: Bind with partial arguments.

---

## 15. Async/Await Sequential Execution (Difficulty: Medium)  
**Concepts:** Promises, async iteration

- [ ] Main: Run async tasks sequentially.
- [ ] Variant 1: Run with concurrency limit.
- [ ] Variant 2: Retry failed tasks.
- [ ] Variant 3: Timeout for each task.

---

## 16. Infinite Scroll Loader (Difficulty: Medium)  
**Concepts:** DOM, async, event listeners

- [ ] Main: Load more data when near page bottom.
- [ ] Variant 1: Debounce scroll events.
- [ ] Variant 2: IntersectionObserver version.
- [ ] Variant 3: Cancel pending fetches.

---

## 17. Custom New Operator (Difficulty: Medium–Hard)  
**Concepts:** Prototypes, object creation

- [ ] Main: Implement `new` keyword behavior.
- [ ] Variant 1: Handle constructor return object.
- [ ] Variant 2: Support ES6 classes.
- [ ] Variant 3: Add default values if not returned.

---

## 18. JSON Stringify Polyfill (Difficulty: Hard)  
**Concepts:** Recursion, type checking

- [ ] Main: Implement basic `JSON.stringify`.
- [ ] Variant 1: Handle arrays, objects.
- [ ] Variant 2: Handle special values (`undefined`, `NaN`, `Infinity`).
- [ ] Variant 3: Handle circular references.

---

## 19. Custom Instanceof (Difficulty: Medium)  
**Concepts:** Prototypes, inheritance chain

- [ ] Main: Implement `instanceof` behavior.
- [ ] Variant 1: Handle primitives.
- [ ] Variant 2: Handle null/undefined.
- [ ] Variant 3: Use without `__proto__`.

---

## 20. Task Scheduler (Difficulty: Medium–Hard)  
**Concepts:** Async, timers, queues

- [ ] Main: Schedule tasks with delay.
- [ ] Variant 1: Pause/resume scheduler.
- [ ] Variant 2: Cancel tasks.
- [ ] Variant 3: Concurrency limit.

---

## 21. Polyfill Array Methods (Difficulty: Medium)  
**Concepts:** Prototypes, iteration

- [ ] Main: Polyfill `map`.
- [ ] Variant 1: Polyfill `filter`.
- [ ] Variant 2: Polyfill `reduce`.
- [ ] Variant 3: Polyfill `forEach`.

---

## 22. LRU Cache (Difficulty: Hard)  
**Concepts:** Maps, order tracking

- [ ] Main: Implement LRU cache.
- [ ] Variant 1: Async-safe LRU.
- [ ] Variant 2: TTL-based eviction.
- [ ] Variant 3: Fixed memory limit.

---

## 23. Debounced Search (Difficulty: Medium)  
**Concepts:** Debounce, DOM events, fetch

- [ ] Main: Implement search input with debounce.
- [ ] Variant 1: Show loader during fetch.
- [ ] Variant 2: Cancel previous request on new input.
- [ ] Variant 3: Show “no results” state.

---

## 24. Lazy Loading Images (Difficulty: Easy–Medium)  
**Concepts:** DOM, IntersectionObserver

- [ ] Main: Lazy load images.
- [ ] Variant 1: Add fade-in effect.
- [ ] Variant 2: Use scroll events as fallback.
- [ ] Variant 3: Handle responsive images.

---

## 25. Chained Promises (Difficulty: Medium)  
**Concepts:** Promise chaining, error handling

- [ ] Main: Chain promises sequentially.
- [ ] Variant 1: Handle rejections gracefully.
- [ ] Variant 2: Stop chain on error.
- [ ] Variant 3: Parallel + sequential mix.
