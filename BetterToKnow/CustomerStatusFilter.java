package BetterToKnow;

import java.util.*;

public class CustomerStatusFilter {

    public static void main(String[] args) {

        Map<String, List<String>> customerByStatus = new HashMap<>();

        add(customerByStatus, "paid", "Shanta bai");
        add(customerByStatus, "paid", "Raju");
        add(customerByStatus, "bal", "Hanamavva");
        add(customerByStatus, "bal", "Suresh");
        add(customerByStatus, "done", "Bhimu Poojari");
        add(customerByStatus, "dep", "Jaggu kardal");

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter status (paid | bal | done | dep | all | paid, bal): ");
        String input = sc.nextLine();

        getCustomers(customerByStatus, input);
    }

    private static void add(Map<String, List<String>> map,
                            String status,
                            String customer) {
        map.computeIfAbsent(status, k -> new ArrayList<>()).add(customer);
    }

    private static void getCustomers(Map<String, List<String>> map,
                                     String input) {

        if (input.equalsIgnoreCase("all")) {
            map.values()
                    .forEach(list -> list.forEach(System.out::println));
            return;
        }

        String[] statuses = input.toLowerCase().split(",");

        for (String status : statuses) {
            status = status.trim();
            List<String> customers = map.get(status);

            if (customers != null) {
                customers.forEach(System.out::println);
            } else {
                System.out.println("No customers for status: " + status);
            }
        }
    }
}
