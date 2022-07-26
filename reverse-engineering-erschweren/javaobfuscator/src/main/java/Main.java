import com.example.systemcalls.ClassWithSystemCalls;
import com.example.useless.*;

public class Main {
	public static void main(String [] args) {
		
		Subclass subclass = new Subclass();
		
		ClassWithDeadStore deadStoreClass = new ClassWithDeadStore();
		ClassWithEmptyLoop emptyLoopClass = new ClassWithEmptyLoop();
		
		ClassWithSystemCalls systemCallClass = new ClassWithSystemCalls();
		
		systemCallClass.print(Integer.toString(subclass.doMaths("add", 1, 2)));
		deadStoreClass.deadStoreMethod();
		emptyLoopClass.emptyLoopMethod();
		systemCallClass.print("Hello World!");
	}
}
