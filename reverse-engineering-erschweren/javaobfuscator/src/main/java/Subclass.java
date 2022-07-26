import com.example.superclass.Superclass;

public class Subclass extends Superclass{

	@Override
	public int doMaths(String type, int num1, int num2) {
		switch(type) {
		case "add":
			result=num1+num2;
			break;
		case "subtract":
			result=num1-num2;
			break;
		case "multiply":
			result=num1*num2;
			break;
		case "divide":
			result=num1/num2;
			break;
		default: 
			break;
		}
		return result;
	}
}
