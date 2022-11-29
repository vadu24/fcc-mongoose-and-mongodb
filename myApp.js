const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let peopleSchema = new mongoose.Schema({
  name : {type : String, required : true},
  age : Number,
  favoriteFoods : [String]
})
let Person = mongoose.model('Person', peopleSchema);

const createAndSavePerson = (done) => {
  let val = new Person({ name: 'Val', age: 51, favoriteFoods: ['horse sausage', 'sushi'] });
  val.save((error, data) => {
    if (error) {
      return console.log(error);
    } else {
      return done(null, data);
    }
  });
};
let arrayOfPeople = [
  {name: 'Valikhan', age: 51, favoriteFoods: ['horse sausage', 'sushi']},
  {name: 'Dinara', age: 43, favoriteFoods: ['horse sausage', 'sushi']},
  {name: 'Indira', age: 15, favoriteFoods: ['pizza', 'sushi']},
  {name: 'Jameela', age: 12, favoriteFoods: ['pizza', 'sushi']},
  {name: 'Botagoz', age: 9, favoriteFoods: ['pizza', 'burger']},
  {name: 'Jibek', age: 4, favoriteFoods: ['pizza', 'burger']}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdManyPeople) =>{
    if(error){
      console.log(error)
    }else{
      done(null, createdManyPeople);
    }
  });
};
Person.find({name: 'Valikhan'}, (error, data)=>{
  if(error){
    console.log(error)
  }else{
    console.log(data)
  }
})
const findPeopleByName = (personName, done) => {
Person.find({name: personName}, (error, data)=>{
  if(error){
    console.log(error)
  }else{
    done(null, data);
  }
})  
};

Person.find({favoriteFoods: {$all: ['sushi']}},(error,data)=>{
  if(error){
    console.log(error)
  }else{
    console.log(data[0])
  }
});

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (error, data)=>{
    if(error){
      console.log(error)
    }else{
      done(null, data);
    }
  }) 
};

/*Person.findById('id', (error, data)=>{
  if(error){
    console.log(error)
  }else{
    console.log(data)
  }
});*/
const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data)=>{
    if(error){
      console.log(error)
    }else{
      done(null, data);
    }
  }) 
};

/*Person.findOne({name: 'Valikhan'}, (error, result)=>{
  if(error){
    console.log(error)
  }else{
    result.age = 52
    result.favoriteFoods.push('steak')
    result.save((error, updatedData)=>{
      console.log(updatedData)
    })
  }
})*/
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (error, result)=>{
    if(error){
      console.log(error)
    }else{
      result.favoriteFoods.push(foodToAdd)
      result.save((error, updatedResult)=>{
        if(error){
          console.log(error)
        }else{
          done(null, updatedResult)
        }
      })
    }
  })
}; 

/*Person.findOneAndUpdate({name: 'Gary'}, {name: 'Valikhan', age: 51}, {new: true}, (error, data)=>{
  if(error){
    console.log(error)
  }else{
    console.log(data)
  }
})*/

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, data)=>{
  if(error){
    console.log(error)
  }else{
    done(null, data)
  }
})
};

/*Person.findOneAndRemove({name: 'Valikhan'}, (error, data)=>{
  if(error){
    console.log(error)
  }else{
    console.log(data)
  }
})
Person.findByIdAndRemove('xxxxxxx', (error, data)=>{
  if(error){
    console.log(error)
  }else{
    console.log(data)
  }
})*/

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data)=>{
    if(error){
      console.log(error)
    }else{
      done(null, data);
    }
  }) 
};

/*Person.remove({age: {$gte: 18}}, (error, data)=>{
if(error){
console.log(error)
}else{
done(null, data)
}
})
*/
/*const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name: nameToRemove}, (error, data)=>{
  if(error){
    console.log(error)
  }else{
   done(null, data); 
  }
})
};*/
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name: nameToRemove}, (error, JSONStatus)=>{
  if(error){
    console.log(error)
  }else{
   done(null, JSONStatus); 
  }
})
}; 

/*Person.find({favoriteFoods: {$all: ['Salad']}})
.sort({age: 'asc'}) or .sort('age') -ascending / ('-age') - descending
.limit(4) - is a number of documents/records
.select('name age') - which field from records is displayed - name, age, etc / .select('-age') - this won't be displayed
.exec((error, data)=>{
if(!error){
console.log(data)
}
})
*/
const queryChain = (done) => {
  const foodToSearch = "burrito";
Person.find({favoriteFoods: {$all:foodToSearch}})
  .sort('name')
  .limit(2)
  .select('-age')
  .exec((error, data)=>{
    if(error){
      console.log(error)
    }else{
     done(null, data); 
    }
  })
};

export const PersonModel = Person;
const _createAndSavePerson = createAndSavePerson;
export { _createAndSavePerson as createAndSavePerson };
const _findPeopleByName = findPeopleByName;
export { _findPeopleByName as findPeopleByName };
const _findOneByFood = findOneByFood;
export { _findOneByFood as findOneByFood };
const _findPersonById = findPersonById;
export { _findPersonById as findPersonById };
const _findEditThenSave = findEditThenSave;
export { _findEditThenSave as findEditThenSave };
const _findAndUpdate = findAndUpdate;
export { _findAndUpdate as findAndUpdate };
const _createManyPeople = createManyPeople;
export { _createManyPeople as createManyPeople };
const _removeById = removeById;
export { _removeById as removeById };
const _removeManyPeople = removeManyPeople;
export { _removeManyPeople as removeManyPeople };
const _queryChain = queryChain;
export { _queryChain as queryChain };
