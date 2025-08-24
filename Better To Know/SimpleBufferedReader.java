import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class SimpleBufferedReader 
{
    public static void main(String[] args) throws IOException
    {
     
        InputStreamReader in = new InputStreamReader(System.in);
        BufferedReader bf = new BufferedReader(in);
       
        System.out.print("Enter the word: ");
        String input = bf.readLine();
        
        System.out.println(input);

        // int num = Integer.parseInt(input);
        // System.out.println(num);

        in.close();
        bf.close();
    }
}
