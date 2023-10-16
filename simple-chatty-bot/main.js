const input = require('sync-input');


function greet(bot_name, birth_year) {
	console.log("Hello! My name is " + bot_name + ".");
	console.log("I was created in " + birth_year + ".");
}

function remindName() {
	console.log("Please, remind me your name.");
	let name = input();
	console.log("What a great name you have, " + name + "!");
}

function guessAge() {
	console.log("Let me guess your age.");
	console.log("Enter remainders of dividing your age by 3, 5 and 7.");

	let rem3 = Number(input());
	let rem5 = Number(input());
	let rem7 = Number(input());

	let age = (rem3 * 70 + rem5 * 21 + rem7 * 15) % 105;

	console.log("Your age is " + age + "; that's a good time to start programming!");
}

function count() {
	console.log("Now I will prove to you that I can count to any number you want.");

	let user_number = Number(input());
	let current = 0;

	while (current <= user_number) {
		console.log(current + " !");
		current++;
	}
}

function testKnowledge() {
	console.log("Let's test your programming knowledge.");
	console.log("Why do we use methods?");
	console.log("1. To repeat a statement multiple times.");
	console.log("2. To decompose a program into several small subroutines.");
	console.log("3. To determine the execution time of a program.");
	console.log("4. To interrupt the execution of a program.");

	let user_choice = Number(input());
	let correctAnswer = 2;

while (user_choice !== correctAnswer){
	console.log("Please, try again.");
	user_choice = Number(input());
}
}

function end() {
	console.log("Congratulations, have a nice day!");
}


greet('Aleks', '2023')  
remindName();
guessAge();
count();
testKnowledge();
end();
