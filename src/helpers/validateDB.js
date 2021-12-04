

const validEmail = async (id_email = '') => {
     if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(id_email)){
         return true;
     } else {
         throw new Error(`Email ${id_email} is not valid ex: test1@test.com`)
     }
}

const validFullname = async (fullname = '') => {
     if (/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(fullname)){
          return true;
     }else {
          throw new Error(`fullname ${fullname} is not valid`)
     }
}

const validUsername = async (username = '') => {
     if (/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/.test(username)){
          return true;
     }else {
          throw new Error(`Username ${username} is not valid`);
     }
}

const validPassword = async (password = '') => {
     if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])([A-Za-z\d$@$!%*?&]|[^ ]){6,12}$/.test(password)){
         return true;
     } else {
         throw new Error(`Password ${password} is not valid`)
     }
 }

 const validTime = async (time = '') => {
     if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)){
          return true;
     } else {
          throw new Error (`Time ${time} is not valid. Format: 24 hours.`);
     }
 }

 const validIdMeal = async (idMeal = '') => {
     if (/^(BT|LC|DR|MC|AC)$/.test(idMeal)){
          return true;
     }else {
          throw new Error(`Id meal ${idMeal} is not valid.`)
     }
 }

 const validTypeMeal = async (typeMeal = '') => {
     if (/^[A-Z\s]+$/.test()){
          return true;
     }else {
          throw new Error(`Type meal ${typeMeal} is not valid`)
     }
 }

 const validFoodName = async (foodName = '') => {
     if (/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(nameFood)){
          return true;
     }else {
          throw new Error(`Name food ${foodName} is not valid`)
     }
}


 

module.exports = {
    validEmail,
    validFullname,
    validUsername,
    validPassword,
    validTime,
    validIdMeal,
    validTypeMeal,
    validFoodName
}