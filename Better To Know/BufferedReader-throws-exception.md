# Why `throws Exception` is Required in This Scenario

In Java, certain operations can fail in ways that the compiler **knows
must be handled**. These are called **checked exceptions**.

------------------------------------------------------------------------

## In Your Code

``` java
BufferedReader bf = new BufferedReader(in);
String input = bf.readLine();
```

The method **`readLine()`** is declared in the JDK as:

``` java
public String readLine() throws IOException
```

That means it may throw an **`IOException`** (a checked exception) if
something goes wrong while reading input (for example, if the input
stream is unexpectedly closed or corrupted).

------------------------------------------------------------------------

## Why Handling is Required

Since `IOException` is a **checked exception**, the Java compiler forces
you to do one of two things:

1.  **Handle it with a try-catch block**

    ``` java
    try {
        String input = bf.readLine();
    } catch (IOException e) {
        e.printStackTrace();
    }
    ```

2.  **Declare that your method may throw it further up the call stack**
    (what you did):

    ``` java
    public static void main(String[] args) throws Exception
    ```

When you write `throws Exception`, you are telling the compiler:\
➡️ "If an exception happens here, I am not handling it --- let whoever
called me deal with it."

Since `main` is the entry point of your program, there's really no
caller (other than the JVM itself), so if an exception occurs, the
program will just crash and print a stack trace.

------------------------------------------------------------------------

## Best Practice

Instead of writing `throws Exception` (which is too broad), it's better
to declare the **specific exception**:

``` java
public static void main(String[] args) throws IOException
```

This makes it clear what kind of error might occur.
