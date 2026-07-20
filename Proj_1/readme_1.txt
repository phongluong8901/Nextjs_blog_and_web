#1--- Docs

1.1--
-- render
Backend, Database, Docker, Full-stac
Hỗ trợ Server truyền thống (Express, Go, Rails, v.v.)
Có sẵn PostgreSQL và Redis tích hợp

-- vercel
Frontend, Next.js, Website tĩnh (SSG/ISR)
Chỉ hỗ trợ Serverless Functions (Node.js, Go, Python)

--swagger
api be cho fe


1.2-- js
-- let, const, var
number, string, object{key:"value"}, object{object}, array[], aray[object, array]
boolean

cosole.log(typeof a) -> kieu du lieu

arrow function: const a = () => {}

var -> fuction scope - gan lai value: bien thay doi duoc (x global -> cung bi thay doi nen ca trong {} hay ngoai deu bi doi theo)
let -> block scope - gan lai value: trong {} se thay doi, o global thi khong doi
const -> block scope - khong gan lai value dc: 
const object -> thay doi dc thuoc tinh attribute: obj.name

-- toan tu, condition, type, undefined, null
&& || == === != !==
undefined, null

console.log(typeof null) -> object

&&: va
==: bang nhau gia tri
!=: khac gia tri
===: so sanh them ca kieu du lieu
!==: so sanh them kieu du lieu(string va number)

-- function and params
const sumNumber = (a=0,b=0) => {
    console.log({a,b}) // a:3, b:4
    return a+b;
}

-> sumNumber(3,4) -> 7
-> sumNumber(3) -> 3
-> sumNumber(,4) -> 4

function sumNumber(a=0, b=0) {
    console.log({a,b}) // a:3, b:4
    return a+b;
}
-> sumNumber(3,4) -> 7

const sumNumber = function(a=0, b=0) {
    console.log({a,b}) // a:3, b:4
    return a+b;
}
-> sumNumber(3,4) -> 7

-- Loop
const counterNumber = (sum) => {
    for(let i = 0; <= sum; i++) {
        console.log("i", i)
    }
}
-> counterNumber(3)

const course = [
    {
        name: "abc",
        price: 10
    },
    {
        name: "def",
        price: 20
    },
]
const logName = (arr) => {
    console.log(arr.length)
    for (let i = 0; i <= arr.length; i++) {
        console.log("name", arr[i].name)
        console.log("price", arr[i].price)
    }
}
-> logName(course)

const logName2 = (arr) => {
    for(const item of arr) {
        consle.log(item.name)
        consle.log(item.price)
    }
}
-> logName2(course) //loop qua tung value-object

const logName3 = (arr) => {
    for(const key in arr) {
        consle.log(arr[key].name)
        consle.log(arr[key].price)
    }
}
-> logName3(course) // Loop qua tung cai key - index

-- method and array
 -join
arr.join(" ; ") -> them ;

- foreach: loop qua cac phan tu va in ra (khong nhan gan gia tri lai)
arr.forEach((item) => { 
    consle.log(item)
})

- map: tra lai, khong thay doi gia tri arr goc (nhan gan gia tri lai)
const result = arr.map((item, index, arrOriginal) => {
    console.log(item, index, arrOriginal)
    return {name; item.name, index: index, arrOriginal}
})
console.log("result",{result})

- filter: giong map
const result = []
arr.forEach((item, index, arrOriginal) => {
    if(item.core >= 8) {
        result.push(item)   // dua item vao result
        // result.unshift(item) // giong push nhung nguoc lai
    }
})
console.log("result",{result})

-> dung filter
const result = arr.filter((item, index) => {
    console.log(item)
    return item.core >= 8   //loc xong tra ve
})
console.log("result",{result})

- find: khong tim toan bo, tim toi thi ngung lai
let result = arr.find((item, index, arrOriginal) => {
    if(item.core == 8) {
        result = item
    }
})

-- templates literals
const handleIntroduce = (name, age) => {
    console(`Hello ${name} and ${age}`)
}
handleIntroduce(phong, 18)

-- destructuring: viet gon code theo kieu {} = arr
const arr = [1,3,5,6]
const num1 = arr[0]

consele.log(num1)

