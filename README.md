# Testy Tests

Testy Tests is a stupid simple JavaScript testing framework.

## About
Testy Tests was designed to help users who have never worked with Unit Tests before to easily transition into using more advanced frameworks.

It allows you to have multiple categories of tests per page, and each category can have as many tests as your little heart desires.


## Example
```javascript
var addition_test = new TestyTest("Addition"); // This creates a new category

// Now add a test to the category
addition_test.AddTest("4 + 2", function(assert) {
    var result = 4 + 2; // Perform the test

    assert( result == 6 ); // Check if the result is what it should be,
                          // assert takes a true or false value
});

addition_test.AddTest("99 + 5", function(assert) {
  var result = 99 + 5;
  assert( result == 104 );
}, 3); // Will automatically fail this test if not asserted after 3 seconds
```
This would give the following:
![All tests passed](https://github.com/mwrouse/js-testy-test/blob/master/pictures/addition.png?raw=true)
