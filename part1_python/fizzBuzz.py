def fizzBuzz(numberFirst, numberLast):
    
	if(numberFirst>numberLast):
		return;
	for i in range(1, numberLast+2-numberFirst):
		if(i%3==0 and i%5==0):#multiple position of 3 and 5
			print("FizzBuzz")
		elif (i%3==0): #multiple position of 3 only
			print("Fizz")
		elif (i%5==0): #multiple position of 5 only
			print("Buzz")
		else:
			print(i+numberFirst-1 ) 

#change of parameter below if you want to test (or call the function from the terminal)
fizzBuzz(1, 16)