def fizzBuzz(number):
	for i in range(1, 17-number):
		if(i%3==0 and i%5==0):#position multiple de 3 et 5
			print("FizzBuzz")
		elif (i%3==0): #position multiple de 3 uniquement
			print("Fizz")
		elif (i%5==0): #position multiple de 5 uniquement
			print("Buzz")
		else:
			print(i+number-1 ) 


fizzBuzz(1)