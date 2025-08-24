# Java Input Handling Explanation

## 1) Can't we able to take direct input from this?

**Code in question:**

``` java
BufferedReader bf = new BufferedReader(in);
```

**Answer:**

Yes --- you can read input directly from `System.in`, but:

-   `System.in` is a byte stream (it gives raw bytes, not characters or
    Strings).
-   If you use it directly, you'll get data in bytes and have to
    manually convert them into characters or Strings.

Example (not convenient):

``` java
int data = System.in.read(); // reads one byte only
```

This only gives you one character at a time, and you would need loops +
conversions to build a full string.

**Why InputStreamReader?**

-   `InputStreamReader` acts as a bridge:
    -   It takes the byte stream (`System.in`).
    -   Converts it into a character stream.

**Why BufferedReader?**

-   `BufferedReader` adds efficiency and higher-level methods.
-   It provides `readLine()`, which lets you read a whole line of text
    at once, instead of one character at a time.

So typically we use:

``` java
BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
```

------------------------------------------------------------------------

## 2) If we use only this, is it enough to take input?

**Code in question:**

``` java
InputStreamReader in = new InputStreamReader(System.in);
```

**Answer:**

`InputStreamReader` alone can read input from the keyboard, but:

-   It only provides low-level methods like `read()`, which reads ONE
    character at a time (as an int).
-   To read a word or line, you would need extra logic:
    -   Call `in.read()` repeatedly.
    -   Stop at newline (`\n`).
    -   Collect characters into a `StringBuilder`.
    -   Then print.

So yes, it is technically enough to take input and print, but it's
inconvenient. That's why we wrap it in `BufferedReader` (for
`readLine()`) or use `Scanner` (for tokens and full strings).