-> dung destructuring
const [num1, num2, num3, num4] = arr
consele.log(num1, num2)

const person = {
    fullName: "the code",
    age: 28,
    city: "HCm"
}

const fullname = person.fullName
const age = person["age"]
const city = person["city"]
consele.log(fullname, age, city)

-> const {fullName, age: year, city} = person
consele.log(fullname, year, city)

-> voi function cung destructuring dc
const {fullName, age, city: {firstName, lastName}} = getPerson()
consele.log(fullname, year, firstName, lastName)

--Enhance Object literals: doi ten theo bien truyen vao
const getIntroducr = ([key]) => {
    consele({
        [key]: "code"
    })
}
getIntroducr("fullname")

const getIntroducr = (firstName, lastname) => {
    consele({
        firstName,
        lastname: lastname
    })
}
getIntroducr("phong", "luong")

-- Spread va rest parameters
const arr1 = [2,3,4]
const arr2 = [5,6,7]
console.log(arr1.concat(arr2)) // noi chuoi

-> spread: rai phan tu ra
console.log(...arr1)   // -> rai 2 3 4
-> console.log([...arr1, ...arr2])

const person = {
    age: 20,
    city: "HCm"
}

const fullName = {
    firstName: "phong",
    middleName: "thien",
    lastname: "luong"
}

-> console.log({...person, ...fulname})

-> unique, khong muon trung khi spread data
const arr1 = [2,3,4, 5]
const arr2 = [5,6,7]
console.log([...new Set([...arr1,...arr2])])

const arr1 = [2,3,4, 5, ["4",9]]
const arr2 = [5,6,7]
const result = [...arr1,...arr2].flatMap((item) => item)    //tu dong them spread vao ben trong va rai
console.log([...new Set([...result.map((item) => +item)])])

->rai het vao rests
const arr1 = [1,2,3,4,5,6]
const [num1,num2,num3,...rests] = arr1

console.log(num1,num2,num3)
console.log(rests)

-> const {firstname, city, ..rests} = person
console.log(firstname)
console.log(rests)

-- Tham tri, tham chieu
- Primitive types(tham tri): number, boolean, string, undefined, null
thay doi gia tri

const a = 1
const b = a
console.log(a,b)
-> 1 1


cosnt num1 = 10
let num2 = num1
num2 = 20
console.log(num1, num2)
10 20

const func1 = (num) => {
    num=20
}
const num3 = 10
func1(num3)
console.log(num3) //10


- reference types(tham chieu): function, array, object
thay doi dia chi chua gia tri, tham chieu toi vung nho

const person = {name: 'LTTD'}
const person 2 = person
cosnole.log(person2.name)

const func2 = (pet) => {
    pet.age = 20
}
const cat = {age: 10}
func2(cat)
console.log(cat.age) //20

const func2 = (pet) => {
    const newPet = {...pet} //dung cho cap do dau tien, nhieu hon thi JSON.parse(JSON.stringify(pet))
    newPet.age = 20
}
const cat = {age: 10}
func2(cat)
console.log(cat.age) //10

const func3 = (obj) => {
    obj.name = 'Bike'
    return obj
}
const car = {
    name: 'motor bike'
}
const newCar = func3(car)
console.log(newCar) //Bike

const func3 = (obj) => {
    const newObj = {...car}
    newObj.name = 'Bike'
    return newObj
}
const car = {
    name: 'motor bike'
}
const newCar = func3(car)
console.log(newCar) //motor bike

const book = {name: 'Ac nhan tam'}
const book1 = book
console.log(book1 === book) //true

const [state, setState] = useState([])
const newSTATE = [...state]
state.push(1)
setState(newSTATE)

const book2 = {name: 'Ac nhan tam'}
const book3 = {name: 'Ac nhan tam'}
console.log(book2 === book3) //false - vi so sanh ca vung nho

1.3-- reactjs
1.4-- typescripts
1.5-- nextjs
1.6-- blog
1.7-- setup
1.8-- api auth
1.9-- login,logout, permision
1.10-- authorization
1.11-- permision user
1.12-- user manage
1.13-- setup manage
1.14-- product manage


#2--- install
 

#3--- generate


#4--- run


#5--- ci/cd


#6--- docker


#7--- deploy