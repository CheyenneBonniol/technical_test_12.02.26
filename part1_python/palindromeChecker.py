def palindromeChecker(word):
	if (type(word)!=str): #we check that we do have a character chain in entry

		print("We need a character chain")
		return False
	
	isPalindrome = True
	if(len(word)>=2):
		reversedWord = ""
		transformedWord = ""
		for char in word:
			
			if(char.isalpha() or char.isdigit()): #one verifies that the character is a number or a letter of the alphabet (without looking at the case) 
				reversedWord = char.lower() + reversedWord
				transformedWord = transformedWord + char.lower()
		
		if(reversedWord!=transformedWord):
			isPalindrome = False
			
	return isPalindrome
	
	
	
assert palindromeChecker("kayak") == True
assert palindromeChecker("abba") == True
assert palindromeChecker("A man, a plan, a canal: Panama") == True
assert palindromeChecker("tims") == False
assert palindromeChecker("abab") == False
