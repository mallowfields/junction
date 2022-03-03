## `@mflib/validation` package
 
This package contains utilities for validating inputs and parameters.  

#### By Example

1. Create a new validator

    ```javascript  
    // We provide true to the constructor, which indicates 'yes',
    // we want to throw errors when validation fails.
    let v = new Validator(true);
    ```

2. Test some values  

   **require** : Test that a value is not null, and optionally make additional assertions about the value:
    ```javascript   
    v.values.require(null);             // throws error : required value is null
    v.values.require('w').isFunction(); // throws error : value is not a function

    // Assertions can be chained:
    v.values.require('w').
      isString().
      isNotEmpty().
      isInSet('X', 'Z', 'Z');           // throws error : value is not in set 
    ```
 
   **allow** : Make assertions about a value that are only run if the provided value is not null:
    ```javascript    
    v.values.allow(null).isInstanceOf(Array); // OK: Optional value is null
    v.values.allow(2).isString();             // throws error : value is not a string
    ```

3. Test some parameters
  
   `Validator.params` the exact same way as `Validator.values`, except **allow** and **require** also
   accept an optional parameter name, which is simply used to generate more helpful error messages. 
   There is also a method `present` for validating the number of arguments supplied, while
   generating helpful messages when the number of arguments supplied is wrong.

    ```javascript
    // Fortify our function against bad inputs
    function repeat(message, count, separator) {
      v.params.present(arguments, 'message', 'count', 'separator?')
      v.params.require(message, 'message').isString();
      v.params.require(count, 'count').isNumber();
      v.params.allow(separator, 'separator').isString();
      /* ... implementation ... */
    }

    // Test it out:
    repeat();                 // error : Missing required parameter 'message'
    repeat('hi');             // error : Missing required parameter 'count'
    repeat('hi', 2, ',', 1);  // error : Unexpected extra arguments
    repeat(null, 2);          // error : Parameter 'message' invalid : Value is null
    repeat(2, 1);             // error : Parameter 'message' invalid : Value is not a string
    repeat('hi', null);       // error : Parameter 'count' invalid : Value is null
    repeat('hi', 'x');        // error : Parameter 'count' invalid : Value is not a number
    repeat('hi', 3, 0);       // error : Parameter 'separator' invalid : Value is not a string
    repeat('hi', 3);          // OK : hihihi
    repeat('hi', 3, '|');     // OK : hi|hi|hi
    ```
