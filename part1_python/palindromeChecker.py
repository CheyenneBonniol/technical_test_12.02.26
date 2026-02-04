def palindromeChecker(word):
	if (type(word)!=str): #on vérifie qu'on a bien une chaine de caractere en entree
		print("il faut une chaine de caractères")
		return False
	
	isPalindrome = True
	if(len(word)>=2):
		reversedWord = ""
		transformedWord = ""
		for char in word:
			
			if(char.isalpha() or char.isdigit()): #on verifie que le caractere est un chiffre ou une lettre de l'alphabet (sans regarder la casse) 
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
