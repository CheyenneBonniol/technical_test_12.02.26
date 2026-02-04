#include "part1.h"

void fizzBuzz(int number){
    for (int i=1; i<17-number; i++){
        if(i%3==0 && i%5==0){
            printf("FizzBuzz\n");
        }else if(i%3==0){
            printf("Fizz\n");
        }else if(i%5==0){
            printf("Buzz\n");
        }else{
            printf("%d\n", i+number-1);
        }
    }

}

