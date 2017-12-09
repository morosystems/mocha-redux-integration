Redux Store Integration Test Example
====================================

The aim of this example is to:
1. Showcase use of redux store integration tests.
2. Verify suitability of chosen syntax.
3. Test the library.

You can find the tests in the [redux.spec.js](redux.spec.js) file.

Character Search Module
-----------------------
Character search module is a moderately complex redux module.
It is designed as a store for page -- a single route -- with search results.

At the beginning, a search query is set. The results are loaded from the server
in small buckets until a limit is reached or all results are loaded.
The limit can be increased (e.g. by a "load more" button). When the query
is changed, all results are removed.
