const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

/*
    ^(?=.*[a-z]) => Asegura que haya una letra minúscula 
    ?=.*[A-Z]) => Asegura que haya una letra mayúscula
    (?=.*\d) => Asegura que haya un número
    (?=.*[@$!%*?&]) => Asegura que haya un caracter especial
    [A-Za-z\d@$!%*?&]{8,15}$ => Asegura que la longitud sea de 8 a 15 caracteres
*/

function validatePassword(password) {
    return passwordRegex.test(password);
}

console.log(validatePassword("StrongPass1!")); 
console.log(validatePassword("weakpass"));      
console.log(validatePassword("Short1!"));  
