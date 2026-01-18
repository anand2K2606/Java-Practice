package BetterToKnow;

import java.util.HashMap;
import java.util.Map;

public class TwoSum {

    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }

            map.put(nums[i], i);
        }

        // As per problem statement, exactly one solution exists
        return new int[] {};
    }

    public static void main(String[] args) {
        int[] nums = {1, 40, 2, 30, 70, 8};
        int target = 48;

        int[] result = twoSum(nums, target);
        System.out.println("{" + result[0] + ", " + result[1] + "}");
    }
}