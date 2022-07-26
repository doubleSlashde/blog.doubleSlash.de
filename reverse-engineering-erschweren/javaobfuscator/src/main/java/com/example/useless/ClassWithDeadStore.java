package com.example.useless;

public class ClassWithDeadStore {
	
	public void deadStoreMethod() {
		int deadStore = 2;
		int a = 0;
		int b = 2;
		int c = a+b;
	}
	
}
