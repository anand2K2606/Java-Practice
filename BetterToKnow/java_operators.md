# Java Operators Explanation with Examples

## 1. Ternary Operator
- A **shortened `if-else`** statement.
- **Syntax:**  
  ```java
  ans = condition ? value_if_true : value_if_false;
  ```

### Example:
```java
public class TernaryExample {
    public static void main(String[] args) {
        int num = 10;
        String result;

        // Using ternary operator instead of if-else
        result = (num % 2 == 0) ? "Even" : "Odd";

        System.out.println(num + " is " + result);
    }
}
```
**Output:**
```
10 is Even
```

---

## 2. Bitwise Operators
- Work at the **bit level** (0s and 1s).
- Common operators:  
  - `&` (AND)  
  - `|` (OR)  
  - `^` (XOR)  
  - `~` (NOT / Complement)  
  - `<<` (Left shift)  
  - `>>` (Right shift)  

### Example:
```java
public class BitwiseExample {
    public static void main(String[] args) {
        int a = 5;   // Binary: 0101
        int b = 3;   // Binary: 0011

        System.out.println("a & b = " + (a & b));  // AND → 0101 & 0011 = 0001 (1)
        System.out.println("a | b = " + (a | b));  // OR  → 0101 | 0011 = 0111 (7)
        System.out.println("a ^ b = " + (a ^ b));  // XOR → 0101 ^ 0011 = 0110 (6)
        System.out.println("~a = " + (~a));        // NOT → ~0101 = 1010 (in 2’s complement → -6)
        System.out.println("a << 1 = " + (a << 1));// Left shift: 0101 << 1 = 1010 (10)
        System.out.println("a >> 1 = " + (a >> 1));// Right shift: 0101 >> 1 = 0010 (2)
    }
}
```
**Output:**
```
a & b = 1
a | b = 7
a ^ b = 6
~a = -6
a << 1 = 10
a >> 1 = 2
```

---

## 3. `instanceof` Operator
- Checks whether an object is an **instance of a particular class** (or subclass).
- Returns **true** or **false**.

### Example:
```java
class Animal {}
class Dog extends Animal {}

public class InstanceofExample {
    public static void main(String[] args) {
        Animal a = new Animal();
        Dog d = new Dog();

        System.out.println("a instanceof Animal: " + (a instanceof Animal)); // true
        System.out.println("d instanceof Dog: " + (d instanceof Dog));       // true
        System.out.println("d instanceof Animal: " + (d instanceof Animal)); // true
        System.out.println("a instanceof Dog: " + (a instanceof Dog));       // false
    }
}
```
**Output:**
```
a instanceof Animal: true
d instanceof Dog: true
d instanceof Animal: true
a instanceof Dog: false
```
