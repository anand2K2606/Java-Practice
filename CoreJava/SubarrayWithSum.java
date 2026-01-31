package CoreJava;

import java.util.Scanner;
import java.util.Arrays;
import java.util.Map;
import java.util.HashMap;

public class SubarrayWithSum {

    public static int[] findSubarray(int[] arr, int targetSum) {

        if (arr == null || arr.length == 0)
        {
            System.out.println("Array is empty");
            return null;
        }

        int currentSum = 0;
        int start = 0;

        for (int end = 0; end < arr.length; end++) {

            currentSum += arr[end];

            while (currentSum > targetSum && start <= end) {
                currentSum -= arr[start];
                start++;
            }

            if (currentSum == targetSum) {
                System.out.println("Found subarray from index " + start + " to " + end);
                return new int[]{start, end};
            }
        }

        System.out.println("No subarray with sum " + targetSum + " found");
        return null;
    }

    public static int[] findSubarrayAllNumbers(int[] arr, int targetSum) {

        if (arr == null || arr.length == 0) {
            System.out.println("Array is empty");
            return null;
        }

        Map<Integer, Integer> sumMap = new HashMap<>();
        int currentSum = 0;

        sumMap.put(0, -1);

        // Iterate through array
        for (int i = 0; i < arr.length; i++) {
            currentSum += arr[i];

            // Check if we've seen (currentSum - targetSum) before
            if (sumMap.containsKey(currentSum - targetSum)) {
                int start = sumMap.get(currentSum - targetSum) + 1;
                int end = i;
                System.out.println("Found subarray from index " + start + " to " + end);
                return new int[]{start, end};
            }

            // Store current sum and index
            sumMap.put(currentSum, i);
        }

        // If no subarray found
        System.out.println("No subarray with sum " + targetSum + " found");
        return null;
    }

    // Helper method to print the subarray
    public static void printSubarray(int[] arr, int[] indices) {
        if (arr == null || indices == null || indices.length < 2) {
            return;
        }

        int start = indices[0];
        int end = indices[1];

        System.out.print("Subarray elements: [");
        for (int i = start; i <= end; i++) {
            System.out.print(arr[i]);
            if (i < end) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }

    // Main method with examples
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Subarray Sum Finder ===");

        // Example 1: Simple case with non-negative numbers
        System.out.println("\nExample 1: Array with non-negative numbers");
        int[] arr1 = {1, 4, 20, 3, 10, 5};
        System.out.println("Array: " + Arrays.toString(arr1));
        int target1 = 33;
        System.out.println("Looking for sum: " + target1);

        int[] result1 = findSubarray(arr1, target1);
        if (result1 != null) {
            printSubarray(arr1, result1);
        }

        // Example 2: No subarray found
        System.out.println("\nExample 2: No subarray found");
        int[] arr2 = {1, 2, 3, 4, 5};
        System.out.println("Array: " + Arrays.toString(arr2));
        int target2 = 100;
        System.out.println("Looking for sum: " + target2);

        int[] result2 = findSubarray(arr2, target2);

        // Example 3: With negative numbers
        System.out.println("\nExample 3: Array with negative numbers");
        int[] arr3 = {10, 2, -2, -20, 10};
        System.out.println("Array: " + Arrays.toString(arr3));
        int target3 = -10;
        System.out.println("Looking for sum: " + target3);

        int[] result3 = findSubarrayAllNumbers(arr3, target3);
        if (result3 != null) {
            printSubarray(arr3, result3);
        }

        // Example 4: User input
        System.out.println("\n=== Try it yourself ===");
        System.out.print("Enter array size: ");
        int size = scanner.nextInt();

        int[] userArr = new int[size];
        System.out.println("Enter " + size + " numbers:");
        for (int i = 0; i < size; i++) {
            userArr[i] = scanner.nextInt();
        }

        System.out.print("Enter target sum to find: ");
        int userTarget = scanner.nextInt();

        System.out.println("Array: " + Arrays.toString(userArr));
        System.out.println("Looking for sum: " + userTarget);

        // Check if array has negative numbers
        boolean hasNegative = false;
        for (int num : userArr) {
            if (num < 0) {
                hasNegative = true;
                break;
            }
        }

        int[] userResult;
        if (hasNegative) {
            System.out.println("(Using method that handles negative numbers)");
            userResult = findSubarrayAllNumbers(userArr, userTarget);
        } else {
            userResult = findSubarray(userArr, userTarget);
        }

        if (userResult != null) {
            printSubarray(userArr, userResult);
        }

        scanner.close();
    }
}